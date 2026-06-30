/* =============================================================================
 * EJERCICIO 08 — Type guards propios (`x is Tipo`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * A veces la comprobación se repite o es a medida. La encapsulas en una función
 * cuyo retorno es `x is Tipo`: un "portero" reutilizable. TS confía en él para
 * estrechar, y puedes pasarlo directo a `.filter`.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function esString(x: unknown): x is string {
 *       return typeof x === 'string'
 *     }
 *     xs.filter(esString)   // → string[]  (el guard limpia el tipo)
 *
 * 🧠 ANALOGÍA: un portero de discoteca con una norma fija. En vez de repetir la
 *    norma en cada puerta, contratas a UN portero (la función) y lo pones donde haga
 *    falta.
 *
 * OJO — el cuerpo debe devolver un `boolean` coherente con la promesa `x is Tipo`.
 *    Si mientes (devuelves true para algo que no es), TS confía y luego revienta.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-08.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — definir los porteros --- */

// 1) `esString` — ¿es un string?
//    esString("a") → true ; esString(5) → false
export function esString(x: unknown): x is string {
  return false
}

// 2) `esNumero` — ¿es un number?
//    esNumero(5) → true ; esNumero("a") → false
export function esNumero(x: unknown): x is number {
  return false
}

/* --- BLOQUE B — usar los porteros en filter --- */

// 3) `soloStrings` — quédate solo con los strings (resultado `string[]`).
//    soloStrings([1, "a", 2, "b"]) → ["a", "b"]
export function soloStrings(xs: unknown[]): string[] {
  return []
}

// 4) `soloNumeros` — quédate solo con los números (resultado `number[]`).
//    soloNumeros([1, "a", 2, "b"]) → [1, 2]
export function soloNumeros(xs: unknown[]): number[] {
  return []
}

/* --- BLOQUE C — CAPSTONE: contar por tipo --- */

// 5) `contarTipos` — cuántos strings y cuántos números hay.
//    contarTipos([1, "a", 2, "b", "c"]) → { strings: 3, numeros: 2 }
export function contarTipos(xs: unknown[]): { strings: number; numeros: number } {
  return { strings: 0, numeros: 0 }
}
