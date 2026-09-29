# Pistas — exercise-04 · tu formulario de contacto, con un reducer

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Del 2 al 5 no hay función propia: cada drill es un `case` de `formReducer`, marcado con
`// ← drill N`. Y el 8 depende del 7: mientras "Nombre" no guarde lo que escribes, la
validación rechaza el envío y el 8 no puede pasar.

---

## Drill 1 — `Fase`

<details><summary>Pista 1 — conceptual</summary>

`textoDeFase` cubre tres fases con su `switch`. ¿Cuántas fases permite hoy el tipo `Fase`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con `string`, al `default` puede llegar cualquier texto que no sea uno de los tres, y el
`never` no lo acepta. Cambia `string` por la unión de los tres textos.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type 'string' is not assignable to type 'never'.
```

Es el mismo `never` del `03c`, pero ahora lo que se cuela no es un papel, sino "cualquier
otro texto".

</details>

<details><summary>Solución</summary>

```ts
export type Fase = "idle" | "enviando" | "enviado";
```

Es tu `EstadoEnvio` de Projex. Con la unión, `textoDeFase` queda completa y un
`fase: "sucess"` no compila.

</details>

---

## Drill 2 — "escribir"

<details><summary>Pista 1 — conceptual</summary>

La primera mitad ya funciona: el campo cambia. Relee la segunda mitad del enunciado.

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta una tercera propiedad en el objeto que se devuelve: `fase`. Su valor depende de la
fase que había: si era "enviado", pasa a "idle"; si no, se queda la que estaba.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla: el spread ya copia la fase vieja, así que el objeto está completo. El test:

```
AssertionError: expected 'enviado' to be 'idle'
```

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return {
    ...estado,
    datos: { ...estado.datos, [accion.campo]: accion.valor },
    fase: estado.fase === "enviado" ? "idle" : estado.fase,
  };
```

Es el `if (status === "enviado") setStatus("idle")` de tu `handleChange`, que ahora vive en
el reducer.

</details>

---

## Drill 3 — "rechazar"

<details><summary>Pista 1 — conceptual</summary>

El papel de "rechazar" trae algo. ¿Dónde acaba?

</details>

<details><summary>Pista 2 — más concreta</summary>

`accion.errores` existe dentro de este `case`, y tiene que acabar en la propiedad `errores`
del estado nuevo.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla. El test:

```
AssertionError: expected {} to deeply equal { name: 'El nombre es obligatorio' }
```

</details>

<details><summary>Solución</summary>

```ts
case "rechazar":
  return { ...estado, errores: accion.errores, fase: "idle" };
```

</details>

---

## Drill 4 — "empezar"

<details><summary>Pista 1 — conceptual</summary>

Antes de pasar a "enviando", el reducer tiene que mirar en qué fase está.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` al principio del `case`: si ya está enviando, devuelve el estado que recibió, sin
copiarlo. Si no, sigue como ahora.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla. El test:

```
AssertionError: expected { datos: { name: 'Ana', …(2) }, …(2) } to be { datos: { name: 'Ana', …(2) }, …(2) }
```

Parecen iguales, y por dentro lo son, pero `toBe` compara la llave, no el contenido. Tu
starter devuelve una copia nueva, y para React eso es "algo cambió".

</details>

<details><summary>Solución</summary>

```ts
case "empezar":
  if (estado.fase === "enviando") return estado;
  return { ...estado, errores: {}, fase: "enviando" };
```

Es la trampa de la Teoría 2: `{ ...estado }` sin cambios sigue siendo una llave nueva. "No
pasó nada" se dice con `return estado`.

</details>

---

## Drill 5 — "terminar"

<details><summary>Pista 1 — conceptual</summary>

Son dos reglas: desde qué fase se puede terminar, y qué pasa con los datos cuando termina.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` como el del 4, pero al revés: si la fase NO es "enviando", devuelve el estado tal
cual. Y en el estado nuevo, los datos son los vacíos. Hay una constante arriba que ya los
tiene.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla. El test:

```
AssertionError: expected { name: 'Ana', …(2) } to deeply equal { name: '', email: '', message: '' }
```

</details>

<details><summary>Solución</summary>

```ts
case "terminar":
  if (estado.fase !== "enviando") return estado;
  return { ...estado, datos: vacios, fase: "enviado" };
```

`vacios` se puede compartir entre estados sin miedo, porque nadie lo abre para cambiarlo:
es el "copiar solo hasta donde toques" del `03b`.

</details>

---

## Drill 6 — `respuesta6`

<details><summary>Pista 1 — conceptual</summary>

Como en el `03c`: una línea por papel, y cada línea empieza donde terminó la anterior.

</details>

<details><summary>Pista 2 — más concreta</summary>

`idle → empezar → ? → empezar → ? → terminar → ? → escribir → ?`. El segundo "empezar" y
el "escribir" final son los que tienen trampa: mira las reglas del 4 y del 2.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected 'enviando' to be …
```

Si te salió "enviado", te olvidaste de la segunda mitad del drill 2.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: Fase = "idle";
// ¿Por qué? idle → enviando → enviando (el segundo empezar no vale) → enviado → idle
// (escribir después de enviar vuelve a idle).
```

</details>

---

## Drill 7 — `FormContacto`, el campo "Nombre"

<details><summary>Pista 1 — conceptual</summary>

Compara el `onChange` de "Nombre" con los de "Correo" y "Mensaje".

</details>

<details><summary>Pista 2 — más concreta</summary>

El `campo` tiene que ser una de las claves de `Datos`, y "nombre" no lo es.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '"nombre"' is not assignable to type 'keyof Datos'.
```

En pantalla, cada tecla guarda el texto en `datos.nombre`, una propiedad que nadie lee, y
el input sigue mostrando `datos.name`, que no cambió.

</details>

<details><summary>Solución</summary>

```tsx
onChange={(e) => pedir({ tipo: "escribir", campo: "name", valor: e.target.value })}
```

Es la clase de errata que el `keyof` caza antes de que llegue a la pantalla.

</details>

---

## Drill 8 — `FormContacto`, el envío

<details><summary>Pista 1 — conceptual</summary>

Relee el ejemplo de la Teoría 3 y compáralo, paso por paso, con `enviar`.

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta un papel antes de la espera. Sin él, el "terminar" llega en fase "idle", y la regla
del drill 5 lo ignora.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`tsc` calla: no pedir algo no es un error de tipos. El test:

```
Unable to find an element with the text: Enviando…
```

</details>

<details><summary>Solución</summary>

```tsx
pedir({ tipo: "empezar" });
await esperar(300);
pedir({ tipo: "terminar" });
```

El componente solo cuenta lo que pasa, en orden. Que "terminar" sin "empezar" no haga nada
lo decide el reducer, no el componente.

</details>
