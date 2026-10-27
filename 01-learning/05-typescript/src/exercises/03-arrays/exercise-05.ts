/* =============================================================================
 * EJERCICIO 05 — arrays: some y every (¿alguno? ¿todos?) · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Responder sí o no sobre la lista entera: some (¿alguno?) y every (¿todos?).
 * · Cuidar el caso de la lista vacía.
 *
 * 🟢 CONTEXTO — a veces no quieres los elementos, solo un sí o un no sobre la lista
 * entera: «¿hay al menos uno que…?» → some; «¿todos cumplen…?» → every. Los dos
 * reciben un callback que decide, y devuelven un boolean.
 *
 * 🗺️ MAPA
 * TEORÍA · some y every → base de todo el archivo
 * BLOQUE A · some: ¿hay al menos uno? → drills 1–2
 * BLOQUE B · every: ¿todos cumplen? → drills 3–4
 * BLOQUE C · capstone: combinar y cuidar el caso vacío → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/03-arrays/exercise-05.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — some y every
 *
 * DEFINICIÓN
 * some para en cuanto encuentra uno que cumple, y devuelve true; every para en
 * cuanto encuentra uno que no cumple, y devuelve false.
 *
 * Ejemplos:
 * [1, -2, 3].some((n) => n < 0)  → true: basta uno
 * [1, 2, 3].every((n) => n > 0)  → true: todos
 * [1, -2, 3].every((n) => n > 0) → false: uno falla
 *
 * 🧠 ANALOGÍA — el control de calidad de una caja de fruta: some es «¿hay alguna
 * podrida?» (con encontrar una basta); every, «¿están todas buenas?» (una mala y ya
 * es que no).
 *
 * ⚠️ TRAMPA — con la lista vacía, [].some(…) da false (no hay ninguno) y
 * [].every(…) da true (no hay ninguno que incumpla). Por eso el capstone pide
 * además que el carrito no esté vacío.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Producto = { nombre: string; stock: number };
export type Persona = { nombre: string; edad: number };
export type ItemCarrito = { nombre: string; cantidad: number };

/* ▸ BLOQUE A — some: ¿hay al menos uno? */

/* 1) hayAlgunNegativo — ¿hay al menos un número negativo?
 * hayAlgunNegativo([1, -2, 3]) → true ; hayAlgunNegativo([1, 2]) → false
 */
export function hayAlgunNegativo(nums: number[]): boolean {
  return nums.some((n) => n < 0); // el método some devuelve true si al menos UNO cumple
}
hayAlgunNegativo([1, -2, 3]); // true

/* 2) algunoSinStock — ¿hay algún producto con stock 0?
 * algunoSinStock([{nombre:"a",stock:0}]) → true
 */
export function algunoSinStock(productos: Producto[]): boolean {
  return productos.some((p) => p.stock === 0);
}
algunoSinStock([{ nombre: "a", stock: 0 }]);

/* ▸ BLOQUE B — every: ¿todos cumplen? */

/* 3) todosPositivos — ¿son todos los números > 0?
 * todosPositivos([1, 2, 3]) → true ; todosPositivos([1, -2]) → false
 */
export function todosPositivos(nums: number[]): boolean {
  return nums.every((n) => n > 0);
}

/* 4) todosMayoresDeEdad — ¿todas las personas tienen 18 o más?
 * todosMayoresDeEdad([{nombre:"a",edad:20},{nombre:"b",edad:17}]) → false
 */
export function todosMayoresDeEdad(personas: Persona[]): boolean {
  return personas.every((p) => p.edad >= 18);
}
todosMayoresDeEdad([
  { nombre: "Javier", edad: 20 },
  { nombre: "Nico", edad: 17 },
  { nombre: "Natalia", edad: 17 },
  { nombre: "Emilio", edad: 17 },
]);
// return: false. Hay menos de 18

/* ▸ BLOQUE C — capstone: combinar y cuidar el caso vacío */

/* 5) carritoValido — el carrito es válido si no está vacío y todos sus items
 * tienen cantidad > 0. (Ojo: [].every(...) es true → hay que pedir length > 0.)
 * carritoValido([{nombre:"a",cantidad:2}]) → true ; carritoValido([]) → false
 */
export function carritoValido(items: ItemCarrito[]): boolean {
  return items.length > 0 && items.every((item) => item.cantidad > 0);
}
carritoValido([
  { nombre: "Coca Cola", cantidad: 2 },
  { nombre: "Pepsi", cantidad: 0 },
  { nombre: "Agua", cantidad: 1 },
  { nombre: "Cerveza", cantidad: 3 },
]);
// return: false. Hay un item con cantidad 0
