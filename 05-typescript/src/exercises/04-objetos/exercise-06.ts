/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres primos de `Object` (sobre `{ a: 1, b: 5, c: 3 }`):
 *
 *   Object.keys(obj)     // → ["a", "b", "c"]              los NOMBRES (siempre strings)
 *   Object.values(obj)   // → [1, 5, 3]                    los VALORES (aquí, números)
 *   Object.entries(obj)  // → [["a",1], ["b",5], ["c",3]]  los PARES [nombre, valor]
 *
 * 🧠 Un casillero con etiquetas: keys = las etiquetas · values = lo de dentro ·
 *    entries = etiqueta + contenido, juntos, casillero por casillero.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * EJERCICIO 06 — Objetos: diccionarios `Record<string, number>` (contar y leer)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un `Record<string, number>` es un diccionario: claves de texto → números. Sirve
 * para CONTAR (cuántas veces aparece cada cosa) e INDEXAR. La joya de la corona es
 * construirlo con `reduce` y un objeto acumulador — un patrón que verás por todos
 * lados. Pero ese `reduce` NO es una cosa: son CINCO mecanismos apilados. Así que
 * esta escalera los desarma uno por uno, del más simple al más complejo, y recién
 * al final los junta. No corras: cada peldaño se entiende solo.
 *
 * 🧠 ANALOGÍA MADRE (la hoja de conteo con palotes): contar es llevar un cuaderno.
 *    Por cada aparición buscas su fila y sumas un palote (si la fila no existía,
 *    empieza en 0). La regla rara: en cada vuelta NO tachas la hoja vieja —
 *    fotocopias la hoja entera y escribes el palote en la copia. La hoja en blanco
 *    del principio es el `{}`.
 *
 * OJO — con `noUncheckedIndexedAccess`, `obj[clave]` es `number | undefined`
 *    (la clave podría no existir). Por eso al leer usas `?? 0` o un guard.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 16. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-06.test.ts
 * ===========================================================================*/


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — COPIAR y PISAR (spread `{ ...obj }`, sin reduce, sin flechas)
 * ════════════════════════════════════════════════════════════════════════════
 * El spread `{ ...obj }` COPIA todas las propiedades de `obj` en un objeto nuevo.
 * Regla de oro: si una clave se repite, GANA LA ÚLTIMA escrita.
 */

// 1) `copiar` — una copia NUEVA del objeto (no el mismo objeto: una copia).
//    copiar({ a: 1 }) → { a: 1 }   (pero es otra referencia, no muta el original)
export function copiar(obj: Record<string, number>): Record<string, number> {
  return { ...obj }
}
// copiar({ a: 10 }) // return: { a: 10 }

// 2) `conTotal` — copia del objeto MÁS una propiedad nueva `total: 10`.
//    Clave FIJA, escrita a mano. (Aquí todavía no hay llaves calculadas.)
//    conTotal({ a: 1 }) → { a: 1, total: 10 }
export function conTotal(obj: Record<string, number>): Record<string, number> {
  return { ...obj, total: 10 }
}
// conTotal({ a: 1 }) // ->

// 3) `pisarA` — copia del objeto, pero con `a` valiendo 99 pase lo que pase.
//    El spread va primero, así que lo que escribas DESPUÉS lo pisa.
//    pisarA({ a: 1, b: 2 }) → { a: 99, b: 2 } ; pisarA({ b: 2 }) → { b: 2, a: 99 }
export function pisarA(obj: Record<string, number>): Record<string, number> {
  return { ...obj, a: 99 }
}
// pisarA({ a: 1, b: 2 }) // -> return: { a: 99, b: 2 }
// pisarA({ b: 2 }) // -> return: { b: 2, a: 99 }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LLAVE CALCULADA `[algo]:`
 * ════════════════════════════════════════════════════════════════════════════
 * ⚠️ LA TRAMPA:
 *      { clave: valor }    → la propiedad se llama literalmente "clave"  ❌
 *      { [clave]: valor }  → la propiedad se llama LO QUE VALGA `clave`  ✅
 * Los corchetes en la posición del NOMBRE significan "no uses este texto, usa el
 * CONTENIDO de esta variable".
 */

// 4) `unaClave` — un objeto con UNA propiedad, cuyo NOMBRE viene en la variable.
//    unaClave("hola", 3) → { hola: 3 }   (NO { clave: 3 })
export function unaClave(clave: string, valor: number): Record<string, number> {
  return { [clave]: valor }
}
// unaClave("hola", 3) // -> return: { hola: 3 } (La clave es a la vez el nombre de la propiedad)
// unaClave("x", 0) // -> return: { x: 0 }

