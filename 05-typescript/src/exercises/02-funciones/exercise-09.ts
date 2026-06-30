/* =============================================================================
 * EJERCICIO 09 — funciones (9/?): PIPE   ·   [REFORZADO]
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE  (y por qué se amplió)
 * ----------------------------------------------------------------------------
 * Cuarto escalón del arco 06→10, y el corazón del capstone. La pieza difícil es el
 * `reduce` que ARRASTRA: el acumulador NO es una suma, es "el dato según va saliendo
 * de cada paso". Lo reconstruimos del BUCLE `for` (donde el carry se ve a ojo) al
 * `reduce` (la versión compacta). Y, de paso, montamos el drill que en el 10 te
 * frenó: apuntar cada resultado intermedio (`aplicarYregistrar`).
 *
 *
 * ▸ EXPLICACIÓN 1 — el CARRY: el acumulador es el DATO en curso
 * ----------------------------------------------------------------------------
 * Pasar un dato por una lista de funciones es, con un bucle:
 *
 *     let actual = n                    // el dato que va cambiando
 *     for (const paso of pasos) {
 *       actual = paso(actual)           // cada paso pisa 'actual' con su salida
 *     }
 *     return actual                     // el dato tras pasar por todos
 *
 * El MISMO carry, con `reduce`, es:
 *
 *     return pasos.reduce((acum, paso) => paso(acum), n)
 *     //                   └ acum = 'actual'      └ inicial = n (el dato de entrada)
 *
 * `acum` ≡ `actual`. El inicial `n` ≡ `let actual = n`. Cada vuelta = una pasada del
 * bucle. Reduce es el bucle escrito en una línea.
 *
 * 🧠 ANALOGÍA (la tuya): el TÚNEL DE LAVADO. El coche (dato) entra y pasa por las
 *    estaciones en fila; la salida de una es la entrada de la siguiente. `acum` es
 *    el coche según va saliendo de cada estación.
 *
 * 🔧 APUNTAR LOS INTERMEDIOS: si además quieres GUARDAR cómo iba quedando el dato
 *    en cada estación, empujas `actual` a una lista en cada vuelta (un EFECTO, como
 *    el `void` del 05). Eso es el `aplicarYregistrar` del drill 3.
 *
 * OJO — el tipo `((n: number) => number)[]` es "una lista de funciones número→número".
 *    Los `()` agrupan la firma para que el `[]` diga "lista de eso".
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-09.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE 0 — el carry: del bucle al reduce (y apuntar los intermedios)
 * -------------------------------------------------------------------------- */

// 1) `aplicarPasosConFor` — pasa `n` por todos los pasos usando un BUCLE `for`.
//    👉 El starter devuelve `n` sin aplicar nada. Usa `let actual = n` y, en el
//       bucle, `actual = paso(actual)`; devuelve `actual` al final.
//      aplicarPasosConFor(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
export function aplicarPasosConFor(n: number, pasos: ((n: number) => number)[]): number {
  let actual = n
  for (const paso of pasos) {
    actual = paso(actual)
  }
  return actual
}
aplicarPasosConFor(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) // 3 + 1 = 4; 4 * 2 = 8; 8 - 1 = 7

// 2) `aplicarPasosConReduce` — lo MISMO, pero con `reduce`. (acum ≡ actual, inicial ≡ n)
//    👉 El starter devuelve `n`. Escribe el reduce: `pasos.reduce((acum, paso) => ..., n)`.
//      aplicarPasosConReduce(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
export function aplicarPasosConReduce(n: number, pasos: ((n: number) => number)[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n)
}
aplicarPasosConReduce(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) // 3 + 1 = 4; 4 * 2 = 8; 8 - 1 = 7

// 3) `aplicarYregistrar` — pasa `n` por los pasos y APUNTA cada resultado intermedio
//    en `registro` (efecto). Devuelve el resultado final. (Es el drill 4 del 10.)
//    👉 El starter devuelve `n` y no apunta nada. Con el bucle: en cada vuelta,
//       `actual = paso(actual)` y luego `registro.push(actual)`.
//      const reg: number[] = []; aplicarYregistrar(3, [(n)=>n+1,(n)=>n*2], reg) → 8; reg = [4, 8]
export function aplicarYregistrar(n: number, pasos: ((n: number) => number)[], registro: number[]): number {
  let actual = n
  for (const paso of pasos) {
    actual = paso(actual)
    registro.push(actual)
  }
  return actual
}
aplicarYregistrar(3, [(n) => n + 1, (n) => n * 2], []) // 3 + 1 = 4; 4 * 2 = 8


/* ---------------------------------------------------------------------------
 * BLOQUE A — aplicar la lista de pasos a un dato
 * -------------------------------------------------------------------------- */

// 4) `aplicarPasos` — pasa `n` por todos los pasos, en orden.
//      aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
//      aplicarPasos(3, []) → 3
export function aplicarPasos(n: number, pasos: ((n: number) => number)[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n)
}
aplicarPasos(5, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) // 5 + 1 = 6; 6 * 2 = 12; 12 - 1 = 11

// 5) `aplicarPasosTexto` — lo mismo con strings.
//      aplicarPasosTexto("hola", [(s) => s.toUpperCase(), (s) => s + "!"]) → "HOLA!"
export function aplicarPasosTexto(texto: string, pasos: ((s: string) => string)[]): string {
  return pasos.reduce((acum, paso) => paso(acum), texto)
}
aplicarPasosTexto("hola", [(s) => s.toUpperCase(), (s) => s + "!", (s) => s + " Nico"]) // "HOLA! Nico"


/* ---------------------------------------------------------------------------
 * BLOQUE B — devolver la tubería ya montada (point-free)
 * ---------------------------------------------------------------------------
 * En vez de aplicar los pasos a un dato concreto, devuelves una FUNCIÓN que, dado
 * cualquier dato, lo hace pasar por todos los pasos. (Montar el túnel vacío: el
 * coche lo pone quien la encienda, después → cafetera del 07.)
 * -------------------------------------------------------------------------- */

// 6) `pipe` — devuelve una función que aplica todos los pasos.
//      const p = pipe([(n) => n + 1, (n) => n * 2]); p(3) → 8; p(10) → 22
export function pipe(pasos: ((n: number) => number)[]): (n: number) => number {
  return (n) => pasos.reduce((acum, paso) => paso(acum), n)
}
const tuberia = pipe([(n) => n + 1, (n) => n * 2])
tuberia(3) // 3 + 1 = 4; 4 * 2 = 8

// 7) `pipeTexto` — la versión string.
//      const p = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase()]); p("  hi ") → "HI"
export function pipeTexto(pasos: ((s: string) => string)[]): (s: string) => string {
  return (s) => pasos.reduce((acum, paso) => paso(acum), s)
}
const tuberiaTexto = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase(), (s) => s + "!"])
tuberiaTexto("Hola, buenos días") // "HOLA, BUENOS DÍAS!"


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: aplicar la tubería a CADA elemento de una lista
 * -------------------------------------------------------------------------- */

// 8) `procesarCada` — aplica la lista de pasos a cada número de `nums`.
//      procesarCada([1, 2, 3], [(n) => n + 1, (n) => n * 10]) → [20, 30, 40]
export function procesarCada(nums: number[], pasos: ((n: number) => number)[]): number[] {
  return nums.map((n) => pasos.reduce((acum, paso) => paso(acum), n))
}
procesarCada([10, 20, 30], [(n) => n + 1, (n) => n * 10]) // [11, 21, 31]
