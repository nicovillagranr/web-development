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
 *     | { fase: "inactivo" }
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

// NOTA: aquí la fase inicial se llama "inactivo" para que se entienda claro.
// En React profesional (React Query, Redux Toolkit, etc.) este mismo estado se
// llama SIEMPRE "idle" → status: "idle" | "loading" | "success" | "error".
export type Peticion =
  | { fase: "inactivo" }
  | { fase: "cargando" }
  | { fase: "ok"; datos: string[] }
  | { fase: "fallo"; codigo: number }


/* ── BLOQUE A — leer el estado seguro ──────────────────────────────────────── */

// 1) `puedeReintentar` — true solo si la fase es "inactivo" o "fallo" (no tiene
//    sentido reintentar mientras carga o si ya salió ok).
//    puedeReintentar({ fase: "fallo", codigo: 500 }) → true
//    puedeReintentar({ fase: "cargando" }) → false
export function puedeReintentar(p: Peticion): boolean {
  if (p.fase === "inactivo" || p.fase === "fallo") return true
  return false
}

// 2) `cantidadDatos` — el length de `datos` si la fase es "ok"; si no, 0.
//    cantidadDatos({ fase: "ok", datos: ["a", "b"] }) → 2
//    cantidadDatos({ fase: "inactivo" }) → 0
export function cantidadDatos(p: Peticion): number {
  if (p.fase === "ok") return p.datos.length
  return 0
}

// 3) `descripcion` — un texto por fase, con `switch (p.fase)` + `default` con el
//    guardia `const _exhaustivo: never = p`:
//      "inactivo"     → "Sin empezar"
//      "cargando" → "Cargando…"
//      "ok"       → `${n} datos`        (n = datos.length)
//      "fallo"    → `Error ${codigo}`
export function descripcion(p: Peticion): string {
  switch (p.fase) {
    case "inactivo":
      return "Sin empezar"
    case "cargando":
      return "Cargando…"
    case "ok":
      return `${p.datos.length} datos`
    case "fallo":
      return `Error ${p.codigo}`
    default: {
      const _exhaustivo: never = p
      return _exhaustivo
    }
  }
}


/* ── BLOQUE B — construir SOLO estados válidos ─────────────────────────────── */

// 4) `desdeBanderas` — recibes datos de una API legacy en forma de "bolsa de
//    opcionales" y devuelves la `Peticion` correcta (sin estados imposibles).
//    Prioridad: si hay `codigo` → "fallo"; si no, si `cargando` → "cargando";
//    si no, si hay `datos` → "ok"; si no → "inactivo".
//      desdeBanderas(false, ["a"], null) → { fase: "ok", datos: ["a"] }
//      desdeBanderas(true, null, null)   → { fase: "cargando" }
//      desdeBanderas(false, null, 404)   → { fase: "fallo", codigo: 404 }
export function desdeBanderas(cargando: boolean, datos: string[] | null, codigo: number | null,): Peticion {
  if (codigo) return { fase: "fallo", codigo }
  if (cargando) return { fase: "cargando" }
  if (datos) return { fase: "ok", datos }
  return { fase: "inactivo" }
}

// 5) CAPSTONE `reintentar` — una TRANSICIÓN: si la petición está en "inactivo" o
//    "fallo", pasa a "cargando"; en cualquier otra fase, devuélvela sin cambios.
//    (Esto es el germen del patrón reducer del exercise-07.)
//      reintentar({ fase: "fallo", codigo: 500 }) → { fase: "cargando" }
//      reintentar({ fase: "ok", datos: [] })      → { fase: "ok", datos: [] }
export function reintentar(p: Peticion): Peticion {
  if (p.fase === "inactivo" || p.fase === "fallo") return { fase: "cargando" }
  return p
}


/* ════════════════════════════════════════════════════════════════════════════
 * BLOQUE C — ENTENDER `desdeBanderas` DESDE EL SUELO (escalera de refuerzo)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * El drill 4 confunde porque mezcla TRES cosas a la vez:
 *   (a) "el primer `if` que retorna gana, los de abajo ni se ejecutan" (prioridad),
 *   (b) que un valor `null`/`number` se puede preguntar con `if (x)` (veracidad),
 *   (c) que hay que DEVOLVER un objeto literal con la forma de una variante.
 *
 * Vamos a aislar cada pieza en un mini-drill y subir de a un escalón. Cuando
 * termines C1→C4, vuelve a mirar `desdeBanderas` y lo vas a ver obvio.
 *
 * Reglas de siempre: ❌ nada de `any` ni `as`. Resuelve EN ORDEN.
 * ==========================================================================*/


