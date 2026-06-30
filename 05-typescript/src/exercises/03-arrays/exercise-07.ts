/* =============================================================================
 * EJERCICIO 07 — Arrays: copiar/insertar/quitar SIN mutar (`slice` + spread)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * En React (y en buen código) NO se mutan las listas: se crea una NUEVA con el
 * cambio. `slice` saca un trozo sin tocar el original; el spread `[...arr]` copia
 * y te deja insertar. (Su primo `splice` SÍ muta — lo evitamos.)
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     [1, 2, 3, 4].slice(0, 2)   // [1, 2]   (desde 0, hasta ANTES de 2; no muta)
 *     [1, 2, 3, 4].slice(1)      // [2, 3, 4] (desde 1 hasta el final)
 *     [...nums, 9]               // copia + 9 al final
 *     [9, ...nums]               // 9 al inicio + copia
 *
 * 🧠 ANALOGÍA: `slice` saca una FOTOCOPIA de un tramo (el original intacto). El
 *    spread vuelca las cartas en una MESA NUEVA donde puedes añadir más. `splice`
 *    sería recortar el original con tijeras — lo estropea, por eso no lo usamos.
 *
 * 🔧 POR DENTRO: `slice(inicio, fin)` incluye `inicio` y excluye `fin`. Sin `fin`,
 *    llega hasta el final. Todo devuelve un array NUEVO.
 *
 * OJO — nunca devuelvas el parámetro tal cual ni uses `push`/`splice` (mutan).
 *    Siempre un array nuevo.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-07.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — slice: trozos sin mutar --- */

// 1) `primerosTres` — los primeros 3 elementos.
//    primerosTres([1, 2, 3, 4, 5]) → [1, 2, 3]
export function primerosTres(nums: number[]): number[] {
  return nums
}

// 2) `sinElPrimero` — todos menos el primero.
//    sinElPrimero([1, 2, 3]) → [2, 3]
export function sinElPrimero(nums: number[]): number[] {
  return nums
}

/* --- BLOQUE B — spread: insertar sin mutar --- */

// 3) `agregarAlFinal` — una copia con `x` al final.
//    agregarAlFinal([1, 2], 9) → [1, 2, 9]   (y el original NO cambia)
export function agregarAlFinal(nums: number[], x: number): number[] {
  return nums
}

// 4) `agregarAlInicio` — una copia con `x` al inicio.
//    agregarAlInicio([1, 2], 9) → [9, 1, 2]
export function agregarAlInicio(nums: number[], x: number): number[] {
  return nums
}

/* --- BLOQUE C — CAPSTONE: quitar por índice sin mutar --- */

// 5) `quitarEn` — una copia sin el elemento en la posición `i`.
//    (junta el trozo de antes + el trozo de después)
//    quitarEn([10, 20, 30, 40], 1) → [10, 30, 40]
export function quitarEn(nums: number[], i: number): number[] {
  return nums
}
