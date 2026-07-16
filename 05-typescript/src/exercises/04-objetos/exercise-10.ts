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
 * EJERCICIO 10 — CAPSTONE: mini-analítica de ventas (teje 05–09)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Sin concepto nuevo: a partir de una lista de ventas
 * construyes diccionarios (total por categoría), los recorres (entries/values) y
 * sacas un reporte ordenado. Es analítica de datos de verdad, en pequeño.
 *
 * 🧠 ANALOGÍA: la caja registradora al cierre del día: agrupa por sección, suma,
 *    y saca el ticket-resumen ordenado de mayor a menor.
 *
 * OJO — combina reduce-a-objeto (sumar por clave), `Set` (categorías únicas),
 *    el reduce-campeón (la top) y entries+sort+map+join (el reporte).
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-10.test.ts
 * ===========================================================================*/

export type Venta = { producto: string; categoria: string; monto: number }

/* --- BLOQUE A — agregar --- */

// 1) `totalPorCategoria` — suma de `monto` por categoría.
//    → { A: 15, B: 20 }
export function totalPorCategoria(ventas: Venta[]): Record<string, number> {
  return {}
}

// 2) `categorias` — las categorías sin repetir.
export function categorias(ventas: Venta[]): string[] {
  return []
}

// 3) `totalGeneral` — la suma de todos los montos.
export function totalGeneral(ventas: Venta[]): number {
  return 0
}

/* --- BLOQUE B — el campeón --- */

// 4) `categoriaTop` — la categoría que más vendió (por monto), o undefined.
export function categoriaTop(ventas: Venta[]): string | undefined {
  return undefined
}

/* --- BLOQUE C — CAPSTONE: reporte ordenado --- */

// 5) `reporte` — "categoria: $total" de cada categoría, ordenadas de mayor a menor
//    total, una por línea.
//    → "B: $20\nA: $15"
export function reporte(ventas: Venta[]): string {
  return ''
}
