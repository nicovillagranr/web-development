/* =============================================================================
 * EJERCICIO 07 — Quitar `null` / `undefined` de una unión (y de una lista)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `null` y `undefined` se cuelan en datos reales (campos opcionales, respuestas de
 * API). Para UN valor los resuelves con `?.` / `??`. Para una LISTA, los filtras
 * con un predicado de tipo, y así el resultado deja de incluir `null`.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     x ?? 'respaldo'                                  // un valor: respaldo si es null/undef
 *     xs.filter((x): x is string => x !== null)        // una lista: fuera los null → string[]
 *
 * 🧠 ANALOGÍA: una caja de fruta con algunas casillas vacías. `??` = "si está
 *    vacía, pon una de plástico". El filtro = "tira las casillas vacías y quédate
 *    solo con fruta real".
 *
 * OJO — sin el predicado `x is string`, `filter(x => x !== null)` deja el tipo en
 *    `(string | null)[]` (TS no lo conecta solo). El `x is string` es lo que limpia
 *    el tipo.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-07.test.ts
 * ===========================================================================*/

export type Usuario = { nombre: string | null }

/* --- BLOQUE A — un valor: respaldo --- */

// 1) `oVacio` — el string, o "" si es null.
//    oVacio("a") → "a" ; oVacio(null) → ""
export function oVacio(x: string | null): string {
  return ''
}

// 2) `longitudSegura` — la longitud, o 0 si no hay valor.
//    longitudSegura("hola") → 4 ; longitudSegura(null) → 0
export function longitudSegura(x: string | null | undefined): number {
  return 0
}

/* --- BLOQUE B — una lista: filtrar los huecos --- */

// 3) `sinNulos` — quita los null y deja `string[]`.
//    sinNulos(["a", null, "b"]) → ["a", "b"]
export function sinNulos(xs: (string | null)[]): string[] {
  return []
}

// 4) `sumarDefinidos` — suma los números, ignorando los undefined.
//    sumarDefinidos([1, undefined, 2]) → 3
export function sumarDefinidos(xs: (number | undefined)[]): number {
  return 0
}

/* --- BLOQUE C — CAPSTONE: extraer un campo y limpiar --- */

// 5) `nombresValidos` — los nombres no nulos de los usuarios.
//    nombresValidos([{nombre:"a"},{nombre:null},{nombre:"b"}]) → ["a", "b"]
export function nombresValidos(usuarios: Usuario[]): string[] {
  return []
}
