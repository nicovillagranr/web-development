# Pistas — exercise-10 · repaso de la carpeta 12

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Diez salen rojos en el test. El 7 y el 10 pasan el test con el fallo dentro: los marca
`pnpm typecheck`. Además, el lint avisa en el 1 y da error en el 9.

---

## Drill 1 — `TituloDelMapa`

<details><summary>Pista 1 — conceptual</summary>

El título se pone bien la primera vez. Lo que no pasa es que se vuelva a poner. ¿Qué
decide cuándo vuelve a correr un efecto?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con `[]`, el efecto corre solo al nacer. Para que vuelva a correr cada vez que cambia el
zoom, el array tiene que decir que el efecto depende de él.

</details>

<details><summary>Pista 3 — lo que dicen el test y el lint</summary>

```
AssertionError: expected 'Mapa · zoom 1' to be 'Mapa · zoom 2' // Object.is equality
```

```
React Hook useEffect has a missing dependency: 'zoom'. Either include it or remove the dependency array
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.title;
  document.title = `Mapa · zoom ${zoom}`;
  return () => {
    document.title = anterior;
  };
}, [zoom]);
```

Con `[zoom]`, React compara el zoom después de cada render: si cambió, corre la limpieza
(devuelve el título de antes) y vuelve a correr el cuerpo con el zoom nuevo.

</details>

---

## Drill 2 — `NotaConDosCampos`

<details><summary>Pista 1 — conceptual</summary>

Escribir una letra cambia el estado, y cambiar el estado pinta otra vez el componente.
¿Qué hace este efecto cada vez que el componente se pinta?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto sin array corre después de **cada** render. Llevar el cursor a «Título» es cosa
de una sola vez: al nacer.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: expect(element).toHaveValue(Hola)

Expected the element to have value:
  Hola
Received:
  H
```

La «H» entró en «Texto»; «ola» acabó en «Título». El lint no dice nada: un efecto sin
array no es un error, solo corre muchas veces.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  tituloRef.current?.focus();
}, []);
```

Con `[]`, el efecto corre al nacer y ya. La primera letra sigue pintando el componente
otra vez, pero el efecto ya no se repite.

</details>

---

## Drill 3 — `MapaConZoom`

<details><summary>Pista 1 — conceptual</summary>

La línea del `focus()` está bien escrita. Lo que falla es cuántas veces corre. ¿Qué cambia
justo antes de que el foco salte?

</details>

<details><summary>Pista 2 — más concreta</summary>

React no mira qué usa el efecto: mira su array. Si el zoom está en el array y cambia, el
efecto entero se repite, aunque no use el zoom para nada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <button type="button">Acercar</button>
Received element with focus:
  <button aria-label="Cerrar mapa" type="button">×</button>
```

El lint no dice nada: un valor de más en el array no le molesta.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  cerrarRef.current?.focus();
}, []);
```

El foco va a la ✕ una sola vez, al abrir. Con `[]` nada lo vuelve a correr al acercar.

</details>

---

## Drill 4 — `MapaConEscape`

<details><summary>Pista 1 — conceptual</summary>

La escucha la pone el efecto en el `document`, que sigue ahí cuando el mapa se va. ¿Quién
se encarga de quitarla?

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta la limpieza: la función que devuelve el efecto. Ahí va el `removeEventListener`, con
la misma función que se puso.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 2 times
```

Un solo Escape y dos llamadas: en `pnpm dev` y en el test, StrictMode monta el componente,
lo desmonta y lo vuelve a montar. Sin limpieza, la escucha del primer montaje se queda, y
se suma la del segundo.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const alPulsarTecla = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };
  document.addEventListener("keydown", alPulsarTecla);
  return () => document.removeEventListener("keydown", alPulsarTecla);
}, [onClose]);
```

Al morir el mapa, React llama a la limpieza y la escucha se va con él.

</details>

---

## Drill 5 — `ClicsEnLaPagina`

<details><summary>Pista 1 — conceptual</summary>

