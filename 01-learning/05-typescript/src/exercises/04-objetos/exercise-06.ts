/* =============================================================================
 * EJERCICIO 06 — objetos: diccionarios Record<string, number> (contar y leer) · bloque 04
 *
 * 📌 RECORDATORIO — los tres primos de Object, sobre obj = { a: 1, b: 5, c: 3 }:
 * Object.keys(obj)    → ["a", "b", "c"]: los nombres (siempre strings)
 * Object.values(obj)  → [1, 5, 3]: los valores
 * Object.entries(obj) → [["a", 1], ["b", 5], ["c", 3]]: los pares [nombre, valor]
 *
 * 🎯 OBJETIVOS
 * · Copiar y pisar con spread, y crear propiedades con una llave calculada [clave].
 * · Leer un diccionario con respaldo (?? 0) y comprobar claves con in.
 * · Contar con reduce y un objeto acumulador, y sacar el campeón.
 *
 * 🟢 CONTEXTO — un Record<string, number> es un diccionario: claves de texto →
 * números. Sirve para contar e indexar, y la joya de la corona es construirlo con
 * reduce y un objeto acumulador. Pero ese reduce no es una cosa: son cinco
 * mecanismos apilados, y esta escalera los desarma uno por uno antes de juntarlos.
 * No corras: cada peldaño se entiende solo.
 *
 * 🗺️ MAPA
 * TEORÍA · la hoja de conteo → base de todo el archivo
 * BLOQUE 1 · copiar y pisar con spread → drills 1–3
 * BLOQUE 2 · la llave calculada [algo]: → drills 4–5
 * BLOQUE 3 · leer con respaldo (?? 0) y el operador in → drills 6–9
 * BLOQUE 4 · una vuelta del reduce, a mano → drill 10
 * BLOQUE 5 · el paréntesis de la flecha → drill 11
 * BLOQUE 6 · ya con reduce: juntar las cinco piezas → drills 12–14
 * BLOQUE 7 · capstone: el campeón → drills 15–16
 *
 * ▸ 16 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/04-objetos/exercise-06.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — la hoja de conteo
 *
 * DEFINICIÓN
 * Contar con un diccionario es, por cada aparición, buscar su fila y sumarle uno
 * (si la fila no existía, empieza en 0), sin mutar el diccionario: cada vuelta
 * devuelve uno nuevo.
 *
 * 🧠 ANALOGÍA — la hoja de conteo con palotes: por cada aparición buscas su fila y
 * sumas un palote. La regla rara: en cada vuelta no tachas la hoja vieja; la
 * fotocopias entera y escribes el palote en la copia. La hoja en blanco del
 * principio es el {}.
 *
 * ⚠️ TRAMPA — con noUncheckedIndexedAccess, obj[clave] es number | undefined (la
 * clave podría no existir). Por eso al leer usas ?? 0 o un guard.
 * ───────────────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 1 — copiar y pisar (spread { ...obj }, sin reduce, sin flechas)
 *
 * El spread { ...obj } copia todas las propiedades de obj en un objeto nuevo. Regla
 * de oro: si una clave se repite, gana la última escrita.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) copiar — una copia nueva del objeto (no el mismo objeto: una copia).
 * copiar({ a: 1 }) → { a: 1 }   (pero es otra referencia, no muta el original)
 */
export function copiar(obj: Record<string, number>): Record<string, number> {
  return { ...obj };
}
// copiar({ a: 10 }) // return: { a: 10 }

/* 2) conTotal — copia del objeto más una propiedad nueva total: 10.
 * Clave fija, escrita a mano. (Aquí todavía no hay llaves calculadas.)
 * conTotal({ a: 1 }) → { a: 1, total: 10 }
 */
export function conTotal(obj: Record<string, number>): Record<string, number> {
  return { ...obj, total: 10 };
}
// conTotal({ a: 1 }) // ->

/* 3) pisarA — copia del objeto, pero con a valiendo 99 pase lo que pase.
 * El spread va primero, así que lo que escribas después lo pisa.
 * pisarA({ a: 1, b: 2 }) → { a: 99, b: 2 } ; pisarA({ b: 2 }) → { b: 2, a: 99 }
 */
export function pisarA(obj: Record<string, number>): Record<string, number> {
  return { ...obj, a: 99 };
}
// pisarA({ a: 1, b: 2 }) // -> return: { a: 99, b: 2 }
// pisarA({ b: 2 }) // -> return: { b: 2, a: 99 }

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 2 — la llave calculada [algo]:
 *
 * Los corchetes en la posición del nombre significan «no uses este texto: usa el
 * contenido de esta variable».
 *
 * Ejemplos:
 * { clave: valor }   → ❌ la propiedad se llama literalmente "clave"
 * { [clave]: valor } → ✅ la propiedad se llama lo que valga clave
 *
 * ⚠️ TRAMPA — la del primer ejemplo: sin corchetes, el nombre es el texto tal cual.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) unaClave — un objeto con una propiedad, cuyo nombre viene en la variable.
 * unaClave("hola", 3) → { hola: 3 }   (no { clave: 3 })
 */
