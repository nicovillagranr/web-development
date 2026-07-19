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
 * Reusa el motor del ejercicio 08 (meter en un diccionario, reduce), pero ahora:
 *   · la clave sale de un campo NUMÉRICO (`item.id`) y el valor es el ITEM entero
 *   · LEER puede fallar (`indice[id]` es `Item | undefined`) → guard con `?.` / `??`
 *   · ACTUALIZAR es inmutable: copias el item cambiándole un campo, y lo vuelves a
 *     meter en el índice (reusando drills anteriores)
 *
 * 🧠 ANALOGÍA: un guardarropa con números. En vez de recorrer toda la fila buscando
 *    tu abrigo, das el número y te lo traen directo.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 8. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-09.test.ts
 * ===========================================================================*/

export type Item = { id: number; nombre: string }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — CONSTRUIR el índice (a mano → reduce)
 * ════════════════════════════════════════════════════════════════════════════
 * Igual que "meter" del 08, pero la clave sale de `item.id` y el valor es el item
 * entero. Otra vez la rampa: una vuelta → dos a mano → reduce.
 */

// 1) `ponerItem` — copia del índice con `item` guardado bajo SU id. La clave es
//    `item.id` (llave calculada, numérica); el valor es el item entero.
//    ponerItem({}, { id: 1, nombre: "a" }) → { 1: { id: 1, nombre: "a" } }
export function ponerItem(indice: Record<number, Item>, item: Item): Record<number, Item> {
  return {}
}
ponerItem({}, { id: 1, nombre: "a" }) // ->

// 2) `indexarDosAMano` — mete DOS items, sin bucle, para ver el arrastre (como el
//    meterDosAMano del 08). Reasignas `acc`:
//        let acc: Record<number, Item> = {}
//        acc = ponerItem(acc, a)
//        acc = ponerItem(acc, b)
//        return acc
//    indexarDosAMano({id:1,nombre:"a"}, {id:2,nombre:"b"}) → { 1:{..}, 2:{..} }
export function indexarDosAMano(a: Item, b: Item): Record<number, Item> {
  return {}
}
indexarDosAMano({ id: 1, nombre: "a" }, { id: 2, nombre: "b" }) // ->

// 3) `indexarPorId` — la lista entera convertida en diccionario por id. Es drill 2,
//    pero con `.reduce` sobre `items`. Empieza en `{}`.
//    ⚠️ Anota el acumulador: `items.reduce<Record<number, Item>>(...)`.
//    indexarPorId([{ id: 1, nombre: "a" }, { id: 2, nombre: "b" }]) → { 1:{..}, 2:{..} }
export function indexarPorId(items: Item[]): Record<number, Item> {
  return {}
}
indexarPorId([{ id: 1, nombre: "a" }, { id: 2, nombre: "b" }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LEER con guard (el item puede no existir)
 * ════════════════════════════════════════════════════════════════════════════
 * `indice[id]` es `Item | undefined`. Para leer un campo sin explotar, encadenas
 * `?.` (accede solo si existe) y respaldas con `??`.
 */

// 4) `buscar` — el item de ese id, o undefined si no está. (Es leer directo el
//    casillero; el tipo ya avisa que puede ser undefined.)
//    buscar({ 1: {id:1,nombre:"a"} }, 1) → {id:1,nombre:"a"} ; buscar({}, 9) → undefined
export function buscar(indice: Record<number, Item>, id: number): Item | undefined {
  return undefined
}
buscar({ 1: { id: 1, nombre: "a" } }, 1) // ->

// 5) `nombrePorId` — el nombre del item, o "desconocido" si no está. Doble guard:
//    `indice[id]?.nombre` (el nombre si el item existe) `?? "desconocido"`.
//    nombrePorId({ 1: {id:1,nombre:"a"} }, 1) → "a" ; (.., 9) → "desconocido"
export function nombrePorId(indice: Record<number, Item>, id: number): string {
  return "desconocido"
}
nombrePorId({ 1: { id: 1, nombre: "a" } }, 9) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — ACTUALIZAR inmutable (copiar el item, y volver a meterlo)
 * ════════════════════════════════════════════════════════════════════════════
 * Cambiar el nombre NO es mutar. Es: copiar el item con el campo nuevo (drill 6) y
 * volver a meterlo en el índice (drill 1). Se descompone en piezas que ya tienes.
 */

// 6) `renombrarItem` — copia del item con otro `nombre`. Un solo spread, pisando
//    `nombre` (la regla "gana la última"). Aquí NO hay índice todavía: solo el item.
//    renombrarItem({ id: 1, nombre: "a" }, "z") → { id: 1, nombre: "z" }
export function renombrarItem(item: Item, nombre: string): Item {
  return item
}
renombrarItem({ id: 1, nombre: "a" }, "z") // ->

// 7) ⭐ `actualizarNombre` — cambia el nombre del item `id` (inmutable). Si el id no
//    existe, devuelve el índice IGUAL. Junta el guard (bloque 2) con drill 6 + drill 1:
//        const item = indice[id]
//        if (item === undefined) return indice   // ahora TS sabe que abajo item es Item
//        return ponerItem(indice, renombrarItem(item, nombre))
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

// 8) `nombresDe` — los nombres de varios ids (o "desconocido" cada uno que falte).
//    NO es pieza nueva: es `nombrePorId` (drill 5) aplicado a cada id con `.map`.
//    nombresDe({ 1:{id:1,nombre:"a"}, 2:{id:2,nombre:"b"} }, [1, 9, 2])
//      → ["a", "desconocido", "b"]
export function nombresDe(indice: Record<number, Item>, ids: number[]): string[] {
  return []
}
nombresDe({ 1: { id: 1, nombre: "a" } }, [1, 9]) // ->
