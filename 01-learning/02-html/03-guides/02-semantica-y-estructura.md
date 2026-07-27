# Guia 02: Semantica y Estructura

## Objetivo

Construir paginas que expresen significado por su estructura, no por su apariencia.

## Etiquetas clave

- Estructura: `header`, `main`, `section`, `article`, `aside`, `footer`.
- Navegacion: `nav`.
- Contenido textual: `p`, `strong`, `em`, `blockquote`, `cite`.
- Listas: `ul`, `ol`, `li`, `dl`, `dt`, `dd`.
- Datos: `table`, `caption`, `thead`, `tbody`, `th`, `td`.

## Criterio de eleccion semantica

- Usa `section` para agrupar contenido relacionado con un tema.
- Usa `article` para unidades autocontenidas (posts, noticias, cards completas).
- Usa `nav` solo para bloques de navegacion.
- Usa tablas solo para datos tabulares, nunca para layout.

## Jerarquia de contenido

- El `h1` define tema principal.
- Cada `section` relevante deberia tener encabezado.
- Evita saltos arbitrarios de `h2` a `h4`.

## Checklist semantico

- [ ] Existe una estructura global clara (`header/main/footer` cuando aplica).
- [ ] Las listas y tablas representan datos reales de ese tipo.
- [ ] Los enlaces describen destino (evitar "click aqui").
- [ ] La jerarquia de titulos se puede leer como outline.
