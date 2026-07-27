/* =============================================================================
 * EJERCICIO 02 — refuerzo del drill 8 de exercise-01: el `reduce` CAMPEÓN
 * =============================================================================
 *
 * 🟢 POR QUÉ EXISTE ESTE ARCHIVO
 * ----------------------------------------------------------------------------
 * El drill 8 de exercise-01 (`minimoPor`) se atascó en DOS frentes a la vez:
 *   1) la LÓGICA del cuerpo: un `reduce` cuyo acumulador NO es un número, sino
 *      "el mejor objeto encontrado hasta ahora" (un torneo con campeón).
 *   2) la FIRMA genérica: el dúo <Clave, Objeto> con Record.
 *
 * Aquí los separamos. Antes de nada, un CALENTAMIENTO de `reduce` a secas
 * (drills 1–6), porque es el método que más se olvida. Luego dominas la lógica
 * del campeón con tipos concretos (bloques A y B), y solo al final le pones la
 * firma genérica (bloque C). Cuando termines el drill 13, vuelve a exercise-01
 * drill 8: será el mismo ejercicio, solo que con genéricos.
 *
 *
 * ▸ EXPLICACIÓN 1 — `reduce`, la alcancía
 * ----------------------------------------------------------------------------
 * `reduce` recorre el array llevando UN valor que se va actualizando: el
 * ACUMULADOR. Tú decides qué guarda y cómo cambia en cada paso.
 *
 *     arr.reduce((acum, valor) => nuevoAcum, INICIAL)
 *                  │      │          │          │
 *                  │      │          │          └ con qué arranca el acumulador
 *                  │      │          └ lo que valdrá el acumulador en el sig. paso
 *                  │      └ el elemento actual del array
 *                  └ el acumulador (lo que llevas hasta ahora)
 *
 * El INICIAL casi siempre es el "elemento neutro" de la operación:
 *     - sumar       → 0    (sumar 0 no cambia nada)
 *     - multiplicar → 1    (multiplicar por 1 no cambia nada)
 *     - concatenar  → ""   (pegar "" no cambia nada)
 *     - AND lógico  → true
 * El acumulador NO tiene por qué ser del mismo tipo que los elementos: puedes
 * recorrer `string[]` y acumular un `number` (drill 5).
 *
 *
 * ▸ EXPLICACIÓN 2 — el `reduce` CAMPEÓN (patrón torneo) — para los bloques A/B/C
 * ----------------------------------------------------------------------------
 * Cuando el acumulador es "el ganador hasta ahora", imagina un torneo: cada
 * elemento entra y reta al campeón; el que cumple la condición se queda.
 *
 *     arr.reduce((campeon, retador) => elMejorDeLosDos, inicial)
 *
 * Si el campeón es un NÚMERO, el inicial es un tope garantizado:
 *     - mínimo  → `Infinity`   (cualquier número real es menor que él)
 *     - máximo  → `-Infinity`  (cualquier número real es mayor que él)
 * Si el campeón es un OBJETO, no hay "objeto tope" que escribir. Truco:
 *     - inicial `undefined`  → "aún no hay campeón"
 *     - primer turno: si `campeon === undefined`, el primero que entra se corona
 *     - retorno `... | undefined`: array vacío → nadie se corona → sale undefined
 *     - se lo dices a mano:  `reduce<Tipo | undefined>(...)`
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Drills 1–11: la FIRMA ya está; tú escribes el CUERPO. El starter va MAL a
 *   propósito → el test queda ROJO. Arréglalo y corre el test tras cada uno.
 * Drills 12–13: el CUERPO ya está; tú escribes la FIRMA genérica (el dúo).
 *   El typecheck queda ROJO hasta que la aprietes.
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * CALENTAMIENTO — fundamentos de `reduce` (acumulador number, string, boolean)
 * ---------------------------------------------------------------------------
 * En todos: el starter tiene la FORMA del reduce, pero la operación (o el
 * inicial) está mal. Arregla solo lo necesario.
 * -------------------------------------------------------------------------- */

