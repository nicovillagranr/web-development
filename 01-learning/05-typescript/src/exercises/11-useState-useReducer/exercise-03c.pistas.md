# Pistas — exercise-03c · la cadena de `useReducer`

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Ojo con los errores en cascada: mientras el drill 1 esté sin arreglar, el drill 8 también
da error de tipos, aunque su fallo de verdad es otro. Arregla el 1 primero.

---

## Drill 1 — `AccionVolumen`

<details><summary>Pista 1 — conceptual</summary>

`pruebaFijar` es un papel de "fijar" con su número escrito. Mira el formulario de "fijar"
en la lista: ¿tiene casilla para ese número?

</details>

<details><summary>Pista 2 — más concreta</summary>

La variante `"fijar"` necesita una segunda propiedad, además de `tipo`, con su tipo. Las
otras dos variantes se quedan como están.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2353: Object literal may only specify known properties, and 'valor' does not exist in type '{ tipo: "fijar"; }'.
```

El papel trae una casilla `valor` que el formulario de "fijar" no tiene.

</details>

<details><summary>Solución</summary>

```ts
export type AccionVolumen = { tipo: "subir" } | { tipo: "bajar" } | { tipo: "fijar"; valor: number };
```

El dato viaja dentro de la acción, y solo en la variante que lo necesita. "subir" y "bajar"
no llevan número porque siempre mueven uno.

</details>

---

## Drill 2 — `respuesta2`

<details><summary>Pista 1 — conceptual</summary>

Para cada uno, pregúntate dos cosas: ¿es un objeto con `tipo`? ¿Trae exactamente las
casillas de su formulario, ni una más ni una menos?

</details>

<details><summary>Pista 2 — más concreta</summary>

Solo uno de los cuatro es válido. Los otros tres fallan por tres motivos distintos: no es
un objeto, le falta una casilla y le sobra una casilla.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Esto es lo que dice `tsc` si escribes los tres inválidos con `: AccionVolumen`:

```
"subir"                        → Type 'string' is not assignable to type 'AccionVolumen'.
{ tipo: "fijar" }              → Type '{ tipo: "fijar"; }' is not assignable to type 'AccionVolumen'.
{ tipo: "subir", valor: 3 }    → Object literal may only specify known properties, and 'valor' does not exist in type '{ tipo: "subir"; }'.
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: boolean[] = [true, false, false, false];
// ¿Por qué? Solo el primero es un papel completo. "subir" es la etiqueta suelta, el de
// fijar no trae su número y al de subir le sobra una casilla que su formulario no tiene.
```

</details>

---

## Drill 3 — `respuesta3`

<details><summary>Pista 1 — conceptual</summary>

Sin mirar el `tipo`, ¿sabe TypeScript cuál de los tres papeles tienes en la mano?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sobre una unión, TypeScript solo te deja leer las propiedades que tienen **todas** las
variantes. `valor` solo la tiene una.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'valor' does not exist on type 'AccionVolumen'.
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: boolean = false;
// ¿Por qué? Puede ser un papel de subir o de bajar, que no traen `valor`. Solo después de
// comprobar que `accion.tipo` es "fijar" existe `accion.valor`.
```

Por eso el reducer lee `accion.valor` **dentro** de `case "fijar":` y en ningún otro sitio.

</details>

---

## Drill 4 — `volumenReducer`

<details><summary>Pista 1 — conceptual</summary>

Lee cada `case` en voz alta: "si el papel dice bajar, devuelvo…". ¿Coincide con lo que
dice el papel?

</details>

<details><summary>Pista 2 — más concreta</summary>

"bajar" está haciendo lo mismo que "subir". Y "fijar" devuelve el volumen que ya había,
ignorando el número que trae el papel.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Aquí `tsc` calla: sumar en vez de restar, o devolver el estado viejo, compila. El test:

```
AssertionError: expected 6 to be 4
```

</details>

<details><summary>Solución</summary>

```ts
case "bajar":
  return estado - 1;
case "fijar":
  return accion.valor;
```

Dentro de `case "fijar":` TypeScript ya sabe qué papel es, y por eso deja leer `valor`.

</details>

---

## Drill 5 — los topes

<details><summary>Pista 1 — conceptual</summary>

Antes de sumar, el cajero tiene que mirar el saldo: ¿ya está en el máximo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una condición dentro del `return` de "subir" y otra en el de "bajar". Un ternario
alcanza, como en el tope del `exercise-02`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla: 11 es un `number` tan válido como 10. El test:

