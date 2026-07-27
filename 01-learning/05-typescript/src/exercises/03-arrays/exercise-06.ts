/* =============================================================================
 * EJERCICIO 06 — Arrays: ORDENAR con `sort` (inmutable + comparador)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Ordenar una lista parece trivial, pero `sort` tiene DOS trampas que hay que
 * domar: (1) ordena como TEXTO por defecto, y (2) MUTA el array original.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     [10, 2, 1].sort()                 // [1, 10, 2]   ❌ los compara como TEXTO
 *     [10, 2, 1].sort((a, b) => a - b)  // [1, 2, 10]   ✅ comparador numérico
 *
 *     const orig = [3, 1, 2]
 *     orig.sort((a, b) => a - b)         // ❌ MUTA orig
 *     [...orig].sort((a, b) => a - b)    // ✅ copia primero, orig intacto
 *
 * El comparador `(a, b) => ...` devuelve: negativo si `a` va antes, positivo si
 * `b` va antes. Por eso `a - b` ordena ascendente y `b - a` descendente.
 *
 * 🧠 ANALOGÍA: reordenar fichas en la mesa. Por defecto las compara como TEXTO
 *    (por eso "10" cae antes que "2"). El comparador le dice "trátalas como
 *    números". Y como `sort` reordena LA MESA original, copiamos antes (`[...arr]`)
 *    para no estropear la lista que nos dieron.
 *
 * OJO — devuelve SIEMPRE un array nuevo (`[...arr].sort(...)`), nunca mutes el
 *    parámetro. En React mutar el estado original rompe el render.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-06.test.ts
 * ===========================================================================*/

export type Producto = { nombre: string; precio: number }
export type Jugador = { nombre: string; puntos: number }

/* --- BLOQUE A — números: comparador + copia --- */

// 1) `ordenarAscendente` — de menor a mayor, SIN mutar el original.
//    ordenarAscendente([10, 2, 1]) → [1, 2, 10]
export function ordenarAscendente(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b)
}
ordenarAscendente([10, 2, 1]) // return: [1, 2, 10]

// 2) `ordenarDescendente` — de mayor a menor, sin mutar.
//    ordenarDescendente([1, 3, 2]) → [3, 2, 1]
export function ordenarDescendente(nums: number[]): number[] {
  return [...nums].sort((a, b) => b - a)
}
ordenarDescendente([1, 3, 2]) // return: [3, 2, 1]

/* --- BLOQUE B — por un campo del objeto --- */

// 3) `ordenarPorPrecio` — productos de más barato a más caro, sin mutar.
//    ordenarPorPrecio([{nombre:"a",precio:9},{nombre:"b",precio:3}]) → [b, a]
export function ordenarPorPrecio(productos: Producto[]): Producto[] {
  return [...productos].sort((a, b) => a.precio - b.precio)
}

// 4) `ordenarPorNombre` — alfabéticamente por nombre (usa `localeCompare`).
//    ordenarPorNombre([{nombre:"b",precio:1},{nombre:"a",precio:1}]) → [a, b]
export function ordenarPorNombre(productos: Producto[]): Producto[] {
  return [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre))
}

/* --- BLOQUE C — CAPSTONE: ordenar + recortar --- */

// 5) `topDosPorPuntos` — los 2 jugadores con más puntos (ordena desc + slice).
//    topDosPorPuntos([{n:..,puntos:5},{..,10},{..,1}]) → los de 10 y 5
export function topDosPorPuntos(jugadores: Jugador[]): Jugador[] {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos).slice(0, 2)
}
topDosPorPuntos([{ nombre: 'a', puntos: 5 }, { nombre: 'b', puntos: 10 }, { nombre: 'c', puntos: 1 }]) // return: [{nombre:"b",puntos:10},{nombre:"a",puntos:5}]
