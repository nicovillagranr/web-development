/* =============================================================================
 * EJERCICIO 10 — CAPSTONE: mini-toolkit genérico (teje 03–09)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Un puñado de helpers genéricos que sirven para CUALQUIER
 * lista de objetos: sumar, agrupar, el mayor, el top, y combinarlos. Es el tipo de
 * utilidades que acabas teniendo en todo proyecto.
 *
 * 🧠 ANALOGÍA: tu caja de herramientas. Cada función es una llave que vale para
 *    muchos tornillos (tipos) distintos, sin fabricar una llave por tornillo.
 *
 * OJO — todo genérico (`<T>`), con criterios por callback. El capstone COMPONE dos
 *    helpers (agrupar + mayor) para sacar el mejor de cada grupo.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/06-generics-basicos/exercise-10.test.ts
 * ===========================================================================*/

/* --- BLOQUE A — sumar y agrupar --- */

// 1) `totalPor` — suma de `valor(x)`.
//    totalPor([{ p: 10 }, { p: 5 }], (x) => x.p) → 15
export function totalPor<T>(xs: T[], valor: (x: T) => number): number {
  return xs.reduce((s, x) => s + valor(x), 0)
}

// 2) `agruparPor` — listas por clave.
//    agruparPor([{ c: "a" }, { c: "b" }, { c: "a" }], (x) => x.c) → { a: [..], b: [..] }
export function agruparPor<T>(xs: T[], clave: (x: T) => string): Record<string, T[]> {
  return xs.reduce<Record<string, T[]>>(
    (acc, x) => ({ ...acc, [clave(x)]: [...(acc[clave(x)] ?? []), x] }),
    {},
  )
}

/* --- BLOQUE B — el mayor y el top 3 --- */

// 3) `mayorPor` — el de mayor `valor(x)`, o undefined.
//    mayorPor([{ v: 1 }, { v: 5 }], (x) => x.v) → { v: 5 }
export function mayorPor<T>(xs: T[], valor: (x: T) => number): T | undefined {
  return xs.reduce<T | undefined>(
    (m, x) => (m === undefined || valor(x) > valor(m) ? x : m),
    undefined,
  )
}

// 4) `top3Por` — los 3 de mayor `valor(x)`.
//    top3Por([{ v: 1 }, { v: 5 }, { v: 3 }, { v: 2 }], (x) => x.v) → [{v:5},{v:3},{v:2}]
export function top3Por<T>(xs: T[], valor: (x: T) => number): T[] {
  return [...xs].sort((a, b) => valor(b) - valor(a)).slice(0, 3)
}

/* --- BLOQUE C — CAPSTONE: componer agrupar + mayor --- */

// 5) `mejorDeCadaGrupo` — el de mayor `valor(x)` dentro de cada grupo.
//    mejorDeCadaGrupo([{c:"a",v:1},{c:"a",v:9},{c:"b",v:4}], (x)=>x.c, (x)=>x.v)
//      → { a: {c:"a",v:9}, b: {c:"b",v:4} }
export function mejorDeCadaGrupo<T>(
  xs: T[],
  clave: (x: T) => string,
  valor: (x: T) => number,
): Record<string, T | undefined> {
  const grupos = agruparPor(xs, clave)
  return Object.fromEntries(
    Object.entries(grupos).map(([k, lista]): [string, T | undefined] => [k, mayorPor(lista, valor)]),
  )
}
