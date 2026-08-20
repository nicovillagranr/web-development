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
  "basket_size",
  // Tiempos
  "prep_time",
  "assignment_time",
  "picking_time",
  "item_picking_time",
  "packaging_time",
  // Calidad
  "inaccuracy_total",
  "inaccuracy_wm_item",
  "wrong_order_never_arrived",
  "inaccuracy_pq",
  "quality_total",
  // Entregas
  "dmart_late",
] as const;

export type MetricId = (typeof METRIC_IDS)[number];

/**
 * Hacia dónde está "mejor".
 *
 * El campo que evita el error más caro de este dominio. En Picking Time bajar es
 * mejorar; en Total Orders bajar es empeorar. Sin este dato, cualquier flecha,
 * color o ranking acierta en la mitad de las métricas y miente en la otra mitad.
 *
 * `neutral` no es un hueco a rellenar más adelante: es una respuesta. El tamaño de
 * cesta sube o baja según lo que compre la gente, y ni subir ni bajar es mérito o
 * culpa de nadie del local. Una métrica neutral no se evalúa contra un objetivo ni
 * se pinta de color (ver `performanceRatio` y `compare`).
 */
export type Direction = "higher-is-better" | "lower-is-better" | "neutral";

/**
 * En qué se mide.
 *
 * Las dos unidades "por" existen porque el listado del local trae dos indicadores
 * que son cocientes, no cantidades: artículos POR pedido y minutos POR artículo. Si
 * se colaran como `count` y `minutes`, la fila del local los sumaría en vez de
 * promediarlos y saldría un local con cestas de cien artículos.
 */
export type Unit = "minutes" | "percent" | "count" | "items-per-order" | "minutes-per-item";

export type Category = "productivity" | "quality" | "time" | "delivery";

/** A qué nivel de la app aplica una métrica. Una misma puede aplicar a varios. */
export type Scope = "worker" | "team" | "store";

/**
 * Si el significado de la métrica está confirmado con el local o es una suposición
 * leída de una captura.
 *
 * La Fase 0 (descubrimiento) sigue abierta y este campo la mantiene visible en el
 * código en vez de dejar que se olvide. Una métrica `assumed` se pinta con marca en
 * desarrollo y no se promete en la UI real.
 *
 * Ojo con lo que este campo NO dice: el listado del local (18 ago 2026) confirmó
 * qué indicadores existen y cómo se llaman, pero no qué mide cada uno. Nombre
 * confirmado y significado confirmado son dos cosas distintas, y esto es lo segundo.
 */
export type ConfirmationStatus = "confirmed" | "assumed";

export type MetricDefinition = {
  readonly id: MetricId;
  /** Lo que lee una persona, en español. Es lo único que sale a pantalla. */
  readonly label: string;
  /**
   * Cómo se llama en la fuente, literal y en su idioma.
   *
   * Vive separado de `label` porque son dos cosas con dos destinos distintos:
   * `label` se traduce y se retoca para que se lea bien, y esto es la cadena que el
   * importador de la Fase 6 buscará como cabecera de columna en el Excel. Traducir
   * la app no puede romper la ingesta.
   *
   * Por el mismo motivo, aquí la ortografía se copia con sus errores incluidos: en
   * las notas del local aparecen escritos "Inacuracy" y "Assigment", con una letra
   * menos que en inglés correcto. Esto no es un nombre bonito, es una clave de
   * búsqueda, y "Assignment Time" no encuentra una columna llamada "Assigment Time".
   *
   * Ausente significa algo concreto: la fuente no menciona esa métrica y se la
   * inventó la app.
   */
  readonly sourceLabel?: string;
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
   * Métricas cuya SUMA *debería* dar esta. Observado en los datos de muestra:
   * assignment (1,56) + picking (3,77) + packaging (1,58) = prep_time (6,91).
   *
   * Se guarda como invariante que se comprueba y avisa, NUNCA como fórmula que
   * calcula el valor. Son promedios, y los promedios de las partes solo suman el
   * promedio del total si todos los pedidos pasan por las tres etapas. Si algún
   * pedido se salta la asignación, dejará de cuadrar — y en ese caso queremos
   * enterarnos, no que la app invente un total que nadie midió.
   *
   * Solo sirve para sumas. Una relación de división —como la que se sospecha entre
   * picking, cesta y picking por artículo— no cabe aquí: `checkDerived` sumaría las
   * dos partes y avisaría de un descuadre inventado.
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
