/* =============================================================================
 * EJERCICIO 01 — Inferencia vs anotación explícita      [APROBADO ✅]
 * =============================================================================
 *
 * 1) CONTEXTO
 * ----------------------------------------------------------------------------
 * TypeScript puede inferir el tipo de la mayoría de variables y retornos sin
 * que tú escribas nada. Pero no siempre la inferencia produce el tipo que tú
 * quieres. Este ejercicio NO va de escribir mucho TS, sino de aprender a
 * decidir cuándo anotar y cuándo callarte.
 *
 * 2) OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * - Distinguir inferencia automática vs anotación explícita.
 * - Entender la diferencia entre tipo literal ("", 0, false) y tipo amplio
 *   (string, number, boolean).
 * - Justificar por qué anotas (o no) en cada caso.
 *
 * 3) HERRAMIENTAS RELEVANTES
 * ----------------------------------------------------------------------------
 * - Tipos primitivos: string, number, boolean
 * - Anotación de variables (: type)
 * - Anotación de parámetros y retorno de función
 * - Tipos literales vs tipos amplios
 * - Inferencia de TS
 *
 * 4) RESTRICCIONES
 * ----------------------------------------------------------------------------
 * - ❌ Nada de `any`.
 * - ❌ Nada de `as` (type assertions).
 * - ❌ No anotes lo que TS ya infiere bien.
 * - ✅ Los tests deben pasar sin tocarlos.
 *
 * 5) ARCHIVOS
 * ----------------------------------------------------------------------------
 * - src/exercises/01-tipos-basicos/exercise-01.ts        (este archivo)
 * - src/exercises/01-tipos-basicos/exercise-01.test.ts   (NO tocar)
 *
 * 6) CRITERIOS DE VALIDACIÓN
 * ----------------------------------------------------------------------------
 * 1. `pnpm test:run` pasa los 4 tests del archivo.
 * 2. `pnpm typecheck` pasa limpio.
 * 3. EMPTY_USER tiene tipo { name: string; age: number }, NO { name: ""; age: 0 }.
 * 4. En revisión: justificar para cada hueco si anotaste o dejaste inferir y por qué.
 *
 * LECCIÓN APRENDIDA
 * ----------------------------------------------------------------------------
 * - `const` + primitivo → TS infiere el tipo literal ("Nicolás", 23, true).
 *   Como un primitivo no tiene "interior", reasignar ya está bloqueado por
 *   `const`; quedarse con el literal no rompe nada.
 *
 * - `const` + objeto → TS ENSANCHA las propiedades (string en vez de "",
 *   number en vez de 0). Las propiedades de objeto son mutables por defecto;
 *   si TS infiriera el literal, te bloquearía mutaciones legales en JS:
 *
 *       EMPTY_USER.name = "Otro"  // ✅ permitido porque name es `string`
 *
 *   Para forzar literales en un objeto se usa `as const` (lo veremos más
 *   adelante).
 *
 * ===========================================================================*/

// 1) Una constante con tu nombre.
export const userName = "Nicolás";

// 2) Una constante con tu edad.
export const userAge = 23;

// 3) Una constante booleana que indique si estás activo.
export const isActive = true;

// 4) Una función que reciba dos números y devuelva su suma.
//    Decide qué anotar y qué dejar inferir.
export function add(a: number, b: number) {
  return a + b;
}

// 5) Una función que reciba un string y devuelva su longitud.
export function length(text: string) {
  return text.length;
}

// 6) Una constante `EMPTY_USER` que represente "un usuario aún sin datos".
//    Debe tener `name: string` y `age: number`. Piensa qué tipo darle
//    para que TS NO infiera valores literales ("" y 0) sino los tipos amplios.
export const EMPTY_USER = { name: "", age: 0 };
