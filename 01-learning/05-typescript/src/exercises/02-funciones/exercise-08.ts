/* =============================================================================
 * EJERCICIO 08 — funciones (8/?): composición · bloque 02 · reforzado
 *
 * 🎯 OBJETIVOS
 * · Componer funciones: la salida de una es la entrada de la siguiente, g(f(x)).
 * · Envolver la composición en una función reutilizable, (n) => g(f(n)).
 *
 * 🟢 CONTEXTO — tercer escalón del arco 06→10. Tú mismo notaste que el g(f(n))
 * desnudo (aplicar ya, devolver el número) se entiende antes que envolverlo en
 * (n) => …. Así que ahora va primero: el bloque 0 aplica la composición ya, y
 * luego la envuelves para fabricar la función reutilizable (la cafetera del 07).
 *
 * 🗺️ MAPA
 * TEORÍA 1 · g(f(x)): aplicar dos funciones en orden, ya → bloque 0
 * BLOQUE 0 · componer y aplicar ya, sin envolver → drills 1–3
 * TEORÍA 2 · envolver: devolver la función compuesta → bloques A a C
 * BLOQUE A · encadenar dos (y tres), devolviendo función → drills 4–5
 * BLOQUE B · encadenar cambiando de tipo, y aplicar dos veces → drills 6–7
 * BLOQUE C · capstone: componer y aplicar de una → drill 8
 *
 * ▸ 8 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/02-funciones/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — g(f(x)): aplicar dos funciones en orden, ya
 *
 * DEFINICIÓN
 * Componer es encadenar: la salida de una función es la entrada de la siguiente.
 * Se lee de dentro hacia fuera: lo del paréntesis interior va primero.
 *
 * SINTAXIS
 * g(f(3)) // primero corre f(3); su resultado entra en g
 *
 * Ejemplos, con f = «+1» y g = «*2»:
 * g(f(3)) → f(3) = 4, y g(4) = 8
 * f(g(3)) → g(3) = 6, y f(6) = 7
 *
 * 🧠 ANALOGÍA — una cadena de montaje con dos estaciones: la pieza pasa por la
 * estación f, sale modificada, y entra en la estación g.
 *
 * ⚠️ TRAMPA — el orden importa: g(f(3)) da 8, pero f(g(3)) da 7. La de dentro toca
 * el dato antes.
 *
 * En el bloque 0 devuelves el número (aplicas ya). En los bloques A, B y C lo
 * envuelves todo en (n) => … para devolver una función reutilizable: construir la
 * máquina ≠ usarla.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE 0 — componer y aplicar ya (devuelve el número, sin envolver) */

/* 1) componerYaplicar2 — aplica f a x, y al resultado le aplica g. Devuelve
 * el número.
 * 👉 El starter devuelve x sin tocarlo. Anida: la de dentro corre primero.
 *   componerYaplicar2(3, (n) => n + 1, (n) => n * 2) → 8
 */
export function componerYaplicar2(
  x: number,
  funcionUno: (n: number) => number,
  funcionDos: (n: number) => number,
): number {
  return funcionDos(funcionUno(x));
}
componerYaplicar2(
  3,
  (n) => n + 1,
  (n) => n * 2,
); // 8

/* 2) componerYaplicar3 — aplica f, luego g, luego h. Devuelve el número.
 * componerYaplicar3(4, (n) => n + 1, (n) => n * 2, (n) => n - 3) → 7
 */
export function componerYaplicar3(
  x: number,
  funcionUno: (n: number) => number,
  funcionDos: (n: number) => number,
  funcionTres: (n: number) => number,
): number {
  return funcionTres(funcionDos(funcionUno(x)));
}

/* 3) componerCambiandoTipo — f va de string→number, g de number→string. El
 * resultado es un string. (El tipo del medio, number, conecta f con g.)
 * 👉 El starter devuelve s sin tocarlo. Anida g(f(s)).
 *   componerCambiandoTipo("hola", (s) => s.length, (n) => `len:${n}`) → "len:4"
 */
