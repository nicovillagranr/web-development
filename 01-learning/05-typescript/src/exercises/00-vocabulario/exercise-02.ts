/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el fragmento que se usa en TODO el archivo. Tenlo delante:
 *
 *     type Prioridad = "baja" | "alta"
 *
 *     interface Tarea {
 *       id: number
 *       titulo: string
 *       etiqueta?: string
 *     }
 *
 *     const tarea: Tarea = { id: 1, titulo: "Regar" }
 *
 * Ocho líneas donde conviven las dos mitades de TypeScript: lo que existe al
 * escribir (los tipos) y lo que existe al ejecutar (los datos). Casi todo lo que
 * se cruza en este archivo es confundir una mitad con la otra.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 02 — las piezas de un tipo                 ·  vocabulario, bloque 2
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · decir cuál de los dos trabajos hace un `:` sin dudar, mirando su derecha
 *   · nombrar el alias, la interface, la unión y el literal por separado
 *   · no llamar "objeto" a un tipo ni "tipo" a un objeto
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * El 01 iba de las piezas de una función, que son de JavaScript. Estas son de
 * TypeScript, y tienen una trampa que las otras no: los tipos desaparecen al
 * compilar. Hablar de ellos como si fueran datos es el malentendido que hace que
 * una explicación suene rara aunque el código esté bien.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · los dos trabajos del `:`     →  drills 1 al 4
 *   TEORÍA 2 · cómo se llama cada tipo      →  drills 5 al 8
 *   TEORÍA 3 · el tipo no es el dato        →  drills 9 al 12
 *
 * ▸ EJERCICIO — 12 drills. Cada respuesta es UNA palabra de un menú cerrado.
 *     pnpm test:run src/exercises/00-vocabulario/exercise-02.test.ts
 *     pnpm typecheck
 *
 *   Los starters dicen "SIN_RESPONDER", que no está en ningún menú: arrancan los
 *   12 en rojo. Debajo de cada uno hay un "¿Por qué?" que también se rellena.
 *   💡 Copia y pega la palabra del propio menú de la línea de arriba. Va en
 *      minúscula y el tipo es literal hasta en eso — en el 01 perdiste dos vueltas
 *      por una mayúscula.
 *   ¿Atascado? Las pistas están en `exercise-02.pistas.md`, de una en una.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — los dos trabajos del `:`
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Los dos puntos aparecen en sitios muy parecidos y significan cosas distintas.
 *   Dentro de un TIPO, separan el nombre de la propiedad de su tipo. Dentro de un
 *   OBJETO, separan la clave de su valor. Lo que decide cuál es no es el `:`: es
 *   lo que tiene a la derecha.
 *
 * SINTAXIS
 *     interface Tarea { id: number }        // a la derecha, un TIPO
 *     const tarea = { id: 1 }               // a la derecha, un VALOR
 *                      ▲
 *                      └─ el mismo símbolo, dos trabajos
 *
 * EJEMPLO — la pregunta que lo resuelve siempre: ¿esto se puede imprimir?
 *     console.log(1)        // ✅ un valor existe al ejecutar
 *     console.log(number)   // ❌ un tipo no existe al ejecutar. Ni compila
 *
 * 🧠 ANALOGÍA (de apoyo) — la ficha de inscripción. "Edad: número entero" es el
 *    formulario en blanco diciendo qué se admite. "Edad: 23" es la ficha ya
 *    rellenada de una persona concreta. Mismo renglón, dos documentos distintos.
 *
 * 🗣️ LAS PIEZAS
 *     id: number   → una propiedad y su TIPO. Vive en el mundo de los tipos
 *     id: 1        → una clave y su VALOR. Vive en el mundo de los datos
 *     par clave-valor → el nombre de `id: 1` entero, las dos piezas juntas
 *
 * ⚠️ TRAMPA — decir "el tipo es 1". `1` no es un tipo, es un valor; su tipo es
 *    `number`. Al revés también cuenta: `number` no se puede guardar, imprimir ni
 *    comparar. Si te preguntas si podrías pasárselo a `console.log`, sale solo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) En `interface Tarea { id: number }`, ¿qué es `number`?
export const r1: "un tipo" | "un valor" | "una clave" = "SIN_RESPONDER"
// ¿Por qué? →

// 2) En `const tarea: Tarea = { id: 1, titulo: "Regar" }`, ¿qué es el `1`?
export const r2: "un tipo" | "un valor" | "una clave" = "SIN_RESPONDER"
// ¿Por qué? →

// 3) En ese mismo objeto, ¿cómo se llama `id: 1` entero, las dos piezas juntas?
export const r3: "un par clave-valor" | "una anotación" | "una unión" = "SIN_RESPONDER"
// ¿Por qué? →

