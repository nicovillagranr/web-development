import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDatasetState } from "../../data/datasetContext.ts";
import { latestPeriod, median, previousPeriod, rankingBy, valueOf } from "../../data/selectors.ts";
import { compare, formatMetricValue, metricsForScope } from "../../metrics/index.ts";
import type { MetricId } from "../../metrics/index.ts";
import { DeltaIndicator } from "../../components/DeltaIndicator.tsx";
import { EmptyState, ErrorState, SkeletonScreen } from "../../components/states.tsx";

/**
 * Nivel 2 — el equipo.
 *
 * Pregunta que responde la pantalla: **¿cómo estamos unos respecto a otros?**
 */
const DEFAULT_SORT: MetricId = "picking_time";

export function TeamPage() {
  const state = useDatasetState();
  const [sortBy, setSortBy] = useState<MetricId>(DEFAULT_SORT);
  const [query, setQuery] = useState("");

  const sortable = useMemo(() => metricsForScope("worker"), []);

  if (state.status === "loading") return <SkeletonScreen cards={2} />;
  if (state.status === "error") return <ErrorState error={state.error} />;

  const { dataset } = state;
  const current = latestPeriod(dataset);
  if (!current) return <EmptyState message="Aún no hay ninguna semana cargada." />;

  const previous = previousPeriod(dataset, current.id);
  const metric = sortable.find((candidate) => candidate.id === sortBy) ?? sortable[0];
  if (!metric) return <EmptyState message="No hay métricas de equipo configuradas." />;

  const ranking = rankingBy(dataset, metric, current.id);
  const teamMedian = median(ranking.map((entry) => entry.value));
  const maxValue = Math.max(...ranking.map((entry) => entry.value), 0);

  const normalized = query.trim().toLocaleLowerCase("es");
  const visible = normalized
    ? ranking.filter((entry) =>
        entry.worker.displayName.toLocaleLowerCase("es").includes(normalized),
      )
    : ranking;

  return (
    <>
      <header className="border-line bg-surface rounded-2xl border p-4">
        <h1 className="text-ink text-lg font-semibold">Equipo</h1>
        <p className="text-ink-soft text-sm">
          Semana {current.isoWeek} · {ranking.length} personas
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {/* El criterio de orden va visible y no escondido en un menú: una lista de
            personas ordenada sin decir por qué se malinterpreta sola. */}
        <label className="flex flex-col gap-1">
          <span className="text-ink-soft text-sm font-medium">Ordenado por</span>
          <select
            value={metric.id}
            onChange={(event) => setSortBy(event.target.value as MetricId)}
            className="border-line bg-surface text-ink min-h-[2.75rem] rounded-xl border px-3 text-sm"
          >
            {sortable.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="sr-only">Buscar a una persona</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre"
            className="border-line bg-surface text-ink placeholder:text-ink-faint min-h-[2.75rem] rounded-xl border px-3 text-sm"
          />
        </label>
      </div>

      {teamMedian !== undefined ? (
        <p className="text-ink-soft text-xs">
          Mediana del equipo:{" "}
          <span className="tabular text-ink font-medium">
            {formatMetricValue(teamMedian, metric)}
          </span>
        </p>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState message={`Nadie coincide con "${query}".`} />
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((entry) => {
            const previousValue = previous
              ? valueOf(dataset, entry.worker.id, previous.id, metric.id)
              : undefined;

            return (
              <li key={entry.worker.id}>
                <Link
                  to={`/equipo/${entry.worker.id}`}
                  className="border-line bg-surface flex min-h-[3.5rem] flex-col gap-1 rounded-2xl border p-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-ink text-sm font-medium">
                      <span className="tabular text-ink-faint">{entry.position}.</span>{" "}
                      {entry.worker.displayName}
                    </span>
                    <span className="tabular text-ink text-sm font-semibold">
                      {formatMetricValue(entry.value, metric)}
                    </span>
                  </div>

                  {/* La barra es proporcional al valor, no a la posición: enseña la
                      distancia real entre personas, que suele ser mucho menor de lo
                      que sugiere un puesto en una lista. */}
                  <div className="bg-canvas relative h-2 overflow-hidden rounded-full">
                    <div
                      className="bg-brand h-full rounded-full"
                      style={{ width: `${maxValue > 0 ? (entry.value / maxValue) * 100 : 0}%` }}
                    />
                    {teamMedian !== undefined && maxValue > 0 ? (
                      <span
                        aria-hidden="true"
                        title="Mediana del equipo"
                        className="bg-ink absolute top-0 h-full w-0.5 rounded-full"
                        style={{ left: `${(teamMedian / maxValue) * 100}%` }}
                      />
                    ) : null}
                  </div>

                  <DeltaIndicator
                    comparison={compare(entry.value, previousValue, metric.direction)}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
