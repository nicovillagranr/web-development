# Pistas — exercise-06 · el modal que nace abierto: el foco vuelve al morir

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Cuatro starters no compilan (1, 2, 2c y 2d): su Pista 3 cita al compilador. En el 2a, el 2b,
el 2e y del 3 al 6, el typecheck calla, y la Pista 3 trae el dato duro del test.

---

## Drill 1 — `devolverFoco`

<details><summary>Pista 1 — conceptual</summary>

Vuelve a las piezas de la Teoría 1. `elemento` puede ser dos cosas que no sirven para
`focus()`. ¿Cuáles son?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una es `null`, y la otra es un `Element` que no sea HTML. El `?.` solo se ocupa de la primera.
Hace falta una pregunta que descarte las dos a la vez, en un `if`. Sin `as` ni `!`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS18047: 'elemento' is possibly 'null'.
error TS2339: Property 'focus' does not exist on type 'Element'.
```

Y el test, al llamar a `devolverFoco(null)`:

```
TypeError: Cannot read properties of null (reading 'focus')
```

Si pones el `?.`, se van el primero y el `TypeError`. El segundo se queda.

</details>

<details><summary>Solución</summary>

```tsx
export function devolverFoco(elemento: Element | null) {
  if (elemento instanceof HTMLElement) {
    elemento.focus();
  }
}
```

`instanceof HTMLElement` da `false` con `null` y con cualquier elemento que no sea HTML. Dentro
del `if`, TypeScript ya sabe que `elemento` es un `HTMLElement`, y ahí `focus()` existe.

</details>

---

## Drill 2 — `MenuQueSeCierraFuera`

<details><summary>Pista 1 — conceptual</summary>

Mira qué le pasas a `contains` y qué te pide. Pasa el ratón por encima de `contains` y por
encima de `event.target` en Cursor.

</details>

<details><summary>Pista 2 — más concreta</summary>

`contains` pide un `Node`. `event.target` es un `EventTarget`, que puede ser algo que no está en
la página, como `window`. Pregunta con `instanceof` si es un `Node` antes de pasárselo, en el
mismo `if`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'EventTarget | null' is not assignable to parameter of type 'Node | null'.
  Type 'EventTarget' is missing the following properties from type 'Node': baseURI, childNodes, firstChild, isConnected, and 43 more.
```

El test ya pasa: en el navegador, un `mousedown` siempre cae en algo de la página. El que no lo
sabe es TypeScript.

</details>

<details><summary>Solución</summary>

```tsx
if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
  setAbierto(false);
}
```

Después del `&&`, TypeScript ya trata `event.target` como un `Node`, y `contains` lo acepta.
Aquí la clase es `Node` y no `HTMLElement` porque es lo que pide `contains`: con `instanceof`
se pregunta por la clase que necesita la línea de después.

</details>

---

## Peldaño 2a — `estaDentro`

<details><summary>Pista 1 — conceptual</summary>

En `a.contains(b)` hay uno que pregunta y otro por el que se pregunta. Léelo en voz alta como
«¿b está dentro de a?». En el starter, ¿quién hace de caja?

</details>

<details><summary>Pista 2 — más concreta</summary>

El que va antes del punto es el que pregunta («¿esto está dentro de mí?»), y el del paréntesis
es por quien pregunta. En el starter están cambiados de sitio.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected false to be true
```

Es en `estaDentro(caja, boton)`: el starter le pregunta al botón si la caja está dentro de él,
y no lo está. El typecheck calla porque los dos son `Node`, y cualquiera puede preguntar: el
fallo es de orden, no de tipos.

</details>

<details><summary>Solución</summary>

```tsx
export function estaDentro(caja: Node, cosa: Node): boolean {
  return caja.contains(cosa);
}
```

La caja pregunta y `cosa` es por quien se pregunta. Es tu `menuRef.current?.contains(event.target)`
sin el ref ni el evento: `menuRef.current` hace de caja, y `event.target`, de cosa.

</details>

---

## Peldaño 2b — `esDeLaPagina`

<details><summary>Pista 1 — conceptual</summary>

Poder recibir eventos no te hace parte de la página. ¿Qué tienen en común un botón y un texto
que no tengan `window` ni un `EventTarget` suelto?

</details>

<details><summary>Pista 2 — más concreta</summary>

Los dos primeros son `Node`: están colgados del árbol del documento. La Teoría 1 ya tiene la
herramienta para preguntar en ejecución «¿esto es de esta clase?».

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected true to be false
```

Es en `esDeLaPagina(window)`: el starter responde que sí, porque `window` también tiene
`addEventListener`. Todo `EventTarget` lo tiene: es justo lo que significa serlo. El typecheck
calla porque la pregunta es válida y devuelve un `boolean`: solo que no es la que toca.

</details>

<details><summary>Solución</summary>

```tsx
export function esDeLaPagina(objetivo: EventTarget): boolean {
  return objetivo instanceof Node;
}
```

