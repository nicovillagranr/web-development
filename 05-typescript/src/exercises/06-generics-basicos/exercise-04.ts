/* =============================================================================
 * EJERCICIO 04 — Genéricos con callbacks (`<T>`, `<T, U>`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `map`/`filter`/`find` ya son genéricos por dentro. Aquí los envuelves en TUS
 * funciones genéricas. En `<T, U>`, `T` es lo que ENTRA y `U` lo que decide el
 * callback que SALE (puede cambiar de tipo).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {
 *       return xs.map(fn)
 *     }
 *     mapear([1, 2], (n) => `#${n}`)   // T=number, U=string → string[]
 *
 * 🧠 ANALOGÍA: una cinta de montaje configurable. Entran piezas `T`, tú pones la
 *    máquina (`fn`), y salen piezas `U` del tipo que esa máquina produzca.
 *
 * OJO — el tipo de SALIDA (`U`) lo decide lo que devuelve el callback, no tú.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-04.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — map y filter genéricos --- */

// 1) `mapear` — transforma cada elemento con `fn`.
//    mapear([1, 2], (n) => n * 2) → [2, 4]
export function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {
  return []
}

// 2) `filtrar` — quédate con los que cumplen `pred`.
//    filtrar([1, 2, 3], (n) => n > 1) → [2, 3]
export function filtrar<T>(xs: T[], pred: (x: T) => boolean): T[] {
  return []
}

/* --- BLOQUE B — find y contar --- */

// 3) `encontrar` — el primero que cumple, o undefined.
//    encontrar([1, 2, 3], (n) => n > 1) → 2 ; encontrar([1], (n) => n > 5) → undefined
export function encontrar<T>(xs: T[], pred: (x: T) => boolean): T | undefined {
  return undefined
}

// 4) `contarSi` — cuántos cumplen `pred`.
//    contarSi([1, 2, 3, 4], (n) => n % 2 === 0) → 2
export function contarSi<T>(xs: T[], pred: (x: T) => boolean): number {
  return 0
}

/* --- BLOQUE C — CAPSTONE: map + filter encadenados --- */

// 5) `mapearYfiltrar` — transforma con `fn` y luego deja los que cumplen `pred`.
//    mapearYfiltrar([1, 2, 3], (n) => n * 10, (n) => n > 15) → [20, 30]
export function mapearYfiltrar<T, U>(xs: T[], fn: (x: T) => U, pred: (u: U) => boolean): U[] {
  return []
}
