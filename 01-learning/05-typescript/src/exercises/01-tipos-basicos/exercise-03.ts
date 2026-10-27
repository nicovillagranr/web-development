/* =============================================================================
 * EJERCICIO 03 — tuplas, readonly y as const · bloque 01 · aprobado ✅
 *
 * 🎯 OBJETIVOS
 * · Modelar arrays inmutables con readonly T[], y tuplas con [T1, T2].
 * · Saber qué cambia al aplicar as const a un objeto o a un array, y cuándo usar
 *   cada herramienta: no son intercambiables.
 *
 * 🟢 CONTEXTO — en el 01 quedó un cabo suelto: al declarar un objeto con const, TS
 * ensancha las propiedades (string en vez del literal "rojo"). Con los arrays pasa
 * lo mismo: [1, 2, 3] se infiere como number[], no como una tupla fija de 3
 * números. Este ejercicio cierra ese cabo con tres herramientas que vas a usar
 * constantemente en React.
 *
 * 🗺️ MAPA
 * TEORÍA · readonly, as const y tuplas → drills 1–5
 *
 * ▸ 5 drills en orden. Prohibidos any, as fuera de as const (nada de as string, as
 * number…) y mutar, ni siquiera por error: si TS te deja, mal hecho. Cada
 * constante, con el tipo más estrecho posible, no más.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-03.test.ts
 * pnpm typecheck
 *
 * Criterios: COLORS es un array inmutable de exactamente "red", "green" y "blue"
 * (no string[], ni un ("red" | "green" | "blue")[] mutable); POINT, una tupla
 * [number, number], no number[]; THEME, con todas sus propiedades literales; y
 * swap devuelve una tupla con los tipos invertidos, no (A | B)[]. En la revisión:
 * ¿qué hace exactamente as const, y en qué se diferencia de readonly? ¿Por qué TS
 * infiere [1, 2] como number[] y no como [number, number]? ¿Cuándo usarías una
 * tupla en vez de un objeto?
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — readonly, as const y tuplas
 *
 * DEFINICIÓN
 * Tres herramientas para que un valor no cambie y conserve su forma exacta:
 * readonly marca algo como inmutable; as const lo congela en su forma literal más
 * estrecha posible; una tupla fija la longitud y la posición de un array.
 *
 * 🗣️ LAS PIEZAS
 * readonly T[] → un array inmutable (sinónimo: ReadonlyArray<T>)
 * [T1, T2]     → una tupla: array con longitud y posición conocidas
 * as const     → const assertion: congela un literal en su forma más estrecha
 * widening     → el ensanchamiento: TS infiere string donde había "rojo"
 *
 * Ejemplos:
 * [1, 2, 3]                             → number[]: no una tupla
 * const p: [number, number] = [10, 20]  → una tupla: p[2] es error
 * const t = { mode: "light" } as const → { readonly mode: "light" }
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Un array de colores solo de lectura: "red", "green", "blue".
 * Debe ser imposible hacer COLORS.push("yellow") o COLORS[0] = "pink".
 * El tipo debe conservar los literales, no ensancharse a string.
 */
export const COLORS = ["red", "green", "blue"] as const;

/* 2) Una tupla POINT que represente coordenadas (x, y).
 * Debe tener exactamente 2 elementos, ambos number.
 * POINT[2] debe ser error de TS (índice fuera de la tupla).
 */
export const POINT: [number, number] = [10, 20];

/* 3) Un objeto THEME con las propiedades:
 *   mode: "light"     (literal, no string)
 *   radius: 8         (literal, no number)
 * Debe ser imposible mutar THEME.mode = "dark".
 * Pista: hay una forma muy corta de conseguir esto sin escribir tipos a mano.
 */
export const THEME = { mode: "light", radius: 8 } as const;

/* 4) Una función swap que reciba una tupla [A, B] y devuelva [B, A].
 * Si recibe [string, number] debe devolver [number, string], no (string | number)[].
 * Pista: necesitas dos type parameters (generics).
 */
export function swap<A, B>(pair: [A, B]): [B, A] {
  return [pair[1], pair[0]];
}

/* 5) Una función head que reciba un array readonly de números y devuelva
 * el primer elemento. Piensa: ¿el retorno puede ser undefined? ¿Por qué?
 */
export function head(list: readonly number[]) {
  return list[0];
}
