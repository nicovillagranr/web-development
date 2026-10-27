/* =============================================================================
 * EJERCICIO 04 — estados imposibles, imposibles · bloque 08
 *
 * 🎯 OBJETIVOS
 * · Sustituir una bolsa de opcionales por una unión que solo admite estados reales.
 * · Construir la variante correcta a partir de señales sueltas, con prioridad.
 * · Escribir una transición que devuelve el estado siguiente.
 *
 * 🟢 CONTEXTO — mucha gente modela una petición con banderas sueltas: cargando?,
 * datos?, error?. Este archivo enseña por qué una unión discriminada gana a esa
 * «bolsa de opcionales», y cómo traducir de una a otra. En inglés tiene nombre
 * propio: «make impossible states impossible».
 *
 * 🗺️ MAPA
 * TEORÍA · por qué la unión gana a la bolsa de opcionales → base de todo el archivo
 * BLOQUE A · leer el estado seguro → drills 1–3
 * BLOQUE B · construir solo estados válidos → drills 4–5
 * ESCALERA C · entender desdeBanderas desde el suelo → peldaños C1–C4, al final
 *
 * ▸ 5 drills + 4 peldaños, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/08-discriminated-unions/exercise-04.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — por qué la unión gana a una bolsa de opcionales
 *
 * DEFINICIÓN
 * Un tipo hecho de banderas opcionales permite combinaciones que no deberían existir
 * nunca: { cargando: true, error: 500 }, ¿carga o falló? Y {}, ¿qué es? Una unión
 * discriminada cierra esa puerta: el dato es exactamente una de sus formas, y no
 * hay manera de tener dos a la vez.
 *
 * SINTAXIS
 * type Peticion = { cargando?: boolean; datos?: string[]; error?: number }; // ❌
 *
 * type Peticion = // ✅
 *   | { fase: "inactivo" }
 *   | { fase: "cargando" }
 *   | { fase: "ok"; datos: string[] }
 *   | { fase: "fallo"; codigo: number };
 *
 * Con la segunda, { fase: "cargando", codigo: 500 } ni siquiera compila: los estados
 * que el tipo te deja escribir son los que de verdad existen.
 *
 * 🧠 ANALOGÍA — el semáforo: rojo, ámbar o verde, uno a la vez. Con tres bombillas
 * booleanas (rojo?, ambar?, verde?) puedes encender las tres, un semáforo roto que
 * no existe en la calle; con "rojo" | "ambar" | "verde", eso es inexpresable.
 *
 * 💡 Cuándo usarla: si tu instinto es poner varios boolean? o campo? que describen
 * «en qué situación estoy», casi siempre es una unión discriminada disfrazada.
 * Cámbialos por una unión con un campo fase o estado, y deja que el tipo prohíba lo
 * absurdo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* Nota: aquí la fase inicial se llama "inactivo" para que se entienda claro.
 * En React profesional (React Query, Redux Toolkit, etc.) este mismo estado se
 * llama siempre "idle" → status: "idle" | "loading" | "success" | "error". */
export type Peticion =
  | { fase: "inactivo" }
  | { fase: "cargando" }
  | { fase: "ok"; datos: string[] }
  | { fase: "fallo"; codigo: number };

/* ▸ BLOQUE A — leer el estado seguro */

/* 1) puedeReintentar — true solo si la fase es "inactivo" o "fallo" (no tiene
 * sentido reintentar mientras carga o si ya salió ok).
 * puedeReintentar({ fase: "fallo", codigo: 500 }) → true
 * puedeReintentar({ fase: "cargando" }) → false
 */
export function puedeReintentar(p: Peticion): boolean {
  if (p.fase === "inactivo" || p.fase === "fallo") return true;
  return false;
}

/* 2) cantidadDatos — el length de datos si la fase es "ok"; si no, 0.
 * cantidadDatos({ fase: "ok", datos: ["a", "b"] }) → 2
 * cantidadDatos({ fase: "inactivo" }) → 0
 */
export function cantidadDatos(p: Peticion): number {
  if (p.fase === "ok") return p.datos.length;
  return 0;
}

/* 3) descripcion — un texto por fase, con switch (p.fase) + default con el
 * guardia const _exhaustivo: never = p:
 *   "inactivo"     → "Sin empezar"
 *   "cargando" → "Cargando…"
 *   "ok"       → `${n} datos`        (n = datos.length)
 *   "fallo"    → `Error ${codigo}`
 */
export function descripcion(p: Peticion): string {
  switch (p.fase) {
    case "inactivo":
      return "Sin empezar";
    case "cargando":
      return "Cargando…";
    case "ok":
      return `${p.datos.length} datos`;
    case "fallo":
      return `Error ${p.codigo}`;
    default: {
      const _exhaustivo: never = p;
      return _exhaustivo;
    }
  }
}

/* ▸ BLOQUE B — construir solo estados válidos */

/* 4) desdeBanderas — recibes datos de una API legacy en forma de "bolsa de
 * opcionales" y devuelves la Peticion correcta (sin estados imposibles).
 * Prioridad: si hay codigo → "fallo"; si no, si cargando → "cargando";
 * si no, si hay datos → "ok"; si no → "inactivo".
 *   desdeBanderas(false, ["a"], null) → { fase: "ok", datos: ["a"] }
 *   desdeBanderas(true, null, null)   → { fase: "cargando" }
 *   desdeBanderas(false, null, 404)   → { fase: "fallo", codigo: 404 }
 */
export function desdeBanderas(
  cargando: boolean,
  datos: string[] | null,
  codigo: number | null,
): Peticion {
  if (codigo) return { fase: "fallo", codigo };
  if (cargando) return { fase: "cargando" };
  if (datos) return { fase: "ok", datos };
  return { fase: "inactivo" };
}

