/* =============================================================================
 * EJERCICIO 08 — Genéricos: valores opcionales y respaldos (`T | undefined`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Datos que pueden faltar (`T | undefined`, `T | null`) aparecen siempre. Con
 * genéricos haces helpers reutilizables: "dame esto o un respaldo", "transforma si
 * existe", "quita los nulos".
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function oPorDefecto<T>(x: T | undefined, def: T): T {
 *       return x ?? def
 *     }
 *
 * 🧠 ANALOGÍA: una rueda de repuesto. Si la principal está (no es null/undefined),
 *    la usas; si falta, pones la de respaldo.
 *
 * OJO — `??` solo respalda `null`/`undefined` (un `0` o `""` legítimos se conservan).
 *    El predicado `x is T` en el filter limpia el tipo de la lista.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-08.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — un valor con respaldo --- */

// 1) `oPorDefecto` — `x`, o `def` si falta.
//    oPorDefecto(5, 0) → 5 ; oPorDefecto(undefined, 0) → 0
export function oPorDefecto<T>(x: T | undefined, def: T): T {
  return (x ?? def)
}

// 2) `primeroODef` — el primer elemento, o `def` si la lista está vacía.
//    primeroODef([1, 2], 0) → 1 ; primeroODef([], 0) → 0
export function primeroODef<T>(xs: T[], def: T): T {
  return xs[0] ?? def
}

/* --- BLOQUE B — transformar si existe, y limpiar nulos --- */

// 3) `mapearDef` — aplica `fn` si hay valor; si no, devuelve `def`.
//    mapearDef(5, (n) => n * 2, -1) → 10 ; mapearDef(undefined, (n) => n * 2, -1) → -1
export function mapearDef<T, U>(x: T | undefined, fn: (x: T) => U, def: U): U {
  return x !== undefined ? fn(x) : def
}
// mapearDef(0, (n) => n * 2, -1) // → 0 (con `x ?` truthy daba -1: el 0 existe pero no es truthy)

// 4) `noNulos` — quita los null (deja `T[]`).
//    noNulos([1, null, 2]) → [1, 2]
export function noNulos<T>(xs: (T | null)[]): T[] {
  // RUNTIME: filter recorre xs y construye un array nuevo de VALORES (no de tipos),
  // quedándose solo con los que pasan la prueba `x !== null`.
  // TIPOS: desde TS 5.5 el compilador se asoma dentro del callback y deduce solo el
  // "type predicate" (`x is T`) → el retorno se estrecha de (T | null)[] a T[].
  // Ojo: la inferencia se rompe si anotas `(x): boolean` o si usas `filter(Boolean)`;
  // en esos casos hay que escribir el predicado a mano: `.filter((x): x is T => x !== null)`.
  return xs.filter((x) => x !== null)
}

/* --- BLOQUE C — CAPSTONE: primer válido o respaldo --- */

// 5) `primerValido` — el primer no-nulo, o `def` si todos eran null.
//    primerValido([null, "a", "b"], "def") → "a" ; primerValido([null], "def") → "def"
export function primerValido<T>(xs: (T | null)[], def: T): T {
  return xs.find((x) => x !== null) ?? def
}
