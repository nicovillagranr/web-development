/* =============================================================================
 * EJERCICIO 01 — inferencia frente a anotación explícita · bloque 01 · aprobado ✅
 *
 * 🎯 OBJETIVOS
 * · Distinguir la inferencia automática de la anotación explícita.
 * · Distinguir el tipo literal ("", 0, false) del tipo amplio (string, number,
 *   boolean).
 * · Justificar por qué anotas, o no, en cada caso.
 *
 * 🟢 CONTEXTO — TypeScript puede inferir el tipo de la mayoría de variables y
 * retornos sin que escribas nada, pero la inferencia no siempre produce el tipo
 * que quieres. Este ejercicio no va de escribir mucho TS, sino de aprender a
 * decidir cuándo anotar y cuándo callarte.
 *
 * 🗺️ MAPA
 * TEORÍA · const con un primitivo y con un objeto → drills 1–6
 *
 * ▸ 6 drills en orden. Prohibidos any y as (type assertions). No anotes lo que TS
 * ya infiere bien. Los tests deben pasar sin tocarlos.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-01.test.ts
 * pnpm typecheck
 *
 * Criterios: pasan los 4 tests del archivo; EMPTY_USER tiene el tipo
 * { name: string; age: number }, no { name: ""; age: 0 }; y en la revisión
 * justificas, para cada hueco, si anotaste o dejaste inferir, y por qué.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — const con un primitivo y con un objeto
 *
 * DEFINICIÓN
 * TS infiere el tipo a partir del valor, y tú puedes anotarlo con : tipo en
 * variables, parámetros y retornos. Lo que infiere depende de qué guardes: un tipo
 * literal ("Nicolás") o un tipo amplio (string).
 *
 * Ejemplos:
 * const userName = "Nicolás"             → el tipo literal "Nicolás"
 * const EMPTY_USER = { name: "", age: 0 } → { name: string; age: number }
 *
 * 💡 Lección aprendida — const + primitivo: TS infiere el tipo literal ("Nicolás",
 * 23, true). Como un primitivo no tiene «interior», reasignar ya está bloqueado por
 * const, y quedarse con el literal no rompe nada. const + objeto: TS ensancha las
 * propiedades (string en vez de "", number en vez de 0). Las propiedades de un
 * objeto son mutables por defecto; si TS infiriera el literal, te bloquearía
 * mutaciones legales en JS: EMPTY_USER.name = "Otro" ✅ vale porque name es
 * string. Para forzar literales en un objeto se usa as const (lo verás más
 * adelante).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Una constante con tu nombre.
 */
export const userName = "Nicolás";

/* 2) Una constante con tu edad.
 */
export const userAge = 23;

/* 3) Una constante booleana que indique si estás activo.
 */
export const isActive = true;

/* 4) Una función que reciba dos números y devuelva su suma.
 * Decide qué anotar y qué dejar inferir.
 */
export function add(a: number, b: number) {
  return a + b;
}

/* 5) Una función que reciba un string y devuelva su longitud.
 */
export function length(text: string) {
  return text.length;
}

/* 6) Una constante EMPTY_USER que represente "un usuario aún sin datos".
 * Debe tener name: string y age: number. Piensa qué tipo darle
 * para que TS no infiera valores literales ("" y 0) sino los tipos amplios.
 */
export const EMPTY_USER = { name: "", age: 0 };
