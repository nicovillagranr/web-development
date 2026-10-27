/* =============================================================================
 * EJERCICIO 02 — el reduce campeón · refuerzo del 01 (drill 8)
 *
 * 🎯 OBJETIVOS
 * · Elegir el acumulador y el inicial de un reduce (number, string, boolean).
 * · Escribir el reduce campeón: con un tope si es número, con undefined si es objeto.
 * · Ponerle al campeón la firma genérica del dúo con Record.
 *
 * 🟢 CONTEXTO — el drill 8 del 01 (minimoPor) se atascó en dos frentes a la vez: la
 * lógica del cuerpo, un reduce cuyo acumulador es «el mejor objeto encontrado hasta
 * ahora», y la firma genérica, el dúo con Record. Aquí se separan. Cuando termines
 * el drill 13, vuelve al drill 8 del 01: será el mismo, solo que con genéricos.
 *
 * 🗺️ MAPA
 * CALENTAMIENTO · reduce a secas: number, string, boolean → drills 1–6
 * BLOQUE A · el campeón es un número → drills 7–8
 * BLOQUE B · el campeón es un objeto concreto → drills 9–11
 * BLOQUE C · la clave variable: el dúo genérico → drills 12–13
 *
 * ▸ 13 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-02.test.ts
 * pnpm typecheck
 *
 * Del 1 al 11 la firma ya está y escribes el cuerpo: el starter va mal a propósito
 * y el test queda rojo. En el 12 y el 13 el cuerpo ya está y escribes la firma: el
 * typecheck queda rojo hasta que la aprietes.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ CALENTAMIENTO — reduce, la alcancía
 *
 * DEFINICIÓN
 * reduce recorre el array llevando un valor que se va actualizando: el acumulador.
 * Tú decides qué guarda y cómo cambia en cada paso.
 *
 * SINTAXIS
 * arr.reduce((acum, valor) => nuevoAcum, INICIAL)
 *
 * 🗣️ LAS PIEZAS
 * acum      → el acumulador: lo que llevas hasta ahora
 * valor     → el elemento actual del array
 * nuevoAcum → lo que valdrá el acumulador en el siguiente paso
 * INICIAL   → con qué arranca el acumulador
 *
 * El inicial casi siempre es el elemento neutro de la operación, el que no cambia
 * nada: sumar → 0 · multiplicar → 1 · concatenar → "" · AND lógico → true.
 *
 * 💡 El acumulador no tiene por qué ser del mismo tipo que los elementos: puedes
 * recorrer un string[] y acumular un number (drill 5).
 *
 * En todos, el starter tiene la forma del reduce, pero la operación (o el inicial)
 * está mal. Arregla solo lo necesario.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) sumar — suma todos los números. El starter nunca suma (devuelve el
 * acumulador sin tocarlo). Arregla la operación.
 *   sumar([1, 2, 3]) → 6 ; sumar([]) → 0
 */
export function sumar(nums: number[]): number {
  return nums.reduce((acum, actual) => acum + actual, 0);
}
sumar([2, 4, 6, 8, 10]); // resultado: 30

/* 2) producto — multiplica todos los números. La operación ya está bien...
 * pero el resultado siempre da 0. Arregla el inicial (¿cuál es el neutro de
 * multiplicar?).
 *   producto([2, 3, 4]) → 24 ; producto([5]) → 5 ; producto([]) → 1
 */
export function producto(nums: number[]): number {
  return nums.reduce((acum, actual) => acum * actual, 1);
}
producto([2, 4, 6]); // resultado: 48

/* 3) contarPares — cuántos números pares hay. Acumulador number, inicial 0,
 * pero sumas 1 solo cuando el valor es par (un ternario dentro del reduce).
 *   contarPares([1, 2, 3, 4]) → 2 ; contarPares([1, 3, 5]) → 0
 */
