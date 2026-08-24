import type { Comparison, MetricDefinition } from "../metrics/index.ts";
import { formatMetricValue, formatPercentChange } from "../metrics/index.ts";

/**
 * La variación respecto al período anterior.
 *
 * Aquí se ve, en diez líneas, la decisión que sostiene toda la app: **la flecha sale
 * de `movement` y el color sale de `improved`.** Son dos preguntas distintas.
 *
 *   Prep Time bajó   → flecha ▼ , color verde  (bajar es mejorar)
 *   Pedidos bajaron  → flecha ▼ , color rojo   (bajar es empeorar)
 *
 * Si el color se dedujera de la flecha, la mitad de las métricas se pintaría al
 * revés. Es el fallo más común de estos paneles y el más difícil de detectar,
 * porque la pantalla sigue pareciendo correcta.
 */
const ARROWS = { up: "▲", down: "▼", flat: "→" } as const;

export function DeltaIndicator({
  comparison,
  referenceLabel,
  metric,
}: {
  comparison: Comparison | null;
  /**
   * "vs S32". Se omite en listas donde ya está dicho una vez arriba.
   *
   * Se declara `?: string | undefined` y no solo `?: string` por
   * `exactOptionalPropertyTypes`: en un modelo de datos distinguir "no está la
   * clave" de "está y vale undefined" es útil, pero en props de React las dos cosas
   * son literalmente lo mismo, y exigir la distinción solo obliga a quien llama a
   * hacer malabares para no pasar `undefined`.
   */
  referenceLabel?: string | undefined;
  /**
   * Si se pasa, la variación se enseña en la unidad de la métrica ("0,25 min") en
   * vez de en porcentaje ("7,2%").
   *
   * Existe porque los dos no son intercambiables para quien lee. "Bajó 0,25 min" se
   * entiende de golpe; "bajó un 7,2%" obliga a calcular sobre un número que no está
   * en pantalla. Y en las métricas que ya vienen en porcentaje, enseñar la variación
   * relativa junta dos porcentajes que significan cosas distintas en la misma línea:
   * la diferencia en puntos y el cambio relativo.
   *
   * No se enseñan los dos a la vez a propósito. Una tarjeta de ranking tiene sitio
   * para un dato de contexto, no para dos que hay que distinguir.
   */
  metric?: MetricDefinition | undefined;
}) {
  // Sin período anterior no hay nada que comparar: la primera semana del histórico,
  // o alguien que acaba de entrar. Decirlo es más honesto que pintar un 0%.
  if (!comparison) {
    return <span className="text-ink-faint text-xs">Sin histórico</span>;
  }

  const tone =
    comparison.improved === true
      ? "text-good"
      : comparison.improved === false
        ? "text-bad"
        : "text-ink-soft";

  const meaning =
    comparison.improved === true
      ? "mejora"
      : comparison.improved === false
        ? "empeora"
        : "sin cambio";

  return (
    /* `whitespace-nowrap` mantiene la línea entera de una pieza. Sin él, en una
       tarjeta estrecha "▼ 0,25 min vs S32" se repartía en dos o tres líneas, y como
       cada persona tiene su propio texto, dos tarjetas vecinas acababan con alturas
       distintas. Lo que cede aquí es la referencia: es el único trozo que se repite
       igual en las catorce tarjetas, así que recortarlo no pierde información. */
    <span
      className={`inline-flex min-w-0 items-center gap-1 text-xs font-medium whitespace-nowrap ${tone}`}
    >
      <span aria-hidden="true">{ARROWS[comparison.movement]}</span>
      <span className="tabular">
        {metric
          ? // El signo ya lo lleva la flecha; repetirlo daría "▼ -0,25".
            formatMetricValue(Math.abs(comparison.delta), metric)
          : // Sin base no hay porcentaje: `pct` es null cuando el período anterior
            // valía 0, y "subió un ∞%" no se le dice a nadie.
            comparison.pct === null
            ? "nuevo"
            : formatPercentChange(comparison.pct)}
      </span>
      {/* El lector de pantalla recibe el significado, no el símbolo: "▲ 4,2%" leído
          en voz alta no dice si eso es bueno. */}
      <span className="sr-only">({meaning})</span>
      {referenceLabel ? (
        <span className="text-ink-faint min-w-0 truncate font-normal">{referenceLabel}</span>
      ) : null}
    </span>
  );
}
