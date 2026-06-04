/* =============================================================================
 * EJERCICIO 01 — Arrays + callbacks (map / filter / reduce)
 * =============================================================================
 *
 * ▸ POR QUÉ ESTE EJERCICIO VIENE JUSTO DESPUÉS DEL 09
 * ----------------------------------------------------------------------------
 * En el 09 aprendiste a PASAR una función como ingrediente (un callback) y a
 * EJECUTARLA dentro: `fn(valor)`. Pues `map`, `filter` y `reduce` son
 * exactamente eso: métodos de array que reciben un callback y lo aplican a cada
 * elemento. No es un tema nuevo de cero; es usar el 09 donde más se usa de
 * verdad (y en React `.map()` aparece por todas partes).
 *
 *
 * ▸ CÓMO SE ESCRIBE UN ARRAY TIPADO
 * ----------------------------------------------------------------------------
 *   number[]   → "un array de números"        ej: [1, 2, 3]
 *   string[]   → "un array de strings"         ej: ["a", "b"]
 *   boolean[]  → "un array de booleanos"        ej: [true, false]
 *
 * Igual que antes: `nombre: tipo`. El `[]` solo dice "...y de eso, varios".
 *
 *
 * ▸ LAS TRES HERRAMIENTAS (cada una recibe un callback)
 * ----------------------------------------------------------------------------
 *
 *   .map(fn)     → TRANSFORMA cada elemento. Devuelve un array del MISMO tamaño.
 *                  "convierte cada elemento en otra cosa"
 *
 *   .filter(fn)  → SELECCIONA. El callback devuelve true/false; se quedan los
 *                  que dan true. Devuelve un array IGUAL O MÁS PEQUEÑO.
 *                  "quédate solo con los que cumplan..."
 *
 *   .reduce(fn, inicial) → COMBINA todo el array en UN SOLO valor (una suma, un
 *                  total, un texto...). El callback recibe DOS cosas: el
 *                  acumulado hasta ahora y el elemento actual.
 *                  "ve juntando todo en un único resultado"
 *
 *
 * ▸ EJEMPLO map — transformar
 * ----------------------------------------------------------------------------
 *   const nums = [1, 2, 3];
 *   const dobles = nums.map((n) => n * 2);   // [2, 4, 6]
 *                            └────┬────┘
 *                       el callback: se ejecuta UNA vez por cada elemento.
 *
 * Detalle potente: map puede CAMBIAR el tipo. Si transformas number→string, el
 * resultado es string[]:
 *   ["hola", "ab"].map((s) => s.length)   // number[]  →  [4, 2]
 *
 *
 * ▸ EJEMPLO filter — seleccionar
 * ----------------------------------------------------------------------------
 *   const nums = [1, 2, 3, 4];
 *   const pares = nums.filter((n) => n % 2 === 0);   // [2, 4]
 *                              └────────┬────────┘
 *                 el callback devuelve un boolean: true = "me lo quedo".
 *
 *
 * ▸ EJEMPLO reduce — combinar en un valor
 * ----------------------------------------------------------------------------
 *   const nums = [1, 2, 3, 4];
 *   const suma = nums.reduce((acc, n) => acc + n, 0);   // 10
 *                            └──┬──┘ └┬┘            └┬┘
 *                       acumulado  actual     valor inicial
 *
 *   Paso a paso (inicial 0):
 *     acc=0,  n=1  → 1
 *     acc=1,  n=2  → 3
 *     acc=3,  n=3  → 6
 *     acc=6,  n=4  → 10  ✅
 *
 *
 * ▸ EJERCICIO — drills en escalera. Hazlos EN ORDEN.
 * ----------------------------------------------------------------------------
 * Cada cuerpo provisional está MAL a propósito: arréglalo.
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X`, no uses bucles `for` (usa map/filter/reduce).
 *   - ❌ No mutes el array de entrada (map/filter/reduce ya devuelven uno nuevo).
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/


/* ----------------------------------------------------------------------------
 * BLOQUE A — map: transformar cada elemento
 * -------------------------------------------------------------------------- */

