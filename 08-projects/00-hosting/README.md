# Portfolio — Proyectos

Página de proyectos del portfolio de Nicolás Villagrán. Una SPA en React que
consume una API propia y presenta el perfil y los proyectos en un catálogo
filtrable, con un Hero interactivo en forma de editor de código.

**Demo:** [nicovillagran.com](https://nicovillagran.com)

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

Requiere Node 20+.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
```

### Scripts

| Script            | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR           |
| `npm run build`   | Build de producción en `dist/`           |
| `npm run preview` | Sirve el build de producción localmente  |
| `npm run lint`    | Linter sobre todo el proyecto            |
| `npm test`        | Tests con Vitest                         |

---

## Estructura

```
src/
├── App.jsx                  Composición raíz: tema + datos + layout
├── main.jsx                 Punto de entrada
├── assets/                  Fuentes, iconos y App.css
├── Components/
│   ├── 1-Header/            Cabecera + toggle de tema
│   ├── 2-Main/
│   │   ├── 1-Hero/          Hero, EditorWindow, PreviewPanel, HeroSkeleton
│   │   └── 2-Catalog/       Catalog, ProjectCard (+ tests)
│   ├── 3-Footer/            Pie de página
│   └── ErrorBoundary/       Captura de errores de render
├── hooks/
│   └── usePortfolioData.js  Carga de projects + profile (+ tests)
├── schemas/                 Schemas Zod de la API
└── data/                    Claves de localStorage centralizadas
```

---

## Datos

La app consume una API propia:

```
https://00-portfolio-projects-api.vercel.app
  GET /projects   — lista de proyectos
  GET /profile    — perfil (rol, ubicación, stack, intro)
```

El hook `usePortfolioData` pide ambos endpoints en paralelo con `Promise.all`,
valida cada respuesta con Zod, cancela las peticiones al desmontar mediante
`AbortController` y reporta en el error qué endpoint falló y con qué status.

---

## Testing

20 tests con Vitest + Testing Library:

- `usePortfolioData.test.js` — estados loading / success / error HTTP y
  cancelación al desmontar.
- `ProjectCard.test.jsx` — renderizado de imagen, badges, stack, enlaces y
  casos negativos.

```bash
npm test
```

---

## Deploy

El build (`npm run build`) genera `dist/`, pensado para hosting estático Apache.
El `.htaccess` en `public/` incluye el `ErrorDocument` de la página 404 custom y
se copia al build automáticamente.

---

## Nota de desarrollo

Prettier reformatea los *arbitrary values* de Tailwind dentro de `@apply`
(ej. `shadow-[0_12px_28px_rgba(56,189,248,0.25)]`) añadiendo espacios tras las
comas, lo que rompe la regla de forma silenciosa. La solución aplicada fue sacar
esos valores complejos del `@apply` y escribirlos como CSS plano, además de usar
`prettier-plugin-tailwindcss`, que entiende la sintaxis de Tailwind y ordena las
clases automáticamente.
