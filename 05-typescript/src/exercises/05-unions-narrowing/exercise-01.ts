/* =============================================================================
 * EJERCICIO 01 — Tipos literales y unions de literales      [APROBADO ✅]
 * =============================================================================
 *
 * ▸ EXPLICACIÓN
 * ----------------------------------------------------------------------------
 * Un **tipo literal** es un tipo cuyo único valor válido es un literal
 * concreto: no "cualquier string", sino EXACTAMENTE `"red"`. No "cualquier
 * number", sino EXACTAMENTE `42`.
 *
 *   let x: "red"   = "red"   // ✅
 *   let y: "red"   = "blue"  // ❌ TS: '"blue"' no es asignable a '"red"'
 *   let z: 200     = 200     // ✅
 *   let w: 200     = 404     // ❌
 *
 * Por sí solos los tipos literales son poco útiles (¿quién quiere una variable
 * que solo puede valer "red"?). Donde brillan es **combinados con `|`**:
 *
 *   type Color = "red" | "green" | "blue";
 *
 * `Color` ahora es un "tipo cerrado": acepta EXACTAMENTE esos 3 strings y
 * rechaza cualquier otro. No es `string` (acepta infinitos strings). No es
 * un enum. Es una lista finita.
 *
 *
 * ▸ ANALOGÍA — examen tipo test
 * ----------------------------------------------------------------------------
 * Un parámetro tipado `string` es como una pregunta de respuesta abierta:
 * el alumno puede escribir cualquier cosa. Imposible validar al instante.
 *
 * Un parámetro tipado `"A" | "B" | "C" | "D"` es como una pregunta tipo
 * test: solo 4 respuestas posibles. Si escribes "E", suspendes en el acto.
 * TypeScript es el profesor que corrige antes de que ejecutes el examen.
 *
 *
 * ▸ EJEMPLO 1 — tipo literal en variable
 * ----------------------------------------------------------------------------
 *
 *   type Status = "idle" | "loading" | "error" | "success";
 *
 *   let s: Status = "idle";      // ✅
 *   s = "loading";               // ✅
 *   s = "loaded";                // ❌ "loaded" no está en el union
 *
 *
 * ▸ EJEMPLO 2 — restringir parámetros de función
 * ----------------------------------------------------------------------------
 *
 *   function alinear(pos: "left" | "center" | "right") {
 *     // dentro: TS sabe que pos solo puede ser una de las 3
 *   }
 *
 *   alinear("left");   // ✅
 *   alinear("middle"); // ❌ "middle" no está permitido
 *
 *
 * ▸ EJEMPLO 3 — derivar el union desde un array `as const`
 * ----------------------------------------------------------------------------
 *
 *   const SIZES = ["S", "M", "L"] as const;
 *   type Size = typeof SIZES[number];   // "S" | "M" | "L"
 *
 * `typeof SIZES` te da el tipo de la constante (`readonly ["S", "M", "L"]`).
 * `[number]` indexa la tupla con CUALQUIER posición numérica → te devuelve
 * el union de todos los elementos. Truco clásico: en un solo sitio
 * mantienes la lista de valores Y el tipo derivado.
 *
 *
 * ▸ CUÁNDO USAR
 * ----------------------------------------------------------------------------
 * Siempre que un valor venga de un conjunto cerrado y conocido:
 *   - status de UI: "idle" | "loading" | "error" | "success"
 *   - posiciones: "top" | "bottom" | "left" | "right"
 *   - roles: "admin" | "editor" | "viewer"
 *   - HTTP methods: "GET" | "POST" | "PUT" | "DELETE"
 *
 * Si el valor puede ser "cualquier string", usa `string`. Si es uno de N
 * valores conocidos, usa el union literal. Casi siempre quieres lo segundo.
 *
 *
 * ▸ EJERCICIO
 * ----------------------------------------------------------------------------
 *
 * Reglas:
 *   - ❌ No uses `any`, no uses `as X` (excepto `as const`).
 *   - ❌ No tipes como `string` lo que tenga un conjunto cerrado.
 *   - ✅ `pnpm test:run` y `pnpm typecheck` limpios.
 *
 * ===========================================================================*/

// 1) Define un tipo `Direction` que solo permita los 4 puntos cardinales
//    de movimiento: "up", "down", "left", "right".
//    Y exporta una constante `start: Direction` con el valor "up".
export type Direction = "up" | "down" | "left" | "right";
export const start: Direction = "up";


// 2) Una función `move` que reciba una dirección (de tipo Direction) y un
//    número de pasos, y devuelva un string descriptivo: "moviendo 3 pasos up".
//    Si alguien llama move("diagonal", 2), TS debe quejarse.
export function move(direction: Direction, steps: number) {
  return `moviendo ${steps} pasos ${direction}`;
}
move("up", 3) // "moviendo 3 pasos up"

// 3) Tienes esta lista fija de roles. Derívale un tipo `Role` SIN escribir
//    a mano el union "admin" | "editor" | "viewer". Usa el truco del
//    `typeof X[number]` que viste en el ejemplo 3.
//
//    Pista: la constante necesita `as const` para que el truco funcione.
export const ROLES = ["admin", "editor", "viewer"] as const;
export type Role = typeof ROLES[number]; // <- cámbialo
