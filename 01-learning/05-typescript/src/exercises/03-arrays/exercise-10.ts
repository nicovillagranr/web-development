/* =============================================================================
 * EJERCICIO 10 — CAPSTONE: mini-catálogo de tienda (teje 01–09)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Sin concepto nuevo: combinas filter, sort, map, reduce y
 * join sobre un mini-modelo de tienda. Es como se trabaja de verdad con datos
 * antes de pintarlos en pantalla.
 *
 * 🧠 ANALOGÍA: una cinta de procesado. Los productos entran y van pasando por
 *    estaciones (filtrar disponibles → ordenar → quedarse con un campo → resumir).
 *
 * OJO — encadena (`.filter(...).sort(...).map(...)`) y no mutes el original
 *    (copia con `[...]` antes de `sort`). Recuerda el reduce-campeón del 03 para
 *    "el más caro".
 *
 * ▸ EJERCICIO — drills en escalera. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/03-arrays/exercise-10.test.ts
 * ===========================================================================*/

export type Producto = { id: number; nombre: string; precio: number; stock: number }

/* --- BLOQUE A — seleccionar y transformar --- */

// 1) `enStock` — solo los productos con stock > 0.
export function enStock(productos: Producto[]): Producto[] {
  return productos.filter((p) => p.stock > 0)
}

// 2) `nombresPorPrecio` — los nombres, ordenados de más barato a más caro (sin mutar).
export function nombresPorPrecio(productos: Producto[]): string[] {
  return [...productos].sort((a, b) => a.precio - b.precio).map((p) => p.nombre)
}
/* nombresPorPrecio([
  { id: 1, nombre: "Coca Cola", precio: 1000, stock: 100 },
  { id: 2, nombre: "Pepsi", precio: 2000, stock: 2 },
  { id: 3, nombre: "Sprite", precio: 3000, stock: 0 },
  { id: 4, nombre: "Fanta", precio: 3000, stock: 0 }])
   return: ["Coca Cola", "Pepsi", "Sprite", "Fanta"] Del más barato al más caro */

/* --- BLOQUE B — agregar con reduce --- */

// 3) `masCaro` — el producto más caro, o undefined si la lista está vacía.
//    (reduce-campeón: acumulador = "el mejor hasta ahora", inicial undefined)
export function masCaro(productos: Producto[]): Producto | undefined {
  return productos.reduce<Producto | undefined>((mejor, actual) => (!mejor || actual.precio > mejor.precio ? actual : mejor), undefined)
}

// 4) `valorInventario` — suma de precio * stock de todos los productos.
export function valorInventario(productos: Producto[]): number {
  return productos.reduce((acum, actual) => acum + actual.precio * actual.stock, 0)
}

/* --- BLOQUE C — CAPSTONE: filter + sort + map + join --- */

// 5) `catalogoDisponible` — los disponibles, ordenados por precio asc, como texto
//    "nombre ($precio)" unidos por ", ".
//    → "Pan ($2), Leche ($3)"
export function catalogoDisponible(productos: Producto[]): string {
  return enStock(productos).sort((a, b) => a.precio - b.precio).map((p) => `${p.nombre} ($${p.precio})`).join(', ')
}
/* catalogoDisponible([
  { id: 1, nombre: "Pan", precio: 2, stock: 5 },
  { id: 2, nombre: "Leche", precio: 3, stock: 0 },
  { id: 3, nombre: "Huevos", precio: 4, stock: 2 },
])
   return: "Pan ($2), Huevos ($4)" */

/* =============================================================================
 * BLOQUE R — REFUERZO: desarmar el `reduce`-campeón del drill 3 (`masCaro`)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * `masCaro` se siente como chino porque mete CUATRO cosas nuevas en una sola
 * línea. No es un concepto: son cuatro apretados. Aquí los separamos uno por uno
 * (escalera) y en el último peldaño los volvemos a juntar. La línea que vamos a
 * reconstruir es:
 *
 *     productos.reduce<Producto | undefined>(
 *       (mejor, actual) => (!mejor || actual.precio > mejor.precio) ? actual : mejor,
 *       undefined,
 *     )
 *          ▲ genérico          ▲ !mejor      ▲ ternario ? :        ▲ valor inicial
 *
 * Resuelve un peldaño, corre su test, y sube al siguiente. ❌ Prohibido `any`/`as`.
 * ===========================================================================*/

/* --- R1 — el TERNARIO `? :` aislado ------------------------------------------
 * `condicion ? valorSiVerdad : valorSiFalso` es un if/else que DEVUELVE un valor.
 *     const signo = n >= 0 ? "positivo" : "negativo"
 * `elMayor` — devuelve el mayor de dos números, usando SOLO un ternario.
 *     elMayor(3, 8) → 8 ; elMayor(10, 2) → 10                                    */
export function elMayor(a: number, b: number): number {
  return a > b ? a : b
}
// elMayor(3, 8) // 8
// elMayor(10, 2) // 10

