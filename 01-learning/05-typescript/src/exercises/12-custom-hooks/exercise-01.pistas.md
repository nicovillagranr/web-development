# Pistas — exercise-01 · `useEffect`: cuándo corre y cuándo se repite

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 6 starters compilan, así que la Pista 3 casi nunca cita a `tsc`: en su lugar va lo
que dice el test. Las dos excepciones son el drill 4, donde también avisa el linter, y
el drill 6, si escribes la flecha sin llaves.

---

## Drill 1 — `EnfocarCerrar`

<details><summary>Pista 1 — conceptual</summary>

La línea que enfoca está bien escrita. La pregunta es otra: en el momento en que corre,
¿existe ya la ✕ en la página? Piensa en el primer render.

</details>

<details><summary>Pista 2 — más concreta</summary>

Desde el cuerpo del componente, esa línea corre mientras React decide qué pintar, y la ✕
todavía no está en la página. Tiene que correr después de pintar: eso es justo un efecto
(Teoría 1). Mueve la línea dentro de uno.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <button aria-label="Cerrar mapa" id="cerrar-mapa" type="button">
Received element with focus:
  <body>
```

El foco se quedó en el `body`: la línea corrió, pero cuando buscó `cerrar-mapa` no
encontró nada que enfocar.

</details>

<details><summary>Solución</summary>

```tsx
export function EnfocarCerrar() {
  useEffect(() => {
    document.getElementById("cerrar-mapa")?.focus();
  }, []);
  // …el return no cambia
}
```

Dentro del efecto, la línea corre con el diálogo ya pintado, así que `getElementById`
encuentra la ✕. El `[]` (Teoría 2) hace que solo enfoque al abrirse: sin array, también
pasa el test, pero volvería a robar el foco en cada render.

</details>

---

## Drill 2 — el orden de los dos registros

<details><summary>Pista 1 — conceptual</summary>

El orden en que están escritas las líneas no tiene por qué ser el orden en que corren.
¿Cuándo corre lo que va dentro de `useEffect`?

</details>

<details><summary>Pista 2 — más concreta</summary>

`registrar("pinta")` está en el cuerpo: corre mientras React calcula el render. Lo de
dentro del efecto corre después de pintar (Teoría 1), aunque esté escrito más arriba.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected: "pinta, efecto"
Received: "efecto, pinta"
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: Orden = "pinta, efecto";
// ¿Por qué? useEffect no ejecuta la función en esa línea: la guarda, y React la llama
// cuando ya pintó. El registrar("pinta") del cuerpo corre durante el render, antes.
```

La trampa era leer de arriba abajo. `useEffect(() => …)` no ejecuta nada en su línea:
entrega una función para más tarde, igual que cuando le pasas un manejador a `onClick`.

</details>

---

## Drill 3 — un efecto sin array: montaje y dos clics

<details><summary>Pista 1 — conceptual</summary>

No cuentes los clics: cuenta los renders.

</details>

<details><summary>Pista 2 — más concreta</summary>

Sin array, el efecto corre después de **cada** render (Teoría 1). El montaje es un
render, y cada clic cambia el estado y provoca otro.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 2 to be 3
```

Te falta un render.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: number = 3;
```

El montaje (1) y los dos clics (2 más). Sin array, el efecto no mira qué cambió: corre
detrás de cada render, sea por lo que sea.

</details>

---

## Drill 4 — `BloqueoScroll`

<details><summary>Pista 1 — conceptual</summary>

El efecto usa `abierto` para decidir qué escribir. Pero ¿se entera cuando `abierto`
cambia?

</details>

<details><summary>Pista 2 — más concreta</summary>

Mira la lista del final del `useEffect` (Teoría 2): es lo que vigila. Si `abierto` no
está en ella, el efecto corre al montarse y nunca más.

</details>

<details><summary>Pista 3 — lo que dicen el test y el linter</summary>

```
expected '' to be 'hidden'
```

Y el linter, en la línea del array:

```
React Hook useEffect has a missing dependency: 'abierto'. Either include it or remove
the dependency array  react-hooks/exhaustive-deps
```

Ojo con la segunda salida que te ofrece, quitar el array: el test pasaría, pero el
efecto correría tras cada render del componente. Lo que quieres es la primera.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  document.body.style.overflow = abierto ? "hidden" : "";
}, [abierto]);
```

Ahora React compara `abierto` en cada render y repite el efecto cuando cambia: al abrir
escribe `"hidden"`, y al cerrar lo devuelve a `""`. En tu `MapModal` el desbloqueo lo
hace la limpieza del `return`, que es el 02.

</details>

---

## Drill 5 — con `[abierto]`, tres clics que no lo cambian

<details><summary>Pista 1 — conceptual</summary>

Cada clic provoca un render, pero eso no basta para repetir el efecto. ¿Qué vigila?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tras cada render, React compara `abierto` con el del render anterior (Teoría 2). Los
clics cambian `zoom`, que no está en la lista.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 4 to be 1
```

4 sería la respuesta sin array, la del drill 3.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: number = 1;
// ¿Por qué? Corre al montarse. Los tres clics provocan tres renders, pero en cada uno
// abierto sigue igual que antes, y React se salta el efecto.
```

Es el mismo componente que el del drill 3 con una lista al final: de 4 a 1. Y es lo que
hace tu `[onClose]`: el efecto de tu `MapModal` no se repite por renders que no cambian
`onClose`.

</details>

---

## Drill 6 — `TituloMapa`

<details><summary>Pista 1 — conceptual</summary>

Aquí no hay ningún efecto todavía. Antes de escribirlo, responde dos cosas: ¿qué tiene
que tocar fuera de React? ¿Y cuándo tiene que repetirse?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `useEffect` que escriba en `document.title`, con llaves, como el chat de la Teoría 1.
Para la lista: el único valor que usa dentro es el que tiene que vigilar. `favorito` no
pinta nada en la pestaña.

</details>

<details><summary>Pista 3 — lo que dicen el test y el compilador</summary>

Sin efecto:

```
expected '' to be 'Mapa · zoom 1'
```

Con el efecto, pero sin array (Favorito lo repite):

```
expected "set title" to be called 2 times, but got 3 times
```

Con `[]` (no sigue al zoom):

```
expected 'Mapa · zoom 1' to be 'Mapa · zoom 2'
```

Y si escribes la flecha sin llaves, `() => document.title = …`:

```
Type 'string' is not assignable to type 'void | Destructor'.
```

Sin llaves, la flecha devuelve lo que vale la asignación, un `string`. Lo único que un
efecto puede devolver es su función de limpieza, el `Destructor` del mensaje (el 02).

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  document.title = `Mapa · zoom ${zoom}`;
}, [zoom]);
```

`[zoom]` lo repite justo cuando cambia lo que se ve en la pestaña. Favorito provoca un
render, pero `zoom` sigue igual, así que React se salta el efecto: es el drill 5, escrito
por ti.

</details>