// 1) `doblarTodos` recibe un number[] y devuelve cada número multiplicado por 2.
//      doblarTodos([1, 2, 3]) → [2, 4, 6]
export function doblarTodos(nums: number[]): number[] {
  return nums.map(n => n * 2)
}
const numerosADoblar: number[] = [1, 2, 3]
doblarTodos(numerosADoblar)

// 2) `aMayusculas` recibe un string[] y devuelve cada texto en MAYÚSCULAS.
//      aMayusculas(["hola", "ts"]) → ["HOLA", "TS"]
export function aMayusculas(textos: string[]): string[] {
  return textos.map(a => a.toUpperCase())
}


// 3) `longitudes` recibe un string[] y devuelve un number[] con la longitud de
//    cada texto. (Aquí map CAMBIA el tipo: string[] → number[].)
//      longitudes(["hola", "ab"]) → [4, 2]
export function longitudes(textos: string[]): number[] {
  return textos.map(t => t.length); // TODO: usa .map con .length
}


/* ----------------------------------------------------------------------------
 * BLOQUE B — filter: seleccionar elementos
 * -------------------------------------------------------------------------- */

// 4) `soloPares` recibe un number[] y devuelve solo los pares.
//    (Pista: un número es par si `n % 2 === 0`.)
//      soloPares([1, 2, 3, 4]) → [2, 4]
export function soloPares(nums: number[]): number[] {
  return nums.filter((n) => n % 2 === 0)
}
const lista = [1, 2, 3, 4]
soloPares(lista)


// 5) `palabrasLargas` recibe un string[] y devuelve solo las de 5 letras o más.
//      palabrasLargas(["sol", "pelota", "ab", "camino"]) → ["pelota", "camino"]
export function palabrasLargas(textos: string[]): string[] {
  return textos.filter((p) => p.length >= 5)
}


/* ----------------------------------------------------------------------------
 * BLOQUE C — reduce: combinar todo en un solo valor
 * -------------------------------------------------------------------------- */

// 6) `sumarTodos` recibe un number[] y devuelve la suma de todos.
//    (Pista: .reduce((acc, n) => acc + n, 0).)
//      sumarTodos([1, 2, 3, 4]) → 10 ; sumarTodos([]) → 0
export function sumarTodos(nums: number[]): number {
  return nums.reduce((acumulador, elemento) => acumulador + elemento, 0)
}


// 7) `concatenar` recibe un string[] y los une en un solo string, en orden.
//    (Pista: reduce con acumulador string e inicial "".)
//      concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
export function concatenar(textos: string[]): string {
  return textos.reduce((acumulador, elemento) => acumulador + elemento, "")
}


/* ----------------------------------------------------------------------------
 * BLOQUE D — TÚ recibes el callback (higher-order, como el 09)
 * Aquí el callback no lo escribes tú: te llega como parámetro y lo entregas a
 * map/filter. Fíjate en el TIPO de `fn` entre paréntesis.
 * -------------------------------------------------------------------------- */

// 8) `transformarCada(nums, fn)` aplica `fn` a cada número y devuelve el array
//    resultante. Es tu propio "map": le pasas un number[] y un callback.
//      transformarCada([1, 2, 3], (n) => n + 10) → [11, 12, 13]
export function transformarCada(nums: number[], fn: (n: number) => number): number[] {
  return nums.map(fn)
}
transformarCada([1, 2, 3], (n) => n + 10) // [11, 12, 13]

// 9) `contarSi(nums, cumple)` devuelve CUÁNTOS números cumplen el predicado.
//    `cumple` es un callback que devuelve boolean. (Pista: filtra y mira .length.)
//      contarSi([1, 2, 3, 4], (n) => n > 2) → 2     (el 3 y el 4)
export function contarSi(nums: number[], cumple: (n: number) => boolean): number {
  return nums.filter(cumple).length
}
const tablita = [1, 2, 3, 4]
contarSi(tablita, (n) => n > 2) // (el 3 y el 4)
