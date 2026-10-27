/* =============================================================================
 * EJERCICIO 06 — funciones (6/?): callbacks tipados a fondo · bloque 02 · reforzado
 *
 * 🎯 OBJETIVOS
 * · Distinguir entregar una función (sin ()) de ejecutarla (con ()).
 * · Entregar callbacks a .map, .filter y .find, y escribir su firma exacta.
 *
 * 🟢 CONTEXTO — aquí empieza la grieta del arco 06→10: a partir de ahora una función
 * recibe otra función. Hasta el 05 tú disparabas tus funciones con fn(x); desde el
 * 06 se las entregas a alguien (a .map, a .find o a otra función) y ese alguien las
 * llama por ti. «¿Quién corre la función? ¿Cuándo?» es la niebla, y se arrastra
 * hasta el capstone del 10. Por eso el bloque 0 reconstruye desde la raíz «una
 * función es un valor» antes de tocar ningún .map.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · una función es un valor → bloque 0
 * BLOQUE 0 · la receta frente a cocinarla: tú aprietas el gatillo → drills 1–4
 * TEORÍA 2 · el método llama a tu función por ti → drill 5
 * TEORÍA 3 · la firma del callback manda → bloques A a C
 * BLOQUE A · el índice y el cambio de tipo → drills 6–7
 * BLOQUE B · elegir entre callbacks, y el | undefined del find → drills 8–9
 * BLOQUE C · capstone: dos callbacks encadenados → drill 10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-06.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — una función es un valor (como un número)
 *
 * DEFINICIÓN
 * Una función no es magia: es un valor que se puede guardar en una variable y pasar
 * como argumento, igual que pasas un 25.
 *
 * SINTAXIS
 * const doble = (n: number) => n * 2 // doble guarda una función
 * doble    // la función en sí: la receta, sin cocinar; no se ejecuta
 * doble(5) // → 10: los () son el gatillo, y ahora se ejecuta
 *
 * 🧠 ANALOGÍA (la tuya) — el ayudante de cocina: le entregas un dato y una receta, y
 * él corre la receta por ti. echarSal es una receta: se la pasas sin cocinar
 * (echarSal), y se cocina solo cuando alguien pone los () → echarSal(sopa).
 *
 * ⚠️ TRAMPA — entregar ≠ ejecutar. Puedes recibir dos funciones y llamar solo a una:
 * la otra se entrega y no se cocina. Lo verás en el drill 4.
 *
 * 💡 Regla de oro: una función recibida como parámetro se usa llamándola,
 * nombre(dato). Los () son el gatillo; sin (), solo la tienes en la mano.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE 0 — la receta frente a cocinarla: tú aprietas el gatillo */

/* 1) correr — recibe una función sin argumentos y la ejecuta.
 * 👉 El cuerpo: el starter devuelve "" fijo y nunca la llama. Dispárala con fn().
 *   correr(() => "hola") → "hola"
 */
export function correr(fn: () => string): string {
  return fn();
}
correr(() => "hola");

/* 2) aplicar — recibe un dato y una función, y aplica la función al dato.
 * 👉 El cuerpo: el starter devuelve x sin tocarlo. Pásalo por la función: fn(x).
 *   aplicar(5, (n) => n * 2) → 10
 */
export function aplicar(x: number, fn: (n: number) => number): number {
  return fn(x);
}
// return: 11
aplicar(10, (n) => n + 1);

/* 3) aplicarDosVeces — aplica la función, y al resultado le aplica la misma otra vez.
 * 👉 El cuerpo: el starter devuelve x. La salida de la 1ª llamada entra en la 2ª.
 *   aplicarDosVeces(3, (n) => n + 1) → 5   // 3 → 4 → 5
 */
export function aplicarDosVeces(x: number, fn: (n: number) => number): number {
  return fn(fn(x));
}
aplicarDosVeces(10, (n) => n * 2); // 40

/* 4) elegirYaplicar — te entregan dos funciones; según cond, cocinas solo una.
 * 👉 El cuerpo: el starter devuelve x e ignora ambas. Llama a la que toca.
 *    (entregar ≠ ejecutar: las dos llegan, solo una se dispara)
 *   elegirYaplicar(10, true,  (n) => n + 1, (n) => n - 1) → 11
 *   elegirYaplicar(10, false, (n) => n + 1, (n) => n - 1) → 9
 */