export function contarPares(nums: number[]): number {
  return nums.reduce((acum, actual) => acum + (actual % 2 === 0 ? 1 : 0), 0);
}
contarPares([2, 4, 6, 8, 10]); // resultado: 5 pares

/* 4) concatenar — pega todas las palabras en un solo string. Acumulador
 * string, inicial "". Arregla la operación.
 *   concatenar(["a", "b", "c"]) → "abc" ; concatenar([]) → ""
 */
export function concatenar(palabras: string[]): string {
  return palabras.reduce((acum, valor) => acum + valor, "");
}
concatenar(["Nicolás", "Villagrán"]); // resultado: "NicolásVillagrán"

/* 5) longitudTotal — suma de las longitudes de todas las palabras. Ojo:
 * recorres un string[] pero acumulas un number (cambio de tipo). El
 * valor aporta su .length.
 *   longitudTotal(["ab", "cde"]) → 5 ; longitudTotal([]) → 0
 */
export function longitudTotal(palabras: string[]): number {
  return palabras.reduce((acum, valor) => acum + valor.length, 0);
}
longitudTotal(["ab", "cde", "efg"]); // resultado: 8

/* 6) todosPositivos — ¿son todos los números mayores que 0? Acumulador
 * boolean, inicial el neutro del and (true), y en cada paso lo "apagas"
 * con && si el valor no es positivo.
 *   todosPositivos([1, 2, 3]) → true ; todosPositivos([1, -2, 3]) → false
 */
export function todosPositivos(nums: number[]): boolean {
  return nums.reduce((acum, valor) => acum && valor > 0, true);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — el campeón es un número: «compara y quédate con uno»
 *
 * DEFINICIÓN
 * Cuando el acumulador es «el ganador hasta ahora», imagina un torneo: cada
 * elemento entra y reta al campeón, y el que cumple la condición se queda.
 *
 * SINTAXIS
 * arr.reduce((campeon, retador) => elMejorDeLosDos, inicial)
 *
 * Si el campeón es un número, el inicial es un tope garantizado:
 * mínimo → Infinity  (cualquier número real es menor que él)
 * máximo → -Infinity (cualquier número real es mayor que él)
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) menorNumero — devuelve el número más pequeño del array. Compara cada
 * valor con el campeón acum y quédate con el menor. Inicial: el tope
 * garantizado para un mínimo.
 *   menorNumero([3, 1, 2]) → 1 ; menorNumero([5]) → 5
 */
export function menorNumero(nums: number[]): number {
  return nums.reduce((acum, valor) => {
    if (valor < acum) return valor;
    return acum;
  }, Infinity);
}
menorNumero([1, 2, 3, 9, 16]); // resultado: 1

/* 8) mayorNumero — el número más grande. Mismo patrón que el 7, con la
 * condición y el tope inicial invertidos.
 *   mayorNumero([3, 1, 2]) → 3 ; mayorNumero([5]) → 5
 */
export function mayorNumero(nums: number[]): number {
  return nums.reduce((acum, valor) => {
    if (valor > acum) return valor;
    return acum;
  }, -Infinity);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — el campeón es un objeto concreto
 *
 * Lo nuevo de verdad: si el campeón es un objeto, no hay «objeto tope» que
 * escribir. El truco:
 * · inicial undefined → «aún no hay campeón»;
 * · primer turno: si campeon === undefined, el primero que entra se corona;
 * · retorno … | undefined: array vacío → nadie se corona → sale undefined;
 * · se lo dices a mano: reduce<Tipo | undefined>(…).
 * ───────────────────────────────────────────────────────────────────────────── */

type Producto = { nombre: string; precio: number };

/* 9) masBarato — el producto de menor precio, o undefined si no hay ninguno.
 * El starter devuelve el primero (mal: el primero no tiene por qué ser el
 * más barato). Escribe el reduce campeón:
 *   - reduce<Producto | undefined>(..., undefined)
 *   - primer turno:  if (mejor === undefined) return actual
 *   - resto: compara actual.precio con mejor.precio, quédate con el menor
 *   masBarato([{nombre:"a",precio:30},{nombre:"b",precio:10}]) → {nombre:"b",precio:10}
 *   masBarato([]) → undefined
 */
export function masBarato(productos: Producto[]): Producto | undefined {
  return productos.reduce<Producto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor;
    }
    return valor.precio < acum.precio ? valor : acum;
  }, undefined);
}
masBarato([
  { nombre: "Coca Cola", precio: 100 },
  { nombre: "Pepsi", precio: 30 },
]); // resultado: { nombre: "Pepsi", precio: 30 }
masBarato([
  { nombre: "Papas Lays", precio: 50 },
  { nombre: "Pepsi", precio: 30 },
  { nombre: "Coca Cola", precio: 100 },
]);
// resultado: { nombre: "Pepsi", precio: 30}

