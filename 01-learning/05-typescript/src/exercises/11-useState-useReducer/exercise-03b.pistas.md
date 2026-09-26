# Pistas — exercise-03b · no toques lo que te llega

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Aquí los diez starters compilan, así que ninguna Pista 3 cita a `tsc`: en su lugar va el
mensaje del test, que casi siempre dice lo mismo, *el que entró ya no es el que era*.

---

## Drill 1 — `respuesta1`

<details><summary>Pista 1 — conceptual</summary>

Antes de contestar, pregúntate dónde vive `nombre`: ¿escrito en la hoja o en una taquilla?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un texto va escrito en la hoja. `b.nombre = …` tacha y reescribe la hoja de `b`, que es
una fotocopia.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected '' to be 'Nico'
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta1: string = "Nico";
// ¿Por qué? El texto está escrito en la hoja, y la hoja de b es una fotocopia: tacharla no toca la de a.
```

</details>

## Drill 2 — `respuesta2`

<details><summary>Pista 1 — conceptual</summary>

`gustos` sí es una taquilla. Pero fíjate en qué se hace con ella: ¿se abre, o se hace
otra cosa?

</details>

<details><summary>Pista 2 — más concreta</summary>

`b.gustos = [...]` no abre la taquilla: cambia la llave que hay en la hoja de `b` por la
llave de una taquilla nueva. La de `a` sigue en su hoja, abriendo la taquilla de siempre.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected [] to deeply equal [ 'TS' ]
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta2: string[] = ["TS"];
// ¿Por qué? Asignar con = escribe en la hoja de b (cambia su llave). Solo abrir la taquilla (push) llegaría a a.
```

La regla corta: **`=` sobre una propiedad de la copia nunca llega al original.** Lo que
llega es meter la mano dentro: `push`, `pop`, `splice`, o `b.algo.otraCosa = …`.

</details>

## Drill 3 — `respuesta3`

<details><summary>Pista 1 — conceptual</summary>

Cuenta los puntos de `b.direccion.ciudad`. ¿En qué hoja estás escribiendo?

</details>

<details><summary>Pista 2 — más concreta</summary>

`b.direccion` es la llave. Con `.ciudad = …` abres esa taquilla y escribes dentro. Y la
llave es copia de la de `a`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected '' to be 'Lima'
```

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: string = "Lima";
// ¿Por qué? direccion es un objeto, o sea una taquilla compartida: escribir dentro lo ven las dos hojas.
```

Compáralo con el 2: allí se cambiaba la llave; aquí se abre la taquilla.

</details>

## Drill 4 — `subirContador`

<details><summary>Pista 1 — conceptual</summary>

El resultado que devuelve está bien. Lo que el test mira después es el objeto que le
pasaste.

</details>

<details><summary>Pista 2 — más concreta</summary>

`estado.contador = …` escribe en la hoja que te prestaron. Hace falta una hoja nueva,
con el contador ya cambiado, y devolver esa.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected 4 to be 3
```

Es `antes.contador`: después de la llamada vale 4.

</details>

<details><summary>Solución</summary>

```ts
return { ...estado, contador: estado.contador + 1 };
```

El número va escrito en la hoja, así que con copiar la hoja basta. El historial se
comparte, y no pasa nada: no lo tocas.

</details>

## Drill 5 — `anotar`

<details><summary>Pista 1 — conceptual</summary>

Es la pregunta que no supiste contestar: la copia existe, ¿pero qué taquilla abre
`copia.historial`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Hacen falta dos cosas nuevas: la hoja y la taquilla del historial. La taquilla nueva se
monta con lo que ya había más la entrada, sin abrir la vieja.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected [ 'a', 'b' ] to deeply equal [ 'a' ]
```

Es `antes.historial`: la `"b"` se coló en el original.

</details>

<details><summary>Solución</summary>

```ts
return { ...estado, historial: [...estado.historial, entrada] };
```

Es exactamente tu `nuevoHistorial` del `03`, en una línea.

</details>

