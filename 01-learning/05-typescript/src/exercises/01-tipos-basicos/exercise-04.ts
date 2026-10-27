/* =============================================================================
 * EJERCICIO 04 — readonly frente a as const · bloque 01 · aprobado ✅
 *
 * 🎯 OBJETIVOS
 * · Distinguir lo común (las dos prohíben mutar) de lo distinto (as const congela
 *   los literales).
 * · Elegir readonly para parámetros, y as const para constantes cuyos literales
 *   vas a reusar.
 *
 * 🟢 CONTEXTO — en el 03 viste as const y readonly mezclados con tuplas y generics:
 * demasiado a la vez. Aquí se aíslan para fijarlos bien. Tienes 3 huecos, y cada
 * uno aísla una decisión: ¿readonly o as const?
 *
 * 🗺️ MAPA
 * TEORÍA · readonly frente a as const → drills 1–3
 *
 * ▸ 3 drills en orden. Prohibidos any y as X (salvo as const). Decide según lo que
 * pida cada caso: no copies y pegues.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-04.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — readonly frente a as const
 *
 * DEFINICIÓN
 * Las dos herramientas hacen una cosa en común y una distinta. En común: las dos
 * prohíben mutar el valor. Distinto: as const además congela los tipos en su forma
 * literal; readonly los deja ensanchados (string, number…).
 *
 * Ejemplos, con un array:
 * const a: readonly string[] = ["a", "b", "c"] → a[0] es string (ensanchado), y
 *                                                a[0] = "x" da error
 * const b = ["a", "b", "c"] as const           → b[0] es "a" (el literal exacto),
 *                                                y b[0] = "x" da error
 *
 * Ejemplos, con un objeto:
 * const x: { readonly mode: string } = { mode: "light" } → x.mode es string, y
 *                                                          x.mode = "dark" da error
 * const y = { mode: "light" } as const → y.mode es "light", y y.mode = "dark" da
 *                                        error
 *
 * 💡 Cuándo usar cada uno: readonly en los parámetros de una función, cuando
 * quieres prohibir que la función mute lo que recibe pero te da igual el valor
 * exacto (function head(list: readonly number[])); as const en constantes
 * globales (configs, listas fijas, tablas de colores, enums caseros), cuando
 * quieres conservar los literales para usarlos como uniones más adelante
 * (const ROLES = ["admin", "user"] as const).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) SIZES — lista fija de tallas que vas a usar después como union type.
 * Necesitas que el tipo conserve los literales exactos "S" | "M" | "L" | "XL".
 * Pista: una de las dos herramientas hace esto en una palabra.
 */
export const SIZES = ["S", "M", "L", "XL"] as const;

/* 2) firstOf — función que recibe una lista de strings y devuelve el primero.
 * La función no debe mutar el array. Te da igual qué strings sean.
 * Pista: la otra herramienta encaja aquí.
 */
export function firstOf(list: readonly string[]) {
  return list[0];
}

/* 3) CONFIG — objeto de configuración fijo. Las propiedades deben ser
 * inmutables y conservar sus valores literales (no ensanchados).
 * Pista: una palabra al final del objeto.
 */
export const CONFIG = { env: "production", retries: 3 } as const;
