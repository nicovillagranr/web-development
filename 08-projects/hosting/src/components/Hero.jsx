import { projects } from "@/data/projects";

export default function Hero() {
  const totalProjects = projects.length;
  const onlineCount = projects.filter((p) => p.status === "online").length;
  const today = new Date();
  const updatedAt = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <section className="pb-8 pt-16 md:pt-20">
      {/* Eyebrow */}
      <span className="animate-fade-up inline-block rounded-full border border-accent-border bg-accent-glow px-3 py-1 font-mono text-xs font-medium tracking-wide text-accent">
        Portfolio cloud
      </span>

      {/* Title */}
      <h1 className="animate-fade-up delay-1 mt-5 max-w-[16ch] font-heading text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-text-primary">
        Proyectos web en produccion.
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-up delay-2 mt-4 max-w-[58ch] text-[clamp(1rem,2vw,1.15rem)] leading-relaxed text-text-secondary">
        Interfaces desplegadas en la nube, listas para explorar. Cada proyecto
        refleja decisiones reales de arquitectura, diseño y rendimiento.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up delay-3 mt-6 flex flex-wrap items-center gap-3">
        <a
          href="#proyectos"
          className="rounded-btn bg-gradient-to-br from-accent to-sky-400 px-5 py-2.5 text-sm font-bold text-base-900 shadow-[0_12px_28px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-0.5"
        >
          Ver proyectos
        </a>
        <a
          href="#contacto"
          className="rounded-btn border border-line-hover bg-base-900/50 px-5 py-2.5 text-sm font-bold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent-border"
        >
          Contacto
        </a>
      </div>

      {/* Stats */}
      <div className="animate-fade-up delay-4 mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
        <Stat value={totalProjects} label="Proyectos" />
        <Stat value={onlineCount} label="Online" />
        <Stat value={updatedAt} label="Actualizado" />
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <article className="rounded-xl border border-line bg-surface px-3.5 py-3">
      <strong className="block font-mono text-lg font-bold text-text-primary">
        {value}
      </strong>
      <span className="text-xs text-text-muted">{label}</span>
    </article>
  );
}
