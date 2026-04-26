// Import de Hooks
import { useMemo } from "react";
// Import de datos
import { projects } from "@/data/projects";

function Stat({ value, label }) {
  return (
    <article className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface px-2 py-2 sm:items-start sm:justify-start sm:px-3.5 sm:py-3">
      <strong className="block font-mono text-lg font-bold text-text-primary">{value}</strong>
      <span className="text-xs text-text-muted">{label}</span>
    </article>
  );
}

export default function Hero() {
  // Se saca la cantidad de proyectos de la data
  const totalProjects = projects.length;
  // Se saca la cantidad de proyectos online de la data con un filtro
  const onlineCount = useMemo(() => projects.filter((p) => p.status === "online").length, []);
  // Se obtiene la fecha actual
  const updatedAt = useMemo(() => new Date().toLocaleDateString("es-CL", { day: "numeric", month: "short" }), []);

  return (
    <section className="pt-16 md:pt-20" id="hero">
      <span className="animate-fade-up inline-block rounded-full border border-amber bg-amber-glow px-3 py-1 font-mono text-xs font-medium tracking-wide text-amber">
        Open to work
      </span>
      <h1 className="animate-fade-up delay-1 mt-5 max-w-[18ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
        Proyectos web en producción.
      </h1>
      <p className="animate-fade-up delay-2 mt-4 max-w-[60ch] text-base leading-relaxed text-text-secondary md:text-lg">
        Front-end con React enfocado en performance, accesibilidad y decisiones reales de arquitectura.
      </p>

      <div className="animate-fade-up delay-3 mt-6 flex flex-wrap items-center gap-3">
        <a href="#proyectos" className="hero-cta-shadow rounded-btn bg-linear-to-br from-accent to-cyan-400 px-5 py-2.5 text-sm font-bold text-base-900 transition-transform hover:-translate-y-0.5">
          Ver proyectos
        </a>
        <a href="#contacto" className="rounded-btn border border-line-hover bg-base-900/50 px-5 py-2.5 text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent-border">
          Trabajemos juntos
        </a>
      </div>

      <div className="animate-fade-up delay-4 mt-8 grid grid-cols-3 gap-2 px-2 sm:max-w-md sm:gap-3 sm:px-0">
        <Stat value={totalProjects} label="Proyectos" />
        <Stat value={onlineCount} label="Online" />
        <Stat value={updatedAt} label="Actualizado" />
      </div>
    </section>
  );
}