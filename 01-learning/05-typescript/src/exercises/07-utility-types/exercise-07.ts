/* =============================================================================
 * EJERCICIO 07 — utility types (4/?): Pick<T, K> · bloque 07
 *
 * 🎯 OBJETIVOS
 * · Quedarte con unas pocas propiedades de un tipo grande con Pick.
 * · Usar Pick en el retorno (una vista) y en el parámetro (pedir solo lo que usas).
 *
 * 🟢 CONTEXTO — ya tienes Partial<T>, que afloja todas las props a opcionales.
 * Pero muchas veces no quieres aflojar nada: quieres quedarte solo con unas pocas
 * props de un tipo grande. Para eso está Pick: «de este tipo, dame solo estas
 * llaves».
 *
 * 🗺️ MAPA
 * TEORÍA · qué es Pick<T, K> → base de todo el archivo
 * BLOQUE A · Pick en el retorno: una vista reducida → drills 1–2
 * BLOQUE B · Pick en el parámetro: pedir solo lo que usas → drills 3–4
 * BLOQUE C · capstone: una lista de vistas (Pick + map) → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-07.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito (tipo demasiado ancho o estricto + cuerpo que no
 * selecciona): typecheck y/o test en rojo. Arregla el tipo y el cuerpo, y corre el
 * test tras cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — qué es Pick<T, K>
 *
 * DEFINICIÓN
 * Pick<T, K> toma un tipo T y un conjunto de llaves K (una, o varias unidas con |)
 * y devuelve un tipo nuevo con solo esas propiedades.
 *
 * Ejemplos:
 * type Usuario = { id: number; nombre: string; email: string; password: string }
 * Pick<Usuario, "id" | "nombre"> → { id: number; nombre: string }
 *
 * 🧠 ANALOGÍA — un buffet: la mesa (T) tiene 20 platos, y tú pones en tu plato
 * (Pick) solo los 2 que quieres. No cambias la mesa: eliges un subconjunto.
 *
 * ⚠️ TRAMPA — Pick selecciona, no inventa: las llaves elegidas conservan su tipo
 * original, y Pick<Usuario, "edad"> no compila («edad» no existe en Usuario).
 *
 * 💡 Por dentro es un mapped type, como Partial:
 * type Pick<T, K extends keyof T> = { [P in K]: T[P] }, «recorre cada llave P del
 * conjunto K y copia su tipo T[P]». El extends keyof T es el portero: K solo puede
 * ser llaves que existen en T (no eliges un plato que no está en la mesa).
 *
 * 💡 Caso real: una <TarjetaUsuario> en una lista solo necesita id y nombre, no el
 * password. En vez de pasear el usuario entero, y arrastrar datos sensibles,
 * trabajas con Pick<Usuario, "id" | "nombre">.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { id: number; nombre: string; email: string; password: string };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — Pick en el retorno: fabricar una vista reducida
 *
 * La función recibe el objeto completo y devuelve solo un trozo. El tipo de retorno
 * dice exactamente qué propiedades salen; el cuerpo las construye.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) vistaPublica — recibe un Usuario completo y devuelve solo id y nombre
 * (nada de email ni password).
 * 👉 Dos arreglos: el tipo de retorno (ahora promete el Usuario entero) y el
 *    cuerpo (ahora devuelve el usuario entero → filtraría datos sensibles).
 *   vistaPublica({ id: 1, nombre: "Ana", email: "a@a.com", password: "123" })
 *     → { id: 1, nombre: "Ana" }
 */
export function vistaPublica(u: Usuario): Pick<Usuario, "id" | "nombre"> {
  return { id: u.id, nombre: u.nombre };
}

type Producto = { nombre: string; precio: number; stock: number; sku: string };

/* 2) tarjetaProducto — mismo patrón, otro tipo: de un Producto completo, devuelve
 * solo nombre y precio (lo que se ve en una tarjeta de tienda).
 *   tarjetaProducto({ nombre: "Té", precio: 1000, stock: 5, sku: "te-01" })
 *     → { nombre: "Té", precio: 1000 }
 */
export function tarjetaProducto(p: Producto): Pick<Producto, "nombre" | "precio"> {
  return { nombre: p.nombre, precio: p.precio };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — Pick en el parámetro: pedir solo lo que necesitas
 *
 * Si una función solo usa dos campos, exigir el objeto entero es trabajo falso:
 * obliga a quien llama a tener, y pasar, cosas que no hacen falta. Pick en el
 * parámetro deja la puerta justo del tamaño de lo que usas dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) etiquetaPrecio — solo necesita nombre y precio para armar un texto.
 * No tiene sentido exigir stock ni sku.
 * 👉 Dos arreglos: el tipo del parámetro (ahora exige el Producto entero) y el
 *    cuerpo (ahora devuelve "").
 *   etiquetaPrecio({ nombre: "Té", precio: 1000 }) → "Té: $1000"
 */
export function etiquetaPrecio(p: Pick<Producto, "nombre" | "precio">): string {
  return `${p.nombre}: $${p.precio}`;
}

/* 4) infoStock — refuerzo: solo necesita nombre y stock.
 * infoStock({ nombre: "Té", stock: 5 }) → "Té: 5 en stock"
 */
export function infoStock(p: Pick<Producto, "nombre" | "stock">): string {
  return `${p.nombre}: ${p.stock} en stock`;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: una lista de objetos → una lista de vistas (Pick + map)
 *
 * El drill 1, aplicado a cada elemento de un array con .map. El tipo del retorno es
 * ahora «un array de vistas»: el [] va fuera del Pick.
 * ───────────────────────────────────────────────────────────────────────────── */

// type Usuario = { id: number; nombre: string; email: string; password: string }

/* 5) listaPublica — recibe un array de Usuarios completos y devuelve un array
 * de vistas públicas (solo id y nombre).
 *   listaPublica([{ id: 1, nombre: "Ana", email: "a@a.com", password: "x" }])
 *     → [{ id: 1, nombre: "Ana" }]
 */
export function listaPublica(usuarios: Usuario[]): Pick<Usuario, "id" | "nombre">[] {
  return usuarios.map((usuario) => vistaPublica(usuario));
}