`instanceof Node` da `true` con elementos y textos, y `false` con `window` o con un `EventTarget`
suelto: los dos reciben eventos, pero no están en el árbol de la página.

</details>

---

## Peldaño 2c — `clicDentro`

<details><summary>Pista 1 — conceptual</summary>

Junta las dos preguntas de antes, en este orden: primero «¿es de la página?» y, solo si lo es,
«¿está dentro de la caja?».

</details>

<details><summary>Pista 2 — más concreta</summary>

`contains` solo acepta un `Node`, y `objetivo` es un `EventTarget | null`. Pregunta con
`instanceof` antes, en el mismo `return`, con `&&`. Si reutilizas `esDeLaPagina`, TypeScript no
estrecha: devuelve un `boolean`, no un `objetivo is Node` (los type guards del 05/08).

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'EventTarget | null' is not assignable to parameter of type 'Node | null'.
```

Y el test, al pasarle `window`:

```
TypeError: Failed to execute 'contains' on 'Node': parameter 1 is not of type 'Node'.
```

Ese `TypeError` es lo que TypeScript te estaba evitando en el drill 2.

</details>

<details><summary>Solución</summary>

```tsx
export function clicDentro(caja: Node, objetivo: EventTarget | null): boolean {
  return objetivo instanceof Node && caja.contains(objetivo);
}
```

Si `objetivo` no es un `Node` (`null`, `window`…), el `&&` corta y devuelve `false` sin llamar a
`contains`. Si lo es, después del `&&` TypeScript ya lo trata como `Node`, y `contains` lo acepta.

</details>

---

## Peldaño 2d — `dondeCayo`

<details><summary>Pista 1 — conceptual</summary>

TypeScript no ve tu página: el tipo de `event.target` lo saca de cómo está declarado
`MouseEvent`, y esa declaración vale para cualquier `mousedown`, caiga donde caiga.

</details>

<details><summary>Pista 2 — más concreta</summary>

Para un `MouseEvent`, `target` es un `EventTarget | null`, y `nodeName` es de `Node`. Pregunta con
`instanceof` antes de leerlo, y decide qué devolver si no lo es (un ternario o un `if`).

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS18047: 'event.target' is possibly 'null'.
error TS2339: Property 'nodeName' does not exist on type 'EventTarget'.
```

Y el test:

```
AssertionError: expected [ 'BUTTON', undefined ] to deeply equal [ 'BUTTON', 'fuera de la página' ]
```

Con el evento lanzado sobre `window`, el starter devuelve `undefined`: `window` no tiene
`nodeName`.

</details>

<details><summary>Solución</summary>

```tsx
export function dondeCayo(event: MouseEvent): string {
  return event.target instanceof Node ? event.target.nodeName : "fuera de la página";
}
```

`instanceof Node` descarta a la vez el `null` y a `window`. En la rama del sí, TypeScript ya sabe
que `event.target` es un `Node`, y `nodeName` existe.

</details>

---

## Peldaño 2e — `FiltrosQueSeCierranFuera`

<details><summary>Pista 1 — conceptual</summary>

Cuando marcas «React», el clic no cae en el panel: cae en algo que está dentro del panel.

</details>

<details><summary>Pista 2 — más concreta</summary>

`!==` mira si son el mismo objeto, no si uno está dentro del otro. Para «dentro de» está
`contains`, con la pregunta del 2c delante.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an accessible element with the role "group" and name "Filtros del portfolio"
```

Es justo después de marcar «React»: `event.target` era el `<input>` de la casilla, distinto del
`<div>` del panel, así que el starter cerraba. El typecheck calla porque comparar con `!==` un
`EventTarget | null` y un `HTMLDivElement | null` es válido: el fallo es la pregunta, no el tipo.

</details>

<details><summary>Solución</summary>

```tsx
if (abierto && event.target instanceof Node && !panelRef.current?.contains(event.target)) {
  setAbierto(false);
}
```

Es tu drill 2 con otro ref: primero «¿es de la página?», y luego «¿está fuera del panel?».

</details>

---

## Drill 3 — `ContactoConDosEntradas`

<details><summary>Pista 1 — conceptual</summary>

¿Quién se entera de todas las aperturas, sea cual sea el botón? ¿El padre, que solo tiene un
ref a "Ver mapa", o el modal, que nace cada vez que alguien lo abre?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cuando el modal nace, el foco todavía está en el botón que lo abrió. El modal lo anota en su
efecto, antes de llevar el foco a la ✕, y se lo devuelve en la limpieza con `devolverFoco`. Lo
del padre (`verMapaRef` y su `focus()`) sobra.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, abriendo con "Cómo llegar" y cerrando con la ✕:

```
Expected element with focus:
  <button type="button">Cómo llegar</button>
Received element with focus:
  <button type="button">Ver mapa</button>
