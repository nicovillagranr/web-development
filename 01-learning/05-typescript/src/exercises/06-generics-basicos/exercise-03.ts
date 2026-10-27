/* =============================================================================
 * EJERCICIO 03 — genéricos: utilidades de array (<T>, T[], T | undefined) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Escribir utilidades de array con <T> que devuelven el tipo correcto.
 * · Devolver T | undefined cuando el array puede estar vacío.
 *
 * 🟢 CONTEXTO — un genérico <T> es un hueco que se rellena al llamar. Sirve para
 * funciones que valen para cualquier tipo sin perder precisión: primero de una
 * lista de números devuelve number; de strings, string. El mismo código, el tipo
 * correcto.
 *
 * 🗺️ MAPA
 * TEORÍA · el hueco <T> en utilidades de array → base de todo el archivo
 * BLOQUE A · leer extremos → drills 1–2
 * BLOQUE B · construir arrays → drills 3–4
 * BLOQUE C · capstone: recortar → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-03.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el hueco <T> en utilidades de array
 *
 * DEFINICIÓN
 * Una utilidad genérica de array recibe un T[] y devuelve algo hecho de T: un T, un
 * T[], o un T | undefined si puede faltar.
 *
 * SINTAXIS
 * function primero<T>(xs: T[]): T | undefined {
 *   return xs[0] // con noUncheckedIndexedAccess, xs[0] es T | undefined
 * }
 *
 * Ejemplos:
 * primero([1, 2]) → number | undefined
 * primero(["a"])  → string | undefined
 *
 * 🧠 ANALOGÍA — una caja con etiqueta en blanco: al meter algo (llamar), la
 * etiqueta se rellena con su tipo, y todo lo que sale respeta esa etiqueta.
 *
 * 💡 El T se infiere de lo que pasas; no hace falta escribir primero<number>.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — leer extremos */

/* 1) primero — el primer elemento, o undefined si vacío.
 * primero([1, 2, 3]) → 1 ; primero([]) → undefined
 */
export function primero<T>(xs: T[]): T | undefined {
  return xs[0];
}

/* 2) ultimo — el último elemento, o undefined si vacío.
 * ultimo(["a", "b"]) → "b" ; ultimo([]) → undefined
 */
export function ultimo<T>(xs: T[]): T | undefined {
  return xs[xs.length - 1];
}
ultimo([]); // undefined
ultimo([1, 2, 3, 4, 5, 6, 7, 8]); // 8

/* ▸ BLOQUE B — construir arrays */

/* 3) envolver — mete x en una lista de uno.
 * envolver(5) → [5]
 */
export function envolver<T>(x: T): T[] {
  return [x];
}

/* 4) repetir — x repetido n veces.
 * repetir("x", 3) → ["x", "x", "x"]
 */
export function repetir<T>(x: T, n: number): T[] {
  return Array(n).fill(x); // Array(n) crea un array vacío de longitud n, y fill(x) rellena con x
}
repetir("x", 3); // ['x', 'x', 'x']

/* ▸ BLOQUE C — capstone: recortar */

/* 5) tomar — los primeros n elementos.
 * tomar([1, 2, 3, 4], 2) → [1, 2]
 */
export function tomar<T>(xs: T[], n: number): T[] {
  return xs.slice(0, n);
}
