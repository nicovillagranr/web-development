/* =============================================================================
 * EJERCICIO 07 — Objetos: transformar los VALORES (entries → map → fromEntries)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `map` transforma listas, no objetos. Para transformar un diccionario haces el
 * viaje de ida y vuelta: objeto → `entries` (lista de pares) → `map`/`filter` →
 * `Object.fromEntries` (vuelve a objeto).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     const o = { a: 1, b: 2 }
 *     Object.fromEntries(
 *       Object.entries(o).map(([k, v]): [string, number] => [k, v * 2]),
 *     )   // → { a: 2, b: 4 }
 *
 * 🧠 ANALOGÍA: desarmas el mueble en piezas (entries), las pintas una a una (map),
 *    y lo vuelves a montar (fromEntries).
 *
 * OJO — el callback del `map` debe devolver una TUPLA `[clave, valor]`. Anótalo
 *    `([k, v]): [string, number] => [k, ...]` para que TS no lo lea como un array
 *    suelto (`(string | number)[]`) y `fromEntries` lo acepte.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-07.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — transformar cada valor --- */

// Explicación de Object.entries:
//  const o = { a: 1, b: 2 }
//  Object.entries(o)  // [["a", 1], ["b", 2]]


// 1) `duplicarValores` — cada valor por 2.
//    duplicarValores({ a: 2, b: 3 }) → { a: 4, b: 6 }
export function duplicarValores(obj: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.entries(obj).map(([clave, valor]) => [clave, valor * 2]))
}
duplicarValores({ a: 2, b: 3 }) // -> { a: 4, b: 6 }

// 2) `incrementar` — suma `n` a cada valor.
//    incrementar({ a: 1 }, 10) → { a: 11 }
export function incrementar(obj: Record<string, number>, n: number): Record<string, number> {
  return Object.fromEntries(Object.entries(obj).map(([clave, valor]) => [clave, valor + n]))
}
incrementar({ a: 1 }, 10) // -> { a: 11 }


/* --- BLOQUE B — filtrar pares, y cambiar el tipo del valor --- */

// 3) `soloPositivos` — quita los pares cuyo valor no sea > 0.
//    soloPositivos({ a: 1, b: -2, c: 3 }) → { a: 1, c: 3 }
export function soloPositivos(obj: Record<string, number>): Record<string, number> {
  return {}
}

// 4) `valoresATexto` — convierte cada valor number a "$valor" (string).
//    valoresATexto({ a: 5 }) → { a: "$5" }
export function valoresATexto(obj: Record<string, number>): Record<string, string> {
  return {}
}

/* --- BLOQUE C — CAPSTONE: aplicar un porcentaje a cada valor --- */

// 5) `aplicarDescuento` — baja cada precio un `pct` por ciento.
//    aplicarDescuento({ a: 100 }, 10) → { a: 90 }
export function aplicarDescuento(precios: Record<string, number>, pct: number): Record<string, number> {
  return {}
}

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE E — ESCALERA DE REFUERZO: desarmar el viaje entries → map → fromEntries
 * ════════════════════════════════════════════════════════════════════════════
 *
 * La línea del drill 1, entera:
 *
 *     Object.fromEntries(Object.entries(obj).map(([clave, valor]) => [clave, valor * 2]))
 *
 * Otra vez el mismo truco de siempre: NO es una cosa, son varias apiladas. Y como
 * en el 06, cada una se entiende sola. Las cuatro ideas que hay debajo:
 *
 *   1. Un objeto NO tiene `.map`.  `.map`/`.filter`/`.reduce` son cosas de LISTAS.
 *      `Object.entries` es el traductor objeto → lista para poder usarlas.
 *
 *   2. Un "par" es un ARRAY DE DOS CASILLAS: ["a", 2]. Casilla [0] = clave,
 *      casilla [1] = valor. Lo único especial es que la POSICIÓN significa algo.
 *      `Object.entries` devuelve un array DE ESOS: un array de arrays.
 *
 *   3. El `[clave, valor]` en el parámetro es DESEMPAQUETADO, no dos parámetros.
 *      El callback recibe UNA sola cosa por vuelta (el par). Estas dos son la
 *      MISMA función:
 *          (par) => [par[0], par[1] * 2]              ← recibo la caja, la abro yo
 *          ([clave, valor]) => [clave, valor * 2]     ← que me la abran al entrar
 *
 *      ⚠️ OJO al contraste con el 06: allí `[palabra]:` en la posición del NOMBRE
 *         de una propiedad CALCULABA un nombre. Aquí `[clave, valor]` en la
 *         posición de un PARÁMETRO ABRE un array. Mismo corchete, dos oficios
 *         distintos según dónde esté plantado.
 *
 *   4. `Object.fromEntries` es el botón DESHACER de `entries`. Le das la lista de
 *      pares y remonta el objeto (casilla 0 → clave, casilla 1 → valor).
 *
 * 🧠 ANALOGÍA: desarmas el mueble en piezas (entries), pintas las piezas una a una
 *    (map), y lo vuelves a montar (fromEntries). El mueble original no se toca:
 *    sales con uno nuevo.
 *
 * La escalera sube: MIRAR los pares → abrir UN par → recorrerlos con map → montar
 * el objeto → el viaje de ida y vuelta → el drill 1 comprimido.
 * ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-07.test.ts
 * ==========================================================================*/

