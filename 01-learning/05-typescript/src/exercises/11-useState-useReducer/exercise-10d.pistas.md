# Pistas — exercise-10d · inputs controlados y errores en el JSX

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los drills 1 a 5 compilan: su Pista 3 es lo que dice el test. El 6 da error en el test y
también en `pnpm typecheck`, y su Pista 3 cita los dos.

---

## Drill 1 — `CampoNombre`

<details><summary>Pista 1 — conceptual</summary>

El input enseña lo que hay en el estado. Cuando escribes, ¿quién le avisa al estado?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tiene `value` pero le falta la otra mitad, `onChange` (Teoría 1). Y para avisar hace falta
`pedir`, que el starter no saca del `useReducer`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected the element to have value:
  Ana
Received:
```

Las teclas llegan, pero el estado sigue en `""` y el input vuelve a pintar `""`.

</details>

<details><summary>Solución</summary>

```tsx
const [estado, pedir] = useReducer(solicitudReducer, inicial);
return (
  <input
    aria-label="Nombre"
    placeholder="Nombre"
    value={estado.datos.nombre}
    onChange={(e) => pedir({ tipo: "escribir", campo: "nombre", valor: e.target.value })}
  />
);
```

React también avisa en la consola: un `value` sin `onChange` deja el campo en solo
lectura.

</details>

---

## Drill 2 — `CampoCorreo`

<details><summary>Pista 1 — conceptual</summary>

Las dos mitades están. ¿Hablan del mismo campo?

</details>

<details><summary>Pista 2 — más concreta</summary>

`value` lee un campo y `onChange` escribe en otro. El texto se guarda, pero donde el input
no mira (Teoría 1, la trampa).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected the element to have value:
  ana@mail.cl
Received:
```

</details>

<details><summary>Solución</summary>

```tsx
onChange={(e) => pedir({ tipo: "escribir", campo: "correo", valor: e.target.value })}
```

Es el mismo fallo que el `FormReserva` del `07`: `keyof` deja pasar cualquiera de las
tres claves, así que solo lo caza el test.

</details>

---

## Drill 3 — `CampoDetalle`

<details><summary>Pista 1 — conceptual</summary>

"Limpiar" sí vacía el estado. ¿El input se entera?

</details>

<details><summary>Pista 2 — más concreta</summary>

Le falta `value`: el input guarda su propio texto y no mira el estado. Para leerlo, el
starter tampoco saca `estado` del `useReducer`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected the element to have value:

Received:
  Una landing
```

</details>

<details><summary>Solución</summary>

```tsx
const [estado, pedir] = useReducer(solicitudReducer, inicial);
// …
<input
  aria-label="Detalle"
  placeholder="Detalle"
  value={estado.datos.detalle}
  onChange={(e) => pedir({ tipo: "escribir", campo: "detalle", valor: e.target.value })}
/>
```

Es el drill 4 del `09` otra vez.

</details>

---

## Drill 4 — `ErrorNombre`

<details><summary>Pista 1 — conceptual</summary>

El `<p>` está siempre en el JSX, haya error o no. ¿Cómo se pinta algo solo a veces?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con `&&` delante del `<p>`: a la izquierda, lo que tiene que existir para pintarlo
(Teoría 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected <p role="alert"></p> to be null
```

</details>

<details><summary>Solución</summary>

```tsx
{estado.errores.nombre && <p role="alert">{estado.errores.nombre}</p>}
```

</details>

---

## Drill 5 — lo que pinta un error en ""

<details><summary>Pista 1 — conceptual</summary>

¿`""` es truthy o falsy?

</details>

<details><summary>Pista 2 — más concreta</summary>

Si la izquierda de `&&` es falsy, `&&` devuelve la izquierda y no mira la derecha: el `<p>`
ni se crea. Y un `""` suelto en el JSX no pinta nada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected: "ningún <p>"
Received: "un <p> vacío"
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: Pinta = "ningún <p>";
// ¿Por qué? Porque "" es falsy: `"" && <p>…</p>` da "", y React no pinta nada con un
// string vacío. Por eso el reducer puede "borrar" un error dejándolo en "" en vez de
// quitar la clave.
```

Ojo con el `0`: también es falsy, pero React SÍ lo pinta. `{0 && <p>…</p>}` deja un "0"
en la pantalla. Con strings de error no pasa, pero con contadores sí.

</details>

---

## Drill 6 — `ErrorCorreo`

<details><summary>Pista 1 — conceptual</summary>

`aria-invalid` no quiere el mensaje; quiere un sí o un no.

</details>

<details><summary>Pista 2 — más concreta</summary>

Hay que convertir el error (`string | undefined`) en un `boolean`: con texto, `true`; con
`undefined` o `""`, `false`.

</details>

<details><summary>Pista 3 — lo que dicen el test y el compilador</summary>

```
Expected the element to have attribute:
  aria-invalid="true"
Received:
  aria-invalid="El correo no es válido"
```

```
error TS2322: … Types of property '"aria-invalid"' are incompatible.
  Type 'string | undefined' is not assignable to type 'boolean | "true" | "false" | "grammar" | "spelling" | undefined'.
```

</details>

<details><summary>Solución</summary>

```tsx
aria-invalid={Boolean(estado.errores.correo)}
```

`Boolean("El correo…")` da `true`; `Boolean("")` y `Boolean(undefined)`, `false`. Es lo
que hace Projex en su `ContactForm`. `!!estado.errores.correo` hace lo mismo, más corto.

</details>
