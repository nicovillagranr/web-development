import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SeriesPoint } from "../data/selectors.ts";
import type { MetricDefinition } from "../metrics/index.ts";
import { formatMetricValue, formatNumber } from "../metrics/index.ts";

/**
 * La evolución de UNA métrica a lo largo de las semanas.
 *
 * Una sola serie, no cinco. En 375 px de ancho, cinco líneas superpuestas no son
 * una comparación: son un ovillo. La métrica se elige con el selector de arriba.
 *
 * Al ser una sola serie no lleva leyenda —el título ya la nombra— y la línea puede
 * ir del color de marca sin ambigüedad posible.
 */

type ChartPoint = {
  label: string;
  /**
   * `null` y no `0` cuando falta el dato.
   *
   * Recharts dibuja un hueco donde hay `null` y una caída a cero donde hay `0`. La
   * diferencia importa: esa semana la persona no trabajó, no rindió cero. Un cero
   * inventado además hunde la escala del eje y aplasta el resto de la serie.
   */
  value: number | null;
};

export function TrendChart({
  points,
  metric,
}: {
  points: readonly SeriesPoint[];
  metric: MetricDefinition;
}) {
  const data: ChartPoint[] = points.map((point) => ({
    label: `S${point.period.isoWeek}`,
    value: point.value ?? null,
  }));

  const measured = data.filter((point) => point.value !== null);
  if (measured.length < 2) {
    return (
      <p className="text-ink-soft py-8 text-center text-sm">
        Hacen falta al menos dos semanas con datos para dibujar una evolución.
      </p>
    );
  }

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
          {/* Rejilla solo horizontal y en el color de las separaciones: sirve para
              leer alturas, y ese es todo su trabajo. Las verticales no aportan nada
              cuando el eje X son etiquetas discretas. */}
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
            tickLine={false}
            axisLine={false}
            width={44}
            // Escala ajustada a los datos y no anclada a cero: en tiempos que se
            // mueven entre 3,4 y 3,9 min, forzar el cero deja la línea plana contra
            // el borde superior y esconde justo lo que se viene a mirar. (En barras
            // sería inaceptable — ahí la longitud ES el valor.)
            domain={["auto", "auto"]}
            tickFormatter={(value: number) => formatNumber(value, metric.precision)}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-ink-faint)", strokeWidth: 1 }}
            content={({ active, payload, label }) => {
              const point = payload?.[0];
              if (!active || !point || typeof point.value !== "number") return null;
              return (
                <div className="border-line bg-surface rounded-xl border px-3 py-2 text-xs shadow-sm">
                  <p className="text-ink-soft">{label}</p>
                  <p className="tabular text-ink font-semibold">
                    {formatMetricValue(point.value, metric)}
                  </p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-brand)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-brand)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            // Sin esto, Recharts uniría los extremos del hueco con una recta e
            // inventaría una semana que nadie midió.
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
