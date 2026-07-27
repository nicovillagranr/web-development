/* =============================================================================
 * EJERCICIO 04 — `readonly` vs `as const`  (formato nuevo)      [APROBADO ✅]
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * En el ejercicio 03 vimos `as const` y `readonly` mezclados con tuplas y
 * generics. Demasiado a la vez. Aquí los aislamos para fijarlos bien.
 *
 * Las dos herramientas hacen UNA cosa en común y UNA cosa distinta:
 *
 *   COMÚN:    Las dos prohíben mutar el valor.
 *   DISTINTA: `as const` además congela los tipos en su forma literal.
 *             `readonly` deja los tipos ensanchados (string, number, ...).
 *
 *
 * ▸ EJEMPLO 1 — array
 * ----------------------------------------------------------------------------
 *
 *   const a: readonly string[] = ["a", "b", "c"];
 *   // tipo de a: readonly string[]
 *   // tipo de a[0]: string         ← ensanchado
 *   // a[0] = "x"                   ← ERROR (readonly bloquea mutar)
 *
 *   const b = ["a", "b", "c"] as const;
 *   // tipo de b: readonly ["a", "b", "c"]
 *   // tipo de b[0]: "a"            ← literal exacto
 *   // b[0] = "x"                   ← ERROR (as const también bloquea mutar)
 *
 *
 * ▸ EJEMPLO 2 — objeto
 * ----------------------------------------------------------------------------
 *
 *   const x: { readonly mode: string } = { mode: "light" };
 *   // x.mode tipo: string          ← ensanchado
 *   // x.mode = "dark"              ← ERROR
 *
 *   const y = { mode: "light" } as const;
 *   // y.mode tipo: "light"         ← literal exacto
 *   // y.mode = "dark"              ← ERROR
 *
 *
 * ▸ CUÁNDO USAR CADA UNO
 * ----------------------------------------------------------------------------
 *
 *   - `readonly`  → parámetros de función. Quieres prohibir que la función
 *                   mute lo que recibe, pero te da igual el valor exacto.
 *                   Ejemplo: function head(list: readonly number[])
 *
 *   - `as const`  → constantes globales (configs, listas fijas, tablas de
 *                   colores, enums caseros). Quieres que los literales se
 *                   conserven para usarlos como union types más adelante.
 *                   Ejemplo: const ROLES = ["admin", "user"] as const;
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Tienes 3 huecos. Cada uno aísla UNA decisión: ¿readonly o as const?
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (excepto `as const`).
 *   - ✅ Decide en base a lo que pida cada caso, no copies y pegues.
 *   - Tests deben pasar (`pnpm test:run`) y typecheck limpio (`pnpm typecheck`).
 *
 * ===========================================================================*/

// 1) `SIZES` — lista fija de tallas que vas a usar después como union type.
//    Necesitas que el tipo conserve los literales exactos "S" | "M" | "L" | "XL".
//    Pista: una de las dos herramientas hace esto en una palabra.
export const SIZES = ["S", "M", "L", "XL"] as const;

// 2) `firstOf` — función que recibe una lista de strings y devuelve el primero.
//    La función NO debe mutar el array. Te da igual qué strings sean.
//    Pista: la otra herramienta encaja aquí.
export function firstOf(list: readonly string[]) {
  return list[0];
}


// 3) `CONFIG` — objeto de configuración fijo. Las propiedades deben ser
//    inmutables Y conservar sus valores literales (no ensanchados).
//    Pista: una palabra al final del objeto.
export const CONFIG = { env: "production", retries: 3 } as const;
