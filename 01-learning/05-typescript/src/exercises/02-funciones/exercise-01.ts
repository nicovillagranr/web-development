/* =============================================================================
 * EJERCICIO 01 — las funciones son valores (y se pasan como ingrediente) · bloque 02
 *
 * 🎯 OBJETIVOS
 * · Leer y escribir el tipo de una función con flecha: (n: number) => number.
 * · Guardar una función en una constante, con el tipo a la izquierda.
 * · Recibir una función como parámetro, y devolver una función ya configurada.
 *
 * 🟢 CONTEXTO — en JavaScript, una función es un valor más, igual que un número o
 * un string. Y como cualquier valor, puedes guardarla en una variable, pasarla como
 * ingrediente a otra función o devolverla. Y tiene un tipo.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el tipo de una función, pieza a pieza → bloques A y B
 * BLOQUE A · guardar una función en una constante → drills 1–3
 * BLOQUE B · tú escribes el tipo a la izquierda → drills 4–5
 * TEORÍA 2 · recibir y devolver funciones → bloques C y D
 * BLOQUE C · recibir una función como ingrediente → drills 6–8
 * BLOQUE D · devolver una función → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as X. Anota los tipos función
 * con la sintaxis de flecha (...) => ....
 * pnpm test:run src/exercises/02-funciones/exercise-01.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está mal a propósito: arréglalo.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el tipo de una función, pieza a pieza
 *
 * DEFINICIÓN
 * El tipo de una función se escribe con una flecha que dice «qué recibe => qué
 * devuelve». No es una función con cuerpo: es solo la descripción, la etiqueta, de
 * qué forma tiene.
 *
 * SINTAXIS
 * const doblar: (n: number) => number = (n) => n * 2
 *
 * 🗣️ LAS PIEZAS
 * const                 → la palabra clave
 * doblar                → el nombre de la constante
 * :                     → presenta el tipo
 * (n: number) => number → el tipo: solo describe la forma («recibe un number,
 *                         devuelve un number»); no ejecuta nada
 * =                     → separa describir de hacer
 * (n) => n * 2          → el valor: la función real, la que se ejecuta
 *
 * La izquierda del = describe la forma; la derecha hace el trabajo. Como el tipo
 * ya está a la izquierda, dentro de (n) => n * 2 no repites el tipo de n: TS lo
 * deduce solo. La estructura es const nombre: Tipo = valor.
 *
 * ⚠️ TRAMPA — la duda clásica: ¿los nombres de los parámetros tienen que
 * coincidir? No: en el tipo, el nombre del parámetro es decorativo.
 * (n: number) => number, (x: number) => number y (loQueSea: number) => number son
 * el mismo tipo; solo importa cuántos parámetros, de qué tipo y qué devuelve. El
 * nombre real lo eliges en el valor: por eso transformar(5, (n) => n * 2) y
 * transformar(5, (x) => x * 2) dan lo mismo, 10.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — guardar una función en una constante (tipo a la izquierda)
 *
 * Aquí solo escribes el cuerpo; el tipo ya te lo doy para que lo leas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) obtenerSaludo no recibe nada y devuelve siempre el string "hola".
 * Lee el tipo: () => string = "no recibe nada, devuelve un string".
 *   obtenerSaludo() → "hola"
 */
export const obtenerSaludo: () => string = () => `hola`;
obtenerSaludo();

/* 2) doblar recibe un number y devuelve ese number multiplicado por 2.
 * Tipo: (n: number) => number.
 *   doblar(5) → 10
 */
export const doblar: (n: number) => number = (n) => n * 2;
doblar(6); // 12

/* 3) enMayusculas recibe un string y lo devuelve en mayúsculas.
 * Tipo: (texto: string) => string. (Pista: los string tienen .toUpperCase())
 *   enMayusculas("hola") → "hola"
 */
export const enMayusculas: (texto: string) => string = (texto) => texto.toUpperCase();

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — ahora tú escribes el tipo a la izquierda (no solo el cuerpo)
 *
 * Te dejo el valor en estilo «tipo a la derecha»; reescríbelo con el tipo a la
 * izquierda, como en el bloque A, y corrige el cuerpo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) sumar recibe dos number y devuelve su suma.
 * Reescríbelo como export const sumar: (a: number, b: number) => number = (a, b) => ...
 *   sumar(3, 4) → 7
 */
export const sumar = (a: number, b: number): number => a + b;
sumar(10, 20);

