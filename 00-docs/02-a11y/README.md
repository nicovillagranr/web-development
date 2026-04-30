# 02-a11y — Accesibilidad

Referencia rápida y transversal para todos los proyectos del repo. Consultar **antes** de implementar componentes interactivos (filtros, tabs, modales, formularios, dropdowns).

## Archivos

- [`aria-cheatsheet.md`](./aria-cheatsheet.md) — Tabla de atributos ARIA: cuándo usarlos, ejemplo y qué anuncia el lector de pantalla.

## Por qué existe

Los atributos ARIA son muchos y se olvidan fácil. En vez de buscar en MDN cada vez, mantener acá una hoja única de consulta. Si encuentras un patrón nuevo que ya olvidaste antes → agrégalo.

## Cuándo abrir esta carpeta

- Vas a crear un botón con dos estados (toggle, filtro, like).
- Vas a crear pestañas, acordeones, dropdowns, modales.
- Vas a mostrar mensajes dinámicos (toasts, errores de formulario, "guardado ✓").
- Vas a poner íconos sin texto al lado.
- Antes de marcar un proyecto como "listo para deployar".

## Reglas de oro (TL;DR)

1. **HTML semántico primero**, ARIA solo cuando HTML no alcanza.
2. Si pones `aria-label`, el contenido visible se ignora — no contradigas el texto del botón.
3. `aria-hidden="true"` en íconos decorativos (`<img>`, `<svg>`) que ya tienen texto al lado.
4. Todo control interactivo necesita estado de foco visible (`focus-visible:`).
5. Contraste mínimo WCAG AA: 4.5:1 texto normal, 3:1 texto grande.
