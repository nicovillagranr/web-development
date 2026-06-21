/* =============================================================================
 * EJERCICIO 08 — funciones (8/?): COMPOSICIÓN (combinar dos funciones en una)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Si tienes "sumar 1" y "multiplicar por 2", a menudo quieres una sola función
 * que haga las dos en orden. Componer = encadenar funciones: la SALIDA de una es
 * la ENTRADA de la siguiente.
 *
 *
 * ▸ EXPLICACIÓN — `g(f(x))`: primero f, luego g
 * ----------------------------------------------------------------------------
 *     function encadenar(
 *       f: (n: number) => number,
 *       g: (n: number) => number,
 *     ): (n: number) => number {
 *       return (n) => g(f(n))   // aplica f, y al resultado le aplica g
 *     }
 *
 *     const h = encadenar((n) => n + 1, (n) => n * 2)
 *     h(3) // (3+1)*2 = 8
 *
 * 🧠 ANALOGÍA: una cadena de montaje con dos estaciones. La pieza pasa por la
 *    estación f, sale modificada, y entra en la estación g. El resultado final es
 *    la pieza tras pasar por las dos, en ese orden.
 *
 * 🔧 POR DENTRO: el ORDEN importa. `g(f(x))` no es lo mismo que `f(g(x))`: con
 *    f="+1" y g="*2", `g(f(3))` = 8 pero `f(g(3))` = 7. La de DENTRO se ejecuta
 *    primero (es la que toca el dato antes).
 *
 * 💼 CASO REAL: `formatear = encadenar(normalizar, capitalizar)` para limpiar y
 *    luego dar formato a un texto, en un solo paso reutilizable.
 *
 * OJO — para encadenar `f` y `g`, lo que SALE de `f` tiene que poder ENTRAR en `g`
 *    (los tipos del medio deben casar). En el drill 3 verás un encadenado que
 *    cambia de tipo por el camino (string → number → string).
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-08.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — encadenar dos (y tres)
 * -------------------------------------------------------------------------- */

// 1) `encadenar` — devuelve una función que aplica `f` y luego `g`.
//    👉 UN arreglo: el cuerpo (el starter devuelve solo `f`, sin pasar por `g`).
//      const h = encadenar((n) => n + 1, (n) => n * 2); h(3) → 8
export function encadenar(
  f: (n: number) => number,
  g: (n: number) => number,
): (n: number) => number {
  return f
}

// 2) `encadenarTres` — aplica `f`, luego `g`, luego `h`.
//      const t = encadenarTres((n) => n + 1, (n) => n * 2, (n) => n - 3); t(3) → 5
export function encadenarTres(
  f: (n: number) => number,
  g: (n: number) => number,
  h: (n: number) => number,
): (n: number) => number {
  return f
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — encadenar CAMBIANDO de tipo y "aplicar dos veces"
 * -------------------------------------------------------------------------- */

// 3) `procesar` — `f` convierte string→number, `g` convierte number→string; la
//    función resultante va de string a string.
//    👉 Dos arreglos: el tipo de retorno (debe ser `(s: string) => string`) y el
//       cuerpo.
//      const p = procesar((s) => s.length, (n) => `len:${n}`); p("hola") → "len:4"
export function procesar(
  f: (s: string) => number,
  g: (n: number) => string,
): (s: string) => number {
  return f
}

// 4) `repetir2` — devuelve una función que aplica `f` DOS veces seguidas.
//      const d = repetir2((n) => n + 3); d(1) → 7    (1 → 4 → 7)
export function repetir2(f: (n: number) => number): (n: number) => number {
  return f
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: componer y aplicar de una
 * -------------------------------------------------------------------------- */

// 5) `encadenarYaplicar` — aplica `f` y luego `g` directamente a `n` (devuelve el
//    número, no una función).
//      encadenarYaplicar(3, (n) => n + 1, (n) => n * 2) → 8
export function encadenarYaplicar(
  n: number,
  f: (n: number) => number,
  g: (n: number) => number,
): number {
  return 0
}
