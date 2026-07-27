/* =============================================================================
 * EJERCICIO 04 — Arrays: BUSCAR con `find` y `findIndex`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `map`/`filter` transforman o seleccionan VARIOS. A veces solo quieres UNO: el
 * primero que cumpla. Para eso están `find` (te da el ELEMENTO) y `findIndex`
 * (te da su POSICIÓN). Los dos reciben un callback que decide sí/no.
 *
 * ▸ EXPLICACIÓN — qué devuelve cada uno
 * ----------------------------------------------------------------------------
 *     [1, 3, 4].find((n) => n % 2 === 0)       // 4        (el elemento)
 *     [1, 3, 4].find((n) => n > 100)           // undefined (no encontró → T | undefined)
 *     [1, 3, 4].findIndex((n) => n % 2 === 0)  // 2        (la posición)
 *     [1, 3, 4].findIndex((n) => n > 100)      // -1       (no encontró)
 *
 * 🧠 ANALOGÍA: buscar a alguien en una fila con una descripción. `find` te trae a
 *    la PERSONA; `findIndex` te dice EN QUÉ PUESTO está. Si nadie encaja, `find`
 *    vuelve con las manos vacías (`undefined`) y `findIndex` con un `-1`.
 *
 * 🔧 POR DENTRO: paran en cuanto encuentran el PRIMERO (no recorren el resto).
 *
 * OJO — `find` puede devolver `undefined`, así que su tipo es `T | undefined`:
 *    para usar el resultado hay que contemplar el caso "no había" (`?.` / `??`).
 *    `findIndex` nunca da undefined: da `-1` cuando no encuentra.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-04.test.ts
 * ===========================================================================*/

export type Item = { id: number; nombre: string }
export type Producto = { nombre: string; stock: number }

/* --- BLOQUE A — find: el ELEMENTO o undefined --- */

// 1) `primerPar` — el primer número par, o undefined si ninguno.
//    primerPar([1, 3, 4, 6]) → 4 ; primerPar([1, 3]) → undefined
export function primerPar(nums: number[]): number | undefined {
  return nums.find((n) => n % 2 === 0)
}
primerPar([1, 3, 4, 6]) // 4
primerPar([1, 3]) // undefined

// 2) `buscarPorId` — el item cuyo id coincide, o undefined.
//    buscarPorId([{id:1,nombre:"a"},{id:2,nombre:"b"}], 2) → {id:2,nombre:"b"}
export function buscarPorId(items: Item[], id: number): Item | undefined {
  return items.find((item) => item.id === id)
}
buscarPorId([{ id: 1, nombre: 'a' }, { id: 2, nombre: 'b' }], 2) // {id:2,nombre:"b"}

/* --- BLOQUE B — findIndex: la POSICIÓN o -1 --- */

// 3) `posicionDe` — el índice de `objetivo`, o -1 si no está.
//    posicionDe([10, 20, 30], 20) → 1 ; posicionDe([10], 99) → -1
export function posicionDe(nums: number[], objetivo: number): number {
  return nums.findIndex((n) => n === objetivo)
}
posicionDe([10, 20, 30], 20) // 1

// 4) `indiceDelPrimerMayor` — el índice del primer número mayor que `limite`, o -1.
//    indiceDelPrimerMayor([1, 5, 9], 4) → 1
export function indiceDelPrimerMayor(nums: number[], limite: number): number {
  return nums.findIndex((n) => n > limite)
}
indiceDelPrimerMayor([1, 5, 9], 4) // 1. En este caso el primero en ser mayor a 1 es 5, que está en la posición 1

/* --- BLOQUE C — CAPSTONE: find + el caso "no había" --- */

// 5) `nombreDelPrimeroConStock` — el nombre del primer producto con stock, o "agotado".
//    (find puede dar undefined → usa `?.nombre ?? "agotado"`)
//    nombreDelPrimeroConStock([{nombre:"a",stock:0},{nombre:"b",stock:3}]) → "b"
export function nombreDelPrimeroConStock(productos: Producto[]): string {
  return productos.find((p) => p.stock > 0)?.nombre ?? 'agotado' // En caso de que la propiedad nombre no exista, se devuelve "agotado"
}
nombreDelPrimeroConStock([]) // "agotado"
nombreDelPrimeroConStock([{ nombre: 'Coca Cola', stock: 10 }, { nombre: 'Pepsi', stock: 3 }]) // "Coca Cola"
