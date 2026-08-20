import type { MetricDefinition, MetricId } from "./types.ts";

export type DerivedMismatch = {
  readonly metricId: MetricId;
  /** Lo que suman las partes. */
  readonly expected: number;
  /** Lo que dice la métrica total. */
  readonly actual: number;
  /** `actual - expected`, con signo. */
  readonly gap: number;
};

/**
 * Comprueba la relación observada `prep_time = assignment + picking + packaging`.
 *
 * **Comprueba y avisa. No calcula.** La diferencia importa: si la app calculara el
 * total sumando las partes, un fallo en los datos de origen se volvería invisible —
 * la pantalla siempre cuadraría, porque la app misma la estaría cuadrando.
 *
 * Y hay motivos de sobra para que deje de cuadrar. Son promedios, y los promedios de
 * las partes solo suman el promedio del total si todos los pedidos pasan por las tres
 * etapas con el mismo denominador. Un pedido que se salta la asignación ya rompe la
 * igualdad. Cuando eso pase queremos verlo, no taparlo.
 *
 * Devuelve `null` cuando no hay nada que comprobar (la métrica no es derivada, o
 * falta alguna parte) o cuando cuadra dentro de la tolerancia.
 *
 * @param tolerance Holgura absoluta. Por defecto 0,01 = un decimal más fino que la
 *   precisión con la que se muestran los tiempos, para no avisar por el redondeo de
 *   la propia fuente.
 */
export function checkDerived(
  definition: MetricDefinition,
  values: Partial<Record<MetricId, number>>,
  tolerance = 0.01,
): DerivedMismatch | null {
  const parts = definition.derivedFrom;
  if (!parts || parts.length === 0) return null;

  const actual = values[definition.id];
  if (actual === undefined) return null;

  let expected = 0;
  for (const part of parts) {
    const partValue = values[part];
    // Falta una pieza: no se puede afirmar que la suma esté mal, solo que no se
    // puede comprobar. Callar es lo correcto aquí.
    if (partValue === undefined) return null;
    expected += partValue;
  }

  const gap = actual - expected;
  if (Math.abs(gap) <= tolerance) return null;

  return { metricId: definition.id, expected, actual, gap };
}
