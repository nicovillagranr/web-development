/* =============================================================================
 * EJERCICIO 08 — arrays: aplanar con flat y flatMap · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Juntar listas dentro de listas en un solo nivel con flat.
 * · Producir varios elementos por cada uno con flatMap.
 *
 * 🟢 CONTEXTO — a veces tienes listas dentro de listas, o cada elemento produce
 * varios. flat junta los niveles en uno; flatMap es un map que, en vez de devolver
 * un elemento por cada uno, devuelve una lista, y las aplana todas juntas.
 *
 * 🗺️ MAPA
 * TEORÍA · flat y flatMap → base de todo el archivo
 * BLOQUE A · flat: juntar niveles → drill 1
 * BLOQUE B · flatMap: uno produce varios → drills 2–3
 * BLOQUE C · flatMap sobre objetos → drill 4
 * BLOQUE D · capstone: flatMap + map anidado → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/03-arrays/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — flat y flatMap
 *
 * DEFINICIÓN
 * flatMap(fn) es map(fn) seguido de flat() (un nivel), en un solo paso.
 *
 * Ejemplos:
 * [[1, 2], [3], [4, 5]].flat()               → [1, 2, 3, 4, 5]
 * [1, 2, 3].flatMap((n) => [n, n])           → [1, 1, 2, 2, 3, 3]
 * ["hola mundo"].flatMap((f) => f.split(" ")) → ["hola", "mundo"]
 *
 * 🧠 ANALOGÍA — flat es vaciar varias cajitas en una caja grande: quitas la
 * separación. flatMap es fabricar, por cada cosa, una bolsita con varios, y al
 * final verterlo todo junto, sin bolsitas.
 *
 * ⚠️ TRAMPA — flat() aplana un nivel por defecto (flat(2) para dos), y flatMap
 * aplana un nivel: si tu callback devuelve [a, b], salen a y b sueltos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — flat: juntar niveles */

/* 1) aplanar — una matriz (lista de listas) en una sola lista.
 * aplanar([[1, 2], [3], [4, 5]]) → [1, 2, 3, 4, 5]
 */
export function aplanar(matriz: number[][]): number[] {
  return matriz.flat();
}

/* ▸ BLOQUE B — flatMap: uno produce varios */

/* 2) duplicarCada — cada número, repetido dos veces.
 * duplicarCada([1, 2, 3]) → [1, 1, 2, 2, 3, 3]
 */
export function duplicarCada(nums: number[]): number[] {
  return nums.flatMap((n) => [n, n]);
}
duplicarCada([1, 2, 3, 4, 5]); // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]

/* 3) palabras — todas las palabras de todas las frases (separa por espacio).
 * palabras(["hola mundo", "que tal"]) → ["hola", "mundo", "que", "tal"]
 */
export function palabras(frases: string[]): string[] {
  return frases.flatMap((f) => f.split(" "));
}
palabras(["Hola mundo", "que tal"]); // ["hola", "mundo", "que", "tal"]

/* ▸ BLOQUE C — flatMap sobre objetos */

/* 4) todosLosTags — junta los tags de todos los posts en una lista.
 * todosLosTags([{tags:["a","b"]},{tags:["c"]}]) → ["a", "b", "c"]
 */
export function todosLosTags(posts: { tags: string[] }[]): string[] {
  return posts.flatMap((p) => p.tags);
}
todosLosTags([{ tags: ["a", "b"] }, { tags: ["c"] }]); // return: ["a", "b", "c"]

/* ▸ BLOQUE D — capstone: flatMap + map anidado */

export type Pedido = { items: { id: number }[] };

/* 5) idsDeItems — todos los ids de los items de todos los pedidos.
 * idsDeItems([{items:[{id:1},{id:2}]},{items:[{id:3}]}]) → [1, 2, 3]
 */
export function idsDeItems(pedidos: Pedido[]): number[] {
  return pedidos.flatMap((p) => p.items).map((i) => i.id);
}
