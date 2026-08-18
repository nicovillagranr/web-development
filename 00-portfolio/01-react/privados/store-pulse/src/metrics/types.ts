/**
 * Vocabulario del dominio.
 *
 * Este archivo no importa nada: ni React, ni la red, ni el resto de la app. Es a
 * propósito. Todo `src/metrics/` está escrito para poder moverse tal cual a un
 * paquete compartido con el backend el día que exista, sin reescribir una línea.
 */

/**
 * Las métricas que la app conoce hoy.
 *
 * Es un array `as const` en vez de un enum porque el tsconfig tiene
 * `erasableSyntaxOnly`, que prohíbe los enums (no se pueden borrar al compilar).
 * A cambio se gana algo mejor: la lista existe también en tiempo de ejecución,
 * así que se puede recorrer para generar mocks, validar imports o pintar menús.
 */
export const METRIC_IDS = [
  // Productividad
  "total_orders",
  "partial_orders",
  // Tiempos
  "prep_time",
  "assignment_time",
  "picking_time",
  "packaging_time",
  // Calidad
  "inaccuracy_total",
  "wrong_missing_item",
  "wrong_order_never_arrived",
  "product_quality",
  "quality_total",
] as const;

export type MetricId = (typeof METRIC_IDS)[number];

/**
 * Hacia dónde está "mejor".
 *
 * El campo que evita el error más caro de este dominio. En Picking Time bajar es
 * mejorar; en Total Orders bajar es empeorar. Sin este dato, cualquier flecha,
 * color o ranking acierta en la mitad de las métricas y miente en la otra mitad.
 */
export type Direction = "higher-is-better" | "lower-is-better" | "neutral";

export type Unit = "minutes" | "percent" | "count";

export type Category = "productivity" | "quality" | "time";

/** A qué nivel de la app aplica una métrica. Una misma puede aplicar a varios. */
export type Scope = "worker" | "team" | "store";

/**
 * Si el significado de la métrica está confirmado con el local o es una suposición
 * leída de una captura.
 *
 * La Fase 0 (descubrimiento) sigue abierta y este campo la mantiene visible en el
 * código en vez de dejar que se olvide. Una métrica `assumed` se pinta con marca en
 * desarrollo y no se promete en la UI real.
 */
export type ConfirmationStatus = "confirmed" | "assumed";

export type MetricDefinition = {
  readonly id: MetricId;
  readonly label: string;
  /** Para la tab bar y las tarjetas estrechas, donde `label` no cabe a 375 px. */
  readonly shortLabel: string;
  readonly description: string;
  readonly scopes: readonly Scope[];
  readonly category: Category;
  readonly unit: Unit;
  readonly direction: Direction;
  /** Decimales a mostrar. Los tiempos van con 2, los pedidos con 0. */
  readonly precision: number;
  /**
   * Métricas cuya suma *debería* dar esta. Observado en los datos de muestra:
   * assignment (1,56) + picking (3,77) + packaging (1,58) = prep_time (6,91).
   *
   * Se guarda como invariante que se comprueba y avisa, NUNCA como fórmula que
   * calcula el valor. Son promedios, y los promedios de las partes solo suman el
   * promedio del total si todos los pedidos pasan por las tres etapas. Si algún
   * pedido se salta la asignación, dejará de cuadrar — y en ese caso queremos
   * enterarnos, no que la app invente un total que nadie midió.
   */
  readonly derivedFrom?: readonly MetricId[];
  readonly status: ConfirmationStatus;
};

/** Los escalones de cumplimiento. Provisionales hasta que la Fase 0 los confirme. */
export type TierId = "supera_amplia" | "supera" | "cerca" | "bajo";

export type Tier = {
  readonly id: TierId;
  readonly label: string;
  /**
   * Umbral mínimo de *ratio de desempeño* para entrar en este escalón.
   *
   * El ratio está normalizado para que "más alto" signifique siempre "mejor",
   * venga la métrica de donde venga (ver `performanceRatio`). 1,0 es justo el
   * objetivo. Gracias a esa normalización, un mismo escalafón sirve para tiempos,
   * porcentajes de error y pedidos sin escribir tres variantes.
   */
  readonly minRatio: number;
};

export type Target = {
  readonly metricId: MetricId;
  readonly value: number;
  readonly tiers: readonly Tier[];
};
