import type { MetricDefinition, Unit } from "./types.ts";

/**
 * Se formatea en es-CL porque es donde se usa la app: coma decimal y punto de
 * millares. Es además exactamente como se ven los números en la fuente original
 * ("6,91"), así que quien compare las dos pantallas no tiene que traducir nada.
 */
const LOCALE = "es-CL";

/**
 * `Intl.NumberFormat` es caro de construir y aquí se llama una vez por celda de una
 * lista que puede tener cientos. Se cachea por número de decimales, que es lo único
 * que varía entre métricas.
 */
const formatterCache = new Map<number, Intl.NumberFormat>();

function numberFormatter(precision: number): Intl.NumberFormat {
  const cached = formatterCache.get(precision);
  if (cached) return cached;

  const formatter = new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  formatterCache.set(precision, formatter);
  return formatter;
}

/** El sufijo de cada unidad. Espacio incluido donde toca. */
function unitSuffix(unit: Unit): string {
  switch (unit) {
    case "minutes":
      return " min";
    // Sin espacio antes del %: es como se ven los números en la fuente original
    // ("1,23%"), y el objetivo es que nadie tenga que traducir entre las dos pantallas.
    case "percent":
      return "%";
    case "count":
      return "";
    // Los dos cocientes llevan el "por" escrito. Sin él, "12,4" y "0,32" se leen
    // como un conteo y un tiempo cualquiera, que es justo lo que no son.
    case "items-per-order":
      return " art./pedido";
    case "minutes-per-item":
      return " min/art.";
  }
}

/** "6,91 min", "1,65 %", "1.243". */
export function formatMetricValue(value: number, definition: MetricDefinition): string {
  return numberFormatter(definition.precision).format(value) + unitSuffix(definition.unit);
}

/** Solo el número, sin unidad. Para ejes de gráficos y celdas estrechas. */
export function formatNumber(value: number, precision: number): string {
  return numberFormatter(precision).format(value);
}

/**
 * La variación porcentual de una comparación: "4,9 %".
 *
 * Sin flecha y sin signo — eso lo pone el componente a partir de `movement`, que es
 * lo que mantiene separado "hacia dónde se movió" de "si eso es bueno".
 */
export function formatPercentChange(pct: number): string {
  return `${numberFormatter(1).format(pct)}%`;
}

/** "Semana 33" a partir de un identificador ISO tipo `2026-W33`. */
export function formatPeriodLabel(periodId: string): string {
  const week = periodId.split("-W")[1];
  return week ? `Semana ${Number(week)}` : periodId;
}
