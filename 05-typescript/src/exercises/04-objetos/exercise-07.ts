/* =============================================================================
 * EJERCICIO 07 — Objetos: transformar los VALORES (entries → map → fromEntries)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `map` transforma listas, no objetos. Para transformar un diccionario haces el
 * viaje de ida y vuelta: objeto → `entries` (lista de pares) → `map`/`filter` →
 * `Object.fromEntries` (vuelve a objeto).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     const o = { a: 1, b: 2 }
 *     Object.fromEntries(
 *       Object.entries(o).map(([k, v]): [string, number] => [k, v * 2]),
 *     )   // → { a: 2, b: 4 }
 *
 * 🧠 ANALOGÍA: desarmas el mueble en piezas (entries), las pintas una a una (map),
 *    y lo vuelves a montar (fromEntries).
 *
 * OJO — el callback del `map` debe devolver una TUPLA `[clave, valor]`. Anótalo
 *    `([k, v]): [string, number] => [k, ...]` para que TS no lo lea como un array
 *    suelto (`(string | number)[]`) y `fromEntries` lo acepte.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-07.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — transformar cada valor --- */

// 1) `duplicarValores` — cada valor por 2.
//    duplicarValores({ a: 2, b: 3 }) → { a: 4, b: 6 }
export function duplicarValores(obj: Record<string, number>): Record<string, number> {
  return {}
}

// 2) `incrementar` — suma `n` a cada valor.
//    incrementar({ a: 1 }, 10) → { a: 11 }
export function incrementar(obj: Record<string, number>, n: number): Record<string, number> {
  return {}
}

/* --- BLOQUE B — filtrar pares, y cambiar el tipo del valor --- */

// 3) `soloPositivos` — quita los pares cuyo valor no sea > 0.
//    soloPositivos({ a: 1, b: -2, c: 3 }) → { a: 1, c: 3 }
export function soloPositivos(obj: Record<string, number>): Record<string, number> {
  return {}
}

// 4) `valoresATexto` — convierte cada valor number a "$valor" (string).
//    valoresATexto({ a: 5 }) → { a: "$5" }
export function valoresATexto(obj: Record<string, number>): Record<string, string> {
  return {}
}

/* --- BLOQUE C — CAPSTONE: aplicar un porcentaje a cada valor --- */

// 5) `aplicarDescuento` — baja cada precio un `pct` por ciento.
//    aplicarDescuento({ a: 100 }, 10) → { a: 90 }
export function aplicarDescuento(precios: Record<string, number>, pct: number): Record<string, number> {
  return {}
}