La limpieza se llama, pero no quita nada. `removeEventListener` solo quita la función que
le das si es **la misma** que se puso.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada `() => onClic()` crea una flecha nueva: la del `add` y la del `remove` son dos
funciones distintas, aunque se escriban igual. Hace falta guardar la flecha en una
constante y usar esa en los dos sitios.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 2 times
```

El mismo motivo que en el 4: StrictMode monta dos veces, y la primera escucha no se va.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const alHacerClic = () => onClic();
  document.addEventListener("click", alHacerClic);
  return () => document.removeEventListener("click", alHacerClic);
}, [onClic]);
```

También vale pasar `onClic` directamente a los dos: es la misma función.

</details>

---

## Drill 6 — `MensajeConAutoguardado`

<details><summary>Pista 1 — conceptual</summary>

Cada letra cambia `texto`, y el efecto vuelve a correr y pone otro temporizador. ¿Qué pasa
con el que había puesto la letra anterior?

</details>

<details><summary>Pista 2 — más concreta</summary>

Nadie lo para. `setTimeout` devuelve un id; con ese id, `clearTimeout` lo cancela. Y la
limpieza corre justo antes de que el efecto se repita.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 4 times
```

Una llamada por letra: «H», «Ho», «Hol» y «Hola».

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (texto === "") return;
  const id = setTimeout(() => onGuardar(texto), 1000);
  return () => clearTimeout(id);
}, [texto, onGuardar]);
```

Al escribir la «o», React corre la limpieza del efecto anterior, que cancela el
temporizador de la «H», y después pone uno nuevo. Solo sobrevive el de la última letra.

</details>

---

## Drill 7 — `BuscadorConRef`

<details><summary>Pista 1 — conceptual</summary>

En el navegador funciona: el fallo es del tipo. ¿Con qué valor empieza la caja, antes de
que React pinte el campo?

</details>

<details><summary>Pista 2 — más concreta</summary>

`useRef` necesita su valor inicial, y para un elemento del DOM ese valor es `null`. Con
`null`, el tipo de `.current` pasa a ser `HTMLInputElement | null`, que es lo que espera
`ref={…}`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2554: Expected 1 arguments, but got 0.
```

El test pasa: en ejecución, React mete el campo en `.current` igual.

</details>

<details><summary>Solución</summary>

```tsx
const campoRef = useRef<HTMLInputElement>(null);
```

</details>

---

## Drill 8 — `PanelDeFiltros`

<details><summary>Pista 1 — conceptual</summary>

`setAbierto(true)` no pinta el panel en ese momento: pide un render que llega después.
¿Existe el campo cuando corre la línea siguiente?

</details>

<details><summary>Pista 2 — más concreta</summary>

Mover el foco tiene que pasar cuando el campo ya está pintado: en un efecto que corra
cuando `abierto` cambia, y que solo enfoque si está abierto.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <input aria-label="Buscar tecnología" />
Received element with focus:
  <button type="button">Filtrar proyectos</button>
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (abierto) busquedaRef.current?.focus();
}, [abierto]);

function abrir() {
  setAbierto(true);
}
```

En el manejador, `busquedaRef.current` todavía era `null`, y el `?.` lo dejaba pasar sin
hacer nada. El efecto corre después de pintar, cuando el campo ya está dentro de la caja.

</details>

---

## Drill 9 — `useFocoAlNacer`

<details><summary>Pista 1 — conceptual</summary>

El hook recibe lo que había en la caja en el momento de llamarlo, durante el primer
render. ¿Qué había ahí entonces?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dale al hook la caja entera (el ref), y que mire dentro de ella en el efecto, cuando el
botón ya está pintado. El tipo de un ref se importa de react: `RefObject`.

</details>

<details><summary>Pista 3 — lo que dicen el lint y el test</summary>

```
Error: Cannot access refs during render
```

```
Expected element with focus:
  <button type="button">Entendido</button>
Received element with focus:
  <button type="button">Enviar</button>
```

</details>

<details><summary>Solución</summary>

```tsx
import type { RefObject } from "react";

export function useFocoAlNacer(destino: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    destino.current?.focus();
  }, [destino]);
}

// en ConfirmacionDeEnvio:
useFocoAlNacer(entendidoRef);
```

