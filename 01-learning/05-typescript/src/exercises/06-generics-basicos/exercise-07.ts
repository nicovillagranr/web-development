/* =============================================================================
 * EJERCICIO 07 — genéricos: plegar y reducir (reduce con tipos <T, U>) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Escribir un reduce genérico donde los elementos (T) y el acumulador (U) difieren.
 * · Elegir el inicial correcto, que fija el tipo del acumulador.
 *
 * 🟢 CONTEXTO — reduce es el motor de «combinar una lista en un solo resultado».
 * Antes de los drills hay una escalera de refuerzo, R0, porque el drill 1 junta
 * tres cosas nuevas a la vez.
 *
 * 🗺️ MAPA
 * TEORÍA · reduce con tipos <T, U> → base de todo el archivo
 * ESCALERA R0 · el drill 1 desde el suelo → G1–G3, F1–F3 y R1–R4, antes de los drills
 * BLOQUE A · plegar genérico y sumar por criterio → drills 1–2
 * BLOQUE B · acumular en objeto, y comprobar → drills 3–4
 * BLOQUE C · capstone: dos agregados a la vez → drill 5
 *
 * ▸ 5 drills + 10 peldaños (3 son ejemplos resueltos), en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-07.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — reduce con tipos <T, U>
 *
 * DEFINICIÓN
 * Como genérico <T, U>, en reduce entran elementos T, y el acumulador es de tipo U,
 * que puede ser otro tipo: number, objeto, lo que devuelva el combinador.
 *
 * SINTAXIS
 * function plegar<T, U>(xs: T[], inicial: U, combinar: (acc: U, x: T) => U): U {
 *   return xs.reduce(combinar, inicial)
 * }
 *
 * Ejemplos:
 * plegar([1, 2, 3], 0, (acc, n) => acc + n) → 6
 *
 * 🧠 ANALOGÍA — una alcancía: inicial es lo que hay al empezar, cada elemento se
 * «echa» con la regla combinar, y al final sacas el total.
 *
 * ⚠️ TRAMPA — el inicial marca el tipo U del acumulador (number, string, objeto…).
 * Sin inicial, reduce explota con una lista vacía.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA R0 — entender el drill 1 (plegar) desde el suelo (refuerzo)
 *
 * El drill 1 cuesta porque hace tres cosas nuevas a la vez, apiladas:
 * (1) usa dos tipos comodín <T, U>           → el genérico
 * (2) recibe un parámetro que es una función → el combinar
 * (3) pliega una lista con reduce            → el motor
 *
 * Aquí se aísla cada una en su mini-bloque (G, F, R) y se sube de a un escalón.
 * Los EJEMPLO ya vienen resueltos: son para leer y entender. Los MINI los escribes
 * tú (el cuerpo está en blanco, o mal a propósito). Cuando termines R0, vuelve a
 * mirar el drill 1 y lo vas a leer como una frase, no como un jeroglífico.
 * Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ G — ¿qué es <T>? El tipo comodín
 *
 * 🧠 ANALOGÍA — <T> es una caja etiquetada vacía: la función no decide qué tipo va
 * dentro, lo decide quien la llama. Con identidad(5), TypeScript rellena
 * T = number; con identidad("hola"), T = string. La misma función sirve para todos
 * los tipos sin perder el tipo concreto por el camino.
 * ───────────────────────────────────────────────────────────────────────────── */

/* G1) Ejemplo (resuelto, solo leer) — <T> tras el nombre declara el comodín, y
 * lo usas en los parámetros y en el retorno. Aquí entra un T y sale el mismo T.
 */
export function identidad<T>(x: T): T {
  return x;
}
identidad(5); // T = number → 5
identidad("hola"); // T = string → "hola"

/* G2) Mini — envuelve el valor en un array de un elemento. Fíjate en el retorno
 * T[]: "array de lo que sea que sea T". (Cuerpo en blanco: escríbelo.)
 * envolver(5) → [5] ; envolver("a") → ["a"]
 */
export function envolver<T>(x: T): T[] {
  return [x];
}
envolver(5); // → [5]
envolver("a"); // → ["a"]