export function elegirYaplicar(
  x: number,
  cond: boolean,
  siSi: (n: number) => number,
  siNo: (n: number) => number,
): number {
  return cond ? siSi(x) : siNo(x);
}
elegirYaplicar(
  10,
  true,
  (n) => n + 1,
  (n) => n - 1,
); // 11

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — ahora el método llama a tu función por ti
 *
 * DEFINICIÓN
 * En el bloque 0 el gatillo lo apretabas tú (fn(x)). Con .map, .filter o .find solo
 * entregas la función, y el método la llama por ti, una vez por elemento.
 *
 * SINTAXIS
 * [1, 2, 3].map(doble) // .map corre doble 3 veces: doble(1), doble(2), doble(3)
 *
 * 🧠 ANALOGÍA — el mismo ayudante de cocina, pero con una fila de platos: le das
 * una receta y la aplica a cada uno. Tú no escribes el bucle; el método lo hace por
 * dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) aplicarACadaUno — aplica la función a cada elemento y devuelve la lista nueva.
 * 👉 El cuerpo: el starter devuelve la lista igual. Deja que .map llame a fn.
 *   aplicarACadaUno([1, 2, 3], (n) => n * 10) → [10, 20, 30]
 */
export function aplicarACadaUno(items: number[], fn: (n: number) => number): number[] {
  return items.map(fn);
}
aplicarACadaUno([1, 2, 3], (n) => n * 10); // [10, 20, 30]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — la firma del callback manda
 *
 * DEFINICIÓN
 * El tipo del parámetro-función describe exactamente qué recibe y qué devuelve el
 * callback. Si te equivocas en la firma, no encaja.
 *
 * Ejemplos:
 * fn: (item: string, i: number) => string → recibe dos cosas
 * fn: (n: number) => string               → number entra, string sale
 * cumple: (n: number) => boolean          → decide sí o no
 *
 * ⚠️ TRAMPA — una función que recibe más parámetros no encaja donde se pide una de
 * menos. Por eso (item, i) => … no cabe en un hueco (item) => ….
 *
 * 💡 Por dentro, array.map((item, i) => …) siempre le pasa al callback el elemento
 * y su índice, por posición y no por nombre; tú decides cuántos recoges. Y
 * array.find(cumple) devuelve T | undefined: puede no encontrar nada.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — el índice y el cambio de tipo */

/* 6) mapConIndice — transforma cada item usando también su posición.
 * mapConIndice(["a","b","c"], (item, i) => `${i}:${item}`) → ["0:a","1:b","2:c"]
 */
export function mapConIndice(items: string[], fn: (item: string, i: number) => string): string[] {
  return items.map(fn);
}
// return: ["1 Hacer la cama", "2 Aspirar la casa", "3 Lavar la loza"]
mapConIndice(
  ["Hacer la cama", "Aspirar la casa", "Lavar la loza"],
  (item, i) => `${i + 1} ${item}`,
);

/* 7) transformarA — convierte una lista de números en una de strings.
 * transformarA([1, 2], (n) => `#${n}`) → ["#1", "#2"]
 */
export function transformarA(nums: number[], fn: (n: number) => string): string[] {
  return nums.map(fn);
}

/* ▸ BLOQUE B — elegir entre callbacks, y el | undefined del find */

/* 8) aplicarSegun — si cond, aplica siVerdad; si no, siFalso.
 * aplicarSegun(5, true, (n) => n + 1, (n) => n - 1) → 6
 * aplicarSegun(5, false, (n) => n + 1, (n) => n - 1) → 4
 */
export function aplicarSegun(
  n: number,
  cond: boolean,
  siVerdad: (n: number) => number,
  siFalso: (n: number) => number,
): number {
  return cond ? siVerdad(n) : siFalso(n);
}
aplicarSegun(
  5,
  true,
  (n) => n + 1,
  (n) => n - 1,
);

/* 9) primerQueCumple — el primer número que cumple, o undefined si ninguno.
 * primerQueCumple([1, 2, 3, 4], (n) => n > 2) → 3
 * primerQueCumple([1, 2], (n) => n > 5) → undefined
 */
export function primerQueCumple(
  nums: number[],
  cumple: (n: number) => boolean,
): number | undefined {
  return nums.find(cumple);
}
primerQueCumple([1, 2, 3, 4], (n) => n > 2); // 3
primerQueCumple([], (n) => n > 2); // undefined

/* ▸ BLOQUE C — capstone: dos callbacks encadenados (transformar y luego decidir) */

/* 10) mapYfiltra — transforma cada número y luego se queda con los que cumplen.
 * mapYfiltra([1, 2, 3], (n) => n * 10, (n) => n > 15) → [20, 30]
 */
export function mapYfiltra(
  nums: number[],
  transformar: (n: number) => number,
  mantener: (n: number) => boolean,
): number[] {
  return nums.map(transformar).filter(mantener);
}
mapYfiltra(
  [1, 2, 3],
  (n) => n * 10,
  (n) => n > 15,
); // [20, 30]
