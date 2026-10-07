# Pistas — exercise-10c · enviar: decidir con lo de ahora, y en orden

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los drills 1 a 5 compilan: su Pista 3 es lo que dice el test. El 6 pasa el test, y su
Pista 3 es lo que dice `pnpm typecheck`.

---

## Drill 1 — los pasos de un envío bueno

<details><summary>Pista 1 — conceptual</summary>

Con datos buenos hay un paso de la lista que no se ejecuta nunca. Y de los otros, ¿cuál
tiene que pasar antes de la espera para que se vea durante ella?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sin errores no hay rechazo. Y "empezar" es lo que pone "Enviando…": tiene que ir antes de
"esperar" (Teoría 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 'preventDefault', 'validar', …(3) ] to deeply equal [ 'preventDefault', 'validar', …(3) ]
```

Los dos primeros y la cantidad están bien; falla el orden de los tres últimos.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: Paso[] = ["preventDefault", "validar", "empezar", "esperar", "terminar"];
```

</details>

---

## Drill 2 — los pasos de un envío rechazado

<details><summary>Pista 1 — conceptual</summary>

¿Qué hace el `return` que hay después del rechazo?

</details>

<details><summary>Pista 2 — más concreta</summary>

`return` corta la función ahí mismo: nada de lo que hay debajo se ejecuta (Teoría 1).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 'preventDefault', 'validar', …(4) ] to deeply equal [ 'preventDefault', 'validar', …(1) ]
```

Sobran tres pasos.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: Paso[] = ["preventDefault", "validar", "rechazar"];
```

</details>

---

## Drill 3 — `EnvioFoto`

<details><summary>Pista 1 — conceptual</summary>

La función calcula los errores en una línea y decide en la siguiente. ¿Decide con los que
acaba de calcular?

</details>

<details><summary>Pista 2 — más concreta</summary>

El `if` mira `estado.errores`, la foto de este render, que al principio es `{}`. Tiene que
mirar la constante recién calculada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: El nombre es obligatorio.
```

</details>

<details><summary>Solución</summary>

```ts
if (Object.keys(errores).length > 0) {
```

Es el mismo arreglo que el drill 8 del `09`: una palabra.

</details>

---

## Drill 4 — `EnvioSinReturn`

<details><summary>Pista 1 — conceptual</summary>

Con datos vacíos, el rechazo sí se pide. ¿Qué pasa con las líneas que vienen después?

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta cortar la función después del rechazo. Sin el corte, "empezar" borra los errores
recién puestos, y "terminar" marca la solicitud como enviada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: El nombre es obligatorio.
```

Los errores no se llegan a ver: "rechazar" y "empezar" se aplican antes del render.

</details>

<details><summary>Solución</summary>

```ts
if (Object.keys(errores).length > 0) {
  pedir({ tipo: "rechazar", errores });
  return;
}
```

</details>

---

## Drill 5 — `EnvioTarde`

<details><summary>Pista 1 — conceptual</summary>

¿Qué pinta la pantalla mientras la función está pausada en el `await`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Durante la espera, la fase sigue en "editando", porque "empezar" se pide después. Hay que
moverlo a antes del `await` (Teoría 2).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expect(element).toHaveTextContent()
Expected element to have text content:
  Enviando…
```

</details>

<details><summary>Solución</summary>

```ts
pedir({ tipo: "empezar" });
await esperar(1000);
pedir({ tipo: "terminar" });
```

Es el drill 5 del `08` otra vez, con otro nombre.

</details>

---

## Drill 6 — `EnvioTipado`

<details><summary>Pista 1 — conceptual</summary>

¿Qué elemento dispara el evento `submit`: el botón o el formulario?

</details>

<details><summary>Pista 2 — más concreta</summary>

`PanelEnvio` le pasa el manejador al `onSubmit` de un `<form>`. El parámetro del manejador
tiene que ser el evento de ese elemento (Teoría 2, la trampa).

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2322: Type '(e: FormEvent<HTMLButtonElement>) => Promise<void>' is not assignable to type '(e: FormEvent<HTMLFormElement>) => void'.
  Types of parameters 'e' and 'e' are incompatible.
    Type 'FormEvent<HTMLFormElement>' is not assignable to type 'FormEvent<HTMLButtonElement>'.
```

El error sale en la línea de `alEnviar={enviar}`, no en la del manejador: ahí es donde los
dos tipos se encuentran.

</details>

<details><summary>Solución</summary>

```ts
const enviar = async (e: FormEvent<HTMLFormElement>) => {
```

</details>
