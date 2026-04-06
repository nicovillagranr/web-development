// ============================================================
// 00 — INTRODUCCIÓN A TYPESCRIPT
// ============================================================

// TypeScript es JavaScript + tipos estáticos.
// El navegador NO entiende TS: se compila a JS antes de ejecutarse.
//
// ¿Qué nos da?
// - Seguridad: errores detectados antes de ejecutar (en el editor).
// - Mantenibilidad: el código se auto-documenta con los tipos.
// - Refactorización: renombrar / mover código sin romper nada.
// - Autocompletado brutal en el editor.

// ------------------------------------------------------------
// Ejemplo: el mismo código en JS vs TS
// ------------------------------------------------------------

// JavaScript (sin avisos, error en runtime):
//   function saludar(nombre) { return "Hola " + nombre.toUpperCase(); }
//   saludar(42); // 💥 TypeError: nombre.toUpperCase is not a function

// TypeScript (error en el editor, antes de ejecutar):
function saludar(nombre: string): string {
  return "Hola " + nombre.toUpperCase();
}

console.log(saludar("Nico"));
// saludar(42); // ❌ TS marca error: Argument of type 'number' is not assignable to 'string'

// ------------------------------------------------------------
// Inferencia: muchas veces NO hace falta escribir el tipo
// ------------------------------------------------------------

let edad = 28;          // TS infiere: number
let activo = true;      // TS infiere: boolean
let nombre = "Nico";    // TS infiere: string

// edad = "veintiocho"; // ❌ error: TS sabe que edad es number

console.log({ edad, activo, nombre });

export {};
