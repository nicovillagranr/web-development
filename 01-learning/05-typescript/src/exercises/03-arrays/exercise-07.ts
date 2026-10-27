/* =============================================================================
 * EJERCICIO 07 — arrays: copiar, insertar y quitar sin mutar (slice + spread) · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Sacar trozos de un array con slice, sin tocar el original.
 * · Insertar y quitar elementos creando un array nuevo con spread.
 *
 * 🟢 CONTEXTO — en React, y en buen código, no se mutan las listas: se crea una
 * nueva con el cambio. slice saca un trozo sin tocar el original; el spread [...arr]
 * copia y te deja insertar. Su primo splice sí muta, y por eso se evita.
 *
 * 🗺️ MAPA
 * TEORÍA · slice y spread → base de todo el archivo
 * BLOQUE A · slice: trozos sin mutar → drills 1–2
 * BLOQUE B · spread: insertar sin mutar → drills 3–4
 * BLOQUE C · capstone: quitar por índice sin mutar → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/03-arrays/exercise-07.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — slice y spread
 *
 * DEFINICIÓN
 * slice(inicio, fin) incluye inicio y excluye fin; sin fin, llega hasta el final. El
 * spread vuelca un array dentro de otro nuevo. Todo devuelve un array nuevo.
 *
 * Ejemplos:
 * [1, 2, 3, 4].slice(0, 2) → [1, 2]: desde 0 hasta antes de 2, sin mutar
 * [1, 2, 3, 4].slice(1)    → [2, 3, 4]: desde 1 hasta el final
 * [...nums, 9]             → copia + 9 al final
 * [9, ...nums]             → 9 al inicio + copia
 *
 * 🧠 ANALOGÍA — slice saca una fotocopia de un tramo, con el original intacto. El
 * spread vuelca las cartas en una mesa nueva donde puedes añadir más. splice sería
 * recortar el original con tijeras: lo estropea, y por eso no se usa.
 *
 * ⚠️ TRAMPA — nunca devuelvas el parámetro tal cual ni uses push o splice: mutan.
 * Siempre un array nuevo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — slice: trozos sin mutar */

/* 1) primerosTres — los primeros 3 elementos.
 * primerosTres([1, 2, 3, 4, 5]) → [1, 2, 3]
 */
export function primerosTres(nums: number[]): number[] {
  return nums.slice(0, 3);
}
primerosTres([1, 2, 3, 4, 5]); // return: [1, 2, 3]

/* 2) sinElPrimero — todos menos el primero.
 * sinElPrimero([1, 2, 3]) → [2, 3]
 */
export function sinElPrimero(nums: number[]): number[] {
  return nums.slice(1);
}
sinElPrimero([1, 2, 3]); // return: [2, 3]

/* ▸ BLOQUE B — spread: insertar sin mutar */

/* 3) agregarAlFinal — una copia con x al final.
 * agregarAlFinal([1, 2], 9) → [1, 2, 9]   (y el original no cambia)
 */
export function agregarAlFinal(nums: number[], x: number): number[] {
  return [...nums, x];
}

/* 4) agregarAlInicio — una copia con x al inicio.
 * agregarAlInicio([1, 2], 9) → [9, 1, 2]
 */
export function agregarAlInicio(nums: number[], x: number): number[] {
  return [x, ...nums];
}

/* ▸ BLOQUE C — capstone: quitar por índice sin mutar */

/* 5) quitarEn — una copia sin el elemento en la posición i.
 * (junta el trozo de antes + el trozo de después)
 * quitarEn([10, 20, 30, 40], 1) → [10, 30, 40]
 */
export function quitarEn(nums: number[], i: number): number[] {
  return [...nums.slice(0, i), ...nums.slice(i + 1)];
}
quitarEn([10, 20, 30, 40], 2); // return: [10, 20, 40] la posición 2 quitó el 30
