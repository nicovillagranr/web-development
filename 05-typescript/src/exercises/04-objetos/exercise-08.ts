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
 * categoría, por paridad...). El resultado es un `Record<clave, lista>`. Se arma
 * con `reduce` sobre un objeto acumulador. El salto que asusta es doble:
 *
 *     · el valor de cada etiqueta es una LISTA (no un número) → `[...(acc[k] ?? []), x]`
 *     · hay que REPETIR esa operación por cada elemento → un bucle / reduce
 *
 * Por eso esta escalera separa TODO en peldaños chiquitos: primero copiar listas,
 * luego meter UN elemento, luego meterlo MUCHAS veces (a mano → for → reduce), y
 * recién al final agrupar de verdad. Cada drill reusa el anterior.
 *
 * 🧠 ANALOGÍA: repartir el correo en casilleros. Cada carta va a su casillero; si
 *    el casillero estaba vacío, empieza con esa carta.
 *
 * ▸ EJERCICIO — drills en escalera, del 1 al 17. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/04-objetos/exercise-08.test.ts
 * ===========================================================================*/

export type Producto = { nombre: string; categoria: string }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 1 — LISTAS INMUTABLES (copiar y agregar sin mutar)
 * ════════════════════════════════════════════════════════════════════════════
 * El spread de arrays `[...xs]` copia una lista, igual que `{ ...obj }` copiaba un
 * objeto. Y `[...xs, x]` copia la lista Y le añade `x` al final, sin tocar la vieja.
 */

// 1) `copiarLista` — una copia NUEVA de la lista (otra referencia, no la misma).
//    copiarLista([1, 2]) → [1, 2]
export function copiarLista(xs: number[]): number[] {
  return [...xs]
}
copiarLista([1, 2]) // -> [1, 2]

// 2) `agregar` — copia de la lista MÁS `x` al final. La lista vieja queda intacta.
//    agregar([1, 2], 3) → [1, 2, 3] ; agregar([], 5) → [5]
export function agregar(xs: number[], x: number): number[] {
  return [...xs, x]
}
agregar([1, 2], 3) // -> [1, 2, 3]
agregar([], 5) // -> [5]


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 2 — LEER del diccionario con respaldo
 * ════════════════════════════════════════════════════════════════════════════
 * Con `noUncheckedIndexedAccess`, `obj[clave]` es `number[] | undefined` (la clave
 * puede no existir). El portero `?? []` lo convierte en una lista vacía segura.
 */

// 3) `leerListaOVacia` — la lista guardada en `clave`, o `[]` si no existe.
//    leerListaOVacia({ a: [1, 2] }, "a") → [1, 2] ; leerListaOVacia({}, "x") → []
export function leerListaOVacia(obj: Record<string, number[]>, clave: string): number[] {
  return obj[clave] ?? [] // Si la clave existe, devuelve su valor. Si no, devuelve []
}
leerListaOVacia({ a: [1, 2] }, "a") // -> [1, 2]
leerListaOVacia({}, "x") // -> []
leerListaOVacia({ a: [1, 2] }, "b") // -> []


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 3 — METER UN elemento (la vuelta, pieza por pieza)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 4) `agregarEnCasillero` — lee la lista-o-vacía (drill 3) y le pega `x` al final
//    (drill 2). Devuelve SOLO LA LISTA nueva, todavía no el objeto.
//    Aquí nace la expresión clave: `[...(obj[clave] ?? []), x]`.
//    agregarEnCasillero({ a: [1] }, "a", 2) → [1, 2] ; agregarEnCasillero({}, "x", 9) → [9]
export function agregarEnCasillero(obj: Record<string, number[]>, clave: string, x: number): number[] {
  // Se crea un array de números nuevo. Se evalúa si hay algo guardado bajo esa clave dentro del objeto.
  // Si lo hay, se copia con el spread; si no, queda el array vacío.
  // Independiente de si había algo en esa clave, se agrega el parámetro x al final.
  return [...(obj[clave] ?? []), x]
}
agregarEnCasillero({ a: [1] }, "a", 2) // -> [1, 2]
agregarEnCasillero({}, "x", 9) // -> [9] // Como la clave no existe, se retorna un array vacio, pero se queda con el parámetro x copiado

