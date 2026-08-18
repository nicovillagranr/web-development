import { Suspense } from "react";
import { useDatasetState } from "../../data/datasetContext.ts";
import { latestPeriod, previousPeriod, valueOf } from "../../data/selectors.ts";
import { metricsForScope, getTarget } from "../../metrics/index.ts";
import type { MetricId } from "../../metrics/index.ts";
import { FreshnessHeader } from "../../components/FreshnessHeader.tsx";
import { MetricCard } from "../../components/MetricCard.tsx";
import { ComplianceList } from "../../components/ComplianceList.tsx";
import { EmptyState, ErrorState, SkeletonBlock, SkeletonScreen } from "../../components/states.tsx";
import { PendingConfirmationNote } from "../../components/PendingConfirmationNote.tsx";
import { EvolutionSection, QualityComposition } from "../../components/lazyCharts.ts";

/**
 * Nivel 1 — el local.
 *
 * Pregunta que responde la pantalla: **¿cómo va el local esta semana?**
 */

/**
 * Las cuatro métricas que abren el panel.
 *
 * La lista está aquí y no en el registro a propósito: qué métrica merece ir arriba
 * es una decisión de esta pantalla, no una propiedad de la métrica. El registro dice
 * qué existe y cómo se comporta; la pantalla decide qué destaca.
 *
 * El resto se pinta debajo automáticamente, así que una métrica nueva aparece en la
 * app sin tocar este archivo — solo no saldrá arriba hasta que alguien lo decida.
 */
const HEADLINE: readonly MetricId[] = [
  "total_orders",
  "prep_time",
  "picking_time",
  "inaccuracy_total",
];

export function StorePage() {
  const state = useDatasetState();

  if (state.status === "loading") return <SkeletonScreen />;
  if (state.status === "error") return <ErrorState error={state.error} />;

  const { dataset } = state;
  const current = latestPeriod(dataset);
  if (!current) {
    return <EmptyState message="Aún no hay ninguna semana cargada." />;
  }

  const previous = previousPeriod(dataset, current.id);
  const storeMetrics = metricsForScope("store");
  const headline = HEADLINE.map((id) => storeMetrics.find((metric) => metric.id === id)).filter(
    (metric) => metric !== undefined,
  );
  const rest = storeMetrics.filter((metric) => !HEADLINE.includes(metric.id));

  const read = (metricId: MetricId, periodId: string | undefined) =>
    periodId === undefined ? undefined : valueOf(dataset, dataset.store.id, periodId, metricId);

  const reference = previous ? `vs S${previous.isoWeek}` : undefined;

  return (
    <>
      <FreshnessHeader period={current} updatedAt={dataset.updatedAt} />

      <section aria-labelledby="destacadas">
        <h2 id="destacadas" className="text-ink-soft mb-2 text-sm font-semibold">
          Indicadores clave
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {headline.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              value={read(metric.id, current.id)}
              previousValue={read(metric.id, previous?.id)}
              referenceLabel={reference}
            />
          ))}
        </div>
      </section>

      <ComplianceList
        metrics={storeMetrics.filter((metric) => getTarget(metric.id) !== undefined)}
        valueFor={(metricId) => read(metricId, current.id)}
      />

      {/* El esqueleto tiene la altura final del gráfico: así el contenido de abajo
          no salta cuando termina de llegar el chunk de Recharts. */}
      <Suspense fallback={<SkeletonBlock className="h-64" />}>
        <EvolutionSection
          dataset={dataset}
          subjectId={dataset.store.id}
          scope="store"
          defaultMetric="prep_time"
        />
      </Suspense>

      <Suspense fallback={<SkeletonBlock className="h-72" />}>
        <QualityComposition
          periods={dataset.periods}
          read={(metricId, periodId) => read(metricId, periodId)}
        />
      </Suspense>

      <section aria-labelledby="resto">
        <h2 id="resto" className="text-ink-soft mb-2 text-sm font-semibold">
          Resto de métricas del local
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {rest.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              value={read(metric.id, current.id)}
              previousValue={read(metric.id, previous?.id)}
              referenceLabel={reference}
            />
          ))}
        </div>
      </section>

      <PendingConfirmationNote />
    </>
  );
}
