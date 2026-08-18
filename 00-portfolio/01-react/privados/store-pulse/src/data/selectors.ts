import type { MetricDefinition, MetricId } from "../metrics/index.ts";
import type { Dataset, MetricSnapshot, Period, Subject } from "./types.ts";

/**
 * Consultas sobre un `Dataset` ya cargado.
 *
 * Funciones puras, sin React y sin red, por el mismo motivo que `src/metrics/`: es
 * donde vive la lógica que de verdad puede equivocarse (rankings, series, huecos en
 * el histórico) y se quiere poder probarla sin montar una pantalla.
 */

/** El período más reciente. `undefined` solo si el dataset viniera vacío. */
export function latestPeriod(dataset: Dataset): Period | undefined {
  return dataset.periods[dataset.periods.length - 1];
}

/** El período inmediatamente anterior a uno dado, si existe. */
export function previousPeriod(dataset: Dataset, periodId: string): Period | undefined {
  const index = dataset.periods.findIndex((period) => period.id === periodId);
  if (index <= 0) return undefined;
  return dataset.periods[index - 1];
}

export function findWorker(dataset: Dataset, workerId: string): Subject | undefined {
  return dataset.workers.find((worker) => worker.id === workerId);
}

export function snapshotFor(
  dataset: Dataset,
  subjectId: string,
  periodId: string,
): MetricSnapshot | undefined {
  return dataset.snapshots.find(
    (snapshot) => snapshot.subjectId === subjectId && snapshot.periodId === periodId,
  );
}

export function valueOf(
  dataset: Dataset,
  subjectId: string,
  periodId: string,
  metricId: MetricId,
): number | undefined {
  return snapshotFor(dataset, subjectId, periodId)?.values[metricId];
}

export type SeriesPoint = {
  readonly period: Period;
  /** `undefined` cuando ese período no tiene dato: un hueco, no un cero. */
  readonly value: number | undefined;
};

/**
 * La serie histórica de una métrica para un sujeto, en orden cronológico.
 *
 * Devuelve un punto por período **aunque falte el dato**, con `value: undefined`.
 * Es la diferencia entre un gráfico que dibuja un hueco (correcto: esa semana no
 * trabajó) y uno que dibuja una caída a cero (mentira).
 */
export function seriesFor(
  dataset: Dataset,
  subjectId: string,
  metricId: MetricId,
): readonly SeriesPoint[] {
  return dataset.periods.map((period) => ({
    period,
    value: valueOf(dataset, subjectId, period.id, metricId),
  }));
}

export type RankedWorker = {
  readonly worker: Subject;
  readonly value: number;
  /** 1 es el mejor según la dirección de la métrica. */
  readonly position: number;
};

/**
 * Ordena a los trabajadores por una métrica, **de mejor a peor**.
 *
 * "Mejor" lo decide la dirección de la métrica, no el tamaño del número: en Picking
 * Time el primero es el más rápido (valor más bajo) y en pedidos el que más hizo.
 * Ordenar siempre descendente sería correcto en la mitad de las métricas y estaría
 * exactamente del revés en la otra mitad.
 *
 * Quien no tiene dato ese período queda fuera de la lista en lugar de aparecer con
 * un cero: una ausencia no es un mal rendimiento.
 */
export function rankingBy(
  dataset: Dataset,
  metric: MetricDefinition,
  periodId: string,
): readonly RankedWorker[] {
  const entries: { worker: Subject; value: number }[] = [];

  for (const worker of dataset.workers) {
    const value = valueOf(dataset, worker.id, periodId, metric.id);
    if (value === undefined) continue;
    entries.push({ worker, value });
  }

  const ascending = metric.direction === "lower-is-better";
  entries.sort((a, b) => (ascending ? a.value - b.value : b.value - a.value));

  return entries.map((entry, index) => ({ ...entry, position: index + 1 }));
}

/**
 * La mediana de una lista de números.
 *
 * Mediana y no media: con equipos de 6–10 personas, un solo turno raro desplaza la
 * media lo suficiente como para mover la referencia de todo el mundo. La mediana
 * aguanta ese valor atípico sin moverse.
 */
export function median(values: readonly number[]): number | undefined {
  if (values.length === 0) return undefined;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) return sorted[middle];

  const lower = sorted[middle - 1];
  const upper = sorted[middle];
  if (lower === undefined || upper === undefined) return undefined;
  return (lower + upper) / 2;
}
