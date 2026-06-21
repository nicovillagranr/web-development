/* =============================================================================
 * EJERCICIO 10 — tipos básicos (10/10): CAPSTONE — mini-modelo de dominio
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Cierre de la carpeta. Aquí NO hay un concepto nuevo: hay que TEJER los de los
 * ejercicios 05–09 en un modelo de datos pequeño pero realista (un mini-catálogo
 * de tienda), como harías al arrancar un proyecto de verdad.
 *
 *
 * ▸ LO QUE SE JUNTA
 * ----------------------------------------------------------------------------
 *   - `as const` + `(typeof LISTA)[number]`  → la unión `Categoria` desde una lista
 *   - `interface` + `extends`                → `Producto` y `ProductoConId`
 *   - alias reusados + filter/map            → consultas sobre el catálogo
 *
 *     const CATEGORIAS = ["bebida", "snack", "postre"] as const
 *     type Categoria = (typeof CATEGORIAS)[number]
 *     interface Producto { nombre: string; precio: number; categoria: Categoria }
 *     interface ProductoConId extends Producto { id: number }
 *
 * 🧠 ANALOGÍA: montar la "ficha técnica" de un producto antes de programar la
 *    tienda. Si la ficha (los tipos) está bien hecha, el resto del código se apoya
 *    en ella sin sustos.
 *
 * 💼 CASO REAL: esto es, tal cual, el esqueleto de tipos de cualquier catálogo:
 *    un modelo base + su versión "ya guardada con id" + un puñado de consultas.
 *
 * OJO — `Categoria` es un menú cerrado: ningún producto puede tener
 *    `categoria: "fruta"`. El modelo te protege de inventarte categorías.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as` (salvo
 *   `as const`).
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-10.test.ts
 * ===========================================================================*/


const CATEGORIAS = ["bebida", "snack", "postre"] as const
type Categoria = (typeof CATEGORIAS)[number]

interface Producto {
  nombre: string
  precio: number
  categoria: Categoria
}

interface ProductoConId extends Producto {
  id: number
}

/* ---------------------------------------------------------------------------
 * BLOQUE A — alta y descripción
 * -------------------------------------------------------------------------- */

// 1) `crear` — toma un Producto y un id, devuelve un ProductoConId.
//    👉 Dos arreglos: el tipo de retorno (ahora `Producto`, sin id) y el cuerpo
//       (copia el producto pero se olvida del id).
//      crear({ nombre: "Té", precio: 1000, categoria: "bebida" }, 7)
//        → { nombre: "Té", precio: 1000, categoria: "bebida", id: 7 }
export function crear(p: Producto, id: number): Producto {
  return {}
}

// 2) `esBebida` — true si la categoría es "bebida".
//    👉 Dos arreglos: el tipo del parámetro (ahora `string`: acepta categorías
//       inventadas) y el cuerpo (devuelve false siempre).
//      esBebida("bebida") → true     esBebida("snack") → false
export function esBebida(c: string): boolean {
  return false
}

// 3) `descripcion` — "<nombre>: $<precio>".
//    👉 UN arreglo: el cuerpo (el starter solo devuelve el nombre).
//      descripcion({ nombre: "Té", precio: 1000, categoria: "bebida" }) → "Té: $1000"
export function descripcion(p: Producto): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — consultar el catálogo
 * -------------------------------------------------------------------------- */

// 4) `porCategoria` — los productos cuya categoría coincide con la pedida.
//    👉 Dos arreglos: el tipo de `cat` (ahora `string`) y el cuerpo (devuelve la
//       lista entera sin filtrar).
//      porCategoria([{...id:1, categoria:"bebida"}, {...id:2, categoria:"snack"}], "bebida")
//        → [ el de id 1 ]
export function porCategoria(productos: ProductoConId[], cat: string): ProductoConId[] {
  return []
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: oferta = categoría + precio máximo, devuelve nombres
 * ---------------------------------------------------------------------------
 * Junta filtro por la unión, comparación de precio y map a nombres. Es el drill 5
 * con dos condiciones encadenadas en el filter.
 * -------------------------------------------------------------------------- */

// 5) `ofertasDe` — nombres de los productos de la categoría `cat` que NO superan
//    `precioMax`.
//    👉 Dos arreglos: el tipo de retorno (ahora `ProductoConId[]`) y el cuerpo
//       (no filtra ni se queda con el nombre).
//      ofertasDe([{ id:1, nombre:"Té", precio:1000, categoria:"bebida" },
//                 { id:2, nombre:"Cola", precio:2000, categoria:"bebida" }], "bebida", 1500)
//        → ["Té"]
export function ofertasDe(
  productos: ProductoConId[],
  cat: Categoria,
  precioMax: number,
): ProductoConId[] {
  return []
}