export function componerCambiandoTipo(
  s: string,
  funcionUno: (s: string) => number,
  funcionDos: (n: number) => string,
): string {
  return funcionDos(funcionUno(s));
}
componerCambiandoTipo(
  "hola",
  (s) => s.length,
  (n) => `len:${n}`,
); // "len:4"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — ahora envuelve: devolver la función compuesta (la cafetera)
 *
 * DEFINICIÓN
 * Es el bloque 0 envuelto en (n) => …: en vez de aplicar la composición a un dato
 * concreto, fabricas una función que la aplicará a cualquier dato, después.
 *
 * SINTAXIS
 * function encadenar(
 *   f: (n: number) => number,
 *   g: (n: number) => number,
 * ): (n: number) => number {
 *   return (n) => g(f(n)) // el mismo g(f(n)), pero dentro de una función nueva
 * }
 * const h = encadenar((n) => n + 1, (n) => n * 2) // ① fabrica la máquina
 * h(3) // (3 + 1) * 2 = 8                         // ② la enciende
 *
 * ⚠️ TRAMPA — para encadenar f y g, lo que sale de f tiene que poder entrar en g:
 * los tipos del medio deben casar. El drill 6 cambia de tipo por el camino.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — encadenar dos (y tres), devolviendo función */

/* 4) encadenar — devuelve una función que aplica f y luego g.
 * const h = encadenar((n) => n + 1, (n) => n * 2); h(3) → 8
 */
export function encadenar(
  funcionUno: (n: number) => number,
  funcionDos: (n: number) => number,
): (n: number) => number {
  return (n) => funcionDos(funcionUno(n));
}
encadenar(
  (n) => n + 1,
  (n) => n * 2,
)(3); // Operación: n=3 -> n+1=4 -> n*2=8

/* 5) encadenarTres — aplica f, luego g, luego h.
 * const t = encadenarTres((n) => n + 1, (n) => n * 2, (n) => n - 3); t(3) → 5
 */
export function encadenarTres(
  f: (n: number) => number,
  g: (n: number) => number,
  h: (n: number) => number,
): (n: number) => number {
  return (n) => h(g(f(n)));
}
encadenarTres(
  (n) => n + 1,
  (n) => n * 2,
  (n) => n - 3,
)(4); // Operación: n=4 -> n+1=5 -> n*2=10 -> n-3=7
/* ▸ BLOQUE B — encadenar cambiando de tipo, y «aplicar dos veces» */

/* 6) procesar — f convierte string→number, g convierte number→string; la
 * función resultante va de string a string.
 *   const p = procesar((s) => s.length, (n) => `len:${n}`); p("hola") → "len:4"
 */
export function procesar(
  f: (s: string) => number,
  g: (n: number) => string,
): (s: string) => string {
  return (s) => g(f(s));
}

procesar(
  (s) => s.length,
  (n) => `len:${n}`,
)("hola"); // Operación: "hola" -> f: length=4 -> g: `len:${4}` -> "len:4"

/* 7) repetir2 — devuelve una función que aplica f dos veces seguidas.
 * const d = repetir2((n) => n + 3); d(1) → 7    (1 → 4 → 7)
 */
export function repetir2(f: (n: number) => number): (n: number) => number {
  return (n) => f(f(n));
}
repetir2((n) => n + 3)(1); // Operación: n=1 -> n+3=4 -> n+3=7

/* ▸ BLOQUE C — capstone: componer y aplicar de una */

/* 8) encadenarYaplicar — aplica f y luego g directamente a n (devuelve el
 * número, no una función).
 *   encadenarYaplicar(3, (n) => n + 1, (n) => n * 2) → 8
 */
export function encadenarYaplicar(
  n: number,
  funcionUno: (n: number) => number,
  funcionDos: (n: number) => number,
): number {
  return funcionDos(funcionUno(n));
}
encadenarYaplicar(
  3,
  (n) => n + 1,
  (n) => n * 2,
); // Operación: n=3 -> n+1=4 -> n*2=8
