/* =============================================================================
 * EJERCICIO 10 — CAPSTONE: mini-catálogo de tienda (teje 01–09)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Sin concepto nuevo: combinas filter, sort, map, reduce y
 * join sobre un mini-modelo de tienda. Es como se trabaja de verdad con datos
 * antes de pintarlos en pantalla.
 *
 * 🧠 ANALOGÍA: una cinta de procesado. Los productos entran y van pasando por
 *    estaciones (filtrar disponibles → ordenar → quedarse con un campo → resumir).
 *
 * OJO — encadena (`.filter(...).sort(...).map(...)`) y no mutes el original
 *    (copia con `[...]` antes de `sort`). Recuerda el reduce-campeón del 03 para
 *    "el más caro".
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-10.test.ts
 * ===========================================================================*/

export type Producto = { id: number; nombre: string; precio: number; stock: number }

/* --- BLOQUE A — seleccionar y transformar --- */

// 1) `enStock` — solo los productos con stock > 0.
export function enStock(productos: Producto[]): Producto[] {
  return []
}

// 2) `nombresPorPrecio` — los nombres, ordenados de más barato a más caro (sin mutar).
export function nombresPorPrecio(productos: Producto[]): string[] {
  return []
}

/* --- BLOQUE B — agregar con reduce --- */

// 3) `masCaro` — el producto más caro, o undefined si la lista está vacía.
//    (reduce-campeón: acumulador = "el mejor hasta ahora", inicial undefined)
export function masCaro(productos: Producto[]): Producto | undefined {
  return undefined
}

// 4) `valorInventario` — suma de precio * stock de todos los productos.
export function valorInventario(productos: Producto[]): number {
  return 0
}

/* --- BLOQUE C — CAPSTONE: filter + sort + map + join --- */

// 5) `catalogoDisponible` — los disponibles, ordenados por precio asc, como texto
//    "nombre ($precio)" unidos por ", ".
//    → "Pan ($2), Leche ($3)"
export function catalogoDisponible(productos: Producto[]): string {
  return ''
}
