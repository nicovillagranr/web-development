# Pistas — exercise-06 · una regla dentro de la copia

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 9 starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va lo que dice
el test. Cuando el mensaje es `expected {…} to be {…}` con dos objetos que se ven iguales,
el test no dice "son distintos", dice "**no es el mismo**": devolviste una copia donde
tocaba devolver lo que llegó.

Todas las reglas salen del bloque **📌 LAS REGLAS DE LA TIENDA**, arriba del archivo.

---

## Drill 1 — `siguienteFase`

<details><summary>Pista 1 — conceptual</summary>

Hay tres fases de entrada. ¿En cuántas cambia la salida?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una pregunta por cada fase que cambia, y la que no cambia se devuelve tal cual. Mira el
`siguienteLuz` de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'carrito' to be 'pagado'
```

El starter devuelve la fase que entra, sin preguntar nada.

</details>

<details><summary>Solución</summary>

```ts
if (fase === "carrito") return "pagado";
if (fase === "pagado") return "enviado";
return fase;
```

Vale igual un `switch`. El `return fase` final es el caso de "enviado": la regla también
dice qué pasa con la fase que no se mueve.

</details>

---

## Drill 2 — `puedeCambiarCantidad`

<details><summary>Pista 1 — conceptual</summary>

Relee la primera regla de la tienda. ¿En cuántas fases se puede?

</details>

<details><summary>Pista 2 — más concreta</summary>

El starter deja cambiarla en todas menos en "enviado". La regla es más estricta: una sola
fase.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected true to be false
```

Con "pagado", el starter dice que sí se puede.

</details>

<details><summary>Solución</summary>

```ts
return fase === "carrito";
```

Una comparación ya ES un booleano: no hace falta un `if` que devuelva `true` o `false`.

</details>

---

## Drill 3 — `cambiarCantidad`

<details><summary>Pista 1 — conceptual</summary>

El starter cambia la cantidad siempre. ¿Qué dice la regla cuando el pedido ya está pagado?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un `if` antes del `return` que salga devolviendo el pedido que llegó cuando no se puede.
La pregunta ya la escribiste: es el drill 2.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { producto: 'Café', cantidad: 3, …(1) } to be { producto: 'Café', cantidad: 1, …(1) }
```

Con el pedido "pagado", la cantidad cambió a 3 y además salió un objeto nuevo.

</details>

<details><summary>Solución</summary>

```ts
if (!puedeCambiarCantidad(pedido.fase)) return pedido;
return { ...pedido, cantidad };
```

</details>

---

## Drill 4 — `pagar`

<details><summary>Pista 1 — conceptual</summary>

¿Desde qué fase se puede pagar? ¿Y qué pasa si pagas algo ya pagado?

</details>

<details><summary>Pista 2 — más concreta</summary>

Igual que el 3: una salida temprana con el pedido que llegó, y después la copia con la
fase nueva.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { producto: 'Café', cantidad: 1, …(1) } to be { producto: 'Café', cantidad: 1, …(1) }
```

Los dos se ven iguales porque el pedido ya estaba "pagado": el starter lo "pagó otra vez"
con una fotocopia.

</details>

<details><summary>Solución</summary>

```ts
if (pedido.fase !== "carrito") return pedido;
return { ...pedido, fase: "pagado" };
```

</details>

---

## Drill 5 — `respuesta5`

<details><summary>Pista 1 — conceptual</summary>

React no mira si la pantalla cambiaría. ¿Qué mira para decidir si repinta?

</details>

<details><summary>Pista 2 — más concreta</summary>

Compara el estado nuevo con el anterior con la misma pregunta que `toBe`: ¿es el mismo
objeto? Piensa en el drill 5 del `05`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

React compara con `Object.is(anterior, nuevo)`. `{ ...estado }` nunca es `Object.is` igual
a `estado`.

</details>

<details><summary>Solución</summary>

`"repinta"`. El objeto es nuevo, así que para React "algo cambió", aunque todos los valores
sean los mismos. Es el ascensor que abre y cierra la puerta para nada. Con `return estado`
no repinta.

</details>

---

## Drill 6 — `faseTrasCambiarProducto`

<details><summary>Pista 1 — conceptual</summary>

Tres entradas. ¿En cuántas cambia la salida?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una sola pregunta: si es "pagado", una respuesta; si no, la que llegó. Es el
`trasEscribir` del `04b` con otras fases.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected 'pagado' to be 'carrito'
```

</details>

<details><summary>Solución</summary>

```ts
return fase === "pagado" ? "carrito" : fase;
```

</details>

---

## Drill 7 — `cambiarProducto`

<details><summary>Pista 1 — conceptual</summary>

El producto ya cambia. ¿Qué campo del objeto que devuelves no está nombrando nadie? ¿Y qué
pasa con un pedido "enviado"?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos piezas que ya tienes: la salida temprana del drill 3 para "enviado", y la clave `fase`
con la regla del drill 6, en el mismo objeto que el producto.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { producto: 'Té', cantidad: 1, …(1) } to deeply equal { producto: 'Té', cantidad: 1, …(1) }
```

El `…(1)` escondido es la fase: con el pedido "pagado", sale "pagado" y se esperaba
"carrito". Es el drill 2 del `04` otra vez.

</details>

<details><summary>Solución</summary>

```ts
if (pedido.fase === "enviado") return pedido;
return { ...pedido, producto, fase: faseTrasCambiarProducto(pedido.fase) };
```

</details>

---

## Drill 8 — `pedidoReducer`, `case "sumar"`

<details><summary>Pista 1 — conceptual</summary>

Mira los otros dos `case` que ya están bien. ¿Qué hacen ellos que este no hace?

</details>

<details><summary>Pista 2 — más concreta</summary>

La regla de la cantidad ya existe en una función tuya. Este `case` puede usarla en vez de
copiar a mano.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { producto: 'Café', cantidad: 2, …(1) } to be { producto: 'Café', cantidad: 1, …(1) }
```

Con el pedido "pagado", "sumar" subió la cantidad a 2.

</details>

<details><summary>Solución</summary>

```ts
case "sumar":
  return cambiarCantidad(estado, estado.cantidad + 1);
```

Las reglas viven en una sola función, y el reducer solo decide cuál llamar.

</details>

---

## Drill 9 — `pedidoReducer`, `case "enviar"`

<details><summary>Pista 1 — conceptual</summary>

En pantalla: pulsa Enviar sin pagar. ¿Debería salir el pedido?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una salida temprana con `estado` cuando no viene de "pagado", como en el drill 4.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected { producto: 'Café', cantidad: 1, …(1) } to be { producto: 'Café', cantidad: 1, …(1) }
```

Desde "carrito", el starter lo envió igual, y encima con un objeto nuevo.

</details>

<details><summary>Solución</summary>

```ts
case "enviar":
  if (estado.fase !== "pagado") return estado;
  return { ...estado, fase: "enviado" };
```

</details>
