/* =============================================================================
 * EJERCICIO 09 — funciones (9/?): pipe · bloque 02 · reforzado
 *
 * 🎯 OBJETIVOS
 * · Pasar un dato por una lista de funciones con un reduce que arrastra el dato.
 * · Apuntar los resultados intermedios, y devolver la tubería ya montada.
 *
 * 🟢 CONTEXTO — cuarto escalón del arco 06→10, y el corazón del capstone. La pieza
 * difícil es el reduce que arrastra: el acumulador no es una suma, es «el dato
 * según va saliendo de cada paso». Se reconstruye del bucle for (donde el carry se
 * ve a ojo) al reduce (la versión compacta). Y, de paso, se monta el drill que en
 * el 10 te frenó: apuntar cada resultado intermedio (aplicarYregistrar).
 *
 * 🗺️ MAPA
 * TEORÍA · el carry: el acumulador es el dato en curso → base de todo el archivo
 * BLOQUE 0 · el carry: del bucle al reduce, y apuntar los intermedios → drills 1–3
 * BLOQUE A · aplicar la lista de pasos a un dato → drills 4–5
 * BLOQUE B · devolver la tubería ya montada (point-free) → drills 6–7
 * BLOQUE C · capstone: la tubería sobre cada elemento → drill 8
 *
 * ▸ 8 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-09.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — el carry: el acumulador es el dato en curso
 *
 * DEFINICIÓN
 * Pasar un dato por una lista de funciones es arrastrarlo: cada paso pisa el dato
 * con su salida. Con reduce, el acumulador es ese dato en curso, y reduce es el
 * bucle escrito en una línea.
 *
 * SINTAXIS
 * let actual = n            // el dato que va cambiando
 * for (const paso of pasos) {
 *   actual = paso(actual)   // cada paso pisa actual con su salida
 * }
 * return actual             // el dato tras pasar por todos
 *
 * return pasos.reduce((acum, paso) => paso(acum), n) // el mismo carry, con reduce
 *
 * 🗣️ LAS PIEZAS
 * acum    → actual: el dato según va saliendo
 * n       → el inicial, como let actual = n: el dato de entrada
 * vuelta  → una pasada del bucle
 *
 * 🧠 ANALOGÍA (la tuya) — el túnel de lavado: el coche (el dato) entra y pasa por
 * las estaciones en fila, y la salida de una es la entrada de la siguiente. acum es
 * el coche según va saliendo de cada estación.
 *
 * ⚠️ TRAMPA — el tipo ((n: number) => number)[] es «una lista de funciones número →
 * número»: los () agrupan la firma para que el [] diga «lista de eso».
 *
 * 💡 Apuntar los intermedios: si además quieres guardar cómo iba quedando el dato en
 * cada estación, empujas actual a una lista en cada vuelta (un efecto, como el void
 * del 05). Eso es el aplicarYregistrar del drill 3.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE 0 — el carry: del bucle al reduce (y apuntar los intermedios) */

/* 1) aplicarPasosConFor — pasa n por todos los pasos usando un bucle for.
 * 👉 El starter devuelve n sin aplicar nada. Usa let actual = n y, en el
 *    bucle, actual = paso(actual); devuelve actual al final.
 *   aplicarPasosConFor(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
 */
export function aplicarPasosConFor(n: number, pasos: ((n: number) => number)[]): number {
  let actual = n;
  for (const paso of pasos) {
    actual = paso(actual);
  }
  return actual;
}
aplicarPasosConFor(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]); // 3 + 1 = 4; 4 * 2 = 8; 8 - 1 = 7

/* 2) aplicarPasosConReduce — lo mismo, pero con reduce. (acum ≡ actual, inicial ≡ n)
 * 👉 El starter devuelve n. Escribe el reduce: pasos.reduce((acum, paso) => ..., n).
 *   aplicarPasosConReduce(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
 */
