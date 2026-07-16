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
 * EJERCICIO 08 — Objetos: AGRUPAR una lista en un diccionario (`groupBy`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Patrón clásico: tienes una LISTA y quieres organizarla por una clave (por
 * categoría, por estado...). El resultado es un `Record<clave, lista>`. Se hace
 * con `reduce` sobre un objeto acumulador, igual que CONTAR (ejercicio 06)... pero
 * con una diferencia que lo vuelve un muro si lo ves de golpe:
 *
 *     contar (06):   el valor de cada fila es un NÚMERO   →  (acc[k] ?? 0) + 1
 *     agrupar (08):  el valor de cada fila es una LISTA   →  [...(acc[k] ?? []), x]
 *
 * En vez de "leer un número o 0 y sumar 1", ahora es "leer una lista o [] y
 * AGREGARLE el elemento". Y encima la clave sale de un CAMPO del objeto (p.categoria),
 * no del elemento entero. Dos cosas nuevas a la vez. Por eso esta escalera las
 * separa: primero listas inmutables, luego una vuelta a mano, y recién al final
 * el reduce completo.
 *
 * 🧠 ANALOGÍA: repartir el correo en casilleros por destinatario. Cada carta va a
 *    su casillero; si el casillero estaba vacío, empieza con esa carta.
 *
 * OJO — `acc[clave]` es `T[] | undefined` (la clave puede no existir aún) → `?? []`.
 *    Para deduplicar, `new Set` + spread: `[...new Set(lista)]`.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 11. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-08.test.ts
 * ===========================================================================*/

export type Producto = { nombre: string; categoria: string }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — LISTAS INMUTABLES (agregar sin mutar)
 * ════════════════════════════════════════════════════════════════════════════
 * El spread de arrays `[...xs]` copia una lista, igual que `{ ...obj }` copiaba un
 * objeto. Y `[...xs, x]` copia la lista Y le añade `x` al final, sin tocar la vieja.
 */

// 1) `copiarLista` — una copia NUEVA de la lista (no la misma: una copia).
//    Es el `copiar` del ejercicio 06, pero con `[...]` en vez de `{...}`.
//    copiarLista([1, 2]) → [1, 2]   (otra referencia, no muta el original)
export function copiarLista(xs: number[]): number[] {
  return []
}
copiarLista([1, 2]) // ->

// 2) `agregar` — copia de la lista MÁS `x` al final. Inmutable: la lista vieja
//    queda intacta, devuelves una nueva.
//    agregar([1, 2], 3) → [1, 2, 3] ; agregar([], 5) → [5]
export function agregar(xs: number[], x: number): number[] {
  return []
}
agregar([1, 2], 3) // ->
agregar([], 5) // ->

// 3) `leerListaOVacia` — la lista guardada en `clave`, o `[]` si no existe.
//    Gemelo de `leerOCero` (06), pero el respaldo es una lista vacía en vez de 0.
//    Recuerda: con noUncheckedIndexedAccess, `obj[clave]` es `number[] | undefined`.
//    leerListaOVacia({ a: [1, 2] }, "a") → [1, 2] ; leerListaOVacia({}, "x") → []
export function leerListaOVacia(obj: Record<string, number[]>, clave: string): number[] {
  return []
}
leerListaOVacia({ a: [1, 2] }, "a") // ->
leerListaOVacia({}, "x") // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — UNA VUELTA del groupBy, a mano
 * ════════════════════════════════════════════════════════════════════════════
 */

// 4) ⭐ `meterEn` — copia del objeto donde la fila `clave` tiene UN elemento más.
//     ESTE ES EL DRILL CLAVE (el `sumarUno` del 08). Es EXACTAMENTE una vuelta del
//     reduce que arma el groupBy, pero a mano. Junta:
//        · llave calculada  `[clave]:`           (ejercicio 06)
//        · leer lista-o-vacía  `obj[clave] ?? []` (drill 3)
//        · agregar al final  `[...lista, x]`      (drill 2)
//     Es genérico `<T>` para que sirva con números, con Productos, con lo que sea.
//     meterEn({}, "a", 1)        → { a: [1] }        (la fila no existía → empieza en [])
//     meterEn({ a: [1] }, "a", 2) → { a: [1, 2] }    (la fila existía → agrega)
//     meterEn({ a: [1] }, "b", 9) → { a: [1], b: [9] } (clave nueva, no pisa)
export function meterEn<T>(obj: Record<string, T[]>, clave: string, x: T): Record<string, T[]> {
  return {}
}
meterEn({}, "a", 1) // ->
meterEn({ a: [1] }, "a", 2) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — La CLAVE sale de un CAMPO del objeto
 * ════════════════════════════════════════════════════════════════════════════
 * Hasta ahora la clave te la pasaban. Ahora la sacas de cada elemento: `p.categoria`.
 */

// 5) `agruparPorCategoria` — los productos, en listas por categoría.
//     Este es el drill que te bloqueaba. Escríbelo INLINE: un reduce donde cada
//     vuelta es la línea de `meterEn` (drill 4) desplegada, con la clave = `p.categoria`.
//     Recuerda anotar `reduce<Record<string, Producto[]>>` (el {} inicial es muy vacío).
//     agruparPorCategoria([{nombre:"a",categoria:"x"}, {nombre:"b",categoria:"x"}])
//       → { x: [{a}, {b}] }
export function agruparPorCategoria(productos: Producto[]): Record<string, Producto[]> {
  return {}
}
agruparPorCategoria([{ nombre: "a", categoria: "x" }, { nombre: "b", categoria: "x" }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — La CLAVE sale de una CONDICIÓN
 * ════════════════════════════════════════════════════════════════════════════
 */

// 6) `paridad` — la etiqueta "par" o "impar" de un número. (Aíslas el cálculo de
//     la clave antes de agrupar con ella.)  Pista: `n % 2 === 0`.
//     paridad(4) → "par" ; paridad(3) → "impar"
export function paridad(n: number): string {
  return ""
}
paridad(4) // ->
paridad(3) // ->

// 7) `agruparPorParidad` — los números, en listas "par" / "impar". Ahora sí puedes
//     REUSAR `meterEn` (drill 4): la clave de cada vuelta es `paridad(n)`, el
//     elemento es `n`. (Refuerzo: el reduce no es más que aplicar meterEn en cada
//     vuelta.)  Anota `reduce<Record<string, number[]>>`.
//     agruparPorParidad([1, 2, 3, 4]) → { impar: [1, 3], par: [2, 4] }
export function agruparPorParidad(nums: number[]): Record<string, number[]> {
  return {}
}
agruparPorParidad([1, 2, 3, 4]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — Valores que vuelven a ser NÚMEROS (puente al ejercicio 06)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 8) `cuentaPorCategoria` — cuántos productos hay por categoría. Es el `contar` del
//     06 (valor number, `(acc[k] ?? 0) + 1`), pero con la clave sacada de `p.categoria`.
//     cuentaPorCategoria([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → { x: 2, y: 1 }
export function cuentaPorCategoria(productos: Producto[]): Record<string, number> {
  return {}
}
cuentaPorCategoria([{ nombre: "a", categoria: "x" }, { nombre: "b", categoria: "y" }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — SET y DEDUPLICAR
 * ════════════════════════════════════════════════════════════════════════════
 * `new Set(xs)` tira los repetidos; `[...set]` lo vuelve array otra vez.
 */

// 9) `sinRepetir` — la lista sin elementos repetidos, conservando el orden.
//     sinRepetir(["x", "x", "y"]) → ["x", "y"]
export function sinRepetir(xs: string[]): string[] {
  return []
}
sinRepetir(["x", "x", "y"]) // ->

// 10) `categoriasUnicas` — las categorías SIN repetir. Saca las categorías de los
//     productos (`.map`) y quítales los duplicados con `sinRepetir` (drill 9).
//     categoriasUnicas([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → ["x", "y"]
export function categoriasUnicas(productos: Producto[]): string[] {
  return []
}
categoriasUnicas([{ nombre: "a", categoria: "x" }, { nombre: "b", categoria: "x" }]) // ->


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 7 — CAPSTONE: contar + campeón
 * ════════════════════════════════════════════════════════════════════════════
 */

// 11) `categoriaConMasProductos` — la categoría con más productos, o undefined si
//      la lista está vacía. NO es pieza nueva: cuenta con `cuentaPorCategoria`
//      (drill 8) + saca la clave del valor más alto (el `campeon` del ejercicio 06:
//      reduce sobre `Object.entries`, acumulador `[string, number] | undefined`).
//      categoriaConMasProductos([{categoria:"x"},{categoria:"x"},{categoria:"y"}]) → "x"
//      categoriaConMasProductos([]) → undefined
export function categoriaConMasProductos(productos: Producto[]): string | undefined {
  return undefined
}
categoriaConMasProductos([{ nombre: "a", categoria: "x" }]) // ->
