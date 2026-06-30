/* =============================================================================
 * EJERCICIO 07 — funciones (7/?): CLOSURES con estado   ·   [REFORZADO]
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE  (y por qué se amplió)
 * ----------------------------------------------------------------------------
 * Segundo escalón del arco 06→10: una función que DEVUELVE otra función. Antes de
 * que esa función recuerde un estado que CAMBIA (un contador), reforzamos el paso
 * previo: una función que devuelve otra y RECUERDA un valor FIJO. Si "una función
 * devuelve una función" se siente raro, el BLOQUE 0 lo asienta antes del `let`.
 *
 *
 * ▸ EXPLICACIÓN 1 — la CAFETERA: una función que devuelve una función
 * ----------------------------------------------------------------------------
 * Una factory no te devuelve un número: te devuelve una FUNCIÓN ya configurada.
 *
 *     function multiplicador(factor: number): (n: number) => number {
 *       return (n) => n * factor      // ← devuelve una función que RECUERDA `factor`
 *     }
 *     const triple = multiplicador(3) // ① CONSTRUIR la máquina (no calcula nada aún)
 *     triple(5)                       // ② ENCENDERLA → 15
 *
 * 🧠 ANALOGÍA (la tuya): la CAFETERA. `multiplicador(3)` te entrega la máquina
 *    configurada en "x3" — apagada. El grano `5` lo pones tú después, al encenderla
 *    con `triple(5)`. Construir la máquina ≠ usarla.
 *
 * 🔑 La función devuelta "captura" el `factor`: lo recuerda aunque la factory ya
 *    terminó. Cada llamada a `multiplicador(...)` fabrica una máquina nueva con su
 *    propio ajuste.
 *
 * OJO — el tipo de retorno de la factory es OTRA función: `(n: number) => number`.
 *    Léelo como "esto te devuelve una función".
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-07.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE 0 — la cafetera: devolver una función que RECUERDA un valor fijo
 * -------------------------------------------------------------------------- */

// 1) `multiplicador` — devuelve una función que multiplica por `factor`.
//    👉 El starter devuelve `(n) => n` (ignora el factor). Úsalo: `(n) => n * factor`.
//      const triple = multiplicador(3); triple(5) → 15
export function multiplicador(factor: number): (n: number) => number {
  return (n) => n * factor
}
const triple = multiplicador(3)
triple(5) // 15
triple(0) // 0

// 2) `sumador` — devuelve una función que suma `base` a lo que reciba.
//    👉 El starter devuelve `(n) => n`. Captura `base` en la función devuelta.
//      const mas10 = sumador(10); mas10(5) → 15; mas10(0) → 10
export function sumador(base: number): (n: number) => number {
  return (n) => n + base
}
const mas10 = sumador(10)
mas10(5) // 15
mas10(0) // 10

// 3) `saludador` — devuelve una función que saluda con el `saludo` capturado.
//    👉 El starter devuelve `(nombre) => nombre`. Arma `${saludo}, ${nombre}`.
//      const hola = saludador("Hola"); hola("Nico") → "Hola, Nico"
export function saludador(saludo: string): (nombre: string) => string {
  return (nombre) => `${saludo}, ${nombre}`
}
const saludarANico = saludador("Hola")
saludarANico("Nico") // "Hola, Nico"

/* ---------------------------------------------------------------------------
 * ▸ EXPLICACIÓN 2 — y ahora el valor recordado CAMBIA (estado mutable)
 * ----------------------------------------------------------------------------
 *     function crearContador(): () => number {
 *       let n = 0                 // ← vive mientras viva la función devuelta
 *       return () => {
 *         n = n + 1               // ← cada llamada la MODIFICA
 *         return n
 *       }
 *     }
 *     const c = crearContador()
 *     c() // 1   c() // 2   c() // 3   ← RECUERDA dónde se quedó
 *
 * 🧠 ANALOGÍA: la máquina dispensadora de tickets ("coja su turno"). Cada apretón
 *    te da el siguiente número y se queda recordando por dónde iba. Dos máquinas
 *    distintas llevan cuentas distintas.
 *
 * 🔧 POR DENTRO: el secreto es el `let` declarado FUERA de la función devuelta pero
 *    DENTRO de la factory. Si lo declararas dentro de la función devuelta, se
 *    reiniciaría en cada llamada (no recordaría nada).
 *
 * 💼 CASO REAL: generadores de id (`siguienteId()`), un acumulador de carrito, o el
 *    propio `useState` de React (que recuerda el valor entre renders).
 * -------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
 * BLOQUE A — contar y acumular
 * -------------------------------------------------------------------------- */

// 4) `crearContador` — devuelve una función que da 1, 2, 3... en llamadas sucesivas.
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
c() // 1
c() // 2
c() // 3

// 5) `crearAcumulador` — devuelve una función que SUMA lo que reciba a un total y
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

// 6) `crearAlternador` — devuelve una función que va alternando true/false en cada
//    llamada (empieza en true).
//      const tic = crearAlternador(); tic() → true; tic() → false; tic() → true
export function crearAlternador(): () => boolean {
  let comienzo = false
  return () => {
    comienzo = !comienzo
    return comienzo
  }
}

// 7) `crearLimitado` — devuelve una función que da true las primeras `max` veces y
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

// 8) `crearContadorDesde` — devuelve una función que empieza en `inicio` y sube de
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