export function unaClave(clave: string, valor: number): Record<string, number> {
  return { [clave]: valor };
}
// unaClave("hola", 3) // -> return: { hola: 3 } (La clave es a la vez el nombre de la propiedad)
// unaClave("x", 0) // -> return: { x: 0 }

/* 5) ponerClave — copia del objeto + la propiedad [clave]: valor.
 * Ahora sí: spread (1) + llave calculada (4), juntos.
 * ponerClave({ a: 1 }, "b", 2) → { a: 1, b: 2 }
 * ponerClave({ a: 1 }, "a", 9) → { a: 9 }        ← pisa, como en (3)
 */
export function ponerClave(
  obj: Record<string, number>,
  clave: string,
  valor: number,
): Record<string, number> {
  return { ...obj, [clave]: valor };
}
// ponerClave({ a: 1 }, "b", 2) // -> { a: 1, b: 2 }
// ponerClave({ a: 1 }, "a", 9) // -> { a: 9 }
// ponerClave({ a: 19 }, "a", 1) // -> { a: 1 } La segunda pisa a la primera. No importa si el número es más grande

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 3 — leer con respaldo (?? 0) y el operador in
 *
 * Con noUncheckedIndexedAccess, obj[clave] es number | undefined. Necesitas
 * respaldar la ausencia, no la falsedad: el operador es ??, no ||.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) leerOCero — el valor de la clave, o 0 si no existe.
 * leerOCero({ a: 5 }, "a") → 5 ; leerOCero({}, "x") → 0 ; leerOCero({ a: 0 }, "a") → 0
 */
export function leerOCero(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0; // El valor de clave está dentro de obj? Si si, devuelve ese valor. Si no, devuelve 0
}
// leerOCero({ a: 5 }, "a") // -> 5
// leerOCero({}, "x") // -> 0
// leerOCero({ a: 0 }, "a") // -> 0

/* 7) cuantasVeces — el valor de una clave, o 0 si no existe. (Mismo patrón que 6:
 * refuerzo, para que el ?? 0 se te haga automático.)
 * cuantasVeces({ a: 2 }, "a") → 2 ; cuantasVeces({}, "x") → 0
 */
export function cuantasVeces(obj: Record<string, number>, clave: string): number {
  return obj[clave] ?? 0;
}
// cuantasVeces({ a: 2 }, "a") // -> 2
// cuantasVeces({}, "x") // -> 0

/* 8) tieneClave — ¿existe esa clave en el diccionario? (usa el operador in)
 * tieneClave({ a: 1 }, "a") → true ; tieneClave({ a: 1 }, "b") → false
 */
export function tieneClave(obj: Record<string, number>, clave: string): boolean {
  return clave in obj;
}
// tieneClave({ a: 1 }, "a") // -> true
// tieneClave({ a: 1 }, "b") // -> false

/* 9) clavesConValorMayorQue — las claves cuyo valor supera limite.
 * (Object.keys da las claves; filtras leyendo con respaldo, como en 6.)
 * clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) → ["b", "c"]
 */
export function clavesConValorMayorQue(obj: Record<string, number>, limite: number): string[] {
  return Object.keys(obj) // Recibe: { a: 1, b: 5, c: 3 } y devuelve: ["a", "b", "c"]
    .filter((clave) => (obj[clave] ?? 0) > limite); // Recibe todas las claves y devuelve solo las que cumplen la condicion de que valor > limite -> ["b", "c"]
}
// clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2) // ->

/* ▸ BLOQUE 4 — una vuelta del reduce, a mano */

/* 10) ⭐ sumarUno — copia del objeto con un palote más en la fila de clave.
 * Este es el drill clave: es exactamente una vuelta del reduce que armarás en
 * el bloque 6, pero escrita a mano, sin reduce y sin flecha. Junta el bloque 2
 * (copiar + llave calculada) con el bloque 3 (leer con respaldo).
 * sumarUno({ a: 1 }, "a") → { a: 2 }       (la fila existía: 1 + 1)
 * sumarUno({ a: 1 }, "b") → { a: 1, b: 1 } (la fila no existía: 0 + 1)
 * sumarUno({}, "z") → { z: 1 }
 */
export function sumarUno(obj: Record<string, number>, clave: string): Record<string, number> {
  return { ...obj, [clave]: (obj[clave] ?? 0) + 1 }; // Retorno un objeto nuevo con spread. Si la clave no existe, está en 0 y le sumo 1, si existe, le sumo 1
}
// sumarUno({ a: 1 }, "a") // -> { a: 2 } -> Ya existía, le sumo 1
// sumarUno({ a: 1 }, "b") // -> { a: 1, b: 1 } -> No existia, le sumo 1 y se crea
// sumarUno({}, "z") // -> { z: 1 } -> No existia, le sumo 1 y se crea

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 5 — el paréntesis de la flecha (la trampa más fea de JS)
 *
 * Ejemplos:
 * (n) => { valor: n }   → ❌ no devuelve un objeto: la { se lee como el cuerpo de
 *                         la función (un bloque), y devuelve undefined
 * (n) => ({ valor: n }) → ✅ los paréntesis dicen «esto es una expresión»
 *
 * ⚠️ TRAMPA — si una flecha devuelve un objeto literal sin return, va envuelto en
 * paréntesis. Siempre.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 11) envolverTodos — cada número, metido en un objeto { valor: n }.
 * Escribe primero la versión mala a propósito (sin paréntesis), corre el test,
 * y mira el fallo con tus ojos. Luego añade los paréntesis.
 * envolverTodos([1, 2]) → [{ valor: 1 }, { valor: 2 }] ; envolverTodos([]) → []
 */
