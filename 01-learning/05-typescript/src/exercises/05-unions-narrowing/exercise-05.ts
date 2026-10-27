/* =============================================================================
 * EJERCICIO 05 — narrowing con typeof (string | number) · bloque 05
 *
 * 🎯 OBJETIVOS
 * · Elegir el comportamiento según el tipo con typeof.
 * · Filtrar una lista mixta con un predicado de tipo (x is number).
 *
 * 🟢 CONTEXTO — cuando un valor puede ser string | number, no puedes usarlo directo:
 * no todo vale para ambos. typeof estrecha el tipo dentro de cada rama, y ahí TS te
 * deja usar lo propio de cada uno (.length, * 2…).
 *
 * 🗺️ MAPA
 * TEORÍA · typeof y el predicado de tipo → base de todo el archivo
 * BLOQUE A · typeof para elegir comportamiento → drills 1–2
 * BLOQUE B · devolver la unión, y mapear → drills 3–4
 * BLOQUE C · capstone: filtrar por tipo + reducir → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-05.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — typeof y el predicado de tipo
 *
 * DEFINICIÓN
 * typeof x === 'number' estrecha x a number dentro de su rama, y en la otra rama x
 * queda como string.
 *
 * SINTAXIS
 * function f(x: string | number) {
 *   if (typeof x === 'number') {
 *     // aquí x es number → x * 2 vale
 *   } else {
 *     // aquí x es string → x.toUpperCase() vale
 *   }
 * }
 *
 * 🧠 ANALOGÍA — un paquete que puede traer un libro o una pelota: antes de usarlo
 * miras qué es. Con un libro lo lees, con una pelota la botas; no al revés.
 *
 * 💡 En .filter((x): x is number => typeof x === 'number'), el x is number es un
 * predicado de tipo: le dice a TS «lo que pasa el filtro es number», y por eso el
 * resultado es number[] y no (string | number)[].
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — typeof para elegir comportamiento */

/* 1) formatear — number → "$<n>" ; string → tal cual.
 * formatear(5) → "$5" ; formatear("hola") → "hola"
 */
export function formatear(x: string | number): string {
  if (typeof x === "string") {
    return x;
  }
  return `$${x}`;
}
formatear("hola"); // "hola"
formatear(290); // "$290"

/* 2) longitudOValor — string → su longitud ; number → el número.
 * longitudOValor("hola") → 4 ; longitudOValor(7) → 7
 */
export function longitudOValor(x: string | number): number {
  if (typeof x === "string") {
    return x.length;
  }
  return x;
}

/* ▸ BLOQUE B — devolver la unión, y mapear */

/* 3) duplicar — number → n*2 ; string → repetido dos veces.
 * duplicar(5) → 10 ; duplicar("ab") → "abab"
 */
export function duplicar(x: string | number): string | number {
  if (typeof x === "string") {
    return x + x;
  }
  return x * 2;
}

/* 4) aTexto — formatea cada elemento: number → "#<n>" ; string → mayúsculas.
 * aTexto([1, "ab"]) → ["#1", "ab"]
 */
export function aTexto(xs: (string | number)[]): string[] {
  return xs.map((elemento) => {
    if (typeof elemento === "string") {
      return elemento.toUpperCase();
    }
    return `#${elemento}`;
  });
}
aTexto(["hola", 5, "HOLA", 5, 5]); // ["HOLA", "#5", "HOLA", "#5", "#5"]

/* ▸ BLOQUE C — capstone: filtrar por tipo + reducir */

/* 5) sumarNumeros — suma solo los números de la lista (descarta los strings).
 * (usa un predicado de tipo en el filter)
 * sumarNumeros([1, "x", 2, "y", 3]) → 6
 */
export function sumarNumeros(xs: (string | number)[]): number {
  return xs.filter((x): x is number => typeof x === "number").reduce((a, b) => a + b, 0);
}
