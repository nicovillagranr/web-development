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
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     items.reduce<Record<number, Item>>((acc, it) => ({ ...acc, [it.id]: it }), {})
 *     // → { 1: {id:1,...}, 2: {id:2,...} }   acceso directo: indice[2]
 *
 * 🧠 ANALOGÍA: un guardarropa con números. En vez de recorrer toda la fila
 *    buscando tu abrigo, das el número y te lo traen directo.
 *
 * OJO — `indice[id]` es `Item | undefined` (puede no estar ese número) → para usar
 *    sus campos, `?.` / `??`. Actualizar es inmutable: `{ ...indice, [id]: {...} }`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-09.test.ts
 * ===========================================================================*/

export type Item = { id: number; nombre: string }

/* --- BLOQUE A — construir el índice y buscar --- */

// 1) `indexarPorId` — la lista convertida en diccionario por id.
//    indexarPorId([{id:1,nombre:"a"}]) → { 1: {id:1,nombre:"a"} }
export function indexarPorId(items: Item[]): Record<number, Item> {
  return {}
}

// 2) `buscar` — el item de ese id, o undefined.
//    buscar({ 1: {id:1,nombre:"a"} }, 1) → {id:1,nombre:"a"} ; buscar(.., 9) → undefined
export function buscar(indice: Record<number, Item>, id: number): Item | undefined {
  return undefined
}

/* --- BLOQUE B — leer un campo con guard, y actualizar inmutable --- */

// 3) `nombrePorId` — el nombre del item, o "desconocido" si no está.
//    nombrePorId({ 1: {id:1,nombre:"a"} }, 1) → "a" ; (.., 9) → "desconocido"
export function nombrePorId(indice: Record<number, Item>, id: number): string {
  return 'desconocido'
}

// 4) `actualizarNombre` — cambia el nombre del item `id` (inmutable). Si no existe,
//    devuelve el índice igual.
//    actualizarNombre({ 1: {id:1,nombre:"a"} }, 1, "z") → { 1: {id:1,nombre:"z"} }
export function actualizarNombre(
  indice: Record<number, Item>,
  id: number,
  nombre: string,
): Record<number, Item> {
  return indice
}

/* --- BLOQUE C — CAPSTONE: muchos ids de golpe --- */

// 5) `nombresDe` — los nombres de varios ids (o "desconocido" cada uno que falte).
//    nombresDe({ 1:{id:1,nombre:"a"}, 2:{id:2,nombre:"b"} }, [1, 9, 2])
//      → ["a", "desconocido", "b"]
export function nombresDe(indice: Record<number, Item>, ids: number[]): string[] {
  return []
}
