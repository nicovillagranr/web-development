/* =============================================================================
 * EJERCICIO 08 — Objetos: AGRUPAR una lista en un diccionario (`groupBy`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Patrón clásico: tienes una LISTA y quieres organizarla por una clave (por
 * categoría, por estado...). El resultado es un `Record<clave, lista>`. Se hace
 * con `reduce` sobre un objeto acumulador, igual que contar pero guardando listas.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     productos.reduce<Record<string, Producto[]>>(
 *       (acc, p) => ({ ...acc, [p.categoria]: [...(acc[p.categoria] ?? []), p] }),
 *       {},
 *     )
 *     // cada producto se mete en la lista de SU categoría (que empieza en [] → `?? []`)
 *
 * 🧠 ANALOGÍA: repartir el correo en casilleros por destinatario. Cada carta va a
 *    su casillero; si el casillero estaba vacío, empieza con esa carta.
 *
 * OJO — `acc[clave]` es `T[] | undefined` (la clave puede no existir aún) → `?? []`.
 *    Para deduplicar, `new Set` + spread: `[...new Set(lista)]`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-08.test.ts
 * ===========================================================================*/

export type Producto = { nombre: string; categoria: string }

/* --- BLOQUE A — agrupar --- */

// 1) `agruparPorCategoria` — los productos, en listas por categoría.
//    agruparPorCategoria([{nombre:"a",categoria:"x"},{nombre:"b",categoria:"x"}])
//      → { x: [{a}, {b}] }
export function agruparPorCategoria(productos: Producto[]): Record<string, Producto[]> {
  return {}
}

// 2) `agruparPorParidad` — los números, en listas "par" / "impar".
//    agruparPorParidad([1, 2, 3, 4]) → { impar: [1, 3], par: [2, 4] }
export function agruparPorParidad(nums: number[]): Record<string, number[]> {
  return {}
}

/* --- BLOQUE B — contar por clave y deduplicar --- */

// 3) `cuentaPorCategoria` — cuántos productos hay por categoría.
//    cuentaPorCategoria([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → { x: 2, y: 1 }
export function cuentaPorCategoria(productos: Producto[]): Record<string, number> {
  return {}
}

// 4) `categoriasUnicas` — las categorías SIN repetir (usa `new Set`).
//    categoriasUnicas([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → ["x", "y"]
export function categoriasUnicas(productos: Producto[]): string[] {
  return []
}

/* --- BLOQUE C — CAPSTONE: contar + campeón --- */

// 5) `categoriaConMasProductos` — la categoría con más productos, o undefined.
//    categoriaConMasProductos([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → "x"
export function categoriaConMasProductos(productos: Producto[]): string | undefined {
  return undefined
}
