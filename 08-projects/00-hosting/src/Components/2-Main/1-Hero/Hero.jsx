import { useMemo } from "react";
import { projects } from "@/data/projects";
import "./Hero.css";

export default function Hero() {
  const totalProjects = projects.length;
  const onlineCount = useMemo(() => projects.filter((p) => p.status === "online").length, []);
  const updatedAt = useMemo(() => new Date().toLocaleDateString("es-CL", { day: "numeric", month: "short" }), []);

  return (
    <section className="hero">
      <span className="hero__eyebrow">Portfolio en la nube</span>
      <h1 className="hero__title">Proyectos web en producción.</h1>
      <p className="hero__subtitle">Interfaces desplegadas en la nube, listas para explorar. Cada proyecto refleja decisiones reales de arquitectura, diseño y rendimiento.
      </p>

      <div className="hero__buttons">
        <a href="#proyectos" className="hero__button--light">Ver proyectos</a>
        <a href="#contacto" className="hero__button--dark">Contacto</a>
      </div>

      <div className="hero__stats">
        <Stat value={totalProjects} label="Proyectos" />
        <Stat value={onlineCount} label="Online" />
        <Stat value={updatedAt} label="Actualizado" />
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <article className="hero__stat">
      <strong className="hero__stat-value">{value}</strong>
      <span className="hero__stat-label">{label}</span>
    </article>
  );
}
