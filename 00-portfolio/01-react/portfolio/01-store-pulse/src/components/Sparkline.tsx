import type { SeriesPoint } from "../data/selectors.ts";
import type { MetricDefinition } from "../metrics/index.ts";
import { formatMetricValue } from "../metrics/index.ts";

/**
 * El histórico de una persona en el hueco de una tarjeta.
 *
 * ── Por qué esta forma y no un anillo ni una dona ────────────────────────────
 * Un gráfico circular necesita un TODO que repartir, y estas métricas no lo
 * tienen: los tiempos y los conteos no tienen un 100% natural, y en los
 * porcentajes el 100% existe pero es inútil (nadie tiene un 100% de inexactitud).
 * Al forzarlo contra el máximo del equipo, el mismo dibujo acababa significando
 * lo contrario según la métrica — anillo lleno era "más pedidos" (bueno) o "más
 * tiempo" (malo). Ese es justo el error que `direction` existe para evitar.
 *
 * Esta línea no compara a nadie con nadie: se escala contra el propio histórico
 * de su persona. Por eso funciona idéntico en las ocho métricas ordenables sin
 * una sola condición por unidad.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * SVG a mano y no Recharts a propósito: aquí se pintan catorce a la vez, y Recharts
 * pesa más que todo el resto del bundle junto. Vive en su propio chunk y se carga
 * solo cuando aparecen los gráficos grandes (ver `lazyCharts.ts`); meterlo en la
 * lista del equipo lo traería a una pantalla que hoy no lo necesita.
 *
 * Sin ejes, sin rejilla y sin etiquetas. Un minigráfico no responde "cuánto", que
 * es lo que dice el número de al lado: responde "hacia dónde va".
 *
 * ── Por qué el ancho cede y el número no ─────────────────────────────────────
 * `WIDTH` y `HEIGHT` son el tamaño IDEAL y el sistema de coordenadas del dibujo,
 * no el tamaño en pantalla: eso lo fija el `w-16` de abajo, que puede encogerse.
 * Antes el SVG iba con `shrink-0`, o sea 64 px intocables, y en una tarjeta
 * estrecha el que se quedaba sin sitio era el número de al lado, que partía
 * "3,21 min" en dos líneas. Como eso pasaba a partir de una centésima de píxel,
 * dentro de una misma fila una tarjeta se iba a dos líneas y su vecina no, y el
 * grid quedaba con huecos.
 *
 * El orden de prioridad es el correcto al revés: el número es el dato y el
 * minigráfico es el contexto, así que cuando falta sitio encoge el gráfico.
 * `viewBox` hace que el dibujo se reescale solo — por eso las coordenadas de
 * aquí abajo no se enteran de nada.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const WIDTH = 64;
const HEIGHT = 20;
/** Sitio para el grosor del trazo y para el punto final, que se salen del centro. */
const PAD = 3;

type DefinedPoint = { readonly index: number; readonly value: number };

export function Sparkline({
  points,
  metric,
}: {
  points: readonly SeriesPoint[];
  metric: MetricDefinition;
}) {
  const defined: DefinedPoint[] = [];
  for (const [index, point] of points.entries()) {
    if (point.value !== undefined) defined.push({ index, value: point.value });
  }

  // Con un solo dato no hay tendencia que enseñar, y una línea de un punto es una
  // mancha que el ojo lee como información.
  if (defined.length < 2) return null;

  const values = defined.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;

  // La X se reparte sobre TODOS los períodos, no solo sobre los que tienen dato. Es
  // lo que hace que una semana ausente deje un hueco del ancho que le toca en vez de
  // encogerse hasta desaparecer: el eje es el tiempo, no la lista de valores.
  const x = (index: number) => (index / (points.length - 1)) * WIDTH;

  // Una serie plana se dibuja en el centro. Sin este caso, `span` valdría 0 y todas
  // las coordenadas saldrían NaN — un gráfico invisible y ningún error en consola.
  const y = (value: number) =>
    span === 0 ? HEIGHT / 2 : PAD + (1 - (value - min) / span) * (HEIGHT - PAD * 2);

  // Los tramos se cortan en cada hueco en vez de unir los extremos con una recta.
  // Unirlos dibujaría una evolución que nadie midió — la misma regla que en el
  // gráfico grande y en el ranking: ausencia no es cero, y tampoco es interpolación.
  const segments: string[] = [];
  const isolated: DefinedPoint[] = [];
  let run: DefinedPoint[] = [];

  const flush = () => {
    if (run.length > 1) {
      segments.push(run.map((point) => `${x(point.index)},${y(point.value)}`).join(" "));
    } else if (run.length === 1 && run[0]) {
      isolated.push(run[0]);
    }
    run = [];
  };

  for (const [index, point] of points.entries()) {
    if (point.value === undefined) flush();
    else run.push({ index, value: point.value });
  }
  flush();

  const last = defined[defined.length - 1];
  const first = defined[0];
  if (!last || !first) return null;

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      /* `min-w-0` es el que hace el trabajo: un elemento reemplazado (un SVG, una
         imagen) trae `min-width: auto`, que en la práctica significa "no encojas
         por debajo de tu tamaño propio". Sin ponerlo a 0, `shrink` no sirve de
         nada. Y sin `preserveAspectRatio` explícito el valor por defecto ya es el
         que queremos: el dibujo se reescala entero y se centra, sin deformar ni
         el punto final ni los extremos redondeados del trazo. */
      className="h-5 w-16 min-w-0 shrink overflow-visible"
      role="img"
      /* Un minigráfico sin descripción es una imagen vacía para un lector de
         pantalla. Se le cuenta el recorrido, que es justo lo que el vidente ve. */
      aria-label={`${metric.shortLabel}, ${defined.length} semanas: de ${formatMetricValue(
        first.value,
        metric,
      )} a ${formatMetricValue(last.value, metric)}`}
    >
      {segments.map((puntos) => (
        <polyline
          key={puntos}
          points={puntos}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {isolated.map((point) => (
        <circle
          key={point.index}
          cx={x(point.index)}
          cy={y(point.value)}
          r={1.2}
          fill="var(--color-brand)"
        />
      ))}

      {/* El punto final ancla el "ahora": sin él, el ojo no sabe por qué extremo se
          entra a leer la línea. */}
      <circle cx={x(last.index)} cy={y(last.value)} r={2} fill="var(--color-brand)" />
    </svg>
  );
}
