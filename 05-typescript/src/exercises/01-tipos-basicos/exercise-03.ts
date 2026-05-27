/* =============================================================================
 * EJERCICIO 03 — Tuplas, readonly y `as const`      [APROBADO ✅]
 * =============================================================================
 *
 * 1) CONTEXTO
 * ----------------------------------------------------------------------------
 * En el ejercicio 01 dejamos un cabo suelto: cuando declaras un objeto con
 * `const`, TS ENSANCHA las propiedades (string en vez del literal "rojo").
 * Lo mismo pasa con los arrays: `[1, 2, 3]` se infiere como `number[]`, no
 * como una tupla fija de 3 números.
 *
 * Este ejercicio cierra ese cabo y añade dos herramientas que vas a usar
 * constantemente en React:
 *
 *   - `readonly` → marca algo como inmutable
 *   - `as const` → congela un literal en su forma más estrecha posible
 *   - tuplas    → arrays con longitud y posición conocidas
 *
 * 2) OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * - Modelar arrays inmutables con `readonly T[]`.
 * - Modelar tuplas con `[T1, T2]` (longitud y orden importan).
 * - Entender qué cambia cuando aplicas `as const` a un objeto o array.
 * - Decidir cuándo usar cada uno (no son intercambiables).
 *
 * 3) HERRAMIENTAS RELEVANTES
 * ----------------------------------------------------------------------------
 * - `readonly` prefix
 * - `ReadonlyArray<T>` (sinónimo)
 * - Tuplas: `[T1, T2, ...]`
 * - `as const` (const assertion)
 * - Inferencia con literales vs ensanchamiento (widening)
 *
 * 4) RESTRICCIONES
 * ----------------------------------------------------------------------------
 * - ❌ Nada de `any`.
 * - ❌ Nada de `as` *fuera* de `as const` (no uses `as string`, `as number`, etc.).
 * - ❌ No mutar (ni siquiera por error: si TS te deja, mal hecho).
 * - ✅ Cada constante debe tener el tipo más estrecho posible, no más.
 *
 * 5) ARCHIVOS
 * ----------------------------------------------------------------------------
 * - src/exercises/01-tipos-basicos/exercise-03.ts        (este archivo)
 * - src/exercises/01-tipos-basicos/exercise-03.test.ts   (NO tocar)
 *
 * 6) CRITERIOS DE VALIDACIÓN
 * ----------------------------------------------------------------------------
 * 1. `pnpm test:run` pasa los tests del archivo.
 * 2. `pnpm typecheck` pasa limpio.
 * 3. `COLORS` debe ser un array inmutable de exactamente los strings literales
 *    "red", "green", "blue" — NO `string[]`, NO `("red" | "green" | "blue")[]` mutable.
 * 4. `POINT` debe ser una tupla `[number, number]`, no `number[]`.
 * 5. `THEME` debe tener todas sus propiedades como literales (no ensanchadas).
 * 6. `swap` debe devolver una tupla con los tipos invertidos (no `(A | B)[]`).
 * 7. En revisión te preguntaré:
 *    - ¿Qué hace exactamente `as const`? ¿En qué se diferencia de `readonly`?
 *    - ¿Por qué TS infiere `[1, 2]` como `number[]` y no como `[number, number]`?
 *    - ¿Cuándo usarías una tupla en lugar de un objeto?
 *
 * ===========================================================================*/

// 1) Un array de colores SOLO de lectura: "red", "green", "blue".
//    Debe ser imposible hacer COLORS.push("yellow") o COLORS[0] = "pink".
//    El tipo debe conservar los literales, no ensancharse a string.
export const COLORS = ["red", "green", "blue"] as const;

// 2) Una tupla `POINT` que represente coordenadas (x, y).
//    Debe tener exactamente 2 elementos, ambos number.
//    POINT[2] debe ser error de TS (índice fuera de la tupla).
export const POINT: [number, number] = [10, 20];

// 3) Un objeto `THEME` con las propiedades:
//      mode: "light"     (literal, no string)
//      radius: 8         (literal, no number)
//    Debe ser imposible mutar THEME.mode = "dark".
//    Pista: hay UNA forma muy corta de conseguir esto sin escribir tipos a mano.
export const THEME = { mode: "light", radius: 8 } as const;

// 4) Una función `swap` que reciba una tupla [A, B] y devuelva [B, A].
//    Si recibe [string, number] debe devolver [number, string], NO (string | number)[].
//    Pista: necesitas dos type parameters (generics).
export function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}

// 5) Una función `head` que reciba un array readonly de números y devuelva
//    el primer elemento. Piensa: ¿el retorno puede ser undefined? ¿Por qué?
export function head(list: readonly number[]) {
  return list[0];
}