// 1) `sumar` — suma todos los números. El starter nunca suma (devuelve el
//    acumulador sin tocarlo). Arregla la operación.
//      sumar([1, 2, 3]) → 6 ; sumar([]) → 0
export function sumar(nums: number[]): number {
  return nums.reduce((acum, actual) => acum + actual, 0)
}
sumar([2, 4, 6, 8, 10]) // resultado: 30

// 2) `producto` — multiplica todos los números. La operación YA está bien...
//    pero el resultado siempre da 0. Arregla el INICIAL (¿cuál es el neutro de
//    multiplicar?).
//      producto([2, 3, 4]) → 24 ; producto([5]) → 5 ; producto([]) → 1
export function producto(nums: number[]): number {
  return nums.reduce((acum, actual) => acum * actual, 1)
}
producto([2, 4, 6]) // resultado: 48

// 3) `contarPares` — cuántos números pares hay. Acumulador number, inicial 0,
//    pero sumas 1 SOLO cuando el valor es par (un ternario dentro del reduce).
//      contarPares([1, 2, 3, 4]) → 2 ; contarPares([1, 3, 5]) → 0
export function contarPares(nums: number[]): number {
  return nums.reduce((acum, actual) => acum + (actual % 2 === 0 ? 1 : 0), 0)
}
contarPares([2, 4, 6, 8, 10]) // resultado: 5 pares

// 4) `concatenar` — pega todas las palabras en un solo string. Acumulador
//    string, inicial "". Arregla la operación.
//      concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
export function concatenar(palabras: string[]): string {
  return palabras.reduce((acum, valor) => acum + valor, "")
}
concatenar(["Nicolás", "Villagrán"]) // resultado: "NicolásVillagrán"

// 5) `longitudTotal` — suma de las longitudes de todas las palabras. OJO:
//    recorres un `string[]` pero acumulas un `number` (cambio de tipo). El
//    valor aporta su `.length`.
//      longitudTotal(["ab", "cde"]) → 5 ; longitudTotal([]) → 0
export function longitudTotal(palabras: string[]): number {
  return palabras.reduce((acum, valor) => acum + valor.length, 0)
}
longitudTotal(["ab", "cde", "efg"]) // resultado: 8

// 6) `todosPositivos` — ¿son TODOS los números mayores que 0? Acumulador
//    boolean, inicial el neutro del AND (`true`), y en cada paso lo "apagas"
//    con `&&` si el valor no es positivo.
//      todosPositivos([1, 2, 3]) → true ; todosPositivos([1, -2, 3]) → false
export function todosPositivos(nums: number[]): boolean {
  return nums.reduce((acum, valor) => acum && valor > 0, true)
}



/* ---------------------------------------------------------------------------
 * BLOQUE A — el campeón es un NÚMERO (el patrón "compara y quédate con uno")
 * -------------------------------------------------------------------------- */

// 7) `menorNumero` — devuelve el número más pequeño del array. Compara cada
//    `valor` con el campeón `acum` y quédate con el menor. Inicial: el tope
//    garantizado para un mínimo.
//      menorNumero([3, 1, 2]) → 1 ; menorNumero([5]) → 5
export function menorNumero(nums: number[]): number {
  return nums.reduce((acum, valor) => {
    if (valor < acum) return valor
    return acum
  }, Infinity)
}
menorNumero([1, 2, 3, 9, 16]) // resultado: 1

