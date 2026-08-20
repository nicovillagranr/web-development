import { useState } from "react";
import type { Dataset } from "../data/types.ts";
import { seriesFor } from "../data/selectors.ts";
import { metricsForScope } from "../metrics/index.ts";
import type { MetricId, Scope } from "../metrics/index.ts";
import { TrendChart } from "./TrendChart.tsx";

/**
 * La evolución histórica, con su selector de métrica.
 *
 * El mismo componente sirve al panel del local y al detalle de una persona: lo único
 * que cambia es el `subjectId`. Es exactamente lo que compra el registro de
 * métricas — la pantalla no sabe qué está dibujando, solo que es una métrica del
 * ámbito que le han pasado.
 */
export function EvolutionSection({
  dataset,
  subjectId,
  scope,
  defaultMetric,
}: {
  dataset: Dataset;
  subjectId: string;
  scope: Scope;
  defaultMetric: MetricId;
}) {
  const options = metricsForScope(scope);
  const [selected, setSelected] = useState<MetricId>(defaultMetric);
  const metric = options.find((option) => option.id === selected) ?? options[0];

  if (!metric) return null;

  return (
    <section aria-labelledby="evolucion" className="border-line bg-surface rounded-2xl border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="evolucion" className="text-ink-soft text-sm font-semibold">
          Evolución
        </h2>
        <label>
          <span className="sr-only">Métrica a mostrar</span>
          <select
            value={metric.id}
            onChange={(event) => setSelected(event.target.value as MetricId)}
            className="border-line bg-surface text-ink min-h-[2.25rem] rounded-lg border px-2 text-xs"
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3">
        <TrendChart points={seriesFor(dataset, subjectId, metric.id)} metric={metric} />
      </div>
    </section>
  );
}
