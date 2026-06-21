/* =============================================================================
 * EJERCICIO 05 — tipos básicos (5/?): `type` aliases (dar nombre a un tipo)
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Hasta ahora escribías la FORMA de un tipo donde la necesitabas
 * (`{ nombre: string; precio: number }`). Cuando esa forma aparece en 5 sitios,
 * repetirla es trabajo (y si cambia, hay que tocar los 5). Un `type` alias le
 * pone NOMBRE a un tipo para escribirlo UNA vez y reusarlo.
 *
 *
 * ▸ EXPLICACIÓN — qué es un `type` alias
 * ----------------------------------------------------------------------------
 * `type Nombre = ...` crea un ALIAS: un nombre corto para un tipo cualquiera
 * (un objeto, una unión, incluso un primitivo).
 *
 *     type Producto = { nombre: string; precio: number }
 *     type Estado   = "activo" | "inactivo" | "baneado"   // unión de literales
 *
 *     function etiqueta(p: Producto): string { ... }   // se lee solo
 *
 * 🧠 ANALOGÍA: un contacto en la agenda. En vez de marcar el número entero cada
 *    vez (la forma completa del tipo), guardas "Mamá" (el alias) y llamas por el
 *    nombre. El número sigue siendo el mismo; solo le pusiste una etiqueta.
 *
 * 🔧 POR DENTRO: un alias NO crea un tipo nuevo ni "envuelve" nada — es un puro
 *    sinónimo. `Producto` y `{ nombre: string; precio: number }` son
 *    INTERCAMBIABLES para TS. Se borra al compilar (type erasure): en el JS final
 *    no queda rastro de la palabra `Producto`.
 *
 * 💼 CASO REAL: en tus proyectos defines `type Producto`, `type Usuario`, etc. una
 *    vez y los reusas en props, estados y funciones. Cambias la forma en UN sitio
 *    y todo el resto se entera solo.
 *
 * OJO — un alias da NOMBRE, no VALIDACIÓN extra: `type Estado = "activo" | ...`
 *    no comprueba nada en runtime; en compilación, eso sí, rechaza `"foo"`.
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as`.
 * ----------------------------------------------------------------------------
 * Cada starter va MAL a propósito (tipo demasiado ancho/incompleto + cuerpo que
 * no hace el trabajo) → typecheck y/o test ROJOS. Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-05.test.ts
 * ===========================================================================*/


type Producto = { nombre: string; precio: number }

/* ---------------------------------------------------------------------------
 * BLOQUE A — alias de un OBJETO, reusado en varias funciones
 * ---------------------------------------------------------------------------
 * La misma forma (`Producto`) sirve de tipo de retorno en una función y de tipo
 * de parámetro en otra. Lo escribes una vez arriba y lo nombras donde haga falta.
 * -------------------------------------------------------------------------- */

// 1) `crearProducto` — recibe nombre y precio sueltos y devuelve un Producto.
//    👉 Dos arreglos: el tipo de retorno (ahora promete un objeto INCOMPLETO,
//       solo `{ nombre }`) y el cuerpo (se deja el precio).
//      crearProducto("Té", 1000) → { nombre: "Té", precio: 1000 }
export function crearProducto(nombre: string, precio: number): Producto {
  return { nombre, precio }
}
// Retorno: { nombre: "Té", precio: 1000 }
crearProducto("Té", 1000)


// 2) `etiqueta` — recibe un Producto y arma un texto de tienda.
//    👉 Dos arreglos: el tipo del parámetro (ahora solo exige `{ nombre }`, así
//       que dentro no podrías leer `p.precio`) y el cuerpo (devuelve "").
//      etiqueta({ nombre: "Té", precio: 1000 }) → "Té cuesta $1000"
export function etiqueta(p: { nombre: string }): string {
  return ""
}


type Estado = "activo" | "inactivo" | "baneado"

/* ---------------------------------------------------------------------------
 * BLOQUE B — alias de una UNIÓN DE LITERALES (el menú cerrado)
 * ---------------------------------------------------------------------------
 * `Estado` solo admite tres textos exactos. Usarlo como tipo de parámetro hace
 * que TS RECHACE cualquier otro string ("activo2", "foo"...). El starter usa
 * `string` (la puerta ancha): deja pasar cualquier cosa → el test lo detecta.
 * -------------------------------------------------------------------------- */

// 3) `puedeEntrar` — true salvo que esté baneado.
//    👉 Dos arreglos: el tipo del parámetro (ahora `string`: acepta basura) y el
//       cuerpo (devuelve siempre true).
//      puedeEntrar("activo") → true     puedeEntrar("baneado") → false
export function puedeEntrar(estado: string): boolean {
  return true
}

// 4) `colorDe` — color según el estado (activo→verde, inactivo→gris, baneado→rojo).
//    👉 Mismo patrón: aprieta el parámetro a `Estado` y completa el cuerpo.
//      colorDe("inactivo") → "gris"
export function colorDe(estado: string): string {
  return ""
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: los dos alias juntos en una lista (filter + map)
 * ---------------------------------------------------------------------------
 * `Usuario` se construye REUSANDO el alias `Estado`. Aquí se ve el ahorro: no
 * repites la unión de tres literales, la nombras.
 * -------------------------------------------------------------------------- */

type Usuario = { nombre: string; estado: Estado }

// 5) `nombresActivos` — de una lista de usuarios, los nombres de los que están
//    "activo".
//    👉 Dos arreglos: el tipo de retorno (ahora `Usuario[]`) y el cuerpo (devuelve
//       la lista entera sin filtrar ni quedarse con el nombre).
//      nombresActivos([{ nombre: "Ana", estado: "activo" },
//                      { nombre: "Leo", estado: "baneado" }]) → ["Ana"]
export function nombresActivos(usuarios: Usuario[]): Usuario[] {
  return []
}
