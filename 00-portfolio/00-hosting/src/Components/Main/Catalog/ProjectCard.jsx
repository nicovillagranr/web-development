import githubIcon from "../../../assets/icons/github-light.svg";
import { LANGUAGES } from "../../../schemas/projectsSchema";

const CHIP_BASE = "rounded-badge border px-2 py-0.5 font-mono text-xs font-medium";

const CHIP_CLASSES = {
  accent: "border-accent-border bg-accent-glow text-accent",
  emerald: "border-emerald/30 bg-emerald-glow text-emerald",
  amber: "border-amber/30 bg-amber-glow text-amber",
  // Los lenguajes van RELLENOS, no con el borde translúcido de los demás: el
  // lenguaje es otra clase de dato, no una tech más, y con el mismo tratamiento
  // que el resto se perdía (el amarillo de JS y el de `pnpm` son casi el mismo).
  // `text-base-900` es el color de fondo de la página, que se invierte con el
  // tema — así el texto contrasta contra el relleno en claro y en oscuro.
  langTs: "border-lang-ts bg-lang-ts text-base-900",
  langJs: "border-lang-js bg-lang-js text-base-900",
  violet: "border-violet-500/30 bg-violet-500/15 text-violet-400",
  green: "border-green-500/30 bg-green-500/15 text-green-400 [html.light_&]:border-green-700/40 [html.light_&]:bg-green-700/10 [html.light_&]:text-green-700",
  mono: "border-text-primary/40 bg-text-primary/10 text-text-primary",
  neutral: "border-line bg-surface text-text-muted",
};

const TECH_CATEGORY = {
  "TypeScript": "langTs",
  "JavaScript": "langJs",
  "React 19": "accent",
  "Next.js 16": "accent",
  "Tailwind v4": "emerald",
  "Vite": "emerald",
  "Framer Motion": "emerald",
  "React Router": "emerald",
  "React Icons": "emerald",
  "CSS modular": "emerald",
  "Zod": "emerald",
  "Vitest": "amber",
  "Prisma": "amber",
  "SQLite": "amber",
  "EmailJS": "amber",
  "Node.js": "green",
  "Supabase": "green",
  "npm": "amber",
  "pnpm": "amber",
  "Vercel": "mono",
  "Hostinger": "violet",
};

// El lenguaje no es una tech más entre las otras: es lo primero que mira quien
// evalúa el proyecto. Por eso tiene su propio grupo y se pinta arriba de todos.
const LANGUAGE_GROUP = Object.fromEntries(LANGUAGES.map((lang) => [lang, "language"]));

const TECH_GROUP = {
  ...LANGUAGE_GROUP,
  "React 19": "frontend",
  "Next.js 16": "frontend",
  "Tailwind v4": "frontend",
  "Vite": "tools",
  "npm": "tools",
  "pnpm": "tools",
  "json-server": "backend",
  "Framer Motion": "frontend",
  "React Router": "frontend",
  "React Icons": "frontend",
  "CSS modular": "frontend",
  "Zod": "frontend",
  "Vitest": "tools",
  "Prisma": "backend",
  "SQLite": "backend",
  "EmailJS": "backend",
  "Node.js": "backend",
  "Supabase": "backend",
};

