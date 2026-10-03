# Pistas — exercise-07 · el tipo dice qué casos existen

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los drills 1 y 6 pasan el test con el fallo dentro: su señal está solo en `pnpm
typecheck`. Los drills 2, 4 y 8 no dan error de tipos, y su señal está solo en el test.

Si el drill 1 sigue sin resolver, el 3 da un error de más: arregla primero el 1.

---

## Drill 1 — `Mesa`

<details><summary>Pista 1 — conceptual</summary>

`puedeReservar` atiende tres mesas. ¿Cuántos textos distintos deja pasar hoy el tipo
`Mesa`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con `string`, al `default` siempre le llega algo: todos los textos que no son esos tres.
El tipo tiene que nombrar sus valores, como `Talla` en la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type 'string' is not assignable to type 'never'.
```

Sale en el `default` de `puedeReservar`, no en la línea de `Mesa`. Al `default` le llega
`string`, y un `string` no cabe en `never`.

</details>

<details><summary>Solución</summary>

```ts
export type Mesa = "libre" | "reservada" | "ocupada";
```

Ahora los tres `case` atienden todos los valores posibles, al `default` no llega nada, y
"nada" es `never`.

</details>

---

## Drill 2 — `respuesta2`

<details><summary>Pista 1 — conceptual</summary>

Cuando TypeScript revisa `const mesa: Mesa = elegida`, ¿mira lo que vale `elegida` o lo
que dice su tipo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Fíjate en la última línea del ejemplo de la Teoría 1: una `Talla` cabe en un `string`.
¿Y al revés? ¿Todo `string` es una `Mesa`?

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'compila' to be 'no compila'
```

</details>

<details><summary>Solución</summary>

`"no compila"`. TypeScript no ejecuta el código: mira el tipo de `elegida`, que es
`string`, y un `string` puede ser cualquier texto. Que hoy valga `"libre"` no importa.
Para guardarlo en una `Mesa` hay que comprobarlo antes (por ejemplo, con un `if` que
compare contra los tres valores).

</details>

---

## Drill 3 — `textoDeMesa`

<details><summary>Pista 1 — conceptual</summary>

Cuenta los `case` y cuenta los valores de `Mesa`.

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta un `case`. La alarma del `default` te dice cuál: es el valor que le llega.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Con el drill 1 resuelto:

```
error TS2322: Type '"ocupada"' is not assignable to type 'never'.
```

Al `default` le llega `"ocupada"`: es la mesa que nadie atendió. Si el drill 1 sigue
con `string`, el mensaje dice `Type 'string'` y no te dice cuál falta. El test lo dice
también:

```
expected 'ocupada' to be 'Mesa ocupada'
```

</details>

<details><summary>Solución</summary>

```ts
case "ocupada":
  return "Mesa ocupada";
```

Sin ese `case`, "ocupada" caía al `default`, que la devolvía tal cual. Por eso el test
recibía `'ocupada'`.

</details>

---

## Drill 4 — `respuesta4`

<details><summary>Pista 1 — conceptual</summary>

¿Quién hacía sonar la alarma en el drill 3? ¿Sigue ahí después del cambio?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con `return ""`, el `default` acepta cualquier cosa que le llegue, también
"bloqueada". ¿Hay alguna línea que ahora no compile?

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'el typecheck' to be 'nadie'
```

</details>

<details><summary>Solución</summary>

`"nadie"`. La alarma era la línea `const _exhaustivo: never = mesa`. Al borrarla, el
`default` se traga "bloqueada" y devuelve `""`: la mesa sale con el cartel vacío, sin
error de tipos ni en ejecución. Por eso el `default` con `never` no se borra aunque
nunca se ejecute.

</details>

---

## Drill 5 — `mesaReducer`

<details><summary>Pista 1 — conceptual</summary>

`AccionMesa` tiene tres papeles. ¿Cuántos atiende el `switch`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es el drill 3 otra vez, pero el `switch` pregunta por `accion.tipo`, y lo que sobra en
el `default` es un papel entero.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '{ tipo: "liberar"; }' is not assignable to type 'never'.
```

Aquí la alarma nombra el papel que falta. El test dice lo mismo:

```
expected { tipo: 'liberar' } to be 'libre'
```

</details>

<details><summary>Solución</summary>

```ts
case "liberar":
  return "libre";
```

Es la misma alarma de tus reducers del `04`: si mañana `AccionMesa` gana un papel, el
`default` deja de compilar hasta que alguien le escriba su `case`.

</details>

---

## Drill 6 — `CampoReserva`

<details><summary>Pista 1 — conceptual</summary>

`etiquetas` tiene tres claves. ¿Cuántos textos deja pasar `CampoReserva`?

</details>

<details><summary>Pista 2 — más concreta</summary>

El enunciado pide sacar los nombres del propio tipo `Reserva`, no escribirlos a mano.
La pieza está en `🗣️ LAS PIEZAS` de la Teoría 3.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ nombre: string; telefono: string; comentario: string; }'.
```

Con un `string` cualquiera, `etiquetas[campo]` podría pedir una clave que no existe.

</details>

<details><summary>Solución</summary>

```ts
export type CampoReserva = keyof Reserva;
```

Escribir `"nombre" | "telefono" | "comentario"` a mano también compila, pero si `Reserva`
gana un campo, ese tipo se queda atrás. `keyof` lo gana solo.

</details>

---

## Drill 7 — `reservaReducer`, "escribir"

<details><summary>Pista 1 — conceptual</summary>

El papel dice QUÉ campo cambiar. ¿El starter usa ese dato para elegir la clave?

</details>

<details><summary>Pista 2 — más concreta</summary>

Fíjate en el ejemplo de la Teoría 3: una clave escrita tal cual y una clave entre
corchetes no hacen lo mismo.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2353: Object literal may only specify known properties, and 'campo' does not exist in type 'Reserva'.
```

`Reserva` no tiene ningún campo que se llame `campo`.

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return { ...reserva, [accion.campo]: accion.valor };
```

Sin corchetes, `campo` es el nombre de la clave. Con corchetes, la clave es lo que GUARDA
`accion.campo`: "telefono", "comentario" o "nombre".

</details>

---

## Drill 8 — `FormReserva`

Si el drill 7 no está resuelto, este test falla también por él. Resuelve el 7 primero.

<details><summary>Pista 1 — conceptual</summary>

El reducer está bien. Entonces, ¿qué le está pidiendo el campo del teléfono?

</details>

<details><summary>Pista 2 — más concreta</summary>

Compara los tres `onChange`, uno al lado del otro. Uno de ellos se copió y no se
terminó de cambiar.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expect(element).toHaveValue(912)
```

Escribiste en "Teléfono" y su campo siguió vacío.

</details>

<details><summary>Solución</summary>

```tsx
onChange={(e) => pedir({ tipo: "escribir", campo: "telefono", valor: e.target.value })}
```

**El porqué:** `"nombre"` es una clave que existe en `Reserva`, así que `keyof` la
acepta. `keyof` caza la clave que no existe (una errata como "telefno"), pero no la que
existe y es la equivocada. TypeScript mira la forma, no el significado: ese fallo solo
lo caza el test.

</details>
