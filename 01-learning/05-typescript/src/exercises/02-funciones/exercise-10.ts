/* =============================================================================
 * EJERCICIO 10 — funciones (10/10): CAPSTONE — un mini-procesador de pasos  ·  [REFORZADO]
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. No hay concepto nuevo: se TEJEN los de 02–09 en una
 * herramientita real, un "procesador" que aplica una serie de pasos y, de paso,
 * lleva la cuenta de cuántas veces se ha usado.
 *
 * Refuerzo: antes del capstone (drill 7) se añadió un CALENTAMIENTO (drills 5–6)
 * que aísla su única pieza nueva — un OBJETO con dos funciones que comparten un
 * mismo estado (el closure del 07, pero compartido).
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
  return paso(n)
}

// 2) `aplicarVarios` — aplica TODOS los pasos que reciba (cantidad variable).
//    👉 Dos arreglos: el parámetro (ahora pide UN array, así no puedes pasar pasos
//       sueltos) → ponlo `...pasos`. Y el cuerpo (devuelve `n` sin procesar).
//      aplicarVarios(3, (n) => n + 1, (n) => n * 2) → 8
export function aplicarVarios(n: number, ...pasos: Paso[]): number {
  return pasos.reduce((acum, paso) => paso(acum), n)
}



/* ---------------------------------------------------------------------------
 * BLOQUE B — montar la tubería y observar lo que pasa por ella
 * -------------------------------------------------------------------------- */

// 3) `crearPipeline` — devuelve UN paso que es la unión de todos los pasos dados.
//    👉 Dos arreglos: el parámetro (`...pasos`) y el cuerpo (el starter devuelve
//       una función identidad).
//      const p = crearPipeline((n) => n + 1, (n) => n * 2); p(3) → 8
export function crearPipeline(...pasos: Paso[]): (n: number) => number {
  return (n) => pasos.reduce((acum, paso) => paso(acum), n)
}
const primerPipeline = crearPipeline((n) => n + 1, (n) => n * 2)
primerPipeline(3) // 8

// 4) `aplicarYregistrar` — aplica los pasos uno a uno y va apuntando cada resultado
//    intermedio en `registro` (efecto). Devuelve el resultado final.
//    👉 Dos arreglos: el cuerpo (recorre los pasos guardando cada intermedio) y
//       nada más (registro es el efecto, como en el ejercicio 05).
//      const reg: number[] = []; aplicarYregistrar(3, [(n)=>n+1,(n)=>n*2], reg) → 8; reg = [4, 8]
export function aplicarYregistrar(n: number, pasos: Paso[], registro: number[]): number {
  return pasos.reduce((acum, paso) => { registro.push(paso(acum)); return paso(acum) }, n)
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CALENTAMIENTO: un objeto de funciones que COMPARTEN un estado
 * ---------------------------------------------------------------------------
 * El capstone (drill 7) devuelve un objeto con DOS funciones que ven la MISMA
 * variable. Es el closure del 07, pero con varias funciones compartiendo un solo
 * `let`.
 *
 *     function crearCaja() {
 *       let contenido = ''                            // UNA variable
 *       return {
 *         guardar: (s: string) => { contenido = s },  // la ESCRIBE
 *         ver: () => contenido,                        // la LEE
 *       }
 *     }
 *     const c = crearCaja()
 *     c.guardar('hola')
 *     c.ver()  // 'hola'   ← las dos funciones ven la MISMA 'contenido'
 *
 * 🧠 ANALOGÍA: dos empleados con copia de la llave de la MISMA caja fuerte. Uno
 *    mete, otro saca; es la misma caja. Si cada uno tuviera su propia caja, no se
 *    verían el contenido.
 *
 * 🔑 El `let` va en la factory (FUERA de las dos funciones, DENTRO de crearCaja).
 *    Cada `crearCaja()` fabrica su propia caja independiente (como las máquinas del 07).
 * -------------------------------------------------------------------------- */

// 5) `crearCaja` — devuelve `{ guardar, ver }` que comparten un texto interno.
//    👉 El starter no comparte estado (guardar no hace nada, ver devuelve ""). Pon
//       un `let contenido` en la factory que las dos funciones toquen.
//      const c = crearCaja(); c.guardar("hola"); c.ver() → "hola"
export function crearCaja(): { guardar: (s: string) => void; ver: () => string } {
  let contenido = ''
  return {
    guardar: (s: string) => { contenido = s },
    ver: () => contenido
  }
}
const miPrimeraCaja = crearCaja()
miPrimeraCaja.guardar('hola')
miPrimeraCaja.ver()

// 6) `crearContadorObj` — devuelve `{ incrementar, valor }` que comparten un número.
//    👉 El starter no comparte estado. Pon un `let n` que las dos funciones compartan:
//       `incrementar` lo sube, `valor` lo lee.
//      const c = crearContadorObj(); c.incrementar(); c.incrementar(); c.valor() → 2
export function crearContadorObj(): { incrementar: () => void; valor: () => number } {
  let cant = 0
  return {
    incrementar: () => { cant = cant + 1 },
    valor: () => cant,
  }
}
const miContador = crearContadorObj()
miContador.incrementar()
miContador.incrementar()
miContador.valor() // 2

/* ---------------------------------------------------------------------------
 * BLOQUE D — CAPSTONE: procesador con contador de usos (objeto de closures)
 * -------------------------------------------------------------------------- */

// 7) `crearProcesador` — recibe una lista de pasos y devuelve un objeto con:
//      - `ejecutar(n)` → aplica todos los pasos a `n` (y cuenta el uso)
//      - `vecesUsado()` → cuántas veces se llamó a `ejecutar`
//    👉 Arreglos: el cuerpo (el starter no procesa ni cuenta). Necesitas un `let
//       usos` en la factory que las DOS funciones del objeto compartan (como el
//       drill 5/6), y `ejecutar` aplica la tubería de pasos (como el 09).
//      const proc = crearProcesador([(n) => n + 1, (n) => n * 2])
//      proc.ejecutar(3) → 8; proc.ejecutar(10) → 22; proc.vecesUsado() → 2
export function crearProcesador(pasos: Paso[]): { ejecutar: (n: number) => number; vecesUsado: () => number } {
  let usos = 0
  return {
    ejecutar: (n: number) => { usos = usos + 1; return pasos.reduce((acum, paso) => paso(acum), n) },
    vecesUsado: () => usos,
  }
}
const i9 = crearProcesador([(n) => n + 1, (n) => n * 2])
i9.ejecutar(3) // 8
i9.ejecutar(10) // 22
i9.vecesUsado() // 2