/* ── C1 — PRIORIDAD PURA, sin objetos ─────────────────────────────────────────
 * Antes de mezclar objetos, quédate solo con la idea de "el primero que se
 * cumple gana". Recibes tres booleanos y devuelves la ETIQUETA del primero que
 * sea `true`, mirándolos en orden a → b → c. Si ninguno es true → "ninguna".
 *
 * Clave que quiero que SIENTAS: con `return` dentro del `if`, en cuanto uno
 * retorna, los `if` de abajo NI SE MIRAN. Ese "corte" es toda la magia de la
 * prioridad. (Analogía: el triage; si sangra, la enfermera ya lo mandó a
 * urgencias y no sigue revisando la fiebre.)
 *
 *   primeraActiva(false, true, true)  → "b"   (gana b aunque c también es true)
 *   primeraActiva(false, false, true) → "c"
 *   primeraActiva(false, false, false)→ "ninguna"
 */
export function primeraActiva(a: boolean, b: boolean, c: boolean,): "a" | "b" | "c" | "ninguna" {
  if (a === true) return "a"
  if (b === true) return "b"
  if (c === true) return "c"
  return "ninguna"
}
// primeraActiva(false, true, true)   // → "b"
// primeraActiva(false, false, false) // → "ninguna"


/* ── C2 — UNA señal `null`able → elegir entre DOS variantes ────────────────────
 * Ahora sí objetos, pero con UNA sola señal. Recibes `codigo: number | null`.
 * Si hay código (no es null) → { fase: "fallo", codigo }. Si es null → inactivo.
 *
 * Aquí practicas dos cosas del drill 4: (1) `if (codigo)` funciona porque `null`
 * es "falsy" y un número distinto de 0 es "truthy"; (2) devolver el objeto
 * literal de la variante "fallo" con su campo propio `codigo`.
 *
 *   desdeCodigo(404)  → { fase: "fallo", codigo: 404 }
 *   desdeCodigo(null) → { fase: "inactivo" }
 */
export function desdeCodigo(codigo: number | null): Peticion {
  if (codigo) {
    return { fase: "fallo", codigo }
  }
  return { fase: "inactivo" }
}
// desdeCodigo(404)  // → { fase: "fallo", codigo: 404 }
// desdeCodigo(null) // → { fase: "inactivo" }


/* ── C3 — DOS señales con prioridad ────────────────────────────────────────────
 * Subimos a dos señales. Prioridad: si `cargando` → "cargando"; si no, si hay
 * `datos` → { fase: "ok", datos }; si no → inactivo. Dos `if` con return + el
 * return final. Es C1 (prioridad) + C2 (objetos) juntos.
 *
 *   desdeCargaODatos(true,  ["a"]) → { fase: "cargando" }
 *   desdeCargaODatos(false, ["a"]) → { fase: "ok", datos: ["a"] }
 *   desdeCargaODatos(false, null)  → { fase: "inactivo" }
 */
export function desdeCargaODatos(cargando: boolean, datos: string[] | null,): Peticion {
  if (cargando) {
    return { fase: "cargando" }
  }
  if (datos) {
    return { fase: "ok", datos }
  }
  return { fase: "inactivo" }
}
// desdeCargaODatos(true, ["a"])  // → { fase: "cargando" }
// desdeCargaODatos(false, null)  // → { fase: "inactivo" }


/* ── C4 — EL ORDEN IMPORTA (la trampa exacta del drill 4) ──────────────────────
 * Este es el corazón del asunto. Recibes DOS señales que pueden estar activas a
 * la vez: `cargando` y `codigo`. El protocolo dice: EL ERROR MANDA. O sea, si
 * hay `codigo`, devuelve "fallo" AUNQUE `cargando` también sea true; solo si no
 * hay código miras `cargando`.
 *
 * Piensa cuál de los dos `if` va PRIMERO. Si te equivocas de orden, el caso
 * (true, 500) te dará la respuesta incorrecta — que es EXACTAMENTE el test que
 * hoy te falla en `desdeBanderas`.
 *
 *   ganaPrimero(true,  500)  → "fallo"      (el código gana aunque cargue)
 *   ganaPrimero(true,  null) → "cargando"
 *   ganaPrimero(false, null) → "cargando"   (no hay código → cae a cargando)
 */
export function ganaPrimero(cargando: boolean, codigo: number | null,): "cargando" | "fallo" {
  if (codigo) {
    return "fallo"
  }
  if (cargando) {
    return "cargando"
  }
  return "cargando"
}
// ganaPrimero(true, 500)  // → "fallo"
// ganaPrimero(true, null) // → "cargando"
