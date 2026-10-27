/* =============================================================================
 * EJERCICIO 06 — genéricos: conjuntos y duplicados (Set<T>) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Quitar duplicados y comprobar pertenencia con funciones genéricas.
 * · Añadir y quitar elementos sin mutar la lista.
 *
 * 🟢 CONTEXTO — quitar repetidos, comprobar pertenencia, añadir sin duplicar… son
 * operaciones que valen para cualquier tipo.
 *
 * 🗺️ MAPA
 * TEORÍA · Set e includes → base de todo el archivo
 * BLOQUE A · únicos y pertenencia → drills 1–2
 * BLOQUE B · quitar y añadir sin duplicar → drills 3–4
 * BLOQUE C · capstone: unir sin duplicar → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-06.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — Set e includes
 *
 * DEFINICIÓN
 * new Set(xs) quita los duplicados (por igualdad ===), y [...set] lo vuelve a
 * array. includes dice si un valor está en la lista.
 *
 * Ejemplos:
 * [...new Set([1, 1, 2])] → [1, 2]
 * [1, 2].includes(2)      → true
 *
 * 🧠 ANALOGÍA — un álbum de láminas: una repetida no ocupa un segundo hueco; el Set
 * se queda con una de cada.
 *
 * ⚠️ TRAMPA — el Set compara por identidad (===): sirve para primitivos (number,
 * string). Dos objetos distintos con los mismos campos no se consideran iguales.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — únicos y pertenencia */

/* 1) unicos — la lista sin duplicados.
 * unicos([1, 1, 2, 3, 3]) → [1, 2, 3]
 */
export function unicos<T>(xs: T[]): T[] {
  return xs.filter((x, i) => xs.indexOf(x) === i);
}

/* 2) incluye — ¿está x en la lista?
 * incluye([1, 2, 3], 2) → true ; incluye([1], 9) → false
 */
export function incluye<T>(xs: T[], x: T): boolean {
  return xs.includes(x);
}

/* ▸ BLOQUE B — quitar y añadir sin duplicar */

/* 3) sinElemento — la lista sin las apariciones de x (inmutable).
 * sinElemento([1, 2, 1, 3], 1) → [2, 3]
 */
export function sinElemento<T>(xs: T[], x: T): T[] {
  return xs.filter((elemento) => elemento !== x); // Un nuevo array filtrará todos los elementos que sean diferentes a x
}

/* 4) agregarUnico — añade x solo si no estaba (inmutable).
 * agregarUnico([1, 2], 3) → [1, 2, 3] ; agregarUnico([1, 2], 2) → [1, 2]
 */
export function agregarUnico<T>(xs: T[], x: T): T[] {
  return xs.includes(x) ? xs : [...xs, x];
}

/* ▸ BLOQUE C — capstone: unir sin duplicar */

/* 5) combinarUnicos — junta dos listas quitando duplicados.
 * combinarUnicos([1, 2], [2, 3]) → [1, 2, 3]
 */
export function combinarUnicos<T>(a: T[], b: T[]): T[] {
  return [...new Set([...a, ...b])];
}