/* ── E-A — MIRAR: qué es exactamente lo que devuelve `entries` ── */

// E1) `pares` — el objeto, convertido en lista de pares. Sin transformar nada.
//     Devuélvelo tal cual te lo da `Object.entries`. Solo quiero que lo veas.
//     pares({ a: 2, b: 3 }) → [["a", 2], ["b", 3]]
export function pares(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj) // Recibe: { a: 2, b: 3 } Devuelve: [["a", 2], ["b", 3]]
}
pares({ a: 2, b: 3 }) // -> [["a", 2], ["b", 3]]

// E2) `cuantosPares` — cuántos pares tiene. (Es una LISTA: tiene `.length`.)
//     La pregunta que responde este drill: ¿de verdad es un array? Sí.
//     cuantosPares({ a: 2, b: 3 }) → 2 ; cuantosPares({}) → 0
export function cuantosPares(obj: Record<string, number>): number {
  return Object.entries(obj).length
}
cuantosPares({ a: 2, b: 3 }) // -> 2

// E3) `primerPar` — el primer par de la lista, o `undefined` si el objeto va vacío.
//     Recuerda `noUncheckedIndexedAccess`: leer `lista[0]` te da `T | undefined`,
//     porque la lista podría estar vacía. El tipo de retorno ya lo contempla.
//     primerPar({ a: 2, b: 3 }) → ["a", 2] ; primerPar({}) → undefined
export function primerPar(obj: Record<string, number>): [string, number] | undefined {
  return Object.entries(obj)[0]
}
primerPar({ a: 2, b: 3 }) // -> ["a", 2]
primerPar({ a: 5, b: 10 }) // -> ["a", 5]

/* ── E-B — ABRIR UN PAR: la casilla [0] y la casilla [1] ── */

// E4) `claveDe` — la clave de un par. (Casilla 0. Acceso por índice, a pelo.)
//     claveDe(["a", 2]) → "a"
export function claveDe(par: [string, number]): string {
  return par[0]
}
claveDe(["a", 2]) // -> "a"
claveDe(["b", 3]) // -> "b"

// E5) `valorDe` — el valor de un par. (Casilla 1.)
//     valorDe(["a", 2]) → 2
export function valorDe(par: [string, number]): number {
  return par[1]
}
valorDe(["a", 2]) // -> 2
valorDe(["b", 3]) // -> 3

// E6) `describirPar` — el par, como texto "clave=valor".
//     Escríbelo usando `par[0]` y `par[1]`, sin desempaquetar. A pelo.
//     describirPar(["a", 2]) → "a=2"
export function describirPar(par: [string, number]): string {
  return `${par[0]} =${par[1]}`
}

// E7) ⭐ `describirParBis` — EXACTAMENTE lo mismo que E6, mismo resultado, pero
//     desempaquetando en el PARÁMETRO en vez de acceder por índice.
//
//     ESTE ES EL ESCALÓN CLAVE del bloque. Fíjate en la firma que te dejo escrita:
//
//         function describirParBis([clave, valor]: [string, number]): string
//                                  ^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^
//                                  los NOMBRES     el TIPO de lo que llega
//                                  que le pones    (UN par, no dos cosas)
//
//     Sigue recibiendo UN solo argumento. Los corchetes de la izquierda no crean
//     dos parámetros: abren el que llega y bautizan sus dos casillas. Dentro del
//     cuerpo ya no tienes `par`: tienes `clave` y `valor` directamente.
//
//     Compara E6 y E7 cuando los tengas: son la misma función con distinta puerta.
//     describirParBis(["a", 2]) → "a=2"
export function describirParBis([clave, valor]: [string, number]): string {
  return `${clave}=${valor}`
}
describirParBis(["a", 2])

/* ── E-C — RECORRER los pares con `.map` (todavía SIN volver a montar) ── */

