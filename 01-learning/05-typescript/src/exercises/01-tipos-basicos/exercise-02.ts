/* =============================================================================
 * EJERCICIO 02 — arrays, null y uniones simples · bloque 01 · aprobado ✅
 *
 * 🎯 OBJETIVOS
 * · Tipar arrays homogéneos sin caer en la trampa de never[].
 * · Modelar «valor o ausencia» con null o undefined, y «uno de varios strings
 *   fijos» con uniones literales.
 * · Mantener funciones puras, sin mutar, y con tipos de retorno honestos.
 *
 * 🟢 CONTEXTO — el ejercicio 01 fue solo sobre primitivos. Ahora se sube un
 * escalón: arrays, valores que pueden estar ausentes (null o undefined) y
 * conjuntos cerrados de strings (uniones literales). Tres cosas que aparecen en
 * cada componente React real.
 *
 * 🗺️ MAPA
 * TEORÍA · las piezas del ejercicio → drills 1–5
 *
 * ▸ 5 drills en orden. Prohibidos any, as (type assertions) y mutar arrays (nada
 * de push, splice ni asignar por índice). No anotes lo que TS ya infiere bien, y
 * que los retornos sean honestos: si pueden devolver undefined, el tipo lo refleja.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-02.test.ts
 * pnpm typecheck
 *
 * Criterios: pasan los 5 tests del archivo, y el tipo de findScore es
 * number | undefined, no number (si te sale number solo, no entendiste el punto).
 * En la revisión: ¿por qué scores = [] sin anotación sería un problema? ¿Por qué
 * elegiste null y no undefined para lastLogin, o al revés? ¿De dónde sale el
 * | undefined en findScore?
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — las piezas del ejercicio
 *
 * DEFINICIÓN
 * Cada drill usa una o dos de estas piezas; la última, noUncheckedIndexedAccess,
 * está activada en este proyecto: investiga qué implica.
 *
 * 🗣️ LAS PIEZAS
 * T[]                      → un array homogéneo de T
 * null, undefined          → la ausencia de valor
 * A | B                    → una unión: o uno, o el otro
 * "idle" | "loading"       → una unión de tipos literales de string
 * type Nombre = …          → un alias: le pone nombre a un tipo
 * [...lista, x]            → el spread: un array nuevo, sin mutar el original
 * noUncheckedIndexedAccess → la opción del tsconfig que afecta a lista[i]
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Un array de puntuaciones (números). Empieza vacío.
 * Cuidado: si no anotas, TS infiere never[] y no podrás hacer push.
 */
export const scores: number[] = [];
scores.push(1);
scores.push(2);
scores.push(3);
/* 2) Una constante lastLogin que represente "la fecha del último login
 * o ningún login todavía". Inicialízala como "todavía no hay login".
 * Pista: la fecha la representamos como string ISO ("2026-05-27").
 */
export const lastLogin: string | null = null;

/* 3) Una función findScore que reciba el array de scores y un índice,
 * y devuelva el score en esa posición. Piensa: ¿qué pasa si el índice
 * no existe? Tu tipo de retorno tiene que ser honesto.
 */
export function findScore(list: number[], index: number) {
  return list[index];
}

// const test: string = findScore(scores, 0)

/* 4) Una función addScore que reciba el array y un nuevo score,
 * devuelva un nuevo array con el score añadido (no mutes el original).
 */
export function addScore(list: number[], value: number) {
  return [...list, value];
}

/* 5) Un tipo Status que solo pueda ser "idle", "loading" o "error".
 * Y una constante currentStatus con uno de esos valores.
 */
export type Status = "idle" | "loading" | "error"; // <- cámbialo
export const currentStatus: Status = "idle";
