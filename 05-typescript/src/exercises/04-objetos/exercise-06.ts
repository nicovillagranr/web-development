/* =============================================================================
 * EJERCICIO 06 — Objetos: diccionarios `Record<string, number>` (contar y leer)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Un `Record<string, number>` es un diccionario: claves de texto → números. Sirve
 * para CONTAR (cuántas veces aparece cada cosa) e INDEXAR. Construirlo con `reduce`
 * y un objeto acumulador es un patrón que verás por todos lados.
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 *     ["a", "b", "a"].reduce<Record<string, number>>(
 *       (acc, p) => ({ ...acc, [p]: (acc[p] ?? 0) + 1 }),   // suma 1 a la clave [p]
 *       {},                                                  // diccionario vacío
 *     )                                                      // → { a: 2, b: 1 }
 *
 * 🧠 ANALOGÍA: una hoja de conteo con palotes. Por cada aparición, buscas su fila
 *    y sumas un palote (si la fila no existía, empieza en 0 → `?? 0`).
 *
 * OJO — con `noUncheckedIndexedAccess`, `obj[clave]` es `number | undefined`
 *    (la clave podría no existir). Por eso al leer usas `?? 0` o un guard.
 *    La llave calculada `[p]` usa el VALOR de `p` como nombre de propiedad.
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-06.test.ts
 * ===========================================================================*/


/* --- BLOQUE A — construir el diccionario contando --- */

// 1) `contar` — cuántas veces aparece cada palabra.
//    contar(["a", "b", "a"]) → { a: 2, b: 1 }
export function contar(palabras: string[]): Record<string, number> {
  return palabras.reduce<Record<string, number>>((acumulador, palabra) => ({ ...acumulador, [palabra]: (acumulador[palabra] ?? 0) + 1 }), {})
}
contar(["Coca Cola", "Pepsi", "Limon Soda"]) // ->

/* --- BLOQUE B — leer el diccionario (con guard) --- */

// 2) `cuantasVeces` — el valor de una clave, o 0 si no existe (cuida el undefined).
//    cuantasVeces({ a: 2 }, "a") → 2 ; cuantasVeces({}, "x") → 0
export function cuantasVeces(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0
}

// 3) `tieneClave` — ¿existe esa clave en el diccionario? (usa el operador `in`)
//    tieneClave({ a: 1 }, "a") → true ; tieneClave({ a: 1 }, "b") → false
export function tieneClave(obj: Record<string, number>, clave: string): boolean {
  return clave in obj
}

// 4) `clavesConValorMayorQue` — las claves cuyo valor supera `limite`.
//    clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) → ["b", "c"]
export function clavesConValorMayorQue(obj: Record<string, number>, limite: number): string[] {
  return Object.keys(obj).filter(clave => (obj[clave] ?? 0) > limite)
}

/* --- BLOQUE C — CAPSTONE: contar + encontrar el campeón --- */

// 5) `masFrecuente` — la palabra que más se repite, o undefined si la lista vacía.
//    (reusa `contar` + reduce-campeón sobre los pares)
//    masFrecuente(["a", "b", "a", "a"]) → "a" ; masFrecuente([]) → undefined
export function masFrecuente(palabras: string[]): string | undefined {
  // const campeon = 0
  return palabras.reduce<Record<string, number>>((acumulador, palabra) => ({ ...acumulador, [palabra]: (acumulador[palabra] ?? 0) + 1 }), {})
}

/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE R — ESCALERA DE REFUERZO: desarmar el reduce-a-objeto del drill 1
 * ════════════════════════════════════════════════════════════════════════════
 *
 * La línea que te atraganta:
 *
 *     .reduce<Record<string, number>>(
 *       (acumulador, palabra) => ({ ...acumulador, [palabra]: (acumulador[palabra] ?? 0) + 1 }),
 *       {},
 *     )
 *
 * No es UNA cosa. Son CINCO mecanismos apilados, y cada uno se entiende solo:
 *
 *   1. `{ ...acumulador }`     → COPIAR el objeto entero (spread)
 *   2. `[palabra]:`            → LLAVE CALCULADA: el nombre de la propiedad no es
 *                                 "palabra", es el VALOR que lleva `palabra` dentro
 *   3. `acumulador[palabra] ?? 0` → LEER con respaldo (la clave puede no existir)
 *   4. `=> ({ ... })`          → los PARÉNTESIS que envuelven el objeto (¡ojo aquí!)
 *   5. `{}` al final           → el ACUMULADOR INICIAL (2º argumento de reduce)
 *
 * 🧠 ANALOGÍA (la hoja de conteo con palotes): en cada vuelta NO tachas la hoja
 *    vieja. Fotocopias la hoja entera (1), buscas la fila de esa palabra (2), miras
 *    cuántos palotes tenía —cero si la fila no existía— (3), y escribes uno más.
 *    Entregas la fotocopia nueva. La hoja en blanco del principio es el `{}` (5).
 *
 * ⚠️ EL PARÉNTESIS (mecanismo 4) — la trampa más fea de JavaScript:
 *
 *      (n) => { valor: n }     ❌ NO devuelve un objeto. La `{` se lee como el
 *                                 CUERPO de la función (un bloque de código), no
 *                                 como un objeto. Devuelve `undefined`.
 *      (n) => ({ valor: n })   ✅ Los paréntesis dicen "esto es una EXPRESIÓN, no
 *                                 un bloque". Ahora sí devuelve el objeto.
 *
 *    Regla: si una flecha devuelve un objeto literal sin escribir `return`, el
 *    objeto VA ENVUELTO EN PARÉNTESIS. Siempre.
 *
 * La escalera sube: copiar → llave calculada → leer con respaldo → UN PASO a mano
 * → el paréntesis → el reduce entero. ❌ Prohibido `any` y `as`.
 * ==========================================================================*/

