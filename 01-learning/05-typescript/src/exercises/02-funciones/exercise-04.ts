/* =============================================================================
 * EJERCICIO 04 — funciones (4/?): ALIAS de tipo función (`type Op = (...) => ...`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * En el ejercicio 01 escribías el tipo de una función con flecha donde hacía
 * falta: `(a: number, b: number) => number`. Cuando esa firma se repite en varias
 * funciones, le pones NOMBRE con un `type` y dejas de copiarla.
 *
 *
 * ▸ EXPLICACIÓN — nombrar una firma de función
 * ----------------------------------------------------------------------------
 *     type Operacion = (a: number, b: number) => number
 *
 *     function aplicar(a: number, b: number, op: Operacion): number { return op(a, b) }
 *     const suma: Operacion = (a, b) => a + b
 *
 * `Operacion` es un alias como los de objetos (ejercicio 05 de tipos básicos),
 * pero su contenido es una FIRMA de función: "recibe dos number, devuelve number".
 *
 * 🧠 ANALOGÍA: un "puesto de trabajo" con su descripción ("cajero: cobra y da
 *    cambio"). Muchas personas distintas (las funciones concretas) pueden ocupar
 *    ese puesto mientras cumplan la descripción. El alias es la descripción del
 *    puesto, no la persona.
 *
 * 🔧 POR DENTRO: el alias solo describe la FORMA (cuántos parámetros, de qué tipo,
 *    qué devuelve). Los NOMBRES de los parámetros en el alias son decorativos
 *    (como viste en el 01): `(a, b)` o `(x, y)` describen el mismo tipo.
 *
 * 💼 CASO REAL: `type Handler = (e: MouseEvent) => void` y lo reusas en todos los
 *    botones; `type Comparador<T>` para ordenar (versión genérica, más adelante).
 *
 * OJO — una función con MÁS parámetros NO encaja donde se pide una con menos
 *    (al revés sí). Por eso un starter con `(a) => number` rechaza `(a, b) => ...`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-04.test.ts
 * ===========================================================================*/


type Operacion = (a: number, b: number) => number

/* ---------------------------------------------------------------------------
 * BLOQUE A — el alias como tipo de PARÁMETRO y de CONSTANTE
 * -------------------------------------------------------------------------- */

// 1) `aplicar` — aplica la operación a `a` y `b`.
//    👉 Dos cosas: el tipo de `op` (usa el alias `Operacion`; el starter lo describe
//       con UN solo parámetro, así que `(a, b) => ...` no encaja) y escribe el cuerpo.
//      aplicar(2, 3, (a, b) => a + b) → 5     aplicar(10, 4, (a, b) => a - b) → 6
export function aplicar(a: number, b: number, op: Operacion): number {
  return op(a, b)
}
aplicar(2, 3, (a, b) => a + b)

// 2) `restar` — la resta, como constante tipada con el alias (tipo a la IZQUIERDA).
//    👉 Dos arreglos: el tipo (usa `: Operacion`) y el cuerpo (resta los dos).
//      restar(10, 3) → 7
export const restar: Operacion = (a, b) => a - b


/* ---------------------------------------------------------------------------
 * BLOQUE B — otros alias de función reutilizados sobre listas
 * -------------------------------------------------------------------------- */

type Predicado = (n: number) => boolean

// 3) `contarSi` — cuántos números cumplen el predicado.
//    👉 El tipo de `cumple` describe mal el retorno (number en vez de boolean).
//       Usa `Predicado`.
//      contarSi([1, 2, 3, 4], (n) => n % 2 === 0) → 2
export function contarSi(nums: number[], cumple: Predicado): number {
  return nums.filter(cumple).length
}
type Transformador = (texto: string) => string

// 4) `aplicarA` — transforma cada string de la lista con `t`.
//      aplicarA(["a", "b"], (s) => s.toUpperCase()) → ["A", "B"]
export function aplicarA(textos: string[], t: Transformador): string[] {
  return textos.map(t)
}
aplicarA(["Hola", "mundo"], (s) => s.toUpperCase()) // ["HOLA", "MUNDO"]
aplicarA(["a", "b"], (s) => s.toLowerCase()) // ["a", "b"]


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: el alias `Operacion` como "combinador" en un reduce
 * -------------------------------------------------------------------------- */

// 5) `reducir` — combina toda la lista con `op`, empezando por `inicial`.
//    👉 Dos arreglos: el tipo de `op` (usa `Operacion`) y el cuerpo (devuelve
//       `inicial` tal cual, sin combinar nada).
//      reducir([1, 2, 3], (a, b) => a + b, 0) → 6
//      reducir([2, 3, 4], (a, b) => a * b, 1) → 24
export function reducir(nums: number[], op: Operacion, inicial: number): number {
  return nums.reduce(op, inicial)
}reducir([2, 3, 4], (a, b) => a * b, 1) // 24
reducir([1, 2, 3], (a, b) => a + b, 0) // 6
