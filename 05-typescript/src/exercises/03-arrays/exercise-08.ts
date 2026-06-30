/* =============================================================================
 * EJERCICIO 08 — Arrays: aplanar con `flat` y `flatMap`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * A veces tienes listas DENTRO de listas, o cada elemento produce VARIOS. `flat`
 * junta los niveles en uno; `flatMap` es un `map` que, en vez de devolver un
 * elemento por cada uno, devuelve una lista y las aplana todas juntas.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     [[1, 2], [3], [4, 5]].flat()        // [1, 2, 3, 4, 5]
 *     [1, 2, 3].flatMap((n) => [n, n])    // [1, 1, 2, 2, 3, 3]
 *     ["hola mundo"].flatMap((f) => f.split(" "))  // ["hola", "mundo"]
 *
 * `flatMap(fn)` = `map(fn)` seguido de `flat()` (un nivel), en un solo paso.
 *
 * 🧠 ANALOGÍA: `flat` = vaciar varias cajitas en una caja grande (quitas la
 *    separación). `flatMap` = por cada cosa fabricas una bolsita con varios, y al
 *    final lo viertes TODO junto, sin bolsitas.
 *
 * OJO — `flat()` aplana UN nivel por defecto (`flat(2)` para dos). `flatMap`
 *    aplana un nivel: si tu callback devuelve `[a, b]`, salen `a` y `b` sueltos.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-08.test.ts
 * ===========================================================================*/

export type Pedido = { items: { id: number }[] }

/* --- BLOQUE A — flat: juntar niveles --- */

// 1) `aplanar` — una matriz (lista de listas) en una sola lista.
//    aplanar([[1, 2], [3], [4, 5]]) → [1, 2, 3, 4, 5]
export function aplanar(matriz: number[][]): number[] {
  return []
}

/* --- BLOQUE B — flatMap: uno produce varios --- */

// 2) `duplicarCada` — cada número, repetido dos veces.
//    duplicarCada([1, 2, 3]) → [1, 1, 2, 2, 3, 3]
export function duplicarCada(nums: number[]): number[] {
  return []
}

// 3) `palabras` — todas las palabras de todas las frases (separa por espacio).
//    palabras(["hola mundo", "que tal"]) → ["hola", "mundo", "que", "tal"]
export function palabras(frases: string[]): string[] {
  return []
}

/* --- BLOQUE C — flatMap sobre objetos --- */

// 4) `todosLosTags` — junta los tags de todos los posts en una lista.
//    todosLosTags([{tags:["a","b"]},{tags:["c"]}]) → ["a", "b", "c"]
export function todosLosTags(posts: { tags: string[] }[]): string[] {
  return []
}

/* --- BLOQUE C — CAPSTONE: flatMap + map anidado --- */

// 5) `idsDeItems` — todos los ids de los items de todos los pedidos.
//    idsDeItems([{items:[{id:1},{id:2}]},{items:[{id:3}]}]) → [1, 2, 3]
export function idsDeItems(pedidos: Pedido[]): number[] {
  return []
}
