import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDatasetState } from "../../data/datasetContext.ts";
import {
  latestPeriod,
  median,
  previousPeriod,
  rankingBy,
  seriesFor,
  valueOf,
} from "../../data/selectors.ts";
import { compare, formatMetricValue, metricsForScope } from "../../metrics/index.ts";
import type { MetricId } from "../../metrics/index.ts";
import { DeltaIndicator } from "../../components/DeltaIndicator.tsx";
import { Sparkline } from "../../components/Sparkline.tsx";
import { EmptyState, ErrorState, SkeletonScreen } from "../../components/states.tsx";

/**
 * Nivel 2 — el equipo.
 *
 * Pregunta que responde la pantalla: **¿cómo estamos unos respecto a otros?**
 */
const DEFAULT_SORT: MetricId = "picking_time";

/**
 * Deja un texto en minúsculas y sin tildes, para poder compararlo.
 *
 * Sin esto, buscar "nicolas" no encuentra a "Nicolás": son dos cadenas distintas y
 * `includes` no tiene por qué saber que son la misma palabra. En una app en español
 * eso es media plantilla inencontrable, porque nadie escribe tildes en el móvil.
 *
 * `normalize("NFD")` parte cada letra acentuada en dos caracteres —la letra pelada
 * y la tilde suelta— y el rango U+0300–U+036F son justo esas marcas sueltas. Al
 * borrarlas queda "nicolas". Funciona en los dos sentidos: quien escriba con tilde
 * también encuentra, porque el nombre pasa por el mismo filtro.
 *
 * Efecto secundario a propósito: la "ñ" también se pela, así que "munoz" encuentra
 * a "Muñoz". En un buscador eso se agradece; en una ordenación alfabética no valdría,
 * y por eso esto vive aquí y no en `selectors.ts`.
 */
function plano(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

export function TeamPage() {
  const state = useDatasetState();
  const [sortBy, setSortBy] = useState<MetricId>(DEFAULT_SORT);
  const [query, setQuery] = useState("");

  // Las neutrales quedan fuera del selector, y no por ahorrar opciones: ordenar por
  // una métrica sin "mejor" fabrica un podio de algo que no es mérito de nadie. Con
  // el tamaño de cesta, el número 1 sería quien recibió los pedidos más grandes.
  // Sigue estando en la ficha de cada persona como contexto, que es su sitio.
  const sortable = useMemo(
    () => metricsForScope("worker").filter((option) => option.direction !== "neutral"),
    [],
  );

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

  // "vs S32". Se calcula una vez y se pasa a las catorce tarjetas: sin él, la
  // variación es un porcentaje suelto que no dice contra qué se compara.
  const reference = previous ? `vs S${previous.isoWeek}` : undefined;

  // Las dos partes pasan por el mismo filtro. Normalizar solo lo que se escribe no
  // serviría de nada: "nicolas" seguiría sin encontrar a "Nicolás" porque el que
  // conserva la tilde es el nombre.
  const normalized = plano(query.trim());
  const visible = normalized
    ? ranking.filter((entry) => plano(entry.worker.displayName).includes(normalized))
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
        <label className="flex flex-col gap-1">
          <span className="text-ink-soft text-sm font-medium">Buscar a una persona</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Escribe el nombre"
            className="border-line bg-surface text-ink placeholder:text-ink-faint min-h-11 rounded-xl border px-3 text-sm"
          />
        </label>

        {/* El criterio de orden va visible y no escondido en un menú: una lista de
            personas ordenada sin decir por qué se malinterpreta sola. */}
        <label className="flex flex-col gap-1">
          <span className="text-ink-soft text-sm font-medium">Ordenado por</span>
          <select
            value={metric.id}
            onChange={(event) => setSortBy(event.target.value as MetricId)}
            className="border-line bg-surface text-ink min-h-11 rounded-xl border px-3 text-sm"
          >
            {sortable.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
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
        <ul className="grid grid-cols-2 gap-3">
          {visible.map((entry) => {
            const previousValue = previous
              ? valueOf(dataset, entry.worker.id, previous.id, metric.id)
              : undefined;

            return (
              <li key={entry.worker.id}>
                {/* `h-full` no es decorativo: el `<li>` sí se estira hasta la altura
                    de su fila (es lo que hace el grid por defecto), pero la tarjeta
                    de dentro no heredaba nada de eso y se quedaba a la altura de su
                    contenido. Si una vecina medía una línea más, debajo de esta
                    aparecía un hueco con el fondo de la página asomando.

                    Con el resto de arreglos de esta pantalla las filas ya salen
                    parejas solas, así que esto es el cinturón además de los
                    tirantes: cubre el caso raro (una fuente enorme del sistema, un
                    idioma que alarga los textos) sin volver a dejar agujeros. */}
                <Link
                  to={`/equipo/${entry.worker.id}`}
                  className="border-line bg-surface flex h-full min-h-14 flex-col gap-2 rounded-2xl border p-3"
                >
                  {/* La posición sale del nombre y pasa a ser su propio elemento.
                      No es solo estético: metida dentro del `truncate`, un nombre
                      largo se comía también el número. Con `shrink-0` el que cede
                      siempre es el nombre, y la posición no se corta nunca.

                      `min-w-0` en el nombre sigue haciendo falta: un hijo flex no
                      baja por defecto de la anchura de su contenido, así que sin él
                      `truncate` no llega a activarse. */}
                  <span className="flex items-baseline gap-1.5">
                    <span className="tabular text-ink shrink-0 text-base font-semibold">
                      {entry.position}
                    </span>
                    <span className="text-ink min-w-0 truncate text-sm font-medium">
                      {entry.worker.displayName}
                    </span>
                  </span>

                  {/* Cuánto, y hacia dónde va. El minigráfico se escala contra el
                      propio histórico de esta persona, no contra el equipo: por eso
                      sirve igual para minutos, pedidos o porcentajes sin una sola
                      condición por unidad, y por eso nunca dice quién es mejor. Ese
                      juicio lo lleva la flecha de debajo, que sí conoce `direction`.

                      Aquí hubo antes una barra y dos versiones de gráfico circular.
                      Las tres se rompían por lo mismo: necesitaban comparar a esta
                      persona con un "todo" (el máximo del equipo) que en estas
                      métricas no significa nada. Ver la nota larga en Sparkline.tsx. */}
                  <div className="flex items-center justify-between gap-2">
                    {/* `shrink-0` + `whitespace-nowrap`: el número no cede sitio y no
                        se parte nunca. "3,21 min" tiene un espacio en medio, y ese
                        espacio es un punto de corte válido para el navegador: en
                        cuanto le faltaba un pelo de ancho se iba a "3,21" / "min" y
                        la tarjeta crecía 24 px. Quien cede ahora es el minigráfico
                        (ver la nota en Sparkline.tsx). */}
                    <span className="tabular text-ink shrink-0 text-base font-semibold whitespace-nowrap">
                      {formatMetricValue(entry.value, metric)}
                    </span>
                    <Sparkline
                      points={seriesFor(dataset, entry.worker.id, metric.id)}
                      metric={metric}
                    />
                  </div>

                  <DeltaIndicator
                    comparison={compare(entry.value, previousValue, metric.direction)}
                    metric={metric}
                    referenceLabel={reference}
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
