# Pistas — exercise-10b · el reducer de tu `10`, case por case

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 7 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

---

## Drill 1 — "escribir" borra el error del servidor

<details><summary>Pista 1 — conceptual</summary>

En `errores` ya se borra una llave. ¿Cuál otra tiene que quedar en `""`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dentro del objeto de `errores`, después del spread, hace falta una segunda llave escrita a
mano: la del servidor, con el mismo valor que la del campo (Teoría 1, la copia con cambio).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'Sin conexión' to be falsy
```

</details>

<details><summary>Solución</summary>

```ts
errores: { ...estado.errores, [accion.campo]: "", servidor: "" },
```

El spread conserva los errores de los otros campos; `servidor: ""` apaga el aviso viejo.

</details>

---

## Drill 2 — "escribir" desde "error"

<details><summary>Pista 1 — conceptual</summary>

El ternario de `fase` pregunta por una sola fase. ¿Cuántas tiene que aceptar ahora?

</details>

<details><summary>Pista 2 — más concreta</summary>

La condición del ternario tiene que ser verdadera si la fase es "enviado" **o** "error".
Hay un operador para "o".

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'error' to be 'editando'
```

</details>

<details><summary>Solución</summary>

```ts
fase: estado.fase === "enviado" || estado.fase === "error" ? "editando" : estado.fase,
```

Cada lado del `||` es una comparación completa. `estado.fase === "enviado" || "error"` no
sirve: el lado derecho sería el string `"error"` a secas, que siempre cuenta como verdadero.

</details>

---

## Drill 3 — lo que cambia "envioFallido"

<details><summary>Pista 1 — conceptual</summary>

Mira el `return` del case: ¿qué llaves están escritas después del spread?

</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos. `datos` no aparece: llega del spread tal cual.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 'fase' ] to deeply equal [ 'errores', 'fase' ]
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: (keyof EstadoSolicitud)[] = ["errores", "fase"];
```

Y fíjate en que `datos` se queda: si el servidor falla, el usuario no pierde lo que
escribió y puede reintentar.

</details>

---

## Drill 4 — los errores después de "envioFallido"

<details><summary>Pista 1 — conceptual</summary>

¿"envioFallido" copia los errores o los reemplaza?

</details>

<details><summary>Pista 2 — más concreta</summary>

`errores: { servidor: accion.mensaje }` no lleva `...estado.errores` delante: es un objeto
nuevo desde cero (Teoría 1, el reemplazo). Lo que no esté escrito ahí, desaparece.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { …(2) } to strictly equal { servidor: 'Sin conexión' }
```

Sobra una llave.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta4: ErroresSolicitud = { servidor: "Sin conexión" };
// ¿Por qué? Porque "envioFallido" reemplaza los errores por un objeto nuevo que solo
// tiene `servidor`. Como no hay spread de los errores viejos, el del correo se pierde.
```

En la práctica nunca habría un error de correo aquí: "envioIniciado" ya los dejó en `{}`.
Pero el mecanismo es el que importa.

</details>

---

## Drill 5 — el guard de "envioFallido"

<details><summary>Pista 1 — conceptual</summary>

¿De qué fase tiene que venir un envío para poder fallar?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` antes del `return` que pregunte "¿no vengo de enviando?" y, si es así, devuelva
`estado`. Es el mismo guard que ya tiene "envioCompletado", justo encima.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { Object (datos, errores, ...) } to be { Object (datos, errores, ...) }
```

Mismo contenido o no, el test pide el MISMO objeto.

</details>

<details><summary>Solución</summary>

```ts
case "envioFallido":
  if (estado.fase !== "enviando") return estado;
  return { ...estado, errores: { servidor: accion.mensaje }, fase: "error" };
// ¿Por qué el mismo estado? Porque no cambió nada. Devolviendo el mismo objeto, React ve
// que es igual al de antes y no vuelve a pintar; una copia sería un objeto nuevo y
// repintaría para nada.
```

</details>

---

## Drill 6 — "envioCompletado" vacía el formulario

<details><summary>Pista 1 — conceptual</summary>

El enunciado pide dos cosas en el destino. ¿Cuál de las dos no está en el `return`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta la llave que deja el formulario en blanco. Ya tienes una constante con los cuatro
campos vacíos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { nombre: 'Ana', …(3) } to deeply equal { nombre: '', apellido: '', …(2) }
```

</details>

<details><summary>Solución</summary>

```ts
return { ...estado, datos: vacios, errores: {}, fase: "enviado" };
```

</details>

---

## Drill 7 — cuatro acciones seguidas

<details><summary>Pista 1 — conceptual</summary>

Hazlo en una tabla, fila por fila: lo que sale de una acción entra en la siguiente.

</details>

<details><summary>Pista 2 — más concreta</summary>

El último paso es un "escribir": mira qué hace con `servidor` (drill 1) y con la fase
cuando viene de "error" (drill 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { Object (datos, errores, ...) } to deeply equal { Object (datos, errores, ...) }
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta7: EstadoSolicitud = {
  datos: { ...vacios, nombre: "Ana", apellido: "P" },
  errores: { servidor: "", apellido: "" },
  fase: "editando",
};
```

| Acción | datos | errores | fase |
|---|---|---|---|
| inicio | vacíos | `{}` | editando |
| escribir "Ana" | nombre: "Ana" | `{ nombre: "", servidor: "" }` | editando |
| envioIniciado | nombre: "Ana" | `{}` | enviando |
| envioFallido | nombre: "Ana" | `{ servidor: "Sin conexión" }` | error |
| escribir "P" | nombre "Ana", apellido "P" | `{ servidor: "", apellido: "" }` | editando |

Los datos sobreviven al fallo: el usuario solo tiene que corregir y volver a enviar.

</details>
