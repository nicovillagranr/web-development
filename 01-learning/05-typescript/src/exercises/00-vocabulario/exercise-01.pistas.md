# Pistas — exercise-01

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.

**Por qué aquí las pistas van por bloque y no por drill.** En el resto del repo son
cuatro niveles por drill. Aquí la respuesta es **una palabra de un menú de cuatro**,
así que una pista 1 y una pista 2 del mismo drill dirían lo mismo con distinta ropa —
y una pista por drill sería, directamente, la respuesta. Van por bloque de teoría, en
tres escalones. El nivel 3 tampoco cita el error de `tsc` como en los demás archivos:
los 12 drills escupen exactamente el mismo mensaje (`"SIN_RESPONDER"` no está en la
unión) y ese mensaje no distingue un drill de otro. En su sitio va el dato duro.

---

## Bloque 1 — drills 1 al 5 · declarar no es llamar

<details><summary>Pista 1 — conceptual</summary>

Antes de mirar la palabra, mira **en qué línea vive**. El fragmento tiene dos zonas
muy distintas: la que empieza por `function` y la que empieza por `const`. Una escribe
la máquina; la otra la usa. Casi todos estos drills se resuelven decidiendo primero
en cuál de las dos estás.
</details>

<details><summary>Pista 2 — más concreta</summary>

Pregúntate si la pieza que te señalan **ya tiene un valor concreto en el momento en que
la lees**. Un hueco vacío y un hueco relleno no pueden llamarse igual, y esa es
exactamente la frontera entre las dos palabras que más se te cruzan.

Para el drill 3 va otra pregunta distinta: ¿`string` es un dato que podrías imprimir,
o es la categoría a la que tendrá que pertenecer el dato?
</details>

<details><summary>Pista 3 — el dato duro</summary>

- **Parámetro** = lo que aparece entre los paréntesis de la **declaración**.
- **Argumento** = lo que aparece entre los paréntesis de la **llamada**.
- Regla de bolsillo: si lleva comillas o es un número escrito, ya es un valor →
  **argumento**.
- Una **llamada** es identificador + `(…)`. Es una operación, no un nombre.
- Lo que va a la izquierda de un `=` en una línea `const` es una **constante**, aunque
  lo que guarde venga de una función.
</details>

---

## Bloque 2 — drills 6 al 9 · retornar no es imprimir

<details><summary>Pista 1 — conceptual</summary>

Los dos verbos hacen que el valor "salga" de la función, pero salen **por sitios
distintos y hacia destinatarios distintos**. Uno sale hacia el código que llamó; el
otro sale hacia la pantalla. Pregúntate quién recibe el valor en cada caso, y sobre
todo: **¿puede el programa seguir usándolo después?**
</details>

<details><summary>Pista 2 — más concreta</summary>

Para el 8, haz el experimento mental completo. `avisar` ejecuta un `console.log` y se
acaba. No hay ninguna línea `return` dentro. Entonces, cuando esa función termina,
¿con qué se queda en la mano quien escribió `const x = …`?

Ojo: la respuesta no es la palabra que aparece escrita en el tipo de retorno. Esa
palabra es del mundo de los tipos; te preguntan por el mundo de los valores.
</details>

<details><summary>Pista 3 — el dato duro</summary>

- `return X` → entrega `X` a quien llamó. El valor sigue vivo y se puede guardar.
- `console.log(X)` → dibuja `X` en la consola y **retorna `undefined`**.
- Una función sin `return` retorna `undefined` en tiempo de ejecución.
- `void` es lo que escribes **en el tipo**; `undefined` es lo que llega **en el
  valor**. No son intercambiables aunque describan la misma situación.
- El tipo de retorno ocupa el sitio de después de los paréntesis: `(t: string): void`.
</details>

---

## Bloque 3 — drills 10 al 12 · de quién es cada pieza

<details><summary>Pista 1 — conceptual</summary>

Las tres palabras del menú significan "algo que está dentro de otra cosa". Lo que las
separa no es la pieza en sí, es **el contenedor**. Así que no mires la pieza: mira los
símbolos que la rodean. `{}`, `[]` y `()` no son decoración, cada uno te está diciendo
en qué clase de contenedor estás.
</details>

<details><summary>Pista 2 — más concreta</summary>

El drill 11 es el que te ha mordido antes, así que hazlo despacio. En `nombre: "Ana"`
hay **dos** piezas, no una, y los dos puntos las separan. Una es el rótulo con el que
la buscas; la otra es lo que hay guardado debajo del rótulo. Te preguntan por la
segunda.
</details>

<details><summary>Pista 3 — el dato duro</summary>

| Contenedor | Símbolos | Cómo se llama lo de dentro |
|---|---|---|
| objeto | `{ }` | **propiedad** |
| array | `[ ]` | **elemento** |
| función (al declarar) | `( )` | **parámetro** |

Y el par que te falla: en `{ nombre: "Ana" }`, `nombre` es la **propiedad** y `"Ana"`
es **su valor**. La propiedad no deja de serlo por lo que guarde dentro — ni cuando
guarda otro objeto (📁), ni cuando guarda una función (🔧).
</details>