// 5) `meterEnNumeros` — copia el objeto y en la etiqueta `clave` pone la lista de
//    drill 4. Combina `{ ...obj }` (copiar) + `[clave]:` (llave calculada) + drill 4.
//    meterEnNumeros({}, "a", 1) → { a: [1] } ; meterEnNumeros({ a: [1] }, "a", 2) → { a: [1, 2] }
export function meterEnNumeros(obj: Record<string, number[]>, clave: string, x: number): Record<string, number[]> {
  // Se retorna un objeto y se copia lo que haya en `obj`.
  // El parámetro clave será el resultado de la llamada a `agregarEnCasillero`
  // El parámetro x lo copias directamente
  return { ...obj, [clave]: agregarEnCasillero(obj, clave, x) }
}
meterEnNumeros({ a: [1] }, "a", 2) // -> { a: [1, 2] }
meterEnNumeros({ a: [2] }, "a", 2) // -> { a: [2, 2] }
meterEnNumeros({ a: [1] }, "b", 2) // -> { a: [1], b: [2] }
meterEnNumeros({}, "x", 9) // -> { x: [9] }

// 6) `meterEn` — EXACTAMENTE meterEnNumeros, pero genérico `<T>` para que sirva con
//    números, con Productos, con lo que sea. Solo cambia `number` por `T`.
//    meterEn({}, "a", 1) → { a: [1] } ; meterEn({}, "x", "hola") → { x: ["hola"] }
export function meterEn<T>(obj: Record<string, T[]>, clave: string, x: T): Record<string, T[]> {
  // Lo primero que se retorna. Se crea un objeto nuevo y se copia lo que hay en `obj`.
  // El parámetro clave es una evaluación. Si hay algo bajo esa clave, se copia con el spread. Si no, queda el array vacío.
  // Independiente de si haya algo bajo esa clave, se agrega el parámetro x al final
  return { ...obj, [clave]: [...obj[clave] ?? [], x] }
}
meterEn({ a: [1] }, "a", 2) // -> { a: [1, 2] }
meterEn({ a: [2] }, "a", 2) // -> { a: [2, 2] }
meterEn({ a: [1] }, "b", 2) // -> { a: [1], b: [2] }
meterEn({}, "x", 9) // -> { x: [9] }
meterEn({}, "x", "Hola") // -> { x: ["Hola"] }
meterEn({}, "x", true) // -> { x: [true] }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 4 — METER MUCHAS veces (a mano → for → reduce) · EL MURO, EN RAMPA
 * ════════════════════════════════════════════════════════════════════════════
 * Agrupar es "meter" repetido. Aquí conquistas la REPETICIÓN en tres peldaños:
 * primero a mano (2 veces), luego con `for`, luego con `reduce`. Es la misma idea
 * tres veces, cada vez más corta.
 */

// 7) `meterDosAMano` — mete DOS números en la misma etiqueta, SIN bucle. Ves el
//    "arrastre" en cámara lenta: guardas el resultado en `acc` y se lo vuelves a
//    pasar a meterEnNumeros. Reasignas `acc` (por eso `let`):
//        let acc: Record<string, number[]> = {}
//        acc = meterEnNumeros(acc, clave, a)   // 1ª vuelta → { clave: [a] }
//        acc = meterEnNumeros(acc, clave, b)   // 2ª vuelta, sobre el acc de arriba
//        return acc
//    meterDosAMano("a", 1, 2) → { a: [1, 2] } ; meterDosAMano("b", 5, 5) → { b: [5, 5] }
export function meterDosAMano(clave: string, a: number, b: number): Record<string, number[]> {
  let acumulador: Record<string, number[]> = {} // {"a": [1, 2]} etiqueta y valor
  acumulador = meterEnNumeros(acumulador, clave, a)
  acumulador = meterEnNumeros(acumulador, clave, b)
  return acumulador
}
meterDosAMano("a", 1, 2) // ->

