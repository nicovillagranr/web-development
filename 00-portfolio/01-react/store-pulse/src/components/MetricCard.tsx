import type { MetricDefinition } from "../metrics/index.ts";
import { compare, evaluate, formatMetricValue, getTarget } from "../metrics/index.ts";
import { TierBadge } from "./TierBadge.tsx";
import { DeltaIndicator } from "./DeltaIndicator.tsx";

/**
 * La tarjeta de una métrica.
 *
 * Recibe la **definición** de la métrica y un par de números, y de ahí saca todo lo
 * demás: cómo formatear el valor, hacia dónde es mejor, si cumple el objetivo y si
 * ha mejorado. No sabe nada de Picking Time ni de pedidos.
 *
 * Ese es el trato del registro: para que aparezca una métrica nueva en la app basta
 * con declararla en `src/metrics/definitions.ts`. Este archivo no se toca.
 */
export function MetricCard({
  metric,
  value,
  previousValue,
  referenceLabel,
}: {
  metric: MetricDefinition;
  value: number | undefined;
  previousValue: number | undefined;
  referenceLabel?: string | undefined;
}) {
  const target = getTarget(metric.id);
  const tier = value === undefined ? null : evaluate(value, metric, target);
  const comparison = value === undefined ? null : compare(value, previousValue, metric.direction);

  return (
    <article className="border-line bg-surface flex flex-col gap-2 rounded-2xl border p-4">
      {/* El estado "por confirmar" de una métrica NO se marca aquí. Se probó con un
          "?" en cada tarjeta y, mientras la Fase 0 siga abierta y todas las métricas
          estén sin confirmar, son once interrogaciones que no distinguen nada: la
          marca que está en todas partes no informa en ninguna. El aviso vive una sola
          vez, al final del panel, en <PendingConfirmationNote>. */}
      <h3 className="text-ink-soft text-sm font-medium">{metric.shortLabel}</h3>

      <p className="tabular text-ink text-2xl font-semibold">
        {value === undefined ? (
          <span className="text-ink-faint">—</span>
        ) : (
          formatMetricValue(value, metric)
        )}
      </p>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <DeltaIndicator comparison={comparison} referenceLabel={referenceLabel} />
        {target ? <TierBadge tier={tier} /> : null}
      </footer>
    </article>
  );
}
