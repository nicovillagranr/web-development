/* =============================================================================
 * EJERCICIO 01 — genéricos básicos: un tipo como parámetro · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Escribir funciones con un parámetro de tipo <T> que conservan el tipo que entra.
 * · Usar T dentro de estructuras (T[], [A, B]) y en callbacks (de T a U).
 *
 * 🟢 CONTEXTO — sin genéricos solo tienes dos malas opciones: una función distinta
 * por cada tipo (identidadNumero, identidadTexto…, el mismo código copiado N
 * veces), o usar any, y entonces la caja se olvida de lo que metiste y TS deja de
 * ayudarte.
 *
 * 🗺️ MAPA
 * TEORÍA · qué es un genérico → base de todo el archivo
 * BLOQUE A · identidad: un tipo como parámetro → drill 1
 * BLOQUE B · T dentro de estructuras (arrays) → drills 2–3
 * BLOQUE C · varios parámetros de tipo → drills 4–5
 * BLOQUE D · genéricos + callbacks → drills 6–7
 *
 * ▸ 7 drills en escalera, en orden. Prohibidos any y as X. Sin bucles for: en los
 * bloques C y D, map y filter del ejercicio 10.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-01.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está demasiado específico a propósito (tipado a number o
 * string). Tu trabajo es generalizarlo con uno o más parámetros de tipo, sin
 * perder información.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — ¿qué es un genérico?
 *
 * DEFINICIÓN
 * El parámetro de tipo <T> no es un tipo concreto: es un hueco para un tipo, que
 * se rellena en el momento de llamar. Igual que n en (n) => n * 2 es un parámetro
 * de valor que se rellena al llamar, T es un parámetro de tipo que se rellena al
 * usar.
 *
 * SINTAXIS
 * function identidad<T>(valor: T): T {
 *   return valor
 * }
 *
 * 🗣️ LAS PIEZAS
 * <T>      → la etiqueta
 * valor: T → lo que entra
 * ): T     → sale lo mismo
 *
 * Ejemplos:
 * identidad(5)      → T se rellena con number: devuelve number
 * identidad("hola") → T se rellena con string: devuelve string
 * identidad(true)   → T se rellena con boolean: devuelve boolean
 *
 * TS infiere T solo, mirando el argumento: no tienes que escribir
 * identidad<number>(5), aunque puedes. El valor que pones decide la etiqueta.
 *
 * 🧠 ANALOGÍA — una caja de envío con etiqueta: a la caja no le importa qué metes,
 * pero anota en la etiqueta qué guardaste, así que al abrirla recuperas exactamente
 * eso, no un «objeto misterioso».
 *
 * ⚠️ TRAMPA — por qué no sirve any: con identidadMala(valor: any): any,
 * const x = identidadMala(5) es any, y x.cualquierCosa() no da error: perdiste
 * toda la ayuda de TS. Con identidad(5), y es number: y.toFixed() ✅,
 * y.toUpperCase() ❌.
 *
 * 💡 Detalle que ya conoces: este proyecto usa noUncheckedIndexedAccess, así que
 * arr[0] no es T, es T | undefined (el array podría estar vacío). Es lo del
 * ejercicio 07: si algo puede faltar, el tipo lo dice. Por eso varios drills
 * devuelven T | undefined.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — identidad: un tipo como parámetro */

/* 1) identidad devuelve el mismo valor que recibe, conservando su tipo.
 * Provisional: solo acepta number. Generalízalo para que acepte cualquier
 * tipo y devuelva exactamente ese tipo.
 *   identidad(5) → 5 (number) ; identidad("hi") → "hi" (string)
 */
export function identidad<T>(valor: T): T {
  return valor;
}
identidad("Nicolás"); // T se rellena con string, devuelve string
identidad(23); // T se rellena con number, devuelve number
identidad(true); // T se rellena con boolean, devuelve boolean

/* ▸ BLOQUE B — T dentro de estructuras (arrays) */