/* --- R2 — la NEGACIÓN `!` sobre `undefined` aislada --------------------------
 * `!x` es `true` cuando `x` está "vacío" (undefined, null, 0, "", false).
 * Aquí lo usamos para preguntar "¿TODAVÍA no hay campeón?".
 *     !undefined → true    !{ ...unProducto } → false
 * `sinCampeon` — ¿el campeón está vacío (undefined)? → boolean, usando SOLO `!`.
 *     sinCampeon(undefined) → true ; sinCampeon({id,nombre,precio,stock}) → false */
export function sinCampeon(campeon: Producto | undefined): boolean {
  return !campeon
}
// sinCampeon(undefined) // true
// sinCampeon({ id: 1, nombre: 'Pan', precio: 2, stock: 5 }) // false

/* --- R3 — el VALOR INICIAL de `reduce` (`, X)`) aislado ----------------------
 * El 2º argumento de `reduce` es el acumulador de ARRANQUE: "el punto de partida
 * cuando todavía no he mirado nada". Con `, 0)` sumas; con otro número, arrancas
 * desde ahí. Fíjate SOLO en ese segundo argumento.
 * `sumarDesde` — suma los números empezando desde `base` (no desde 0).
 *     sumarDesde([1, 2, 3], 0) → 6 ; sumarDesde([1, 2, 3], 10) → 16              */
export function sumarDesde(nums: number[], base: number): number {
  return nums.reduce((acum, actual) => acum + actual, base)
}

/* --- R4 — juntar `!` + ternario: el JUEZ del campeón -------------------------
 * Ahora combinas R1 y R2 (sin `reduce` todavía). Dado el "mejor hasta ahora"
 * (que puede no existir) y un "actual", decide quién es el campeón:
 *   - si NO hay mejor todavía  → gana `actual`
 *   - o si `actual` es más caro → gana `actual`
 *   - si no                    → sigue `mejor`
 * `elegirCampeon` — devuelve el Producto ganador. (Pista: `!mejor || ...` ? _ : _)
 *     elegirCampeon(undefined, pan) → pan                                        */
export function elegirCampeon(mejor: Producto | undefined, actual: Producto): Producto {
  return !mejor || actual.precio > mejor.precio ? actual : mejor
}
// return: { id: 1, nombre: 'Pan', precio: 3000, stock: 5 } Gana porque es el más caro
// elegirCampeon({ id: 1, nombre: 'Pan', precio: 3000, stock: 5 }, { id: 2, nombre: 'Queso', precio: 2000, stock: 5 })

// return: { id: 1, nombre: 'Pan', precio: 2, stock: 5 } — !mejor=true, entra el primero
// elegirCampeon(undefined, { id: 1, nombre: 'Pan', precio: 2, stock: 5 })

// return: { id: 3, nombre: 'Huevos', precio: 4, stock: 2 } — 4 > 2, actual destrona
// elegirCampeon({ id: 1, nombre: 'Pan', precio: 2, stock: 5 }, { id: 3, nombre: 'Huevos', precio: 4, stock: 2 })

// return: { id: 3, nombre: 'Huevos', precio: 4, stock: 2 } — 2 > 4 false, sigue el campeón
// elegirCampeon({ id: 3, nombre: 'Huevos', precio: 4, stock: 2 }, { id: 1, nombre: 'Pan', precio: 2, stock: 5 })

// return: { id: 2, nombre: 'Leche', precio: 3, stock: 0 } — 3 > 2, actual gana
// elegirCampeon({ id: 1, nombre: 'Pan', precio: 2, stock: 5 }, { id: 2, nombre: 'Leche', precio: 3, stock: 0 })

// return: { id: 2, nombre: 'Leche', precio: 3, stock: 0 } — 3 > 3 false, empate NO destrona
// elegirCampeon({ id: 2, nombre: 'Leche', precio: 3, stock: 0 }, { id: 2, nombre: 'Leche', precio: 3, stock: 0 })

// return: { id: 3, nombre: 'Huevos', precio: 4, stock: 2 } — !mejor=true, entra sin comparar
// elegirCampeon(undefined, { id: 3, nombre: 'Huevos', precio: 4, stock: 2 })



/* --- R5 — REENSAMBLAR: el juez DENTRO de `reduce` ----------------------------
 * Último peldaño. Metes `elegirCampeon` (R4) como callback de `reduce`, con
 * inicial `undefined` (R3) y el genérico `<Producto | undefined>` que le dice a
 * TS de qué tipo es el acumulador (porque desde `undefined` no lo puede adivinar).
 * `masCaroDesarmado` — igual que `masCaro`, pero apoyándote en `elegirCampeon`.
 *     masCaroDesarmado([]) → undefined                                          */
export function masCaroDesarmado(productos: Producto[]): Producto | undefined {
  return productos.reduce(elegirCampeon, undefined)
}
// masCaroDesarmado([]) // undefined
/* masCaroDesarmado([
  { id: 1, nombre: 'Pan', precio: 2, stock: 5 },
  { id: 2, nombre: 'Leche', precio: 3, stock: 0 },
  { id: 3, nombre: 'Huevos', precio: 4, stock: 2 },
  { id: 4, nombre: 'Queso', precio: 3000, stock: 5 },
]) // → Queso (precio 3000, el más caro) */