// E8) `soloClaves` — la lista de claves. Sale un array de strings, NO un objeto.
//     Ya puedes usar `.map` porque `entries` te ha dado una lista.
//     soloClaves({ a: 2, b: 3 }) → ["a", "b"]
export function soloClaves(obj: Record<string, number>): string[] {
  return Object.entries(obj).map(([clave]) => clave)
}
soloClaves({ a: 2, b: 3 }) // -> ["a", "b"]

// E9) `soloValores` — la lista de valores.
//     soloValores({ a: 2, b: 3 }) → [2, 3]
export function soloValores(obj: Record<string, number>): number[] {
  return Object.entries(obj).map(([, valor]) => valor)
}

// E10) `descripciones` — cada par como texto. (Es E7, ahora aplicado a la lista.)
//      descripciones({ a: 2, b: 3 }) → ["a=2", "b=3"]
export function descripciones(obj: Record<string, number>): string[] {
  return Object.entries(obj).map(describirParBis)
}
descripciones({ a: 2, b: 3 }) // -> ["a=2", "b=3"]

/* ── E-D — MONTAR: `fromEntries` solo, sin `entries` delante ── */

// E11) `montar` — te DOY la lista de pares ya hecha. Conviértela en objeto.
//      Aquí no hay entries ni map: solo el botón DESHACER.
//      montar([["a", 1], ["b", 2]]) → { a: 1, b: 2 }
export function montar(lista: [string, number][]): Record<string, number> {
  return Object.fromEntries(lista)
}
montar([["a", 1], ["b", 2]]) // -> { a: 1, b: 2 }

/* ── E-E — EL VIAJE COMPLETO ── */

// E12) `clonarViaEntries` — desarma y vuelve a montar SIN tocar nada por el camino.
//      Sale un objeto igual al que entró. Parece inútil, y ese es el punto: demuestra
//      que `entries` y `fromEntries` son inversas la una de la otra.
//      clonarViaEntries({ a: 2, b: 3 }) → { a: 2, b: 3 }
export function clonarViaEntries(obj: Record<string, number>): Record<string, number> {
  // Object.entries(obj) -> [["a", 2], ["b", 3]]
  // Object.fromEntries([["a", 2], ["b", 3]])
  // Flujo Completo:
  // [["a", 2], ["b", 3]] -> { a: 2, b: 3 }
  return Object.fromEntries(Object.entries(obj))
}

// E13) ⭐ `duplicarPasoAPaso` — el drill 1, pero escrito en TRES LÍNEAS con una
//      variable por parada del viaje. Nada de encadenar. Quiero ver las paradas.
//
//          const lista = ...        // parada 1: la lista de pares
//          const pintados = ...     // parada 2: la lista con los valores por 2
//          return ...               // parada 3: el objeto remontado
//
//      ⚠️ ANOTA EL TIPO DE `pintados` a mano: `const pintados: [string, number][]`.
//         Cuando el `.map` va DENTRO del paréntesis de `fromEntries` (como en el
//         drill 1), TS deduce solo que eso son tuplas. Pero al sacarlo a una
//         variable pierde esa ayuda, infiere `(string | number)[][]`, y entonces
//         `fromEntries` se lo traga por una puerta trasera que devuelve `any`:
//         te compila, te pasa el test, y te has quedado SIN tipos y sin enterarte.
//         Es el peligro de este archivo: aquí TS no grita, aquí TS CALLA.
//
//      duplicarPasoAPaso({ a: 2, b: 3 }) → { a: 4, b: 6 }
export function duplicarPasoAPaso(obj: Record<string, number>): Record<string, number> {
  const lista = Object.entries(obj) // -> Recibe: { a: 2, b: 3 } y devuelve: [["a", 2], ["b", 3]]
  const pintados: [string, number][] = lista.map(([clave, valor]) => [clave, valor * 2]) // -> Recibe: [["a", 2], ["b", 3]] y devuelve: [["a", 4], ["b", 6]]
  return Object.fromEntries(pintados) // -> Recibe: [["a", 4], ["b", 6]] y devuelve: { a: 4, b: 6 }
}
duplicarPasoAPaso({ a: 2, b: 3 }) // -> { a: 4, b: 6 }

// E14) `duplicarEnCadena` — lo MISMO que E13, pero encadenado en una sola expresión,
//      sin variables intermedias. Es decir: tu drill 1, otra vez, desde cero.
//      Si has subido la escalera, esta línea ya no es un jeroglífico: es E12 con un
//      `.map` metido en medio, y el `.map` es E7.
//      duplicarEnCadena({ a: 2, b: 3 }) → { a: 4, b: 6 }
export function duplicarEnCadena(obj: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.entries(obj).map(([clave, valor]) => [clave, valor * 2]))
}
duplicarEnCadena({ a: 2, b: 3 }) // -> { a: 4, b: 6 }