// 8) `mayorNumero` — el número más grande. Mismo patrón que el 7, con la
//    condición y el tope inicial invertidos.
//      mayorNumero([3, 1, 2]) → 3 ; mayorNumero([5]) → 5
export function mayorNumero(nums: number[]): number {
  return nums.reduce((acum, valor) => {
    if (valor > acum) return valor
    return acum
  }, -Infinity)
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — el campeón es un OBJETO concreto (lo nuevo de verdad:
 * inicial `undefined`, portero del primer turno, y `reduce<... | undefined>`)
 * -------------------------------------------------------------------------- */

type Producto = { nombre: string; precio: number }

// 9) `masBarato` — el producto de MENOR precio, o `undefined` si no hay ninguno.
//    El starter devuelve el PRIMERO (mal: el primero no tiene por qué ser el
//    más barato). Escribe el reduce campeón:
//      - `reduce<Producto | undefined>(..., undefined)`
//      - primer turno:  if (mejor === undefined) return actual
//      - resto: compara `actual.precio` con `mejor.precio`, quédate con el menor
//      masBarato([{nombre:"a",precio:30},{nombre:"b",precio:10}]) → {nombre:"b",precio:10}
//      masBarato([]) → undefined
export function masBarato(productos: Producto[]): Producto | undefined {
  return productos.reduce<Producto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor
    }
    return valor.precio < acum.precio ? valor : acum
  }, undefined)
}
masBarato([{ nombre: "Coca Cola", precio: 100 }, { nombre: "Pepsi", precio: 30 }]) // resultado: { nombre: "Pepsi", precio: 30 }
masBarato([
  { nombre: "Papas Lays", precio: 50 },
  { nombre: "Pepsi", precio: 30 },
  { nombre: "Coca Cola", precio: 100 }])
// resultado: { nombre: "Pepsi", precio: 30}

// 10) `masCaro` — el producto de MAYOR precio, o undefined. Espejo del 9:
//     cambia solo la comparación.
//      masCaro([{nombre:"a",precio:30},{nombre:"b",precio:10}]) → {nombre:"a",precio:30}
export function masCaro(productos: Producto[]): Producto | undefined {
  return productos.reduce<Producto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor
    }
    return valor.precio > acum.precio ? valor : acum
  }, undefined)
}

type Jugador = { nombre: string; vidas: number }
// 11) `conMenosVidas` — el jugador con MENOS vidas, o undefined. Mismo patrón
//     que el 9, otro contexto: ahora la propiedad numérica se llama `vidas`.
//      conMenosVidas([{nombre:"ana",vidas:3},{nombre:"leo",vidas:1}]) → {nombre:"leo",vidas:1}
export function conMenosVidas(jugadores: Jugador[]): Jugador | undefined {
  return jugadores.reduce<Jugador | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor
    }
    return valor.vidas < acum.vidas ? valor : acum
  }, undefined)
}
conMenosVidas([{ nombre: "Joel", vidas: 3 }, { nombre: "Ellie", vidas: 1 }]) // resultado: { nombre: "Ellie", vidas: 1 }

/* ---------------------------------------------------------------------------
 * BLOQUE C — la clave VARIABLE: el dúo genérico (esto YA es el drill 8 de ex-01)
 * ---------------------------------------------------------------------------
 * Ahora la columna a comparar la elige quien llama. El CUERPO ya está escrito
 * (es el patrón campeón que dominaste en A y B). Tú solo aprietas la FIRMA con
 * el dúo de exercise-01:
 *     <Clave extends string, Objeto extends Record<Clave, number>>
 * El typecheck queda ROJO (TS2536: Clave no indexa Objeto) hasta que lo pongas.
 * -------------------------------------------------------------------------- */

// 12) `menorPor` — el objeto con el MENOR valor en la columna `clave`. Es el
//     GEMELO exacto de exercise-01 drill 8 (`minimoPor`). Aprieta la firma.
//      menorPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"b",v:1}
export function menorPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(arr: Objeto[], clave: Clave): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual
    }
    return actual[clave] < mejor[clave] ? actual : mejor
  }, undefined)
}
menorPor([{ n: "a", v: 3 }, { n: "b", v: 1 }], "v") // { n: "b", v: 1 }
menorPor([], "v") // undefined

// 13) `mayorPor` — el objeto con el MAYOR valor en `clave`. Es el ESPEJO: el
//     mismísimo `maximoPor` del E1 del parcial. Mismo dúo, cuerpo con `>`.
//      mayorPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"a",v:3}
export function mayorPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(arr: Objeto[], clave: Clave): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual
    }
    return actual[clave] > mejor[clave] ? actual : mejor
  }, undefined)
}
mayorPor([{ n: "a", v: 3 }, { n: "b", v: 1 }], "v") // { n: "a", v: 3 }
