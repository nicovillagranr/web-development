/* =============================================================================
 * EJERCICIO 04 — Uniones de literales → un valor (switch exhaustivo)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Una unión de literales (`'rojo' | 'verde' | 'azul'`) es un menú CERRADO. Un
 * `switch` que cubre todos los casos no necesita `default`: TS sabe que no queda
 * ninguno más, y si añades un literal nuevo te avisa de que falta su caso.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function hex(c: Color): string {
 *       switch (c) {
 *         case 'rojo':  return '#ff0000'
 *         case 'verde': return '#00ff00'
 *         case 'azul':  return '#0000ff'
 *       }   // sin default: la unión cerrada agota los casos
 *     }
 *
 * 🧠 ANALOGÍA: una máquina expendedora con 3 botones. No hay un "cuarto botón
 *    misterioso", así que no necesitas un caso "por si acaso".
 *
 * OJO — sin `any`/`as`. El parámetro ya es del tipo unión; no hay que comprobar
 *    "y si viene otra cosa": el TIPO lo impide.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-04.test.ts
 * ===========================================================================*/

export type Color = 'rojo' | 'verde' | 'azul'
export type Estado = 'activo' | 'inactivo' | 'pendiente'
export type Plan = 'free' | 'pro' | 'enterprise'

/* --- BLOQUE A — mapear literal → valor --- */

// 1) `colorHex` — el hex de cada color.
//    colorHex("rojo") → "#ff0000"
export function colorHex(c: Color): string {
  switch (c) {
    case 'rojo':
      return '#ff0000'
    case 'verde':
      return '#00ff00'
    case 'azul':
      return '#0000ff'
  }
}

// 2) `etiquetaEstado` — texto legible de cada estado.
//    etiquetaEstado("activo") → "Activo"
export function etiquetaEstado(e: Estado): string {
  switch (e) {
    case 'activo':
      return 'Activo'
    case 'inactivo':
      return 'Inactivo'
    case 'pendiente':
      return 'Pendiente'
  }
}

/* --- BLOQUE B — literal → número, y comparación simple --- */

// 3) `descuentoPorPlan` — % de descuento por plan (free 0, pro 10, enterprise 20).
//    descuentoPorPlan("pro") → 10
export function descuentoPorPlan(p: Plan): number {
  switch (p) {
    case 'free':
      return 0
    case 'pro':
      return 10
    case 'enterprise':
      return 20
  }
}

// 4) `esActivo` — ¿el estado es "activo"?
//    esActivo("activo") → true ; esActivo("pendiente") → false
export function esActivo(e: Estado): boolean {
  return e === 'activo'
}

/* --- BLOQUE C — CAPSTONE: reusar un mapeo --- */

// 5) `badge` — "Etiqueta (clave)" reusando etiquetaEstado.
//    badge("activo") → "Activo (activo)"
export function badge(e: Estado): string {
  return `${etiquetaEstado(e)} (${e})`
}
