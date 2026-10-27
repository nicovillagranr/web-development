/* =============================================================================
 * EJERCICIO 03 — la máquina de estados de carga: cargando / éxito / error · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Modelar el estado de una petición con variantes que llevan campos distintos.
 * · Leer un campo exclusivo de una variante solo después de estrechar.
 * · Cubrir todos los estados con un switch y su guardia never.
 *
 * 🟢 CONTEXTO — hasta ahora tus variantes se parecían bastante: figuras con un
 * número cada una. El verdadero superpoder de las uniones discriminadas aparece
 * cuando cada variante lleva datos diferentes, y algunos campos solo existen en una.
 * El caso estrella, el de cada app de React que pide datos a un servidor, es el
 * estado de una petición asíncrona.
 *
 * 🗺️ MAPA
 * BLOQUE A · leer un campo que solo existe en una variante → drills 1–3
 * BLOQUE B · el switch que cubre todos los estados → drills 4–5
 *
 * ▸ 5 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-03.test.ts
 * pnpm typecheck
 * ============================================================================= */

export type EstadoUsuario =
  | { estado: "cargando" }
  | { estado: "exito"; usuario: { nombre: string; edad: number } }
  | { estado: "error"; mensaje: string };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — leer un campo que solo existe en una variante
 *
 * DEFINICIÓN
 * Cuando cada variante lleva campos distintos, TS no te deja tocar un campo propio
 * hasta que compruebas la etiqueta. Es exactamente lo que quieres: es imposible
 * leer los datos antes de saber que llegaron.
 *
 * SINTAXIS
 * type EstadoUsuario =
 *   | { estado: "cargando" }                           // aún no hay nada
 *   | { estado: "exito"; usuario: { nombre: string } } // ya llegó
 *   | { estado: "error"; mensaje: string };            // falló
 *
 * usuario solo existe cuando estado es "exito", y mensaje solo cuando es "error".
 *
 * 🧠 ANALOGÍA — el paquete que aún no llega: mientras está «en reparto» no hay caja
 * que abrir; cuando llega («entregado») aparece la caja con su contenido, y si se
 * pierde («incidencia») tienes un mensaje en vez de caja. El estado te dice qué
 * tienes derecho a abrir.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) estaCargando — true solo si el estado es "cargando".
 * estaCargando({ estado: "cargando" }) → true
 * estaCargando({ estado: "error", mensaje: "x" }) → false
 */
export function estaCargando(e: EstadoUsuario): boolean {
  return e.estado === "cargando";
}

/* 2) nombreSiExito — el nombre del usuario si es "exito"; si no, null.
 * nombreSiExito({ estado: "exito", usuario: { nombre: "Ana", edad: 30 } }) → "Ana"
 * nombreSiExito({ estado: "cargando" }) → null
 * (Estrecha por e.estado antes de tocar e.usuario.)
 */
export function nombreSiExito(e: EstadoUsuario): string | null {
  if (e.estado === "exito") {
    return e.usuario.nombre;
  } else {
    return null;
  }
}

/* 3) edadOcero — la edad si es "exito"; si no, 0.
 * edadOcero({ estado: "exito", usuario: { nombre: "Ana", edad: 30 } }) → 30
 * edadOcero({ estado: "error", mensaje: "x" }) → 0
 */
export function edadOcero(e: EstadoUsuario): number {
  if (e.estado === "exito") {
    return e.usuario.edad;
  } else {
    return 0;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — el switch que cubre todos los estados
 *
 * SINTAXIS
 * function saludo(e: EstadoUsuario): string {
 *   switch (e.estado) {
 *     case "cargando": return "Cargando…";
 *     case "exito":    return `Hola, ${e.usuario.nombre}`; // aquí sí existe
 *     case "error":    return `Ups: ${e.mensaje}`;         // aquí sí existe
 *   }
 * }
 *
 * 💡 Cuándo usarlo: siempre que pidas datos a una API. Modela los 3 (o 4) estados
 * como una unión discriminada en vez de tres booleanos sueltos. En FASE 2
 * (13-fetch-tipado) será tu pan de cada día, y cada rama del switch será un trozo
 * de UI distinto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) mensajeEstado — un texto por cada estado, con switch (e.estado):
 * "cargando" → "Cargando…"
 * "exito"    → `Hola, ${nombre}`   (usa e.usuario.nombre)
 * "error"    → `Error: ${mensaje}` (usa e.mensaje)
 */
export function mensajeEstado(e: EstadoUsuario): string {
  switch (e.estado) {
    case "cargando":
      return "Cargando…";
    case "exito":
      return `Hola, ${e.usuario.nombre}`;
    case "error":
      return `Error: ${e.mensaje}`;
  }
}

/* 5) Capstone resumenEstado — igual que el 4 pero añade la rama default con
 * el guardia de exhaustividad const _exhaustivo: never = e (lo aprendiste
 * en el 02). Si mañana sumas una variante y olvidas su case, ese never te
 * avisa en compilación.
 *   "cargando" → "⏳ esperando"
 *   "exito"    → `✅ ${nombre} (${edad})`
 *   "error"    → `❌ ${mensaje}`
 */
export function resumenEstado(e: EstadoUsuario): string {
  switch (e.estado) {
    case "cargando":
      return "⏳ esperando";
    case "exito":
      return `✅ ${e.usuario.nombre} (${e.usuario.edad})`;
    case "error":
      return `❌ ${e.mensaje}`;
    default: {
      const _exhaustivo: never = e;
      return _exhaustivo;
    }
  }
}