export function aplicarPasosConReduce(n: number, pasos: ((n: number) => number)[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n);
}
aplicarPasosConReduce(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]); // 3 + 1 = 4; 4 * 2 = 8; 8 - 1 = 7

/* 3) aplicarYregistrar — pasa n por los pasos y apunta cada resultado intermedio
 * en registro (efecto). Devuelve el resultado final. (Es el drill 4 del 10.)
 * 👉 El starter devuelve n y no apunta nada. Con el bucle: en cada vuelta,
 *    actual = paso(actual) y luego registro.push(actual).
 *   const reg: number[] = []; aplicarYregistrar(3, [(n)=>n+1,(n)=>n*2], reg) → 8; reg = [4, 8]
 */
export function aplicarYregistrar(
  n: number,
  pasos: ((n: number) => number)[],
  registro: number[],
): number {
  let actual = n;
  for (const paso of pasos) {
    actual = paso(actual);
    registro.push(actual);
  }
  return actual;
}
aplicarYregistrar(3, [(n) => n + 1, (n) => n * 2], []); // 3 + 1 = 4; 4 * 2 = 8

/* ▸ BLOQUE A — aplicar la lista de pasos a un dato */

/* 4) aplicarPasos — pasa n por todos los pasos, en orden.
 * aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
 * aplicarPasos(3, []) → 3
 */
export function aplicarPasos(n: number, pasos: ((n: number) => number)[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n);
}
aplicarPasos(5, [(n) => n + 1, (n) => n * 2, (n) => n - 1]); // 5 + 1 = 6; 6 * 2 = 12; 12 - 1 = 11

/* 5) aplicarPasosTexto — lo mismo con strings.
 * aplicarPasosTexto("hola", [(s) => s.toUpperCase(), (s) => s + "!"]) → "hola!"
 */
export function aplicarPasosTexto(texto: string, pasos: ((s: string) => string)[]): string {
  return pasos.reduce((acum, paso) => paso(acum), texto);
}
aplicarPasosTexto("hola", [(s) => s.toUpperCase(), (s) => s + "!", (s) => s + " Nico"]); // "HOLA! Nico"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — devolver la tubería ya montada (point-free)
 *
 * En vez de aplicar los pasos a un dato concreto, devuelves una función que, dado
 * cualquier dato, lo hace pasar por todos los pasos. Es montar el túnel vacío: el
 * coche lo pone quien la encienda, después (la cafetera del 07).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) pipe — devuelve una función que aplica todos los pasos.
 * const p = pipe([(n) => n + 1, (n) => n * 2]); p(3) → 8; p(10) → 22
 */
export function pipe(pasos: ((n: number) => number)[]): (n: number) => number {
  return (n) => pasos.reduce((acum, paso) => paso(acum), n);
}
const tuberia = pipe([(n) => n + 1, (n) => n * 2]);
tuberia(3); // 3 + 1 = 4; 4 * 2 = 8

/* 7) pipeTexto — la versión string.
 * const p = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase()]); p("  hi ") → "hi"
 */
export function pipeTexto(pasos: ((s: string) => string)[]): (s: string) => string {
  return (s) => pasos.reduce((acum, paso) => paso(acum), s);
}
const tuberiaTexto = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase(), (s) => s + "!"]);
tuberiaTexto("Hola, buenos días"); // "HOLA, BUENOS DÍAS!"

/* ▸ BLOQUE C — capstone: aplicar la tubería a cada elemento de una lista */

/* 8) procesarCada — aplica la lista de pasos a cada número de nums.
 * procesarCada([1, 2, 3], [(n) => n + 1, (n) => n * 10]) → [20, 30, 40]
 */
export function procesarCada(nums: number[], pasos: ((n: number) => number)[]): number[] {
  return nums.map((n) => pasos.reduce((acum, paso) => paso(acum), n));
}
procesarCada([10, 20, 30], [(n) => n + 1, (n) => n * 10]); // [11, 21, 31]
