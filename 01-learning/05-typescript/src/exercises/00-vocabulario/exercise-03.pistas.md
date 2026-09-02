# Pistas — exercise-03

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una.

**Por qué van por bloque y no por drill:** igual que en el `01` y el `02`. La respuesta
es una palabra de un menú de tres, y el nivel 3 no cita a `tsc` porque los 12 drills
dan el mismo mensaje. En su sitio va el dato duro.

---

## Bloque 1 — drills 1 al 4 · el símbolo y los datos

<details><summary>Pista 1 — conceptual</summary>

La misma prueba del archivo anterior, y aquí también funciona: **¿esto lo podrías
imprimir por separado?**

`console.log(edad)` tiene sentido. `console.log(||)` no es ni código. Uno de los dos
es un dato y el otro es el símbolo que los combina, y esa diferencia decide cómo se
llama cada uno.
</details>

<details><summary>Pista 2 — más concreta</summary>

Este es el bloque donde ya te equivocaste una vez, y te equivocaste **cambiando las
dos palabras de sitio**. Así que no contestes de memoria: aplica la prueba de arriba a
cada uno.

Para el 3: te preguntan por la línea entera, no por una pieza. Lo que la define es que
al ejecutarla **produce un valor** —aquí, `true` o `false`—. Eso tiene un nombre, y
está en las piezas de la teoría.

Para el 4: la palabra la tienes en el propio enunciado, disfrazada. Cuenta los
operandos y busca el prefijo latino que corresponde a ese número.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```
edad  ||  18
 ▲    ▲    ▲
 │    │    └─ operando
 │    └─ OPERADOR (el símbolo)
 └─ operando
```

- **operador** = el símbolo. `||`, `+`, `>`, `?`, `??`
- **operando** = cada dato que tiene a los lados
- **expresión** = todo junto; al evaluarla sale un valor
- por número de operandos: **unario** (1), **binario** (2), **ternario** (3)
</details>

---

## Bloque 2 — drills 5 al 8 · `false` no es falsy

<details><summary>Pista 1 — conceptual</summary>

Todo el bloque cuelga de una distinción: **un valor concreto** contra **un conjunto de
valores**. Uno es un miembro; el otro es la lista entera.

Si contestas el 5 y el 6 con palabras del mismo nivel, uno de los dos está mal: las
preguntas son deliberadamente de niveles distintos.
</details>

<details><summary>Pista 2 — más concreta</summary>

Los falsy son **seis y solo seis**, y están escritos en la SINTAXIS de la teoría.
Apréndetelos como lista cerrada: cualquier cosa que no esté ahí es truthy, por rara
que parezca.

Para el 7: `[]` no está en esa lista de seis. Punto. Que "parezca vacío" no cuenta —
lo que decide es si está en la lista.

Para el 8: `||` descarta los seis falsy. Necesitas uno que descarte solo dos de ellos,
y está en las piezas de la teoría, justo debajo de `||`.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Los seis falsy, la lista completa:

```
false    0    ""    null    undefined    NaN
```

Todo lo demás es **truthy**, incluidos `"0"`, `"false"`, `[]` y `{}`.

- `false` → **un valor**, de tipo `boolean`
- `falsy` → **una categoría** de seis valores. `false` está dentro, pero no es ella
- `a || b` → devuelve `b` si `a` es **falsy** (los seis)
- `a ?? b` → devuelve `b` solo si `a` es `null` o `undefined` (dos de los seis)

Por eso `edad ?? 18` deja pasar el `0` y `edad || 18` no.
</details>

---

## Bloque 3 — drills 9 al 12 · juntar texto tiene nombre

<details><summary>Pista 1 — conceptual</summary>

Hay dos formas de armar un texto y cada una tiene su nombre. Lo que las distingue a
simple vista son **las comillas**: unas normales con un símbolo entre medias, o unas
invertidas con huecos dentro.

Y ojo: el 9 pregunta por la construcción entera, el 10 por el hueco de dentro. No son
la misma palabra.
</details>

<details><summary>Pista 2 — más concreta</summary>

Esto salió en la revisión del `01`: dijiste *"se le suma el string"* hablando de un
` `Hola, ${nombre}` `. Ahí no hay ninguna suma, y por eso existen estas dos palabras
distintas.

Para el 12: `length` se lee sin paréntesis, así que no es lo que se llama con `()`.
Y no está declarada en ninguna función. Vuelve a la terna del `01`: 📁 carpeta,
📄 dato, 🔧 método — `length` guarda un número, y sigue siendo lo mismo que
`usuario.nombre`.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```js
"Hola, " + nombre     // CONCATENACIÓN. El `+` es el operador
`Hola, ${nombre}`     // TEMPLATE LITERAL
//      ▲
//      └─ una INTERPOLACIÓN
```

- **template literal** → la construcción entera, la que va entre backticks
- **interpolación** → cada `${…}` de dentro
- **concatenación** → pegar textos con `+`
- **propiedad** → `length`. Guarda un dato y se lee sin `()`. Un **método** sí los
  lleva: `nombre.toUpperCase()`
</details>
