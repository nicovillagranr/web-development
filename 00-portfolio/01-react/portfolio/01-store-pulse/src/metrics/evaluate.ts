import type { Direction, MetricDefinition, Target, Tier } from "./types.ts";

/**
 * Convierte "qué tal va esto respecto a su objetivo" en un número donde
 * **más alto es siempre mejor**, venga la métrica de donde venga.
 *
 * Es el truco que evita escribir la lógica de cumplimiento dos veces (una para
 * tiempos, otra para pedidos) y triplicarla cada vez que aparezca una métrica rara:
 *
 *   higher-is-better →  valor / objetivo
 *   lower-is-better  →  objetivo / valor
 *
 * En los dos casos, 1,0 es justo el objetivo y por encima de 1,0 es mejor que el
 * objetivo. A partir de ahí, un único escalafón de umbrales sirve para todas.
 *
 * Devuelve `null` cuando la pregunta no tiene sentido, en vez de inventar un número:
 * eso es lo que la UI necesita para pintar "sin evaluar" en lugar de un falso 🟢.
 */
export function performanceRatio(
  value: number,
  target: number,
  direction: Direction,
): number | null {
  // Una métrica neutral no tiene "mejor": no se evalúa contra un objetivo.
  if (direction === "neutral") return null;

  if (!Number.isFinite(value) || !Number.isFinite(target)) return null;

  // Un objetivo de cero (o negativo) no se puede usar como referencia
  // proporcional. El caso real sería "cero errores", y ese no se mide con un
  // ratio sino con un sí/no — cuando aparezca se modela aparte.
  if (target <= 0) return null;

  if (direction === "higher-is-better") return value / target;

  // lower-is-better. Un valor de cero con objetivo positivo es rendimiento
  // insuperable (cero errores cuando se permitían algunos), y ese es justo el
  // significado de Infinity aquí: queda por encima de cualquier umbral.
  if (value <= 0) return Number.POSITIVE_INFINITY;

  return target / value;
}

/**
 * En qué escalón de cumplimiento cae un valor.
 *
 * Devuelve el `Tier` entero y no solo su id porque quien llama casi siempre quiere
 * también la etiqueta ("Supera") para pintarla.
 *
 * `null` significa "no evaluable": no hay objetivo, la métrica es neutral, o el
 * objetivo es degenerado. La UI debe distinguir eso de "va mal".
 */
export function evaluate(
  value: number,
  definition: MetricDefinition,
  target: Target | undefined,
): Tier | null {
  if (!target) return null;

  const ratio = performanceRatio(value, target.value, definition.direction);
  if (ratio === null) return null;

  // Se ordena de mayor a menor umbral y se coge el primero que el valor alcanza.
  // Ordenar aquí y no confiar en el orden del array es lo que permite que los
  // escalones vengan del backend algún día sin garantías de orden.
  const ladder = [...target.tiers].sort((a, b) => b.minRatio - a.minRatio);

  return ladder.find((tier) => ratio >= tier.minRatio) ?? null;
}
