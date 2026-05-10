// Import de Hooks
import { useMemo } from "react";
// Import de datos
import { useProjects } from "@/hooks/useProjects";

function Stat({ value, label }) {
  return (
    <article className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface px-2 py-2 sm:items-start sm:justify-start sm:px-3.5 sm:py-3">
      <strong className="block font-mono text-lg font-bold text-text-primary">{value}</strong>
      <span className="text-xs text-text-muted">{label}</span>
    </article>
  );
}

function SkillBadge({ skill }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-hover bg-surface/50 px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-accent-border transition-colors">
      {skill}
    </span>
  );
}

export default function Hero() {
  const { projects } = useProjects();
  // Se saca la cantidad de proyectos de la data
  const totalProjects = projects.length;
  // Se saca la cantidad de proyectos online de la data con un filtro
  const onlineCount = useMemo(() => projects.filter((p) => p.status === "online").length, [projects]);
  // Se obtiene la fecha actual
  const updatedAt = useMemo(() => new Date().toLocaleDateString("es-CL", { day: "numeric", month: "short" }), []);

  return (
    <section className="pt-16 md:pt-20" id="hero">
      <span className="animate-fade-up inline-block rounded-full border border-amber bg-amber-glow px-3 py-1 font-mono text-xs font-medium tracking-wide text-amber">
        Open to work
      </span>
      {/* H1: Nombre completo como heading principal para SEO */}
      <h1 className="animate-fade-up delay-1 mt-5 max-w-[18ch] font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
        Nico Villagrán
      </h1>

      {/* Subtítulo/tagline: define el diferencial del desarrollador */}
      <p className="animate-fade-up delay-2 mt-3 text-base font-medium text-amber">
        Frontend Developer obsesionado con detalles
      </p>

      {/* Descripción expandida: años de experiencia + especialidades principales */}
      <p className="animate-fade-up delay-2 mt-4 max-w-[70ch] text-base leading-relaxed text-text-secondary md:text-lg">
        2 años construyendo interfaces modernas con <strong>React • Next.js • TypeScript • JavaScript</strong>.
        Especializado en <strong>performance</strong>, <strong>animaciones fluidas</strong>,
        <strong>diseño responsivo</strong> y <strong>accesibilidad web</strong>.
      </p>

      <div className="animate-fade-up delay-3 mt-8 flex flex-wrap items-center gap-3">
        <a href="#proyectos" className="hero-cta-shadow rounded-btn bg-linear-to-br from-accent to-cyan-400 px-5 py-2.5 text-sm font-bold text-base-900 transition-transform hover:-translate-y-0.5">
          Ver proyectos
        </a>
        <a href="#contacto" className="rounded-btn border border-line-hover bg-base-900/50 px-5 py-2.5 text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent-border">
          Trabajemos juntos
        </a>
      </div>

      {/* Sección de habilidades expandida: skills más allá del stack tecnológico */}
      <div className="animate-fade-up delay-3 mt-10 space-y-3">
        <p className="text-xs font-mono tracking-wide text-text-muted uppercase">Especialidades</p>
        <div className="flex flex-wrap gap-2">
          <SkillBadge skill="Frontend Development" />
          <SkillBadge skill="Performance Optimization" />
          <SkillBadge skill="Responsive Design" />
          <SkillBadge skill="Smooth Animations" />
          <SkillBadge skill="Web Accessibility" />
          <SkillBadge skill="Component Architecture" />
        </div>
      </div>

      {/* Stats: métricas dinámicas del portafolio */}
      <div className="animate-fade-up delay-4 mt-12 grid grid-cols-3 gap-2 px-2 sm:max-w-md sm:gap-3 sm:px-0">
        <Stat value={totalProjects} label="Proyectos" />
        <Stat value={onlineCount} label="Online" />
        <Stat value={updatedAt} label="Actualizado" />
      </div>
    </section>
  );
}
