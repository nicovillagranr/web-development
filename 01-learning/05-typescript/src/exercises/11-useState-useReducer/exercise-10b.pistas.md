# Pistas — exercise-10b · validar: un objeto de errores, una regla a la vez

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 5 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

---

## Drill 1 — lo que devuelve con todo en regla

<details><summary>Pista 1 — conceptual</summary>

Sigue la función con datos buenos: ¿entra en algún `if`? ¿Qué le pasa entonces a
`errores`?

</details>

<details><summary>Pista 2 — más concreta</summary>

`errores` nace como `{}` y solo crece dentro de los `if`. Si no entra en ninguno, sale tal
como nació.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { nombre: '', correo: '', detalle: '' } to strictly equal {}
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: ErroresSolicitud = {};
// ¿Por qué? Porque `errores` empieza vacío y solo se le añade una clave cuando un campo
// falla. Si todo pasa, no se añade nada: sale `{}`. Por eso el envío pregunta
// `Object.keys(errores).length > 0`: cero claves quiere decir cero errores.
```

Un objeto con las claves en `""` tendría tres claves, y `Object.keys` diría que hay tres
errores.

</details>

---

## Drill 2 — el correo con espacios

<details><summary>Pista 1 — conceptual</summary>

Compara cómo llegan al `if` el nombre y el detalle con cómo llega el correo.

</details>

<details><summary>Pista 2 — más concreta</summary>

El nombre y el detalle pasan por `trim()` antes de validarse; el correo se valida tal como
llega. Hay que normalizarlo igual.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'El correo no es válido' to be undefined
```

</details>

<details><summary>Solución</summary>

```ts
if (!FORMA_DE_CORREO.test(datos.correo.trim())) {
```

O, para que se parezca al resto, una constante `const correo = datos.correo.trim();` junto
a las otras dos, y `FORMA_DE_CORREO.test(correo)`. Es lo que hace Projex al principio de
`ContactValidation`.

</details>

---

## Drill 3 — el error de " A "

<details><summary>Pista 1 — conceptual</summary>

Lo primero que hace la función con el nombre no es validarlo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Después del `trim()`, ¿cuántos caracteres le quedan a " A "? ¿Está vacío? ¿Llega a 2?

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected undefined to be 'El nombre debe tener al menos 2 carac…'
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: string | undefined = "El nombre debe tener al menos 2 caracteres";
```

" A " tiene 3 caracteres, pero después del `trim()` queda "A", con 1. No está vacío, así
que la regla de obligatorio pasa; la de longitud, no.

</details>

---

## Drill 4 — el nombre vacío

<details><summary>Pista 1 — conceptual</summary>

Con el nombre vacío, ¿cuántas de las dos reglas fallan? ¿Y cuál escribe la última?

</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos `if` sueltos: los dos se miran, y el segundo sobrescribe al primero. La segunda
regla solo debería mirarse si la primera pasó (Teoría 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'El nombre debe tener al menos 2 carac…' to be 'El nombre es obligatorio'
```

</details>

<details><summary>Solución</summary>

```ts
if (!nombre) {
  errores.nombre = "El nombre es obligatorio";
} else if (nombre.length < 2) {
  errores.nombre = "El nombre debe tener al menos 2 caracteres";
}
```

Con `else if`, si el nombre está vacío se para en la primera regla. En Projex se hace lo
mismo con `switch (true)` y un `break` por caso: es otra forma de escribir "gana la
primera".

</details>

---

## Drill 5 — la segunda regla del detalle

<details><summary>Pista 1 — conceptual</summary>

Es la misma forma que el nombre del drill 4, con otro número y otro mensaje.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `else if` debajo del de obligatorio, que mire la longitud del detalle ya normalizado.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected undefined to be 'Cuéntanos un poco más: mínimo 20 cara…'
```

</details>

<details><summary>Solución</summary>

```ts
if (!detalle) {
  errores.detalle = "El detalle es obligatorio";
} else if (detalle.length < 20) {
  errores.detalle = "Cuéntanos un poco más: mínimo 20 caracteres";
}
```

Usa `detalle`, la constante con `trim()`, y no `datos.detalle`: el test prueba un detalle
corto rodeado de espacios que, sin normalizar, llega a 20.

</details>
