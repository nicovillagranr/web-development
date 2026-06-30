/* =============================================================================
 * EJERCICIO 06 — Objetos: diccionarios `Record<string, number>` (contar y leer)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un `Record<string, number>` es un diccionario: claves de texto → números. Sirve
 * para CONTAR (cuántas veces aparece cada cosa) e INDEXAR. Construirlo con `reduce`
 * y un objeto acumulador es un patrón que verás por todos lados.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     ["a", "b", "a"].reduce<Record<string, number>>(
 *       (acc, p) => ({ ...acc, [p]: (acc[p] ?? 0) + 1 }),   // suma 1 a la clave [p]
 *       {},                                                  // diccionario vacío
 *     )                                                      // → { a: 2, b: 1 }
 *
 * 🧠 ANALOGÍA: una hoja de conteo con palotes. Por cada aparición, buscas su fila
 *    y sumas un palote (si la fila no existía, empieza en 0 → `?? 0`).
 *
 * OJO — con `noUncheckedIndexedAccess`, `obj[clave]` es `number | undefined`
 *    (la clave podría no existir). Por eso al leer usas `?? 0` o un guard.
 *    La llave calculada `[p]` usa el VALOR de `p` como nombre de propiedad.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-06.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — construir el diccionario contando --- */

// 1) `contar` — cuántas veces aparece cada palabra.
//    contar(["a", "b", "a"]) → { a: 2, b: 1 }
export function contar(palabras: string[]): Record<string, number> {
  return {}
}

/* --- BLOQUE B — leer el diccionario (con guard) --- */

// 2) `cuantasVeces` — el valor de una clave, o 0 si no existe (cuida el undefined).
//    cuantasVeces({ a: 2 }, "a") → 2 ; cuantasVeces({}, "x") → 0
export function cuantasVeces(obj: Record<string, number>, clave: string): number {
  return 0
}

// 3) `tieneClave` — ¿existe esa clave en el diccionario? (usa el operador `in`)
//    tieneClave({ a: 1 }, "a") → true ; tieneClave({ a: 1 }, "b") → false
export function tieneClave(obj: Record<string, number>, clave: string): boolean {
  return false
}

// 4) `clavesConValorMayorQue` — las claves cuyo valor supera `limite`.
//    clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) → ["b", "c"]
export function clavesConValorMayorQue(obj: Record<string, number>, limite: number): string[] {
  return []
}

/* --- BLOQUE C — CAPSTONE: contar + encontrar el campeón --- */

// 5) `masFrecuente` — la palabra que más se repite, o undefined si la lista vacía.
//    (reusa `contar` + reduce-campeón sobre los pares)
//    masFrecuente(["a", "b", "a", "a"]) → "a" ; masFrecuente([]) → undefined
export function masFrecuente(palabras: string[]): string | undefined {
  return undefined
}
