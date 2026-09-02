/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el fragmento que se usa en TODO el archivo. Tenlo delante:
 *
 *     const nombre = "Ana"
 *     const edad = 0
 *
 *     const saludo = `Hola, ${nombre}`
 *     const visible = edad || 18
 *     const largo = nombre.length > 2
 *
 * Cinco líneas de expresiones corrientes. Aquí no se practica qué hacen —eso ya
 * lo sabes— sino cómo se llaman las piezas con las que están hechas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 03 — las piezas de una expresión           ·  vocabulario, bloque 3
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · separar el operador de sus operandos sin cambiarlos de sitio
 *   · distinguir `false` de "falsy", que no son la misma cosa
 *   · nombrar un template literal y su interpolación en vez de decir "sumar"
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Estas son las palabras que salen cuando explicas una línea concreta en un code
 * review. Son cortas y se dicen rápido, y por eso son justo las que se cruzan al
 * hablar: en tu caso ya se han cruzado el par operador/operando y el par
 * false/falsy, cada uno con la frase entera del revés.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 *   TEORÍA 1 · el símbolo y los datos       →  drills 1 al 4
 *   TEORÍA 2 · falso no es falsy            →  drills 5 al 8
 *   TEORÍA 3 · juntar texto tiene nombre    →  drills 9 al 12
 *
 * ▸ EJERCICIO — 12 drills. Cada respuesta es UNA palabra de un menú cerrado.
 *     pnpm test:run src/exercises/00-vocabulario/exercise-03.test.ts
 *     pnpm typecheck
 *
 *   Los starters dicen "SIN_RESPONDER", que no está en ningún menú: arrancan los
 *   12 en rojo. Debajo de cada uno hay un "¿Por qué?" que también se rellena.
 *   💡 Copia y pega la palabra del propio menú. Va en minúscula, y el tipo es
 *      literal hasta en eso.
 *   ¿Atascado? Las pistas están en `exercise-03.pistas.md`, de una en una.
 * ===========================================================================*/


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el símbolo y los datos
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Una expresión combina datos usando símbolos. El OPERADOR es el símbolo; los
 *   OPERANDOS son los datos que tiene a los lados. Nunca al revés: el operador es
 *   lo que no podrías imprimir por separado.
 *
 * SINTAXIS
 *     edad || 18
 *     ▲     ▲  ▲
 *     │     │  └─ operando derecho
 *     │     └─ el OPERADOR
 *     └─ operando izquierdo
 *
 * EJEMPLO — cuántos operandos toma cada uno:
 *     -x           // unario: un operando
 *     a + b        // binario: dos operandos
 *     c ? a : b    // ternario: tres. Por eso se llama "el ternario"
 *
 * 🧠 ANALOGÍA (de apoyo) — la operación aritmética del colegio. En `3 + 4`, el
 *    `+` es el signo y el 3 y el 4 son los números. Nadie diría "el número más";
 *    pues igual aquí.
 *
 * 🗣️ LAS PIEZAS
 *     ||  ?  >  +   → operadores. Son símbolos, no datos
 *     edad, 18      → operandos. Son datos, y se pueden imprimir
 *     expresión     → todo junto, y produce un valor
 *
 * ⚠️ TRAMPA — la tuya, con la frase entera del revés: escribiste *"el operando
 *    `||` dice: si el operador de la izquierda es falso…"*. Regla para no fallar:
 *    **el operador es el símbolo; los operandos son lo que tiene a los lados**.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) En `edad || 18`, ¿qué es `||`?
export const r1: "el operador" | "el operando" | "la expresión" = "SIN_RESPONDER"
// ¿Por qué? →

// 2) En esa misma línea, ¿qué es `edad`?
export const r2: "el operador" | "un operando" | "la expresión" = "SIN_RESPONDER"
// ¿Por qué? →

// 3) `nombre.length > 2` entero, ¿qué es?
export const r3: "una expresión" | "una declaración" | "un operador" = "SIN_RESPONDER"
// ¿Por qué? →

