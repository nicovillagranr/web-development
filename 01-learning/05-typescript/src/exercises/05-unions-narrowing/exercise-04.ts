/* =============================================================================
 * EJERCICIO 04 — uniones de literales → un valor (switch exhaustivo) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Mapear cada literal de una unión a un valor con un switch que los cubre todos.
 * · Confiar en el tipo: sin default ni comprobaciones de «y si viene otra cosa».
 *
 * 🟢 CONTEXTO — una unión de literales ('rojo' | 'verde' | 'azul') es un menú
 * cerrado. Un switch que cubre todos los casos no necesita default: TS sabe que no
 * queda ninguno más, y si añades un literal nuevo te avisa de que falta su caso.
 *
 * 🗺️ MAPA
 * TEORÍA · el switch exhaustivo → base de todo el archivo
 * BLOQUE A · mapear literal → valor → drills 1–2
 * BLOQUE B · literal → número, y comparación simple → drills 3–4
 * BLOQUE C · capstone: reusar un mapeo → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-04.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el switch exhaustivo
 *
 * DEFINICIÓN
 * Un switch sobre una unión de literales que tiene un case por cada literal agota
 * los casos: TS sabe que no queda ninguno, y no hace falta default.
 *
 * SINTAXIS
 * function hex(c: Color): string {
 *   switch (c) {
 *     case 'rojo':  return '#ff0000'
 *     case 'verde': return '#00ff00'
 *     case 'azul':  return '#0000ff'
 *   } // sin default: la unión cerrada agota los casos
 * }
 *
 * 🧠 ANALOGÍA — una máquina expendedora con 3 botones: no hay un «cuarto botón
 * misterioso», así que no necesitas un caso «por si acaso».
 *
 * 💡 El parámetro ya es del tipo unión: no hay que comprobar «y si viene otra
 * cosa». El tipo lo impide.
 * ───────────────────────────────────────────────────────────────────────────── */

export type Color = "rojo" | "verde" | "azul";
export type Estado = "activo" | "inactivo" | "pendiente";
export type Plan = "free" | "pro" | "enterprise";

/* ▸ BLOQUE A — mapear literal → valor */

/* 1) colorHex — el hex de cada color.
 * colorHex("rojo") → "#ff0000"
 */
export function colorHex(c: Color): string {
  switch (c) {
    case "rojo":
      return "#ff0000";
    case "verde":
      return "#00ff00";
    case "azul":
      return "#0000ff";
  }
}

/* 2) etiquetaEstado — texto legible de cada estado.
 * etiquetaEstado("activo") → "Activo"
 */
export function etiquetaEstado(e: Estado): string {
  switch (e) {
    case "activo":
      return "Activo";
    case "inactivo":
      return "Inactivo";
    case "pendiente":
      return "Pendiente";
  }
}

/* ▸ BLOQUE B — literal → número, y comparación simple */

/* 3) descuentoPorPlan — % de descuento por plan (free 0, pro 10, enterprise 20).
 * descuentoPorPlan("pro") → 10
 */
export function descuentoPorPlan(p: Plan): number {
  switch (p) {
    case "free":
      return 0;
    case "pro":
      return 10;
    case "enterprise":
      return 20;
  }
}

/* 4) esActivo — ¿el estado es "activo"?
 * esActivo("activo") → true ; esActivo("pendiente") → false
 */
export function esActivo(e: Estado): boolean {
  return e === "activo";
}

/* ▸ BLOQUE C — capstone: reusar un mapeo */

/* 5) badge — "Etiqueta (clave)" reusando etiquetaEstado.
 * badge("activo") → "Activo (activo)"
 */
export function badge(e: Estado): string {
  return `${etiquetaEstado(e)} (${e})`;
}
