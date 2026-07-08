/* =============================================================================
 * EJERCICIO 04 — Estados imposibles, imposibles ("make impossible states impossible")
 * =============================================================================
 *
 * ▸ EXPLICACIÓN — por qué una DU gana a una "bolsa de opcionales"
 * ----------------------------------------------------------------------------
 * Mucha gente modela una petición así, con banderas sueltas:
 *
 *   type Peticion = {
 *     cargando?: boolean;
 *     datos?: string[];
 *     error?: number;
 *   };
 *
 * El problema: ese tipo PERMITE combinaciones que no deberían existir nunca.
 * `{ cargando: true, error: 500 }` ¿está cargando o falló? `{}` ¿qué es? Cada
 * `if` que escribas tendrá que rezar para que no llegue un objeto contradictorio.
 * Son "estados imposibles" que el tipo te deja construir igualmente.
 *
 * Una unión discriminada CIERRA esa puerta. Si el dato es exactamente UNA de
 * estas formas, no hay manera de tener dos a la vez:
 *
 *   type Peticion =
 *     | { fase: "idle" }
 *     | { fase: "cargando" }
 *     | { fase: "ok"; datos: string[] }
 *     | { fase: "fallo"; codigo: number };
 *
 * Ahora `{ fase: "cargando", codigo: 500 }` ni siquiera compila. El conjunto de
 * estados que el tipo te deja escribir = el conjunto de estados que de verdad
 * existen. A esto se le llama "hacer imposibles los estados imposibles".
 *
 *
 * ▸ ANALOGÍA — el semáforo
 * ----------------------------------------------------------------------------
 * Un semáforo está en rojo, ámbar o verde: UNO a la vez. Modelarlo con tres
 * bombillas booleanas (`rojo?`, `ambar?`, `verde?`) te deja encender las tres
 * juntas — un semáforo roto que no existe en la calle. Modelarlo como
 * `"rojo" | "ambar" | "verde"` hace que "las tres encendidas" sea inexpresable.
 * La DU es el semáforo que no se puede romper.
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 *   - Siempre que tu instinto sea poner varios `boolean?`/`campo?` que describen
 *     "en qué situación estoy": casi siempre es una DU disfrazada. Cámbialos por
 *     una unión con un campo "fase"/"estado" y deja que el tipo prohíba lo absurdo.
 *
 *
 * ▸ EJERCICIO — drills en escalera. EN ORDEN. ❌ nada de `any` ni `as`.
 *     pnpm test:run src/exercises/08-discriminated-unions/exercise-04.test.ts
 * ===========================================================================*/

export type Peticion =
  | { fase: "idle" }
  | { fase: "cargando" }
  | { fase: "ok"; datos: string[] }
  | { fase: "fallo"; codigo: number }


/* ── BLOQUE A — leer el estado seguro ──────────────────────────────────────── */

// 1) `puedeReintentar` — true solo si la fase es "idle" o "fallo" (no tiene
//    sentido reintentar mientras carga o si ya salió ok).
//    puedeReintentar({ fase: "fallo", codigo: 500 }) → true
//    puedeReintentar({ fase: "cargando" }) → false
export function puedeReintentar(p: Peticion): boolean {
  if (p.fase === "idle" || p.fase === "fallo") return true
  return false
}

// 2) `cantidadDatos` — el length de `datos` si la fase es "ok"; si no, 0.
//    cantidadDatos({ fase: "ok", datos: ["a", "b"] }) → 2
//    cantidadDatos({ fase: "idle" }) → 0
export function cantidadDatos(p: Peticion): number {
  if (p.fase === "ok") return p.datos.length
  return 0
}

// 3) `descripcion` — un texto por fase, con `switch (p.fase)` + `default` con el
//    guardia `const _exhaustivo: never = p`:
//      "idle"     → "Sin empezar"
//      "cargando" → "Cargando…"
//      "ok"       → `${n} datos`        (n = datos.length)
//      "fallo"    → `Error ${codigo}`
export function descripcion(p: Peticion): string {
  switch (p.fase) {
    case: "idle": return "Sin empezar"
    case: "cargando": return "Cargando…"
    case: "ok": return `${p.datos.length} datos`
    case: "fallo": return `Error ${p.codigo}`
    default: const _exhaustivo: never = p
  }
}


/* ── BLOQUE B — construir SOLO estados válidos ─────────────────────────────── */

// 4) `desdeBanderas` — recibes datos de una API legacy en forma de "bolsa de
//    opcionales" y devuelves la `Peticion` correcta (sin estados imposibles).
//    Prioridad: si hay `codigo` → "fallo"; si no, si `cargando` → "cargando";
//    si no, si hay `datos` → "ok"; si no → "idle".
//      desdeBanderas(false, ["a"], null) → { fase: "ok", datos: ["a"] }
//      desdeBanderas(true, null, null)   → { fase: "cargando" }
//      desdeBanderas(false, null, 404)   → { fase: "fallo", codigo: 404 }
export function desdeBanderas(cargando: boolean, datos: string[] | null, codigo: number | null,): Peticion {
  if (cargando) return { fase: "cargando" }
  if (codigo) return { fase: "fallo", codigo }
  if (datos) return { fase: "ok", datos }
  return { fase: "idle" }
}

// 5) CAPSTONE `reintentar` — una TRANSICIÓN: si la petición está en "idle" o
//    "fallo", pasa a "cargando"; en cualquier otra fase, devuélvela sin cambios.
//    (Esto es el germen del patrón reducer del exercise-07.)
//      reintentar({ fase: "fallo", codigo: 500 }) → { fase: "cargando" }
//      reintentar({ fase: "ok", datos: [] })      → { fase: "ok", datos: [] }
export function reintentar(p: Peticion): Peticion {
  // completa aquí
  return p
}
