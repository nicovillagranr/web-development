/* =============================================================================
 * EJERCICIO 03 — funciones (3/?): rest parameters (...args) · bloque 02
 *
 * 🎯 OBJETIVOS
 * · Recoger un número variable de argumentos en un array con ...rest.
 * · Mezclar parámetros fijos con un rest al final.
 *
 * 🟢 CONTEXTO — a veces no sabes cuántos argumentos te van a pasar: sumar(1, 2) o
 * sumar(1, 2, 3, 4, 5). En vez de inventar mil parámetros, el ...rest recoge «todos
 * los que vengan» en un array de verdad.
 *
 * 🗺️ MAPA
 * TEORÍA · ...nombre: Tipo[] → base de todo el archivo
 * BLOQUE A · recoger números sueltos → drills 1–2
 * BLOQUE B · usar el array recogido + mezclar fijo con rest → drills 3–4
 * BLOQUE C · capstone: recoger y procesar → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-03.test.ts
 * pnpm typecheck
 *
 * Los starters reciben un array normal (un solo parámetro), así que llamarlos con
 * argumentos sueltos no compila. Corre el test tras cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — ...nombre: Tipo[]
 *
 * DEFINICIÓN
 * Los ...nums juntan todos los argumentos sueltos en un number[]. Dentro de la
 * función, nums es un array normal: tiene .length, .map, .reduce…
 *
 * SINTAXIS
 * function sumar(...nums: number[]): number { … }
 *
 * Ejemplos:
 * sumar(1, 2, 3) → dentro, nums = [1, 2, 3]
 * sumar()        → dentro, nums = []
 *
 * 🧠 ANALOGÍA — la cinta del supermercado: pones 1 producto o 30, y la cajera (la
 * función) los mete todos en la misma bolsa (el array) y luego los procesa. No
 * necesita una cinta distinta según cuántos lleves.
 *
 * ⚠️ TRAMPA — el ...rest siempre va el último, y solo puede haber uno: es «y todo
 * lo demás». Puede ir tras parámetros fijos: (prefijo: string, ...items: string[]).
 *
 * 💡 Por dentro, ...rest es lo contrario del spread ... que ya usas al llamar: al
 * llamar, f(...arr) despliega un array en argumentos sueltos; al definir, ...rest
 * recoge argumentos sueltos en un array. Misma sintaxis, sentidos opuestos.
 *
 * 💡 Caso real: clsx("btn", activo && "activo", grande && "grande"), una utilidad
 * que junta clases CSS variables en un solo string.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — recoger números sueltos */

/* 1) sumarTodos — suma todos los números que reciba (0 si no recibe ninguno).
 * 👉 Dos arreglos: el parámetro (ahora pide un array, así que sumarTodos(1,2,3)
 *    no compila) → conviértelo en ...nums. Y el cuerpo (devuelve 0).
 *   sumarTodos(1, 2, 3) → 6     sumarTodos() → 0
 */
export function sumarTodos(...nums: number[]): number {
  return nums.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

/* 2) concatenar — une todas las palabras con un espacio.
 * concatenar("hola", "qué", "tal") → "hola qué tal"
 */
export function concatenar(...palabras: string[]): string {
  return palabras.join(" ");
}

/* ▸ BLOQUE B — usar el array recogido + mezclar fijo con rest */

/* 3) maximo — el mayor de los números que reciba.
 * 👉 Pista: con un array nums, Math.max(...nums) despliega el array en
 *    argumentos sueltos (el spread del otro lado).
 *   maximo(3, 9, 5) → 9
 */
export function maximo(...nums: number[]): number {
  return Math.max(...nums);
}
/* 4) etiquetar — un prefijo fijo seguido de los items separados por coma.
 * 👉 Aquí hay un parámetro normal (prefijo) Y un rest (...items).
 *   etiquetar("Tags", "a", "b", "c") → "Tags: a, b, c"
 */
export function etiquetar(prefijo: string, ...items: string[]): string {
  return `${prefijo}: ${items.join(", ")}`;
}

/* ▸ BLOQUE C — capstone: recoger y procesar */

/* 5) promedio — la media (redondeada) de los números; 0 si no hay ninguno.
 * 👉 Junta ...nums, súmalos y divide por nums.length (cuidado con el 0).
 *   promedio(2, 4, 6) → 4     promedio() → 0
 */
export function promedio(...nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  return Math.round(nums.reduce((acumulador, elemento) => acumulador + elemento, 0) / nums.length);
}
