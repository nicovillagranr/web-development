/* =============================================================================
 * EJERCICIO 06 — Genéricos: conjuntos y duplicados (`Set<T>`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Quitar repetidos, comprobar pertenencia, añadir sin duplicar... operaciones que
 * valen para cualquier tipo. `new Set(xs)` quita duplicados (por igualdad `===`) y
 * `[...set]` lo vuelve a array.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     [...new Set([1, 1, 2])]   // [1, 2]
 *     [1, 2].includes(2)        // true
 *
 * 🧠 ANALOGÍA: un álbum de láminas. Una repetida no ocupa un segundo hueco; el Set
 *    se queda con una de cada.
 *
 * OJO — el Set compara por identidad (`===`): sirve para primitivos (number,
 *    string). Dos objetos distintos con los mismos campos NO se consideran iguales.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-06.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — únicos y pertenencia --- */

// 1) `unicos` — la lista sin duplicados.
//    unicos([1, 1, 2, 3, 3]) → [1, 2, 3]
export function unicos<T>(xs: T[]): T[] {
  return []
}

// 2) `incluye` — ¿está `x` en la lista?
//    incluye([1, 2, 3], 2) → true ; incluye([1], 9) → false
export function incluye<T>(xs: T[], x: T): boolean {
  return false
}

/* --- BLOQUE B — quitar y añadir sin duplicar --- */

// 3) `sinElemento` — la lista sin las apariciones de `x` (inmutable).
//    sinElemento([1, 2, 1, 3], 1) → [2, 3]
export function sinElemento<T>(xs: T[], x: T): T[] {
  return []
}

// 4) `agregarUnico` — añade `x` solo si no estaba (inmutable).
//    agregarUnico([1, 2], 3) → [1, 2, 3] ; agregarUnico([1, 2], 2) → [1, 2]
export function agregarUnico<T>(xs: T[], x: T): T[] {
  return xs
}

/* --- BLOQUE C — CAPSTONE: unir sin duplicar --- */

// 5) `combinarUnicos` — junta dos listas quitando duplicados.
//    combinarUnicos([1, 2], [2, 3]) → [1, 2, 3]
export function combinarUnicos<T>(a: T[], b: T[]): T[] {
  return []
}
