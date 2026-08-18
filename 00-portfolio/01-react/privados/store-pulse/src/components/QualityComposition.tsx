import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Period } from "../data/types.ts";
import type { MetricId } from "../metrics/index.ts";
import { formatMetricValue, formatNumber, getMetric } from "../metrics/index.ts";

/**
 * De qué se componen las incidencias de calidad, semana a semana.
 *
 * Barras apiladas y no un gráfico de tarta —que es lo que usa la fuente actual—
 * por dos motivos: comparar longitudes es más fácil y más preciso que comparar
 * ángulos, y una tarta solo enseña un período mientras que esto enseña el total y
 * su reparto a la vez, ocho semanas seguidas.
 *
 * Las categorías salen de `derivedFrom` de la métrica total: si mañana el local
 * añade un cuarto tipo de incidencia, entra en el registro y aparece aquí.
 */

/** Colores validados con el script de la skill `dataviz`. Ver la nota en index.css. */
const SERIES_COLORS = ["var(--color-series-1)", "var(--color-series-2)", "var(--color-series-3)"];

/**
 * Una escala con marcas en números redondos.
 *
 * Dejada a su aire, la librería reparte el eje en partes iguales sobre el dato más
 * alto y salen marcas como 0,45 · 0,9 · 1,35 — correctas y molestas de leer. Esto
 * busca el paso "bonito" más cercano (1, 2, 2,5 o 5 por la potencia de diez que
 * toque) y estira el techo hasta un múltiplo suyo: 0 · 0,5 · 1,0 · 1,5 · 2,0.
 */
function niceScale(max: number): { top: number; ticks: number[] } {
  if (!Number.isFinite(max) || max <= 0) return { top: 1, ticks: [0, 0.5, 1] };

  const rough = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = ([1, 2, 2.5, 5, 10].find((factor) => factor * magnitude >= rough) ?? 10) * magnitude;
  const top = Math.ceil(max / step) * step;

  const ticks: number[] = [];
  for (let value = 0; value <= top + step / 2; value += step) {
    // toFixed corta la basura de coma flotante que se acumula al ir sumando el paso
    // (0.1 + 0.2 = 0.30000000000000004, y eso acabaría impreso en el eje).
    ticks.push(Number(value.toFixed(6)));
  }

  return { top, ticks };
}

export function QualityComposition({
  periods,
  read,
}: {
  periods: readonly Period[];
  read: (metricId: MetricId, periodId: string) => number | undefined;
}) {
  const total = getMetric("quality_total");
  const parts = (total.derivedFrom ?? []).map((id) => getMetric(id));
  if (parts.length === 0) return null;

  // El total apilado de cada semana se acumula en la misma pasada que se arma la
  // fila. Recalcularlo después obligaría a releer `row[part.id]`, cuyo tipo es
  // `string | number | undefined` (la fila mezcla la etiqueta del eje con los
  // valores), y a pelearse con el tipo para sumar algo que aquí ya tenemos a mano.
  const stackedTotals: number[] = [];

  const data = periods.map((period) => {
    const row: Record<string, string | number> = { label: `S${period.isoWeek}` };
    let total = 0;

    for (const part of parts) {
      const value = read(part.id, period.id) ?? 0;
      row[part.id] = value;
      total += value;
    }

    stackedTotals.push(total);
    return row;
  });

  const lastPeriod = periods.at(-1);
  // Sobre el total apilado y no sobre una categoría suelta: lo que se ve es la suma.
  const scale = niceScale(Math.max(...stackedTotals, 0));

  return (
    <section aria-labelledby="calidad" className="border-line bg-surface rounded-2xl border p-4">
      <h2 id="calidad" className="text-ink-soft text-sm font-semibold">
        Composición de las incidencias
      </h2>

      <div className="mt-3 h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
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
              width={40}
              domain={[0, scale.top]}
              ticks={scale.ticks}
              tickFormatter={(value: number) => formatNumber(value, 1)}
            />
            <Tooltip
              cursor={{ fill: "var(--color-canvas)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;
                return (
                  <div className="border-line bg-surface rounded-xl border px-3 py-2 text-xs shadow-sm">
                    <p className="text-ink-soft mb-1">{label}</p>
                    <ul className="flex flex-col gap-0.5">
                      {payload.map((item) => {
                        const part = parts.find((candidate) => candidate.id === item.dataKey);
                        if (!part || typeof item.value !== "number") return null;
                        return (
                          <li key={part.id} className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ background: item.color }}
                            />
                            <span className="text-ink-soft">{part.shortLabel}</span>
                            <span className="tabular text-ink ml-auto font-medium">
                              {formatMetricValue(item.value, part)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              }}
            />
            {parts.map((part, index) => (
              <Bar
                key={part.id}
                dataKey={part.id}
                stackId="calidad"
                fill={SERIES_COLORS[index % SERIES_COLORS.length]}
                // Un borde del color de la superficie separa los tramos apilados sin
                // ocupar sitio: sin él, dos colores contiguos se leen como una sola
                // mancha y el reparto deja de distinguirse.
                stroke="var(--color-surface)"
                strokeWidth={2}
                radius={index === parts.length - 1 ? [4, 4, 0, 0] : 0}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda con el valor escrito al lado, no solo el cuadrito de color.
          Es obligatoria por dos motivos que se acumulan: con tres series la identidad
          nunca puede depender solo del color, y el validador de la paleta avisó de que
          la aqua no llega a 3:1 de contraste — lo que exige "relieve", es decir,
          etiquetas visibles. Una misma solución cubre las dos cosas. */}
      <ul className="mt-3 flex flex-col gap-1">
        {parts.map((part, index) => {
          const value = lastPeriod ? read(part.id, lastPeriod.id) : undefined;
          return (
            <li key={part.id} className="flex items-center gap-2 text-xs">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ background: SERIES_COLORS[index % SERIES_COLORS.length] }}
              />
              <span className="text-ink-soft">{part.label}</span>
              <span className="tabular text-ink ml-auto font-medium">
                {value === undefined ? "—" : formatMetricValue(value, part)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
