/* =============================================================================
 * EJERCICIO 05 — objetos: recorrer con Object.keys, values y entries · bloque 04
 *
 * 🎯 OBJETIVOS
 * · Convertir un objeto en un array con Object.keys, values o entries.
 * · Desestructurar la tupla [clave, valor] en el parámetro de la flecha.
 *
 * 🟢 CONTEXTO — un array lo recorres directo. Un objeto no: primero sacas sus
 * claves, sus valores o sus pares [clave, valor], y eso ya es un array que sí
 * puedes recorrer con map, filter o reduce.
 *
 * 🗺️ MAPA
 * TEORÍA · keys, values y entries → base de todo el archivo
 * BLOQUE A · keys y values → drills 1–2
 * BLOQUE B · values + reduce, y entries → drills 3–4
 * BLOQUE C · capstone: entries + map + join → drill 5
 * ESCALERA R · desarmar .map(([clave, valor]) => …) → peldaños R1–R7, al final
 *
 * ▸ 5 drills + 7 peldaños, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/04-objetos/exercise-05.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — keys, values y entries
 *
 * DEFINICIÓN
 * Object.keys, Object.values y Object.entries convierten un objeto en un array: de
 * sus claves, de sus valores o de sus pares.
 *
 * Ejemplos, con const o = { a: 1, b: 2 }:
 * Object.keys(o)    → ["a", "b"]
 * Object.values(o)  → [1, 2]
 * Object.entries(o) → [["a", 1], ["b", 2]]: cada par es una tupla [clave, valor]
 *
 * 🧠 ANALOGÍA — un casillero con etiquetas: keys es la lista de etiquetas; values,
 * lo guardado en cada uno; entries, las parejas etiqueta → contenido.
 *
 * 💡 entries da tuplas [string, number], y en el callback las desestructuras:
 * .map(([clave, valor]) => …).
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — keys y values */

/* 1) clavesDe — las claves del objeto.
 * clavesDe({ a: 1, b: 2 }) → ["a", "b"]
 */
export function clavesDe(obj: Record<string, number>): string[] {
  return Object.keys(obj);
}
// return: ["a", "b"]
clavesDe({ a: 1, b: 2 });

/* 2) valoresDe — los valores del objeto.
 * valoresDe({ a: 1, b: 2 }) → [1, 2]
 */
export function valoresDe(obj: Record<string, number>): number[] {
  return Object.values(obj);
}
// return: [1, 2]
valoresDe({ a: 1, b: 2 });

/* ▸ BLOQUE B — values + reduce, y entries */

/* 3) sumaDeValores — la suma de todos los valores.
 * sumaDeValores({ a: 1, b: 2, c: 3 }) → 6
 */
export function sumaDeValores(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acumulador, valor) => acumulador + valor, 0);
}
// return: 6
sumaDeValores({ a: 1, b: 2, c: 3 });

/* 4) paresClaveValor — los pares [clave, valor].
 * paresClaveValor({ a: 1 }) → [["a", 1]]
 */
export function paresClaveValor(obj: Record<string, number>): [string, number][] {
  return Object.entries(obj);
}

/* ▸ BLOQUE C — capstone: entries + map + join */

/* 5) describir — "clave=valor" de cada par, unidos por ", ".
 * describir({ a: 1, b: 2 }) → "a=1, b=2"
 */
