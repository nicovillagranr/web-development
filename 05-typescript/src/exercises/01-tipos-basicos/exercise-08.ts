/* =============================================================================
 * EJERCICIO 08 — tipos básicos (8/?): `as const` + `(typeof LISTA)[number]`
 * =============================================================================
 *
 * 🟢 POR QUÉ ESTE BLOQUE
 * ----------------------------------------------------------------------------
 * Muchas veces tienes una LISTA fija de opciones (roles, tallas, categorías) y
 * quieres DOS cosas a la vez: la lista (para recorrer en runtime) y la UNIÓN de
 * sus valores (para tipar). Escribir las dos por separado las desincroniza. Con
 * `as const` + `(typeof LISTA)[number]` sacas la unión DE la lista: una fuente,
 * dos usos.
 *
 *
 * ▸ EXPLICACIÓN — de una lista a una unión de literales
 * ----------------------------------------------------------------------------
 *     const ROLES = ["admin", "editor", "lector"] as const
 *     type Rol = (typeof ROLES)[number]   // "admin" | "editor" | "lector"
 *
 * Dos piezas trabajando juntas:
 *   1) `as const`            → congela la lista: su tipo pasa de `string[]` a la
 *                              tupla literal `readonly ["admin","editor","lector"]`.
 *   2) `(typeof ROLES)[number]` → "el tipo de UN elemento cualquiera" (indexar por
 *                              `number` = cualquier posición) → la UNIÓN de todos.
 *
 * 🧠 ANALOGÍA: una baraja física (la lista) y la frase "una carta puede ser
 *    cualquiera de estas" (la unión). `as const` es plastificar la baraja para que
 *    nadie meta una carta nueva; `[number]` es señalar "una cualquiera del mazo".
 *
 * 🔧 POR DENTRO — SIN `as const` no funciona: `typeof ["admin", ...]` es `string[]`,
 *    así que `(string[])[number]` = `string` (¡la unión se pierde!). El `as const`
 *    es justo lo que conserva los literales para que la unión exista.
 *
 * 💼 CASO REAL: `const CATEGORIAS = [...] as const` te da el `<select>` (recorres
 *    la lista) y el tipo `Categoria` (tipas el estado del filtro) sin repetir.
 *
 * OJO — la unión es un MENÚ CERRADO: `Rol` rechaza `"jefe"` en compilación. Esa
 *    es toda la gracia frente a usar `string` (que traga cualquier cosa).
 *
 *
 * ▸ EJERCICIO — drills en escalera, EN ORDEN. ❌ Prohibido `any` y `as` (salvo
 *   `as const`, que es justo la herramienta de hoy).
 * ----------------------------------------------------------------------------
 * Corre el test tras cada uno:
 *     pnpm test:run src/exercises/01-tipos-basicos/exercise-08.test.ts
 * ===========================================================================*/


const ROLES = ["admin", "editor", "lector"] as const
type Rol = (typeof ROLES)[number]

/* ---------------------------------------------------------------------------
 * BLOQUE A — sacar la unión y usarla de parámetro
 * ---------------------------------------------------------------------------
 * El starter deja la lista SIN `as const`, así que `Rol` colapsa a `string` y la
 * puerta se abre a cualquier texto. El test cuela un valor inválido para
 * delatarlo.
 * -------------------------------------------------------------------------- */

// 1) `esAdmin` — true solo para "admin".
//    👉 Dos cosas: añade `as const` a `ROLES` (arriba) para que `Rol` sea la unión de
//       los tres literales y deje de aceptar basura como "jefe"; y escribe el cuerpo.
//      esAdmin("admin") → true     esAdmin("lector") → false
export function esAdmin(r: Rol): boolean {
  return r === "admin"
}
esAdmin("admin") // retorna true
esAdmin("lector") // retorna false
// esAdmin("Nico") // no compila, porque "Nico" no está en ROLES


const TALLAS = ["S", "M", "L", "XL"] as const
type Talla = (typeof TALLAS)[number]

// 2) `recargoTalla` — la XL cuesta 500 más; el resto, 0.
//    👉 Dos arreglos: el tipo del parámetro (ahora `string`: traga cualquier cosa)
//       y el cuerpo (devuelve 0 siempre).
//      recargoTalla("XL") → 500     recargoTalla("M") → 0
export function recargoTalla(t: Talla): number {
  if (t === "XL") {
    return 500
  }
  else {
    return 0
  }
}


/* ---------------------------------------------------------------------------
 * BLOQUE B — la unión como menú para mapear
 * ---------------------------------------------------------------------------
 * Cada valor del menú produce una salida. Como el menú es cerrado, no hay sustos
 * de "y si llega otra cosa".
 * -------------------------------------------------------------------------- */

// 3) `etiquetaRol` — nombre largo de cada rol.
//      etiquetaRol("admin") → "Administrador"   etiquetaRol("lector") → "Lector"
export function etiquetaRol(r: Rol): string {
  switch (r) {
    case "admin":
      return "Administrador"
    case "editor":
      return "Editor"
    case "lector":
      return "Lector"
  }
}

// 4) `esTallaGrande` — true para L y XL.
//      esTallaGrande("L") → true    esTallaGrande("S") → false
export function esTallaGrande(t: Talla): boolean {
  return t === "L" || t === "XL"
}


/* ---------------------------------------------------------------------------
 * BLOQUE C — CAPSTONE: filtrar una lista por uno de los valores de la unión
 * ---------------------------------------------------------------------------
 * `Rol` aparece dos veces: dentro de los objetos y como criterio de filtro. Un
 * solo alias, derivado de la lista, tipándolo todo.
 * -------------------------------------------------------------------------- */

// 5) `nombresPorRol` — nombres de los usuarios que tienen el rol pedido.
//    👉 Dos arreglos: el tipo de retorno (ahora devuelve la lista entera) y el
//       cuerpo (no filtra ni se queda con el nombre).
//      nombresPorRol([{ nombre: "Ana", rol: "admin" },{ nombre: "Leo", rol: "lector" }], "admin") → ["Ana"]
export function nombresPorRol(usuarios: { nombre: string; rol: Rol }[], rol: Rol,): string[] {
  return usuarios.filter((usuario) => usuario.rol === rol).map((u) => u.nombre)
}
