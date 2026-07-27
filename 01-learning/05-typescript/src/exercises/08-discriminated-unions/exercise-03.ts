/* =============================================================================
 * EJERCICIO 03 — La máquina de estados de carga: cargando / éxito / error
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — cada variante lleva CAMPOS DISTINTOS
 * ----------------------------------------------------------------------------
 * Hasta ahora tus variantes se parecían bastante (figuras con un número cada
 * una). El verdadero superpoder de las uniones discriminadas aparece cuando
 * cada variante lleva DATOS DIFERENTES, y algunos campos SOLO existen en una de
 * ellas.
 *
 * El caso estrella —el que verás en CADA app de React que pide datos a un
 * servidor— es el estado de una petición asíncrona:
 *
 *   type EstadoUsuario =
 *     | { estado: "cargando" }                                   // aún no hay nada
 *     | { estado: "exito"; usuario: { nombre: string } }         // ya llegó
 *     | { estado: "error"; mensaje: string };                    // falló
 *
 * Fíjate: `usuario` SOLO existe cuando estado es "exito", y `mensaje` SOLO
 * cuando es "error". TS no te deja tocar `e.usuario` hasta que comprobaste
 * `e.estado === "exito"`. Eso es exactamente lo que quieres: es IMPOSIBLE leer
 * los datos antes de saber que llegaron.
 *
 *
 * ▸ ANALOGÍA — el cartero y el paquete que aún no llega
 * ----------------------------------------------------------------------------
 * Pides algo online. Mientras viaja, el estado es "en reparto": no hay caja que
 * abrir todavía, preguntar "¿qué hay dentro?" no tiene sentido. Cuando llega
 * ("entregado") aparece la caja con su contenido. Si se pierde ("incidencia"),
 * en vez de caja tienes un mensaje del servicio. Mirar el ESTADO primero te dice
 * qué tienes derecho a abrir: el contenido solo existe en "entregado".
 *
 *
 * ▸ EJEMPLO — leer el dato solo tras estrechar
 * ----------------------------------------------------------------------------
 *
 *   function saludo(e: EstadoUsuario): string {
 *     switch (e.estado) {
 *       case "cargando": return "Cargando…";
 *       case "exito":    return `Hola, ${e.usuario.nombre}`;  // aquí sí existe
 *       case "error":    return `Ups: ${e.mensaje}`;          // aquí sí existe
 *     }
 *   }
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *   - SIEMPRE que pidas datos a una API: modela los 3 (o 4) estados como una DU
 *     en vez de tres booleanos sueltos. En FASE 2 (13-fetch-tipado) esto será tu
 *     pan de cada día, y cada rama del `switch` será un trozo de UI distinto.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-03.test.ts
 * ===========================================================================*/

export type EstadoUsuario =
  | { estado: "cargando" }
  | { estado: "exito"; usuario: { nombre: string; edad: number } }
  | { estado: "error"; mensaje: string }


/* ── BLOQUE A — leer un campo que solo existe en una variante ──────────────── */

// 1) `estaCargando` — true solo si el estado es "cargando".
//    estaCargando({ estado: "cargando" }) → true
//    estaCargando({ estado: "error", mensaje: "x" }) → false
export function estaCargando(e: EstadoUsuario): boolean {
  return e.estado === "cargando"
}

// 2) `nombreSiExito` — el nombre del usuario si es "exito"; si no, null.
//    nombreSiExito({ estado: "exito", usuario: { nombre: "Ana", edad: 30 } }) → "Ana"
//    nombreSiExito({ estado: "cargando" }) → null
//    (Estrecha por e.estado ANTES de tocar e.usuario.)
export function nombreSiExito(e: EstadoUsuario): string | null {
  if (e.estado === "exito") {
    return e.usuario.nombre
  }
  else {
    return null
  }
}

// 3) `edadOcero` — la edad si es "exito"; si no, 0.
//    edadOcero({ estado: "exito", usuario: { nombre: "Ana", edad: 30 } }) → 30
//    edadOcero({ estado: "error", mensaje: "x" }) → 0
export function edadOcero(e: EstadoUsuario): number {
  if (e.estado === "exito") {
    return e.usuario.edad
  }
  else {
    return 0
  }
}


/* ── BLOQUE B — el switch que cubre todos los estados ──────────────────────── */

// 4) `mensajeEstado` — un texto por cada estado, con `switch (e.estado)`:
//      "cargando" → "Cargando…"
//      "exito"    → `Hola, ${nombre}`   (usa e.usuario.nombre)
//      "error"    → `Error: ${mensaje}` (usa e.mensaje)
export function mensajeEstado(e: EstadoUsuario): string {
  switch (e.estado) {
    case "cargando": return "Cargando…"
    case "exito": return `Hola, ${e.usuario.nombre}`
    case "error": return `Error: ${e.mensaje}`
  }
}

// 5) CAPSTONE `resumenEstado` — igual que el 4 pero AÑADE la rama `default` con
//    el guardia de exhaustividad `const _exhaustivo: never = e` (lo aprendiste
//    en el 02). Si mañana sumas una variante y olvidas su case, ese `never` te
//    avisa en compilación.
//      "cargando" → "⏳ esperando"
//      "exito"    → `✅ ${nombre} (${edad})`
//      "error"    → `❌ ${mensaje}`
export function resumenEstado(e: EstadoUsuario): string {
  switch (e.estado) {
    case "cargando": return "⏳ esperando"
    case "exito": return `✅ ${e.usuario.nombre} (${e.usuario.edad})`
    case "error": return `❌ ${e.mensaje}`
    default: {
      const _exhaustivo: never = e
      return _exhaustivo
    }
  }
}
