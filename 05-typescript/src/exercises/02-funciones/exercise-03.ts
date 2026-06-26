/* =============================================================================
 * EJERCICIO 03 — funciones (3/?): REST parameters (`...args`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * A veces no sabes CUÁNTOS argumentos te van a pasar: `sumar(1, 2)` o
 * `sumar(1, 2, 3, 4, 5)`. En vez de inventar mil parámetros, el `...rest` recoge
 * "todos los que vengan" en un array de verdad.
 *
 *
 * ▸ EXPLICACIÓN — `...nombre: Tipo[]`
 * ----------------------------------------------------------------------------
 *     function sumar(...nums: number[]): number { ... }
 *     sumar(1, 2, 3)   // dentro, nums = [1, 2, 3]
 *     sumar()          // dentro, nums = []
 *
 * Los `...nums` JUNTAN todos los argumentos sueltos en un `number[]`. Dentro de
 * la función, `nums` es un array normal: tiene `.length`, `.map`, `.reduce`...
 *
 * 🧠 ANALOGÍA: la cinta del supermercado. Pones 1 producto o 30; la cajera (la
 *    función) los mete TODOS en la misma bolsa (el array) y luego los procesa. No
 *    necesita una cinta distinta según cuántos lleves.
 *
 * 🔧 POR DENTRO: `...rest` es lo CONTRARIO del spread `...` que ya usas al llamar.
 *    Al LLAMAR, `f(...arr)` DESPLIEGA un array en argumentos sueltos; al DEFINIR,
 *    `...rest` RECOGE argumentos sueltos en un array. Misma sintaxis, sentidos
 *    opuestos según el lado.
 *
 * 💼 CASO REAL: `clsx("btn", activo && "activo", grande && "grande")` — una util
 *    que junta clases CSS variables en un solo string.
 *
 * OJO — el `...rest` SIEMPRE va el ÚLTIMO (y solo puede haber uno): es "y todo lo
 *    demás". Puede ir tras parámetros fijos: `(prefijo: string, ...items: string[])`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Los starters reciben un array NORMAL (un solo parámetro), así que llamarlos con
 * argumentos sueltos no compila. Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-03.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — recoger números sueltos
 * -------------------------------------------------------------------------- */

// 1) `sumarTodos` — suma todos los números que reciba (0 si no recibe ninguno).
//    👉 Dos arreglos: el parámetro (ahora pide UN array, así que `sumarTodos(1,2,3)`
//       no compila) → conviértelo en `...nums`. Y el cuerpo (devuelve 0).
//      sumarTodos(1, 2, 3) → 6     sumarTodos() → 0
export function sumarTodos(...nums: number[]): number {
  return nums.reduce((acumulador, elemento) => acumulador + elemento, 0)
}

// 2) `concatenar` — une todas las palabras con un espacio.
//      concatenar("hola", "qué", "tal") → "hola qué tal"
export function concatenar(...palabras: string[]): string {
  return palabras.join(" ")
}

/* ---------------------------------------------------------------------------
 * BLOQUE B — usar el array recogido + mezclar fijo con rest
 * -------------------------------------------------------------------------- */

// 3) `maximo` — el mayor de los números que reciba.
//    👉 Pista: con un array `nums`, `Math.max(...nums)` despliega el array en
//       argumentos sueltos (el spread del otro lado).
//      maximo(3, 9, 5) → 9
export function maximo(...nums: number[]): number {
  return Math.max(...nums)
}
// 4) `etiquetar` — un prefijo FIJO seguido de los items separados por coma.
//    👉 Aquí hay un parámetro normal (`prefijo`) Y un rest (`...items`).
//      etiquetar("Tags", "a", "b", "c") → "Tags: a, b, c"
export function etiquetar(prefijo: string, ...items: string[]): string {
  return `${prefijo}: ${items.join(", ")}`
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: recoger y procesar
 * -------------------------------------------------------------------------- */

// 5) `promedio` — la media (redondeada) de los números; 0 si no hay ninguno.
//    👉 Junta `...nums`, súmalos y divide por `nums.length` (cuidado con el 0).
//      promedio(2, 4, 6) → 4     promedio() → 0
export function promedio(...nums: number[]): number {
  if (nums.length === 0) {
    return 0
  }
  return Math.round(nums.reduce((acumulador, elemento) => acumulador + elemento, 0) / nums.length)
}
