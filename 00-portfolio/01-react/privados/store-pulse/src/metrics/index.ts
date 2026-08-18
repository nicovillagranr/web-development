/**
 * La puerta de entrada al dominio de métricas.
 *
 * El resto de la app importa siempre desde aquí (`../metrics`) y nunca de los
 * archivos sueltos. Así, el día que esto se mueva a un paquete compartido con el
 * backend, la única línea que cambia en cada componente es la ruta del import.
 *
 * ── El nombre técnico ────────────────────────────────────────────────────────
 * A un archivo así se le llama **barrel file** (o *barrel export*): un índice que
 * reexporta lo público de una carpeta para que fuera exista un solo punto de
 * entrada. El nombre viene de "barril": muchas cosas metidas en un mismo envase.
 *
 * Tiene una contrapartida que conviene conocer: si un barrel reexporta MUCHO,
 * importar una sola función puede arrastrar todo el módulo y estorbar al
 * tree-shaking. Por eso los barriles se ponen por carpeta con sentido propio
 * (como esta), y no uno gigante en la raíz de `src/`.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export type {
  Category,
  ConfirmationStatus,
  Direction,
  MetricDefinition,
  MetricId,
  Scope,
  Target,
  Tier,
  TierId,
  Unit,
} from "./types.ts";
export { METRIC_IDS } from "./types.ts";

export {
  assumedMetrics,
  DEFAULT_TIERS,
  getMetric,
  getTarget,
  METRIC_LIST,
  METRICS,
  metricsForScope,
  TARGETS,
} from "./definitions.ts";

export { evaluate, performanceRatio } from "./evaluate.ts";
export { compare } from "./compare.ts";
export type { Comparison, Movement } from "./compare.ts";
export { checkDerived } from "./derived.ts";
export type { DerivedMismatch } from "./derived.ts";
export {
  formatMetricValue,
  formatNumber,
  formatPercentChange,
  formatPeriodLabel,
} from "./format.ts";
