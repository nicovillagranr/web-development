# Pistas — exercise-05 · el focus trap: el Tab no sale del modal

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Tres starters no compilan (1, 2 y 3): su Pista 3 cita al compilador. Del 4 al 7, el typecheck
calla, y la Pista 3 dice por qué y trae el dato duro del test.

---

## Drill 1 — `IrAlPanel`

<details><summary>Pista 1 — conceptual</summary>

Vuelve a las piezas de la Teoría 1. La lista que te da `querySelectorAll`, ¿de qué tipo cree
TypeScript que son sus elementos?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sin decirle nada, `querySelectorAll` te da una lista de `Element`, porque el selector podría
encontrar cualquier cosa, también un dibujo SVG. `focus()` es de `HTMLElement`. Dile tú qué hay
en la lista, en el sitio donde la pides. Sin `as`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'focus' does not exist on type 'Element'.
```

En el navegador no pasa nada malo: lo que encuentra ES un elemento HTML, y `focus()` existe.
El que no lo sabe es TypeScript.

</details>

<details><summary>Solución</summary>

```tsx
const lista = panelRef.current.querySelectorAll<HTMLElement>(ENFOCABLES);
lista[0]?.focus();
```

El `<HTMLElement>` es un genérico, como el de `useRef<HTMLDivElement>`: le dice a
`querySelectorAll` qué tipo tienen las piezas de la lista. Con eso, `lista[0]` es
`HTMLElement | undefined`, y el `?.` se ocupa del `undefined`.

</details>

---

## Drill 2 — `PrimerResultado`

<details><summary>Pista 1 — conceptual</summary>

La analogía de la Teoría 1: un vuelo que sale vacío. Sin resultados, ¿quién es "el primero de
la lista"?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con la lista vacía, `lista[0]` no es un botón: es `undefined`, y a `undefined` no se le puede
pedir `focus()`. TypeScript ya te lo estaba diciendo. Protégete del caso vacío en la misma
línea, como haces con `.current`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2532: Object is possibly 'undefined'.
```

Y en el navegador, al pulsar "Ir al primero" sin resultados:

```
TypeError: Cannot read properties of undefined (reading 'focus')
```

Los dos avisan de lo mismo: el compilador antes de ejecutar, el navegador al ejecutar.

</details>

<details><summary>Solución</summary>

```tsx
lista[0]?.focus();
```

Si `lista[0]` es `undefined`, el `?.` corta ahí y `focus()` no se llama. Si es un botón, lo
enfoca. El `!` callaría a TypeScript, pero sin resultados rompería igual.

</details>

---

## Drill 3 — `UltimoResultado`

<details><summary>Pista 1 — conceptual</summary>

Tú sabes que, si la lista no está vacía, el último existe. ¿Lo sabe TypeScript? ¿Qué mira él
para decidir si `ultimo` puede ser `undefined`?

</details>

<details><summary>Pista 2 — más concreta</summary>

TypeScript no relaciona `lista.length` con las casillas de la lista: para él, `lista[lo que
sea]` siempre puede ser `undefined`, hayas mirado lo que hayas mirado antes. Lo que sí entiende
es una comprobación sobre `ultimo` mismo.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS18048: 'ultimo' is possibly 'undefined'.
```

Este es el mismo error que tiene tu `Contact.tsx` tres veces, con `firstElement` y
`lastElement`. Allí también hay un `focusableElements.length === 0` justo encima.

</details>

<details><summary>Solución</summary>

```tsx
const ultimo = lista[lista.length - 1];
if (!ultimo) return;
ultimo.focus();
```

Al comprobar `ultimo` directamente, TypeScript sabe que debajo del `if` ya no es `undefined`.
Con eso, la línea del `lista.length === 0` sobra: si la lista está vacía, `ultimo` es
`undefined` y el `if` corta igual. (También vale `ultimo?.focus()`.)

</details>

---

## Drill 4 — `MapaConVuelta`

<details><summary>Pista 1 — conceptual</summary>

Relee la definición de la Teoría 2. ¿Quién mueve el foco con el Tab, y cuándo lo hace: antes o
después de tu manejador?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tu `focus()` lleva el foco al enlace. Después, el navegador hace con el Tab lo de siempre:
mover el foco al siguiente. Si no quieres ese movimiento, tienes que cancelarlo en ese mismo
manejador, en el borde.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla: el código es correcto en tipos, lo que falla es el orden. El test:

```
Expected element with focus:
  <a href="#mapa">Ver en Google Maps</a>
Received element with focus:
  <body>
