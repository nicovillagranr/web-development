/* =============================================================================
 * EJERCICIO 01 — arrays + callbacks (map / filter / reduce) · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Tipar arrays: number[], string[], boolean[].
 * · Transformar con map, seleccionar con filter y combinar con reduce.
 * · Recibir un callback como parámetro y entregárselo a map o filter.
 *
 * 🟢 CONTEXTO — en el 09 aprendiste a pasar una función como ingrediente (un
 * callback) y a ejecutarla dentro: fn(valor). map, filter y reduce son exactamente
 * eso: métodos de array que reciben un callback y lo aplican a cada elemento. No es
 * un tema nuevo de cero; es usar el 09 donde más se usa de verdad, y en React
 * .map() aparece por todas partes.
 *
 * 🗺️ MAPA
 * TEORÍA · arrays tipados y las tres herramientas → base de todo el archivo
 * BLOQUE A · map: transformar cada elemento → drills 1–3
 * BLOQUE B · filter: seleccionar elementos → drills 4–5
 * BLOQUE C · reduce: combinar todo en un solo valor → drills 6–7
 * BLOQUE D · tú recibes el callback → drills 8–9
 *
 * ▸ 9 drills en escalera, en orden. Prohibidos any, as X y los bucles for (usa map,
 * filter y reduce). No mutes el array de entrada.
 * pnpm test:run src/exercises/03-arrays/exercise-01.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está mal a propósito: arréglalo.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — arrays tipados y las tres herramientas
 *
 * DEFINICIÓN
 * Un array tipado se escribe como siempre, nombre: tipo; el [] solo dice «…y de
 * eso, varios». map, filter y reduce reciben un callback y lo aplican a cada
 * elemento.
 *
 * Ejemplos:
 * number[]  → un array de números: [1, 2, 3]
 * string[]  → un array de strings: ["a", "b"]
 * boolean[] → un array de booleanos: [true, false]
 *
 * 🗣️ LAS PIEZAS
 * .map(fn)             → transforma cada elemento: array del mismo tamaño
 * .filter(fn)          → selecciona: el callback devuelve true o false, y se
 *                        quedan los true; array igual o más pequeño
 * .reduce(fn, inicial) → combina todo en un solo valor (una suma, un texto…); el
 *                        callback recibe el acumulado y el elemento actual
 *
 * SINTAXIS
 * [1, 2, 3].map((n) => n * 2)                 // [2, 4, 6]: una vez por elemento
 * [1, 2, 3, 4].filter((n) => n % 2 === 0)     // [2, 4]: true = «me lo quedo»
 * [1, 2, 3, 4].reduce((acc, n) => acc + n, 0) // 10: acc el acumulado, n el actual,
 *                                             // 0 el valor inicial
 *
 * Ejemplos — el reduce de arriba, paso a paso:
 * acc = 0, n = 1 → 1
 * acc = 1, n = 2 → 3
 * acc = 3, n = 3 → 6
 * acc = 6, n = 4 → 10 ✅
 *
 * 💡 map puede cambiar el tipo: si transformas string → number, el resultado es
 * number[]. ["hola", "ab"].map((s) => s.length) da [4, 2].
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — map: transformar cada elemento */

/* 1) doblarTodos recibe un number[] y devuelve cada número multiplicado por 2.
 * doblarTodos([1, 2, 3]) → [2, 4, 6]
 */
export function doblarTodos(nums: number[]): number[] {
  return nums.map((n) => n * 2);
}
const numerosADoblar: number[] = [1, 2, 3];
doblarTodos(numerosADoblar);

/* 2) aMayusculas recibe un string[] y devuelve cada texto en mayúsculas.
 * aMayusculas(["hola", "ts"]) → ["hola", "TS"]
 */
export function aMayusculas(textos: string[]): string[] {
  return textos.map((a) => a.toUpperCase());
}

/* 3) longitudes recibe un string[] y devuelve un number[] con la longitud de
 * cada texto. (Aquí map cambia el tipo: string[] → number[].)
 *   longitudes(["hola", "ab"]) → [4, 2]
 */
export function longitudes(textos: string[]): number[] {
  return textos.map((t) => t.length); // TODO: usa .map con .length
}

/* ▸ BLOQUE B — filter: seleccionar elementos */

/* 4) soloPares recibe un number[] y devuelve solo los pares.
 * (Pista: un número es par si n % 2 === 0.)
 *   soloPares([1, 2, 3, 4]) → [2, 4]
 */
export function soloPares(nums: number[]): number[] {
  return nums.filter((n) => n % 2 === 0);
}
const lista = [1, 2, 3, 4];
soloPares(lista);

/* 5) palabrasLargas recibe un string[] y devuelve solo las de 5 letras o más.
 * palabrasLargas(["sol", "pelota", "ab", "camino"]) → ["pelota", "camino"]
 */
export function palabrasLargas(textos: string[]): string[] {
  return textos.filter((p) => p.length >= 5);
}

/* ▸ BLOQUE C — reduce: combinar todo en un solo valor */

/* 6) sumarTodos recibe un number[] y devuelve la suma de todos.
 * (Pista: .reduce((acc, n) => acc + n, 0).)
 *   sumarTodos([1, 2, 3, 4]) → 10 ; sumarTodos([]) → 0
 */
export function sumarTodos(nums: number[]): number {
  return nums.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

/* 7) concatenar recibe un string[] y los une en un solo string, en orden.
 * (Pista: reduce con acumulador string e inicial "".)
 *   concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
 */
export function concatenar(textos: string[]): string {
  return textos.reduce((acumulador, elemento) => acumulador + elemento, "");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — tú recibes el callback (higher-order, como el 09)
 *
 * Aquí el callback no lo escribes tú: te llega como parámetro y lo entregas a map o
 * filter. Fíjate en el tipo de fn entre paréntesis.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) transformarCada(nums, fn) aplica fn a cada número y devuelve el array
 * resultante. Es tu propio "map": le pasas un number[] y un callback.
 *   transformarCada([1, 2, 3], (n) => n + 10) → [11, 12, 13]
 */
export function transformarCada(nums: number[], fn: (n: number) => number): number[] {
  return nums.map(fn);
}
transformarCada([1, 2, 3], (n) => n + 10); // [11, 12, 13]

/* 9) contarSi(nums, cumple) devuelve cuántos números cumplen el predicado.
 * cumple es un callback que devuelve boolean. (Pista: filtra y mira .length.)
 *   contarSi([1, 2, 3, 4], (n) => n > 2) → 2     (el 3 y el 4)
 */
export function contarSi(nums: number[], cumple: (n: number) => boolean): number {
  return nums.filter(cumple).length;
}
const tablita = [1, 2, 3, 4];
contarSi(tablita, (n) => n > 2); // (el 3 y el 4)
