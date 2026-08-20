import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useDatasetState } from "../../data/datasetContext.ts";
import {
  findWorker,
  latestPeriod,
  previousPeriod,
  snapshotFor,
  valueOf,
} from "../../data/selectors.ts";
import { formatMetricValue, getMetric, getTarget, metricsForScope } from "../../metrics/index.ts";
import type { MetricId } from "../../metrics/index.ts";
import { MetricCard } from "../../components/MetricCard.tsx";
import { ComplianceList } from "../../components/ComplianceList.tsx";
import { EmptyState, ErrorState, SkeletonBlock, SkeletonScreen } from "../../components/states.tsx";
import { TimeBreakdown } from "./TimeBreakdown.tsx";
import { EvolutionSection } from "../../components/lazyCharts.ts";

/**
 * Nivel 3 — una persona.
 *
 * Pregunta que responde la pantalla: **¿cómo voy yo, y en qué puedo mejorar?**
 *
 * El día que exista autenticación, esta misma pantalla será la pestaña "Yo": lo
 * único que cambia es de dónde sale el `workerId` (de la sesión en vez de la URL).
 */

/** Los tiempos ya se cuentan en el desglose; no hace falta repetirlos como tarjetas. */
const SHOWN_AS_BREAKDOWN: readonly MetricId[] = [
  "prep_time",
  "assignment_time",
  "picking_time",
  "packaging_time",
];

export function WorkerPage() {
  const state = useDatasetState();
  const { workerId } = useParams();

  if (state.status === "loading") return <SkeletonScreen cards={2} />;
  if (state.status === "error") return <ErrorState error={state.error} />;

  const { dataset } = state;
  const worker = workerId ? findWorker(dataset, workerId) : undefined;

  if (!worker) {
    return (
      <>
        <EmptyState message="No encontramos a esa persona." />
        <Link to="/equipo" className="text-brand text-center text-sm font-medium">
          Volver al equipo
        </Link>
      </>
    );
  }

  const current = latestPeriod(dataset);
  if (!current) return <EmptyState message="Aún no hay ninguna semana cargada." />;

  const previous = previousPeriod(dataset, current.id);
  const snapshot = snapshotFor(dataset, worker.id, current.id);

  if (!snapshot) {
    return (
      <>
        <WorkerHeader name={worker.displayName} orders={undefined} week={current.isoWeek} />
        <EmptyState
          message={`${worker.displayName} no tiene datos en la semana ${current.isoWeek}.`}
        />
      </>
    );
  }

  const read = (metricId: MetricId, periodId: string | undefined) =>
    periodId === undefined ? undefined : valueOf(dataset, worker.id, periodId, metricId);

  const workerMetrics = metricsForScope("worker");
  const cards = workerMetrics.filter((metric) => !SHOWN_AS_BREAKDOWN.includes(metric.id));
  const withTargets = workerMetrics.filter((metric) => getTarget(metric.id) !== undefined);
  const reference = previous ? `vs S${previous.isoWeek}` : undefined;

  return (
    <>
      <WorkerHeader
        name={worker.displayName}
        orders={snapshot.values.total_orders}
        week={current.isoWeek}
      />

      <TimeBreakdown values={snapshot.values} />

      <section aria-labelledby="otras">
        <h2 id="otras" className="text-ink-soft mb-2 text-sm font-semibold">
          Resto de indicadores
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {cards.map((metric) => (
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

      <ComplianceList metrics={withTargets} valueFor={(metricId) => read(metricId, current.id)} />

      <Suspense fallback={<SkeletonBlock className="h-64" />}>
        <EvolutionSection
          dataset={dataset}
          subjectId={worker.id}
          scope="worker"
          defaultMetric="picking_time"
        />
      </Suspense>

      <Link to="/equipo" className="text-brand text-center text-sm font-medium">
        Volver al equipo
      </Link>
    </>
  );
}

function WorkerHeader({
  name,
  orders,
  week,
}: {
  name: string;
  orders: number | undefined;
  week: number;
}) {
  return (
    <header className="border-line bg-surface rounded-2xl border p-4">
      <h1 className="text-ink text-lg font-semibold">{name}</h1>
      <p className="text-ink-soft text-sm">
        Semana {week}
        {orders !== undefined
          ? ` · ${formatMetricValue(orders, getMetric("total_orders"))} pedidos`
          : null}
      </p>
    </header>
  );
}
