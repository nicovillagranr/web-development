/* =============================================================================
 * EJERCICIO 03 — refuerzo de .reduce: combinar un array en un solo resultado · bloque 03
 *
 * 🎯 OBJETIVOS
 * · Leer la anatomía de reduce: acumulador, elemento actual y valor inicial.
 * · Elegir el valor inicial, que decide el tipo del resultado (número, texto,
 *   booleano u objeto).
 *
 * 🟢 CONTEXTO — en el 02 usaste .reduce una sola vez (la caja registradora). Es el
 * método de array más potente y el que más cuesta, así que aquí se aísla en 10
 * pasos: del más simple (sumar) al capstone (acumular en un objeto).
 *
 * 🗺️ MAPA
 * TEORÍA · la alcancía: anatomía de reduce → base de todo el archivo
 * BLOQUE A · reduce que devuelve un número → drills 1–4
 * BLOQUE B · reduce que cambia de tipo → drills 5–6
 * BLOQUE C · reduce que devuelve un booleano → drills 7–8
 * BLOQUE D · transformar dentro del reduce; acumulador objeto → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any, as X y mutar (devuelve valores
 * nuevos). Usa siempre .reduce, aunque haya un atajo: aquí se practica esto.
 * pnpm test:run src/exercises/03-arrays/exercise-03.test.ts
 * pnpm typecheck
 *
 * Cada cuerpo provisional está mal a propósito: arréglalo y corre el test tras
 * cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — la alcancía: anatomía de reduce
 *
 * DEFINICIÓN
 * reduce combina todo un array en un solo resultado. En cada vuelta recibe lo
 * acumulado hasta ahora y el elemento actual, y lo que retorna es el acumulado de
 * la vuelta siguiente. Al terminar el array, el último acumulado es el resultado.
 *
 * SINTAXIS
 * array.reduce((acum, valor) => nuevoAcum, inicial)
 *
 * 🗣️ LAS PIEZAS
 * acum            → lo acumulado hasta ahora; en la 1ª vuelta vale inicial
 * valor           → el elemento que toca en esta vuelta
 * lo que retornas → el nuevo acum, para la siguiente vuelta
 * inicial         → con qué empieza la alcancía
 *
 * Ejemplos — [1, 2, 3].reduce((acum, valor) => acum + valor, 0), paso a paso:
 * inicio  → acum = 0 (el inicial)
 * valor 1 → acum = 0 + 1 = 1
 * valor 2 → acum = 1 + 2 = 3
 * valor 3 → acum = 3 + 3 = 6: el resultado final
 *
 * 🧠 ANALOGÍA — una alcancía: empiezas con lo que ya hay dentro, y por cada
 * elemento vas metiendo algo y actualizando el total. Lo que queda al final es tu
 * único resultado.
 *
 * ⚠️ TRAMPA — el valor inicial manda, y a veces no es 0: para sumar es 0 (sumar 0
 * no cambia nada), pero para multiplicar es 1 (con 0, todo da 0).
 *
 * 💡 El tipo del inicial decide el tipo del resultado: 0 → number, "" → string,
 * false → boolean, { … } → ese objeto. Por eso de un number[] puedes sacar un
 * texto, un booleano o un objeto: el acumulador no tiene que ser del mismo tipo que
 * los elementos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ▸ BLOQUE A — reduce que devuelve un número */

/* 1) 🐷 Suma. sumar devuelve la suma de todos los números. Inicial: 0.
 * sumar([1, 2, 3, 4]) → 10 ; sumar([]) → 0
 */
export function sumar(nums: number[]): number {
  return nums.reduce((acum, valor) => acum + valor, 0);
}
sumar([1, 2, 3, 4.5]); // resultado: 15

/* 2) ✖️ Producto. multiplicarTodos devuelve el producto de todos. Ojo con el
 * inicial: para multiplicar no es 0 (daría 0 siempre), es 1.
 *   multiplicarTodos([1, 2, 3, 4]) → 24 ; multiplicarTodos([]) → 1
 */
export function multiplicarTodos(nums: number[]): number {
  return nums.reduce((acum, valor) => acum * valor, 1);
}
multiplicarTodos([1, 2, 3, 4]); // resultado: 24

/* 3) 🔢 Contar. contar devuelve cuántos elementos hay, usando reduce (suma 1
 * por cada elemento). Nota: aquí el valor ni se mira; solo cuentas vueltas.
 *   contar([10, 20, 30]) → 3 ; contar([]) → 0
 */
