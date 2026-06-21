/* =============================================================================
 * EJERCICIO 06 — funciones (6/?): callbacks tipados A FONDO
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * En el 01 pasaste callbacks simples `(n) => n*2`. Pero los callbacks reales
 * tienen más matices: reciben varios datos (el elemento Y su índice), pueden
 * cambiar de tipo (number → string), pueden no encontrar nada (`| undefined`), y
 * a veces eliges ENTRE varios. Aquí afinas la lectura de sus firmas.
 *
 *
 * ▸ EXPLICACIÓN — la firma del callback manda
 * ----------------------------------------------------------------------------
 * El tipo del parámetro-función describe EXACTAMENTE qué recibe y qué devuelve el
 * callback. Si te equivocas en la firma, no encaja:
 *
 *     fn: (item: string, i: number) => string   // recibe DOS cosas
 *     fn: (n: number) => string                 // number ENTRA, string SALE
 *     cumple: (n: number) => boolean            // decide sí/no
 *
 * 🧠 ANALOGÍA: contratar a alguien por una descripción de puesto. Si el puesto
 *    dice "recibe pedido Y mesa, devuelve plato" y mandas a alguien que solo sabe
 *    "recibe pedido", no sirve: le falta un dato para trabajar.
 *
 * 🔧 POR DENTRO: `array.map((item, i) => ...)` SIEMPRE le pasa al callback el
 *    elemento y su índice; tú decides cuántos recoges. Y `array.find(cumple)`
 *    devuelve `T | undefined` (puede no encontrar) — por eso el tipo de retorno
 *    de quien lo use arrastra ese `| undefined`.
 *
 * 💼 CASO REAL: `productos.map((p, i) => <Card key={i} {...p} />)` usa el índice;
 *    `usuarios.find((u) => u.id === id)` puede devolver undefined.
 *
 * OJO — una función que recibe MÁS parámetros no encaja donde se pide una de
 *    MENOS. Por eso un callback `(item, i) => ...` no cabe en un hueco `(item) => ...`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-06.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — el índice y el cambio de tipo
 * -------------------------------------------------------------------------- */

// 1) `mapConIndice` — transforma cada item usando también su POSICIÓN.
//    👉 Dos arreglos: el tipo de `fn` (ahora solo recibe el item, no el índice) →
//       añádele `, i: number`. Y el cuerpo (devuelve la lista igual).
//      mapConIndice(["a","b","c"], (item, i) => `${i}:${item}`) → ["0:a","1:b","2:c"]
export function mapConIndice(
  items: string[],
  fn: (item: string) => string,
): string[] {
  return []
}

// 2) `transformarA` — convierte una lista de números en una de strings.
//    👉 Dos arreglos: el tipo de retorno (ahora `number[]`) y el cuerpo (devuelve
//       los números sin transformar).
//      transformarA([1, 2], (n) => `#${n}`) → ["#1", "#2"]
export function transformarA(nums: number[], fn: (n: number) => string): number[] {
  return []
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — elegir entre callbacks y el `| undefined` del find
 * -------------------------------------------------------------------------- */

// 3) `aplicarSegun` — si `cond`, aplica `siVerdad`; si no, `siFalso`.
//    👉 UN arreglo: el cuerpo (el starter ignora los dos callbacks y devuelve `n`).
//      aplicarSegun(5, true, (n) => n + 1, (n) => n - 1) → 6
//      aplicarSegun(5, false, (n) => n + 1, (n) => n - 1) → 4
export function aplicarSegun(
  n: number,
  cond: boolean,
  siVerdad: (n: number) => number,
  siFalso: (n: number) => number,
): number {
  return 0
}

// 4) `primerQueCumple` — el primer número que cumple, o undefined si ninguno.
//    👉 Dos arreglos: el tipo de retorno (un `number` a secas no puede expresar
//       "puede no haber") → ponlo `number | undefined`. Y el cuerpo (usa `.find`).
//      primerQueCumple([1, 2, 3, 4], (n) => n > 2) → 3
//      primerQueCumple([1, 2], (n) => n > 5) → undefined
export function primerQueCumple(
  nums: number[],
  cumple: (n: number) => boolean,
): number {
  return 0
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: dos callbacks encadenados (transformar y luego decidir)
 * -------------------------------------------------------------------------- */

// 5) `mapYfiltra` — transforma cada número y luego se queda con los que cumplen.
//    👉 Dos arreglos: el tipo de retorno (`number[]`) y el cuerpo (map con
//       `transformar`, luego filter con `mantener`).
//      mapYfiltra([1, 2, 3], (n) => n * 10, (n) => n > 15) → [20, 30]
export function mapYfiltra(
  nums: number[],
  transformar: (n: number) => number,
  mantener: (n: number) => boolean,
): number[] {
  return []
}
