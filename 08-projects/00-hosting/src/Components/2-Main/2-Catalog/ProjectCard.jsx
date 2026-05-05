import githubIcon from "../../../assets/icons/github.svg";

const STATUS_STYLES = {
  online: "border-emerald/30 bg-emerald-glow text-emerald",
  maintenance: "border-amber/30 bg-amber-glow text-amber",
};

const CHIP_BASE = "rounded-badge border px-2 py-0.5 font-mono text-xs font-medium";

const CHIP_CLASSES = {
  accent: "border-accent-border bg-accent-glow text-accent",
  emerald: "border-emerald/30 bg-emerald-glow text-emerald",
  amber: "border-amber/30 bg-amber-glow text-amber",
  violet: "border-violet-500/30 bg-violet-500/15 text-violet-400",
  green: "border-green-500/30 bg-green-500/15 text-green-400",
  mono: "border-text-primary/40 bg-text-primary/10 text-text-primary",
  neutral: "border-line bg-surface text-text-muted",
};

const TECH_CATEGORY = {
  "React 19": "accent",
  "Next.js 16": "accent",
  "Tailwind v4": "emerald",
  "Vite": "emerald",
  "Framer Motion": "emerald",
  "React Router": "emerald",
  "React Icons": "emerald",
  "CSS modular": "emerald",
  "Prisma": "amber",
  "SQLite": "amber",
  "EmailJS": "amber",
  "Node.js": "green",
  "Vercel": "mono",
  "Hostinger": "violet",
};

const TECH_GROUP = {
  "React 19": "frontend",
  "Next.js 16": "frontend",
  "Tailwind v4": "frontend",
  "Vite": "frontend",
  "Framer Motion": "frontend",
  "React Router": "frontend",
  "React Icons": "frontend",
  "CSS modular": "frontend",
  "Prisma": "backend",
  "SQLite": "backend",
  "EmailJS": "backend",
  "Node.js": "backend",
};

const TECH_TEXT_COLOR = {
  accent: "text-accent",
  emerald: "text-emerald",
  amber: "text-amber",
  green: "text-green-400",
  violet: "text-violet-400",
  mono: "text-text-primary",
  neutral: "text-text-muted",
};

export default function ProjectCard({ project, index, priority = false }) {
  const { name, path, description, stack, type, status, image, deploy, repo } = project;
  const statusLabel = status === "online" ? "Online" : "Mantenimiento";
  const demoHref = path.endsWith("/") ? path : `${path}/`;

  return (
    <article aria-label={name} className="animate-card-enter group relative grid gap-3 overflow-hidden rounded-card border border-line bg-linear-to-b from-surface-strong to-surface p-4 shadow-card transition-all duration-300 md:hover:-translate-y-1 md:hover:border-accent-border md:hover:bg-none md:hover:bg-accent-glow md:hover:shadow-glow"
      style={{ animationDelay: `${100 + index * 80}ms` }}>
      {image && (
        <div className="relative -mx-4 -mt-4">
          <img
            src={image}
            alt={`Preview de ${name}`}
            className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            fetchpriority={priority ? "high" : undefined}
          />
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositorio de ${name} en GitHub`}
              className="absolute right-2 top-2 z-20 hidden h-9 w-9 items-center justify-center rounded-full bg-black/60 opacity-70 backdrop-blur transition hover:opacity-100 group-hover:opacity-100 md:flex">
              <img src={githubIcon} alt="" className="h-5 w-5 invert" />
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-badge border border-accent-border bg-accent-glow px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">{type}
        </span>
        <span className={`rounded-badge border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>{statusLabel}</span>
      </div>

      <h3 className="font-heading text-lg font-bold text-text-primary">{name}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>

      <div className="font-mono text-xs leading-relaxed">
        {["frontend", "backend"].map((group) => {
          const techs = stack.filter((t) => TECH_GROUP[t] === group);
          if (techs.length === 0) return null;
          return (
            <div key={group}>
              <div className="text-text-muted">$ {group}:</div>
              <div className="flex flex-wrap gap-x-1.5 pl-3">
                {techs.map((tech, i) => (
                  <span key={tech}>
                    <span className={TECH_TEXT_COLOR[TECH_CATEGORY[tech] ?? "neutral"]}>
                      {tech}
                    </span>
                    {i < techs.length - 1 && <span className="text-text-muted"> ·</span>}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {deploy && (
          <div>
            <div className="text-text-muted">$ deploy:</div>
            <div className={`pl-3 ${TECH_TEXT_COLOR[TECH_CATEGORY[deploy] ?? "neutral"]}`}>
              {deploy}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto hidden items-center justify-between gap-2 pt-1 md:flex">
        <a
          href={demoHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir demo de ${name}`}
          className="md:after:absolute md:after:inset-0 md:after:content-['']"
        >
          <span className="text-sm font-bold text-text-primary opacity-60 transition-opacity group-hover:opacity-100">
            Abrir &rarr;
          </span>
        </a>
        {repo && !image && (
          <a href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${name} en GitHub`}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 opacity-70 backdrop-blur transition hover:opacity-100"
          >
            <img src={githubIcon} alt="" className="h-5 w-5 invert" />
          </a>
        )}
      </div>

      <div className="mt-auto flex gap-2 pt-1 md:hidden">
        <a
          href={demoHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir demo de ${name}`}
          className="flex min-h-11 flex-1 items-center justify-center rounded-badge border border-accent-border bg-accent-glow px-3 text-sm font-semibold text-accent"
        >
          Demo &rarr;
        </a>
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${name} en GitHub`}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-badge border border-line bg-surface px-3"
          >
            <img src={githubIcon} alt="" className="h-5 w-5" />
          </a>
        )}
      </div>
    </article>
  );
}
