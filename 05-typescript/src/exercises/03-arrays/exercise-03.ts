/* =============================================================================
 * EJERCICIO 03 — Refuerzo dedicado a `.reduce`: combinar todo un array en UN
 *                solo resultado (número, texto, booleano u objeto).
 * =============================================================================
 *
 * ▸ CONTEXTO
 * ----------------------------------------------------------------------------
 * En el ejercicio 02 usaste `.reduce` una sola vez (la caja registradora). Es el
 * método de array más potente y el que más cuesta, así que aquí lo aislamos en
 * 10 pasos: del más simple (sumar) al capstone (acumular en un objeto).
 *
 * ▸ OBJETIVO TÉCNICO
 * ----------------------------------------------------------------------------
 * Entender la anatomía de `reduce`: el acumulador, el valor inicial, y que el
 * tipo del resultado lo decide ese valor inicial (puede ser ≠ del tipo de los
 * elementos: de un number[] puedo sacar un boolean, un objeto, etc.).
 *
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ▸ EXPLICACIÓN — leer ANTES de tocar los drills
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 🐷 LA ANALOGÍA: LA ALCANCÍA
 * ----------------------------------------------------------------------------
 * `reduce` es una alcancía. Empiezas con una cantidad inicial (lo que ya hay
 * dentro), y por cada elemento del array vas "metiendo" algo y actualizando el
 * total. Al final, lo que quedó en la alcancía es tu único resultado.
 *
 *
 * 1) LA ANATOMÍA
 * ----------------------------------------------------------------------------
 *   array.reduce( (acum, valor) => nuevoAcum ,  inicial )
 *                  └──┬─┘ └─┬─┘                  └──┬───┘
 *      lo acumulado ──┘     │                      └── con qué empieza la alcancía
 *      hasta ahora          └── el elemento actual del array
 *
 *   • `acum`    = lo que llevas acumulado. En la 1ª vuelta vale `inicial`.
 *   • `valor`   = el elemento que toca en esta vuelta.
 *   • lo que RETORNAS  = el nuevo `acum` para la SIGUIENTE vuelta.
 *   • al terminar el array, el último `acum` es el resultado.
 *
 *
 * 2) TRAZA PASO A PASO
 * ----------------------------------------------------------------------------
 *   [1, 2, 3].reduce((acum, valor) => acum + valor, 0)
 *
 *     inicio:   acum = 0   (el inicial)
 *     valor=1:  acum = 0 + 1 = 1
 *     valor=2:  acum = 1 + 2 = 3
 *     valor=3:  acum = 3 + 3 = 6   ← resultado final
 *
 *
 * 3) EL VALOR INICIAL MANDA (¡y a veces NO es 0!)
 * ----------------------------------------------------------------------------
 *   • Para SUMAR, el inicial es 0  (sumar 0 no cambia nada).
 *   • Para MULTIPLICAR, el inicial es 1 (¡si pones 0, todo da 0!).
 *   • El TIPO del inicial decide el tipo del resultado:
 *       inicial 0   → reduce devuelve number
 *       inicial ""  → reduce devuelve string
 *       inicial false → reduce devuelve boolean
 *       inicial { ... } → reduce devuelve ese objeto
 *
 *   👉 Por eso de un `number[]` puedes sacar un texto, un booleano o un objeto:
 *      el acumulador NO tiene que ser del mismo tipo que los elementos.
 *
 *
 * ▸ DRILLS — EN ORDEN. Cada cuerpo provisional está MAL a propósito: arréglalo y
 *   corre el test tras cada uno.
 *     pnpm test:run src/exercises/03-arrays/exercise-03.test.ts
 *   Reglas: ❌ nada de `any`, ❌ nada de `as X`, ❌ no mutes nada (devuelve valores
 *   nuevos), ✅ usa SIEMPRE `.reduce` (aunque haya un atajo, aquí practicamos esto).
 * ═══════════════════════════════════════════════════════════════════════════*/


/* ── Bloque: reduce que devuelve un número ─────────────────────────────────── */

// 1) 🐷 SUMA. `sumar` devuelve la suma de todos los números. Inicial: 0.
//      sumar([1, 2, 3, 4]) → 10 ; sumar([]) → 0
export function sumar(nums: number[]): number {
  return nums.reduce((acum, valor) => acum + valor, 0)
}
sumar([1, 2, 3, 4.5]) // resultado: 15

