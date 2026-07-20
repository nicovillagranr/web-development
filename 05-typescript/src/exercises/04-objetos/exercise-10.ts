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
 * ▸ EJERCICIO — drills en escalera, del 1 al 10. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-10.test.ts
 * ===========================================================================*/

export type Venta = { producto: string; categoria: string; monto: number }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — SUMAR MONTOS (sacar un campo → reducir → sumar por clave)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 1) `montos` — solo los montos de las ventas. (Aíslas el `.map` a un campo.)
//    montos([{..monto:10}, {..monto:5}]) → [10, 5]
export function montos(ventas: Venta[]): number[] {
  return ventas.map((venta) => venta.monto)
}
montos([{ producto: "p1", categoria: "A", monto: 10 }]) // -> [10]
montos([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "A", monto: 5 }]) // -> [10, 5]

// 2) `totalGeneral` — la suma de todos los montos. Reúsa `montos` (drill 1) y reduce
//    sumando: `.reduce((suma, m) => suma + m, 0)`. El 0 es la suma inicial.
//    totalGeneral([{..10}, {..5}, {..20}]) → 35 ; totalGeneral([]) → 0
export function totalGeneral(ventas: Venta[]): number {
  return ventas.reduce((acumulador, venta) => acumulador + venta.monto, 0)
}
totalGeneral([{ producto: "p1", categoria: "A", monto: 10 }]) // -> 10
totalGeneral([{ producto: "p1", categoria: "A", monto: 10 }, { producto: "p2", categoria: "A", monto: 5 }]) // -> 15

// 3) `sumarEnCategoria` — UNA vuelta del "sumar por clave": copia el acumulador y en
//    la etiqueta `categoria` suma `monto` a lo que hubiera (o a 0). Es la pieza que
//    el reduce del drill 4 repite. `{ ...acc, [categoria]: (acc[categoria] ?? 0) + monto }`.
//    sumarEnCategoria({}, "A", 10) → { A: 10 } ; sumarEnCategoria({ A: 10 }, "A", 5) → { A: 15 }
export function sumarEnCategoria(acumulador: Record<string, number>, categoria: string, monto: number): Record<string, number> {
  // Paso 1: Se crea un objeto nuevo copiando el acumulador
  // Paso 2: El valor de la clave `categoria` se obtiene evaluando si la categoría existe dentro del objeto acumulador, si es así se le suma el monto, si no, queda en 0 y se le suma el monto
  return { ...acumulador, [categoria]: (acumulador[categoria] ?? 0) + monto }
}
sumarEnCategoria({ A: 10 }, "A", 5) // -> { A: 15 }
sumarEnCategoria({ Zapatos: 10, Perfumes: 5 }, "Zapatos", 5) // -> { Zapatos: 15, Perfumes: 5 }

// 4) ⭐ `totalPorCategoria` — suma de `monto` por categoría. Es drill 3 repetido con
//    `.reduce` sobre las ventas: la clave sale de `v.categoria`, el monto de `v.monto`.
//    Anota `reduce<Record<string, number>>`.
//    totalPorCategoria([{A,10}, {A,5}, {B,20}]) → { A: 15, B: 20 }

// export type Venta = { producto: string; categoria: string; monto: number }

export function totalPorCategoria(ventas: Venta[]): Record<string, number> {
  return ventas.reduce<Record<string, number>>((acumulador, venta) => sumarEnCategoria(acumulador, venta.categoria, venta.monto), {})
}
totalPorCategoria([
  { producto: "Orto Parisi Megamare", categoria: "Perfumes", monto: 1000 },
  { producto: "Orto Parisi Boccanera", categoria: "Perfumes", monto: 100 },
  { producto: "Orto Parisi Cuoium", categoria: "Perfumes", monto: 15 },
  { producto: "Bolso de Cuero", categoria: "Accesorios", monto: 1000 },
]) // -> { Perfumes: 1115, Accesorios: 1000 }