// 5) `ponerClave` — copia del objeto + la propiedad `[clave]: valor`.
//    Ahora sí: spread (1) + llave calculada (4), juntos.
//    ponerClave({ a: 1 }, "b", 2) → { a: 1, b: 2 }
//    ponerClave({ a: 1 }, "a", 9) → { a: 9 }        ← pisa, como en (3)
export function ponerClave(obj: Record<string, number>, clave: string, valor: number): Record<string, number> {
  return { ...obj, [clave]: valor }
}
// ponerClave({ a: 1 }, "b", 2) // -> { a: 1, b: 2 }
// ponerClave({ a: 1 }, "a", 9) // -> { a: 9 }
// ponerClave({ a: 19 }, "a", 1) // -> { a: 1 } La segunda pisa a la primera. No importa si el número es más grande

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — LEER con respaldo (`?? 0`) y el operador `in`
 * ════════════════════════════════════════════════════════════════════════════
 * Con `noUncheckedIndexedAccess`, `obj[clave]` es `number | undefined`. Necesitas
 * respaldar la AUSENCIA (no la falsedad): el operador es `??`, no `||`.
 */

// 6) `leerOCero` — el valor de la clave, o 0 si no existe.
//    leerOCero({ a: 5 }, "a") → 5 ; leerOCero({}, "x") → 0 ; leerOCero({ a: 0 }, "a") → 0
export function leerOCero(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0 // El valor de clave está dentro de obj? Si si, devuelve ese valor. Si no, devuelve 0
}
// leerOCero({ a: 5 }, "a") // -> 5
// leerOCero({}, "x") // -> 0
// leerOCero({ a: 0 }, "a") // -> 0

// 7) `cuantasVeces` — el valor de una clave, o 0 si no existe. (Mismo patrón que 6:
//    refuerzo, para que el `?? 0` se te haga automático.)
//    cuantasVeces({ a: 2 }, "a") → 2 ; cuantasVeces({}, "x") → 0
export function cuantasVeces(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0
}
// cuantasVeces({ a: 2 }, "a") // -> 2
// cuantasVeces({}, "x") // -> 0

// 8) `tieneClave` — ¿existe esa clave en el diccionario? (usa el operador `in`)
//    tieneClave({ a: 1 }, "a") → true ; tieneClave({ a: 1 }, "b") → false
export function tieneClave(obj: Record<string, number>, clave: string): boolean {
  return clave in obj
}
// tieneClave({ a: 1 }, "a") // -> true
// tieneClave({ a: 1 }, "b") // -> false

// 9) `clavesConValorMayorQue` — las claves cuyo valor supera `limite`.
//    (Object.keys da las claves; filtras leyendo con respaldo, como en 6.)
//    clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) → ["b", "c"]
export function clavesConValorMayorQue(obj: Record<string, number>, limite: number): string[] {
  return Object.keys(obj) // Recibe: { a: 1, b: 5, c: 3 } y devuelve: ["a", "b", "c"]
    .filter(clave => (obj[clave] ?? 0) > limite) // Recibe todas las claves y devuelve solo las que cumplen la condicion de que valor > limite -> ["b", "c"]
}
// clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — UNA VUELTA del reduce, a mano
 * ════════════════════════════════════════════════════════════════════════════
 */

// 10) ⭐ `sumarUno` — copia del objeto con UN palote más en la fila de `clave`.
//     ESTE ES EL DRILL CLAVE: es EXACTAMENTE una vuelta del reduce que armarás en
//     el bloque 6, pero escrita a mano, sin reduce y sin flecha. Junta el bloque 2
//     (copiar + llave calculada) con el bloque 3 (leer con respaldo).
//     sumarUno({ a: 1 }, "a") → { a: 2 }       (la fila existía: 1 + 1)
//     sumarUno({ a: 1 }, "b") → { a: 1, b: 1 } (la fila NO existía: 0 + 1)
//     sumarUno({}, "z") → { z: 1 }
export function sumarUno(obj: Record<string, number>, clave: string): Record<string, number> {
  return { ...obj, [clave]: (obj[clave] ?? 0) + 1 } // Retorno un objeto nuevo con spread. Si la clave no existe, está en 0 y le sumo 1, si existe, le sumo 1
}
// sumarUno({ a: 1 }, "a") // -> { a: 2 } -> Ya existía, le sumo 1
// sumarUno({ a: 1 }, "b") // -> { a: 1, b: 1 } -> No existia, le sumo 1 y se crea
// sumarUno({}, "z") // -> { z: 1 } -> No existia, le sumo 1 y se crea


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — EL PARÉNTESIS de la flecha (la trampa más fea de JS)
 * ════════════════════════════════════════════════════════════════════════════
 *      (n) => { valor: n }     ❌ NO devuelve un objeto. La `{` se lee como el
 *                                 CUERPO de la función (un bloque), no como objeto.
 *                                 Devuelve `undefined`.
 *      (n) => ({ valor: n })   ✅ Los paréntesis dicen "esto es una EXPRESIÓN".
 *    Regla: si una flecha devuelve un objeto literal sin `return`, VA ENVUELTO
 *    EN PARÉNTESIS. Siempre.
 */

