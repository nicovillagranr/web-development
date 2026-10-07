# Pistas — exercise-10 · el reducer, un case a la vez

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 6 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

---

## Drill 1 — lo que cambia "rechazar"

<details><summary>Pista 1 — conceptual</summary>

Lee el `return` del case parte por parte. Lo que viene del spread se queda; lo que está
escrito después, cambia.

</details>

<details><summary>Pista 2 — más concreta</summary>

Después de `...estado` hay dos claves escritas a mano. Las dos cuentan, aunque una de
ellas a veces ya tuviera ese valor.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 'errores' ] to deeply equal [ 'errores', 'fase' ]
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: (keyof EstadoSolicitud)[] = ["errores", "fase"];
```

`datos` viene del spread: es lo que el paso deja igual. `errores` y `fase` se escriben
encima. El orden del array no importa; el test lo ordena antes de comparar.

</details>

---

## Drill 2 — `inicial` frente a la copia sobrescrita

<details><summary>Pista 1 — conceptual</summary>

En la versión del compañero, ¿qué parte de `...estado` sobrevive al final?

</details>

<details><summary>Pista 2 — más concreta</summary>

El estado tiene tres claves. Cuenta cuántas sobrescribe la versión del compañero después
del spread, y con qué valores. Compáralos con los de `inicial`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected false to be true
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: boolean = true;
// ¿Por qué? Las tres claves del estado se sobrescriben después del spread, así que no
// queda nada del estado viejo: el resultado es { datos: vacios, errores: {}, fase:
// "editando" }, que es justo lo que vale `inicial`.
```

El contenido es el mismo, pero no el objeto: la copia es un objeto nuevo en cada llamada,
e `inicial` siempre es el mismo. Para el formulario da igual; las dos versiones valen.

</details>

---

## Drill 3 — "escribir" desde "enviado"

<details><summary>Pista 1 — conceptual</summary>

Hoy el case no dice nada de `fase`, así que se queda la que venía en el spread. ¿En qué
caso tiene que ser otra?

</details>

<details><summary>Pista 2 — más concreta</summary>

Hace falta una clave `fase` más en el objeto que se devuelve, y su valor depende de la
fase de antes: una condición que elige entre dos valores. Ojo: desde "enviando" se queda
"enviando", no pasa a "editando".

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'enviado' to be 'editando'
```

</details>

<details><summary>Solución</summary>

```ts
case "escribir":
  return {
    ...estado,
    datos: { ...estado.datos, [accion.campo]: accion.valor },
    errores: { ...estado.errores, [accion.campo]: "" },
    fase: estado.fase === "enviado" ? "editando" : estado.fase,
  };
```

El ternario elige: si estaba "enviado", "editando"; si no, la misma fase que tenía. Es lo
que hace el `handleChange` de Projex con su `if (status === "enviado")`, pero dentro del
reducer.

</details>

---

## Drill 4 — "empezar" con guard

<details><summary>Pista 1 — conceptual</summary>

¿En qué fase no tiene sentido empezar a enviar? Para esa fase, el case no debería
construir nada.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` al principio del case que pregunte por esa fase y devuelva `estado` sin tocarlo
(Teoría 2). El `return` de siempre queda debajo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { Object (datos, errores, ...) } to be { Object (datos, errores, ...) }
Received: serializes to the same string
```

"Serializes to the same string": el contenido es igual, pero es otro objeto. El test pide
el MISMO.

</details>

<details><summary>Solución</summary>

```ts
case "empezar":
  if (estado.fase === "enviando") return estado;
  return { ...estado, errores: {}, fase: "enviando" };
// ¿Por qué el mismo estado? Porque no cambió nada. Si devuelvo el mismo objeto, React
// ve que es igual al de antes y no vuelve a pintar; una copia sería un objeto nuevo y
// React repintaría para nada.
```

</details>

---

## Drill 5 — "terminar"

<details><summary>Pista 1 — conceptual</summary>

El enunciado pide dos reglas: qué pasa cuando terminar vale, y cuándo no vale. El starter
no cumple ninguna de las dos del todo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un guard como el del drill 4, pero preguntando por las fases en las que terminar NO vale.
Y en el `return`, además de `fase`, otra clave más: la que deja el formulario vacío. Ya
tienes una constante con los tres campos en blanco.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { nombre: 'Ana', …(2) } to deeply equal { nombre: '', correo: '', detalle: '' }
```

`datos` sigue con lo que escribió el usuario.

</details>

<details><summary>Solución</summary>

```ts
case "terminar":
  if (estado.fase !== "enviando") return estado;
  return { ...estado, datos: vacios, fase: "enviado" };
```

El guard usa `!==`: "si no estás enviando, no hay nada que terminar". Y `datos: vacios`
sobrescribe lo que trajo el spread. Es el mismo arreglo que pide el drill 7 del `09`.

</details>

---

## Drill 6 — tres acciones seguidas

<details><summary>Pista 1 — conceptual</summary>

Haz la cuenta paso a paso, en papel: el estado que sale de una acción es el que entra en
la siguiente.

</details>

<details><summary>Pista 2 — más concreta</summary>

Después de escribir, `errores` tiene `nombre: ""`. Mira qué hace "empezar" con los errores,
y qué hace "terminar" con los datos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { Object (datos, errores, ...) } to deeply equal { datos: { nombre: '', …(2) }, …(2) }
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: EstadoSolicitud = { datos: vacios, errores: {}, fase: "enviado" };
```

| Acción | datos | errores | fase |
|---|---|---|---|
| inicio | vacíos | `{}` | editando |
| escribir "Ana" | nombre: "Ana" | `{ nombre: "" }` | editando |
| empezar | nombre: "Ana" | `{}` | enviando |
| terminar | vacíos | `{}` | enviado |

</details>