/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — CATEGORÍAS ÚNICAS (Set, del ejercicio 08)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 5) `categorias` — las categorías sin repetir, conservando el orden. Saca las
//    categorías (`.map`) y quítales duplicados (`[...new Set(...)]`).
//    categorias([{A}, {A}, {B}]) → ["A", "B"]
export function categorias(ventas: Venta[]): string[] {
  return [...new Set(ventas.map((venta) => venta.categoria))]
}
categorias([
  { producto: "Orto Parisi Megamare", categoria: "Perfumes", monto: 1000 },
  { producto: "Orto Parisi Boccanera", categoria: "Perfumes", monto: 100 },
  { producto: "Orto Parisi Cuoium", categoria: "Perfumes", monto: 15 },
  { producto: "Bolso de Cuero", categoria: "Accesorios", monto: 1000 },
]) // -> ["Perfumes", "Accesorios"]


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — EL CAMPEÓN (reduce-campeón, del ejercicio 06)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 6) `campeonDeTotales` — dada `{ A: 15, B: 20 }`, la clave del total más alto (o
//    undefined si vacío). Reduce sobre `Object.entries`, acumulador
//    `[string, number] | undefined`, y al final `?.[0]` para quedarte con la clave.
//    Pista: `(mejor, actual) => (mejor === undefined || actual[1] > mejor[1] ? actual : mejor)`.
//    campeonDeTotales({ A: 15, B: 20 }) → "B" ; campeonDeTotales({}) → undefined
export function campeonDeTotales(totales: Record<string, number>): string | undefined {
  return Object.entries(totales).reduce<[string, number] | undefined>((acumulador, actual) => (acumulador === undefined || actual[1] > acumulador[1] ? actual : acumulador), undefined)?.[0]
}
campeonDeTotales({ A: 15, B: 20 }) // -> "B"
campeonDeTotales({ A: 15 }) // -> "A"   (con un solo par, el acumulador arranca en undefined y se queda con él)
campeonDeTotales({}) // -> undefined   (nunca entra al reduce: devuelve el inicial, y `?.[0]` corta)

// 7) `categoriaTop` — la categoría que más vendió, o undefined si no hay ventas. NO
//    es pieza nueva: total por categoría (drill 4) + campeón (drill 6).
//    categoriaTop([{A,10}, {A,5}, {B,20}]) → "B" ; categoriaTop([]) → undefined
export function categoriaTop(ventas: Venta[]): string | undefined {
  return campeonDeTotales(totalPorCategoria(ventas))
}
categoriaTop([{ producto: "p1", categoria: "A", monto: 10 }]) // -> "A"
categoriaTop([
  { producto: "p1", categoria: "A", monto: 10 },
  { producto: "p2", categoria: "A", monto: 5 },
  { producto: "p3", categoria: "B", monto: 20 },
]) // -> "B"   (A suma 15, B suma 20)
categoriaTop([]) // -> undefined


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — EL REPORTE (entries → sort → map → join, paso a paso)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 8) `ordenarPorTotalDesc` — los pares [categoria, total] ordenados de MAYOR a menor.
//    `Object.entries(totales)` da los pares; `.sort((a, b) => b[1] - a[1])` ordena
//    descendente (b antes que a → de mayor a menor por el total, que es el índice [1]).
//    ordenarPorTotalDesc({ A: 15, B: 20 }) → [["B", 20], ["A", 15]]
export function ordenarPorTotalDesc(totales: Record<string, number>): [string, number][] {
  return Object.entries(totales) // Recibe: { A: 15, B: 20 } Devuelve: [["A", 15], ["B", 20]]
    .sort((a, b) => b[1] - a[1]) // Recibe: [["A", 15], ["B", 20]] Devuelve: [["B", 20], ["A", 15]]
}
ordenarPorTotalDesc({ A: 15, B: 20 }) // -> [["B", 20], ["A", 15]]
ordenarPorTotalDesc({}) // -> []
ordenarPorTotalDesc({ A: 15 }) // -> [["A", 15]]
ordenarPorTotalDesc({ B: 20 }) // -> [["B", 20]]

// 9) `lineaDe` — una línea del reporte: "categoria: $total". (Template string con `$`.)
//    lineaDe("B", 20) → "B: $20"
export function lineaDe(categoria: string, total: number): string {
  return `${categoria}: $${total}`
}
lineaDe("B", 20) // -> "B: $20"
lineaDe("A", 15) // -> "A: $15"

// 10) ⭐ `reporte` — "categoria: $total" por categoría, de mayor a menor total, una por
//     línea. NO es pieza nueva: engancha los pasos.
//       totalPorCategoria (4) → ordenarPorTotalDesc (8) → .map(lineaDe) (9) → .join("\n")
//     El map recibe cada par [categoria, total]; desestructúralo: `([cat, total]) => lineaDe(cat, total)`.
//     reporte([{A,10}, {A,5}, {B,20}]) → "B: $20\nA: $15"

// export type Venta = { producto: string; categoria: string; monto: number }
export function reporte(ventas: Venta[]): string {
  // 🧠 Cada paso guarda su resultado en una const con nombre, así el orden en que
  //    LEES es el mismo en que CORRE. Trazado con [{A,10}, {A,5}, {B,20}]:
  const totales = totalPorCategoria(ventas) // { A: 15, B: 20 }
  const ordenados = ordenarPorTotalDesc(totales) // [["B", 20], ["A", 15]]
  const lineas = ordenados.map(([cat, total]) => lineaDe(cat, total)) // ["B: $20", "A: $15"]
  return lineas.join("\n") // "B: $20\nA: $15"
}
reporte([
  { producto: "Orto Parisi Cuoium", categoria: "Perfumes", monto: 15 },
  { producto: "Bolso de Cuero", categoria: "Accesorios", monto: 1000 },
  { producto: "Orto Parisi Megamare", categoria: "Perfumes", monto: 1000 },
])
// "Perfumes: $1015
// Accesorios: $1000"
