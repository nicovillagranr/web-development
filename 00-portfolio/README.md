# Proyectos

Los proyectos aplicados del repositorio. Los de `portfolio/` son los que están
publicados en [nico-villagran.com](https://nico-villagran.com); el resto es
trabajo en curso, práctica que ya cumplió su función y archivo histórico.

## El portfolio

**[`00-hosting/`](00-hosting)** — el sitio del portfolio. SPA en React 19 que consume
mi propia API REST y presenta el perfil y un catálogo filtrable de proyectos.
Los datos se piden en runtime, con un snapshot generado en *build time* como
respaldo si la API no responde. Con tests de la capa de datos y de la tarjeta de
proyecto.

## `01-react/`

Dividido en dos carpetas:

- **`portfolio/`** — el escaparate: los proyectos **publicados**, es decir, los que están en la API y responden en el dominio. Las dos condiciones, o no entra.
- **`privados/`** — todo lo demás: trabajo en curso, práctica que ya cumplió su función y archivo histórico.

No hay columna ✅ porque sería constante: **estar en `portfolio/` significa estar publicado**.
Un proyecto sube en cuanto cumple las dos condiciones, y baja si deja de cumplirlas.
Comprobado con `curl` el 20 ago 2026: los tres responden 200 y los tres salen en
[`/projects`](https://00-portfolio-projects-api.vercel.app/projects).

Dentro de cada carpeta, **el número ordena por dificultad técnica**, de más a menos.
El slug es lo que identifica: `03-projex` se publica en `/projex/`, no en `/03-projex/`.

### `portfolio/`

| Carpeta | Qué es | Qué lo hace difícil | Stack |
|---|---|---|---|
| [`01-store-pulse`](01-react/portfolio/01-store-pulse) | **Store Pulse** — PWA instalable y mobile-first con las métricas de un local en tres niveles: local, equipo y persona. Cada métrica se declara una vez en un registro que dice hacia qué lado mejora, así que la flecha y el color salen del dato. Datos ficticios. | TypeScript estricto, Zod validando la frontera, 82 tests, service worker y manifest | React 19 · TypeScript · Tailwind v4 · Recharts · Zod · Vitest |
| [`02-smart-cooler-ui`](01-react/portfolio/02-smart-cooler-ui) | **Smart Cooler UI** — dashboard de producto con clima y calidad del aire en tiempo real, inventario persistido y recetas sugeridas. | API externa (Open-Meteo) con su parseo, estado persistido y 40 tests de la lógica | React 19 · Tailwind v4 · Vitest |
| [`03-projex`](01-react/portfolio/03-projex) | **Projex** — landing con animaciones y formulario de contacto con validación accesible; el envío es una demo, sin backend. | Accesibilidad real (focus-trap, errores anunciados) y animaciones que no estorban la lectura | React 19 · Tailwind v4 · Framer Motion · React Router |

### `privados/`

| Carpeta | Qué es | Qué lo hace difícil | Stack |
|---|---|---|---|
| [`01-sport-mindset`](01-react/privados/01-sport-mindset) | **Sport Mindset** — e-commerce que consume mi [Products API](https://01-products-api.vercel.app/) por variable de entorno. En curso: sube a `portfolio/` cuando esté desplegado y en la API. La migración a Supabase con catálogo de ciclismo está planificada, no implementada. | Carrito con Context, filtros y orden componibles, búsqueda en la URL y fetch cancelable | React 19 · Tailwind v4 · React Router |
| [`02-shopreact`](01-react/privados/02-shopreact) | **ShopReact** — el mismo e-commerce, punto de partida de `sport-mindset`: hoy los 35 archivos de `src/` son idénticos entre los dos. | Lo mismo: es el origen del que salió el anterior | React 19 · Tailwind v4 · React Router |
| [`03-mgd-exports`](01-react/privados/03-mgd-exports) | **MGD Exports** — landing corporativa con arquitectura *feature-first* y alias de importación. | Única integración de terceros que envía de verdad (EmailJS con credenciales por entorno) | React 19 · Tailwind v4 · EmailJS |
| [`04-landing-layout-system`](01-react/privados/04-landing-layout-system) | **Landing Layout System** — secciones reutilizables y arquitectura CSS mantenible. Migrado a TypeScript. | Sistema de secciones tipado, pensado para reutilizar en vez de copiar | React 19 · TypeScript · Vite |
| [`05-nexusai`](01-react/privados/05-nexusai) | **NexusAI** — landing de agencia de IA, estética dark. Comparte arquitectura con Projex. | Composición por secciones y animaciones, sin datos remotos | React 19 · Tailwind v4 · Framer Motion |
| [`06-layout-practice`](01-react/privados/06-layout-practice) | **Layout Practice** — layout CSS aplicado con componentes. Migrado a TypeScript. | Ejercicio de layout: la pieza más simple del conjunto | React 19 · TypeScript · Vite |
| [`07-smart-cooler-ui-versions`](01-react/privados/07-smart-cooler-ui-versions) | Archivo histórico: cinco versiones de Smart Cooler, cada una con su README explicando qué demuestra. | — (no es un proyecto: va al final por eso) | — |

## `02-next/`

Mismo criterio que `01-react/`. Hoy **ninguno de los dos está en la API**, así que ninguno
cumple las dos condiciones y no hay carpeta `portfolio/` aquí: se creará cuando haya un
proyecto Next que la merezca y esté publicado.

### `privados/`

| Carpeta | Qué es | Qué lo hace difícil | Stack |
|---|---|---|---|
| [`01-falabella-clone`](02-next/privados/01-falabella-clone) | **Clon de Falabella.com** *(ejercicio académico)* — catálogo con categorías, destacados, rutas dinámicas y *API routes*. Desplegado en Vercel: [demo](https://proyecto-next-2.vercel.app/), pero fuera de la API. | App Router completo: rutas dinámicas, layouts anidados y *API routes* propias | Next.js 16 · Tailwind v4 |
| [`02-next-fundamentals`](02-next/privados/02-next-fundamentals) | Práctica de fundamentos de Next.js (rutas, layouts, componentes de servidor). | Primeros pasos del App Router, sin datos ni rutas dinámicas | Next.js · Tailwind |

## Qué debe traer cada proyecto

Un README propio que responda, en este orden:

- **objetivo** — qué problema resuelve o qué se practica
- **alcance** — qué entra y qué queda fuera
- **stack** — con versiones
- **decisiones técnicas** — las que costaron, con su porqué
- **pasos de ejecución** — `pnpm install` y los scripts disponibles

Todos usan **pnpm**. Cada carpeta es un proyecto independiente con su propio
`package.json`.