```

En el test, el Tab acaba fuera del panel. En Chrome acaba en "Copiar dirección": tu `focus()`
lo llevó al enlace, y el navegador lo movió uno más desde ahí.

</details>

<details><summary>Solución</summary>

```tsx
if (document.activeElement === ultimo) {
  event.preventDefault();
  primero.focus();
}
```

`preventDefault()` le dice al navegador que no haga su movimiento con este Tab. Así, el único
que mueve el foco es tu `focus()`.

</details>

---

## Drill 5 — `MapaEnLosDosSentidos`

<details><summary>Pista 1 — conceptual</summary>

La trampa de la Teoría 2. Shift+Tab en la ✕: ¿qué ve tu `if`? ¿Distingue un sentido del otro?

</details>

<details><summary>Pista 2 — más concreta</summary>

Hacen falta dos bordes, y cada uno solo en su sentido: Tab en el último, y Shift+Tab en el
primero. `event.shiftKey` te dice en qué sentido va el Tab. El borde que ya tienes tiene que
mirarlo también.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, con el foco en el enlace y Shift+Tab:

```
Expected element with focus:
  <button aria-label="Cerrar mapa">✕</button>
Received element with focus:
  <input aria-label="Campo de fuera" />
```

Se escapa hacia atrás. Y con el foco en la ✕, Shift+Tab salta al enlace, porque para tu `if` es
un Tab en el último.

</details>

<details><summary>Solución</summary>

```tsx
if (!event.shiftKey && document.activeElement === ultimo) {
  event.preventDefault();
  primero.focus();
} else if (event.shiftKey && document.activeElement === primero) {
  event.preventDefault();
  ultimo.focus();
}
```

Cada borde mira la tecla, el sentido y quién tiene el foco. En cualquier otro caso, el `if` no
entra y el navegador mueve el foco normal.

</details>

---

## Drill 6 — `MapaSinAtascos`

<details><summary>Pista 1 — conceptual</summary>

Con el foco en "Ver en Google Maps" y un Tab: ¿entra en alguno de los dos bordes? Entonces,
¿quién mueve el foco?

</details>

<details><summary>Pista 2 — más concreta</summary>

En medio no entra en ningún borde, así que tu código no mueve el foco. Pero el navegador
tampoco, porque el `preventDefault()` de arriba ya lo canceló. El `preventDefault()` va solo
donde tú mueves el foco.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, con el foco en el enlace y un Tab:

```
Expected element with focus:
  <button>Copiar dirección</button>
Received element with focus:
  <a href="#mapa">Ver en Google Maps</a>
```

No se ha movido.

</details>

<details><summary>Solución</summary>

El `preventDefault()` de arriba, borrado, y uno dentro de cada borde:

```tsx
if (!event.shiftKey && document.activeElement === ultimo) {
  event.preventDefault();
  primero.focus();
} else if (event.shiftKey && document.activeElement === primero) {
  event.preventDefault();
  ultimo.focus();
}
```

Repetir el `preventDefault()` no es descuido: cancela el Tab solo cuando hay alguien que mueve
el foco en su lugar.

</details>

---

## Drill 7 — `MapaDeProjex`

<details><summary>Pista 1 — conceptual</summary>

Tienes todas las piezas: la lista y sus dos extremos comprobados (1 a 3), los dos bordes con su
sentido (4 y 5), y el `preventDefault()` solo en los bordes (6). Lo único nuevo es el foco
que anda fuera del modal.

</details>

<details><summary>Pista 2 — más concreta</summary>

En orden, dentro del manejador: si no es Tab, fuera. Saca la lista del modal, el primero y el
último, y comprueba que existen. Si el foco no está dentro del modal (`contains`), cancela y
llévalo al primero. Si no, los dos bordes del drill 5.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla mientras no indexes la lista. En cuanto la indexas, te esperan los mismos
`TS18048` de tu `Contact.tsx` si no compruebas el primero y el último. El test, con el foco en
el último y un Tab:

```
Expected element with focus:
  <button aria-label="Cerrar mapa">×</button>
Received element with focus:
  <body>
```

</details>

<details><summary>Solución</summary>

Es la trampa de tu `Contact.tsx`, con la comprobación que le faltaba:

```tsx
if (event.key !== "Tab" || !modalRef.current) {
  return;
}

const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(ENFOCABLES);
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

if (!firstElement || !lastElement) {
  event.preventDefault();
  return;
}

const activeElement = document.activeElement;

if (!modalRef.current.contains(activeElement)) {
  event.preventDefault();
  firstElement.focus();
  return;
}

if (event.shiftKey && activeElement === firstElement) {
  event.preventDefault();
  lastElement.focus();
} else if (!event.shiftKey && activeElement === lastElement) {
  event.preventDefault();
  firstElement.focus();
}
```

El `if (!firstElement || !lastElement)` sustituye al `focusableElements.length === 0` de tu
Projex y, además, le quita a TypeScript la duda. Llevar esto a tu `Contact.tsx` le quita a
Projex sus tres `TS18048`.

</details>
