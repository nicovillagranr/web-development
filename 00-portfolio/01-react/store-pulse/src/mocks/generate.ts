import { METRIC_LIST } from "../metrics/index.ts";
import type { MetricDefinition, MetricId } from "../metrics/index.ts";
import type { Dataset, MetricSnapshot, Subject } from "../data/types.ts";
import { recentPeriods } from "../data/isoWeek.ts";
import { between, createRandom, seedFrom } from "./random.ts";

/**
 * Generador de datos ficticios.
 *
 * ⚠ TODO lo de este archivo es inventado. Ni un solo número sale del local real, y
 * los nombres son de relleno. Es un requisito del proyecto, no una fase temporal: el
 * repositorio es público y los datos de desempeño de personas identificables no
 * entran en él (ver el README).
 *
 * La regla que gobierna el archivo: **los datos se derivan del registro de métricas,
 * no se escriben a mano**. Si se escribieran a mano, el registro acabaría copiando
 * la forma del mock en vez de al revés, y dejaría de ser la fuente de verdad. La
 * consecuencia práctica es la que se puede comprobar en un minuto: añade una métrica
 * a `src/metrics/definitions.ts` y aparecerá aquí con datos plausibles sin tocar
 * este archivo.
 */

/** Nombres de relleno. Cualquier parecido con la realidad es casualidad. */
const WORKER_NAMES = [
  "Camila",
  "Nicolás",
  "María",
  "Ignacio",
  "Valentina",
  "Diego",
  "Josefa",
  "Matías",
] as const;

/**
 * El histórico termina en la semana 33 de 2026 (del 10 al 16 de agosto), que es la
 * última semana completa antes de la fecha del documento de origen. Fijo y no
 * `new Date()`: una demo cuyos datos cambian solos con el calendario acaba enseñando
 * una pantalla vacía el día que alguien la abra en 2027.
 */
const ANCHOR = { isoYear: 2026, isoWeek: 33 } as const;

const WEEKS_OF_HISTORY = 8;

/** Lunes 17 de agosto, 08:32 en Santiago (UTC-4). El ejemplo literal del §18. */
const UPDATED_AT = "2026-08-17T12:32:00.000Z";

/**
 * Valores de partida por métrica, tomados de las capturas del documento.
 *
 * Las métricas derivadas (`prep_time`, `quality_total`) NO están aquí a propósito:
 * se calculan sumando sus partes, para que el invariante `assignment + picking +
 * packaging = prep_time` se cumpla también en la demo y el aviso de descuadre pueda
 * probarse de verdad.
 */
const BASELINE: Partial<Record<MetricId, number>> = {
  total_orders: 190,
  partial_orders: 1.2,
  assignment_time: 1.55,
  picking_time: 3.9,
  packaging_time: 1.6,
  inaccuracy_total: 1.7,
  wrong_missing_item: 0.8,
  wrong_order_never_arrived: 0.5,
  product_quality: 0.35,
};

/**
 * Con qué número empezar para una métrica.
 *
 * El `switch` final es lo que hace que el generador no se rompa cuando aparezca una
 * métrica nueva en el registro: si nadie le puso valor de partida, se le da uno
 * razonable según su unidad. Degradar bien es lo que permite prometer que añadir una
 * métrica es añadir una fila.
 */
function baselineFor(metric: MetricDefinition): number {
  const explicit = BASELINE[metric.id];
  if (explicit !== undefined) return explicit;

  switch (metric.unit) {
    case "count":
      return 100;
    case "percent":
      return 2;
    case "minutes":
      return 3;
  }
}

