/* =============================================================================
 * EJERCICIO 09 — genéricos: ordenar por un criterio ((x: T) => number) · bloque 06
 *
 * 🎯 OBJETIVOS
 * · Ordenar una lista de cualquier tipo según un criterio que llega por callback.
 * · Ordenar sin mutar el original, copiando antes de sort.
 *
 * 🟢 CONTEXTO — ordenar listas de cualquier tipo según un criterio que tú pasas:
 * por precio, por puntos, por nombre. El criterio es un callback genérico,
 * (x: T) => number o string.
 *
 * 🗺️ MAPA
 * TEORÍA · ordenar con una copia y un criterio → base de todo el archivo
 * BLOQUE A · ascendente y descendente → drills 1–2
 * BLOQUE B · el mínimo, y el top N → drills 3–4
 * BLOQUE C · capstone: ordenar por texto → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/06-generics-basicos/exercise-09.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — ordenar con una copia y un criterio
 *
 * DEFINICIÓN
 * sort reordena según una comparación (a, b): negativo pone a delante, positivo
 * pone b delante. Con un criterio valor(x), la comparación sale de restar.
 *
 * SINTAXIS
 * function ordenarPor<T>(xs: T[], valor: (x: T) => number): T[] {
 *   return [...xs].sort((a, b) => valor(a) - valor(b)) // ascendente por valor(x)
 * }
 *
 * 🧠 ANALOGÍA — ordenar cartas: tú dices por qué campo (número, palo, color), y el
 * método las reordena según ese criterio.
 *
 * ⚠️ TRAMPA — sort muta: copia con [...xs] antes de ordenar.
 *
 * 💡 a - b es ascendente; b - a, descendente. Para texto,
 * texto(a).localeCompare(texto(b)).
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — ascendente y descendente */

/* 1) ordenarPor — de menor a mayor valor(x), sin mutar.
 * ordenarPor([{ v: 3 }, { v: 1 }, { v: 2 }], (x) => x.v) → [{v:1},{v:2},{v:3}]
 */
export function ordenarPor<T>(xs: T[], valor: (x: T) => number): T[] {
  return [...xs].sort((a, b) => valor(a) - valor(b));
}

/* 2) ordenarDesc — de mayor a menor valor(x), sin mutar.
 * ordenarDesc([{ v: 1 }, { v: 3 }, { v: 2 }], (x) => x.v) → [{v:3},{v:2},{v:1}]
 */
export function ordenarDesc<T>(xs: T[], valor: (x: T) => number): T[] {
  return [...xs].sort((a, b) => valor(b) - valor(a));
}

/* ▸ BLOQUE B — el mínimo, y el top N */

/* 3) minimoPor — el de menor valor(x), o undefined si vacío.
 * minimoPor([{ v: 3 }, { v: 1 }, { v: 2 }], (x) => x.v) → { v: 1 }
 */
export function minimoPor<T>(xs: T[], valor: (x: T) => number): T | undefined {
  return xs.reduce<T | undefined>(
    (m, x) => (m === undefined || valor(x) < valor(m) ? x : m),
    undefined,
  );
}

/* 4) top — los n de mayor valor(x) (ordena desc + recorta).
 * top([{ v: 1 }, { v: 5 }, { v: 3 }], (x) => x.v, 2) → [{v:5},{v:3}]
 */
export function top<T>(xs: T[], valor: (x: T) => number, n: number): T[] {
  return [...xs].sort((a, b) => valor(b) - valor(a)).slice(0, n);
}

/* ▸ BLOQUE C — capstone: ordenar por texto */

/* 5) ordenarPorTexto — alfabéticamente por texto(x), sin mutar.
 * ordenarPorTexto([{ n: "b" }, { n: "a" }], (x) => x.n) → [{n:"a"},{n:"b"}]
 */
export function ordenarPorTexto<T>(xs: T[], texto: (x: T) => string): T[] {
  return [...xs].sort((a, b) => texto(a).localeCompare(texto(b)));
}
