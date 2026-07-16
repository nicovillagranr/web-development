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
 * EJERCICIO 10 — CAPSTONE: mini-analítica de ventas (teje 06–09)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Sin concepto nuevo: a partir de una lista de ventas
 * construyes diccionarios (total por categoría), los recorres (entries/values) y
 * sacas un reporte ordenado. Es analítica de datos de verdad, en pequeño.
 *
 * La pieza que asusta es `reporte`: una CADENA de cuatro pasos encadenados
 *   entries → sort → map → join. Por eso la escalera la parte: primero cada paso
 *   suelto, y al final los enganchas.
 *
 * 🧠 ANALOGÍA: la caja registradora al cierre del día: agrupa por sección, suma,
 *    y saca el ticket-resumen ordenado de mayor a menor.
 *
 * OJO — combina reduce-a-objeto (sumar por clave, del 06), `Set` (categorías
 *    únicas, del 08), el reduce-campeón (la top, del 06) y entries+sort+map+join.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 8. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-10.test.ts
 * ===========================================================================*/

export type Venta = { producto: string; categoria: string; monto: number }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — SUMAR MONTOS (sacar un campo y reducir)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 1) `montos` — solo los montos de las ventas. (Aíslas el `.map` a un campo.)
//    montos([{..monto:10}, {..monto:5}]) → [10, 5]
export function montos(ventas: Venta[]): number[] {
  return []
}
montos([{ producto: "p1", categoria: "A", monto: 10 }]) // ->

// 2) `totalGeneral` — la suma de todos los montos. Reúsa `montos` (drill 1) y
//    reduce sumando: `.reduce((suma, m) => suma + m, 0)`. El 0 es la suma inicial.
//    totalGeneral([{..10}, {..5}, {..20}]) → 35
export function totalGeneral(ventas: Venta[]): number {
  return 0
}
totalGeneral([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "B", monto: 5 }]) // ->

// 3) ⭐ `totalPorCategoria` — suma de `monto` por categoría. Es el `sumarPorClave`
//     del 06, pero la clave sale de `v.categoria` y sumas `v.monto` (no 1).
//     `{ ...acc, [v.categoria]: (acc[v.categoria] ?? 0) + v.monto }`. Anota
//     `reduce<Record<string, number>>`.
//     totalPorCategoria([{A,10}, {A,5}, {B,20}]) → { A: 15, B: 20 }
export function totalPorCategoria(ventas: Venta[]): Record<string, number> {
  return {}
}
totalPorCategoria([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "A", monto: 5 }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — CATEGORÍAS ÚNICAS (Set, del ejercicio 08)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 4) `categorias` — las categorías sin repetir, conservando el orden.
//    Saca las categorías (`.map`) y quítales duplicados (`[...new Set(...)]`).
//    categorias([{A}, {A}, {B}]) → ["A", "B"]
export function categorias(ventas: Venta[]): string[] {
  return []
}
categorias([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "A", monto: 5 }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — EL CAMPEÓN (reduce-campeón, del ejercicio 06)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 5) `categoriaTop` — la categoría que más vendió (por monto total), o undefined si
//    no hay ventas. Cuenta con `totalPorCategoria` (drill 3) y saca la clave del
//    valor más alto: el `campeon` del 06 (reduce sobre `Object.entries`, acumulador
//    `[string, number] | undefined`, y al final `?.[0]`).
//    categoriaTop([{A,10}, {A,5}, {B,20}]) → "B" ; categoriaTop([]) → undefined
export function categoriaTop(ventas: Venta[]): string | undefined {
  return undefined
}
categoriaTop([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "B", monto: 20 }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — EL REPORTE (entries → sort → map → join, paso a paso)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 6) `ordenarPorTotalDesc` — los pares [categoria, total] ordenados de MAYOR a
//    menor total. `Object.entries(totales)` da los pares; `.sort((a, b) => b[1] - a[1])`
//    ordena descendente (b antes que a → de mayor a menor).
//    ordenarPorTotalDesc({ A: 15, B: 20 }) → [["B", 20], ["A", 15]]
export function ordenarPorTotalDesc(totales: Record<string, number>): [string, number][] {
  return []
}
ordenarPorTotalDesc({ A: 15, B: 20 }) // ->

// 7) `lineaDe` — una línea del reporte: "categoria: $total". (Template string.)
//    lineaDe("B", 20) → "B: $20"
export function lineaDe(categoria: string, total: number): string {
  return ""
}
lineaDe("B", 20) // ->

// 8) `reporte` — "categoria: $total" por categoría, ordenadas de mayor a menor
//    total, una por línea. NO es pieza nueva: engancha los pasos.
//      totalPorCategoria (3) → ordenarPorTotalDesc (6) → .map(lineaDe) (7) → .join("\n")
//    reporte([{A,10}, {A,5}, {B,20}]) → "B: $20\nA: $15"
export function reporte(ventas: Venta[]): string {
  return ""
}
reporte([{ producto: "p1", categoria: "A", monto: 15 }, { producto: "p2", categoria: "B", monto: 20 }]) // ->