export default function ProjectCard({ project, priority = false }) {
  const { name, path, description, stack, type, status, image, deploy, repo } = project;
  const statusLabel = status === "online" ? "Online" : "En desarrollo";
  // Este propio sitio está publicado en la raíz, así que su "demo" es la página
  // en la que ya estás: enlazarla sería abrir una copia de lo mismo. Su acción
  // pasa a ser el código, y la tarjeta deja de ser clicable entera.
  // El `&& repo` no es decorativo: `repo` es opcional en el schema, y sin él no
  // habría destino al que mandar la acción. En ese caso se comporta como el resto.
  const esEsteSitio = path === "/" && Boolean(repo);
  const accionHref = esEsteSitio ? repo : path.endsWith("/") ? path : `${path}/`;
  const accionTexto = esEsteSitio ? "Ver el código" : "Abrir";
  const accionLabel = esEsteSitio ? `Ver el código de ${name} en GitHub` : `Abrir demo de ${name}`;
  const grouped = stack.reduce((acc, t) => {
    const g = TECH_GROUP[t];
    if (g) (acc[g] ??= []).push(t);
    return acc;
  }, {});

  return (
    <article aria-label={name} className="animate-card-enter group relative grid gap-3 overflow-hidden rounded-tl-4xl rounded-tr-sm rounded-bl-sm rounded-br-4xl border border-line bg-linear-to-b from-surface-strong to-surface p-4 shadow-card transition-all duration-300 lg:hover:-translate-y-1 lg:hover:border-accent-border lg:hover:bg-none lg:hover:bg-accent-glow lg:hover:shadow-glow">
      {project.image && (
        <div className="relative -mx-4 -mt-4">
          <img
            src={project.image}
            alt={`Preview de ${name}`}
            className="aspect-video w-full object-cover object-top transition-transform duration-500 lg:group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
          />
          {repo && !esEsteSitio && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Repositorio de ${name} en GitHub`}
              className="absolute right-2 top-2 z-20 hidden h-9 w-9 items-center justify-center rounded-full bg-black/60 opacity-70 backdrop-blur transition hover:opacity-100 group-hover:opacity-100 md:flex">
              <img src={githubIcon} alt="GitHub Icon" className="h-5 w-5 invert" />
            </a>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-badge border border-accent-border bg-accent-glow px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">{type}
        </span>
        <span className={`${CHIP_BASE} ${CHIP_CLASSES[status === "online" ? "emerald" : "amber"]}`}>{statusLabel}</span>
      </div>

      <h3 className="font-heading text-lg font-bold text-text-primary">{name}</h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>

      <section aria-label="Stack tecnológico" className="font-mono text-xs leading-relaxed">
        {["language", "tools", "frontend", "backend"].map((group) => {
          const techs = grouped[group] ?? [];
          if (techs.length === 0) return null;
          return (
            <div key={group}>
              <div className="text-text-muted">$ {group}</div>
              <div className="flex flex-wrap gap-1.5 pl-3">
                {techs.map((tech) => (
                  <span key={tech} className={`${CHIP_BASE} ${CHIP_CLASSES[TECH_CATEGORY[tech] ?? "neutral"]}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {deploy && (
          <div>
            <div className="text-text-muted">$ deploy:</div>
            <div className="pl-3">
              <span className={`${CHIP_BASE} ${CHIP_CLASSES[TECH_CATEGORY[deploy] ?? "neutral"]}`}>
                {deploy}
              </span>
            </div>
          </div>
        )}
      </section>

      <div className="mt-auto hidden items-center justify-between gap-2 pt-1 md:flex">
        {/* El `after:inset-0` estira un pseudo-elemento sobre toda la tarjeta para
            hacerla clicable. En la de este sitio no se pone: solo debe poder
            pulsarse el enlace, no la tarjeta entera. */}
        <a
          href={accionHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accionLabel}
          className={esEsteSitio ? "" : "md:after:absolute md:after:inset-0 md:after:content-['']"}
        >
          <span className="text-sm font-bold text-text-primary opacity-60 transition-opacity group-hover:opacity-100">
            {accionTexto} &rarr;
          </span>
        </a>
        {repo && !image && (
          <a href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${name} en GitHub`}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 opacity-70 backdrop-blur transition hover:opacity-100"
          >
            <img src={githubIcon} alt="GitHub Icon" className="h-5 w-5 invert" />
          </a>
        )}
      </div>

      <div className="mt-auto flex gap-2 pt-1 md:hidden">
        <a
          href={accionHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accionLabel}
          className="flex min-h-11 flex-1 items-center justify-center rounded-badge border border-accent-border bg-accent-glow px-3 text-sm font-semibold text-accent"
        >
          {accionTexto} &rarr;
        </a>
        {/* En la tarjeta de este sitio la acción ya lleva al repo: un segundo
            icono al lado sería el mismo destino dos veces. */}
        {repo && !esEsteSitio && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${name} en GitHub`}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-badge border border-line bg-surface px-3 [html.light_&]:border-2 [html.light_&]:border-text-muted"
          >
            <img src={githubIcon} alt="GitHub Icon" className="h-5 w-5 invert [html.light_&]:invert-0" />
          </a>
        )}
      </div>
    </article>
  );
}
