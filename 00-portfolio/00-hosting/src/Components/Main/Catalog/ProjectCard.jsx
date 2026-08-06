import githubIcon from "../../../assets/icons/github-light.svg";
import { LANGUAGES } from "../../../schemas/projectsSchema";

const CHIP_BASE = "rounded-badge border px-2 py-0.5 font-mono text-xs font-medium";

// Desde que el stack se pinta como tabla, la pastilla es EXCLUSIVA de la columna
// `lenguaje`: todo lo demás va como texto de color (ver TECH_TEXT). Por eso aquí
// solo quedan los dos lenguajes — las categorías que había para el resto
// (accent, emerald, amber, violet, green, mono) ya no las alcanzaba nadie.
//
// Los lenguajes van RELLENOS, no con el borde translúcido que tenían los demás:
// el lenguaje es otra clase de dato, no una tech más, y con el mismo tratamiento
// que el resto se perdía (el amarillo de JS y el de `pnpm` son casi el mismo).
// `text-base-900` es el color de fondo de la página, que se invierte con el
// tema — así el texto contrasta contra el relleno en claro y en oscuro.
const CHIP_CLASSES = {
  langTs: "border-lang-ts bg-lang-ts text-base-900",
  langJs: "border-lang-js bg-lang-js text-base-900",
  // Red de seguridad, hoy inalcanzable: el schema obliga a que el lenguaje sea
  // uno de LANGUAGES y los dos están mapeados abajo. Existe para el día que
  // añadas un tercer lenguaje y se te olvide darle categoría — mejor una
  // pastilla sosa que una sin estilo ninguno.
  neutral: "border-line bg-surface text-text-muted",
};