function round(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

/**
 * Un valor plausible para una métrica.
 *
 * Tres factores, y el signo de cada uno depende de `direction` — que es justamente
 * lo que hace que el mock sea coherente sin saber qué métrica está generando:
 *
 *   skill    destreza de la persona, estable entre semanas
 *   load     carga de esa semana en todo el local (más pedidos, más lentitud)
 *   trend    una mejora sostenida a lo largo del histórico, para que los gráficos
 *            de evolución cuenten algo en vez de ser ruido plano
 */
function generateValue(
  metric: MetricDefinition,
  skill: number,
  load: number,
  progress: number,
  random: () => number,
): number {
  const base = baselineFor(metric);
  const noise = between(random, 0.94, 1.06);
  const trend = 1 + progress * 0.06;

  const factor =
    metric.direction === "lower-is-better"
      ? (load * noise) / (skill * trend)
      : skill * trend * load * noise;

  return round(base * factor, metric.precision);
}

/**
 * Rellena las métricas derivadas sumando sus partes.
 *
 * Aquí sí se calcula, porque estamos fabricando datos de mentira. En la app real la
 * suma solo se comprueba (ver `checkDerived`): calcularla allí escondería los
 * descuadres del origen en vez de enseñarlos.
 */
function applyDerived(values: Partial<Record<MetricId, number>>): void {
  for (const metric of METRIC_LIST) {
    const parts = metric.derivedFrom;
    if (!parts || parts.length === 0) continue;

    let sum = 0;
    let complete = true;

    for (const part of parts) {
      const partValue = values[part];
      if (partValue === undefined) {
        complete = false;
        break;
      }
      sum += partValue;
    }

    if (complete) values[metric.id] = round(sum, metric.precision);
  }
}

/** Las métricas que hay que generar al azar para un ámbito: las no derivadas. */
function generableMetrics(scope: "worker" | "store"): MetricDefinition[] {
  return METRIC_LIST.filter((metric) => metric.scopes.includes(scope) && !metric.derivedFrom);
}

export type MockOptions = {
  /** Semanas de histórico. Por defecto 8. */
  readonly weeks?: number;
  /** Cambia la semilla para obtener otro local ficticio con la misma forma. */
  readonly seed?: string;
  /** Cuántos trabajadores. Por defecto, todos los nombres disponibles. */
  readonly workerCount?: number;
};

export function generateDataset(options: MockOptions = {}): Dataset {
  const weeks = options.weeks ?? WEEKS_OF_HISTORY;
  const seedPrefix = options.seed ?? "store-pulse";
  const workerCount = Math.min(options.workerCount ?? WORKER_NAMES.length, WORKER_NAMES.length);

  const periods = recentPeriods(ANCHOR.isoYear, ANCHOR.isoWeek, weeks);

  const workers: Subject[] = WORKER_NAMES.slice(0, workerCount).map((name, index) => ({
    id: `w-${String(index + 1).padStart(2, "0")}`,
    kind: "worker",
    displayName: name,
  }));

  const store: Subject = { id: "store", kind: "store", displayName: "Local" };

  // La carga de cada semana la comparte todo el local: si una semana fue dura, lo
  // fue para todos. Sin esto, las series de cada persona subirían y bajarían de
  // forma independiente y el gráfico del local saldría sospechosamente plano.
  const loadByPeriod = new Map<string, number>();
  for (const period of periods) {
    loadByPeriod.set(
      period.id,
      between(createRandom(seedFrom(`${seedPrefix}|${period.id}`)), 0.92, 1.08),
    );
  }

  const snapshots: MetricSnapshot[] = [];
  const workerMetrics = generableMetrics("worker");
  const storeOnlyMetrics = generableMetrics("store").filter(
    (metric) => !metric.scopes.includes("worker"),
  );

  for (const [periodIndex, period] of periods.entries()) {
    // 0 en la semana más antigua, 1 en la más reciente.
    const progress = periods.length > 1 ? periodIndex / (periods.length - 1) : 1;
    const load = loadByPeriod.get(period.id) ?? 1;

    // Se irán acumulando para construir la fila del local sin volver a inventarlas.
    const totals = new Map<MetricId, number[]>();

    for (const worker of workers) {
      const skill = between(createRandom(seedFrom(`${seedPrefix}|skill|${worker.id}`)), 0.88, 1.12);
      const random = createRandom(seedFrom(`${seedPrefix}|${worker.id}|${period.id}`));

      const values: Partial<Record<MetricId, number>> = {};
      for (const metric of workerMetrics) {
        const value = generateValue(metric, skill, load, progress, random);
        values[metric.id] = value;

        const bucket = totals.get(metric.id);
        if (bucket) bucket.push(value);
        else totals.set(metric.id, [value]);
      }

      applyDerived(values);
      snapshots.push({ subjectId: worker.id, periodId: period.id, values });
    }

    // ── La fila del local ────────────────────────────────────────────────────
    // Se agrega desde las de las personas en vez de inventarse aparte. Así el
    // dashboard del local y la vista de equipo no pueden contradecirse, que es un
    // fallo clásico de estos paneles y de los que más confianza cuestan.
    const storeValues: Partial<Record<MetricId, number>> = {};

    for (const metric of workerMetrics) {
      const collected = totals.get(metric.id);
      if (!collected || collected.length === 0) continue;

      const sum = collected.reduce((acc, value) => acc + value, 0);
      // Los pedidos se suman (el local hizo todos); los tiempos y porcentajes se
      // promedian (sumar minutos de personas distintas no significaría nada).
      const aggregated = metric.unit === "count" ? sum : sum / collected.length;
      storeValues[metric.id] = round(aggregated, metric.precision);
    }

    const storeRandom = createRandom(seedFrom(`${seedPrefix}|store|${period.id}`));
    for (const metric of storeOnlyMetrics) {
      storeValues[metric.id] = generateValue(metric, 1, load, progress, storeRandom);
    }

    applyDerived(storeValues);
    snapshots.push({ subjectId: store.id, periodId: period.id, values: storeValues });
  }

  return { updatedAt: UPDATED_AT, periods, workers, store, snapshots };
}