// 11) `envolverTodos` — cada número, metido en un objeto `{ valor: n }`.
//     Escribe primero la versión MALA a propósito (sin paréntesis), corre el test,
//     y MIRA el fallo con tus ojos. Luego añade los paréntesis.
//     envolverTodos([1, 2]) → [{ valor: 1 }, { valor: 2 }] ; envolverTodos([]) → []
export function envolverTodos(ns: number[]): { valor: number }[] {
  return ns.map((n) => ({ valor: n }))
}
// envolverTodos([1, 2]) // -> [{ valor: 1 }, { valor: 2 }]
// envolverTodos([]) // -> []
// envolverTodos([1, 2, 3]) // -> [{ valor: 1 }, { valor: 2 }, { valor: 3 }]


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — YA CON REDUCE (juntar las 5 piezas)
 * ════════════════════════════════════════════════════════════════════════════
 * El reduce recorre la lista arrastrando un ACUMULADOR. El callback recibe
 * (acumulador, elemento) y DEVUELVE el acumulador nuevo (¡con paréntesis!). El
 * segundo argumento de reduce es el acumulador INICIAL: la hoja en blanco `{}`.
 * `<Record<string, number>>` le dice a TS de qué tipo es ese acumulador.
 */

// 12) `contar` — cuántas veces aparece cada palabra. Escríbelo INLINE dentro del
//     reduce (la vuelta de sumarUno, pero como flecha con paréntesis).
//     contar(["a", "b", "a"]) → { a: 2, b: 1 } ; contar([]) → {}
export function contar(palabras: string[]): Record<string, number> {
  return palabras.reduce<Record<string, number>>((acumulador, palabra) => ({ ...acumulador, [palabra]: (acumulador[palabra] ?? 0) + 1 }), {})
}
// contar(["a", "b", "a"]) // ->

// 13) `contarBis` — el MISMO resultado que 12, pero ahora el callback del reduce
//     es tu `sumarUno` (10) convertido en flecha. (Refuerzo: ver que el reduce no
//     es más que aplicar sumarUno en cada vuelta.)
//     contarBis(["a", "b", "a"]) → { a: 2, b: 1 } ; contarBis([]) → {}
export function contarBis(palabras: string[]): Record<string, number> {
  return palabras.reduce((acumulador, palabra) => sumarUno(acumulador, palabra), {})
}
// contarBis(["a", "b", "a"]) // ->

// 14) `sumarPorClave` — mismo patrón, pero en vez de sumar 1 sumas el VALOR que
//     viene en cada par. Recorres TUPLAS, así que en el callback desempaquetas:
//     `(acumulador, [clave, valor]) => ...`  ← ¡no tires el valor!
//     sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) → { a: 11, b: 2 }
//     sumarPorClave([]) → {}
export function sumarPorClave(pares: [string, number][]): Record<string, number> {
  return pares.reduce<Record<string, number>>((acumulador, [clave, valor]) => ({ ...acumulador, [clave]: (acumulador[clave] ?? 0) + valor }), {})
}
// sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) // -> { a: 11, b: 2 }
// sumarPorClave([]) // -> {}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 7 — CAPSTONE: el campeón
 * ════════════════════════════════════════════════════════════════════════════
 * El reduce-campeón: el acumulador es el "campeón provisional", empezando en
 * `undefined`. En cada vuelta, si no hay campeón todavía O el actual supera al
 * campeón, el actual pasa a ser el nuevo campeón.
 */

// 15) `campeon` — la clave con el valor MÁS ALTO, o `undefined` si el objeto vacío.
//     Recorres las entries (`Object.entries` → pares [clave, valor]) con un reduce
//     cuyo acumulador es `[string, number] | undefined`, empezando en `undefined`.
//     Al final devuelves solo su CLAVE.
//     campeon({ a: 1, b: 9, c: 5 }) → "b" ; campeon({ solo: 3 }) → "solo" ; campeon({}) → undefined
export function campeon(obj: Record<string, number>): string | undefined {
  return Object.entries(obj).reduce<[string, number] | undefined>((campeon, [clave, valor]) => (campeon === undefined || valor > campeon[1] ? [clave, valor] : campeon), undefined)?.[0]
}
// campeon({ a: 1, b: 9, c: 5 }) // -> "b"
// campeon({ solo: 3 }) // -> "solo"
// campeon({}) // -> undefined

// 16) `masFrecuente` — la palabra que más se repite, o undefined si la lista vacía.
//     El capstone final: NO es una pieza nueva. Es `contar` (12) para armar el
//     diccionario + `campeon` (15) para sacar la clave ganadora. Reúsalos.
//     masFrecuente(["a", "b", "a", "a"]) → "a" ; masFrecuente([]) → undefined
export function masFrecuente(palabras: string[]): string | undefined {
  return campeon(contar(palabras))
}
// masFrecuente(["a", "b", "a", "a"]) // -> "a"
