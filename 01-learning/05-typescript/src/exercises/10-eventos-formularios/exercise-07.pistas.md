# Pistas — exercise-07 · target y currentTarget

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `BotonAvisaSuId`

<details><summary>Pista 1 — conceptual</summary>

El botón no lleva nada dentro, así que hoy las dos señas apuntan al mismo elemento y
en pantalla no se distingue. La pregunta no es cuál funciona, es cuál **dice** lo que
quieres decir: ¿el sitio donde aterrizó el dedo, o el elemento que lleva el manejador?
</details>

<details><summary>Pista 2 — más concreta</summary>

Quieres el id **del botón que lleva el `onClick`**, hoy y el día que le metan algo
dentro. Esa es una de las dos señas, y no es la que hay escrita.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'id' does not exist on type 'EventTarget'.
```

Te está diciendo el tipo entero de `target`: `EventTarget` pelado. No es que le falte
`id` por casualidad — es que no tiene nada, solo sabe recibir eventos.
</details>

<details><summary>Solución</summary>

```tsx
<button id="guardar" onClick={(e) => avisar(e.currentTarget.id)}>Guardar</button>
```
</details>

---

## Drill 2 — `BotonConIcono`

<details><summary>Pista 1 — conceptual</summary>

Es el starter del drill 1 sin tocar, y ahora el test sí lo caza. Piensa dónde aterriza
el dedo cuando alguien pulsa justo encima del icono.
</details>

<details><summary>Pista 2 — más concreta</summary>

El `<span>` es el elemento más profundo bajo el puntero, así que el click es SUYO — y
un `<span>` sin id devuelve cadena vacía. Tú quieres el elemento donde vive el
manejador, pulse el dedo donde pulse.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'id' does not exist on type 'EventTarget'.
```

El mismo mensaje que en el drill 1, y ese es el detalle importante: **el compilador
no distingue los dos casos, el test sí.** Para `tsc` los dos starters están igual de
mal; en pantalla, uno funcionaba y el otro no.
</details>

<details><summary>Solución</summary>

```tsx
<button id="borrar" onClick={(e) => avisar(e.currentTarget.id)}>
  <span>🗑</span> Borrar
</button>
```
</details>

---

## Drill 3 — `ListaDeTareas`

<details><summary>Pista 1 — conceptual</summary>

`currentTarget` es **siempre** el elemento que lleva el manejador. Si el manejador
está en la `<ul>`, no hay nada que puedas escribir dentro de esa línea que te
devuelva un `<li>`. Mira dónde está enganchado el `onClick`.
</details>

<details><summary>Pista 2 — más concreta</summary>

Salidas hay dos: leer la otra seña, o mover el manejador. La primera se te cierra
sola —`target` es `EventTarget` y no tiene `id`, y aquí no se puede usar `as`—, así
que queda la segunda. Un manejador puede repetirse en varios elementos.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `e.currentTarget.id` es una línea perfectamente
correcta: la `<ul>` tiene `id` como cualquier elemento, y typecheck no tiene forma de
saber que el id que querías era el de otro. Solo el test lo caza.
</details>

<details><summary>Solución</summary>

```tsx
<ul id="lista">
  <li id="uno" onClick={(e) => avisar(e.currentTarget.id)}>Uno</li>
  <li id="dos" onClick={(e) => avisar(e.currentTarget.id)}>Dos</li>
</ul>
```

Con el manejador en cada `<li>`, `currentTarget` ya es el `<li>` pulsado. La avería
no estaba en la línea: estaba en el elemento que la llevaba.
</details>

---

## Drill 4 — `BotonAvisaSuValor`

<details><summary>Pista 1 — conceptual</summary>

`currentTarget` no viene tipado por magia: viene tipado con **lo que tú escribiste
entre `<>`**. Si ahí pones algo genérico, lo que te llega es genérico.
</details>

<details><summary>Pista 2 — más concreta</summary>

`HTMLElement` es el ancestro común de todos los elementos: trae lo que tienen TODOS
(`id`, `className`, `textContent`). `value` no lo tienen todos — lo tienen los que
son campos, y el `<button>` es uno de ellos.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'value' does not exist on type 'EventTarget & HTMLElement'.
```

Fíjate en que aquí SÍ aparece el `&` con tu elemento: `currentTarget` está haciendo
su trabajo. El problema no es la seña, es cuál elemento le diste.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.currentTarget.value)
```
</details>

---

## Drill 5 — `CampoAvisaLoEscrito`

<details><summary>Pista 1 — conceptual</summary>

La anotación tiene dos piezas: `TipoDeEvento<Elemento>`. El elemento está bien
elegido. Mira el hueco donde enganchas el manejador y pregúntate qué clase de evento
entrega ese hueco.
</details>

<details><summary>Pista 2 — más concreta</summary>

`onChange` no entrega un evento de ratón: entrega el de "aquí ha cambiado algo", que
es el que usaste durante todo el 06. Hay que importarlo — la línea de importar está
arriba del archivo y admite más de un nombre.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(e: MouseEvent<HTMLInputElement>) => void' is not assignable to type
'ChangeEventHandler<HTMLInputElement, HTMLInputElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLInputElement, HTMLInputElement>' is missing the following
    properties from type 'MouseEvent<HTMLInputElement, MouseEvent>': altKey, button,
    buttons, clientX, and 14 more.
```

Léelo de abajo arriba: tu anotación promete un evento con `clientX`, `button` y 16
cosas más de ratón; el que va a llegar no las tiene. **No es que sobre nada: es que
prometiste de más.**
</details>

<details><summary>Solución</summary>

```tsx
import type { ChangeEvent, MouseEvent } from 'react'

const manejar = (e: ChangeEvent<HTMLInputElement>) => avisar(e.currentTarget.value)
```

`e.target.value` también vale aquí, y solo aquí: `ChangeEvent` es el tipo que trae
`target` con tu elemento dentro. `currentTarget` funciona en los dos.
</details>

---

## Drill 6 — `TarjetaQueIgnoraElBoton`

<details><summary>Pista 1 — conceptual</summary>

El manejador salta las dos veces, y eso no lo vas a evitar: el click del botón sube
por la tarjeta de camino arriba. Lo que cambia de un caso al otro no es el manejador
— es de dónde viene el evento que le llega.
</details>

<details><summary>Pista 2 — más concreta</summary>

Cuando se pulsa la tarjeta, las dos señas son el mismo elemento. Cuando se pulsa el
botón de dentro, no. Eso es una condición, y no necesitas leerle ninguna propiedad a
ninguna de las dos para escribirla.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `avisar('tarjeta')` es una llamada válida y el
starter no miente en ningún tipo: typecheck no puede saber en qué casos querías
llamarla. Es el mismo silencio del drill 3, y por el mismo motivo.
</details>

<details><summary>Solución</summary>

```tsx
<article onClick={(e) => { if (e.target === e.currentTarget) avisar('tarjeta') }}>
  Tarjeta
  <button>Borrar</button>
</article>
```

Comparar las dos señas es el uso típico de `target` en código real: no le lees nada,
solo preguntas si el evento nació donde está tu manejador o más adentro.
</details>
