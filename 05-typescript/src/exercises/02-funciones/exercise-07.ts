/* =============================================================================
 * EJERCICIO 07 — funciones (7/?): CLOSURES con estado (la función que recuerda)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * En el 01 una "factory" devolvía una función configurada que recordaba un valor
 * FIJO (`crearMultiplicador(5)`). Aquí subimos: la función devuelta recuerda un
 * estado que CAMBIA entre llamadas (un contador que sube, un total que se acumula).
 * Eso es un CLOSURE con estado mutable.
 *
 *
 * ▸ EXPLICACIÓN — una variable que vive ENTRE llamadas
 * ----------------------------------------------------------------------------
 *     function crearContador(): () => number {
 *       let n = 0                 // ← vive mientras viva la función devuelta
 *       return () => {
 *         n = n + 1               // ← cada llamada la modifica
 *         return n
 *       }
 *     }
 *     const c = crearContador()
 *     c() // 1   c() // 2   c() // 3   ← RECUERDA dónde se quedó
 *
 * La función interna "captura" la variable `n` de la externa. Esa `n` no se
 * reinicia en cada llamada: persiste. Cada `crearContador()` crea su PROPIA `n`
 * independiente.
 *
 * 🧠 ANALOGÍA: una máquina dispensadora de tickets ("coja su turno"). Cada vez que
 *    aprietas, te da el siguiente número y se queda recordando por dónde iba. Dos
 *    máquinas distintas llevan cuentas distintas.
 *
 * 🔧 POR DENTRO: el secreto es el `let` declarado FUERA de la función devuelta
 *    pero DENTRO de la factory. Si lo declararas dentro de la función devuelta, se
 *    reiniciaría en cada llamada (no recordaría nada).
 *
 * 💼 CASO REAL: generadores de id (`siguienteId()`), un acumulador de carrito, o
 *    el propio `useState` de React (que recuerda el valor entre renders).
 *
 * OJO — el tipo de retorno de la factory es OTRA función: `() => number`,
 *    `(n: number) => number`, etc. Léelo como "esto te devuelve una función".
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Los starters devuelven una función SIN estado (siempre lo mismo). Dales memoria
 * con un `let` en la factory. Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-07.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — contar y acumular
 * -------------------------------------------------------------------------- */

// 1) `crearContador` — devuelve una función que da 1, 2, 3... en llamadas sucesivas.
//    👉 El starter devuelve siempre 1 (sin memoria). Declara un `let` en la
//       factory y súbelo en cada llamada.
//      const c = crearContador(); c() → 1; c() → 2; c() → 3
export function crearContador(): () => number {
  let n = 0
  return () => {
    n = n + 1
    return n
  }
}
crearContador() // 0
crearContador() // 0
crearContador() // 0
const c = crearContador()
c()
c()
c()
// 3

// 2) `crearAcumulador` — devuelve una función que SUMA lo que reciba a un total y
//    devuelve el total actualizado.
//      const acum = crearAcumulador(); acum(5) → 5; acum(3) → 8; acum(10) → 18
export function crearAcumulador(): (n: number) => number {
  let total = 0
  return (n: number) => {
    total = total + n
    return total
  }
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — estado booleano
 * -------------------------------------------------------------------------- */

// 3) `crearAlternador` — devuelve una función que va alternando true/false en cada
//    llamada (empieza en true).
//      const tic = crearAlternador(); tic() → true; tic() → false; tic() → true
export function crearAlternador(): () => boolean {
  let comienzo = false
  return () => {
    comienzo = !comienzo
    return comienzo
  }
}

// 4) `crearLimitado` — devuelve una función que da true las primeras `max` veces y
//    false a partir de ahí.
//      const ok = crearLimitado(2); ok() → true; ok() → true; ok() → false
export function crearLimitado(max: number): () => boolean {
  let base = 0
  return () => {
    base = base + 1

    return base <= max
  }
}
/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: contador configurable
 * -------------------------------------------------------------------------- */

// 5) `crearContadorDesde` — devuelve una función que empieza en `inicio` y sube de
//    `paso` en `paso` (devuelve el valor ANTES de sumar, como un "coja turno").
//      const c = crearContadorDesde(10, 5); c() → 10; c() → 15; c() → 20
export function crearContadorDesde(inicio: number, paso: number): () => number {
  let base = inicio
  return () => {
    const actual = base
    base = base + paso
    return actual
  }
}