/* ── R-A — COPIAR y PISAR (sin reduce, sin flechas) ── */

// R1) `copiar` — una copia nueva del objeto (no el mismo objeto: una copia).
//     copiar({ a: 1 }) → { a: 1 }
export function copiar(obj: Record<string, number>): Record<string, number> {
  return { ...obj } // Recibe: { a: 1 } y devuelve: { a: 1 }, pero sin mutar el original. Es un objeto nuevo
}
copiar({ a: 10 }) // -> { a: 10 }

// R2) `conTotal` — copia del objeto MÁS una propiedad nueva `total: 10`.
//     Clave FIJA, escrita a mano. (Aquí todavía no hay llaves calculadas.)
//     conTotal({ a: 1 }) → { a: 1, total: 10 }
export function conTotal(obj: Record<string, number>): Record<string, number> {
  return { ...obj, total: 10 } // Recibe: { a: 1 } y devuelve: { a: 1, total: 10 }, pero sin mutar el original. Es un objeto nuevo y con total: 10 fijo
}

// R3) `pisarA` — copia del objeto, pero con `a` valiendo 99 pase lo que pase.
//     Regla de oro: si una clave se repite, GANA LA ÚLTIMA. El spread va primero,
//     así que lo que escribas después lo pisa.
//     pisarA({ a: 1, b: 2 }) → { a: 99, b: 2 } ; pisarA({ b: 2 }) → { b: 2, a: 99 }
export function pisarA(obj: Record<string, number>): Record<string, number> {
  return { ...obj, a: 99 } // Recibe: { a: 1, b: 2 } y devuelve: { a: 99, b: 2 }, pero sin mutar el original. Es un objeto nuevo. Da igual lo que hay en a, porque 99 lo pisará. Igualmente no importa lo que valga B, saldrá igual
}
pisarA({ a: 1, b: 2 }) // -> { a: 99, b: 2 }
pisarA({ b: 2 }) // -> { b: 2, a: 99 }

/* ── R-B — LLAVE CALCULADA: `[algo]:` ── */

// R4) `unaClave` — un objeto con UNA propiedad, cuyo NOMBRE viene en la variable.
//
//     ⚠️ OJO A LA TRAMPA:
//        { clave: valor }    → la propiedad se llama literalmente "clave"  ❌
//        { [clave]: valor }  → la propiedad se llama LO QUE VALGA `clave`  ✅
//
//     Los corchetes en la posición del NOMBRE significan "no uses este texto,
//     usa el CONTENIDO de esta variable". Es lo contrario del corchete que
//     desempaqueta (`[clave, valor]` del ejercicio anterior): aquel ABRÍA, este
//     CALCULA un nombre.
//     unaClave("hola", 3) → { hola: 3 }   (NO { clave: 3 })
export function unaClave(clave: string, valor: number): Record<string, number> {
  return { [clave]: valor } // Recibe: un string y un number y los retorna en un objeto cuyo clave es el string y el valor es el number
}
unaClave("hola", 3) // -> { hola: 3 }
unaClave("clave", 3) // -> { clave: 3 }
unaClave("x", 0) // -> { x: 0 }

// R5) `ponerClave` — copia del objeto + la propiedad `[clave]: valor`.
//     Ahora sí: spread (R1) + llave calculada (R4), juntos.
//     ponerClave({ a: 1 }, "b", 2) → { a: 1, b: 2 }
//     ponerClave({ a: 1 }, "a", 9) → { a: 9 }        ← pisa, como en R3
export function ponerClave(obj: Record<string, number>, clave: string, valor: number,): Record<string, number> {
  return { ...obj, [clave]: valor }
}
ponerClave({ a: 1 }, "b", 2) // -> { a: 1, b: 2 }
ponerClave({ a: 1 }, "a", 9) // -> { a: 9 }

