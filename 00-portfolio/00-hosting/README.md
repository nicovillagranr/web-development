# Portfolio — Proyectos

Página de proyectos del portfolio de Nicolás Villagrán. Una SPA en React que
consume una API propia y presenta el perfil y los proyectos en un catálogo
filtrable, con un Hero interactivo en forma de editor de código.

**Demo:** [nico-villagran.com](https://nico-villagran.com)

---

## Stack

| Capa        | Tecnología                                              |
| ----------- | ------------------------------------------------------- |
| UI          | React 19.2                                              |
| Build       | Vite 8                                                  |
| Estilos     | Tailwind CSS v4.2 (`@theme`, modo claro/oscuro)         |
| Validación  | Zod 4 (schemas de la respuesta de la API)               |
| Testing     | Vitest 4 + Testing Library + jest-dom                   |
| Lint        | ESLint 9 (flat config)                                  |
| Deploy      | Apache / Hostinger (`.htaccess` incluido)               |

Solo 3 dependencias en runtime: `react`, `react-dom`, `zod`.

---

## Características

- **Hero interactivo** — el perfil se muestra como un editor de código con
  pestañas (`about.json`, `stack.json`, `contact.json`) navegables por teclado.
- **Catálogo de proyectos** — cards con imagen, badges de tipo/estado, stack
  agrupado y enlaces a demo y repositorio.
- **Tema claro/oscuro** — persistido en `localStorage`, con fallback a
  `prefers-color-scheme`.
- **Accesibilidad** — patrón `tablist` completo en el Hero, roles ARIA y
  `aria-live` en estados de carga y error.
- **Performance** — `Catalog` cargado con `lazy` + `Suspense`, `fetchpriority`
  y lazy loading en imágenes, `preconnect` a la API.
- **Resiliencia** — `ErrorBoundary` global y fallbacks honestos ("—") cuando la
  API falla, en vez de datos plausibles que oculten el problema.
- **SEO + PWA** — JSON-LD (schema.org Person), Open Graph dual, Twitter Cards,
  `sitemap.xml`, `robots.txt` y `site.webmanifest`.

---

## Puesta en marcha

Requiere Node 20+ y pnpm 10+ (declarado en `packageManager`).

```bash
cp .env.example .env   # copiar plantilla de variables de entorno
pnpm install           # instalar dependencias
pnpm dev               # servidor de desarrollo
```

### Variables de entorno

| Variable          | Requerida | Descripción                                  |
| ----------------- | --------- | -------------------------------------------- |
| `VITE_API_BASE`   | sí        | URL base de la API de proyectos + perfil     |

El `.env` no se commitea (está en `.gitignore`); usa `.env.example` como plantilla.

### Scripts

| Script           | Descripción                                        |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo con HMR                     |
| `pnpm build`     | Genera el snapshot y compila a `dist/`             |
| `pnpm snapshot`  | Solo regenera `public/data-snapshot.json`          |
| `pnpm preview`   | Sirve el build de producción localmente            |
| `pnpm lint`      | Linter sobre todo el proyecto                      |
| `pnpm test`      | Tests con Vitest (en watch; `--run` para una pasada) |

---

## Estructura

```
scripts/
└── generate-snapshot.js     Congela la API en public/data-snapshot.json (build)

src/
├── App.jsx                  Composición raíz: tema + datos + layout
├── main.jsx                 Punto de entrada
├── assets/                  Fuentes, iconos y App.css
├── Components/
│   ├── Header/              Cabecera + toggle de tema
│   ├── Main/
│   │   ├── Hero/            Hero, EditorWindow, PreviewPanel, HeroSkeleton
│   │   └── Catalog/         Catalog, ProjectCard (+ tests)
│   ├── Footer/              Pie de página
│   └── ErrorBoundary/       Captura de errores de render
├── hooks/
│   ├── usePortfolioDataWithFallback.js  El que usa la app: API + snapshot
│   └── usePortfolioData.js  Versión original sin fallback (+ tests)
├── schemas/                 Schemas Zod de la API
└── data/                    Claves de localStorage centralizadas
```

Los dos hooks conviven a propósito: el original se conserva como término de
comparación para ver qué añade exactamente la red de seguridad.

---

## Datos

La app consume una API propia:

```
https://00-portfolio-projects-api.vercel.app
  GET /projects   — lista de proyectos
  GET /profile    — perfil (rol, ubicación, stack, intro)
```

El hook `usePortfolioDataWithFallback` pide ambos endpoints en paralelo con
`Promise.all`, valida cada respuesta con Zod, cancela las peticiones al desmontar
mediante `AbortController` y reporta en el error qué endpoint falló y con qué
status.

### Red de seguridad

Si la API no responde en 4s, devuelve un error HTTP, se cae la red o el JSON no
pasa el schema, el hook recurre a `data-snapshot.json`: una copia de la respuesta
de la API congelada durante el build por `scripts/generate-snapshot.js` y servida
desde el mismo host que la app, así que si la página cargó el snapshot está.

El snapshot también se valida con Zod — un snapshot corrupto da error en vez de
pintar basura — y el hook devuelve `stale: true` cuando los datos vienen de ahí.
Si la API está caída en el momento del build, el script avisa pero **no rompe el
build**: conserva el snapshot anterior.

> Como el snapshot se hornea contra la API **en vivo**, hay que desplegar
> cualquier cambio de la API *antes* de correr `pnpm build`. Al revés, el
> snapshot se queda con los datos viejos.

---

## Testing

26 tests con Vitest + Testing Library:

- `usePortfolioData.test.js` (4) — estados loading / success / error HTTP y
  cancelación al desmontar.
- `ProjectCard.test.jsx` (22) — renderizado de imagen, badges, stack agrupado,
  enlaces y casos negativos.

```bash
pnpm test -- --run   # una pasada; `pnpm test` a secas se queda en watch
```

---

## Deploy

El build (`pnpm build`) genera `dist/`, pensado para hosting estático Apache.
Todo lo de `public/` se copia al build automáticamente: el `.htaccess` (con el
`ErrorDocument` de la 404 custom y las cabeceras de caché), el `sitemap.xml`, el
`robots.txt` y el `data-snapshot.json` recién horneado.

Subir el contenido de `dist/` a la raíz del hosting.

---

## Nota de desarrollo

Prettier reformatea los *arbitrary values* de Tailwind dentro de `@apply`
(ej. `shadow-[0_12px_28px_rgba(56,189,248,0.25)]`) añadiendo espacios tras las
comas, lo que rompe la regla de forma silenciosa. La solución aplicada fue sacar
esos valores complejos del `@apply` y escribirlos como CSS plano, además de usar
`prettier-plugin-tailwindcss`, que entiende la sintaxis de Tailwind y ordena las
clases automáticamente.