Durante el primer render, `entendidoRef.current` es `null`, y el starter le pasaba ese
`null` al hook. La caja es la misma en todos los renders: cuando corre el efecto, ya tiene
el botón dentro.

</details>

---

## Drill 10 — `MenuQueDevuelveFoco`

<details><summary>Pista 1 — conceptual</summary>

En el navegador funciona: el fallo es del tipo. ¿Qué tipo tiene `anterior`, y tiene ese
tipo un `focus()`?

</details>

<details><summary>Pista 2 — más concreta</summary>

`document.activeElement` es `Element | null`, y `Element` no tiene `focus()`. Hay que
comprobar en ejecución que es un `HTMLElement`: esa comprobación estrecha el tipo dentro
del `if`. Sin `as`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'focus' does not exist on type 'Element'.
```

El test pasa: en ejecución, lo que tenía el foco era un botón.

</details>

<details><summary>Solución</summary>

```tsx
return () => {
  if (anterior instanceof HTMLElement) anterior.focus();
};
```

`?.` solo descarta el `null`; no convierte un `Element` en `HTMLElement`. `instanceof` lo
comprueba de verdad, y dentro del `if` TypeScript ya sabe que tiene `focus()`.

</details>

---

## Drill 11 — `GraciasPorEscribir`

<details><summary>Pista 1 — conceptual</summary>

`anterior` tiene que apuntar a quien tenía el foco **antes** de que el aviso lo moviera.
Mira en qué orden van las dos primeras líneas del efecto.

</details>

<details><summary>Pista 2 — más concreta</summary>

Si anotas después del `focus()`, quien tiene el foco ya es «Cerrar». Al morir, le
devuelves el foco a un botón que se va con el aviso.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <button type="button">Enviar</button>
Received element with focus:
  <body>
```

El foco se pierde en el `<body>`.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anterior = document.activeElement;
  cerrarRef.current?.focus();
  return () => {
    if (anterior instanceof HTMLElement) anterior.focus();
  };
}, []);
```

Primero se anota, después se mueve, y al morir se devuelve.

</details>

---

## Drill 12 — `MapModal`

<details><summary>Pista 1 — conceptual</summary>

Es el 3 y el 4 juntos. Al copiar llega un `onClose` nuevo, y el efecto entero se repite:
también las líneas que mueven el foco. ¿Cuál de los tres trabajos del efecto usa
`onClose`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Solo el Escape necesita `onClose`. El scroll y el foco son de nacer y morir. Un efecto por
trabajo, cada uno con su array: así solo se repite el del Escape.

</details>

<details><summary>Pista 3 — lo que dicen el test y el lint</summary>

Con el starter:

```
Expected element with focus:
  <button type="button">Copiar dirección</button>
Received element with focus:
  <button aria-label="Cerrar mapa" type="button">×</button>
```

Si pruebas a poner `[]` al efecto entero, el foco deja de saltar, pero Escape llama al
`onClose` del primer render:

```
TestingLibraryElementError: Unable to find an element with the text: Copias al cerrar: 1.
```

y el lint avisa de que falta `onClose`.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const anteriorOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = anteriorOverflow;
  };
}, []);

useEffect(() => {
  const anteriorFoco = document.activeElement;
  cerrarRef.current?.focus();
  return () => {
    if (anteriorFoco instanceof HTMLElement) anteriorFoco.focus();
  };
}, []);

useEffect(() => {
  const alPulsarTecla = (event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  };
  document.addEventListener("keydown", alPulsarTecla);
  return () => document.removeEventListener("keydown", alPulsarTecla);
}, [onClose]);
```

Al copiar, solo el tercer efecto ve algo distinto en su array: quita la escucha vieja y
pone una con el `onClose` nuevo, y eso no se nota. Los otros dos no se mueven. En Projex
no fallaba porque `handleCloseMap` usa `useCallback`: el padre te pasaba siempre la misma
función. Partido así, tu modal aguanta a cualquier padre.

</details>
