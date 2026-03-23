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
    <a
      href={href}
      aria-label={`Abrir ${name}`}
      className="animate-card-enter group grid gap-3 rounded-card border border-line bg-gradient-to-b from-surface-strong to-surface p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:shadow-glow"
      style={{ animationDelay: `${100 + index * 80}ms` }}
    >
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-badge border border-accent-border bg-accent-glow px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-accent">
          {type}
        </span>
        <span
          className={`rounded-badge border px-2.5 py-0.5 text-[0.7rem] font-medium ${STATUS_STYLES[status]}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-[1.1rem] font-bold text-text-primary">
        {name}
      </h3>

      {/* Description */}
      <p className="text-[0.9rem] leading-relaxed text-text-secondary">
        {description}
      </p>

      {/* Bottom row */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="font-mono text-[0.75rem] font-medium text-text-muted">
          {stack}
        </span>
        <span className="text-[0.82rem] font-bold text-text-primary opacity-60 transition-opacity group-hover:opacity-100">
          Abrir &rarr;
        </span>
      </div>
    </a>
  );
}
