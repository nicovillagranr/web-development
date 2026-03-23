import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Catalog() {
  return (
    <section id="proyectos" className="py-10">
      <div className="mb-5 grid gap-1.5">
        <h2 className="font-heading text-[clamp(1.4rem,2.8vw,2rem)] font-bold text-text-primary">
          Catálogo
        </h2>
        <p className="text-text-secondary">
          Haz clic en cualquier tarjeta para abrir el proyecto.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
