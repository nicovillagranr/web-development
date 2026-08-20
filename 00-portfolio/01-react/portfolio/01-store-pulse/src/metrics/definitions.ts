import type { MetricDefinition, MetricId, Target, Tier } from "./types.ts";

/**
 * EL REGISTRO.
 *
 * La pieza sobre la que se apoya todo lo demás. La UI no sabe qué es "Tiempo de
 * picking": sabe leer un `MetricDefinition` y pintarlo. Por eso **añadir una métrica
 * nueva es añadir una entrada aquí**, no escribir un componente.
 *
 * El tipo es `Record<MetricId, MetricDefinition>` y no un array por un motivo
 * concreto: si mañana se añade un id a `METRIC_IDS` y se olvida definirlo aquí,
 * TypeScript no compila. El olvido se convierte en error de build en vez de en un
 * hueco en blanco que aparece en producción.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠ TODAS las métricas siguen en `status: 'assumed'`.
 *
 * El listado de indicadores del local (18 ago 2026) confirmó **qué existe y cómo se
 * llama**: de ahí salen los `sourceLabel` de abajo y las tres métricas nuevas. Lo
 * que NO confirmó es qué mide cada una, que es justo lo que `status` declara. La
 * Fase 0 sigue abierta con diez preguntas sin responder.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Los nombres visibles van en español porque la app se usa en español. El nombre de
 * la fuente se guarda aparte, en `sourceLabel`, y no por completitud: el importador
 * de la Fase 6 buscará las columnas del Excel por esa cadena literal.
 */