## Drill 6 — `borrarEntrada`

<details><summary>Pista 1 — conceptual</summary>

El `{ ...estado }` del final llega tarde: la taquilla ya se abrió en la línea de arriba.

</details>

<details><summary>Pista 2 — más concreta</summary>

Necesitas un array nuevo con todas las entradas menos una. Hay un método de array que
devuelve uno nuevo quedándose solo con las que cumplen una condición, y su callback
también recibe la posición.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected [ 'a', 'c' ] to deeply equal [ 'a', 'b', 'c' ]
```

</details>

<details><summary>Solución</summary>

```ts
return { ...estado, historial: estado.historial.filter((_, i) => i !== indice) };
```

`splice` corta el array que tiene delante; `filter` monta otro. El `_` es el nombre de
costumbre para un parámetro que no usas: aquí solo interesa la posición.

</details>

## Drill 7 — `mudarse`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 3, pero escribiendo el código. ¿Cuántas hojas hay entre el perfil y la
ciudad?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos niveles: el perfil y la dirección. Cada nivel que cambias necesita su propia copia, y
la de dentro va como valor de `direccion` en la de fuera.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected 'Lima' to be 'Santiago'
```

Es `antes.direccion.ciudad`.

</details>

<details><summary>Solución</summary>

```ts
return { ...perfil, direccion: { ...perfil.direccion, ciudad } };
```

`{ ciudad }` es la abreviatura de `{ ciudad: ciudad }`. Un spread por nivel tocado: es la
TEORÍA 2 entera.

</details>

## Drill 8 — `alternarTarea`

<details><summary>Pista 1 — conceptual</summary>

`[...tareas]` es un array nuevo, pero ¿qué hay dentro? Una fila de llaves, copiadas.

</details>

<details><summary>Pista 2 — más concreta</summary>

Hay que recorrer la lista produciendo otra: la tarea que coincide sale como objeto nuevo
con `hecha` al revés, y las demás salen tal cual (esas no se tocan, así que compartirlas
está bien).

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected true to be false
```

Es `antes[0].hecha`: la tarea original quedó marcada.

</details>

<details><summary>Solución</summary>

```ts
return tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t));
```

`map` da el array nuevo y el spread da la tarea nueva: dos niveles, dos copias, como en
el 7.

</details>

## Drill 9 — `ListaCompra`

<details><summary>Pista 1 — conceptual</summary>

Pulsa el botón en el `App.tsx`. El array sí crece, pero la pantalla no se entera. ¿Qué
le das a `setLista`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Le devuelves la misma llave que ya tenía. React compara llaves, no mira dentro. Hay que
darle un array nuevo con la leche al final.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected [ 'pan' ] to deeply equal [ 'pan', 'leche', 'leche' ]
```

Ni un repintado en dos clicks.

</details>

<details><summary>Solución</summary>

```ts
setLista((anterior) => [...anterior, "leche"]);
```

Llave nueva, así que React repinta. La forma funcional es la del `02`; con
`[...lista, "leche"]` también pasa.

</details>

## Drill 10 — `notasReducer`

<details><summary>Pista 1 — conceptual</summary>

Pulsa "Anotar" en el `App.tsx`: sale doble. La pantalla sí repinta, así que la llave de
fuera es nueva. El problema está más adentro.

</details>

<details><summary>Pista 2 — más concreta</summary>

`StrictMode` llama al reducer dos veces con el mismo estado. Las dos llamadas abren la
misma taquilla de `notas`, y las dos meten una nota. Si el reducer montara una taquilla
nueva, cada llamada metería una sola en la suya.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
AssertionError: expected [ <li></li>, <li></li> ] to have a length of 1 but got 2
```

</details>

<details><summary>Solución</summary>

```ts
return { ...estado, notas: [...estado.notas, accion.texto] };
```

Es el drill 5 con otro nombre. Por eso `StrictMode` llama dos veces: un reducer que no
toca lo que le llega da el mismo resultado las dos, y uno que lo toca se delata.

</details>
