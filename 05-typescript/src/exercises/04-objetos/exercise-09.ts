/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres primos de `Object` (sobre `{ a: 1, b: 5, c: 3 }`):
 *
 *   Object.keys(obj)     // → ["a", "b", "c"]              los NOMBRES (siempre strings)
 *   Object.values(obj)   // → [1, 5, 3]                    los VALORES (aquí, números)
 *   Object.entries(obj)  // → [["a",1], ["b",5], ["c",3]]  los PARES [nombre, valor]
 *
 * 🧠 Un casillero con etiquetas: keys = las etiquetas · values = lo de dentro ·
 *    entries = etiqueta + contenido, juntos, casillero por casillero.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 09 — Objetos: INDEXAR una lista por id (`Record<number, T>`) y buscar
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Buscar en una lista con `find` recorre todo cada vez. Si vas a buscar mucho por
 * id, conviene INDEXAR una vez: construir un `Record<id, item>` y luego acceder
 * directo por la clave. Es como pasar de una fila a un casillero numerado.
 *
 * Dos cosas nuevas respecto a contar (06) y agrupar (08):
 *   · la clave sale de un campo NUMÉRICO (`item.id`) y el valor es el ITEM entero
 *     →  `{ ...indice, [item.id]: item }`
 *   · ACTUALIZAR un item es un spread ANIDADO (copiar el índice Y copiar el item
 *     de dentro): `{ ...indice, [id]: { ...item, nombre } }`  ← la pieza difícil
 *
 * 🧠 ANALOGÍA: un guardarropa con números. En vez de recorrer toda la fila buscando
 *    tu abrigo, das el número y te lo traen directo.
 *
 * OJO — `indice[id]` es `Item | undefined` (puede no estar ese número) → para usar
 *    sus campos, `?.` / `??`. Actualizar es inmutable: nunca mutas, siempre copias.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 7. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-09.test.ts
 * ===========================================================================*/

export type Item = { id: number; nombre: string }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — CONSTRUIR el índice (la clave sale de item.id)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 1) ⭐ `ponerItem` — copia del índice con `item` guardado bajo SU id.
//     La vuelta del reduce, a mano. Novedad: la clave es `item.id` (un campo del
//     objeto, y numérica), y el valor es el item entero. Junta spread + llave
//     calculada (ejercicio 06), pero leyendo la clave de dentro del item.
//     ponerItem({}, { id: 1, nombre: "a" }) → { 1: { id: 1, nombre: "a" } }
//     ponerItem({ 1: {..} }, { id: 2, nombre: "b" }) → { 1: {..}, 2: {..} }
export function ponerItem(indice: Record<number, Item>, item: Item): Record<number, Item> {
  return {}
}
ponerItem({}, { id: 1, nombre: "a" }) // ->

// 2) `indexarPorId` — la lista convertida en diccionario por id. Es un reduce cuyo
//     callback es `ponerItem` (drill 1), o la misma línea inline. Empieza en `{}`.
//     Anota `reduce<Record<number, Item>>` (el {} inicial es muy vacío para TS).
//     indexarPorId([{ id: 1, nombre: "a" }]) → { 1: { id: 1, nombre: "a" } }
export function indexarPorId(items: Item[]): Record<number, Item> {
  return {}
}
indexarPorId([{ id: 1, nombre: "a" }, { id: 2, nombre: "b" }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LEER con guard (el item puede no existir)
 * ════════════════════════════════════════════════════════════════════════════
 * `indice[id]` es `Item | undefined`. Para leer un campo del item sin explotar,
 * encadenas `?.` (accede solo si existe) y respaldas con `??`.
 */

// 3) `buscar` — el item de ese id, o undefined si no está.
//    buscar({ 1: {id:1,nombre:"a"} }, 1) → {id:1,nombre:"a"} ; buscar(.., 9) → undefined
export function buscar(indice: Record<number, Item>, id: number): Item | undefined {
  return undefined
}
buscar({ 1: { id: 1, nombre: "a" } }, 1) // ->

// 4) `nombrePorId` — el nombre del item, o "desconocido" si no está.
//    Doble guard: `indice[id]?.nombre` (el nombre si el item existe) `?? "desconocido"`.
//    nombrePorId({ 1: {id:1,nombre:"a"} }, 1) → "a" ; (.., 9) → "desconocido"
export function nombrePorId(indice: Record<number, Item>, id: number): string {
  return "desconocido"
}
nombrePorId({ 1: { id: 1, nombre: "a" } }, 9) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — ACTUALIZAR inmutable ANIDADO (la pieza difícil)
 * ════════════════════════════════════════════════════════════════════════════
 * Cambiar el nombre de un item NO es mutarlo. Es: copiar el índice, y dentro,
 * copiar el item cambiándole el campo. Dos spreads, uno dentro del otro.
 */

// 5) `renombrarItem` — copia del item con otro `nombre`. Un solo spread, pisando
//    `nombre` (la regla "gana la última", del ejercicio 06). Aquí NO hay índice
//    todavía: solo el item.
//    renombrarItem({ id: 1, nombre: "a" }, "z") → { id: 1, nombre: "z" }
export function renombrarItem(item: Item, nombre: string): Item {
  return item
}
renombrarItem({ id: 1, nombre: "a" }, "z") // ->

// 6) `actualizarNombre` — cambia el nombre del item `id` (inmutable). Si el id no
//    existe, devuelve el índice IGUAL (sin tocar).
//    Junta las tres piezas: lee con guard (bloque 2) → si no existe, devuelve indice
//    → si existe, `{ ...indice, [id]: renombrarItem(item, nombre) }` (drill 5 + drill 1).
//    Pista para el guard que TS acepta:
//        const item = indice[id]
//        if (item === undefined) return indice   // ahora TS sabe que abajo item es Item
//    actualizarNombre({ 1: {id:1,nombre:"a"} }, 1, "z") → { 1: {id:1,nombre:"z"} }
//    actualizarNombre({ 1: {..} }, 9, "z") → el índice igual (id inexistente)
export function actualizarNombre(indice: Record<number, Item>, id: number, nombre: string): Record<number, Item> {
  return indice
}
actualizarNombre({ 1: { id: 1, nombre: "a" } }, 1, "z") // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — CAPSTONE: muchos ids de golpe
 * ════════════════════════════════════════════════════════════════════════════
 */

// 7) `nombresDe` — los nombres de varios ids (o "desconocido" cada uno que falte).
//    NO es pieza nueva: es `nombrePorId` (drill 4) aplicado a cada id con `.map`.
//    nombresDe({ 1:{id:1,nombre:"a"}, 2:{id:2,nombre:"b"} }, [1, 9, 2])
//      → ["a", "desconocido", "b"]
export function nombresDe(indice: Record<number, Item>, ids: number[]): string[] {
  return []
}
nombresDe({ 1: { id: 1, nombre: "a" } }, [1, 9]) // ->
