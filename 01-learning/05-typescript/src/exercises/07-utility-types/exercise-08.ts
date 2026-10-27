/* =============================================================================
 * EJERCICIO 08 — utility types (5/?): Omit<T, K> · bloque 07
 *
 * 🎯 OBJETIVOS
 * · Quitar unas llaves de un tipo con Omit y quedarte con todo lo demás.
 * · Usar Omit en los datos de alta (parámetro) y en la copia censurada (retorno).
 *
 * 🟢 CONTEXTO — Pick elige las llaves que quieres (lista blanca). Omit es su espejo:
 * dice las llaves que quitas y te quedas con todo lo demás (lista negra). Cuando un
 * tipo tiene 10 props y solo quieres sacar 1, es más cómodo nombrar la que se va
 * que las 9 que se quedan.
 *
 * 🗺️ MAPA
 * TEORÍA · qué es Omit<T, K> → base de todo el archivo
 * BLOQUE A · Omit en el parámetro: datos de alta → drills 1–2
 * BLOQUE B · Omit en el retorno: el objeto censurado → drills 3–4
 * BLOQUE C · capstone: una lista de altas (Omit + map) → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/07-utility-types/exercise-08.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito: typecheck y/o test en rojo. Arregla tipo y
 * cuerpo, y corre el test tras cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — qué es Omit<T, K>
 *
 * DEFINICIÓN
 * Omit<T, K> toma un tipo T y devuelve una copia sin las llaves K.
 *
 * Ejemplos:
 * type Usuario = { id: number; nombre: string; email: string; password: string }
 * Omit<Usuario, "password"> → { id: number; nombre: string; email: string }
 *
 * 🧠 ANALOGÍA — la fotocopia de un documento con una línea tachada con rotulador
 * negro: sale todo el documento… excepto lo censurado.
 *
 * ⚠️ TRAMPA — Omit<Usuario, "edad"> no da error aunque «edad» no exista (a
 * diferencia de Pick): quitar algo que no está simplemente no quita nada. Por
 * claridad, omite solo llaves reales.
 *
 * 💡 Por dentro, Omit se construye con Pick + Exclude (no hace falta memorizarlo,
 * solo ver que no es magia): type Omit<T, K> = Pick<T, Exclude<keyof T, K>>, «del
 * menú de llaves de T, excluye K, y haz Pick del resto».
 *
 * 💡 Caso real, el clásico: crear un registro nuevo. El id lo genera el servidor,
 * así que el formulario de alta no debe pedirlo:
 * function crearUsuario(datos: Omit<Usuario, "id">): Usuario
 * Quien llama pasa nombre, email y password; el id lo pone la función.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { id: number; nombre: string; email: string; password: string };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — Omit en el parámetro: datos de alta (el servidor pone el id)
 *
 * La función recibe todo menos el campo que ella misma genera, y lo añade dentro.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) crearUsuario — recibe los datos sin id (eso lo pone el servidor) más el
 * id por separado, y devuelve el Usuario completo.
 * 👉 Dos arreglos: el tipo de datos (ahora exige el Usuario entero, id
 *    incluido) y el cuerpo (ahora ignora el id y devuelve datos a secas).
 *   crearUsuario({ nombre: "Ana", email: "a@a.com", password: "123" }, 1)
 *     → { id: 1, nombre: "Ana", email: "a@a.com", password: "123" }
 */
export function crearUsuario(datos: Omit<Usuario, "id">, id: number): Usuario {
  return { id, ...datos };
}
// Al omitir id. Creamos un usuario con el id del parámetro de la función y los demás datos.
// return: { id: 1, nombre: "Ana", email: "a@a.com", password: "123" }
crearUsuario({ nombre: "Ana", email: "a@a.com", password: "123" }, 1);

type Producto = { sku: string; nombre: string; precio: number; stock: number };

/* 2) crearProducto — refuerzo: recibe los datos sin sku, más el sku aparte.
 * crearProducto({ nombre: "Té", precio: 1000, stock: 5 }, "TE-01")
 *   → { sku: "TE-01", nombre: "Té", precio: 1000, stock: 5 }
 */
export function crearProducto(datos: Omit<Producto, "sku">, sku: string): Producto {
  return { sku, ...datos };
}
crearProducto({ nombre: "Té", precio: 1000, stock: 5 }, "TE-01");
crearProducto({ nombre: "Coca Cola", precio: 100, stock: 5 }, "CC-01");

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — Omit en el retorno: devolver el objeto censurado
 *
 * Recibes el objeto entero y devuelves una copia sin el campo sensible.
 * ───────────────────────────────────────────────────────────────────────────── */

// type Usuario = { id: number; nombre: string; email: string; password: string }

/* 3) sinPassword — recibe un Usuario y devuelve una copia sin password
 * (lo que mandarías por la red al frontend).
 * 👉 Dos arreglos: el tipo de retorno (ahora promete el Usuario entero) y el
 *    cuerpo (ahora devuelve el usuario entero, password incluido).
 *   sinPassword({ id: 1, nombre: "Ana", email: "a@a.com", password: "123" })
 *     → { id: 1, nombre: "Ana", email: "a@a.com" }
 */
export function sinPassword(u: Usuario): Omit<Usuario, "password"> {
  return { id: u.id, nombre: u.nombre, email: u.email };
}
// return: { id: 1, nombre: "Ana", email: "a@a.com" }
sinPassword({ id: 1, nombre: "Ana", email: "a@a.com", password: "123" });

/* 4) productoVisible — refuerzo: devuelve el Producto sin sku (interno).
 * productoVisible({ sku: "TE-01", nombre: "Té", precio: 1000, stock: 5 })
 *   → { nombre: "Té", precio: 1000, stock: 5 }
 */
export function productoVisible(p: Producto): Omit<Producto, "sku"> {
  return { nombre: p.nombre, precio: p.precio, stock: p.stock };
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: registrar una lista de altas (Omit + map)
 *
 * Cada elemento llega sin id; la función asigna un id correlativo (posición + 1) y
 * devuelve la lista de usuarios completos.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) registrarUsuarios — recibe una lista de altas (cada una sin id) y devuelve
 * los Usuarios completos, con id = posición + 1.
 *   registrarUsuarios([{ nombre: "Ana", email: "a@a.com", password: "x" }])
 *     → [{ id: 1, nombre: "Ana", email: "a@a.com", password: "x" }]
 */
export function registrarUsuarios(altas: Omit<Usuario, "id">[]): Usuario[] {
  return altas.map((usuario, i) => crearUsuario(usuario, i + 1));
}
// return: [{ id: 1, nombre: "Ana", email: "a@a.com", password: "x" }]
// return: [{ id: 2, nombre: "Leo", email: "l@l.com", password: "y" }]
registrarUsuarios([
  { nombre: "Ana", email: "a@a.com", password: "x" },
  { nombre: "Leo", email: "l@l.com", password: "y" },
]);
