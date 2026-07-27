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

| Carpeta | Qué es | Stack | |
|---|---|---|---|
| [`proyecto-1`](01-react/proyecto-1) | **Layout Practice** — layout CSS aplicado con componentes. Migrado a TypeScript. | React 19 · TypeScript · Vite | |
| [`proyecto-2`](01-react/proyecto-2) | **Landing Layout System** — secciones reutilizables y arquitectura CSS mantenible. Migrado a TypeScript. | React 19 · TypeScript · Vite | |
| [`proyecto-3`](01-react/proyecto-3) | **Projex** — landing con animaciones y formulario de contacto real. | React 19 · Tailwind v4 · Framer Motion · React Router · EmailJS | ✅ |
| [`proyecto-4`](01-react/proyecto-4) | **MGD Exports** — landing corporativa con arquitectura *feature-first* y alias de importación. | React 19 · Tailwind v4 · EmailJS | |
| [`proyecto-5`](01-react/proyecto-5) | **NexusAI** — landing de agencia de IA, estética dark. Comparte arquitectura con Projex. | React 19 · Tailwind v4 · Framer Motion | ✅ |
| [`proyecto-6`](01-react/proyecto-6) | **ShopReact** — e-commerce que consume mi [Products API](https://01-products-api.vercel.app/) por variable de entorno. | React 19 · Tailwind v4 · React Router | ✅ |
| [`proyecto-7`](01-react/proyecto-7) | **Sport Mindset** — e-commerce sobre Supabase con 303 productos reales. En desarrollo. | React 19 · Tailwind v4 · Supabase | ✅ |
| [`proyecto-8`](01-react/proyecto-8) | **Smart Cooler UI** — dashboard de producto con clima en tiempo real, inventario y lista de compras. 40 tests. | React 19 · Tailwind v4 · Vitest | ✅ |
| [`proyecto-8-versions`](01-react/proyecto-8-versions) | Archivo histórico: cinco versiones de Smart Cooler, cada una con su README explicando qué demuestra. | — | |

## `02-next/`

| Carpeta | Qué es | Stack | |
|---|---|---|---|
| [`proyecto-1`](02-next/proyecto-1) | Práctica de fundamentos de Next.js (rutas, layouts, componentes de servidor). | Next.js · Tailwind | |
| [`proyecto-2`](02-next/proyecto-2) | **Clon de Falabella.com** — catálogo con categorías, destacados, rutas dinámicas y *API routes*. [Demo](https://proyecto-next-2.vercel.app/). | Next.js 16 · Tailwind v4 | ✅ |

## Qué debe traer cada proyecto

Un README propio que responda, en este orden:

- **objetivo** — qué problema resuelve o qué se practica
- **alcance** — qué entra y qué queda fuera
- **stack** — con versiones
- **decisiones técnicas** — las que costaron, con su porqué
- **pasos de ejecución** — `pnpm install` y los scripts disponibles

Todos usan **pnpm**. Cada carpeta es un proyecto independiente con su propio
`package.json`.
