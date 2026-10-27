/* =============================================================================
 * EJERCICIO 01 — tipos literales y uniones de literales · bloque 05 · aprobado ✅
 *
 * 🎯 OBJETIVOS
 * · Restringir un valor a un conjunto cerrado con una unión de literales.
 * · Derivar la unión desde un array as const, sin escribirla a mano.
 *
 * 🟢 CONTEXTO — un parámetro tipado string acepta infinitos valores. Pero muchos
 * valores vienen de un conjunto cerrado y conocido: el estado de la UI, una
 * posición, un rol, un método HTTP. Para esos, TS tiene un tipo que solo admite la
 * lista exacta.
 *
 * 🗺️ MAPA
 * TEORÍA · tipos literales y uniones de literales → drills 1–3
 *
 * ▸ 3 drills en orden. Prohibidos any y as X (salvo as const). No tipes como string
 * lo que tenga un conjunto cerrado.
 * pnpm test:run src/exercises/05-unions-narrowing/exercise-01.test.ts
 * pnpm typecheck
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — tipos literales y uniones de literales
 *
 * DEFINICIÓN
 * Un tipo literal es un tipo cuyo único valor válido es un literal concreto: no
 * «cualquier string», sino exactamente "red"; no «cualquier number», sino
 * exactamente 42. Solos sirven de poco; brillan combinados con |. Una unión de
 * literales es un tipo cerrado: acepta exactamente esos valores. No es string, ni
 * un enum: es una lista finita.
 *
 * SINTAXIS
 * type Status = "idle" | "loading" | "error" | "success";
 * function alinear(pos: "left" | "center" | "right") { … }
 *
 * Ejemplos:
 * let s: Status = "idle" → ✅
 * s = "loaded"           → ❌ "loaded" no está en la unión
 * alinear("middle")      → ❌ "middle" no está permitido
 *
 * Ejemplo 3 — derivar la unión desde un array as const:
 * const SIZES = ["S", "M", "L"] as const;
 * type Size = typeof SIZES[number]; // "S" | "M" | "L"
 *
 * 🗣️ LAS PIEZAS
 * typeof SIZES → el tipo de la constante: readonly ["S", "M", "L"]
 * [number]     → indexa la tupla con cualquier posición: la unión de sus elementos
 *
 * Truco clásico: en un solo sitio mantienes la lista de valores y el tipo derivado.
 *
 * 🧠 ANALOGÍA — un examen tipo test: string es una pregunta de respuesta abierta,
 * imposible de validar al instante; "A" | "B" | "C" | "D" solo admite 4 respuestas,
 * y si escribes «E» suspendes en el acto. TypeScript es el profesor que corrige
 * antes de que ejecutes el examen.
 *
 * 💡 Cuándo usarla: siempre que un valor venga de un conjunto cerrado y conocido
 * (status de UI, posiciones, roles, métodos HTTP). Si puede ser cualquier string,
 * usa string; si es uno de N valores conocidos, la unión de literales. Casi
 * siempre quieres lo segundo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Define un tipo Direction que solo permita los 4 puntos cardinales
 * de movimiento: "up", "down", "left", "right".
 * Y exporta una constante start: Direction con el valor "up".
 */
export type Direction = "up" | "down" | "left" | "right";
export const start: Direction = "up";

/* 2) Una función move que reciba una dirección (de tipo Direction) y un
 * número de pasos, y devuelva un string descriptivo: "moviendo 3 pasos up".
 * Si alguien llama move("diagonal", 2), TS debe quejarse.
 */
export function move(direction: Direction, steps: number) {
  return `moviendo ${steps} pasos ${direction}`;
}
move("up", 3); // "moviendo 3 pasos up"

/* 3) Tienes esta lista fija de roles. Derívale un tipo Role sin escribir
 * a mano el union "admin" | "editor" | "viewer". Usa el truco del
 * typeof X[number] que viste en el ejemplo 3.
 *
 * Pista: la constante necesita as const para que el truco funcione.
 */
export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number]; // <- cámbialo