export const METRICS: Record<MetricId, MetricDefinition> = {
  // ── Productividad ──────────────────────────────────────────────────────────
  total_orders: {
    id: "total_orders",
    label: "Pedidos totales",
    sourceLabel: "Total orders",
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
    label: "Pedidos parciales",
    sourceLabel: "Partial Orders",
    shortLabel: "Parciales",
    description:
      "Porcentaje de pedidos entregados incompletos. Ojo: la fuente lo agrupa con " +
      "productividad, pero un pedido incompleto se parece más a un fallo de calidad. Y " +
      "ahora hay una pista nueva: si existe el tamaño de cesta, un pedido parcial podría " +
      "ser simplemente que no había stock — que no es culpa de nadie del local.",
    scopes: ["worker", "team", "store"],
    category: "productivity",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  basket_size: {
    id: "basket_size",
    label: "Tamaño de cesta",
    sourceLabel: "Basket size",
    shortLabel: "Cesta",
    description:
      "Artículos que lleva un pedido, en promedio. Es el denominador que faltaba para " +
      "leer los tiempos: un picking de 6 minutos con 40 artículos es excelente y el mismo " +
      "picking de 6 minutos con 5 artículos es lentísimo. Sin este dato, comparar tiempos " +
      "entre personas o entre semanas es comparar cosas distintas y llamarlas iguales.",
    scopes: ["worker", "team", "store"],
    category: "productivity",
    // `neutral` es una decisión, no un campo sin rellenar: que la cesta suba no es
    // logro de nadie ni problema de nadie, depende de lo que compre la gente. Al ser
    // neutral no se evalúa contra objetivo ni se colorea, así que puede aparecer en
    // la ficha de una persona como contexto sin convertirse en una nota.
    direction: "neutral",
    unit: "items-per-order",
    precision: 1,
    status: "assumed",
  },

  // ── Tiempos ────────────────────────────────────────────────────────────────
  prep_time: {
    id: "prep_time",
    label: "Tiempo de preparación",
    sourceLabel: "Prep Time",
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
    label: "Tiempo de asignación",
    sourceLabel: "Assignment Time",
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
    label: "Tiempo de picking",
    sourceLabel: "Picking Time",
    shortLabel: "Picking",
    description: "Tiempo recogiendo los productos por el local. Es la etapa más larga de las tres.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  item_picking_time: {
    id: "item_picking_time",
    label: "Tiempo de picking por artículo",
    sourceLabel: "Item Picking Time",
    shortLabel: "Por artículo",
    description:
      "Cuánto se tarda en recoger UN artículo. Es la medida justa para comparar personas: " +
      "el picking a secas castiga a quien le tocaron los pedidos grandes, que no es una " +
      "forma de trabajar peor sino un reparto distinto.",
    scopes: ["worker", "team", "store"],
    category: "time",
    unit: "minutes-per-item",
    direction: "lower-is-better",
    precision: 2,
    // Sin `derivedFrom` a propósito, aunque se sospeche que sale de otras dos.
    //
    // La relación probable es `picking_time ÷ basket_size`, y `derivedFrom` solo sabe
    // de SUMAS: declararla aquí haría que checkDerived sumara picking + cesta y
    // avisara de un descuadre que no existe. Además la hipótesis está sin verificar
    // (basta coger una captura y dividir). Hasta que se confirme la fórmula, esto es
    // una métrica que llega medida, no calculada — que es como llega de la fuente.
    status: "assumed",
  },

  packaging_time: {
    id: "packaging_time",
    label: "Tiempo de empaque",
    sourceLabel: "Packaging Time",
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
    label: "Inexactitud total",
    sourceLabel: "Inaccuracy Total",
    shortLabel: "Inexactitud",
    description:
      "Porcentaje de pedidos con algún tipo de error atribuible a la preparación. El " +
      "listado del local sugiere que se descompone en las dos inexactitudes de abajo, " +
      "pero está sin confirmar que sean solo dos y que sumen exactamente el total.",
    scopes: ["worker", "team", "store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  inaccuracy_wm_item: {
    id: "inaccuracy_wm_item",
    label: "Inexactitud por producto equivocado o faltante",
    sourceLabel: "Inaccuracy WM Item",
    shortLabel: "Producto mal/falta",
    description:
      "Incidencias por producto equivocado o ausente. El prefijo del nombre original es " +
      "el dato: dice que esto es una PARTE de la inexactitud total, no una incidencia " +
      "suelta que se sume por su cuenta.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  wrong_order_never_arrived: {
    id: "wrong_order_never_arrived",
    label: "Pedido equivocado o no entregado",
    sourceLabel: "Wrong order & never arrived",
    shortLabel: "Pedido mal/no llegó",
    description:
      "Incidencias por pedido equivocado o que nunca llegó al cliente. ⚠ No aparece en el " +
      "listado del local del 18 ago 2026: se leyó de una captura y podría no existir, o " +
      "llamarse de otra forma, o estar contenida en otra. Antes de quitarla hay que mirar " +
      "una captura completa.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  inaccuracy_pq: {
    id: "inaccuracy_pq",
    label: "Inexactitud por calidad de producto",
    sourceLabel: "Inaccuracy PQ",
    shortLabel: "Calidad producto",
    description:
      "Incidencias por estado del producto: caducado, dañado o en mal estado. Como la de " +
      "producto equivocado, el prefijo la delata como parte de la inexactitud total.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    status: "assumed",
  },

  quality_total: {
    id: "quality_total",
    // Sin `sourceLabel`, y la ausencia significa algo: esta métrica no está en el
    // listado del local. La inventó la app para tener un total que descomponer, y
    // ahora sabemos que ese total ya existe de verdad y se llama Inaccuracy Total.
    // Sobra una de las dos; antes de borrar hay que mirar una captura completa.
    label: "Total incidencias",
    shortLabel: "Incidencias",
    description:
      "Suma de las incidencias de calidad. Es el número que se descompone en el gráfico. " +
      "⚠ Duplica a la inexactitud total, que sí existe en la fuente.",
    scopes: ["store"],
    category: "quality",
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
    derivedFrom: ["inaccuracy_wm_item", "wrong_order_never_arrived", "inaccuracy_pq"],
    status: "assumed",
  },

  // ── Entregas ───────────────────────────────────────────────────────────────
  dmart_late: {
    id: "dmart_late",
    label: "Retrasos Dmart",
    sourceLabel: "Dmart Late",
    shortLabel: "Retrasos",
    description:
      "Algo que llega tarde en los pedidos de Dmart. ⚠ Es lo único que se sabe: el nombre " +
      "está en el listado del local y su significado no. Puede ser un pedido entregado " +
      "fuera de plazo, un pedido que el local terminó tarde, o un retraso del reparto ya " +
      "fuera del local.",
    // Solo el local, y a propósito. La tercera lectura posible —retraso del reparto
    // una vez que el pedido sale— no es responsabilidad de quien prepara, y meterla
    // en la ficha de una persona sería exactamente el tipo de dato injusto que esta
    // app se propuso no tener. Mientras no se sepa cuál de las tres es, el ámbito
    // seguro es el que no señala a nadie. Se amplía cuando el local responda.
    scopes: ["store"],
    category: "delivery",
    // Unidad y dirección son la suposición mínima que permite pintarla: "Late" apunta
    // a que menos es mejor, y el resto de indicadores de incidencia vienen en
    // porcentaje. Si llega como conteo, se cambia esta línea.
    unit: "percent",
    direction: "lower-is-better",
    precision: 2,
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
 * Las métricas que la app tiene y la fuente no menciona.
 *
 * Es el reverso de `assumedMetrics`: allí el nombre es real y el significado está en
 * duda; aquí lo que está en duda es que la métrica exista siquiera. Se deduce de la
 * ausencia de `sourceLabel`, así que no hay una segunda lista que mantener — el día
 * que se confirme cómo se llama en el Excel, la métrica sale de aquí sola.
 */
export function unlistedMetrics(): readonly MetricDefinition[] {
  return METRIC_LIST.filter((metric) => metric.sourceLabel === undefined);
}

/**
 * El escalafón de cumplimiento por defecto.
 *
 * ⚠ PROVISIONAL. La fuente solo menciona "Supera" y "Supera amplia", y avisa de que
 * pueden existir más estados. Los cortes de aquí abajo están elegidos para
 * reproducir los dos únicos ejemplos reales que tenemos:
 *
 *   Tiempo de picking  3,77 vs objetivo 4,20  → ratio 1,11 → "Supera"  ✓
 *   Inexactitud total  1,65 % vs objetivo 2 % → ratio 1,21 → "Supera"  ✓
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
 * Los objetivos conocidos. Siguen siendo dos, ambos leídos de las capturas.
 *
 * El listado del 18 ago 2026 no trajo ninguno nuevo, así que las demás métricas se
 * muestran sin evaluar en vez de con un objetivo inventado. Las neutrales, como el
 * tamaño de cesta, no llevarán objetivo nunca: no hay un "mejor" hacia el que ir.
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