// 4) En `const tarea: Tarea = …`, ese `: Tarea` que va pegado al nombre, ¿qué es?
export const r4: "una anotación de tipo" | "una asignación" | "una llamada" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cómo se llama cada tipo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un tipo se puede escribir de varias formas y cada una tiene su nombre. Un
 *   ALIAS (`type X = …`) le pone nombre a cualquier tipo. Una INTERFACE describe
 *   la forma de un objeto. Una UNIÓN ofrece varias opciones separadas por `|`, y
 *   cada opción es un MIEMBRO de esa unión.
 *
 * SINTAXIS
 *     type Prioridad = "baja" | "alta"
 *     ▲    ▲           ▲       ▲
 *     │    │           │       └─ otro miembro
 *     │    │           └─ un miembro de la unión. Y además un tipo LITERAL
 *     │    └─ el nombre del alias
 *     └─ la palabra que declara un alias
 *
 *     interface Tarea { … }    ← esto NO es un alias: es una interface
 *
 * 🧠 ANALOGÍA (de apoyo) — el menú del día. La carta entera es la unión: puedes
 *    pedir una de esas cosas, no cualquiera. Cada plato de la lista es un miembro.
 *    Y ponerle nombre al menú ("Menú del día") es el alias.
 *
 * 🗣️ LAS PIEZAS
 *     type          → declara un alias de tipo
 *     interface     → declara la forma de un objeto
 *     "baja"        → un tipo literal: un tipo con un solo valor posible
 *     |             → el separador de la unión. Se lee "o"
 *
 * ⚠️ TRAMPA — `"baja"` con comillas puede ser dos cosas según dónde esté. En
 *    `type Prioridad = "baja" | "alta"` es un TIPO literal. En `const p = "baja"`
 *    es un VALOR. Otra vez la misma frontera: mira a qué lado del `=` de un `type`
 *    estás.
 * ───────────────────────────────────────────────────────────────────────────── */

// 5) En `type Prioridad = "baja" | "alta"`, ¿qué es `Prioridad`?
export const r5: "un alias de tipo" | "una interface" | "una constante" = "SIN_RESPONDER"
// ¿Por qué? →

// 6) En esa misma línea, ¿qué es `"baja" | "alta"` entero?
export const r6: "una unión" | "un objeto" | "un array" = "SIN_RESPONDER"
// ¿Por qué? →

// 7) Y `"baja"` suelto, dentro de esa declaración, ¿qué es?
export const r7: "un tipo literal" | "un valor" | "una clave" = "SIN_RESPONDER"
// ¿Por qué? →

// 8) `interface Tarea { … }` — la palabra `Tarea`, ¿qué nombra?
export const r8: "una interface" | "un alias de tipo" | "un objeto" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — el tipo no es el dato
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `Tarea` y `tarea` se parecen en todo menos en lo importante: uno describe y
 *   el otro existe. El tipo desaparece al compilar — el JavaScript que se ejecuta
 *   no lo contiene. El objeto es lo único que llega a ejecutarse.
 *
 * SINTAXIS
 *     const tarea: Tarea = { id: 1, titulo: "Regar" }
 *           ▲      ▲        ▲
 *           │      │        └─ el OBJETO. Esto se ejecuta
 *           │      └─ el TIPO. Esto desaparece al compilar
 *           └─ la constante
 *
 * ANOTAR O DEJAR QUE INFIERA
 *     const a: string = "hola"   // anotado: se lo dices tú
 *     const b = "hola"           // inferido: lo deduce del valor
 *   Las dos acaban igual. Anotar sirve cuando el valor inicial no basta para
 *   describir lo que va a guardar — como el `useState({})` del bloque 11.
 *
 * 🗣️ LAS PIEZAS
 *     etiqueta?: string  → una propiedad OPCIONAL. El `?` es lo que la hace opcional
 *     Tarea              → el tipo
 *     tarea              → la constante, y lo que guarda es un objeto
 *     inferencia         → que TS deduzca el tipo sin que lo escribas
 *
 * ⚠️ TRAMPA — tu reincidencia doble: llamar "objeto" a la interface. `Tarea` no
 *    es un objeto, es la DESCRIPCIÓN de cómo tienen que ser ciertos objetos. Con
 *    una sola `Tarea` escrita puedes crear mil objetos distintos, y ninguno de los
 *    mil es `Tarea`.
 * ───────────────────────────────────────────────────────────────────────────── */

// 9) En `const tarea: Tarea = { … }`, ¿qué es `Tarea` (con mayúscula)?
export const r9: "un tipo" | "un objeto" | "una constante" = "SIN_RESPONDER"
// ¿Por qué? →

// 10) Y `{ id: 1, titulo: "Regar" }`, ¿qué es?
export const r10: "un objeto" | "un tipo" | "una interface" = "SIN_RESPONDER"
// ¿Por qué? →

// 11) En `etiqueta?: string`, ¿qué hace ahí el `?`?
export const r11: "la hace opcional" | "la hace nula" | "la hace de solo lectura" = "SIN_RESPONDER"
// ¿Por qué? →

// 12) En `const b = "hola"`, sin escribir ningún tipo, TS sabe que `b` es `string`.
//     ¿Cómo se llama eso que acaba de hacer TS?
export const r12: "inferencia" | "anotación" | "conversión" = "SIN_RESPONDER"
// ¿Por qué? →

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 12 estén en verde, la prueba es esta: coge el fragmento del
 * recordatorio y di, línea por línea, cuáles desaparecen al compilar y cuáles
 * sobreviven. Si eso lo tienes, la frontera está clara.
 * ───────────────────────────────────────────────────────────────────────────── */
