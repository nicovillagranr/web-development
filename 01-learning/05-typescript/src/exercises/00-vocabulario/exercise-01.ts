/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el fragmento que se usa en TODO el archivo. Tenlo delante:
 *
 *     function saludar(nombre: string): string {
 *       return `Hola, ${nombre}`
 *     }
 *
 *     const saludo = saludar("Ana")
 *     console.log(saludo)
 *
 * Cinco líneas, y dentro están casi todas las palabras que se te cruzan. No hay
 * nada que resolver ahí: ya sabes lo que hace. Lo que se practica es NOMBRARLO.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 01 — las piezas de una función             ·  vocabulario, bloque 1
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · separar lo que DECLARA una función de lo que ocurre al LLAMARLA
 *   · llamar por su nombre al parámetro, al argumento y a la propiedad sin
 *     cambiarlos de sitio
 *   · decir "retorna" e "imprime" cuando toca cada uno, y explicar en qué se
 *     diferencian
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Esto no es TypeScript nuevo: es cómo se llaman cosas que ya usas a diario. Lo
 * montas porque en una entrevista o en un code review vas a tener que explicar
 * tu código en voz alta, y ahí el vocabulario cruzado suena a que no entiendes
 * lo que escribiste — aunque lo entiendas perfectamente.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · declarar no es llamar        →  drills 1 al 5
 *   TEORÍA 2 · retornar no es imprimir      →  drills 6 al 9
 *   TEORÍA 3 · de quién es cada pieza       →  drills 10 al 12
 *
 * ▸ EJERCICIO — 12 drills. Cada respuesta es UNA palabra de un menú cerrado.
 *     pnpm test:run src/exercises/00-vocabulario/exercise-01.test.ts
 *     pnpm typecheck
 *
 *   Todos los starters dicen "SIN_RESPONDER", que no está en ningún menú: por eso
 *   arrancan los 12 en rojo. Debajo de cada uno hay un "¿Por qué?" que también se
 *   rellena — acertar la palabra sin poder justificarla no cuenta como cerrado.
 *   ¿Atascado? Las pistas están en `exercise-01.pistas.md`, de una en una.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — DECLARAR no es LLAMAR
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una función se escribe una vez (se DECLARA) y se usa muchas (se LLAMA). Son
 *   dos momentos distintos, y cada uno tiene sus propias palabras. Al declarar
 *   abres huecos: los PARÁMETROS. Al llamar los rellenas: los ARGUMENTOS.
 *
 * SINTAXIS
 *     function saludar(nombre: string): string { … }
 *              ▲       ▲       ▲         ▲
 *              │       │       │         └─ tipo de retorno
 *              │       │       └─ el tipo del parámetro
 *              │       └─ el PARÁMETRO (el hueco, aún vacío)
 *              └─ el identificador de la función
 *
 *     saludar("Ana")
 *     ▲        ▲
 *     │        └─ el ARGUMENTO (lo que rellena el hueco)
 *     └─ esto entero es la LLAMADA
 *
 * 🧠 ANALOGÍA (de apoyo) — el formulario en papel. Los campos impresos son los
 *    parámetros: existen aunque nadie los haya rellenado. Lo que escribes con
 *    boli el día que lo entregas son los argumentos. Un mismo formulario, muchos
 *    rellenos distintos.
 *
 * 🗣️ LAS PIEZAS
 *     nombre     → parámetro    (existe al declarar, no tiene valor todavía)
 *     "Ana"      → argumento    (existe al llamar)
 *     string     → tipo         (no es un valor: es la categoría permitida)
 *     saludar    → identificador de la función
 *
 * ⚠️ TRAMPA — la reincidente tuya: mirar `saludar("Ana")` y llamar *parámetro* al
 *    `"Ana"`. Regla de bolsillo: **si tiene comillas ya es un valor, así que es un
 *    argumento**. El parámetro nunca tiene valor mientras lo lees.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) En `function saludar(nombre: string)`, ¿qué es `nombre`?
export const r1: "parámetro" | "argumento" | "propiedad" | "elemento" = "SIN_RESPONDER"
// ¿Por qué? →

// 2) En `saludar("Ana")`, ¿qué es `"Ana"`?
export const r2: "parámetro" | "argumento" | "propiedad" | "elemento" = "SIN_RESPONDER"
// ¿Por qué? →

// 3) En `function saludar(nombre: string)`, ¿qué es la palabra `string`?
export const r3: "tipo" | "valor" | "argumento" | "constante" = "SIN_RESPONDER"
// ¿Por qué? →

// 4) `saludar("Ana")` entero, como expresión, ¿qué es?
export const r4: "llamada" | "declaración" | "firma" | "asignación" = "SIN_RESPONDER"
// ¿Por qué? →

