# Proyectos

Los proyectos aplicados del repositorio. Los marcados con ✅ son los que están
publicados en el portfolio ([nico-villagran.com](https://nico-villagran.com));
el resto es práctica que no llegó al escaparate.

## El portfolio

**[`00-hosting/`](00-hosting)** — el sitio del portfolio. SPA en React 19 que consume
mi propia API REST y presenta el perfil y un catálogo filtrable de proyectos.
Los datos se piden en runtime, con un snapshot generado en *build time* como
respaldo si la API no responde. Con tests de la capa de datos y de la tarjeta de
proyecto.

## `01-react/`

Dividido en dos carpetas:

- **`portfolio/`** — el escaparate. Lo que enseño cuando alguien viene a evaluar mi trabajo.
- **`privados/`** — el resto: práctica que ya cumplió su función, proyectos sin terminar y archivo histórico.

El ✅ significa **desplegado y accesible** en [nico-villagran.com](https://nico-villagran.com).
Estar en `portfolio/` sin ✅ quiere decir que es un proyecto del escaparate que todavía no se ha
publicado.

### `portfolio/`

| Carpeta | Qué es | Stack | |
|---|---|---|---|
| [`projex`](01-react/portfolio/projex) | **Projex** — landing con animaciones y formulario de contacto real. | React 19 · Tailwind v4 · Framer Motion · React Router · EmailJS | ✅ |
| [`smart-cooler-ui`](01-react/portfolio/smart-cooler-ui) | **Smart Cooler UI** — dashboard de producto con clima en tiempo real, inventario y lista de compras. 40 tests. | React 19 · Tailwind v4 · Vitest | ✅ |
| [`sport-mindset`](01-react/portfolio/sport-mindset) | **Sport Mindset** — e-commerce que consume mi [Products API](https://01-products-api.vercel.app/) por variable de entorno. En desarrollo: la migración a Supabase con catálogo de ciclismo está planificada, no implementada. | React 19 · Tailwind v4 · React Router | |

### `privados/`

| Carpeta | Qué es | Stack |
|---|---|---|
| [`store-pulse`](01-react/privados/store-pulse) | **Store Pulse** — PWA mobile-first de métricas operativas de un local: tres niveles de detalle, objetivos y evolución semanal, sobre datos ficticios. Sin backend todavía. | React 19 · TypeScript · Tailwind v4 · Recharts · Zod · Vitest |
| [`shopreact`](01-react/privados/shopreact) | **ShopReact** — e-commerce que consume mi [Products API](https://01-products-api.vercel.app/) por variable de entorno. Retirado del escaparate: `sport-mindset` parte de este mismo código. | React 19 · Tailwind v4 · React Router |
| [`nexusai`](01-react/privados/nexusai) | **NexusAI** — landing de agencia de IA, estética dark. Comparte arquitectura con Projex. | React 19 · Tailwind v4 · Framer Motion |
| [`mgd-exports`](01-react/privados/mgd-exports) | **MGD Exports** — landing corporativa con arquitectura *feature-first* y alias de importación. | React 19 · Tailwind v4 · EmailJS |
| [`landing-layout-system`](01-react/privados/landing-layout-system) | **Landing Layout System** — secciones reutilizables y arquitectura CSS mantenible. Migrado a TypeScript. | React 19 · TypeScript · Vite |
| [`layout-practice`](01-react/privados/layout-practice) | **Layout Practice** — layout CSS aplicado con componentes. Migrado a TypeScript. | React 19 · TypeScript · Vite |
| [`smart-cooler-ui-versions`](01-react/privados/smart-cooler-ui-versions) | Archivo histórico: cinco versiones de Smart Cooler, cada una con su README explicando qué demuestra. | — |

## `02-next/`

| Carpeta | Qué es | Stack | |
|---|---|---|---|
| [`next-fundamentals`](02-next/next-fundamentals) | Práctica de fundamentos de Next.js (rutas, layouts, componentes de servidor). | Next.js · Tailwind | |
| [`falabella-clone`](02-next/falabella-clone) | **Clon de Falabella.com** — catálogo con categorías, destacados, rutas dinámicas y *API routes*. [Demo](https://proyecto-next-2.vercel.app/). | Next.js 16 · Tailwind v4 | ✅ |

## Qué debe traer cada proyecto

Un README propio que responda, en este orden:

- **objetivo** — qué problema resuelve o qué se practica
- **alcance** — qué entra y qué queda fuera
- **stack** — con versiones
- **decisiones técnicas** — las que costaron, con su porqué
- **pasos de ejecución** — `pnpm install` y los scripts disponibles

Todos usan **pnpm**. Cada carpeta es un proyecto independiente con su propio
`package.json`.
