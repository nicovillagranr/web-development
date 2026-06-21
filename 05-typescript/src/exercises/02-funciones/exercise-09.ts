/* =============================================================================
 * EJERCICIO 09 — funciones (9/?): PIPE (aplicar una LISTA de funciones en cadena)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Componer dos funciones (ejercicio 08) está bien, ¿y si son CINCO pasos? En vez
 * de anidar `e(d(c(b(a(x)))))`, guardas los pasos en una LISTA y los aplicas en
 * orden con un `reduce`. Eso es un "pipe": el dato entra por un extremo y sale
 * transformado por el otro.
 *
 *
 * ▸ EXPLICACIÓN — `reduce` que pasa el dato de paso en paso
 * ----------------------------------------------------------------------------
 *     function aplicarPasos(n: number, pasos: ((n: number) => number)[]): number {
 *       return pasos.reduce((acum, paso) => paso(acum), n)
 *     }
 *     aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) // ((3+1)*2)-1 = 7
 *
 * El acumulador del reduce es "el dato según va saliendo de cada paso"; el valor
 * inicial es el dato de entrada `n`. Cada vuelta aplica un paso al resultado del
 * anterior.
 *
 * 🧠 ANALOGÍA: una tubería con varios filtros en fila. El agua entra, pasa por el
 *    filtro 1, ese resultado pasa por el filtro 2, y así. Añadir un filtro es
 *    meter un elemento más en la lista, no reescribir la tubería.
 *
 * 🔧 POR DENTRO: el tipo `((n: number) => number)[]` es "una lista de funciones
 *    número→número". Los `()` agrupan la firma para que el `[]` diga "lista de
 *    eso". Con la lista VACÍA, el dato sale igual que entró (no hay pasos).
 *
 * 💼 CASO REAL: pipelines de validación/formateo (`[trim, toLowerCase, capitalize]`)
 *    o de transformación de datos antes de pintarlos.
 *
 * OJO — esto es el `reduce` campeón que ya conoces, pero el acumulador NO es un
 *    número que sumas: es el DATO en curso, y cada elemento de la lista es una
 *    FUNCIÓN que lo transforma.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/02-funciones/exercise-09.test.ts
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — aplicar la lista de pasos a un dato
 * -------------------------------------------------------------------------- */

// 1) `aplicarPasos` — pasa `n` por todos los pasos, en orden.
//    👉 Dos arreglos: el tipo de `pasos` (ahora es un `number[]`, no una lista de
//       FUNCIONES) → ponlo `((n: number) => number)[]`. Y el cuerpo (devuelve `n`
//       sin aplicar nada).
//      aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1]) → 7
//      aplicarPasos(3, []) → 3
export function aplicarPasos(n: number, pasos: number[]): number {
  return 0
}

// 2) `aplicarPasosTexto` — lo mismo con strings.
//      aplicarPasosTexto("hola", [(s) => s.toUpperCase(), (s) => s + "!"]) → "HOLA!"
export function aplicarPasosTexto(
  texto: string,
  pasos: string[],
): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — devolver la tubería ya montada (point-free)
 * ---------------------------------------------------------------------------
 * En vez de aplicar los pasos a un dato concreto, devuelves una FUNCIÓN que, dado
 * cualquier dato, lo hace pasar por todos los pasos.
 * -------------------------------------------------------------------------- */

// 3) `pipe` — devuelve una función que aplica todos los pasos.
//    👉 Dos arreglos: el tipo de retorno (ahora `number`, pero debe ser
//       `(n: number) => number`) y el cuerpo.
//      const p = pipe([(n) => n + 1, (n) => n * 2]); p(3) → 8; p(10) → 22
export function pipe(pasos: ((n: number) => number)[]): number {
  return 0
}

// 4) `pipeTexto` — la versión string.
//      const p = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase()]); p("  hi ") → "HI"
export function pipeTexto(
  pasos: ((s: string) => string)[],
): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: aplicar la tubería a CADA elemento de una lista
 * -------------------------------------------------------------------------- */

// 5) `procesarCada` — aplica la lista de pasos a cada número de `nums`.
//    👉 Dos arreglos: el tipo de retorno (`number[]`) y el cuerpo (`.map` donde
//       cada elemento pasa por todos los pasos).
//      procesarCada([1, 2, 3], [(n) => n + 1, (n) => n * 10]) → [20, 30, 40]
export function procesarCada(
  nums: number[],
  pasos: ((n: number) => number)[],
): number[] {
  return []
}
