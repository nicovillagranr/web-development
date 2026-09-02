# Pistas — exercise-02

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una.

**Por qué van por bloque y no por drill:** igual que en el `01`. La respuesta es una
palabra de un menú de tres, así que una pista por drill sería la respuesta. Y el nivel
3 no cita a `tsc` porque los 12 drills escupen el mismo mensaje (`"SIN_RESPONDER"` no
está en la unión), que no distingue un drill de otro. En su sitio va el dato duro.

---

## Bloque 1 — drills 1 al 4 · los dos trabajos del `:`

<details><summary>Pista 1 — conceptual</summary>

No mires el `:`, que es idéntico en los dos casos. Mira **qué hay a su derecha** y
hazte una sola pregunta: *¿esto lo podría pasar a `console.log`?*

Si la respuesta es sí, estás en el mundo de los datos. Si es no —si escribirlo ahí ni
siquiera compilaría— estás en el mundo de los tipos.
</details>

<details><summary>Pista 2 — más concreta</summary>

Para el 3: te preguntan por las **dos** piezas juntas, no por una. Existe un nombre
para esa pareja, y lo usas cada vez que hablas de un objeto sin darte cuenta.

Para el 4, fíjate en dónde está ese `: Tarea`: no está dentro de ningún objeto ni de
ninguna interface, está pegado al nombre de una constante. Ahí el `:` no separa una
clave de nada — le está diciendo a TS de qué tipo va a ser esa constante. Eso tiene
nombre propio, y el contrario está en la TEORÍA 3.
</details>

<details><summary>Pista 3 — el dato duro</summary>

- `id: number` → a la derecha, algo que **solo existe al compilar**. Es un tipo.
- `id: 1` → a la derecha, algo que **existe al ejecutar**. Es un valor.
- `id: 1` entero se llama **par clave-valor**. `id` es la clave, `1` el valor.
- `const x: T = …` → ese `: T` es una **anotación de tipo**: lo escribes tú.
  Lo contrario es la **inferencia**, que es cuando lo deduce TS solo (drill 12).
</details>

---

## Bloque 2 — drills 5 al 8 · cómo se llama cada tipo

<details><summary>Pista 1 — conceptual</summary>

Las cuatro preguntas apuntan a piezas distintas de las mismas dos líneas. Antes de
contestar, léelas señalando con el dedo: la palabra clave que abre la declaración, el
nombre que le pones, lo que hay al otro lado del `=`, y cada una de las opciones.

Son cuatro cosas, no una. Que estén en la misma línea no las hace lo mismo.
</details>

<details><summary>Pista 2 — más concreta</summary>

El drill 6 pregunta por el conjunto entero, con el `|` incluido; el 7 por una sola de
las opciones. Si contestas los dos con la misma palabra, uno está mal.

Y el 8 tiene truco de descarte: `interface` y `type` hacen cosas parecidas, pero la
palabra que abre esa declaración no es `type`. La respuesta está escrita en el propio
enunciado.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```ts
type Prioridad = "baja" | "alta"
//   ▲           ▲       ▲
//   │           │       └─ un miembro de la unión, y un tipo literal
//   │           └─ ídem
//   └─ el nombre del ALIAS DE TIPO

interface Tarea { … }   // esto es una INTERFACE, no un alias
```

- **alias de tipo** → lo que declara `type X = …`. Sirve para cualquier tipo.
- **unión** → varias opciones separadas por `|`. Se lee "o".
- **tipo literal** → un tipo cuyo único valor posible es ese: `"baja"`.
- **interface** → describe la forma de un objeto. Solo vale para objetos.
</details>

---

## Bloque 3 — drills 9 al 12 · el tipo no es el dato

<details><summary>Pista 1 — conceptual</summary>

`Tarea` y `tarea` se escriben casi igual y son cosas de mundos distintos. La prueba
definitiva: **compila el archivo mentalmente y borra todo lo que desaparece**. Lo que
sobrevive al borrado es el dato; lo que se va era el tipo.

Este es el bloque de tu reincidencia, así que ve despacio en el 9 y el 10.
</details>

<details><summary>Pista 2 — más concreta</summary>

En `const tarea: Tarea = { id: 1, titulo: "Regar" }` hay tres cosas y cada drill
pregunta por una: la constante (`tarea`), lo que está anotado (`Tarea`) y lo que está
guardado (`{ … }`).

Para el 11: prueba a imaginar `const t: Tarea = { id: 1, titulo: "x" }` sin la
`etiqueta`. ¿Compila? Lo que permite que compile es exactamente lo que hace el `?`.

Para el 12: es la palabra que sale cuando NO escribes el tipo y TS lo averigua igual.
Está en la TEORÍA 3, en las piezas.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```ts
const tarea: Tarea = { id: 1, titulo: "Regar" }
//    ▲      ▲        ▲
//    │      │        └─ un OBJETO. Sobrevive al compilar
//    │      └─ un TIPO. Desaparece al compilar
//    └─ la constante
```

- `Tarea` es **un tipo**, aunque esté declarado con `interface`. Con una sola `Tarea`
  puedes crear mil objetos distintos, y ninguno de los mil *es* `Tarea`: todos la
  cumplen.
- `etiqueta?: string` → el `?` la hace **opcional**: puede faltar. No la hace `null`.
- `const b = "hola"` sin anotar → TS deduce `string` solo. Eso es **inferencia**.
</details>
