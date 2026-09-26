# Pistas — exercise-03 · `useReducer`: el reducer que ya sabes, enchufado

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Aquí el typecheck cubre tres de los cinco drills. Los otros dos compilan y hacen lo que no
toca — esos los caza el test.

---

## Drill 1 — `ContadorConReducer`

<details><summary>Pista 1 — conceptual</summary>

El `useReducer` de la primera línea está bien escrito: reducer y estado inicial, en ese
orden. El problema está en los dos botones.

Mira qué forma tiene una acción en el `type Accion` de unas líneas más arriba, y compara
con lo que les estás entregando.

</details>

<details><summary>Pista 2 — más concreta</summary>

Una acción es un **objeto** con una propiedad `tipo`. `"incrementar"` no es la acción: es
el valor de esa propiedad.

`pedir` acepta exactamente lo que dice `Accion` y nada más. Es la misma unión cerrada
del `08`: si el objeto no encaja en ninguna variante, no entra.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-03.tsx(117,39): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Accion'.
exercise-03.tsx(118,39): error TS2345: Argument of type 'string' is not assignable to parameter of type 'Accion'.
```

Una por botón, y lo dice sin rodeos: le estás pasando un texto donde va una `Accion`.

Y el test, que no llega ni a la segunda pulsación:

```
Unable to find an element with the text: 2
```

</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => pedir({ tipo: "incrementar" })}>Sumar</button>
<button onClick={() => pedir({ tipo: "reiniciar" })}>Reiniciar</button>
```

El texto es la **etiqueta** de la acción, no la acción. Es la trampa de la TEORÍA 1: pulsar
la opción del cajero, no gritarle el nombre.

</details>

---

## Drill 2 — `contarReducer`

<details><summary>Pista 1 — conceptual</summary>

Faltan dos cosas distintas, y una de ellas no es un `case`.

Compara el `switch` que tienes con el que escribiste en el `08-discriminated-unions/
exercise-07`: allí el tuyo terminaba de una forma concreta que aquí no está.

</details>

<details><summary>Pista 2 — más concreta</summary>

`reiniciar` está devolviendo el estado que llega en vez del valor que pide el enunciado.

Falta el `case` de `sumar`, y ahí es donde `accion.cantidad` existe — solo dentro de ese
`case`, porque es el único sitio donde TypeScript sabe qué variante tienes.

Y falta el `default` con `const _exhaustivo: never = accion`, que es el que te avisará el
día que añadas una acción nueva y olvides su `case`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 5 to be +0 // Object.is equality
```

Sale en la segunda línea del test: `contarReducer(5, { tipo: "reiniciar" })` devuelve 5 y
se esperaba 0. `reiniciar` no está reiniciando nada.

</details>

<details><summary>Solución</summary>

```ts
export function contarReducer(estado: number, accion: Accion): number {
  switch (accion.tipo) {
    case "incrementar":
      return estado + 1;
    case "reiniciar":
      return 0;
    case "sumar":
      return estado + accion.cantidad;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
```

Es, letra por letra, el `aplicar` del `exercise-07` del `08`. Nada de esto es de React: el
reducer no sabe que existe un componente, y por eso se puede probar llamándolo a secas.

</details>

---

## Drill 3 — `ContadorConPaso`

<details><summary>Pista 1 — conceptual</summary>

La acción `sumar` no se basta con su `tipo`: necesita saber cuánto.

Mira su variante en el `type Accion` y verás que declara algo más.

</details>

<details><summary>Pista 2 — más concreta</summary>

`{ tipo: "sumar" }` está incompleta. La variante pide también `cantidad`, y el enunciado
dice cuánto vale: el botón sube de cinco en cinco.

El dato viaja **con** la acción, no por separado.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
exercise-03.tsx(181,39): error TS2345: Argument of type '{ tipo: "sumar"; }' is not assignable to parameter of type 'Accion'.
```

Te enseña exactamente lo que le pasaste: un objeto con `tipo` y nada más. La unión no tiene
ninguna variante con esa forma.

</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => pedir({ tipo: "sumar", cantidad: 5 })}>Sumar 5</button>
```

Y fíjate en que `contarReducer` no se toca: el mismo reducer sirve para subir de uno en uno
o de cinco en cinco, porque el cuánto lo decide quien pide.

</details>

---

## Drill 4 — `panelReducer`

<details><summary>Pista 1 — conceptual</summary>

Este compila, hace lo que parece y aun así está mal. El test que lo caza no mira el
resultado: mira el estado que **entró**.

Ese es el drill entero.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un reducer es una función pura: recibe el estado y devuelve **otro**. El que recibe no se
toca.

Ahora mismo haces tres cosas sobre el objeto que llega: le haces `push` al historial y le
asignas el contador. Las dos lo modifican en su sitio.

Necesitas fabricar un objeto nuevo y un array nuevo. Las dos herramientas las usaste en el
`exercise-01`: el spread de objeto y el de array.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 4 to be +0 // Object.is equality
```

El test llama al reducer y después comprueba el objeto que le pasó. Ese `4` es el contador
del estado **original**, que debería seguir en 0: lo modificaste por dentro.

</details>

<details><summary>Solución</summary>

```ts
export function panelReducer(estado: EstadoPanel, accion: Accion): EstadoPanel {
  const historial = [...estado.historial, accion.tipo];

  switch (accion.tipo) {
    case "incrementar":
      return { contador: estado.contador + 1, historial };
    case "reiniciar":
      return { contador: 0, historial };
    case "sumar":
      return { contador: estado.contador + accion.cantidad, historial };
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
```

El historial se calcula una vez arriba, porque las tres acciones lo dejan igual. Y cada
`case` devuelve un objeto nuevo.

Es el mismo fallo del `ListaTareas` del `exercise-01`: `push` muta y devuelve un número.
Si el reducer muta, React recibe la misma referencia y no repinta — el drill 5 te lo enseña
en pantalla.

</details>

---

## Drill 5 — `PanelConHistorial`

<details><summary>Pista 1 — conceptual</summary>

Este depende del drill 4: mientras el reducer mute, aquí no vas a ver nada cambiar aunque
el botón funcione.

Pero además hay un botón que no pide lo que dice su texto.

</details>

<details><summary>Pista 2 — más concreta</summary>

Lee los dos `onClick` en voz alta junto al texto de su botón. Uno de los dos no coincide.

El enunciado pide "Sumar 2" y "Reiniciar", y el reducer ya tiene una acción para cada cosa.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: 4
```

Dos pulsaciones de "Sumar 2" deberían dejar el contador en 4. Si el drill 4 sigue mutando,
la pantalla no se entera del primero siquiera.

</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => pedir({ tipo: "sumar", cantidad: 2 })}>Sumar 2</button>
<button onClick={() => pedir({ tipo: "reiniciar" })}>Reiniciar</button>
```

El botón "Reiniciar" pedía `incrementar`. Ningún compilador puede cazar eso: las dos
acciones son válidas y el texto de un botón no es más que un texto.

Con el reducer del drill 4 ya puro, el historial crece y la lista se repinta en cada
pulsación.

</details>
