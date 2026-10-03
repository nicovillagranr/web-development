# Pistas — exercise-08 · `pedir` anota, el estado llega después

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 7 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test.

Los drills 5 y 7 viven en el mismo componente. Si el 5 no está resuelto, el test del 7
sale rojo también por él: resuélvelos en orden.

---

## Drill 1 — `respuesta1`

<details><summary>Pista 1 — conceptual</summary>

Las dos líneas `console.log` se ejecutan dentro del mismo manejador. ¿En qué render se
creó ese manejador?

</details>

<details><summary>Pista 2 — más concreta</summary>

`pedir` deja la acción en la cola y no toca la foto. Pedir dos veces no cambia eso: la
foto sigue siendo la misma hasta que el manejador termina.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected [ 1, 2 ] to deeply equal [ +0, +0 ]
```

El `+0` es como Vitest escribe el cero; para ti es un `0` normal.

</details>

<details><summary>Solución</summary>

`[0, 0]`. Las dos veces lees `votos` de la misma foto, la del render en que se pulsó el
botón. Los dos votos llegan juntos en el render siguiente, que ya pinta 2.

</details>

---

## Drill 2 — `respuesta2`

<details><summary>Pista 1 — conceptual</summary>

Las tres acciones van a la cola. Cuando React prepara el render siguiente, ¿qué le pasa
al reducer en cada una?

</details>

<details><summary>Pista 2 — más concreta</summary>

React no le pasa al reducer la foto vieja: le pasa el resultado del pedido anterior de
la cola. Es una cadena: lo que sale de uno entra en el siguiente.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 1 to be 3
```

</details>

<details><summary>Solución</summary>

`3`. React aplica la cola en orden: `votosReducer(0)` da 1, `votosReducer(1)` da 2 y
`votosReducer(2)` da 3. Es lo mismo que la forma funcional `setN((anterior) => anterior + 1)`
del `02`. Con `setN(n + 1)` tres veces saldría 1, porque las tres leerían la foto.

</details>

---

## Drill 3 — `VotoConMeta`

<details><summary>Pista 1 — conceptual</summary>

En el tercer clic, ¿qué valor tiene `votos` dentro de `votar`? ¿Y cuál quieres comparar
con 3?

</details>

<details><summary>Pista 2 — más concreta</summary>

Necesitas el número de DESPUÉS del voto, y la foto no lo tiene. Hay alguien que sabe
calcularlo a partir del de antes y de la acción.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: ¡Meta alcanzada!
```

Después del tercer clic, el aviso todavía no sale: el `if` miró un 2.

</details>

<details><summary>Solución</summary>

```tsx
pedir(accion);
if (votosReducer(votos, accion) === 3) {
  setAviso("¡Meta alcanzada!");
}
```

Calculas tú el siguiente con el mismo reducer que usará React, así que da el mismo
número. `votos + 1 === 3` también funciona, pero repite la regla del reducer fuera de él.
Otra opción, mejor todavía: no guardar el aviso en un estado y pintarlo directamente con
`{votos >= 3 && <p>…</p>}`, porque se deduce de `votos`.

</details>

---

## Drill 4 — `respuesta4`

<details><summary>Pista 1 — conceptual</summary>

Durante el `await`, ¿quién tiene el control: el manejador o React?

</details>

<details><summary>Pista 2 — más concreta</summary>

El manejador está en pausa, y React aprovecha para pintar con lo que hay en la cola.
¿Qué hay en la cola en ese momento?

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected '' to be 'Enviando…'
```

</details>

<details><summary>Solución</summary>

`"Enviando…"`. "empezar" se pidió antes de la pausa, así que React lo pinta mientras el
manejador espera. "terminar" llega al volver, y solo entonces cambia el texto.

</details>

---

## Drill 5 — `transferir`

<details><summary>Pista 1 — conceptual</summary>

Lee el manejador de arriba abajo. ¿Qué se ha pedido cuando empieza la espera?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es el cartel de "vuelvo en 5 minutos" de la Teoría 2: hoy se cuelga al volver.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expect(element).toHaveTextContent()
Expected element to have text content: Enviando…
Received:
```

Justo después del clic, el texto está vacío.

</details>

<details><summary>Solución</summary>

```tsx
pedir({ tipo: "empezar" });
await esperar(300);
```

Pedir antes de esperar: así React pinta "Enviando…" durante la pausa. Con el orden del
starter, "empezar" y "terminar" llegaban juntos al final y "Enviando…" no se veía nunca.

</details>

---

## Drill 6 — `respuesta6`

<details><summary>Pista 1 — conceptual</summary>

`transferir` es una función que se creó en un render concreto. ¿Cuál era la fase en ese
render?

</details>

<details><summary>Pista 2 — más concreta</summary>

Pulsar "Cancelar" provoca un render nuevo, con su propia foto y su propio `transferir`.
Pero el `transferir` que está esperando es el viejo, y ese no se entera.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'cancelada' to be 'lista'
```

</details>

<details><summary>Solución</summary>

`"lista"`. Es la fase de la foto en que pulsaste "Transferir". Ni el "empezar" que pidió
el propio manejador ni el "Cancelar" de después cambian esa variable: cambian el estado,
que llega en otros renders. Por eso el `if (fase !== "cancelada")` de `transferir` nunca
frena nada: siempre lee "lista".

</details>

---

## Drill 7 — `transferenciaReducer`, "terminar"

<details><summary>Pista 1 — conceptual</summary>

El manejador tiene una foto vieja. ¿Quién recibe siempre la fase de verdad, la de este
momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

React le pasa al reducer la fase actual en cada pedido. Dale a "terminar" la misma
regla que ya tiene "cancelar": solo vale desde una fase.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'enviada' to be 'cancelada'
```

Al reducer le llegó "terminar" con la transferencia cancelada, y la mandó igual.

</details>

<details><summary>Solución</summary>

```ts
case "terminar":
  return fase === "enviando" ? "enviada" : fase;
```

Ahora da igual lo que crea el manejador: el reducer ve que la fase es "cancelada" y
devuelve la misma. El `if` de `transferir` se queda sin trabajo y puedes borrarlo. Esto es
lo que gana un reducer: **las reglas van donde está el estado de verdad**, no en el
manejador, que solo ve la foto de cuando empezó.

</details>
