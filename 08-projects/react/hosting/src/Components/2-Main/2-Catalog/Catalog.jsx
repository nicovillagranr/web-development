import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

import "./Catalog.css";

export default function Catalog() {
  return (
    <section id="proyectos" className="catalog">
      <div className="catalog__header">
        <h2 className="catalog__header-title">Catálogo</h2>
        <p className="catalog__header-subtitle">Haz clic en cualquier tarjeta para abrir el proyecto.</p>
      </div>

      <div className="catalog__grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