// 8) `meterVariosFor` — lo mismo que drill 7, pero para CUALQUIER cantidad. La línea
//    `acc = meterEnNumeros(acc, clave, n)` la escribes UNA vez, dentro de un `for`:
//        let acc: Record<string, number[]> = {}
//        for (const n of xs) { acc = meterEnNumeros(acc, clave, n) }
//        return acc
//    meterVariosFor("a", [1, 2, 3]) → { a: [1, 2, 3] } ; meterVariosFor("x", []) → {}
export function meterVariosFor(clave: string, xs: number[]): Record<string, number[]> {
  let acumulador: Record<string, number[]> = {}
  for (const n of xs) {
    acumulador = meterEnNumeros(acumulador, clave, n)
  }
  return acumulador
}
meterVariosFor("a", [1, 2, 3]) // -> { a: [1, 2, 3] }
meterVariosFor("x", []) // -> {}

// 9) `meterVariosReduce` — el mismo for de drill 8, ahora con `.reduce`. El `acc` es
//    el acumulador; el `{}` inicial es la SEMILLA (2º argumento). En cada vuelta
//    devuelves `meterEnNumeros(acc, clave, n)`.
//    ⚠️ Anota el tipo del acumulador: `xs.reduce<Record<string, number[]>>(...)`.
//    meterVariosReduce("a", [1, 2, 3]) → { a: [1, 2, 3] }
export function meterVariosReduce(clave: string, xs: number[]): Record<string, number[]> {
  return xs.reduce<Record<string, number[]>>((acumulador, numero) => meterEnNumeros(acumulador, clave, numero), {})
}
meterVariosReduce("a", [1, 2, 3]) // -> { a: [1, 2, 3] }


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 5 — La CLAVE sale de cada elemento (función o campo)
 * ════════════════════════════════════════════════════════════════════════════
 * Hasta ahora la clave era fija. Ahora sale de cada elemento: primero calculada
 * (`paridad(n)`), luego de un campo (`p.categoria`). El reduce es el mismo.
 */

// 10) `paridad` — la etiqueta "par" o "impar" de un número. (Aíslas el cálculo de
//     la clave antes de agrupar con ella.)  Pista: `n % 2 === 0`.
//     paridad(4) → "par" ; paridad(3) → "impar"
export function paridad(n: number): string {
  return n % 2 === 0 ? "par" : "impar"
}
paridad(4) // ->

// 11) `agruparPorParidad` — los números en listas "par"/"impar". Es drill 9, pero la
//     clave ya no es fija: en cada vuelta es `paridad(n)`.
//     agruparPorParidad([1, 2, 3, 4]) → { impar: [1, 3], par: [2, 4] }
export function agruparPorParidad(nums: number[]): Record<string, number[]> {
  return nums.reduce<Record<string, number[]>>((acumulador, n) => meterEnNumeros(acumulador, paridad(n), n), {})
}
agruparPorParidad([1, 2, 3, 4]) // ->

// 12) ⭐ `agruparPorCategoria` — los productos en listas por categoría. Como drill 11,
//     pero el elemento es un Producto y la clave sale de `p.categoria`. Reusa el
//     `meterEn` genérico (drill 6) porque el valor ya no es number, es Producto.
//     agruparPorCategoria([{nombre:"a",categoria:"x"}, {nombre:"b",categoria:"x"}])
//       → { x: [{a}, {b}] }

// export type Producto = { nombre: string; categoria: string }
export function agruparPorCategoria(productos: Producto[]): Record<string, Producto[]> {
  return productos.reduce<Record<string, Producto[]>>((acumulador, producto) => meterEn(acumulador, producto.categoria, producto), {})
}
// {
//   Zapatos: [{ nombre: "Nike Air Force One", categoria: "Zapatos" }, { nombre: "Air Jordan 1", categoria: "Zapatos" }]
// }
agruparPorCategoria([{ nombre: "Nike Air Force One", categoria: "Zapatos" }, { nombre: "Air Jordan 1", categoria: "Zapatos" }])


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 6 — CONTAR (el valor es un NÚMERO, no una lista)
 * ════════════════════════════════════════════════════════════════════════════
 */