/* G3) Mini — dos comodines a la vez <T, U>: son dos cajas independientes, una
 * para cada parámetro. Devuelve la pareja como tupla [T, U]. (Esto es exacto
 * lo que verás en plegar<T, U>: dos tipos que pueden ser distintos.)
 * par(1, "a") → [1, "a"] ; par(true, 9) → [true, 9]
 */
export function par<T, U>(a: T, b: U): [T, U] {
  return [a, b]; // ← este ya viene resuelto: es el patrón de "dos comodines". Solo LÉELO.
}
par(1, "a"); // → [1, "a"]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ F — un parámetro que es una función (el callback)
 *
 * Normalmente pasas ingredientes (un número, un texto); aquí además pasas la
 * receta: una función. Dentro, para usarla, la llamas con paréntesis: si el
 * parámetro se llama f, escribes f(x). El tipo (n: number) => number se lee «una
 * función que recibe un number y devuelve un number».
 * ───────────────────────────────────────────────────────────────────────────── */

/* F1) Ejemplo (resuelto, solo leer) — f es una función; la usamos llamándola f(x).
 */
export function aplicar(x: number, f: (n: number) => number): number {
  return f(x);
}
aplicar(5, (n) => n * 2); // → 10  (aquí la receta es "multiplica por 2")

/* F2) Mini — aplica la función dos veces seguidas: primero a x, y al resultado
 * otra vez. (Pista: llama a f metiendo dentro otra llamada a f.)
 * aplicarDosVeces(3, n => n + 1) → 5   (3→4→5)
 */
export function aplicarDosVeces(x: number, f: (n: number) => number): number {
  return f(f(x));
}
aplicarDosVeces(3, (n) => n + 1); // → 5

/* F3) Mini — ahora genérico + callback juntos: recorre xs aplicando f a cada
 * elemento. Ojo al juego de tipos: entran elementos T, y f los convierte en
 * U, así que sale U[]. (Es tu Array.prototype.map, pero tipado a mano.)
 * mapear([1,2,3], n => n * 10) → [10,20,30]     (T=number, U=number)
 * mapear(["a","bb"], s => s.length) → [1,2]      (T=string, U=number → ¡distintos!)
 */
export function mapear<T, U>(xs: T[], f: (x: T) => U): U[] {
  return xs.map(f);
}
mapear([1, 2, 3], (n) => n * 10); // → [10, 20, 30]
mapear(["a", "bb"], (s) => s.length); // → [1, 2]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ R — reduce: plegar la lista en un solo valor
 *
 * La alcancía de arriba: inicial es lo que hay al empezar; por cada elemento
 * aplicas la regla combinar(acc, x), que devuelve el acumulador nuevo; al final
 * sacas el total.
 *
 * SINTAXIS
 * xs.reduce(combinar, inicial) // combinar es (acc, x) => nuevoAcc
 *
 * ⚠️ TRAMPA — el inicial es obligatorio (sin él, reduce explota con una lista
 * vacía), y además fija el tipo del acumulador.
 * ───────────────────────────────────────────────────────────────────────────── */

/* R1) Ejemplo (resuelto, solo leer) — suma clásica. acc empieza en 0 (el inicial)
 * y en cada paso se le suma n. El acumulador y los elementos son ambos number.
 */
export function sumar(xs: number[]): number {
  return xs.reduce((acumulador, valor) => acumulador + valor, 0);
}
sumar([1, 2, 3]); // → 6

/* R2) Mini — producto de todos. Casi igual a sumar, pero cambian dos cosas: la
 * operación (× en vez de +) y el inicial (¿cuál es el "elemento neutro" del
 * producto? no puede ser 0). Piénsalo antes de escribir.
 * multiplicar([2,3,4]) → 24
 */
export function multiplicar(xs: number[]): number {
  return xs.reduce((acumulador, valor) => acumulador * valor, 1);
}
multiplicar([2, 3, 4]); // → 24

/* R3) Mini — aquí está la idea clave de plegar: el acumulador puede ser de otro
 * tipo que los elementos. Los elementos son number, pero el acumulador es un
 * boolean ("¿siguen siendo todos positivos?"). Inicial = true; en cada paso,
 * acc && (n > 0). Esto es U = boolean, T = number: distintos, como en plegar.
 * todosPositivos([1,2,3]) → true ; todosPositivos([1,-2,3]) → false
 */
