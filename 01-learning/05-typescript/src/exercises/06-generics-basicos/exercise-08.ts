/* =============================================================================
 * EJERCICIO 08 — genéricos: valores opcionales y respaldos (T | undefined) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Escribir helpers genéricos para datos que pueden faltar: valor o respaldo.
 * · Transformar solo si el valor existe, y quitar los null de una lista.
 *
 * 🟢 CONTEXTO — los datos que pueden faltar (T | undefined, T | null) aparecen
 * siempre. Con genéricos haces helpers reutilizables: «dame esto o un respaldo»,
 * «transforma si existe», «quita los nulos».
 *
 * 🗺️ MAPA
 * TEORÍA · el respaldo con ?? → base de todo el archivo
 * BLOQUE A · un valor con respaldo → drills 1–2
 * BLOQUE B · transformar si existe, y limpiar nulos → drills 3–4
 * BLOQUE C · capstone: primer válido o respaldo → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el respaldo con ??
 *
 * DEFINICIÓN
 * x ?? def devuelve x si no es null ni undefined; si falta, devuelve def.
 *
 * SINTAXIS
 * function oPorDefecto<T>(x: T | undefined, def: T): T {
 *   return x ?? def
 * }
 *
 * 🧠 ANALOGÍA — una rueda de repuesto: si la principal está, la usas; si falta,
 * pones la de respaldo.
 *
 * ⚠️ TRAMPA — ?? solo respalda null y undefined: un 0 o un "" legítimos se
 * conservan.
 *
 * 💡 El predicado x is T en el filter limpia el tipo de la lista.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — un valor con respaldo */

/* 1) oPorDefecto — x, o def si falta.
 * oPorDefecto(5, 0) → 5 ; oPorDefecto(undefined, 0) → 0
 */
export function oPorDefecto<T>(x: T | undefined, def: T): T {
  return x ?? def;
}

/* 2) primeroODef — el primer elemento, o def si la lista está vacía.
 * primeroODef([1, 2], 0) → 1 ; primeroODef([], 0) → 0
 */
export function primeroODef<T>(xs: T[], def: T): T {
  return xs[0] ?? def;
}

/* ▸ BLOQUE B — transformar si existe, y limpiar nulos */

/* 3) mapearDef — aplica fn si hay valor; si no, devuelve def.
 * mapearDef(5, (n) => n * 2, -1) → 10 ; mapearDef(undefined, (n) => n * 2, -1) → -1
 */
export function mapearDef<T, U>(x: T | undefined, fn: (x: T) => U, def: U): U {
  return x !== undefined ? fn(x) : def;
}
// mapearDef(0, (n) => n * 2, -1) // → 0 (con `x ?` truthy daba -1: el 0 existe pero no es truthy)

/* 4) noNulos — quita los null (deja T[]).
 * noNulos([1, null, 2]) → [1, 2]
 */
export function noNulos<T>(xs: (T | null)[]): T[] {
  // RUNTIME: filter recorre xs y construye un array nuevo de VALORES (no de tipos),
  // quedándose solo con los que pasan la prueba `x !== null`.
  // TIPOS: desde TS 5.5 el compilador se asoma dentro del callback y deduce solo el
  // "type predicate" (`x is T`) → el retorno se estrecha de (T | null)[] a T[].
  // Ojo: la inferencia se rompe si anotas `(x): boolean` o si usas `filter(Boolean)`;
  // en esos casos hay que escribir el predicado a mano: `.filter((x): x is T => x !== null)`.
  return xs.filter((x) => x !== null);
}

/* ▸ BLOQUE C — capstone: primer válido o respaldo */

/* 5) primerValido — el primer no-nulo, o def si todos eran null.
 * primerValido([null, "a", "b"], "def") → "a" ; primerValido([null], "def") → "def"
 */
export function primerValido<T>(xs: (T | null)[], def: T): T {
  return xs.find((x) => x !== null) ?? def;
}
