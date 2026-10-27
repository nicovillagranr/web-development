/* =============================================================================
 * EJERCICIO 05 — tipos básicos (5/?): type aliases (dar nombre a un tipo) · bloque 01
 *
 * 🎯 OBJETIVOS
 * · Ponerle nombre a la forma de un objeto con type y reusarla en varias funciones.
 * · Nombrar una unión de literales y usarla como menú cerrado.
 *
 * 🟢 CONTEXTO — hasta ahora escribías la forma de un tipo donde la necesitabas
 * ({ nombre: string; precio: number }). Cuando esa forma aparece en 5 sitios,
 * repetirla es trabajo, y si cambia hay que tocar los 5. Un type alias le pone
 * nombre a un tipo para escribirlo una vez y reusarlo.
 *
 * 🗺️ MAPA
 * TEORÍA · qué es un type alias → base de todo el archivo
 * BLOQUE A · alias de un objeto, reusado en varias funciones → drills 1–2
 * BLOQUE B · alias de una unión de literales: el menú cerrado → drills 3–4
 * BLOQUE C · capstone: los dos alias juntos en una lista → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-05.test.ts
 * pnpm typecheck
 *
 * Cada starter va mal a propósito (tipo demasiado ancho o incompleto + cuerpo que
 * no hace el trabajo): typecheck y/o test en rojo. Corre el test tras cada uno.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — qué es un type alias
 *
 * DEFINICIÓN
 * type Nombre = … crea un alias: un nombre corto para un tipo cualquiera (un
 * objeto, una unión, incluso un primitivo).
 *
 * SINTAXIS
 * type Producto = { nombre: string; precio: number }
 * type Estado   = "activo" | "inactivo" | "baneado" // unión de literales
 *
 * function etiqueta(p: Producto): string { … }    // se lee solo
 *
 * 🧠 ANALOGÍA — un contacto en la agenda: en vez de marcar el número entero cada
 * vez (la forma completa del tipo), guardas «Mamá» (el alias) y llamas por el
 * nombre. El número sigue siendo el mismo; solo le pusiste una etiqueta.
 *
 * ⚠️ TRAMPA — un alias da nombre, no validación extra: type Estado = "activo" | …
 * no comprueba nada en ejecución. Al compilar, eso sí, rechaza "foo".
 *
 * 💡 Por dentro, un alias no crea un tipo nuevo ni «envuelve» nada: es un puro
 * sinónimo. Producto y { nombre: string; precio: number } son intercambiables para
 * TS, y se borra al compilar (type erasure): en el JS final no queda rastro de la
 * palabra Producto.
 *
 * 💡 Caso real: en tus proyectos defines type Producto, type Usuario… una vez, y
 * los reusas en props, estados y funciones. Cambias la forma en un sitio, y todo
 * el resto se entera solo.
 * ───────────────────────────────────────────────────────────────────────────── */

type Producto = { nombre: string; precio: number };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — alias de un objeto, reusado en varias funciones
 *
 * La misma forma, Producto, sirve de tipo de retorno en una función y de tipo de
 * parámetro en otra. La escribes una vez arriba y la nombras donde haga falta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) crearProducto — recibe nombre y precio sueltos y devuelve un Producto.
 * 👉 Dos arreglos: el tipo de retorno (ahora promete un objeto incompleto,
 *    solo { nombre }) y el cuerpo (se deja el precio).
 *   crearProducto("Té", 1000) → { nombre: "Té", precio: 1000 }
 */
export function crearProducto(nombre: string, precio: number): Producto {
  return { nombre, precio };
}
// Retorno: { nombre: "Té", precio: 1000 }
crearProducto("Té", 1000);

/* 2) etiqueta — recibe un Producto y arma un texto de tienda.
 * 👉 Dos arreglos: el tipo del parámetro (ahora solo exige { nombre }, así
 *    que dentro no podrías leer p.precio) y el cuerpo (devuelve "").
 *   etiqueta({ nombre: "Té", precio: 1000 }) → "Té cuesta $1000"
 */
export function etiqueta(p: { nombre: string; precio: number }): string {
  return `${p.nombre} cuesta $${p.precio}`;
}
// Llamados (invocaciones)
etiqueta({ nombre: "Té", precio: 1000 }); // → "Té cuesta $1000"
etiqueta({ nombre: "Café", precio: 500 }); // → "Café cuesta $500"
etiqueta({ nombre: "Pan", precio: 2000 }); // → "Pan cuesta $2000"

type Estado = "activo" | "inactivo" | "baneado";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — alias de una unión de literales (el menú cerrado)
 *
 * Estado solo admite tres textos exactos. Usarlo como tipo de parámetro hace que
 * TS rechace cualquier otro string ("activo2", "foo"…). El starter usa string, la
 * puerta ancha: deja pasar cualquier cosa, y el test lo detecta.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) puedeEntrar — true salvo que esté baneado.
 * 👉 Dos arreglos: el tipo del parámetro (ahora string: acepta basura) y el
 *    cuerpo (devuelve siempre true).
 *   puedeEntrar("activo") → true     puedeEntrar("baneado") → false
 */
export function puedeEntrar(estado: Estado): boolean {
  // Todo lo que sea diferente a "baneado" dará true. Y si es diferente a los 3 argumentos de Estado el compilador de TypeScript no lo pasa
  return estado !== "baneado";
}
puedeEntrar("activo"); // return: true
puedeEntrar("inactivo"); // return: true
puedeEntrar("baneado"); // return: false
// puedeEntrar("active") el compilador de TypeScript no lo pasa

/* 4) colorDe — color según el estado (activo→verde, inactivo→gris, baneado→rojo).
 * 👉 Mismo patrón: aprieta el parámetro a Estado y completa el cuerpo.
 *   colorDe("inactivo") → "gris"
 */
export function colorDe(estado: Estado): string {
  switch (estado) {
    case "activo":
      return "verde";
    case "inactivo":
      return "gris";
    case "baneado":
      return "rojo";
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: los dos alias juntos en una lista (filter + map)
 *
 * Usuario se construye reusando el alias Estado. Aquí se ve el ahorro: no repites
 * la unión de tres literales, la nombras.
 * ───────────────────────────────────────────────────────────────────────────── */

type Usuario = { nombre: string; estado: Estado };

/* 5) nombresActivos — de una lista de usuarios, los nombres de los que están
 * "activo".
 * 👉 Dos arreglos: el tipo de retorno (ahora Usuario[]) y el cuerpo (devuelve
 *    la lista entera sin filtrar ni quedarse con el nombre).
 *   nombresActivos([{ nombre: "Ana", estado: "activo" },
 *                   { nombre: "Leo", estado: "baneado" }]) → ["Ana"]
 */
export function nombresActivos(usuarios: Usuario[]): string[] {
  // Se filtran los usuarios activos
  return usuarios.filter((usuario) => usuario.estado === "activo").map((u) => u.nombre);
}
// Return: ["Ana"]
nombresActivos([
  { nombre: "Ana", estado: "activo" },
  { nombre: "Leo", estado: "baneado" },
]);
