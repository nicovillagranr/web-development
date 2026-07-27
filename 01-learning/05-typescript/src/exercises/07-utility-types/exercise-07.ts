/* =============================================================================
 * EJERCICIO 07 — utility types (4/?): `Pick<T, K>`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Ya tienes `Partial<T>` (afloja TODAS las props a opcionales). Pero muchas
 * veces no quieres aflojar nada: quieres QUEDARTE SOLO CON UNAS POCAS props de
 * un tipo grande. Para eso está `Pick`: "de este tipo, dame solo estas llaves".
 *
 *
 * ▸ EXPLICACIÓN — qué es `Pick<T, K>`
 * ----------------------------------------------------------------------------
 * `Pick<T, K>` toma un tipo `T` y un conjunto de llaves `K` (una, o varias unidas
 * con `|`) y devuelve un tipo NUEVO con SOLO esas propiedades.
 *
 *     type Usuario = { id: number; nombre: string; email: string; password: string }
 *     type Tarjeta = Pick<Usuario, "id" | "nombre">
 *     //   resultado:  { id: number; nombre: string }
 *     //                  ▲ se queda solo con id y nombre; email y password se van
 *
 * 🧠 ANALOGÍA: un buffet. La mesa (`T`) tiene 20 platos; tú pones en TU plato
 *    (`Pick`) solo los 2 que quieres. No cambias la mesa: eliges un subconjunto.
 *
 * 🔧 POR DENTRO (mapped type, como `Partial`):
 *        type Pick<T, K extends keyof T> = { [P in K]: T[P] }
 *    "recorre cada llave P del conjunto K y copia su tipo T[P]". El `extends
 *    keyof T` es el PORTERO: K solo puede ser llaves que EXISTEN en T (no puedes
 *    elegir un plato que no está en la mesa).
 *
 * 💼 CASO REAL: una `<TarjetaUsuario>` en una lista solo necesita `id` y `nombre`,
 *    no el `password`. En vez de pasear el usuario entero (y arrastrar datos
 *    sensibles), trabajas con `Pick<Usuario, "id" | "nombre">`.
 *
 * OJO — Pick SELECCIONA, no inventa: las llaves elegidas conservan su tipo
 *    original. `Pick<Usuario, "edad">` NO compila ("edad" no existe en Usuario).
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito (tipo demasiado ancho/estricto + cuerpo que no
 * selecciona) → typecheck y/o test ROJOS. Arregla el TIPO y el CUERPO. Corre el
 * test tras cada uno:
 *     pnpm test:run src/exercises/07-utility-types/exercise-07.test.ts
 * ===========================================================================*/


type Usuario = { id: number; nombre: string; email: string; password: string }

/* ---------------------------------------------------------------------------
 * BLOQUE A — `Pick` en el RETORNO: fabricar una vista reducida
 * ---------------------------------------------------------------------------
 * La función recibe el objeto COMPLETO y devuelve solo un trozo. El tipo de
 * retorno dice EXACTAMENTE qué propiedades salen; el cuerpo las construye.
 * -------------------------------------------------------------------------- */

// 1) `vistaPublica` — recibe un Usuario completo y devuelve SOLO `id` y `nombre`
//    (nada de email ni password).
//    👉 Dos arreglos: el tipo de retorno (ahora promete el Usuario ENTERO) y el
//       cuerpo (ahora devuelve el usuario entero → filtraría datos sensibles).
//      vistaPublica({ id: 1, nombre: "Ana", email: "a@a.com", password: "123" })
//        → { id: 1, nombre: "Ana" }
export function vistaPublica(u: Usuario): Pick<Usuario, "id" | "nombre"> {
  return { id: u.id, nombre: u.nombre }
}

type Producto = { nombre: string; precio: number; stock: number; sku: string }

// 2) `tarjetaProducto` — mismo patrón, otro tipo: de un Producto completo, devuelve
//    solo `nombre` y `precio` (lo que se ve en una tarjeta de tienda).
//      tarjetaProducto({ nombre: "Té", precio: 1000, stock: 5, sku: "TE-01" })
//        → { nombre: "Té", precio: 1000 }
export function tarjetaProducto(p: Producto): Pick<Producto, "nombre" | "precio"> {
  return { nombre: p.nombre, precio: p.precio }
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — `Pick` en el PARÁMETRO: pedir solo lo que necesitas
 * ---------------------------------------------------------------------------
 * Si una función solo USA dos campos, exigir el objeto entero es trabajo falso:
 * obliga a quien llama a tener (y pasar) cosas que no hacen falta. `Pick` en el
 * parámetro deja la puerta justo del tamaño de lo que usas dentro.
 * -------------------------------------------------------------------------- */

// 3) `etiquetaPrecio` — solo necesita `nombre` y `precio` para armar un texto.
//    No tiene sentido exigir stock ni sku.
//    👉 Dos arreglos: el tipo del parámetro (ahora exige el Producto ENTERO) y el
//       cuerpo (ahora devuelve "").
//      etiquetaPrecio({ nombre: "Té", precio: 1000 }) → "Té: $1000"
export function etiquetaPrecio(p: Pick<Producto, "nombre" | "precio">): string {
  return `${p.nombre}: $${p.precio}`
}

// 4) `infoStock` — refuerzo: solo necesita `nombre` y `stock`.
//      infoStock({ nombre: "Té", stock: 5 }) → "Té: 5 en stock"
export function infoStock(p: Pick<Producto, "nombre" | "stock">): string {
  return `${p.nombre}: ${p.stock} en stock`
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: una lista de objetos → una lista de vistas (Pick + map)
 * ---------------------------------------------------------------------------
 * El drill 1, aplicado a cada elemento de un array con `.map`. El tipo del
 * retorno es ahora "un array de vistas": el `[]` va FUERA del `Pick`.
 * -------------------------------------------------------------------------- */

// type Usuario = { id: number; nombre: string; email: string; password: string }

// 5) `listaPublica` — recibe un array de Usuarios completos y devuelve un array
//    de vistas públicas (solo `id` y `nombre`).
//      listaPublica([{ id: 1, nombre: "Ana", email: "a@a.com", password: "x" }])
//        → [{ id: 1, nombre: "Ana" }]
export function listaPublica(usuarios: Usuario[]): Pick<Usuario, "id" | "nombre">[] {
  return usuarios.map((usuario) => vistaPublica(usuario))
}
