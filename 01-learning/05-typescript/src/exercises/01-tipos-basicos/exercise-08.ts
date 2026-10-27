/* =============================================================================
 * EJERCICIO 08 — tipos básicos (8/?): as const + (typeof LISTA)[number] · bloque 01
 *
 * 🎯 OBJETIVOS
 * · Sacar de una lista fija la unión de sus valores con as const y
 *   (typeof LISTA)[number].
 * · Usar esa unión como menú cerrado: de parámetro, para mapear y para filtrar.
 *
 * 🟢 CONTEXTO — muchas veces tienes una lista fija de opciones (roles, tallas,
 * categorías) y quieres dos cosas a la vez: la lista, para recorrerla en ejecución,
 * y la unión de sus valores, para tipar. Escribir las dos por separado las
 * desincroniza. Con as const + (typeof LISTA)[number] sacas la unión de la lista:
 * una fuente, dos usos.
 *
 * 🗺️ MAPA
 * TEORÍA · de una lista a una unión de literales → base de todo el archivo
 * BLOQUE A · sacar la unión y usarla de parámetro → drills 1–2
 * BLOQUE B · la unión como menú para mapear → drills 3–4
 * BLOQUE C · capstone: filtrar por uno de los valores de la unión → drill 5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as, salvo as const, que es
 * justo la herramienta de hoy.
 * pnpm test:run src/exercises/01-tipos-basicos/exercise-08.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — de una lista a una unión de literales
 *
 * DEFINICIÓN
 * Dos piezas trabajan juntas: as const congela la lista, y (typeof LISTA)[number]
 * saca «el tipo de un elemento cualquiera», que es la unión de todos.
 *
 * SINTAXIS
 * const ROLES = ["admin", "editor", "lector"] as const
 * type Rol = (typeof ROLES)[number] // "admin" | "editor" | "lector"
 *
 * 🗣️ LAS PIEZAS
 * as const               → congela la lista: su tipo pasa de string[] a la tupla
 *                          literal readonly ["admin", "editor", "lector"]
 * (typeof ROLES)[number] → indexar por number (cualquier posición): la unión de
 *                          todos los elementos
 *
 * 🧠 ANALOGÍA — una baraja física (la lista) y la frase «una carta puede ser
 * cualquiera de estas» (la unión). as const es plastificar la baraja para que nadie
 * meta una carta nueva; [number] es señalar «una cualquiera del mazo».
 *
 * ⚠️ TRAMPA — sin as const no funciona: typeof ["admin", …] es string[], así que
 * (string[])[number] es string, y la unión se pierde. El as const es justo lo que
 * conserva los literales para que la unión exista.
 *
 * 💡 La unión es un menú cerrado: Rol rechaza "jefe" al compilar. Esa es toda la
 * gracia frente a string, que traga cualquier cosa.
 *
 * 💡 Caso real: const CATEGORIAS = [...] as const te da el <select> (recorres la
 * lista) y el tipo Categoria (tipas el estado del filtro) sin repetir.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 🧹 Lint: la lista es solo fuente del tipo — nadie lee su valor, solo se deriva
 * la unión con (typeof ROLES)[number]. ESLint no cuenta los usos en posición de
 * tipo como uso del valor, así que la marca como «sin usar». No es un bug: ese
 * valor es justo lo que hace que lista y unión no puedan desincronizarse. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- se consume como tipo con `typeof ROLES`
const ROLES = ["admin", "editor", "lector"] as const;
type Rol = (typeof ROLES)[number];

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — sacar la unión y usarla de parámetro
 *
 * El starter deja la lista sin as const, así que Rol colapsa a string y la puerta
 * se abre a cualquier texto. El test cuela un valor inválido para delatarlo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) esAdmin — true solo para "admin".
 * 👉 Dos cosas: añade as const a ROLES (arriba) para que Rol sea la unión de
 *    los tres literales y deje de aceptar basura como "jefe"; y escribe el cuerpo.
 *   esAdmin("admin") → true     esAdmin("lector") → false
 */
export function esAdmin(r: Rol): boolean {
  return r === "admin";
}
esAdmin("admin"); // retorna true
esAdmin("lector"); // retorna false
// esAdmin("Nico") // no compila, porque "Nico" no está en ROLES

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- misma arruga que ROLES: se consume como tipo con `typeof TALLAS`
const TALLAS = ["S", "M", "L", "XL"] as const;
type Talla = (typeof TALLAS)[number];

/* 2) recargoTalla — la XL cuesta 500 más; el resto, 0.
 * 👉 Dos arreglos: el tipo del parámetro (ahora string: traga cualquier cosa)
 *    y el cuerpo (devuelve 0 siempre).
 *   recargoTalla("XL") → 500     recargoTalla("M") → 0
 */
export function recargoTalla(t: Talla): number {
  if (t === "XL") {
    return 500;
  } else {
    return 0;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — la unión como menú para mapear
 *
 * Cada valor del menú produce una salida. Como el menú es cerrado, no hay sustos
 * de «y si llega otra cosa».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) etiquetaRol — nombre largo de cada rol.
 * etiquetaRol("admin") → "Administrador"   etiquetaRol("lector") → "Lector"
 */
export function etiquetaRol(r: Rol): string {
  switch (r) {
    case "admin":
      return "Administrador";
    case "editor":
      return "Editor";
    case "lector":
      return "Lector";
  }
}

/* 4) esTallaGrande — true para L y XL.
 * esTallaGrande("L") → true    esTallaGrande("S") → false
 */
export function esTallaGrande(t: Talla): boolean {
  return t === "L" || t === "XL";
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — capstone: filtrar una lista por uno de los valores de la unión
 *
 * Rol aparece dos veces: dentro de los objetos y como criterio de filtro. Un solo
 * alias, derivado de la lista, tipándolo todo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) nombresPorRol — nombres de los usuarios que tienen el rol pedido.
 * 👉 Dos arreglos: el tipo de retorno (ahora devuelve la lista entera) y el
 *    cuerpo (no filtra ni se queda con el nombre).
 *   nombresPorRol([{ nombre: "Ana", rol: "admin" },{ nombre: "Leo", rol: "lector" }], "admin") → ["Ana"]
 */
export function nombresPorRol(usuarios: { nombre: string; rol: Rol }[], rol: Rol): string[] {
  return usuarios.filter((usuario) => usuario.rol === rol).map((u) => u.nombre);
}
