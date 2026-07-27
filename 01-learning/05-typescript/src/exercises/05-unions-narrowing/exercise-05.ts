/* =============================================================================
 * EJERCICIO 05 — Narrowing con `typeof` (string | number)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cuando un valor puede ser `string | number`, no puedes usarlo directo (no todo
 * vale para ambos). `typeof` ESTRECHA el tipo dentro de cada rama, y ahí TS te
 * deja usar lo propio de cada uno (`.length`, `* 2`, ...).
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     function f(x: string | number) {
 *       if (typeof x === 'number') {
 *         // aquí x es number → x * 2 vale
 *       } else {
 *         // aquí x es string → x.toUpperCase() vale
 *       }
 *     }
 *
 * 🧠 ANALOGÍA: un paquete que puede traer un libro o una pelota. Antes de usarlo
 *    miras qué es; con un libro lo lees, con una pelota la botas. No al revés.
 *
 * OJO — en `.filter((x): x is number => typeof x === 'number')`, el `x is number`
 *    es un PREDICADO DE TIPO: le dice a TS "lo que pasa el filtro es number", y por
 *    eso el resultado es `number[]` y no `(string | number)[]`.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/05-unions-narrowing/exercise-05.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — typeof para elegir comportamiento --- */

// 1) `formatear` — number → "$<n>" ; string → tal cual.
//    formatear(5) → "$5" ; formatear("hola") → "hola"
export function formatear(x: string | number): string {
  if (typeof x === "string") {
    return x
  }
  return `$${x}`
}
formatear("hola") // "hola"
formatear(290) // "$290"

// 2) `longitudOValor` — string → su longitud ; number → el número.
//    longitudOValor("hola") → 4 ; longitudOValor(7) → 7
export function longitudOValor(x: string | number): number {
  if (typeof x === "string") {
    return x.length
  }
  return x
}

/* --- BLOQUE B — devolver la unión, y mapear --- */

// 3) `duplicar` — number → n*2 ; string → repetido dos veces.
//    duplicar(5) → 10 ; duplicar("ab") → "abab"
export function duplicar(x: string | number): string | number {
  if (typeof x === "string") {
    return x + x
  }
  return x * 2
}

// 4) `aTexto` — formatea cada elemento: number → "#<n>" ; string → MAYÚSCULAS.
//    aTexto([1, "ab"]) → ["#1", "AB"]
export function aTexto(xs: (string | number)[]): string[] {
  return xs.map((elemento) => {
    if (typeof elemento === "string") {
      return elemento.toUpperCase()
    }
    return `#${elemento}`
  })
}
aTexto(["hola", 5, "HOLA", 5, 5]) // ["HOLA", "#5", "HOLA", "#5", "#5"]

/* --- BLOQUE C — CAPSTONE: filtrar por tipo + reducir --- */

// 5) `sumarNumeros` — suma SOLO los números de la lista (descarta los strings).
//    (usa un predicado de tipo en el filter)
//    sumarNumeros([1, "x", 2, "y", 3]) → 6
export function sumarNumeros(xs: (string | number)[]): number {
  return xs.filter((x): x is number => typeof x === "number").reduce((a, b) => a + b, 0)
}
