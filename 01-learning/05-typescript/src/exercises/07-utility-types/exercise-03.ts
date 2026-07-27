/* =============================================================================
 * EJERCICIO 03 — EL CAMPEÓN, paso a paso: del BUCLE al REDUCE
 * =============================================================================
 *
 * 🟢 POR QUÉ EXISTE ESTE ARCHIVO
 * ----------------------------------------------------------------------------
 * El drill 7 de exercise-02 (`menorNumero`) se atascó: la lógica de "arrastrar
 * un campeón a lo largo del array" se hace bola cuando va escondida dentro de
 * `reduce`. Aquí la sacamos a la luz: primero la escribes como un BUCLE `for`
 * normal (que ya dominas de JS), y luego ves que `reduce` es EXACTAMENTE ese
 * bucle, plegado.
 *
 *
 * ▸ EXPLICACIÓN — un campeón es un bucle con UNA variable que vas pisando
 * ----------------------------------------------------------------------------
 * Buscar el menor (o el mayor, o el más largo...) es siempre lo mismo:
 *
 *     let campeon = <tope inicial>          // arranca en un valor que cualquiera vence
 *     for (const retador of lista) {        // entra cada elemento, uno a uno
 *       if (retador GANA a campeon) {        // ¿el nuevo supera al actual?
 *         campeon = retador                  // sí → se corona (pisas la variable)
 *       }                                    // no → no haces nada, sigue el de antes
 *     }
 *     return campeon
 *
 * `reduce` es ESE bucle con dos cosas escondidas:
 *     - el `campeon` (la variable que sobrevive)  →  es el `acum`
 *     - `campeon = retador` (pisar la variable)    →  es lo que `return`-as:
 *       LO QUE DEVUELVES EN UN TURNO SE CONVIERTE EN EL `acum` DEL SIGUIENTE.
 *
 * Por eso un reduce campeón tiene SIEMPRE esta forma:
 *     (acum, valor) => {
 *       if (valor GANA a acum) return valor   // "se corona" = lo devuelvo
 *       return acum                            // "sigue el campeón" = devuelvo el de antes
 *     }
 *
 *
 * ▸ EJERCICIO — escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Bloque A (1–3): con BUCLE `for`. Completa la línea marcada con 👉.
 * Bloque B (4–6): el MISMO problema con `reduce`. Tienes el bucle al lado como
 *   referencia: tradúcelo. El starter va MAL (nunca corona) → test ROJO.
 * ===========================================================================*/


/* ---------------------------------------------------------------------------
 * BLOQUE A — con BUCLE `for` (terreno conocido: una variable que pisas)
 * -------------------------------------------------------------------------- */

// 1) `mayorBucle` — el número más grande, con un for. El campeón y el inicial
//    ya están; el cuerpo del bucle está VACÍO. Escribe la coronación: si el
//    retador supera al campeón, písalo.
//      mayorBucle([3, 1, 2]) → 3 ; mayorBucle([5]) → 5

// infinity = el número más grande posible
// -infinity = el número más pequeño posible

// Esta función recibe un array de números. Se define una variable mayor que es el número más pequeño posible para hacer una comparación.
// Se saca cada valor del array y se compara con el mayor. Si el valor es mayor que el mayor, se reemplaza el mayor por el valor actual.
// Cuando se termina de recorrer todo el array de numbers, se devuelve el mayor.
export function mayorBucle(nums: number[]): number {
  let mayor = -Infinity
  for (const valor of nums) {
    if (valor > mayor) {
      mayor = valor
    }
  }
  return mayor
}
mayorBucle([3, 1, 2]) // El mayor del bucle es 3


// 2) `menorBucle` — el número más pequeño, con for. Ahora TÚ pones las tres
//    piezas: el inicial (el starter está MAL: 0 no es el tope de un mínimo),
//    y la coronación dentro del bucle.
//      menorBucle([3, 1, 2]) → 1 ; menorBucle([5]) → 5
export function menorBucle(nums: number[]): number {
  let menor = Infinity
  for (const valor of nums) {
    if (valor < menor) {
      menor = valor
    }
  }
  return menor
}

// 3) `masLargaBucle` — la palabra MÁS LARGA, con for. El campeón se compara por
//    `.length` (un valor derivado), pero lo que guardas/devuelves es la PALABRA
//    entera. Inicial: "" (length 0, cualquier palabra la supera).
//      masLargaBucle(["sol", "luna", "mar"]) → "luna" ; masLargaBucle([]) → ""
export function masLargaBucle(palabras: string[]): string {
  let masLarga = ""
  for (const palabra of palabras) {
    if (palabra.length > masLarga.length) {
      masLarga = palabra
    }
  }
  return masLarga
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — el MISMO problema con `reduce` (el bucle de arriba, plegado)
 * ---------------------------------------------------------------------------
 * Traduce tu bucle. Recuerda la regla escondida: lo que DEVUELVES es el `acum`
 * del turno siguiente. `campeon = retador` se vuelve `return valor`.
 * -------------------------------------------------------------------------- */

// 4) `mayorReduce` — igual que el drill 1, con reduce. El starter nunca corona
//    (devuelve `acum` siempre). Tradúcelo:
//      bucle:   if (valor > mayor) mayor = valor
//      reduce:  if (valor > acum) return valor ;  return acum
export function mayorReduce(nums: number[]): number {
  return nums.reduce((acum, valor) => (valor > acum ? valor : acum), -Infinity)
}

// 5) `menorReduce` — igual que el drill 2, con reduce. Mismo molde, invertido.
//      menorReduce([3, 1, 2]) → 1 ; menorReduce([5]) → 5
export function menorReduce(nums: number[]): number {
  return nums.reduce((acum, valor) => (valor < acum ? valor : acum), Infinity)
}

// 6) `masLargaReduce` — igual que el drill 3, con reduce. Compara por `.length`,
//    devuelve la palabra entera. Inicial "".
//      masLargaReduce(["sol", "luna", "mar"]) → "luna"
export function masLargaReduce(palabras: string[]): string {
  return palabras.reduce((acum, palabra) => (palabra.length > acum.length ? palabra : acum), "")
}