// 13) `cuentaPorCategoria` — cuántos productos hay por categoría. Mismo reduce, pero
//     el valor sube de a uno en vez de acumular en lista: `(acc[k] ?? 0) + 1`.
//     Pista de la vuelta: `{ ...acc, [p.categoria]: (acc[p.categoria] ?? 0) + 1 }`.
//     cuentaPorCategoria([{cat:"x"},{cat:"x"},{cat:"y"}]) → { x: 2, y: 1 }
export function cuentaPorCategoria(productos: Producto[]): Record<string, number> {
  return productos.reduce<Record<string, number>>((acumulador, producto) => ({ ...acumulador, [producto.categoria]: (acumulador[producto.categoria] ?? 0) + 1 }), {})
}
// {Zapatos: 2}
cuentaPorCategoria([{ nombre: "Nike Air Force One", categoria: "Zapatos" }, { nombre: "Air Jordan 1", categoria: "Zapatos" }])


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 7 — SET y DEDUPLICAR
 * ════════════════════════════════════════════════════════════════════════════
 * `new Set(xs)` tira los repetidos; `[...set]` lo vuelve array otra vez.
 */

// 14) `sinRepetir` — la lista sin repetidos, conservando el orden.
//     sinRepetir(["x", "x", "y"]) → ["x", "y"]
export function sinRepetir(xs: string[]): string[] {
  return [...new Set(xs)]
}
sinRepetir(["x", "x", "y"]) // -> ["x", "y"]
sinRepetir(["a", "b", "c", "a"]) // -> ["a", "b", "c"]

// 15) `categoriasUnicas` — las categorías SIN repetir. Saca las categorías (`.map`)
//     y quítales los duplicados con `sinRepetir` (drill 14).
//     categoriasUnicas([{cat:"x"},{cat:"x"},{cat:"y"}]) → ["x", "y"]
export function categoriasUnicas(productos: Producto[]): string[] {
  return [...new Set(productos.map(p => p.categoria))]
}
// return: ["Zapatos"]
categoriasUnicas(
  [{ nombre: "Air Jordan 1", categoria: "Zapatos" }, { nombre: "Nike Air Force One", categoria: "Zapatos" }, { nombre: "Adiddas Yeezy", categoria: "Zapatos" }]
)


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE 8 — CAPSTONE: el campeón
 * ════════════════════════════════════════════════════════════════════════════
 */

// 16) `campeonDeConteo` — dada una cuenta `{ x: 2, y: 1 }`, la clave del valor más
//     alto (o undefined si está vacío). Es el `campeon` del ejercicio 06: reduce
//     sobre `Object.entries`, acumulador `[string, number] | undefined`, y al final
//     `?.[0]` para quedarte con la clave.
//     Pista: `(mejor, actual) => (mejor === undefined || actual[1] > mejor[1] ? actual : mejor)`.
//     campeonDeConteo({ x: 2, y: 1 }) → "x" ; campeonDeConteo({}) → undefined
export function campeonDeConteo(conteo: Record<string, number>): string | undefined {
  return Object.entries(conteo) // Recibe { x: 2, y: 1 } Devuelve [["x", 2], ["y", 1]]
    .reduce<[string, number] | undefined>((ac, actual) => (ac === undefined || actual[1] > ac[1] ? actual : ac), undefined)?.[0]
}
campeonDeConteo({ x: 2, y: 1 }) // -> "x"
campeonDeConteo({}) // -> undefined

// 17) `categoriaConMasProductos` — la categoría con más productos, o undefined si la
//     lista está vacía. NO es pieza nueva: cuenta con drill 13 y saca el campeón con
//     drill 16.  categoriaConMasProductos([{cat:"x"},{cat:"x"},{cat:"y"}]) → "x"
export function categoriaConMasProductos(productos: Producto[]): string | undefined {
  return campeonDeConteo(cuentaPorCategoria(productos))
}
// return: "Zapatos" porque hay 3 zapatos y 1 perfume
categoriaConMasProductos(
  [{ nombre: "Nike Air Force One", categoria: "Zapatos" },
  { nombre: "Air Jordan 1", categoria: "Zapatos" },
  { nombre: "Adiddas Yeezy", categoria: "Zapatos" },
  { nombre: "Le Beau Le Parfum", categoria: "Perfumes" }]
)