// 5) En `const saludo = saludar("Ana")`, ¿qué es `saludo`?
export const r5: "constante" | "parámetro" | "propiedad" | "argumento" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — RETORNAR no es IMPRIMIR
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   RETORNAR (o devolver) es entregarle un valor a quien te llamó, para que siga
 *   trabajando con él. IMPRIMIR es dibujar algo en la consola para que lo lea una
 *   persona. Son independientes: hay funciones que retornan sin imprimir, que
 *   imprimen sin retornar, que hacen las dos, o ninguna.
 *
 * SINTAXIS
 *     return `Hola, ${nombre}`   // retorna: el valor sale de la función
 *     console.log(saludo)        // imprime: el valor se dibuja en pantalla
 *
 * EJEMPLO
 *     function sumar(a: number, b: number) { return a + b }
 *     function pintar(a: number, b: number) { console.log(a + b) }
 *
 *     const x = sumar(2, 3)      // x vale 5, y no se ve nada en pantalla
 *     const y = pintar(2, 3)     // se ve un 5 en la consola, e `y` es undefined
 *
 * 🧠 ANALOGÍA (de apoyo) — la ventanilla. Retornar es que el funcionario te
 *    entregue el papel en la mano: te lo llevas y lo usas. Imprimir es que lo lea
 *    en voz alta: te enteras, pero sales de ahí sin nada.
 *
 * 🗣️ LAS PIEZAS
 *     return       → la palabra clave que retorna
 *     console.log  → una llamada que imprime
 *     void         → el tipo de retorno de una función que NO retorna nada
 *     undefined    → lo que recibes de una función que no retornó
 *
 * ⚠️ TRAMPA — este es tu par número uno, corregido varias veces entre sesiones.
 *    `console.log` no "devuelve" el texto: lo dibuja y devuelve `undefined`. Si
 *    dices "imprime" donde el código pone `return`, quien te escucha entiende que
 *    ese valor no se puede seguir usando — y es justo lo contrario.
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) La `saludar` del recordatorio, ¿qué hace con el texto `Hola, Ana`?
export const r6: "lo retorna" | "lo imprime" | "lo guarda" = "SIN_RESPONDER"
// ¿Por qué? →

// 7) Y la línea `console.log(saludo)`, ¿qué hace con él?
export const r7: "lo retorna" | "lo imprime" | "lo guarda" = "SIN_RESPONDER"
// ¿Por qué? →

// 8) `function avisar(t: string): void { console.log(t) }`
//    ¿Qué acaba valiendo `x` en `const x = avisar("hola")`?
export const r8: "undefined" | "hola" | "void" | "null" = "SIN_RESPONDER"
// ¿Por qué? →

// 9) En esa misma `avisar`, ¿qué es la palabra `void`?
export const r9: "el tipo de retorno" | "un valor" | "el parámetro" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — cada pieza pertenece a algo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Tres palabras que se confunden porque las tres significan "una cosa que está
 *   dentro de otra". Lo que las separa es DE QUÉ están dentro:
 *
 *     propiedad  → está dentro de un OBJETO      usuario.nombre
 *     elemento   → está dentro de un ARRAY       colores[0]
 *     parámetro  → está dentro de una FUNCIÓN    function f(x)
 *
 * SINTAXIS
 *     const usuario = { nombre: "Ana", cuenta: { alias: "@ana" } }
 *
 *     usuario           → la constante
 *     usuario.nombre    → una propiedad. Guarda un dato: 📄 la cadena acaba aquí
 *     usuario.cuenta    → también una propiedad. Guarda otro objeto: 📁 sigues
 *                         poniendo puntos
 *     "Ana"             → el VALOR de la propiedad `nombre`. No es la propiedad
 *
 * 🧠 ANALOGÍA (de apoyo) — el archivador. 📁 carpeta (dentro hay más cosas, sigue
 *    abriendo) · 📄 documento (aquí acaba, es el dato) · 🔧 herramienta (un método:
 *    va con paréntesis). Toda propiedad es una de las tres, pero SIGUE siendo una
 *    propiedad: la carpeta también es papel del archivo.
 *
 * 🗣️ LAS PIEZAS
 *     usuario.nombre   → acceso a propiedad
 *     nombre           → la propiedad
 *     "Ana"            → su valor
 *     .toUpperCase()   → un método (una propiedad que guarda una función)
 *
 * ⚠️ TRAMPA — la que ya cometiste con `e.nativeEvent.type`: dijiste que
 *    `nativeEvent` era la propiedad y `type` el valor. Las DOS son propiedades;
 *    el valor era `"click"`. Que una propiedad guarde otro objeto no la degrada a
 *    "no propiedad" — 📁 sigue siendo papel del archivo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 10) En `const usuario = { nombre: "Ana" }`, ¿qué es `nombre`?
export const r10: "propiedad" | "parámetro" | "elemento" | "valor" = "SIN_RESPONDER"
// ¿Por qué? →

// 11) En ese mismo objeto, ¿qué es `"Ana"`?
export const r11: "el valor" | "la propiedad" | "el tipo" | "el argumento" = "SIN_RESPONDER"
// ¿Por qué? →

// 12) En `const colores = ["rojo", "verde"]`, ¿qué es `"rojo"`?
export const r12: "elemento" | "propiedad" | "parámetro" | "argumento" = "SIN_RESPONDER"
// ¿Por qué? →

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 12 estén en verde, la prueba de verdad no es el test: es explicar el
 * fragmento del recordatorio en voz alta, de corrido, sin mirar el archivo.
 * ───────────────────────────────────────────────────────────────────────────── */
