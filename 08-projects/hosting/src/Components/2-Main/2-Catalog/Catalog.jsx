import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

import "./Catalog.css";

const FILTERS = ["Todos", "React", "Next.js"];

export default function Catalog() {
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.framework === filter);
  const reactProjects = projects.filter((p) => p.framework === "React");
  const nextProjects = projects.filter((p) => p.framework === "Next.js");

  return (
    <section id="proyectos" className="catalog">
      <div className="catalog__header">
        <h2 className="catalog__header-title">Catálogo</h2>
        <p className="catalog__header-subtitle">Haz clic en cualquier tarjeta para abrir el proyecto.</p>
        <div className="catalog__filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`catalog__filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filter === "Todos" ? (
        <div className="catalog__sections">
          {[
            ["React", reactProjects],
            ["Next.js", nextProjects],
          ].map(([label, group]) => (
            <div key={label} className="catalog__section">
              <div className="catalog__section-divider">
                <span className="catalog__section-label">{label}</span>
              </div>
              <div className="catalog__grid">
                {group.map((project, i) => (
                  <ProjectCard key={project.name} project={project} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="catalog__grid">
          {filtered.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