/* 5) Capstone reintentar — una transición: si la petición está en "inactivo" o
 * "fallo", pasa a "cargando"; en cualquier otra fase, devuélvela sin cambios.
 * (Esto es el germen del patrón reducer del exercise-07.)
 *   reintentar({ fase: "fallo", codigo: 500 }) → { fase: "cargando" }
 *   reintentar({ fase: "ok", datos: [] })      → { fase: "ok", datos: [] }
 */
export function reintentar(p: Peticion): Peticion {
  if (p.fase === "inactivo" || p.fase === "fallo") return { fase: "cargando" };
  return p;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA C — entender desdeBanderas desde el suelo (refuerzo)
 *
 * El drill 4 confunde porque mezcla tres cosas a la vez:
 * (a) prioridad: el primer if que retorna gana, y los de abajo ni se ejecutan;
 * (b) veracidad: un valor null o number se puede preguntar con if (x);
 * (c) forma: hay que devolver un objeto literal con la forma de una variante.
 *
 * Cada peldaño aísla una pieza y sube un escalón. Cuando termines C1 → C4, vuelve a
 * mirar desdeBanderas y lo vas a ver obvio. Prohibidos any y as. Resuelve en orden.
 * ───────────────────────────────────────────────────────────────────────────── */

/* C1) primeraActiva — prioridad pura, sin objetos. Antes de mezclar objetos,
 * quédate solo con la idea de «el primero que se cumple gana». Recibes tres
 * booleanos y devuelves la etiqueta del primero que sea true, mirándolos en orden
 * a → b → c. Si ninguno es true → "ninguna".
 * Clave que quiero que sientas: con return dentro del if, en cuanto uno retorna,
 * los if de abajo ni se miran. Ese «corte» es toda la magia de la prioridad.
 * (Analogía: el triage; si sangra, la enfermera ya lo mandó a urgencias y no sigue
 * revisando la fiebre.)
 *   primeraActiva(false, true, true)   → "b"  (gana b aunque c también es true)
 *   primeraActiva(false, false, true)  → "c"
 *   primeraActiva(false, false, false) → "ninguna"
 */
export function primeraActiva(a: boolean, b: boolean, c: boolean): "a" | "b" | "c" | "ninguna" {
  if (a === true) return "a";
  if (b === true) return "b";
  if (c === true) return "c";
  return "ninguna";
}
// primeraActiva(false, true, true)   // → "b"
// primeraActiva(false, false, false) // → "ninguna"

/* C2) desdeCodigo — una señal que puede ser null → elegir entre dos variantes.
 * Ahora sí objetos, pero con una sola señal: codigo: number | null. Si hay código
 * (no es null) → { fase: "fallo", codigo }. Si es null → inactivo.
 * Aquí practicas dos cosas del drill 4: (1) if (codigo) funciona porque null es
 * «falsy» y un número distinto de 0 es «truthy»; (2) devolver el objeto literal
 * de la variante "fallo" con su campo propio codigo.
 *   desdeCodigo(404)  → { fase: "fallo", codigo: 404 }
 *   desdeCodigo(null) → { fase: "inactivo" }
 */
export function desdeCodigo(codigo: number | null): Peticion {
  if (codigo) {
    return { fase: "fallo", codigo };
  }
  return { fase: "inactivo" };
}
// desdeCodigo(404)  // → { fase: "fallo", codigo: 404 }
// desdeCodigo(null) // → { fase: "inactivo" }

/* C3) desdeCargaODatos — dos señales con prioridad. Si cargando → "cargando"; si
 * no, si hay datos → { fase: "ok", datos }; si no → inactivo. Dos if con return y
 * el return final: es C1 (prioridad) + C2 (objetos) juntos.
 *   desdeCargaODatos(true,  ["a"]) → { fase: "cargando" }
 *   desdeCargaODatos(false, ["a"]) → { fase: "ok", datos: ["a"] }
 *   desdeCargaODatos(false, null)  → { fase: "inactivo" }
 */
export function desdeCargaODatos(cargando: boolean, datos: string[] | null): Peticion {
  if (cargando) {
    return { fase: "cargando" };
  }
  if (datos) {
    return { fase: "ok", datos };
  }
  return { fase: "inactivo" };
}
// desdeCargaODatos(true, ["a"])  // → { fase: "cargando" }
// desdeCargaODatos(false, null)  // → { fase: "inactivo" }

/* C4) ganaPrimero — el orden importa: la trampa exacta del drill 4. Este es el
 * corazón del asunto. Recibes dos señales que pueden estar activas a la vez,
 * cargando y codigo, y el protocolo dice: el error manda. Si hay codigo, devuelve
 * "fallo" aunque cargando también sea true; solo si no hay código miras cargando.
 * Piensa cuál de los dos if va primero. Si te equivocas de orden, el caso
 * (true, 500) te dará la respuesta incorrecta, que es exactamente el test que hoy
 * te falla en desdeBanderas.
 *   ganaPrimero(true,  500)  → "fallo"     (el código gana aunque cargue)
 *   ganaPrimero(true,  null) → "cargando"
 *   ganaPrimero(false, null) → "cargando"  (no hay código → cae a cargando)
 */
export function ganaPrimero(cargando: boolean, codigo: number | null): "cargando" | "fallo" {
  if (codigo) {
    return "fallo";
  }
  if (cargando) {
    return "cargando";
  }
  return "cargando";
}
// ganaPrimero(true, 500)  // → "fallo"
// ganaPrimero(true, null) // → "cargando"
