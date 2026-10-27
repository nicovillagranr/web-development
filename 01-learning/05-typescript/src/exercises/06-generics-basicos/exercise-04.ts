/* =============================================================================
 * EJERCICIO 04 — genéricos con callbacks (<T>, <T, U>) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Envolver map, filter y find en funciones genéricas propias.
 * · Usar dos parámetros de tipo cuando el callback cambia el tipo: T entra, U sale.
 *
 * 🟢 CONTEXTO — map, filter y find ya son genéricos por dentro. Aquí los envuelves
 * en tus propias funciones genéricas.
 *
 * 🗺️ MAPA
 * TEORÍA · T entra, U sale → base de todo el archivo
 * BLOQUE A · map y filter genéricos → drills 1–2
 * BLOQUE B · find y contar → drills 3–4
 * BLOQUE C · capstone: map + filter encadenados → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-04.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — T entra, U sale
 *
 * DEFINICIÓN
 * En <T, U>, T es lo que entra y U lo que sale, y U lo decide el callback: puede
 * cambiar de tipo.
 *
 * SINTAXIS
 * function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {
 *   return xs.map(fn)
 * }
 *
 * Ejemplos:
 * mapear([1, 2], (n) => `#${n}`) → T = number, U = string: string[]
 *
 * 🧠 ANALOGÍA — una cinta de montaje configurable: entran piezas T, tú pones la
 * máquina (fn), y salen piezas U del tipo que esa máquina produzca.
 *
 * ⚠️ TRAMPA — el tipo de salida (U) lo decide lo que devuelve el callback, no tú.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — map y filter genéricos */

/* 1) mapear — transforma cada elemento con fn.
 * mapear([1, 2], (n) => n * 2) → [2, 4]
 */
export function mapear<T, U>(xs: T[], fn: (x: T) => U): U[] {
  return xs.map((x) => fn(x));
}
mapear([1, 2], (n) => n * 2); // [2, 4]

/* 2) filtrar — quédate con los que cumplen pred.
 * filtrar([1, 2, 3], (n) => n > 1) → [2, 3]
 */
export function filtrar<T>(xs: T[], pred: (x: T) => boolean): T[] {
  return xs.filter((x) => pred(x));
}
filtrar([1, 2, 3], (n) => n > 1); // [2, 3]

/* ▸ BLOQUE B — find y contar */

/* 3) encontrar — el primero que cumple, o undefined.
 * encontrar([1, 2, 3], (n) => n > 1) → 2 ; encontrar([1], (n) => n > 5) → undefined
 */
export function encontrar<T>(xs: T[], pred: (x: T) => boolean): T | undefined {
  return xs.find((x) => pred(x));
}

/* 4) contarSi — cuántos cumplen pred.
 * contarSi([1, 2, 3, 4], (n) => n % 2 === 0) → 2
 */
export function contarSi<T>(xs: T[], pred: (x: T) => boolean): number {
  return xs.filter((x) => pred(x)).length;
}

/* ▸ BLOQUE C — capstone: map + filter encadenados */

/* 5) mapearYfiltrar — transforma con fn y luego deja los que cumplen pred.
 * mapearYfiltrar([1, 2, 3], (n) => n * 10, (n) => n > 15) → [20, 30]
 */
export function mapearYfiltrar<T, U>(xs: T[], fn: (x: T) => U, pred: (u: U) => boolean): U[] {
  return xs.map((x) => fn(x)).filter((u) => pred(u));
}
