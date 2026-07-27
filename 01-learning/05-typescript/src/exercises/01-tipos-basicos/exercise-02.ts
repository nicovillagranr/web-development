/* =============================================================================
 * EJERCICIO 02 — Arrays, null y uniones simples      [APROBADO ✅]
 * =============================================================================
 *
 * 1) CONTEXTO
 * ----------------------------------------------------------------------------
 * El ejercicio 01 fue solo sobre primitivos. Ahora subimos un escalón:
 * arrays, valores que pueden estar ausentes (null / undefined), y conjuntos
 * cerrados de strings (uniones literales). Tres cosas que aparecen en cada
 * componente React real.
 *
 * 2) OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * - Tipar arrays homogéneos sin caer en la trampa de `never[]`.
 * - Modelar "valor o ausencia" con `null` o `undefined`.
 * - Modelar "uno de varios strings fijos" con uniones literales.
 * - Mantener funciones puras (no mutar).
 *
 * 3) HERRAMIENTAS RELEVANTES
 * ----------------------------------------------------------------------------
 * - T[]
 * - null, undefined
 * - Union types (A | B)
 * - Tipos literales de string
 * - type aliases
 * - Spread (...) para arrays inmutables
 * - noUncheckedIndexedAccess (activado en este proyecto — investiga qué implica)
 *
 * 4) RESTRICCIONES
 * ----------------------------------------------------------------------------
 * - ❌ Nada de `any`.
 * - ❌ Nada de `as` (type assertions).
 * - ❌ No mutar arrays (nada de push, splice, asignar por índice).
 * - ❌ No anotes lo que TS ya infiere bien.
 * - ✅ Las funciones deben tener tipos de retorno honestos: si pueden devolver
 *   undefined, el tipo lo refleja.
 *
 * 5) ARCHIVOS
 * ----------------------------------------------------------------------------
 * - src/exercises/01-tipos-basicos/exercise-02.ts        (este archivo)
 * - src/exercises/01-tipos-basicos/exercise-02.test.ts   (NO tocar)
 *
 * 6) CRITERIOS DE VALIDACIÓN
 * ----------------------------------------------------------------------------
 * 1. `pnpm test:run` pasa los 5 tests del archivo.
 * 2. `pnpm typecheck` pasa limpio.
 * 3. El tipo de `findScore` debe ser `number | undefined`, no `number`.
 *    Si te sale `number` solo, no entendiste el punto.
 * 4. En la revisión te preguntaré:
 *    - ¿Por qué `scores = []` sin anotación sería un problema?
 *    - ¿Por qué elegiste null y no undefined para `lastLogin` (o al revés)?
 *    - ¿De dónde sale el `| undefined` en `findScore`?
 *
 * ===========================================================================*/

// 1) Un array de puntuaciones (números). Empieza vacío.
//    Cuidado: si no anotas, TS infiere `never[]` y no podrás hacer push.
export const scores: number[] = [];
scores.push(1);
scores.push(2);
scores.push(3);
// 2) Una constante `lastLogin` que represente "la fecha del último login
//    o ningún login todavía". Inicialízala como "todavía no hay login".
//    Pista: la fecha la representamos como string ISO ("2026-05-27").
export const lastLogin: string | null = null;

// 3) Una función `findScore` que reciba el array de scores y un índice,
//    y devuelva el score en esa posición. Piensa: ¿qué pasa si el índice
//    no existe? Tu tipo de retorno tiene que ser honesto.
export function findScore(list: number[], index: number) {
  return list[index];
}

// const test: string = findScore(scores, 0)

// 4) Una función `addScore` que reciba el array y un nuevo score,
//    devuelva un NUEVO array con el score añadido (no mutes el original).
export function addScore(list: number[], value: number) {
  return [...list, value];
}

// 5) Un tipo `Status` que solo pueda ser "idle", "loading" o "error".
//    Y una constante `currentStatus` con uno de esos valores.
export type Status = "idle" | "loading" | "error"; // <- cámbialo
export const currentStatus: Status = "idle";