export function todosPositivos(xs: number[]): boolean {
  return xs.reduce((acumulador, valor) => acumulador && valor > 0, true);
}
todosPositivos([1, 2, 3]); // → true
todosPositivos([1, -2, 3]); // → false

/* R4) Mini — el pago: reconstruye plegar tú mismo. Es la fusión de todo lo de
 * arriba: <T, U> (G3), un combinar que es una función-parámetro (F), y el
 * reduce con inicial (R). El cuerpo de abajo compila pero está mal a
 * propósito: return inicial ignora la lista entera. Reemplázalo por el reduce
 * de verdad (una sola línea, la misma que verás en el drill 1).
 * plegarBis([1,2,3], 0, (acc, n) => acc + n) → 6
 */
export function plegarBis<T, U>(xs: T[], inicial: U, combinar: (acc: U, x: T) => U): U {
  return xs.reduce((acumulador, valor) => combinar(acumulador, valor), inicial);
}
plegarBis([1, 2, 3], 0, (acc, n) => acc + n); // → 6

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ✅ CIERRE DE R0
 *
 * Cuando plegarBis (R4) te salga, vuelve a leer el drill 1, plegar: es idéntico. Y
 * los drills 2–5 de abajo son «usa plegar o reduce con el inicial correcto»:
 * total           → inicial 0, y en cada paso suma valor(x)
 * contarPor       → inicial {} (un objeto vacío), y suma 1 en la casilla de la clave
 * algunoCumple    → inicial false, y en cada paso acc || pred(x)
 * resumenNumerico → inicial { suma: 0, cantidad: 0 }, actualiza los dos campos
 *
 * No los resuelvo: eso es tuyo. R0 era solo para que la sintaxis deje de estorbarte.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — plegar genérico y sumar por criterio */

/* 1) plegar — reduce genérico: combina la lista en un U.
 * plegar([1, 2, 3], 0, (acc, n) => acc + n) → 6
 */
export function plegar<T, U>(xs: T[], inicial: U, combinar: (acc: U, x: T) => U): U {
  return xs.reduce(combinar, inicial);
}
plegar([1, 2, 3], 0, (acc, n) => acc + n);

/* 2) total — suma de valor(x) de cada elemento.
 * total([{ p: 10 }, { p: 5 }], (x) => x.p) → 15
 */
export function total<T>(xs: T[], valor: (x: T) => number): number {
  return xs.reduce((acumulador, v) => acumulador + valor(v), 0);
}
total([{ p: 10 }, { p: 5 }], (x) => x.p); // → 15
total([{ p: 905 }, { p: 200 }], (x) => x.p); // → 1105

/* ▸ BLOQUE B — acumular en objeto, y comprobar */

/* 3) contarPor — cuántos elementos caen en cada clave.
 * contarPor(["a", "b", "a"], (x) => x) → { a: 2, b: 1 }
 */
export function contarPor<T>(xs: T[], clave: (x: T) => string): Record<string, number> {
  return xs.reduce<Record<string, number>>(
    (acumulador, v) => ({ ...acumulador, [clave(v)]: (acumulador[clave(v)] || 0) + 1 }),
    {},
  );
}

/* 4) algunoCumple — ¿alguno cumple pred?
 * algunoCumple([1, 2, 3], (n) => n > 2) → true
 */
export function algunoCumple<T>(xs: T[], pred: (x: T) => boolean): boolean {
  return xs.reduce((acumulador, valor) => acumulador || pred(valor), false);
}
algunoCumple([1, 2, 3, 5, 6, 7], (n) => n > 5); // → true

/* ▸ BLOQUE C — capstone: dos agregados a la vez */

/* 5) resumenNumerico — la suma de valor(x) y cuántos hay.
 * resumenNumerico([{ p: 10 }, { p: 20 }], (x) => x.p) → { suma: 30, cantidad: 2 }
 */
export function resumenNumerico<T>(
  xs: T[],
  valor: (x: T) => number,
): { suma: number; cantidad: number } {
  return xs.reduce(
    (acumulador, v) => ({ suma: acumulador.suma + valor(v), cantidad: acumulador.cantidad + 1 }),
    { suma: 0, cantidad: 0 },
  );
}