/* ── R-C — LEER con respaldo, y UN PASO del reduce a mano ── */

// R6) `leerOCero` — el valor de la clave, o 0 si no existe.
//     Recuerda: con `noUncheckedIndexedAccess`, `obj[clave]` es `number | undefined`.
//     Necesitas respaldar la AUSENCIA (no la falsedad): el operador es `??`, no `||`.
//     leerOCero({ a: 5 }, "a") → 5 ; leerOCero({}, "x") → 0
export function leerOCero(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0
}

// R7) ⭐ `sumarUno` — copia del objeto con UN palote más en la fila de `clave`.
//     ESTE ES EL DRILL CLAVE: es EXACTAMENTE una vuelta del reduce del drill 1,
//     pero escrita a mano, sin reduce, sin flecha y sin paréntesis raros.
//     Junta R5 (copiar + llave calculada) con R6 (leer con respaldo).
//     sumarUno({ a: 1 }, "a") → { a: 2 }     (la fila existía: 1 + 1)
//     sumarUno({ a: 1 }, "b") → { a: 1, b: 1 } (la fila NO existía: 0 + 1)
export function sumarUno(obj: Record<string, number>, clave: string): Record<string, number> {
  return { ...obj, [clave]: (obj[clave] ?? 0) + 1 } // Crea un nuevo objeto con el spread. Luego evalúa si la clave existe, y si no, le pone 0
}
sumarUno({ a: 1 }, "a") // -> { a: 2 }
sumarUno({ a: 1 }, "b") // -> { a: 1, b: 1 }

/* ── R-D — EL PARÉNTESIS de la flecha ── */

// R8) `envolverTodos` — cada número, metido en un objeto `{ valor: n }`.
//     Aquí te vas a estrellar con la trampa si no lees el aviso de arriba:
//       .map((n) => { valor: n })    ❌ devuelve [undefined, undefined]
//       .map((n) => ({ valor: n }))  ✅
//     Escribe primero la versión mala a propósito, corre el test, y MIRA el fallo.
//     Luego añade los paréntesis. Quiero que veas el error con tus ojos.
//     envolverTodos([1, 2]) → [{ valor: 1 }, { valor: 2 }]
export function envolverTodos(ns: number[]): { valor: number }[] {
  return ns.map((n) => ({ valor: n }))
}
envolverTodos([1, 2]) // -> [{ valor: 1 }, { valor: 2 }]

/* ── R-E — YA CON REDUCE ── */

// R9) `contarBis` — reconstruye el drill 1 tú mismo, ahora que tienes las piezas.
//     El callback del reduce es tu `sumarUno` (R7) convertido en flecha: recibe el
//     acumulador y la palabra, y DEVUELVE el objeto nuevo (¡con paréntesis!).
//     El `{}` del final es la hoja en blanco: el acumulador inicial.
//     El `<Record<string, number>>` le dice a TS de qué tipo es el acumulador.
//     contarBis(["a", "b", "a"]) → { a: 2, b: 1 } ; contarBis([]) → {}
export function contarBis(palabras: string[]): Record<string, number> {
  return { ...palabras.reduce((acumulador, palabra) => sumarUno(acumulador, palabra), {}) }
}
contarBis(["a", "b", "a"]) // -> { a: 2, b: 1 }
contarBis([]) // -> {}

// R10) `sumarPorClave` — mismo patrón, pero en vez de sumar 1 sumas el valor que
//      viene en cada par. Recorres TUPLAS, así que en el callback desempaquetas
//      igual que en el ejercicio anterior: `(acumulador, [clave, valor]) => ...`
//      sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) → { a: 11, b: 2 }
export function sumarPorClave(pares: [string, number][]): Record<string, number> {
  return { ...pares.reduce((acumulador, [clave,]) => sumarUno(acumulador, clave), {}) }
}
sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) // -> { a: 11, b: 2 }

/* ── R-F — CAPSTONE: el campeón (te prepara el drill 5) ── */

// R11) `campeon` — la clave con el valor MÁS ALTO, o `undefined` si el objeto vacío.
//      Mismo patrón que `mayorPor` de 06-generics: un reduce cuyo acumulador es
//      `[string, number] | undefined` (el campeón provisional), empezando en
//      `undefined`. En cada vuelta: si no hay campeón todavía, o el actual supera al
//      campeón, el actual pasa a ser el nuevo campeón.
//      Al final devuelves solo su CLAVE (o undefined si nunca hubo campeón).
//      campeon({ a: 1, b: 9, c: 5 }) → "b" ; campeon({}) → undefined
export function campeon(obj: Record<string, number>): string | undefined {
  return
}