// 2) ✖️ PRODUCTO. `multiplicarTodos` devuelve el producto de todos. OJO con el
//    inicial: para multiplicar NO es 0 (daría 0 siempre), es 1.
//      multiplicarTodos([1, 2, 3, 4]) → 24 ; multiplicarTodos([]) → 1
export function multiplicarTodos(nums: number[]): number {
  return nums.reduce((acum, valor) => acum * valor, 1)
}
multiplicarTodos([1, 2, 3, 4]) // resultado: 24

// 3) 🔢 CONTAR. `contar` devuelve CUÁNTOS elementos hay, usando reduce (suma 1
//    por cada elemento). Nota: aquí el `valor` ni se mira; solo cuentas vueltas.
//      contar([10, 20, 30]) → 3 ; contar([]) → 0
export function contar(nums: number[]): number {
  return nums.reduce((acum, valor) => acum + 1, 0)
}

// 4) ⬆️ MÁXIMO. `maximo` devuelve el número más grande. Inicial: -Infinity (así
//    cualquier número real lo supera). (Pista: Math.max(acum, valor).)
//      maximo([3, 9, 2, 7]) → 9 ; maximo([-5, -1]) → -1
export function maximo(nums: number[]): number {
  return 0 // ← provisional. Compara el acum con cada valor.
}


/* ── Bloque: reduce que cambia de tipo (acum ≠ tipo del elemento) ──────────── */

// 5) 🔗 CONCATENAR. `concatenar` une todos los textos en uno solo. Inicial: "".
//      concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
export function concatenar(textos: string[]): string {
  return "" // ← provisional. Acumulador string, inicial "".
}

// 6) 📏 LONGITUD TOTAL. `longitudTotal` recibe textos y devuelve la suma de sus
//    longitudes (string[] → number: el acum es number aunque los elementos sean
//    string). (Pista: acum + valor.length.)
//      longitudTotal(["hola", "ab"]) → 6 ; longitudTotal([]) → 0
export function longitudTotal(textos: string[]): number {
  return 0 // ← provisional. acum (number) + la longitud de cada texto.
}


/* ── Bloque: reduce que devuelve un booleano ───────────────────────────────── */

// 7) ✅ CONTAR VERDADEROS. `contarVerdaderos` recibe booleanos y devuelve cuántos
//    son `true`. (boolean[] → number.)
//      contarVerdaderos([true, false, true, true]) → 3 ; contarVerdaderos([]) → 0
export function contarVerdaderos(valores: boolean[]): number {
  return 0 // ← provisional. Suma 1 solo cuando el valor sea true.
}

// 8) 🟢 TODOS POSITIVOS. `todosPositivos` devuelve true si TODOS los números son
//    > 0. Inicial: true (vacío cuenta como "todos cumplen"). (number[] → boolean.)
//    Pista: en cada vuelta, acum && valor > 0.
//      todosPositivos([1, 2, 3]) → true ; todosPositivos([1, -2, 3]) → false
export function todosPositivos(nums: number[]): boolean {
  return false // ← provisional. Combina el acum (boolean) con la condición de cada valor.
}


/* ── Bloque: transformar dentro del reduce / acumulador objeto ─────────────── */

// 9) 🔲 SUMA DE CUADRADOS. `sumaDeCuadrados` devuelve la suma de cada número al
//    cuadrado, SIN usar map antes (haz el cuadrado dentro del propio reduce).
//      sumaDeCuadrados([1, 2, 3]) → 14    (1 + 4 + 9)
export function sumaDeCuadrados(nums: number[]): number {
  return 0 // ← provisional. acum + valor * valor.
}

// 10) 🐷🐷 CAPSTONE — DOS ALCANCÍAS. `contarParesImpares` recorre los números y
//     devuelve un objeto { pares, impares } con cuántos hay de cada uno. El
//     acumulador es un OBJETO; inicial { pares: 0, impares: 0 }. No mutes el acum:
//     devuelve un objeto nuevo cada vuelta (pista: usa `...acum`).
//       contarParesImpares([1, 2, 3, 4]) → { pares: 2, impares: 2 }
//       contarParesImpares([])           → { pares: 0, impares: 0 }
export function contarParesImpares(nums: number[]): { pares: number; impares: number } {
  return { pares: 0, impares: 0 } // ← provisional. Acumula en el objeto según paridad.
}