export function envolverTodos(ns: number[]): { valor: number }[] {
  return ns.map((n) => ({ valor: n }));
}
// envolverTodos([1, 2]) // -> [{ valor: 1 }, { valor: 2 }]
// envolverTodos([]) // -> []
// envolverTodos([1, 2, 3]) // -> [{ valor: 1 }, { valor: 2 }, { valor: 3 }]

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 6 — ya con reduce (juntar las cinco piezas)
 *
 * El reduce recorre la lista arrastrando un acumulador. El callback recibe
 * (acumulador, elemento) y devuelve el acumulador nuevo (¡con paréntesis!). El
 * segundo argumento de reduce es el acumulador inicial: la hoja en blanco, {}. Y
 * <Record<string, number>> le dice a TS de qué tipo es ese acumulador.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 12) contar — cuántas veces aparece cada palabra. Escríbelo inline dentro del
 * reduce (la vuelta de sumarUno, pero como flecha con paréntesis).
 * contar(["a", "b", "a"]) → { a: 2, b: 1 } ; contar([]) → {}
 */
export function contar(palabras: string[]): Record<string, number> {
  return palabras.reduce<Record<string, number>>(
    (acumulador, palabra) => ({ ...acumulador, [palabra]: (acumulador[palabra] ?? 0) + 1 }),
    {},
  );
}
// contar(["a", "b", "a"]) // ->

/* 13) contarBis — el mismo resultado que 12, pero ahora el callback del reduce
 * es tu sumarUno (10) convertido en flecha. (Refuerzo: ver que el reduce no
 * es más que aplicar sumarUno en cada vuelta.)
 * contarBis(["a", "b", "a"]) → { a: 2, b: 1 } ; contarBis([]) → {}
 */
export function contarBis(palabras: string[]): Record<string, number> {
  return palabras.reduce((acumulador, palabra) => sumarUno(acumulador, palabra), {});
}
// contarBis(["a", "b", "a"]) // ->

/* 14) sumarPorClave — mismo patrón, pero en vez de sumar 1 sumas el valor que
 * viene en cada par. Recorres tuplas, así que en el callback desempaquetas:
 * (acumulador, [clave, valor]) => ...  ← ¡no tires el valor!
 * sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) → { a: 11, b: 2 }
 * sumarPorClave([]) → {}
 */
export function sumarPorClave(pares: [string, number][]): Record<string, number> {
  return pares.reduce<Record<string, number>>(
    (acumulador, [clave, valor]) => ({ ...acumulador, [clave]: (acumulador[clave] ?? 0) + valor }),
    {},
  );
}
// sumarPorClave([["a", 1], ["b", 2], ["a", 10]]) // -> { a: 11, b: 2 }
// sumarPorClave([]) // -> {}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE 7 — capstone: el campeón
 *
 * En el reduce-campeón, el acumulador es el «campeón provisional», y empieza en
 * undefined. En cada vuelta, si no hay campeón todavía o el actual lo supera, el
 * actual pasa a ser el nuevo campeón.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 15) campeon — la clave con el valor más alto, o undefined si el objeto vacío.
 * Recorres las entries (Object.entries → pares [clave, valor]) con un reduce
 * cuyo acumulador es [string, number] | undefined, empezando en undefined.
 * Al final devuelves solo su clave.
 * campeon({ a: 1, b: 9, c: 5 }) → "b" ; campeon({ solo: 3 }) → "solo" ; campeon({}) → undefined
 */
export function campeon(obj: Record<string, number>): string | undefined {
  return Object.entries(obj).reduce<[string, number] | undefined>(
    (campeon, [clave, valor]) =>
      campeon === undefined || valor > campeon[1] ? [clave, valor] : campeon,
    undefined,
  )?.[0];
}
// campeon({ a: 1, b: 9, c: 5 }) // -> "b"
// campeon({ solo: 3 }) // -> "solo"
// campeon({}) // -> undefined

/* 16) masFrecuente — la palabra que más se repite, o undefined si la lista vacía.
 * El capstone final: no es una pieza nueva. Es contar (12) para armar el
 * diccionario + campeon (15) para sacar la clave ganadora. Reúsalos.
 * masFrecuente(["a", "b", "a", "a"]) → "a" ; masFrecuente([]) → undefined
 */
export function masFrecuente(palabras: string[]): string | undefined {
  return campeon(contar(palabras));
}
// masFrecuente(["a", "b", "a", "a"]) // -> "a"
