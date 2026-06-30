/* =============================================================================
 * EJERCICIO 09 — Arrays: pertenencia y unir (`includes`, `indexOf`, `join`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Preguntas frecuentes sobre una lista: "¿está X aquí?" (`includes`), "¿en qué
 * puesto está X?" (`indexOf`), y "júntalo todo en un texto" (`join`).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     [1, 2, 3].includes(2)        // true   (¿está? → boolean)
 *     [1, 2, 3].indexOf(2)         // 1      (¿en qué puesto? -1 si no está)
 *     ["a", "b", "c"].join("-")    // "a-b-c" (pega todo con un separador → string)
 *
 * 🧠 ANALOGÍA: `includes` = "¿está Juan en la lista de invitados?" (sí/no).
 *    `indexOf` = "¿en qué número de la fila está Juan?" (por valor exacto, -1 si
 *    no vino). `join` = pegar todas las fichas en un cartel con un pegamento (el
 *    separador) entre cada una.
 *
 * OJO — `includes`/`indexOf` comparan por VALOR (`===`), no con un callback (eso
 *    era `some`/`findIndex`). `join` siempre devuelve un STRING.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-09.test.ts
 * ===========================================================================*/

export type Producto = { nombre: string; stock: number }

/* --- BLOQUE A — includes: ¿está? (boolean) --- */

// 1) `contiene` — ¿está `x` en la lista?
//    contiene([1, 2, 3], 2) → true ; contiene([1, 2], 9) → false
export function contiene(nums: number[], x: number): boolean {
  return false
}

// 2) `tieneRol` — ¿el rol está en la lista de roles?
//    tieneRol(["admin", "user"], "user") → true
export function tieneRol(roles: string[], rol: string): boolean {
  return false
}

/* --- BLOQUE B — indexOf / join --- */

// 3) `indiceDe` — el puesto de `x` (por valor), o -1 si no está.
//    indiceDe([10, 20, 30], 30) → 2 ; indiceDe([10], 99) → -1
export function indiceDe(nums: number[], x: number): number {
  return -1
}

// 4) `unir` — pega las palabras en un solo texto con `sep` en medio.
//    unir(["a", "b", "c"], "-") → "a-b-c"
export function unir(palabras: string[], sep: string): string {
  return ''
}

/* --- BLOQUE C — CAPSTONE: filtrar + map + join --- */

// 5) `disponiblesComoTexto` — nombres de los productos con stock, unidos por `sep`.
//    disponiblesComoTexto([{nombre:"a",stock:0},{nombre:"b",stock:2}], ", ") → "b"
export function disponiblesComoTexto(productos: Producto[], sep: string): string {
  return ''
}
