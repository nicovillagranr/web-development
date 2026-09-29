# Pistas — exercise-04b · una copia con una regla dentro

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 9 starters compilan, así que en este archivo ninguna Pista 3 cita a `tsc`: en su
lugar va lo que dice el test, "lo que esperaba" contra "lo que le llegó".

---

## Drill 1 — `marcarEditando`

<details><summary>Pista 1 — conceptual</summary>

El starter devuelve la nota que recibe. ¿Qué campo tendría que salir distinto?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una copia con spread, y detrás, la única clave que cambia. Es la sintaxis de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'guardado' to be 'editando'
```

La nota entra "guardado" y sale igual, porque nadie tocó `estado`.

</details>

<details><summary>Solución</summary>

```ts
return { ...nota, estado: "editando" };
```

`...nota` copia `contenido` y `estado`; `estado: "editando"` va detrás y pisa solo esa.

</details>

---

## Drill 2 — `cambiarTitulo`

<details><summary>Pista 1 — conceptual</summary>

El título no está en la nota: está dentro de `contenido`. ¿Qué objeto hay que copiar para
cambiarlo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos spreads, uno por nivel, como en el drill 7 del `03b`. El starter pisa la clave
equivocada del contenido.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'Lista' to be 'Compra'
```

El título nuevo acabó en `cuerpo`.

</details>

<details><summary>Solución</summary>

```ts
return { ...nota, contenido: { ...nota.contenido, titulo } };
```

`titulo` a secas es la abreviatura de `titulo: titulo`. `estado` no se nombra, así que sale
como entró.

</details>

---

## Drill 3 — `respuesta3`

<details><summary>Pista 1 — conceptual</summary>

Busca en la segunda línea la palabra `estado`. ¿Aparece?

</details>

<details><summary>Pista 2 — más concreta</summary>

Si una clave no se escribe detrás del spread, sale con el valor que traía el original.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'editando' to be 'guardado'
```

</details>

<details><summary>Solución</summary>

`"guardado"`. Nadie escribió `estado:`, así que la fotocopia lo trae tal cual. Es
exactamente el defecto del drill 2 del `04`: la fase del formulario sale "enviado" aunque
estés escribiendo.

</details>

---

## Drill 4 — `trasEscribir`

<details><summary>Pista 1 — conceptual</summary>

Hay tres entradas posibles. ¿En cuántas cambia la salida?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una pregunta sobre `estado`: si es "guardado", una respuesta; si no, devuelve el que llegó.
Vale un `if` o un ternario.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'guardado' to be 'editando'
```

Las otras dos entradas ya salen bien: el starter las devuelve tal cual, y eso es lo que
toca.

</details>

<details><summary>Solución</summary>

```ts
return estado === "guardado" ? "editando" : estado;
```

El `: estado` es el "si no": sin él no sería una regla, sería un cambio para todos.

</details>

---

## Drill 5 — `alEscribir`

<details><summary>Pista 1 — conceptual</summary>

El starter cambia a "editando" venga como venga. ¿Qué pasa si la nota estaba "guardando"?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` antes del `return` que salga pronto cuando no hay nada que hacer, devolviendo la
nota que llegó (no una copia).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { contenido: { …(2) }, …(1) } to be { contenido: { …(2) }, …(1) }
```

Los dos objetos se ven iguales, pero `toBe` pregunta si son **el mismo**. Con "guardando"
tiene que salir la misma nota, no una copia.

</details>

<details><summary>Solución</summary>

```ts
if (nota.estado !== "guardado") return nota;
return { ...nota, estado: "editando" };
```

Es el `return estado` de la Teoría 2 del `04`: "no pasó nada" se dice devolviendo lo mismo.

</details>

---

## Drill 6 — `alEscribirDentro`

<details><summary>Pista 1 — conceptual</summary>

Ahora la pregunta va dentro del objeto, en la clave `estado`. ¿Qué valor le pones?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un ternario en la clave `estado`, o llamar a la función del drill 4 con el estado que
entra.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'guardado' to be 'editando'
```

</details>

<details><summary>Solución</summary>

```ts
return { ...nota, estado: trasEscribir(nota.estado) };
// o bien: estado: nota.estado === "guardado" ? "editando" : nota.estado
```

Aquí siempre sale una copia, también cuando el estado no cambia. Para una función suelta
da igual; en un reducer, React repintaría sin necesidad.

</details>

---

## Drill 7 — `escribirTitulo`

<details><summary>Pista 1 — conceptual</summary>

El título ya cambia. ¿Qué clave del objeto que devuelves nadie está nombrando?

</details>

<details><summary>Pista 2 — más concreta</summary>

Añade la clave `estado` al mismo objeto, con la regla del drill 6.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'guardado' to be 'editando'
```

El título sale bien y el estado sale igual que entró: es el drill 3 en vivo.

</details>

<details><summary>Solución</summary>

```ts
return {
  ...nota,
  contenido: { ...nota.contenido, titulo },
  estado: trasEscribir(nota.estado),
};
```

Un objeto, tres líneas: copia todo, pisa el contenido, pisa el estado.

</details>

---

## Drill 8 — `escribir`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 7, pero el nombre de la clave ya no lo sabes al escribir el código: viene en
`campo`.

</details>

<details><summary>Pista 2 — más concreta</summary>

Una clave calculada, entre corchetes, en lugar de `titulo`. El resto es igual que el 7.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { titulo: 'Lista', cuerpo: 'pan' } to deeply equal { titulo: 'Lista', cuerpo: 'leche' }
```

Con `campo: "cuerpo"`, el starter devuelve la nota sin tocar.

</details>

<details><summary>Solución</summary>

```ts
return {
  ...nota,
  contenido: { ...nota.contenido, [campo]: valor },
  estado: trasEscribir(nota.estado),
};
```

</details>

---

## Drill 9 — `notaReducer`, el `case "escribir"`

<details><summary>Pista 1 — conceptual</summary>

Compáralo con el drill 8. ¿Qué mitad le falta a este `return`?

</details>

<details><summary>Pista 2 — más concreta</summary>

La clave `estado` con la regla. O, directamente, llamar a la función del drill 8 con lo
que trae `accion`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'guardado' to be 'editando'
```

En pantalla: guardas, sale "Guardado", tecleas… y "Guardado" se queda.

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return escribir(nota, accion.campo, accion.valor);
```

O el objeto del drill 8 escrito entero, con `accion.campo` y `accion.valor`. Con esto
tienes el drill 2 del `04`: cambia `nota` por `estado`, `contenido` por `datos` y `estado`
por `fase`.

</details>
