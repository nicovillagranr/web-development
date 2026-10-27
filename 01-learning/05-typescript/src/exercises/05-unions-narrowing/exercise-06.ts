/* =============================================================================
 * EJERCICIO 06 — narrowing con Array.isArray (T | T[]) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Distinguir un valor suelto de un array con Array.isArray.
 * · Normalizar «uno o varios» a un array para tratarlos igual.
 *
 * 🟢 CONTEXTO — muchas APIs aceptan «uno o varios»: string | string[]. Para
 * tratarlos igual, normalizas a array.
 *
 * 🗺️ MAPA
 * TEORÍA · Array.isArray y la normalización → base de todo el archivo
 * BLOQUE A · normalizar a array → drills 1–2
 * BLOQUE B · leer con cuidado → drills 3–4
 * BLOQUE C · capstone: normalizar + unir → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-06.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — Array.isArray y la normalización
 *
 * DEFINICIÓN
 * Array.isArray(x) estrecha: dentro del if, x es string[]; fuera, es string.
 *
 * SINTAXIS
 * function aLista(x: string | string[]): string[] {
 *   return Array.isArray(x) ? x : [x] // si ya es lista, úsala; si no, envuélvelo
 * }
 *
 * 🧠 ANALOGÍA — te dan «una manzana» o «una bolsa de manzanas». Para cocinar igual,
 * si te dan una suelta la metes en una bolsa de una, y a partir de ahí, todo bolsa.
 *
 * ⚠️ TRAMPA — typeof no sirve: typeof [] === "object". Array.isArray es la forma
 * fiable de distinguir un array de lo que no lo es.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — normalizar a array */

/* 1) aLista — siempre un array (envuelve el suelto).
 * aLista("a") → ["a"] ; aLista(["a", "b"]) → ["a", "b"]
 */
export function aLista(x: string | string[]): string[] {
  return Array.isArray(x) ? x : [x];
}
aLista("a"); // ["a"]
aLista(["a", "b"]); // ["a", "b"]

/* 2) cuantos — cuántos elementos hay (un suelto cuenta como 1).
 * cuantos("a") → 1 ; cuantos(["a", "b"]) → 2
 */
export function cuantos(x: string | string[]): number {
  return Array.isArray(x) ? x.length : 1;
}
cuantos("a"); // 1
cuantos(["a", "b"]); // 2

/* ▸ BLOQUE B — leer con cuidado */

/* 3) primero — el primer elemento (o el suelto), "" si lista vacía.
 * primero("a") → "a" ; primero(["x", "y"]) → "x" ; primero([]) → ""
 */
export function primero(x: string | string[]): string {
  return aLista(x)[0] ?? ""; // Si hay indice 0, lo devuelve; si no, ""
}
primero("a"); // "a"
primero(["x", "y"]); // "x"
primero([]); // ""

/* 4) normalizarTodos — aplana una lista de "uno o varios" en una sola lista.
 * normalizarTodos(["a", ["b", "c"]]) → ["a", "b", "c"]
 */
export function normalizarTodos(xs: (string | string[])[]): string[] {
  return xs.flat();
}

/* ▸ BLOQUE C — capstone: normalizar + unir */

/* 5) unirTodo — junta todo en un texto con sep (sea suelto o lista).
 * unirTodo(["a", "b"], "-") → "a-b" ; unirTodo("solo", "-") → "solo"
 */
export function unirTodo(x: string | string[], sep: string): string {
  return aLista(x).join(sep);
}
unirTodo(["a", "b"], "-"); // "a-b"
unirTodo("solo", "-"); // "solo"
