/* =============================================================================
 * EJERCICIO 06 — Narrowing con `Array.isArray` (T | T[])
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Muchas APIs aceptan "uno o varios": `string | string[]`. Para tratarlos igual,
 * NORMALIZAS a array. `Array.isArray(x)` estrecha: dentro del `if`, x es `string[]`;
 * fuera, es `string`.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function aLista(x: string | string[]): string[] {
 *       return Array.isArray(x) ? x : [x]   // si ya es lista, úsala; si no, envuélvelo
 *     }
 *
 * 🧠 ANALOGÍA: te dan "una manzana" o "una bolsa de manzanas". Para cocinar igual,
 *    si te dan una suelta la metes en una bolsa de una. A partir de ahí, todo bolsa.
 *
 * OJO — `Array.isArray` es la forma fiable de distinguir array de no-array
 *    (`typeof [] === "object"`, no sirve).
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-06.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — normalizar a array --- */

// 1) `aLista` — siempre un array (envuelve el suelto).
//    aLista("a") → ["a"] ; aLista(["a", "b"]) → ["a", "b"]
export function aLista(x: string | string[]): string[] {
  return Array.isArray(x) ? x : [x]
}
aLista('a') // ["a"]
aLista(['a', 'b']) // ["a", "b"]

// 2) `cuantos` — cuántos elementos hay (un suelto cuenta como 1).
//    cuantos("a") → 1 ; cuantos(["a", "b"]) → 2
export function cuantos(x: string | string[]): number {
  return Array.isArray(x) ? x.length : 1
}
cuantos('a') // 1
cuantos(['a', 'b']) // 2

/* --- BLOQUE B — leer con cuidado --- */

// 3) `primero` — el primer elemento (o el suelto), "" si lista vacía.
//    primero("a") → "a" ; primero(["x", "y"]) → "x" ; primero([]) → ""
export function primero(x: string | string[]): string {
  return aLista(x)[0] ?? "" // Si hay indice 0, lo devuelve; si no, ""
}
primero('a') // "a"
primero(['x', 'y']) // "x"
primero([]) // ""

// 4) `normalizarTodos` — aplana una lista de "uno o varios" en una sola lista.
//    normalizarTodos(["a", ["b", "c"]]) → ["a", "b", "c"]
export function normalizarTodos(xs: (string | string[])[]): string[] {
  return xs.flat()
}

/* --- BLOQUE C — CAPSTONE: normalizar + unir --- */

// 5) `unirTodo` — junta todo en un texto con `sep` (sea suelto o lista).
//    unirTodo(["a", "b"], "-") → "a-b" ; unirTodo("solo", "-") → "solo"
export function unirTodo(x: string | string[], sep: string): string {
  return aLista(x).join(sep)
}
unirTodo(['a', 'b'], '-') // "a-b"
unirTodo('solo', '-') // "solo"
