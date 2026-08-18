import type { MetricDefinition, MetricId, TierId } from "../metrics/index.ts";
import { evaluate, formatMetricValue, getTarget } from "../metrics/index.ts";
import { TierBadge } from "./TierBadge.tsx";

/**
 * Qué objetivos se cumplen y cuáles no.
 *
 * Ordenada poniendo delante lo que peor va. Quien abre esto a las 8:30 antes de un
 * turno quiere ver el problema, no felicitarse: si lo que falla queda enterrado al
 * final de la lista, la pantalla es bonita y no sirve para nada.
 */
const SEVERITY: Record<TierId, number> = {
  bajo: 0,
  cerca: 1,
  supera: 2,
  supera_amplia: 3,
};

/** Lo no evaluable va al final: no es urgente, pero tampoco se esconde. */
const UNEVALUATED = 99;

export function ComplianceList({
  metrics,
  valueFor,
}: {
  metrics: readonly MetricDefinition[];
  valueFor: (metricId: MetricId) => number | undefined;
}) {
  const rows = metrics
    .map((metric) => {
      const target = getTarget(metric.id);
      const value = valueFor(metric.id);
      const tier = value === undefined ? null : evaluate(value, metric, target);
      return { metric, target, value, tier };
    })
    .sort(
      (a, b) =>
        (a.tier ? SEVERITY[a.tier.id] : UNEVALUATED) - (b.tier ? SEVERITY[b.tier.id] : UNEVALUATED),
    );

  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="cumplimiento">
      <h2 id="cumplimiento" className="text-ink-soft mb-2 text-sm font-semibold">
        Cumplimiento de objetivos
      </h2>

      <ul className="divide-line border-line bg-surface divide-y overflow-hidden rounded-2xl border">
        {rows.map(({ metric, target, value, tier }) => (
          <li key={metric.id} className="flex items-center justify-between gap-3 p-3">
            <div className="min-w-0">
              <p className="text-ink truncate text-sm font-medium">{metric.label}</p>
              <p className="tabular text-ink-soft text-xs">
                {value === undefined ? "sin dato" : formatMetricValue(value, metric)}
                {target ? ` · objetivo ${formatMetricValue(target.value, metric)}` : null}
              </p>
            </div>
            <TierBadge tier={tier} />
          </li>
        ))}
      </ul>
    </section>
  );
}
