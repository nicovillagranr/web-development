import type { MetricDefinition, MetricId, Target, Tier } from "./types.ts";

/**
 * EL REGISTRO.
 *
 * La pieza sobre la que se apoya todo lo demás. La UI no sabe qué es "Picking Time":
 * sabe leer un `MetricDefinition` y pintarlo. Por eso **añadir una métrica nueva es
 * añadir una entrada aquí**, no escribir un componente.
 *
 * El tipo es `Record<MetricId, MetricDefinition>` y no un array por un motivo
 * concreto: si mañana se añade un id a `METRIC_IDS` y se olvida definirlo aquí,
 * TypeScript no compila. El olvido se convierte en error de build en vez de en un
 * hueco en blanco que aparece en producción.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠ TODAS las métricas están hoy en `status: 'assumed'`.
 *
 * No es dejadez: es el estado real. La Fase 0 (preguntar en el local qué significa
 * cada indicador) sigue abierta, y todo lo de aquí está leído de capturas. Según se
 * vayan confirmando, pasan a `'confirmed'` una a una.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const METRICS: Record<MetricId, MetricDefinition> = {
  // ── Productividad ──────────────────────────────────────────────────────────
  total_orders: {
    id: "total_orders",
    label: "Total orders",
    shortLabel: "Pedidos",
    description: "Pedidos preparados en el período.",
    scopes: ["worker", "team", "store"],
    category: "productivity",
    unit: "count",
    direction: "higher-is-better",
    precision: 0,
    status: "assumed",
  },

  partial_orders: {
    id: "partial_orders",
    label: "Partial orders",
    shortLabel: "Parciales",
    description:
      "Porcentaje de pedidos entregados incompletos. Ojo: el documento de origen lo " +
      "agrupa con productividad, pero un pedido incompleto se parece más a un fallo de " +
      "calidad. Es de las primeras cosas que hay que preguntar en el local.",
    scopes: ["worker", "team", "store"],
    category: "productivity",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  // ── Tiempos ────────────────────────────────────────────────────────────────
  prep_time: {
    id: "prep_time",
    label: "Prep Time",
    shortLabel: "Prep",
    description: "Tiempo total de preparación de un pedido, de punta a punta.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes",
    direction: "lower-is-better",
    precision: 2,
    // 1,56 + 3,77 + 1,58 = 6,91 en la muestra. Ver la nota larga en types.ts:
    // esto se comprueba y se avisa, no se calcula.
    derivedFrom: ["assignment_time", "picking_time", "packaging_time"],
    status: "assumed",
  },

  assignment_time: {
    id: "assignment_time",
    label: "Assignment time",
    shortLabel: "Asignación",
    description: "Tiempo desde que entra el pedido hasta que alguien lo toma.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  picking_time: {
    id: "picking_time",
    label: "Picking Time",
    shortLabel: "Picking",
    description: "Tiempo recogiendo los productos por el local.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  packaging_time: {
    id: "packaging_time",
    label: "Packaging time",
    shortLabel: "Empaque",
    description: "Tiempo empaquetando el pedido ya recogido.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  // ── Calidad ────────────────────────────────────────────────────────────────
  inaccuracy_total: {
    id: "inaccuracy_total",
    label: "Inaccuracy Total",
    shortLabel: "Inaccuracy",
    description: "Porcentaje de pedidos con algún tipo de error atribuible a la preparación.",
    scopes: ["worker", "team", "store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  wrong_missing_item: {
    id: "wrong_missing_item",
    label: "Wrong & Missing Item",
    shortLabel: "Producto mal/falta",
    description: "Incidencias por producto equivocado o ausente.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  wrong_order_never_arrived: {
    id: "wrong_order_never_arrived",
    label: "Wrong order & never arrived",
    shortLabel: "Pedido mal/no llegó",
    description: "Incidencias por pedido equivocado o que nunca llegó al cliente.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  product_quality: {
    id: "product_quality",
    label: "Product Quality",
    shortLabel: "Calidad producto",
    description: "Incidencias por estado del producto (caducado, dañado, en mal estado).",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  quality_total: {
    id: "quality_total",
    label: "Total incidencias",
    shortLabel: "Incidencias",
    description:
      "Suma de las incidencias de calidad. Es el número que se descompone en el gráfico.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    derivedFrom: ["wrong_missing_item", "wrong_order_never_arrived", "product_quality"],
    status: "assumed",
  },
};

/** Las métricas como lista, en el orden en que se declararon arriba. */
export const METRIC_LIST: readonly MetricDefinition[] = Object.values(METRICS);

export function getMetric(id: MetricId): MetricDefinition {
  return METRICS[id];
}

export function metricsForScope(
  scope: MetricDefinition["scopes"][number],
): readonly MetricDefinition[] {
  return METRIC_LIST.filter((metric) => metric.scopes.includes(scope));
}

/**
 * Las métricas cuyo significado sigue sin confirmar con el local.
 *
 * Existe para que la Fase 0 pendiente sea visible desde la propia app (un aviso en
 * desarrollo) en lugar de vivir solo en un documento que nadie vuelve a abrir.
 */
export function assumedMetrics(): readonly MetricDefinition[] {
  return METRIC_LIST.filter((metric) => metric.status === "assumed");
}

/**
 * El escalafón de cumplimiento por defecto.
 *
 * ⚠ PROVISIONAL. El documento de origen solo menciona "Supera" y "Supera amplia", y
 * avisa de que pueden existir más estados. Los cortes de aquí abajo están elegidos
 * para reproducir los dos únicos ejemplos reales que tenemos:
 *
 *   Picking Time  3,77 vs objetivo 4,20  → ratio 1,11 → "Supera"  ✓
 *   Inaccuracy    1,65 % vs objetivo 2 % → ratio 1,21 → "Supera"  ✓
 *
 * Es decir: son la hipótesis más floja que no contradice los datos conocidos. En
 * cuanto el local confirme los cortes reales, se cambian estos números y toda la app
 * se entera sola — nadie más los conoce.
 */
export const DEFAULT_TIERS: readonly Tier[] = [
  { id: "supera_amplia", label: "Supera amplia", minRatio: 1.25 },
  { id: "supera", label: "Supera", minRatio: 1.0 },
  { id: "cerca", label: "Cerca", minRatio: 0.95 },
  { id: "bajo", label: "Bajo objetivo", minRatio: Number.NEGATIVE_INFINITY },
];

/**
 * Los objetivos conocidos. Solo hay dos, ambos leídos de las capturas del §6.
 *
 * Viven separados del registro porque un objetivo cambia (el local sube el listón el
 * trimestre que viene) y la definición de la métrica no. Cuando esto pase al backend
 * será una tabla con vigencia por fecha; aquí basta un mapa.
 */
export const TARGETS: Partial<Record<MetricId, Target>> = {
  picking_time: { metricId: "picking_time", value: 4.2, tiers: DEFAULT_TIERS },
  inaccuracy_total: { metricId: "inaccuracy_total", value: 2.0, tiers: DEFAULT_TIERS },
};

export function getTarget(id: MetricId): Target | undefined {
  return TARGETS[id];
}