```

Y la segunda parte del test monta `MapaQueRecuerdaQuienLoAbrio` en otra página, sin tu padre: si la vuelta
la hace el padre, ahí el foco se pierde.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.activeElement;
  cerrarRef.current?.focus();
  return () => devolverFoco(anterior);
}, []);
```

Y en el padre, `cerrar` se queda en `setAbierto(false)` (o una flecha directa), sin `verMapaRef`.
El modal anota quién lo abrió al nacer, sea quien sea, y se lo devuelve al morir.

</details>

---

## Drill 4 — `MapaConMarcapaginas`

<details><summary>Pista 1 — conceptual</summary>

La analogía de la Teoría 2: ¿en qué momento pone este modal el marcapáginas?

</details>

<details><summary>Pista 2 — más concreta</summary>

`document.activeElement` dice quién tiene el foco en el momento en que lo lees. La línea de
antes ya movió el foco. Lee primero, mueve después.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, abriendo con "Cómo llegar" y cerrando con la ✕:

```
Expected element with focus:
  <button type="button">Cómo llegar</button>
Received element with focus:
  <body>
```

La limpieza sí corre, y sí llama a `devolverFoco`. Lo que le pasa es otra cosa.

</details>

<details><summary>Solución</summary>

```tsx
const anterior = document.activeElement;
cerrarRef.current?.focus();
return () => devolverFoco(anterior);
```

En el starter, `anterior` anotaba la ✕, porque el `focus()` de la ida ya se la había dado. Al
morir, la limpieza le devolvía el foco a la ✕, que ya no estaba en la página, y el foco caía en
el `<body>`.

</details>

---

## Drill 5 — `MapaSobreElMenu`

<details><summary>Pista 1 — conceptual</summary>

El foco ya lo anota y lo devuelve bien. ¿Hace lo mismo con el `overflow`?

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter devuelve siempre `""`, el valor de una página sin nada encima. Pero aquí había un
menú que ya lo tenía en `"hidden"`. Anota el `overflow` al nacer, antes de cambiarlo, y devuelve
eso.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, con el menú abierto (`overflow` en `"hidden"`) y el mapa abierto y
cerrado encima:

```
AssertionError: expected '' to be 'hidden'
```

La primera parte del test, sin menú, ya pasa: ahí `""` coincide con lo que había.

</details>

<details><summary>Solución</summary>

```tsx
const overflowAnterior = document.body.style.overflow;
document.body.style.overflow = "hidden";
// … la ida …
return () => {
  document.body.style.overflow = overflowAnterior;
  devolverFoco(anterior);
};
```

Es el mismo marcapáginas que el del foco. Y tiene el mismo orden: si lo anotas después de poner
`"hidden"`, anotas `"hidden"`, y la primera parte del test se pone en rojo.

</details>

---

## Drill 6 — `MapModalDeProjex`

<details><summary>Pista 1 — conceptual</summary>

Tienes todas las piezas: el marcapáginas del foco (3 y 4), el del `overflow` (5) y la vuelta en
la limpieza (3). Lo único nuevo es juntarlas en el efecto que ya tiene el Escape.

</details>

<details><summary>Pista 2 — más concreta</summary>

En el efecto, en orden: anota el `overflow` y quién tiene el foco; pon el `overflow` en
`"hidden"`; registra el listener; lleva el foco a la ✕. En la limpieza: quita el listener,
devuelve el `overflow` y devuelve el foco.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, al abrir con "Ver mapa":

```
Expected element with focus:
  <button aria-label="Cerrar mapa" type="button">×</button>
Received element with focus:
  <button type="button">Ver mapa</button>
```

Falta la ida. Después el test cierra con Escape, con la ✕ y con el fondo, y mira el foco y el
`overflow` cada vez.

</details>

<details><summary>Solución</summary>

Es el efecto de tu `Contact.tsx`, con `devolverFoco` en lugar del `instanceof` suelto:

```tsx
useEffect(() => {
  const previousOverflow = document.body.style.overflow;
  const previousActiveElement = document.activeElement;

  document.body.style.overflow = "hidden";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };

  document.addEventListener("keydown", handleKeyDown);
  closeButtonRef.current?.focus();

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = previousOverflow;
    devolverFoco(previousActiveElement);
  };
}, [onClose]);
```

Tres salidas, una limpieza: la ✕, Escape y el fondo llaman a `onClose`, el padre desmonta el
modal, y al desmontarse corre la limpieza.

**¿Y el fondo?** El test solo comprueba que se cierra y que devuelve el `overflow`. Con un clic
de ratón, el navegador mueve el foco al sitio del clic **después** del `mousedown`. Como el
fondo ya no existe, el foco acaba en el `<body>`, aunque tu limpieza lo haya devuelto un
instante antes. Le pasa también a tu Projex. Con ratón no estorba: la vuelta del foco la
necesita quien usa el teclado, y esa persona cierra con Escape o con la ✕.

</details>
