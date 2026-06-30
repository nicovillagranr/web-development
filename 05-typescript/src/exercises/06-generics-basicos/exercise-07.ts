/* =============================================================================
 * EJERCICIO 07 — Genéricos: plegar/reducir (`reduce` con tipos `<T, U>`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `reduce` es el motor de "combinar una lista en un solo resultado". Como genérico
 * `<T, U>`: entran elementos `T`, y el acumulador es de tipo `U` (que puede ser otro
 * tipo: number, objeto, lo que devuelva el combinador).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function plegar<T, U>(xs: T[], inicial: U, combinar: (acc: U, x: T) => U): U {
 *       return xs.reduce(combinar, inicial)
 *     }
 *     plegar([1, 2, 3], 0, (acc, n) => acc + n)   // 6
 *
 * 🧠 ANALOGÍA: una alcancía. `inicial` es lo que hay al empezar; cada elemento se
 *    "echa" con la regla `combinar`; al final sacas el total.
 *
 * OJO — el `inicial` marca el tipo `U` del acumulador (number, string, objeto...).
 *    Sin inicial, reduce explota en lista vacía.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-07.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — plegar genérico y sumar por criterio --- */

// 1) `plegar` — reduce genérico: combina la lista en un `U`.
//    plegar([1, 2, 3], 0, (acc, n) => acc + n) → 6
export function plegar<T, U>(xs: T[], inicial: U, combinar: (acc: U, x: T) => U): U {
  return inicial
}

// 2) `total` — suma de `valor(x)` de cada elemento.
//    total([{ p: 10 }, { p: 5 }], (x) => x.p) → 15
export function total<T>(xs: T[], valor: (x: T) => number): number {
  return 0
}

/* --- BLOQUE B — acumular en objeto, y comprobar --- */

// 3) `contarPor` — cuántos elementos caen en cada clave.
//    contarPor(["a", "b", "a"], (x) => x) → { a: 2, b: 1 }
export function contarPor<T>(xs: T[], clave: (x: T) => string): Record<string, number> {
  return {}
}

// 4) `algunoCumple` — ¿alguno cumple `pred`?
//    algunoCumple([1, 2, 3], (n) => n > 2) → true
export function algunoCumple<T>(xs: T[], pred: (x: T) => boolean): boolean {
  return false
}

/* --- BLOQUE C — CAPSTONE: dos agregados a la vez --- */

// 5) `resumenNumerico` — la suma de `valor(x)` y cuántos hay.
//    resumenNumerico([{ p: 10 }, { p: 20 }], (x) => x.p) → { suma: 30, cantidad: 2 }
export function resumenNumerico<T>(
  xs: T[],
  valor: (x: T) => number,
): { suma: number; cantidad: number } {
  return { suma: 0, cantidad: 0 }
}