```
AssertionError: expected 11 to be 10
```

</details>

<details><summary>Solución</summary>

```ts
case "subir":
  return estado < 10 ? estado + 1 : 10;
case "bajar":
  return estado > 0 ? estado - 1 : 0;
```

`Math.min(estado + 1, 10)` y `Math.max(estado - 1, 0)` hacen lo mismo en una palabra.

</details>

---

## Drill 6 — `respuesta6`

<details><summary>Pista 1 — conceptual</summary>

Hazlo en papel, una llamada por línea. Cada línea empieza con el número que devolvió la
anterior.

</details>

<details><summary>Pista 2 — más concreta</summary>

`3 → subir → ? → subir → ? → fijar 9 → ? → subir → ? → subir → ?`. En los dos últimos
pasos entra en juego el drill 5.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected 0 to be …
```

Si te salió 11, te olvidaste del tope. Y si te salió 4, empezaste cada llamada desde el 3.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: number = 10;
// ¿Por qué? 3 → 4 → 5 → 9 → 10 → 10. Cada llamada empieza con lo que devolvió la anterior,
// "fijar" pisa lo que hubiera, y el último "subir" choca con el tope.
```

Esto es literalmente `[subir, subir, fijar9, subir, subir].reduce(volumenReducer, 3)`, y de
ahí viene el nombre *reducer*.

</details>

---

## Drill 7 — `Altavoz`

<details><summary>Pista 1 — conceptual</summary>

Vuelve a la trampa de la Teoría 1: ¿qué le estás entregando a `pedir`, el papel o la
etiqueta?

</details>

<details><summary>Pista 2 — más concreta</summary>

`pedir` espera un objeto con la forma de `AccionVolumen`, igual que el reducer.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'AccionVolumen'.
```

En pantalla sale `Volumen: subir`: el reducer recibió el texto, no encontró su `case` y
cayó al `default`.

</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => pedir({ tipo: "subir" })}>Subir</button>
<button onClick={() => pedir({ tipo: "bajar" })}>Bajar</button>
```

</details>

---

## Drill 8 — `AltavozConPreset`

<details><summary>Pista 1 — conceptual</summary>

El botón hace la cuenta bien. ¿Dónde termina el número que devuelve?

</details>

<details><summary>Pista 2 — más concreta</summary>

Llamar al reducer tú mismo solo calcula: nadie guarda el resultado. Para que React lo
guarde y repinte, el papel tiene que pasar por la función que te da `useReducer`, y el
starter ni siquiera la está sacando de la tupla.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el drill 1 arreglado, `tsc` calla: llamar a una función y tirar su resultado es
legal. El test:

```
Unable to find an element with the text: Volumen: 7
```

</details>

<details><summary>Solución</summary>

```tsx
const [volumen, pedir] = useReducer(volumenReducer, 3);
// …
<button onClick={() => pedir({ tipo: "fijar", valor: 7 })}>Al 7</button>
```

Tú entregas el papel, y la llamada al reducer la hace React, con el estado que tiene
guardado.

</details>

---

## Drill 9 — `AltavozCompleto`

<details><summary>Pista 1 — conceptual</summary>

Una acción nueva recorre la cadena entera: tiene que existir como papel, el cajero tiene
que saber atenderla y alguien tiene que pedirla. El tercer eslabón ya está.

</details>

<details><summary>Pista 2 — más concreta</summary>

Primero añádela a `AccionVolumen`. En cuanto lo hagas, el `default` exhaustivo del reducer
se queja, y ese es el aviso de que falta su `case`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Primero, en el botón:

```
error TS2322: Type '"silenciar"' is not assignable to type '"subir" | "bajar" | "fijar"'.
```

Y cuando añades la variante al tipo, en el `default` del reducer:

```
error TS2322: Type '{ tipo: "silenciar"; }' is not assignable to type 'never'.
```

</details>

<details><summary>Solución</summary>

```ts
export type AccionVolumen =
  | { tipo: "subir" }
  | { tipo: "bajar" }
  | { tipo: "fijar"; valor: number }
  | { tipo: "silenciar" };

// en volumenReducer
case "silenciar":
  return 0;
```

El compilador te llevó de la mano del botón al tipo y del tipo al reducer. Por eso vale la
pena el `default` con `never`: cuando falta un `case`, te avisa antes de que lo pulse nadie.

</details>