export function describir(obj: Record<string, number>): string {
  return Object.entries(obj)
    .map(([clave, valor]) => `${clave}=${valor}`)
    .join(", ");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA R — desarmar .map(([clave, valor]) => …) (refuerzo)
 *
 * El lío del paréntesis → corchete → paréntesis es que son tres capas distintas
 * pegadas, y cada símbolo pertenece a una. En
 * .map( ([clave, valor]) => `${clave}=${valor}` ):
 *
 * 🗣️ LAS PIEZAS
 * .map( … )      → capa 1: la llamada a map(); todo lo de dentro es un solo
 *                  argumento
 * ( … ) =>       → capa 3: la lista de parámetros de la flecha, como en
 *                  (x) => x * 2
 * [clave, valor] → capa 2: no es un array, es un patrón que desempaqueta: «lo que
 *                  llega es un array de 2; llama clave al 1º y valor al 2º»
 *
 * 💡 La clave: la flecha recibe un parámetro (la entrada, una tupla
 * [string, number]). El corchete no añade un parámetro más: abre el que ya hay.
 * Estas dos líneas hacen exactamente lo mismo:
 * .map((entrada) => `${entrada[0]}=${entrada[1]}`) // sin desempaquetar
 * .map(([clave, valor]) => `${clave}=${valor}`)    // desempaquetando
 *
 * 🧠 ANALOGÍA — te llega un paquete de Correos con dos cosas dentro: puedes dejarlo
 * cerrado y rebuscar por posición (paquete[0], paquete[1]), o abrirlo en la puerta
 * y sacar las dos cosas ya con su nombre. Sigue siendo un paquete.
 *
 * La escalera sube de «tupla desnuda» → «desempaquetar en el parámetro» → «todo
 * dentro de map». Prohibidos any y as.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ R·1 — la tupla, a pelo (sin flechas, sin map) */

/* R1) laClave — la clave de una entrada. Accede por posición: la clave es la 0.
 * laClave(["a", 1]) → "a"
 */
export function laClave(entrada: [string, number]): string {
  return entrada[0];
}
laClave(["a", 1]); // "a"

/* R2) elValor — el valor de una entrada. El valor es la posición 1.
 * elValor(["a", 1]) → 1
 */
export function elValor(entrada: [string, number]): number {
  return entrada[1];
}

/* R3) formatearConIndices — "clave=valor", usando solo índices (nada de corchetes
 * en el parámetro todavía). Es el cuerpo del drill 5, pero sin desempaquetar.
 * formatearConIndices(["a", 1]) → "a=1"
 */
export function formatearConIndices(entrada: [string, number]): string {
  return `${entrada[0]}=${entrada[1]}`;
}

/* ▸ R·2 — el salto: desempaquetar en el parámetro */

/* R4) formatearDesestructurando — mismo resultado que R3, pero el parámetro ya no
 * se llama entrada: en su lugar pones el patrón [clave, valor]. Fíjate en que
 * el tipo : [string, number] sigue siendo el mismo — sigue llegando una tupla.
 * En el cuerpo ya no hay índices: usas clave y valor por su nombre.
 * formatearDesestructurando(["a", 1]) → "a=1"
 */
export function formatearDesestructurando([clave, valor]: [string, number]): string {
  return `${clave}=${valor}`;
}
formatearDesestructurando(["a", 1]); // "a=1"

/* ▸ R·3 — ahora sí, dentro de map */

//  const o = { a: 1, b: 2 }
//  Object.keys(o)     // ["a", "b"]
//  Object.values(o)   // [1, 2]
//  Object.entries(o)  // [["a", 1], ["b", 2]]   ← cada par es una tupla [clave, valor]

/* R5) describirConIndices — como el drill 5, pero sin desestructurar: la flecha
 * recibe entrada y tú sacas las piezas con entrada[0] / entrada[1].
 * (Pista: Object.entries → .map(...) → .join(", "))
 * describirConIndices({ a: 1, b: 2 }) → "a=1, b=2"
 */
export function describirConIndices(obj: Record<string, number>): string {
  return Object.entries(obj)
    .map((entrada) => `${entrada[0]}=${entrada[1]}`)
    .join(", ");
}

/* R6) clavesConValorMinimo — solo las claves cuyo valor llega al mínimo.
 * Aquí desestructuras dos veces y en cada una necesitas piezas distintas:
 *   · en el filter miras el valor  → ([clave, valor]) => ...
 *   · en el map devuelves la clave → te basta con ([clave]) => ...
 * Sí: puedes desempaquetar solo la primera pieza y olvidarte del resto.
 * clavesConValorMinimo({ a: 1, b: 5, c: 9 }, 5) → ["b", "c"]
 */
export function clavesConValorMinimo(obj: Record<string, number>, minimo: number): string[] {
  return Object.entries(obj)
    .filter((entrada) => entrada[1] >= minimo)
    .map(([clave]) => clave);
}

/* ▸ R·4 — capstone: el drill 5, pero ordenado */

/* R7) describirOrdenado — igual que describir, pero de mayor a menor valor.
 * Encadenas: entries → sort (por valor, descendente) → map → join.
 * En el sort el callback recibe dos entradas (a y b), así que hay dos patrones:
 * (a, b) => .... Puedes tirar de índices (a[1], b[1]) o desestructurar las
 * dos a la vez. Empieza con índices si te enreda; lo importante es que salga.
 * describirOrdenado({ a: 1, b: 9, c: 5 }) → "b=9, c=5, a=1"
 */
export function describirOrdenado(obj: Record<string, number>): string {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(formatearConIndices)
    .join(", ");
}
describirOrdenado({ a: 1, b: 9, c: 5 }); // -> "b=9, c=5, a=1"