export function contar(nums: number[]): number {
  return nums.reduce((acum) => acum + 1, 0);
}
contar([10, 20, 30]); // resultado: 3

/* 4) ⬆️ Máximo. maximo devuelve el número más grande. Inicial: -Infinity (así
 * cualquier número real lo supera). (Pista: Math.max(acum, valor).)
 *   maximo([3, 9, 2, 7]) → 9 ; maximo([-5, -1]) → -1
 */
export function maximo(nums: number[]): number {
  return nums.reduce((acum, valor) => Math.max(acum, valor), -Infinity);
}
maximo([3, 9, 2, 7]); // resultado: 9

/* ▸ BLOQUE B — reduce que cambia de tipo (acum ≠ tipo del elemento) */

/* 5) 🔗 Concatenar. concatenar une todos los textos en uno solo. Inicial: "".
 * concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
 */
export function concatenar(textos: string[]): string {
  return textos.reduce((acum, valor) => acum + valor, "");
}

/* 6) 📏 Longitud total. longitudTotal recibe textos y devuelve la suma de sus
 * longitudes (string[] → number: el acum es number aunque los elementos sean
 * string). (Pista: acum + valor.length.)
 *   longitudTotal(["hola", "ab"]) → 6 ; longitudTotal([]) → 0
 */
export function longitudTotal(textos: string[]): number {
  return textos.reduce((acum, valor) => acum + valor.length, 0);
}
longitudTotal(["hola", "ab"]); // resultado: 6

/* ▸ BLOQUE C — reduce que devuelve un booleano */

/* 7) ✅ Contar verdaderos. contarVerdaderos recibe booleanos y devuelve cuántos
 * son true. (boolean[] → number.)
 *   contarVerdaderos([true, false, true, true]) → 3 ; contarVerdaderos([]) → 0
 */
export function contarVerdaderos(valores: boolean[]): number {
  return valores.reduce((acum, valor) => acum + (valor ? 1 : 0), 0);
}

/* 8) 🟢 Todos positivos. todosPositivos devuelve true si todos los números son
 * > 0. Inicial: true (vacío cuenta como "todos cumplen"). (number[] → boolean.)
 * Pista: en cada vuelta, acum && valor > 0.
 *   todosPositivos([1, 2, 3]) → true ; todosPositivos([1, -2, 3]) → false
 */
export function todosPositivos(nums: number[]): boolean {
  return nums.reduce((acum, valor) => acum && valor > 0, true);
}
todosPositivos([1, 2, 3]); // resultado: true
todosPositivos([1, -2, 3]); // resultado: false
todosPositivos([]); // resultado: true (vacío cuenta como "todos cumplen")

/* ▸ BLOQUE D — transformar dentro del reduce; acumulador objeto */

/* 9) 🔲 Suma de cuadrados. sumaDeCuadrados devuelve la suma de cada número al
 * cuadrado, sin usar map antes (haz el cuadrado dentro del propio reduce).
 *   sumaDeCuadrados([1, 2, 3]) → 14    (1 + 4 + 9)
 */
export function sumaDeCuadrados(nums: number[]): number {
  return nums.reduce((acum, valor) => acum + valor * valor, 0);
}
sumaDeCuadrados([1, 2, 3]); // resultado: 14 (1 + 4 + 9)
sumaDeCuadrados([]); // resultado: 0 (no hay nada que sumar, así que da 0)
sumaDeCuadrados([-1, -2]); // resultado: 5 (1 + 4)

/* 10) 🐷🐷 Capstone — dos alcancías. contarParesImpares recorre los números y
 * devuelve un objeto { pares, impares } con cuántos hay de cada uno. El
 * acumulador es un objeto; inicial { pares: 0, impares: 0 }. No mutes el acum:
 * devuelve un objeto nuevo cada vuelta (pista: usa ...acum).
 *   contarParesImpares([1, 2, 3, 4]) → { pares: 2, impares: 2 }
 *   contarParesImpares([])           → { pares: 0, impares: 0 }
 */
export function contarParesImpares(nums: number[]): { pares: number; impares: number } {
  return nums.reduce(
    (acum, valor) => {
      if (valor % 2 === 0) {
        return { ...acum, pares: acum.pares + 1 };
      } else {
        return { ...acum, impares: acum.impares + 1 };
      }
    },
    { pares: 0, impares: 0 },
  );
}
