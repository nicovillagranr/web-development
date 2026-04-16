import "./ProjectCard.css"

const STATUS_STYLES = {
  online:
    "border-emerald/30 bg-emerald-glow text-emerald",
  maintenance:
    "border-amber/30 bg-amber-glow text-amber",
};

export default function ProjectCard({ project, index }) {
  const { name, path, description, stack, type, status } = project;
  const statusLabel = status === "online" ? "Online" : "Mantenimiento";
  const href = path.endsWith("/") ? path : `${path}/`;

  return (
    <a href={href} aria-label={`Abrir ${name}`} className="card group" style={{ animationDelay: `${100 + index * 80}ms` }}>
      <div className="card__header">
        <span className="card__type">{type}</span>
        <span className={`card__status ${STATUS_STYLES[status]}`}>{statusLabel}</span>
      </div>

      <h3 className="card__title">{name}</h3>
      <p className="card__description">{description}</p>

      <div className="card__footer">
        <span className="card__stack">{stack}</span>
        <span className="card__arrow">Abrir &rarr;</span>
      </div>
    </a>
  );
}