# Nicolás Villagrán — Frontend Developer

**Santiago, Chile** · React · TypeScript · Next.js · Abierto a oportunidades

**[nico-villagran.com](https://nico-villagran.com)** · [LinkedIn](https://www.linkedin.com/in/nico-villagran/) · [nicovillagranroses@gmail.com](mailto:nicovillagranroses@gmail.com) · [Mis APIs](https://github.com/nicovillagranr/APIs)

> Este repositorio es mi **diario de aprendizaje**: once módulos, de HTML semántico a Docker,
> con la práctica y las decisiones técnicas documentadas por escrito.
> **Si vienes a evaluar mi trabajo, empieza por los proyectos de aquí abajo** — el resto del
> repositorio es el camino, no el destino.

---

## El portfolio

**[nico-villagran.com](https://nico-villagran.com)** · React 19 · Tailwind v4 · Vitest · [Código](08-projects/00-hosting)

Una SPA que **consume mi propia API REST** ([`/projects`](https://00-portfolio-projects-api.vercel.app/projects) y [`/profile`](https://00-portfolio-projects-api.vercel.app/profile), desplegada en Vercel) y presenta el perfil y un catálogo filtrable, con un Hero interactivo en forma de editor de código.

La decisión técnica de la que estoy más contento: los datos se piden a la API en runtime, pero en *build time* se genera un **snapshot de respaldo**, así que si la API no responde el sitio se pinta igualmente con el último estado conocido en lugar de quedarse en blanco. Con tests de la capa de datos y de la tarjeta de proyecto (Vitest + Testing Library).

## Proyectos destacados

| | Proyecto | Qué demuestra | Stack | |
|---|---|---|---|---|
| <img src="https://00-portfolio-projects-api.vercel.app/images/proyecto-6.webp" width="150"> | **Falabella.com** | Rutas dinámicas y *API routes* en Next.js sobre un catálogo con categorías y destacados. | Next.js 16 · Tailwind v4 | **[Demo](https://proyecto-next-2.vercel.app/)** · [Código](08-projects/02-next/proyecto-2) |
| <img src="https://00-portfolio-projects-api.vercel.app/images/proyecto-5.webp" width="150"> | **Smart Cooler UI** | Dashboard de producto con datos meteorológicos **en tiempo real** (Open-Meteo), inventario y lista de compras. Con tests. | React 19 · Tailwind v4 | [Código](08-projects/01-react/proyecto-8) |
| <img src="https://00-portfolio-projects-api.vercel.app/images/proyecto-3.webp" width="150"> | **ShopReact** | E-commerce que consume **mi propia Products API**, con catálogo filtrable por categoría. | React 19 · Tailwind v4 · React Router | [Código](08-projects/01-react/proyecto-6) |
| <img src="https://00-portfolio-projects-api.vercel.app/images/proyecto-4.webp" width="150"> | **Sport Mindset** | E-commerce sobre **Supabase** con 303 productos reales, no de relleno. *En desarrollo.* | React 19 · Tailwind v4 · Supabase | [Código](08-projects/01-react/proyecto-7) |

Hay más proyectos en [`08-projects/`](08-projects) — landings, práctica de layout y versiones iterativas. Los cuatro de arriba son los que mejor representan lo que sé hacer hoy.

## APIs propias

Las construí para no depender de datos de terceros en mis propios proyectos. Node.js + json-server, desplegadas en Vercel con CORS abierto.

| API | Qué sirve | |
|---|---|---|
| **Portfolio Projects API** | Los proyectos y el perfil que consume el portfolio. | [Ver JSON](https://00-portfolio-projects-api.vercel.app/) · [Código](https://github.com/nicovillagranr/APIs/tree/main/00-portfolio-projects) |
| **Products API** | 50 productos de moda con categoría, tipo, imagen y precio. | [Ver JSON](https://01-products-api.vercel.app/) · [Código](https://github.com/nicovillagranr/APIs/tree/main/01-products-api) |

---

## Sobre este repositorio / About this repository

This repository tracks my frontend learning path with a practical and progressive structure.
The goal is to build strong fundamentals, document technical decisions, and evolve projects
into portfolio-ready work for a first frontend developer role.

Este repositorio documenta mi camino de aprendizaje en frontend con una estructura práctica y progresiva.
El objetivo es construir fundamentos sólidos, documentar decisiones técnicas y convertir proyectos
en piezas listas para un portfolio profesional.

Dos ejemplos de lo que hay dentro, por si el recorrido dice más que el resultado:

- [`05-typescript/`](05-typescript) — entrenamiento propio de TypeScript: **90 ejercicios con sus tests** (Vitest), con `strict`, `noUncheckedIndexedAccess` y `exactOptionalPropertyTypes` activados. Si al correr la suite ves algún test en rojo, es el ejercicio en curso: los *starters* se dejan fallando a propósito.
- [`00-docs/`](00-docs) — convenciones de nombres, política de ubicación de proyectos y decisiones técnicas escritas antes de aplicarlas.

## Quick Navigation / Navegación rápida

- Main documentation index / Índice principal de documentación: `00-docs/README.md`
- Repository overview / Vista general del repo: `00-docs/00-overview/readme.md`
- Quick return guide / Guía de retoma rápida: `00-docs/00-overview/retoma-rapida.md`
- Naming rules / Convenciones de nombres: `00-docs/00-overview/naming-conventions.md`
- Projects location policy / Política de ubicación de proyectos: `00-docs/00-overview/projects-location-policy.md`
- Session memory log / Registro de sesiones: `00-docs/00-overview/session-log.md`

## Repository Structure / Estructura del repositorio

- `00-docs/`: Core docs, standards, and decisions / Documentación central, estándares y decisiones.
- `01-git/`: Git and GitHub / Git y GitHub.
- `02-html/`: Semantic HTML and accessibility / HTML semántico y accesibilidad.
- `03-css/`: Architecture, layouts, and frameworks / Arquitectura, layouts y frameworks.
- `04-javascript/`: Fundamentals, DOM, OOP, async, and libraries / Fundamentos, DOM, POO, async y librerías.
- `05-typescript/`: TypeScript learning path / Ruta de aprendizaje de TypeScript.
- `06-react/`: React learning path and projects / Ruta de aprendizaje y proyectos con React.
- `07-nextjs/`: Next.js learning path and projects / Ruta de aprendizaje y proyectos con Next.js.
- `08-projects/`: Applied projects / Proyectos aplicados.
- `09-docker/`: Docker guides and material / Guías y material de Docker.
- `10-claudeCode/`: Claude Code notes and experiments / Notas y experimentos con Claude Code.
- `scripts/`: Utility scripts for repo maintenance / Scripts de utilidad para mantenimiento del repo.

## Working Rules / Reglas de trabajo

- Semantic HTML and accessibility first / HTML semántico y accesibilidad primero.
- Progressive complexity over one-shot complexity / Complejidad progresiva en vez de complejidad de golpe.
- Keep decisions documented / Mantener las decisiones documentadas.
- Prioritize readability and maintainability / Priorizar legibilidad y mantenibilidad.

## Local Run / Ejecución local

This repo contains multiple independent projects.
Each one has its own `package.json` and declares `"packageManager": "pnpm@10.18.1"`.
**All projects use pnpm**, not npm.

Este repositorio contiene múltiples proyectos independientes.
Cada uno tiene su propio `package.json` y declara `"packageManager": "pnpm@10.18.1"`.
**Todos los proyectos usan pnpm**, no npm.

1. Open a project folder / Abrí la carpeta de un proyecto.
2. Install dependencies / Instalá dependencias: `pnpm install`
3. Run scripts / Ejecutá scripts: `pnpm dev`, `pnpm lint`, `pnpm build`

## Repo Health Check / Chequeo de salud del repo

```powershell
powershell -ExecutionPolicy Bypass -File scripts/repo-health.ps1
```
