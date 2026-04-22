import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const FILTERS = ["Todos", "React", "Next.js", "APIs"];

export default function Catalog() {
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.framework === filter);
  const reactProjects = projects.filter((p) => p.framework === "React");
  const nextProjects = projects.filter((p) => p.framework === "Next.js");
  const apiProjects = projects.filter((p) => p.framework === "APIs");

  return (
    <section id="proyectos" className="mt-10">
      <div className="mb-5 grid gap-1.5">
        <h2 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">Catálogo</h2>
        <p className="text-text-secondary">Haz clic en cualquier tarjeta para abrir el proyecto.</p>
        <div className="mt-4 flex gap-2">
          {FILTERS.map((f) => (
            <button
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

      {filter === "Todos" ? (
        <div className="flex flex-col gap-10">
          {[
            ["React", reactProjects],
            ["Next.js", nextProjects],
            ["APIs", apiProjects],
          ].map(([label, group]) => (
            <div key={label} className="w-full">
              <div className="mb-6 flex items-center gap-4">
                <span className="flex-1 border-t border-line" />
                <span className="px-2 font-mono text-xs font-medium uppercase tracking-widest text-text-muted">{label}</span>
                <span className="flex-1 border-t border-line" />
              </div>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {group.map((project, i) => (
                  <ProjectCard key={project.name} project={project} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