// Las mismas categorías, pero solo el color del texto: en las columnas del stack
// las techs van sin pastilla, así que el color es lo único que queda para
// distinguir un grupo de otro.
// Ojo con `violet` y `green`: son los dos únicos que no salen de un token del
// @theme, así que no se invierten solos con el tema y necesitan su override a
// mano. Como pastilla se sostenían con fondo y borde; como texto pelado sobre
// fondo claro, sin el override se lavan.
const TECH_TEXT = {
  accent: "text-accent",
  emerald: "text-emerald",
  amber: "text-amber",
  violet: "text-violet-400 [html.light_&]:text-violet-700",
  green: "text-green-400 [html.light_&]:text-green-700",
  mono: "text-text-primary",
  neutral: "text-text-muted",
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
  // Mismo verde que Node.js a propósito: json-server ES un servidor Node, y en
  // la columna `backend` de las cards de API van uno debajo del otro. Sin
  // categoría caía en `neutral` y salía gris apagado al lado del verde, como si
  // fuera de otra clase de cosa.
  "json-server": "green",
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

// El framework va justo detrás del lenguaje, antes que las herramientas: quien
// evalúa el proyecto mira primero con qué está construido, no con qué se empaqueta.
const GROUP_ORDER = ["language", "frontend", "backend", "tools"];

// Las claves de grupo son inglesas porque vienen de TECH_GROUP, pero la tarjeta
// está escrita en español y las cabeceras se leen.
const GROUP_LABEL = {
  language: "lenguaje",
  frontend: "frontend",
  backend: "backend",
  tools: "herramientas",
  deploy: "deploy",
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
  // Las APIs no tienen captura que enseñar, y una portada de relleno sería
  // ruido: sin ella la tarjeta se queda en 5 franjas en vez de 6. No rompe el
  // molde porque el catálogo agrupa por `framework` y las APIs son un grupo
  // aparte con su propio grid — dentro de una misma rejilla, o todas las
  // tarjetas traen imagen o no la trae ninguna.
  const conPortada = Boolean(image);
  const grouped = stack.reduce((acc, t) => {
    const g = TECH_GROUP[t];
    if (g) (acc[g] ??= []).push(t);
    return acc;
  }, {});
  // Las columnas del stack se calculan antes del JSX por dos motivos: hay que
  // descartar los grupos vacíos (una cabecera sin nada debajo sería una columna
  // fantasma), y `deploy` es un campo suelto del proyecto, no una tech del
  // array, pero en la tabla es una columna más como las otras. Normalizarlo
  // aquí evita repetir el mismo marcado dos veces en el JSX.
  const columnasStack = [
    ...GROUP_ORDER.map((group) => [group, grouped[group] ?? []]),
    ...(deploy ? [["deploy", [deploy]]] : []),
  ].filter(([, techs]) => techs.length > 0);

  return (
    // MOLDE FIJO. La tarjeta no se maqueta a sí misma: `grid-rows-subgrid` la
    // engancha a las filas del grid del catálogo, y el `row-span` reserva una
    // franja por zona: 5 con portada (portada, cabecera, descripción, stack,
    // acción) y 4 sin ella. Como todas las tarjetas de una misma fila
    // comparten esas franjas, el stack y el botón caen SIEMPRE a la misma
    // altura aunque la descripción de una sea el doble de larga que la de su
    // vecina: la corta deja hueco, no empuja lo de abajo. Debajo de `md` hay
    // una sola columna y no hay nada con lo que alinear, así que ahí vuelve a
    // ser un grid normal con su `gap-4`.
    <article
      aria-label={name}
      className={`animate-card-enter group relative grid gap-4 overflow-hidden rounded-tl-4xl rounded-tr-sm rounded-bl-sm rounded-br-4xl border border-line bg-linear-to-b from-surface-strong to-surface shadow-card transition-all duration-300 md:mb-2 md:grid-rows-subgrid lg:hover:-translate-y-1 lg:hover:border-accent-border lg:hover:bg-none lg:hover:bg-accent-glow lg:hover:shadow-glow ${conPortada ? "md:row-span-5" : "md:row-span-4"}`}
    >
      {/* ── 1. Portada ───────────────────────────────────────────────────── */}
      {conPortada && (
        <div className="relative">
          <img
            src={image}
            alt={`Preview de ${name}`}
            className="aspect-video h-full w-full object-cover object-top transition-transform duration-500 lg:group-hover:scale-105"
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

      {/* ── 2. Cabecera ──────────────────────────────────────────────────── */}
      {/* El tipo y el título comparten franja a propósito: "Web App" es una
          etiqueta DEL nombre, no un dato aparte, y separarlos en dos zonas del
          subgrid metía 16px de aire entre dos líneas que se leen seguidas.
          El tipo va de kicker (mono, sin pastilla) y el estado de punto: dos
          badges enfrentados pesaban más que el propio nombre del proyecto.
          Sin portada esta es la primera franja y el borde de arriba le queda
          pegado: el `pt-5` le devuelve el aire que daba la imagen. */}
      <div className={`grid gap-1 px-5 ${conPortada ? "" : "pt-5"}`}>
        <div className="flex items-center justify-between gap-2 font-mono text-xs">
          <span className="font-medium uppercase tracking-widest text-text-muted">{type}</span>
          {/* Mismo idioma que los puntos de estado del Hero y del EditorWindow.
              El latido solo cuando está online: en un proyecto en desarrollo
              anunciaría una actividad que no hay. */}
          <span className={`inline-flex items-center gap-1.5 ${status === "online" ? "text-emerald" : "text-amber"}`}>
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 rounded-full bg-current ${status === "online" ? "animate-pulse-dot" : ""}`}
            />
            {statusLabel}
          </span>
        </div>
        <h3 className="font-heading text-xl font-bold text-text-primary">{name}</h3>
      </div>

      {/* ── 3. Descripción ───────────────────────────────────────────────── */}
      <p className="px-5 text-sm leading-relaxed text-text-secondary">{description}</p>

      {/* ── 4. Stack ─────────────────────────────────────────────────────── */}
      {/* Una tabla, no una lista: cada grupo es una COLUMNA con su cabecera
          arriba y sus techs cayendo debajo.
          Las techs van sin pastilla pero CON color: apiladas, ocho píldoras
          rellenas eran confeti, mientras que la misma paleta aplicada al texto
          distingue los grupos sin gritar. El lenguaje sí conserva la suya, que
          es justo lo que lo separa de ser una tech más.

          REJILLA DE DOS COLUMNAS HASTA `xl`, y solo a partir de ahí una fila
          que se dimensiona al contenido. El motivo son los anchos medidos: los
          cinco grupos de Projex piden 481px y la tarjeta no llega a esa cifra
          hasta 1280px de viewport (antes ronda los 320-476). Dejarlo en
          flex-wrap por debajo hacía caer el último grupo SOLO en una segunda
          línea, sin nada encima con lo que alinearse — el salto feo.
          Bajar el cuerpo de letra no lo arregla: ni a 9px (ilegible) entra
          Projex, porque el problema es el número de columnas, no su tamaño.
          Con dos columnas fijas el corte es siempre el mismo y las cabeceras
          quedan alineadas, que es lo que lo hace leer como tabla. */}
      <section
        aria-label="Stack tecnológico"
        className="grid grid-cols-2 gap-x-6 gap-y-4 px-5 font-mono text-xs xl:flex xl:flex-wrap"
      >
        {columnasStack.map(([group, techs]) => (
          <div key={group} className="grid content-start gap-1.5">
            <div className="border-b border-line pb-1 text-text-muted">{GROUP_LABEL[group]}</div>
            {techs.map((tech) =>
              group === "language" ? (
                // `justify-self-start` para que la pastilla no se estire hasta
                // el ancho de la columna: en un grid los hijos crecen por
                // defecto, y una píldora estirada deja de parecer una píldora.
                <span
                  key={tech}
                  className={`${CHIP_BASE} ${CHIP_CLASSES[TECH_CATEGORY[tech] ?? "neutral"]} justify-self-start`}
                >
                  {tech}
                </span>
              ) : (
                <span key={tech} className={TECH_TEXT[TECH_CATEGORY[tech] ?? "neutral"]}>
                  {tech}
                </span>
              )
            )}
          </div>
        ))}
      </section>

      {/* ── 5. Acción ────────────────────────────────────────────────────── */}
      {/* Escritorio y móvil van envueltos en un mismo contenedor a propósito:
          son dos hijos del <article>, y sueltos ocuparían dos franjas del
          subgrid en vez de una, descuadrando la cuenta del `row-span`.
          La línea separadora va en cada variante y no en este contenedor: así
          queda metida dentro del `px-5` en vez de cruzar la tarjeta de lado a
          lado, y solo se pinta la de la variante que se está viendo. */}
      <div className="px-5 pb-5">
        <div className="hidden items-center justify-between gap-2 border-t border-line pt-4 md:flex">
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
          {/* Sin portada no hay dónde flotar el icono de GitHub, así que baja
              aquí, al lado de la acción. */}
          {repo && !conPortada && (
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

        <div className="flex gap-2 border-t border-line pt-4 md:hidden">
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
      </div>
    </article>
  );
}
