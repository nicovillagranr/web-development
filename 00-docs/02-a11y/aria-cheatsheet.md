# ARIA Cheat-Sheet

Tabla rápida de los atributos ARIA que más usas. Si no aparece acá, probablemente no lo necesitas — antes de inventar un `role`, intenta resolverlo con HTML semántico.

## Etiquetado (cómo se llama el elemento)

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `aria-label="texto"` | Control sin texto visible (botón solo con ícono). | `<button aria-label="Cerrar">×</button>` | "Cerrar, botón" |
| `aria-labelledby="id"` | El nombre del control ya está en otro elemento del DOM. | `<h2 id="t">Filtros</h2><section aria-labelledby="t">…</section>` | "Filtros, región" |
| `aria-describedby="id"` | Texto extra de ayuda/descripción (no reemplaza el label). | `<input aria-describedby="hint"><span id="hint">Mínimo 8 caracteres</span>` | "[label], edición. Mínimo 8 caracteres" |

## Estado de toggle / selección

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `aria-pressed={bool}` | Botón con dos estados (toggle, filtros, like, mute). | `<button aria-pressed={isActive}>React</button>` | "React, botón alternable, presionado" |
| `aria-selected={bool}` | Item seleccionado dentro de `role="tab"`, `listbox`, `option`. | `<button role="tab" aria-selected={true}>Tab 1</button>` | "Tab 1, pestaña, seleccionada" |
| `aria-current="page"` | Link activo en navegación (también: `step`, `location`, `true`). | `<a href="/" aria-current="page">Inicio</a>` | "Inicio, página actual, enlace" |
| `aria-checked={bool}` | Checkbox/radio custom (con `role="checkbox"` o `radio"`). Si usas `<input type="checkbox">` nativo NO hace falta. | `<div role="checkbox" aria-checked={done}>` | "Marcado / no marcado" |

## Expandir / contraer

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `aria-expanded={bool}` | Botón que abre/cierra algo (acordeón, dropdown, menú, sidebar). | `<button aria-expanded={open} aria-controls="menu">Menu</button>` | "Menu, botón, contraído / expandido" |
| `aria-controls="id"` | Acompaña a `aria-expanded`: id del elemento que se abre. | (ver arriba) | — |
| `aria-haspopup="menu"` | Botón que abre un menú/listbox/dialog/tree/grid. | `<button aria-haspopup="menu">Acciones</button>` | "Acciones, botón, tiene menú emergente" |

## Visibilidad / decoración

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `aria-hidden="true"` | Ícono decorativo cuyo significado ya está en texto al lado. | `<svg aria-hidden="true">…</svg> Guardar` | (lo ignora — solo lee "Guardar") |
| `alt=""` | Imagen decorativa (`<img>`). Vacío ≠ omitido — si omites el alt el lector lee la URL. | `<img src="hero.webp" alt="">` | (lo ignora) |
| `role="presentation"` | Quita semántica de un elemento (raro — preferir HTML correcto). | `<table role="presentation">` para tablas-layout | — |

## Mensajes dinámicos (live regions)

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `aria-live="polite"` | Notificaciones no urgentes (toast "Guardado", contador de items). Espera a que termine lo actual. | `<div aria-live="polite">{message}</div>` | Lee el cambio cuando puede |
| `aria-live="assertive"` | Errores críticos, alertas que interrumpen. Úsalo poco. | `<div aria-live="assertive">Sin conexión</div>` | Interrumpe y lee inmediato |
| `role="status"` | Atajo para `aria-live="polite"` + semántica. | `<div role="status">Cargando…</div>` | "Cargando" |
| `role="alert"` | Atajo para `aria-live="assertive"`. | `<div role="alert">Error al enviar</div>` | "Alerta: error al enviar" |

## Formularios

| Atributo | Cuándo usarlo | Ejemplo | Qué anuncia el lector |
|---|---|---|---|
| `<label for="id">` | **Siempre** asociar label a input. No es ARIA pero es prerequisito. | `<label for="email">Email</label><input id="email">` | "Email, edición" |
| `aria-invalid={bool}` | Input con error de validación. | `<input aria-invalid={hasError} aria-describedby="err">` | "Email, edición, inválido" |
| `aria-required={bool}` | Solo si NO usas `required` nativo. | `<input required>` ya basta — no agregues ARIA. | "Email, edición, requerido" |
| `aria-describedby="err"` | Linkea el input con el mensaje de error. | (ver `aria-invalid`) | Lee el error tras el label |

## Navegación / landmarks

Usa **HTML5 semántico** — los landmarks vienen gratis:

| HTML | Equivalente ARIA (no lo uses si tienes el HTML) |
|---|---|
| `<header>` | `role="banner"` |
| `<nav>` | `role="navigation"` |
| `<main>` | `role="main"` |
| `<aside>` | `role="complementary"` |
| `<footer>` | `role="contentinfo"` |
| `<section aria-labelledby="…">` | `role="region"` |

## Errores comunes

- **Doble label**: poner `aria-label="Guardar"` en `<button>Guardar</button>` → el lector dice "Guardar" (ignora el visible). Si cambias el texto visible, olvidas actualizar el label.
- **`aria-hidden` en algo focusable**: si el ícono está dentro de un `<button>` con texto, OK; pero NO pongas `aria-hidden` en el botón mismo, lo sacas del árbol accesible.
- **`role="button"` en un `<div>`**: además del role debes manejar `keydown` (Enter/Space) y `tabindex="0"`. Mejor usa `<button>` y listo.
- **`onClick` en `<div>`**: invisible para teclado y lector. Usa `<button>`.
- **Placeholder como label**: el placeholder desaparece al escribir y muchos lectores lo ignoran. Siempre `<label>` real.
- **`tabindex` positivo (`tabindex="3"`)**: rompe el orden natural. Usa solo `0` (incluir en orden) o `-1` (focusable solo programático).

## Referencias externas

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) — patrones canónicos.
- [MDN ARIA reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes).
- [a11yproject.com checklist](https://www.a11yproject.com/checklist/).
