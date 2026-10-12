# Pistas — exercise-10c · `validarSolicitud`, una regla a la vez

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 6 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

---

## Drill 1 — lo que devuelve con todo en regla

<details><summary>Pista 1 — conceptual</summary>

Mira con qué objeto empieza `validarSolicitud`, y piensa qué le pasa a ese objeto si no
se cumple ningún `if`.

</details>

<details><summary>Pista 2 — más concreta</summary>

El objeto empieza sin claves, y cada clave solo se añade dentro del `if` de un campo que
falla. Si no falla ninguno, no se añade ninguna: no quedan casillas en blanco, no hay
casillas (Teoría 1).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { nombre: '', apellido: '', …(2) } to strictly equal {}
```

Sobran las cuatro claves.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: ErroresSolicitud = {};
// ¿Por qué? Porque el validador empieza con `{}` y solo añade la clave de un campo
// cuando ese campo falla. Con todo en regla, nadie añade nada.
```

Es la misma diferencia del drill 7 del `10b`: `{}` no es lo mismo que unas claves con `""`.
Y aquí importa de verdad: tu `handleSubmit` decide con `Object.keys(errores).length > 0`.
Con `{ nombre: "", … }` eso da 4, y el formulario no se enviaría nunca.

</details>

---

## Drill 2 — el nombre, sin contar los espacios del borde

<details><summary>Pista 1 — conceptual</summary>

¿Qué miran hoy las reglas del nombre: el nombre tal como llega, o el nombre limpio?
Compáralas con las del apellido y las del detalle.

</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos reglas del nombre miran `datos.nombre` en crudo. Las dos tienen que mirar el
resultado de `trim()` (la ⚠️ TRAMPA de la Teoría 1).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected undefined to be 'El nombre es obligatorio' // Object.is equality
```

Con `"   "` no salta ninguna de las dos reglas. Si arreglas solo la primera, el test pasa
a quejarse de `" A "`.

</details>

<details><summary>Solución</summary>

```ts
if (datos.nombre.trim() === "") {
  errores.nombre = "El nombre es obligatorio";
} else if (datos.nombre.trim().length < 2) {
  errores.nombre = "El nombre debe tener al menos 2 caracteres";
}
```

`"   "` mide 3 y no es `""`, así que en crudo pasa las dos reglas. Con `trim()` se queda
en `""` y salta la primera. Y `" A "` limpio es `"A"`, que mide 1.

</details>

---

## Drill 3 — el detalle `"   Hola   "`

<details><summary>Pista 1 — conceptual</summary>

Antes de medir el detalle, ¿qué le hace el validador?

</details>

<details><summary>Pista 2 — más concreta</summary>

Todas las reglas del detalle miran `datos.detalle.trim()`. Quítale los espacios del borde,
cuenta lo que queda, y recorre la cadena de reglas en orden.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected undefined to be 'El detalle debe tener al menos 10 car…' // Object.is equality
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: string | undefined = "El detalle debe tener al menos 10 caracteres";
// ¿Por qué? Porque las reglas miden el detalle limpio: `trim()` deja "Hola", que mide
// 4. Los 10 caracteres eran 6 de espacios.
```

Da igual que el drill 5 esté resuelto o no: `"Hola"` no está vacío y mide menos de 10, así
que con los dos órdenes sale el mismo mensaje.

</details>

---

## Drill 4 — el apellido vacío

<details><summary>Pista 1 — conceptual</summary>

Con el apellido vacío, ¿cuántas de sus reglas se miran? ¿Y cuál escribe la última?

</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos `if` sueltos. Con `""` fallan los dos, y el segundo pisa el mensaje del primero.
Tienen que ir encadenados (Teoría 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'El apellido debe tener al menos 2 car…' to be 'El apellido es obligatorio' // Object.is equality
```

</details>

<details><summary>Solución</summary>

```ts
if (datos.apellido.trim() === "") {
  errores.apellido = "El apellido es obligatorio";
} else if (datos.apellido.trim().length < 2) {
  errores.apellido = "El apellido debe tener al menos 2 caracteres";
}
```

Con el `else`, la regla de la longitud solo se mira si el apellido NO está vacío.

</details>

---

## Drill 5 — el detalle vacío

<details><summary>Pista 1 — conceptual</summary>

Las tres reglas están bien. Con el detalle vacío, ¿cuál se mira primero? ¿Y cuál debería
ganar?

</details>

<details><summary>Pista 2 — más concreta</summary>

En una cadena `else if` gana la primera que falla. `""` falla la de los 10 caracteres
antes de llegar a la de obligatorio, que así nunca se mira. Lo que hay que cambiar es el
orden, no las condiciones.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'El detalle debe tener al menos 10 car…' to be 'El detalle es obligatorio' // Object.is equality
```

</details>

<details><summary>Solución</summary>

```ts
if (datos.detalle.trim() === "") {
  errores.detalle = "El detalle es obligatorio";
} else if (datos.detalle.trim().length < 10) {
  errores.detalle = "El detalle debe tener al menos 10 caracteres";
} else if (datos.detalle.trim().length > 500) {
  errores.detalle = "El detalle no puede superar los 500 caracteres";
}
```

La regla más concreta ("está vacío") va antes que la más general ("es corto"), porque
todo lo vacío también es corto. Al revés, la concreta queda tapada.

</details>

---

## Drill 6 — los cuatro campos juntos

<details><summary>Pista 1 — conceptual</summary>

Hazlo campo por campo: limpia el dato, recorre su cadena de reglas en orden, y apunta solo
los que fallan.

</details>

<details><summary>Pista 2 — más concreta</summary>

Fallan tres campos y pasa uno, y el que pasa no aparece (drill 1). En el correo, mira qué
pide la expresión regular después de la `@`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { correo: 'El correo no es válido' } to strictly equal { …(3) }
```

Faltan dos claves.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: ErroresSolicitud = {
  nombre: "El nombre es obligatorio",
  correo: "El correo no es válido",
  detalle: "El detalle debe tener al menos 10 caracteres",
};
```

- **nombre** `"   "` → limpio es `""` → obligatorio (drill 2).
- **apellido** `"Pérez"` → pasa, así que no aparece.
- **correo** `"ana@mail"` → no está vacío, pero la regex pide un punto y al menos 2 letras
  después de la `@` → no válido.
- **detalle** `"Hola"` → no está vacío y mide 4 → la de los 10 caracteres (drill 5).

</details>
