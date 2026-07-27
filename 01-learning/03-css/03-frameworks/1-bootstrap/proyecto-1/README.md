# Norvell · Estudio Frontend

Landing **100 % Bootstrap** construida como evidencia de dominio del framework dentro del repo `03-css`.

## Stack

- Bootstrap 5.3.3 (CSS + JS bundle)
- Sass para overrides de variables nativas (tema custom)
- Vite 5 como dev server + bundler
- HTML semántico, sin React ni librerías UI extra

## Cómo correr

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Decisiones de tema

- `$primary` = `#2D5BFF` (azul agencia, en lugar del `#0d6efd` por defecto).
- `$border-radius` subido a `0.75rem` para una estética más actual.
- Tipografía: Inter (Google Fonts).
- Overrides definidos en `src/scss/_variables.scss` **antes** del `@import "bootstrap/scss/bootstrap"` para que se propaguen a todos los componentes.

## Componentes Bootstrap usados

| Sección       | Componentes / utilities                              |
|---------------|------------------------------------------------------|
| Navbar        | `navbar-expand-lg`, `collapse`, scrollspy            |
| Hero          | grid `col-lg-6`, utilities de spacing/flex           |
| Services      | `card`, `row-cols-md-2 row-cols-lg-4`                |
| Portfolio     | `card`, `modal` (un modal compartido)                |
| Process       | flex utilities + pseudo-elemento custom              |
| Pricing       | `card`, `border-primary`, `badge`                    |
| Testimonials  | `carousel` con `data-bs-ride`                        |
| FAQ           | `accordion accordion-flush`                          |
| Contact       | `form` + `needs-validation`, `toast` de confirmación |
| Footer        | grid responsive 12 columnas                          |

## Estructura

```
project/
├── index.html
├── package.json
├── vite.config.js
├── public/favicon.svg
└── src/
    ├── main.js
    └── scss/
        ├── main.scss        # entry
        ├── _variables.scss  # overrides
        └── _custom.scss     # ajustes finos
```
