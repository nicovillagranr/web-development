# 1 - Bootstrap

Sección dedicada a Bootstrap 5.3 dentro del repo de CSS. Incluye un proyecto completo
y snippets de evidencia.

## Proyecto completo

[`proyecto-1/`](./proyecto-1) — **Norvell · Estudio Frontend**

Landing multi-sección construida 100 % con Bootstrap + Sass + Vite. Tema custom mediante
overrides de variables Sass nativas (no CSS encima). Cubre navbar con scrollspy, hero,
cards de servicios, portfolio con modal, timeline de proceso, pricing destacado,
carousel de testimonios, accordion FAQ, formulario con validación nativa y toast de confirmación.

```bash
cd proyecto-1
npm install
npm run dev
```

## Snippets de evidencia

[`examples/`](./examples)

- `01-grid-layout.html` — sistema de grid y breakpoints
- `02-components-ui.html` — navbar, alert, card y utilities

## Competencias demostradas

- Grid system (`container`, `row`, `col-*`)
- Breakpoints responsivos (`sm`, `md`, `lg`, `xl`)
- Utility classes (spacing, display, flex, text)
- Componentes JS del bundle: `collapse`, `scrollspy`, `modal`, `carousel`, `accordion`, `toast`, `form validation`
- Tema custom vía Sass (overrides de variables nativas)
- Setup de build con Vite

## Cuándo usar Bootstrap

- MVPs rápidos
- Dashboards internos
- Prototipos con tiempo limitado
- Equipos sin sistema de diseño propio

## Cuándo preferir Tailwind

- Sistemas visuales muy custom
- Mayor control del design token
- Composición utilitaria a medida