/* 5) esMayorDeEdad recibe una edad (number) y devuelve un boolean: true si es
 * 18 o más. Reescríbelo con el tipo a la izquierda. Tipo: (edad: number) => boolean
 *   esMayorDeEdad(20) → true ; esMayorDeEdad(15) → false
 */
export const esMayorDeEdad = (edad: number): boolean => edad >= 18;
esMayorDeEdad(20); // true
esMayorDeEdad(15); // false

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — recibir y devolver funciones
 *
 * DEFINICIÓN
 * Una función puede recibir otra como parámetro (un callback) y aplicarla dentro,
 * o devolver otra función ya configurada, que «recuerda» los datos con los que
 * nació.
 *
 * SINTAXIS
 * function transformar(numero: number, operacion: (n: number) => number): number {
 *   return operacion(numero) // aplica el programa a la ropa, y devuelve
 * }
 * function crearSumador(cantidad: number): (n: number) => number {
 *   return (n) => n + cantidad // devuelve una función ya configurada
 * }
 *
 * Ejemplos:
 * transformar(5, (n) => n * 2) → 10: operacion es (n) => n * 2, y se ejecuta con 5
 * crearSumador(10)(5)          → 15: crearSumador(10) es un sumar10 ya listo
 *
 * 🧠 ANALOGÍA — la lavadora con programa intercambiable: recibe la ropa (un dato
 * normal) y el programa («lavado en frío», «centrifugado»: algo que hace cosas). No
 * decide el programa de antemano: tú se lo entregas en el momento, y ella lo aplica
 * a tu ropa. Ese programa es la función que pasas como ingrediente.
 *
 * 💡 Un retorno (n: number) => number significa «esta función devuelve otra
 * función».
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — recibir una función como ingrediente (callbacks / higher-order)
 *
 * El parámetro fn no es un dato: es una función. Mira su tipo entre paréntesis.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) aplicar(valor, fn) aplica la función fn al valor y devuelve el resultado.
 * (Es la lavadora otra vez: valor es la ropa, fn es el programa.)
 *   aplicar(10, (n) => n + 1) → 11
 *   aplicar(10, (n) => n * 3) → 30
 */
export function aplicar(valor: number, fn: (n: number) => number): number {
  return fn(valor);
}
// aplicar(10, (n) => n + 6); // 16

/* 7) describir(n, fn) recibe un number y una función que convierte number→string,
 * y devuelve ese string. Fíjate: aquí fn devuelve un string, no un number.
 *   describir(5, (n) => "número " + n) → "número 5"
 */
export function describir(n: number, fn: (n: number) => string): string {
  return fn(n);
}
describir(5, (n) => `número ${n}`);

/* 8) aplicarDosVeces(n, fn) aplica fn al número, y luego aplica fn otra vez
 * al resultado. (Pista: necesitas anidar la llamada: fn( fn( ... ) ).)
 *   aplicarDosVeces(3, (n) => n + 1) → 5     (3 → 4 → 5)
 *   aplicarDosVeces(2, (n) => n * 2) → 8     (2 → 4 → 8)
 */
export function aplicarDosVeces(n: number, fn: (n: number) => number): number {
  return fn(fn(n));
}
aplicarDosVeces(3, (n) => n + 1); // 5

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — devolver una función (la parte que faltaba antes en el 09)
 *
 * La función no devuelve un dato: devuelve otra función ya configurada.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 9) crearMultiplicador(factor) devuelve una función que multiplica lo que
 * reciba por factor. Tienes que: (a) anotar el retorno como
 * (n: number) => number, y (b) devolver (n) => n * factor.
 *   const por5 = crearMultiplicador(5);
 *   por5(10) → 50 ; por5(0) → 0
 */
export function crearMultiplicador(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}
// Tu máquina de "billetes": fabrica un multiplicador por 1000.
const billeteDeMil = crearMultiplicador(1000);
billeteDeMil(1); // 1000

/* 10) crearRepetidor(veces) devuelve una función que recibe un string y lo
 * repite veces veces. Anota el retorno (texto: string) => string.
 * (Pista: los string tienen .repeat(veces).)
 *  const triple = crearRepetidor(3);
 *  triple("ab") → "ababab"
 */
export function crearRepetidor(veces: number): (texto: string) => string {
  return (texto: string) => texto.repeat(veces);
}
const triple = crearRepetidor(3);
triple("ab"); // "ababab"
