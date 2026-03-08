# Guia 04: Accesibilidad Base en HTML

## Objetivo

Garantizar que el contenido sea usable con teclado, lector de pantalla y contexto real.

## Principios minimos

- Semantica correcta primero.
- Texto alternativo util para imagenes.
- Navegacion clara y predecible.
- Formularios etiquetados y comprensibles.

## Reglas de implementacion

- Usa `alt` descriptivo en imagenes con informacion.
- Usa `alt=""` en imagenes decorativas.
- Agrega `aria-label` solo cuando no exista texto visible equivalente.
- Mantiene orden logico de enfoque y lectura.
- No dependas solo de color para comunicar estado.

## Navegacion y landmarks

- `header`, `nav`, `main`, `footer` ayudan a recorrer la pagina.
- Evita multiples `main`.
- En `nav`, especifica `aria-label` cuando hay mas de una navegacion.

## Checklist de accesibilidad

- [ ] La pagina se entiende sin CSS.
- [ ] Todos los controles son alcanzables por teclado.
- [ ] Enlaces y botones tienen texto claro.
- [ ] Imagenes y multimedia tienen alternativa textual adecuada.
- [ ] La estructura semantica coincide con la intencion del contenido.
