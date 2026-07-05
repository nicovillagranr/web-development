/* =============================================================================
 * EJERCICIO 05 — Objetos: recorrer con Object.keys / values / entries
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un array lo recorres directo. Un objeto no: primero sacas sus CLAVES, sus
 * VALORES, o sus PARES [clave, valor], y eso ya es un array que sí puedes
 * recorrer con map/filter/reduce.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     const o = { a: 1, b: 2 }
 *     Object.keys(o)     // ["a", "b"]
 *     Object.values(o)   // [1, 2]
 *     Object.entries(o)  // [["a", 1], ["b", 2]]   ← cada par es una tupla [clave, valor]
 *
 * 🧠 ANALOGÍA: un casillero con etiquetas. `keys` = lista de etiquetas, `values` =
 *    lo guardado en cada uno, `entries` = parejas etiqueta→contenido.
 *
 * OJO — `entries` da TUPLAS `[string, number]`. En el callback las desestructuras:
 *    `.map(([clave, valor]) => ...)`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-05.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — keys y values --- */

// 1) `clavesDe` — las claves del objeto.
//    clavesDe({ a: 1, b: 2 }) → ["a", "b"]
export function clavesDe(obj: Record<string, number>): string[] {
  return Object.keys(obj)
}
// return: ["a", "b"]
clavesDe({ a: 1, b: 2 })

// 2) `valoresDe` — los valores del objeto.
//    valoresDe({ a: 1, b: 2 }) → [1, 2]
export function valoresDe(obj: Record<string, number>): number[] {
  return Object.values(obj)
}
// return: [1, 2]
valoresDe({ a: 1, b: 2 })

/* --- BLOQUE B — values + reduce, y entries --- */

// 3) `sumaDeValores` — la suma de todos los valores.
//    sumaDeValores({ a: 1, b: 2, c: 3 }) → 6
export function sumaDeValores(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acumulador, valor) => acumulador + valor, 0)
}
// return: 6
sumaDeValores({ a: 1, b: 2, c: 3 })

// 4) `paresClaveValor` — los pares [clave, valor].
//    paresClaveValor({ a: 1 }) → [["a", 1]]
export function paresClaveValor(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj)
}

/* --- BLOQUE C — CAPSTONE: entries + map + join --- */

// 5) `describir` — "clave=valor" de cada par, unidos por ", ".
//    describir({ a: 1, b: 2 }) → "a=1, b=2"
export function describir(obj: Record<string, number>): string {
  return Object.entries(obj).map(([clave, valor]) => `${clave}=${valor}`).join(", ")
}
