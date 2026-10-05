# Pistas — exercise-08 · `pedir` anota, el estado llega después

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 10 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
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

## Drill 3a — `Carrito`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 3 con otro nombre. En la quinta pulsación, ¿qué número de unidades mira
el `if`?

</details>

<details><summary>Pista 2 — más concreta</summary>

La acción ya la tienes guardada en una constante. Con ella y la foto puedes calcular
cuántas unidades habrá después. Es la última columna de la `DemoFoto`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: Carrito lleno
```

Después de la quinta pulsación el aviso todavía no sale: el `if` miró un 4.

</details>

<details><summary>Solución</summary>

```tsx
pedir(accion);
if (carritoReducer(unidades, accion) === 5) {
  setAviso("Carrito lleno");
}
```

</details>

---

## Drill 3b — `Marcador`

<details><summary>Pista 1 — conceptual</summary>

Si cambias el 50 por otro número para compensar el clic de retraso, ¿por cuánto lo
cambias? Prueba con los dos botones.

</details>

<details><summary>Pista 2 — más concreta</summary>

Un acierto suma 10 y un bonus 25, así que no hay un único número que compense el
retraso. Lo que sí sirve en los dos casos es calcular los puntos de después con la
misma regla que usa React.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: ¡Nivel superado!
```

Con cinco aciertos el marcador llega a 50, pero el `if` miró un 40.

</details>

<details><summary>Solución</summary>

```tsx
const sumar = (accion: AccionPuntos) => {
  pedir(accion);
  if (puntosReducer(puntos, accion) >= 50) {
    setAviso("¡Nivel superado!");
  }
};
```

Por esto el número mágico del drill 3 (`votos === 2`) es frágil: solo funciona
mientras cada clic sume lo mismo. Con `puntos >= 40` pasa la ronda de aciertos y falla
la de bonus (25 + 25 = 50, pero el `if` mira un 25).

</details>

---

## Drill 3c — `Sala`

<details><summary>Pista 1 — conceptual</summary>

El aviso no es un dato nuevo: se puede saber mirando `personas`. ¿Hace falta guardarlo
aparte?

</details>

<details><summary>Pista 2 — más concreta</summary>

El JSX se ejecuta en cada render, con la foto nueva. Si decides allí qué texto va en el
`<p role="status">`, nunca vas un clic tarde, y al vaciar la sala el texto cambia solo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Unable to find an element with the text: Sala completa
```

Con la cuarta persona el aviso todavía no sale. Y si lo arreglas solo con el reducer,
el test se queda rojo al final, porque "Vaciar" no borra el aviso guardado.

</details>

<details><summary>Solución</summary>

```tsx
const entrar = () => {
  pedir({ tipo: "entrar" });
};

// …
<p role="status">{personas >= 4 ? "Sala completa" : ""}</p>
```

Sin `useState` para el aviso. El manejador solo pide, y el render, que siempre tiene la
foto nueva, decide qué se ve. Un dato que se puede calcular a partir del estado no se
guarda: se calcula al pintar.

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
expected 'cancelada' to be 'preparada'
```

</details>

<details><summary>Solución</summary>

`"preparada"`. Es la fase de la foto en que pulsaste "Transferir". Ni el "empezar" que pidió
el propio manejador ni el "Cancelar" de después cambian esa variable: cambian el estado,
que llega en otros renders. Por eso el `if (fase !== "cancelada")` de `transferir` nunca
frena nada: siempre lee "preparada".

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
