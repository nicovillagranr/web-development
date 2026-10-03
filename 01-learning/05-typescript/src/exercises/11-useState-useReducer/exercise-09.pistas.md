# Pistas — exercise-09 · el formulario entero, pieza por pieza

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 8 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

Los drills 4 y 8 usan el formulario entero. Si el drill 1 no está resuelto, lo que
escribes no llega a `datos` y esos tests fallan también por él: resuelve en orden.

---

## Drill 1 — "escribir", el texto en su sitio

<details><summary>Pista 1 — conceptual</summary>

¿En qué nivel del estado vive `usuario`? ¿Y en qué nivel lo deja el starter?

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter pone la clave en el primer nivel, al lado de `datos`, `errores` y `fase`. Hay
que llegar un nivel más adentro, copiando ese nivel también (Teoría 1).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { usuario: '', correo: '', clave: '' } to deeply equal { usuario: 'ana', correo: '', …(1) }
```

`datos` salió intacto: el "ana" se quedó fuera, suelto en el estado.

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return {
    ...estado,
    datos: { ...estado.datos, [accion.campo]: accion.valor },
  };
```

Dos copias: la del estado y la de `datos`. Y dentro, la clave calculada del `07`.

</details>

---

## Drill 2 — "escribir", borrar el error del campo

<details><summary>Pista 1 — conceptual</summary>

Los errores también están en un objeto anidado. ¿Qué hiciste en el drill 1 para cambiar
una clave de `datos`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo mismo con `errores`: copiarlo entero y pisar solo la clave del campo, con `""`. Va en
el mismo `return` que el drill 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'Muy corto' to be falsy
```

Escribiste en "usuario" y su error siguió ahí.

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return {
    ...estado,
    datos: { ...estado.datos, [accion.campo]: accion.valor },
    errores: { ...estado.errores, [accion.campo]: "" },
  };
```

`""` y no `undefined`: este repo tiene `exactOptionalPropertyTypes`, que no deja escribir
`undefined` en una clave opcional. Y `""` ya no pinta nada, porque el JSX pregunta con
`estado.errores.usuario &&`.

</details>

---

## Drill 3 — `respuesta3`

<details><summary>Pista 1 — conceptual</summary>

`{ [accion.campo]: accion.valor }` es un objeto nuevo. ¿Cuántas claves tiene?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es el drill 4 del `05`: pisar un objeto anidado entero con uno que no trae todas sus
claves. ¿Qué devuelve JavaScript cuando lees una clave que no existe?

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected '' to be undefined
```

Ojo: la respuesta es el valor `undefined`, sin comillas. `"undefined"` sería un texto.

</details>

<details><summary>Solución</summary>

`undefined`. El objeto nuevo solo tiene `usuario`. El correo no estaba vacío: ya no
existe. TypeScript lo avisaba con `TS2739` ("is missing the following properties"), pero
el test se ejecuta sin typecheck.

</details>

---

## Drill 4 — `FormRegistro`, la clave que no se limpia

<details><summary>Pista 1 — conceptual</summary>

El reducer deja la clave vacía. Entonces, ¿de dónde sale el texto que sigue en el campo?

</details>

<details><summary>Pista 2 — más concreta</summary>

Compara los tres `<input>`. Dos leen su texto del estado y uno no: ese guarda el suyo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected the element to have value:

Received:
  secreta1
```

</details>

<details><summary>Solución</summary>

```tsx
<input
  aria-label="Clave"
  placeholder="Clave"
  type="password"
  value={estado.datos.clave}
  onChange={(e) => pedir({ tipo: "escribir", campo: "clave", valor: e.target.value })}
/>
```

Sin `value`, el input guardaba su propio texto. Al escribir parecía ir bien, porque el
`onChange` también avisaba al estado, pero cuando el estado cambió por otra vía (Limpiar),
el input no se enteró.

</details>

---

## Drill 5 — `respuesta5`

<details><summary>Pista 1 — conceptual</summary>

¿Quién se entera primero de que pulsaste una tecla?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sigue el código de un input: `onChange={(e) => pedir(…)}`. Lo que hay dentro del
`onChange` se ejecuta después de que el input avise. Y React pinta con el estado que
calcula el reducer.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 'pedir', 'onChange', 'render', …(1) ] to deeply equal [ 'onChange', 'pedir', …(2) ]
```

</details>

<details><summary>Solución</summary>

`["onChange", "pedir", "formReducer", "render"]`. El input avisa, el manejador deja el
papel, React calcula con el reducer y vuelve a pintar el input con el texto nuevo. Por
eso el texto que ves es el del estado: el input lo dibuja después de que el reducer lo
guarda.

</details>

---

## Drill 6 — `validarRegistro`

<details><summary>Pista 1 — conceptual</summary>

Mira cómo se valida el usuario. La clave pide lo mismo con otro número.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` más, sobre `datos.clave.length`, que llene `errores.clave` con el texto exacto del
enunciado.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected {} to deeply equal { Object (clave) }
```

Con una clave de 7 caracteres, la función no encontró ningún error.

</details>

<details><summary>Solución</summary>

```ts
if (datos.clave.length < 8) {
  errores.clave = "La clave debe tener al menos 8 caracteres";
}
```

Sin `trim()` a propósito: en una clave, los espacios cuentan.

</details>

---

## Drill 7 — "terminar"

<details><summary>Pista 1 — conceptual</summary>

El enunciado pide dos cambios al terminar. ¿Cuántos hace el starter?

</details>

<details><summary>Pista 2 — más concreta</summary>

Pasa a "enviado", pero se olvida de `datos`. Ya tienes un objeto con los tres campos
vacíos escrito arriba.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { usuario: 'ana', …(2) } to deeply equal { usuario: '', correo: '', clave: '' }
```

</details>

<details><summary>Solución</summary>

```ts
case "terminar":
  if (estado.fase !== "enviando") return estado;
  return { ...estado, datos: vacios, fase: "enviado" };
```

`datos: vacios` pisa el objeto entero a propósito: aquí sí quieres que no quede nada del
anterior (como el "restablecer" del drill 9 del `05`).

</details>

---

## Drill 8 — `enviar`

<details><summary>Pista 1 — conceptual</summary>

Acabas de calcular los errores. ¿Con qué objeto decide el `if`?

</details>

<details><summary>Pista 2 — más concreta</summary>

`estado.errores` es la foto de este render: el `08` otra vez. Los errores nuevos están
en una constante de la línea de arriba.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: El correo no es válido
```

Con el formulario vacío, no salió ningún error: el `if` miró la foto, que tenía `{}`.

</details>

<details><summary>Solución</summary>

```tsx
const errores = validarRegistro(estado.datos);
if (Object.keys(errores).length > 0) {
  pedir({ tipo: "rechazar", errores });
  return;
}
```

La decisión se toma con el resultado que acabas de calcular. `estado.errores` sirve para
PINTAR los errores (en el JSX, en el render siguiente), no para decidir en el manejador.

</details>