// 4) `c ? a : b` toma tres operandos. ¿Cómo se le llama por eso?
export const r4: "ternario" | "binario" | "unario" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — `false` no es "falsy"
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `false` es UN valor booleano concreto. FALSY es una CATEGORÍA: el conjunto de
 *   valores que JavaScript trata como falsos cuando los pone a prueba en un `if`
 *   o en un `||`. `false` pertenece a esa categoría, pero no es la categoría.
 *
 * SINTAXIS — los seis falsy, y son solo seis:
 *     false    0    ""    null    undefined    NaN
 *
 *   Todo lo demás es TRUTHY, incluidos los que sorprenden: `"0"`, `[]`, `{}`.
 *
 * EJEMPLO — por qué la distinción no es teórica:
 *     const edad = 0
 *     const visible = edad || 18   // visible vale 18, NO 0
 *
 *   `0` es un número perfectamente válido, pero es falsy, así que `||` lo descarta
 *   y pone el de la derecha. Ese es el bug clásico de `||` con números y textos, y
 *   es la razón de que exista `??`, que solo descarta `null` y `undefined`.
 *
 * 🧠 ANALOGÍA (de apoyo) — el filtro de la puerta. `false` es una persona
 *    concreta a la que no dejan entrar. Falsy es la lista entera de a quién no
 *    dejan entrar. Estar en la lista no te convierte en la lista.
 *
 * 🗣️ LAS PIEZAS
 *     false      → un valor de tipo boolean
 *     falsy      → una categoría de valores, seis en total
 *     ||         → devuelve el derecho si el izquierdo es FALSY
 *     ??         → devuelve el derecho solo si el izquierdo es null o undefined
 *
 * ⚠️ TRAMPA — escribiste "es falso" donde iba "es falsy", y ahí la distinción ERA
 *    el ejercicio: si `0` fuese `false` de verdad, `||` haría bien en descartarlo.
 *    Como no lo es —solo se le parece al ponerlo a prueba— descartarlo es un bug.
 * ───────────────────────────────────────────────────────────────────────────── */

// 5) `0` no es `false`, pero `||` lo descarta igual. ¿Qué es `0`, entonces?
export const r5: "falsy" | "false" | "null" = "SIN_RESPONDER"
// ¿Por qué? →

// 6) Y `false` a secas, ¿qué es?
export const r6: "un valor" | "una categoría" | "un operador" = "SIN_RESPONDER"
// ¿Por qué? →

// 7) `[]` (un array vacío) puesto a prueba en un `if`, ¿qué es?
export const r7: "truthy" | "falsy" | "undefined" = "SIN_RESPONDER"
// ¿Por qué? →

// 8) Quieres descartar solo `null` y `undefined`, y que el `0` sobreviva.
//     ¿Qué operador usas?
export const r8: "??" | "||" | "&&" = "SIN_RESPONDER"
// ¿Por qué? →


/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — juntar texto tiene nombre
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Hay dos formas de armar un texto con piezas. CONCATENAR es pegarlos con `+`.
 *   Un TEMPLATE LITERAL va entre comillas invertidas y admite huecos escritos
 *   `${…}`; cada hueco es una INTERPOLACIÓN. Hacen lo mismo y se llaman distinto.
 *
 * SINTAXIS
 *     "Hola, " + nombre       // concatenación. El `+` es un operador
 *
 *     `Hola, ${nombre}`       // template literal
 *      ▲      ▲
 *      │      └─ una interpolación: el hueco y lo que se mete dentro
 *      └─ comilla invertida (backtick). Es lo que lo convierte en template
 *
 * EJEMPLO — dentro del hueco cabe cualquier expresión, no solo un nombre:
 *     `Tiene ${edad} años`
 *     `Son ${a + b} en total`
 *     `${nombre.toUpperCase()}`
 *
 * 🧠 ANALOGÍA (de apoyo) — el documento con huecos. Concatenar es ir pegando
 *    recortes uno detrás de otro. El template es la plantilla ya impresa con los
 *    espacios en blanco marcados, y solo rellenas los huecos.
 *
 * 🗣️ LAS PIEZAS
 *     `…`          → template literal (o plantilla)
 *     ${…}         → una interpolación
 *     +            → el operador de concatenación, cuando los lados son textos
 *     backtick     → el nombre de la comilla invertida
 *
 * ⚠️ TRAMPA — decir "le sumo el string". Con `+` es defendible, porque hay un
 *    operador de suma de por medio; dentro de un template literal no hay ninguna
 *    suma, hay un hueco que se rellena. Si dices "sumo" quien te escucha busca un
 *    `+` que no existe.
 * ───────────────────────────────────────────────────────────────────────────── */

// 9) En `const saludo = `Hola, ${nombre}``, ¿cómo se llama esa forma de escribir
//     el texto, con comillas invertidas?
export const r9: "template literal" | "concatenación" | "interpolación" = "SIN_RESPONDER"
// ¿Por qué? →

// 10) Y el `${nombre}` de dentro, ¿qué es?
export const r10: "una interpolación" | "un operando" | "una propiedad" = "SIN_RESPONDER"
// ¿Por qué? →

// 11) En `"Hola, " + nombre`, ¿cómo se llama lo que hace el `+` con dos textos?
export const r11: "concatenación" | "interpolación" | "suma" = "SIN_RESPONDER"
// ¿Por qué? →

// 12) En `const largo = nombre.length > 2`, ¿qué es `length`?
export const r12: "una propiedad" | "un método" | "un parámetro" = "SIN_RESPONDER"
// ¿Por qué? →

/* ─────────────────────────────────────────────────────────────────────────────
 * Cuando los 12 estén en verde, la prueba es leer las cinco líneas del
 * recordatorio en voz alta nombrando cada símbolo. Si en alguna dices "esto de
 * aquí", te falta una palabra: búscala.
 * ───────────────────────────────────────────────────────────────────────────── */
