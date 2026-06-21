/* =============================================================================
 * EJERCICIO 10 — funciones (10/10): CAPSTONE — un mini-procesador de pasos
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. No hay concepto nuevo: se TEJEN los de 02–09 en una
 * herramientita real, un "procesador" que aplica una serie de pasos y, de paso,
 * lleva la cuenta de cuántas veces se ha usado.
 *
 *
 * ▸ LO QUE SE JUNTA
 * ----------------------------------------------------------------------------
 *   - alias de tipo función (`type Paso`)        → ejercicio 04
 *   - rest `...pasos`                            → ejercicio 03
 *   - pipe con `reduce`                          → ejercicio 09
 *   - efecto sobre una lista `registro`          → ejercicio 05 (void)
 *   - closure con estado (contador de usos)      → ejercicio 07
 *
 *     type Paso = (n: number) => number
 *
 * 🧠 ANALOGÍA: una máquina de fábrica configurable. Le cargas la lista de pasos,
 *    y luego le metes piezas: cada una sale procesada y un contador interno lleva
 *    la cuenta de cuántas piezas pasaron.
 *
 * 💼 CASO REAL: un formateador reutilizable con telemetría ("¿cuántas veces se
 *    llamó?"), o un middleware que encadena transformaciones.
 *
 * OJO — el capstone devuelve un OBJETO con dos funciones dentro (`ejecutar` y
 *    `vecesUsado`) que COMPARTEN la misma variable de estado (el closure). Las dos
 *    ven el mismo `usos`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-10.test.ts
 * ===========================================================================*/


type Paso = (n: number) => number

/* ---------------------------------------------------------------------------
 * BLOQUE A — del paso suelto a la lista variable
 * -------------------------------------------------------------------------- */

// 1) `aplicarUno` — aplica un solo paso a `n`.
//    👉 UN arreglo: el cuerpo (el starter ignora `paso` y devuelve `n`).
//      aplicarUno(5, (n) => n * 2) → 10
export function aplicarUno(n: number, paso: Paso): number {
  return 0
}

// 2) `aplicarVarios` — aplica TODOS los pasos que reciba (cantidad variable).
//    👉 Dos arreglos: el parámetro (ahora pide UN array, así no puedes pasar pasos
//       sueltos) → ponlo `...pasos`. Y el cuerpo (devuelve `n` sin procesar).
//      aplicarVarios(3, (n) => n + 1, (n) => n * 2) → 8
export function aplicarVarios(n: number, pasos: Paso[]): number {
  return 0
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — montar la tubería y observar lo que pasa por ella
 * -------------------------------------------------------------------------- */

// 3) `crearPipeline` — devuelve UN paso que es la unión de todos los pasos dados.
//    👉 Dos arreglos: el parámetro (`...pasos`) y el cuerpo (el starter devuelve
//       una función identidad).
//      const p = crearPipeline((n) => n + 1, (n) => n * 2); p(3) → 8
export function crearPipeline(pasos: Paso[]): Paso {
  return (n) => n
}

// 4) `aplicarYregistrar` — aplica los pasos uno a uno y va apuntando cada resultado
//    intermedio en `registro` (efecto). Devuelve el resultado final.
//    👉 Dos arreglos: el cuerpo (recorre los pasos guardando cada intermedio) y
//       nada más (registro es el efecto, como en el ejercicio 05).
//      const reg: number[] = []; aplicarYregistrar(3, [(n)=>n+1,(n)=>n*2], reg) → 8; reg = [4, 8]
export function aplicarYregistrar(n: number, pasos: Paso[], registro: number[]): number {
  return 0
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: procesador con contador de usos (objeto de closures)
 * -------------------------------------------------------------------------- */

// 5) `crearProcesador` — recibe una lista de pasos y devuelve un objeto con:
//      - `ejecutar(n)` → aplica todos los pasos a `n` (y cuenta el uso)
//      - `vecesUsado()` → cuántas veces se llamó a `ejecutar`
//    👉 Arreglos: el cuerpo (el starter no procesa ni cuenta). Necesitas un `let
//       usos` en la factory que las DOS funciones del objeto compartan.
//      const proc = crearProcesador([(n) => n + 1, (n) => n * 2])
//      proc.ejecutar(3) → 8; proc.ejecutar(10) → 22; proc.vecesUsado() → 2
export function crearProcesador(pasos: Paso[]): {
  ejecutar: (n: number) => number
  vecesUsado: () => number
} {
  return {
    ejecutar: (n) => n,
    vecesUsado: () => 0,
  }
}
