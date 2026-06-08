import { useState } from "react";
import ProjectCard from "./ProjectCard";
import CatalogSkeleton from "./CatalogSkeleton";

const FILTERS = ["Todos", "React", "Next.js", "APIs"];
const GROUP_ORDER = ["React", "Next.js", "APIs"];

export default function Catalog({ projects = [], loading = false, error = null }) {
  const [filter, setFilter] = useState("Todos");

  const projectsByFramework = GROUP_ORDER.map((framework) => [
    framework,
    projects.filter((p) => p.framework === framework),
  ]).filter(([, group]) => group.length > 0);

  if (loading) return (<CatalogSkeleton />);

  if (error) return (
    <section className="mt-6 min-h-[75vh] flex items-center justify-center" id="proyectos" role="status" aria-live="polite">
      <div className="text-center">
        <div className="text-5xl mb-3 animate-shake" aria-hidden="true">⚠</div>
        <p className="text-lg text-text-secondary">Error al cargar proyectos: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    </section>
  );

  const visibleGroups = filter === "Todos" ? projectsByFramework : [[null, projects.filter((p) => p.framework === filter)]];

  return (
    <section className="mt-6" id="proyectos">
      <div className="mb-5 grid gap-1.5">
        <h2 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">Catálogo</h2>
        <p className="text-text-secondary">Haz clic en cualquier tarjeta para abrir el proyecto.</p>
        <div className="mt-4 flex gap-2">
          {FILTERS.map((f) => (
            <button
              aria-pressed={filter === f}
              key={f}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${filter === f
                ? "border-accent-border bg-accent/10 text-accent"
                : "border-line bg-surface text-text-secondary hover:border-accent-border hover:text-text-primary"
                }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {visibleGroups.map(([label, group]) => (
          <div key={label ?? "all"} className="w-full">
            {label && (
              <div className="mb-6 flex items-center gap-4">
                <span className="flex-1 border-t border-line" />
                <span className="px-2 font-mono text-xs font-medium uppercase tracking-widest text-text-muted">
                  {label}
                </span>
                <span className="flex-1 border-t border-line" />
              </div>
            )}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {group.map((project, i) => (
                <ProjectCard key={project.name} project={project} priority={i < 3} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
