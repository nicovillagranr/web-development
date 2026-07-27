# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
pnpm dev         # Inicia el servidor de desarrollo de Vite
pnpm build       # Comprueba tipos (tsc -b) y genera la build de producción
pnpm preview     # Previsualiza la build de producción localmente
pnpm lint        # Ejecuta ESLint, que lo que hace es buscar errores en tu código y mostrarlos en la consola
pnpm typecheck   # Solo comprueba tipos, sin generar build
```

No hay test runner configurado.

**Importante sobre el typecheck:** usa `tsc -b` (modo build, por las referencias de
proyecto), NO `tsc --noEmit` a secas — este último no comprueba nada aquí y
devuelve código 0 aunque haya errores.

## Arquitectura

Landing page de una sola página con React 19 + Vite 7 ("Glossy Touch") — sin librería de routing ni de estado.

**Lenguaje: TypeScript.** Migrado desde JSX en julio de 2026. La configuración
(`tsconfig.app.json`) es deliberadamente más estricta que la plantilla por
defecto de Vite: además de `strict`, activa `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature` y
`verbatimModuleSyntax` (este último obliga a importar tipos con `import type`).
Es el mismo `tsconfig` que el proyecto de entrenamiento `05-typescript`.

**Árbol de componentes:**

```
App
├── TitleWatcher   # Componente utilitario (no renderiza nada) — cambia el título del documento al perder foco en la pestaña
├── Header         # Barra de navegación con glassmorphism
├── Main           # Sección hero + 6 Cards de servicios en grid
└── Footer         # Links + año de copyright dinámico
```

Los componentes están en `src/Components/` con carpetas numeradas (`1-Header/`, `2-Main/`, etc.) que reflejan el orden de renderizado. Cada componente tiene su propio archivo `.css` co-ubicado.

**Estilos:** CSS vanilla puro — sin Tailwind, sin CSS modules (las clases son globales). Estilos globales en `src/assets/styles/App.css`; reset en `src/assets/styles/reset.css`. Tipografía: Baloo 2, cargada desde `src/assets/fonts/Baloo_2/` con `font-display: swap`.

**Breakpoints responsivos:** 1024px (tablet), 768px, 426px (móvil).

**Lenguaje visual:** Glassmorphism — fondos semi-transparentes con `rgba` y `backdrop-filter: blur`.

**Base path de Vite:** `/layout-practice/` — necesario para el despliegue en un subdirectorio.

**Assets:** SVGs en `src/assets/icons/`, imágenes WebP en `src/assets/images/`.
