/* =============================================================================
 * EJERCICIO 03 — Genéricos: utilidades de array (`<T>`, `T[]`, `T | undefined`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un genérico `<T>` es un HUECO que se rellena al LLAMAR. Sirve para funciones que
 * valen para CUALQUIER tipo sin perder precisión: `primero` de una lista de números
 * devuelve number; de strings, string. El mismo código, el tipo correcto.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function primero<T>(xs: T[]): T | undefined {
 *       return xs[0]   // con noUncheckedIndexedAccess, xs[0] es T | undefined
 *     }
 *     primero([1, 2])     // number | undefined
 *     primero(["a"])      // string | undefined
 *
 * 🧠 ANALOGÍA: una caja con etiqueta en blanco. Al meter algo (llamar), la etiqueta
 *    se rellena con SU tipo, y todo lo que sale respeta esa etiqueta.
 *
 * OJO — el `T` se INFIERE de lo que pasas; no hace falta escribir `primero<number>`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-03.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — leer extremos --- */

// 1) `primero` — el primer elemento, o undefined si vacío.
//    primero([1, 2, 3]) → 1 ; primero([]) → undefined
export function primero<T>(xs: T[]): T | undefined {
  return undefined
}

// 2) `ultimo` — el último elemento, o undefined si vacío.
//    ultimo(["a", "b"]) → "b" ; ultimo([]) → undefined
export function ultimo<T>(xs: T[]): T | undefined {
  return undefined
}

/* --- BLOQUE B — construir arrays --- */

// 3) `envolver` — mete `x` en una lista de uno.
//    envolver(5) → [5]
export function envolver<T>(x: T): T[] {
  return []
}

// 4) `repetir` — `x` repetido `n` veces.
//    repetir("x", 3) → ["x", "x", "x"]
export function repetir<T>(x: T, n: number): T[] {
  return []
}

/* --- BLOQUE C — CAPSTONE: recortar --- */

// 5) `tomar` — los primeros `n` elementos.
//    tomar([1, 2, 3, 4], 2) → [1, 2]
export function tomar<T>(xs: T[], n: number): T[] {
  return []
}