/* 2) envolver mete el valor recibido dentro de un array de un solo elemento.
 * Si entra un T, sale un T[]. Provisional: solo number → number[].
 *   envolver(5) → [5] (number[]) ; envolver("a") → ["a"] (string[])
 */
export function envolver<T>(valor: T): T[] {
  return [valor];
}
envolver(5); // T se rellena con number, devuelve number[]
envolver("a"); // T se rellena con string, devuelve string[]

/* 3) primerElemento devuelve el primer elemento de un array, o undefined si
 * está vacío. Provisional: solo number[]. Generalízalo.
 * (Recuerda: con noUncheckedIndexedAccess, arr[0] ya es T | undefined.)
 *   primerElemento([1, 2]) → 1 ; primerElemento([]) → undefined
 */
export function primerElemento<T>(arr: T[]): T | undefined {
  return arr[0];
}

/* ▸ BLOQUE C — varios parámetros de tipo */

/* 4) emparejar recibe dos valores (que pueden ser de tipos distintos) y los
 * devuelve juntos como una tupla [primero, segundo]. Necesitas dos etiquetas.
 * Provisional: ambos number. Generalízalo a dos parámetros de tipo.
 *   emparejar("edad", 30) → ["edad", 30]  con tipo [string, number]
 */
export function emparejar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
emparejar("edad", 30); // A se rellena con string, B se rellena con number, devuelve [string, number]
emparejar(true, { name: "Alice" }); // A se rellena con boolean, B se rellena con { name: string }, devuelve [boolean, { name: string }]
emparejar([1, 2], ["a", "b"]); // A se rellena con number[], B se rellena con string[], devuelve [number[], string[]]

/* 5) repetir devuelve un array con valor repetido n veces.
 * n siempre es number, pero valor debe poder ser de cualquier tipo.
 * Provisional: solo string. Generaliza solo el valor (n sigue siendo number).
 *   repetir("x", 3) → ["x", "x", "x"] ; repetir(0, 2) → [0, 0]
 */
export function repetir<T>(valor: T, n: number): T[] {
  return Array.from({ length: n }, () => valor);
}
repetir("x", 3); // T se rellena con string, devuelve string[]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — genéricos + callbacks (junta el 09, el 10 y esto)
 *
 * Aquí el tipo de entrada y el de salida pueden ser distintos, así que hacen falta
 * dos etiquetas: una para lo que entra (T) y otra para lo que sale (U).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) mapear es tu propio .map: aplica fn a cada elemento y devuelve el
 * array resultante. fn transforma un T en un U, así que el resultado es U[].
 * Provisional: number[] → number[]. Generaliza a T[] y U[].
 *   mapear([1, 2, 3], (n) => n * 2)        → [2, 4, 6]   (number[])
 *   mapear([1, 2, 3], (n) => `#${n}`)      → ["#1","#2","#3"] (string[])
 */
export function mapear<T, U>(arr: T[], fn: (x: T) => U): U[] {
  return arr.map(fn);
}
mapear(["Nico", "Ana"], (n) => `Nombre: ${n}`); // T se rellena con string, U se rellena con string, devuelve string[]
mapear([1, 2, 3], (n) => n * 2); // T se rellena con number, U se rellena con number, devuelve number[]

/* 7) primeroQueCumple devuelve el primer elemento que cumple el predicado, o
 * undefined si ninguno cumple. pred recibe un T y devuelve boolean.
 * Provisional: solo number[]. Generalízalo.
 *   primeroQueCumple([1, 2, 3, 4], (n) => n > 2) → 3
 *   primeroQueCumple([1, 2], (n) => n > 9)       → undefined
 */
export function primeroQueCumple<T>(arr: T[], pred: (x: T) => boolean): T | undefined {
  return arr.filter(pred)[0];
}
primeroQueCumple(["Nico", "Ana", "Lu"], (n) => n.length > 3); // Resultado: "Nico" (string) porque es el primer elemento con longitud > 3