/* 10) masCaro — el producto de mayor precio, o undefined. Espejo del 9:
 * cambia solo la comparación.
 *  masCaro([{nombre:"a",precio:30},{nombre:"b",precio:10}]) → {nombre:"a",precio:30}
 */
export function masCaro(productos: Producto[]): Producto | undefined {
  return productos.reduce<Producto | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor;
    }
    return valor.precio > acum.precio ? valor : acum;
  }, undefined);
}

type Jugador = { nombre: string; vidas: number };
/* 11) conMenosVidas — el jugador con menos vidas, o undefined. Mismo patrón
 * que el 9, otro contexto: ahora la propiedad numérica se llama vidas.
 *  conMenosVidas([{nombre:"ana",vidas:3},{nombre:"leo",vidas:1}]) → {nombre:"leo",vidas:1}
 */
export function conMenosVidas(jugadores: Jugador[]): Jugador | undefined {
  return jugadores.reduce<Jugador | undefined>((acum, valor) => {
    if (acum === undefined) {
      return valor;
    }
    return valor.vidas < acum.vidas ? valor : acum;
  }, undefined);
}
conMenosVidas([
  { nombre: "Joel", vidas: 3 },
  { nombre: "Ellie", vidas: 1 },
]); // resultado: { nombre: "Ellie", vidas: 1 }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — la clave variable: el dúo genérico (esto ya es el drill 8 del 01)
 *
 * Ahora la columna a comparar la elige quien llama. El cuerpo ya está escrito (es
 * el patrón campeón que dominaste en A y B); tú solo aprietas la firma con el dúo
 * del 01:
 * <Clave extends string, Objeto extends Record<Clave, number>>
 *
 * El typecheck queda rojo («Clave no indexa Objeto») hasta que lo pongas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 12) menorPor — el objeto con el menor valor en la columna clave. Es el
 * gemelo exacto de exercise-01 drill 8 (minimoPor). Aprieta la firma.
 *  menorPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"b",v:1}
 */
export function menorPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual;
    }
    return actual[clave] < mejor[clave] ? actual : mejor;
  }, undefined);
}
menorPor(
  [
    { n: "a", v: 3 },
    { n: "b", v: 1 },
  ],
  "v",
); // { n: "b", v: 1 }
menorPor([], "v"); // undefined

/* 13) mayorPor — el objeto con el mayor valor en clave. Es el espejo: el
 * mismísimo maximoPor del E1 del parcial. Mismo dúo, cuerpo con >.
 *  mayorPor([{n:"a",v:3},{n:"b",v:1}], "v") → {n:"a",v:3}
 */
export function mayorPor<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>(
  arr: Objeto[],
  clave: Clave,
): Objeto | undefined {
  return arr.reduce<Objeto | undefined>((mejor, actual) => {
    if (mejor === undefined) {
      return actual;
    }
    return actual[clave] > mejor[clave] ? actual : mejor;
  }, undefined);
}
mayorPor(
  [
    { n: "a", v: 3 },
    { n: "b", v: 1 },
  ],
  "v",
); // { n: "a", v: 3 }
