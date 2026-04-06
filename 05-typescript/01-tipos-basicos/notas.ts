// ============================================================
// 01 — TIPOS BÁSICOS
// ============================================================

// ------------------------------------------------------------
// Primitivos
// ------------------------------------------------------------
const nombre: string = "Nico";
const edad: number = 23;
const esDev: boolean = true;
const sinValor: null = null;
const noDefinido: undefined = undefined;

console.log({ nombre, edad, esDev, sinValor, noDefinido });

// ------------------------------------------------------------
// any: desactiva el type checking (EVITAR)
// ------------------------------------------------------------
let cualquiera: any = "texto";
cualquiera = 42;
cualquiera = true;
// Funciona pero pierdes TODAS las ventajas de TS.
// Regla: usar any solo como último recurso.

// ------------------------------------------------------------
// unknown: "todavía no sé qué es, pero obligame a verificar"
// ------------------------------------------------------------
let valorMisterioso: unknown = "quizás un string";

// valorMisterioso.toUpperCase(); // ❌ error: hay que verificar primero
if (typeof valorMisterioso === "string") {
  console.log(valorMisterioso.toUpperCase()); // ✅ aquí TS sabe que es string
}

// ------------------------------------------------------------
// Inferencia: dejar que TS adivine
// ------------------------------------------------------------
const ciudad = "Rosario";     // string (inferido)
const temperatura = 22.5;     // number (inferido)
const lenguajes = ["JS", "TS", "Go"]; // string[] (inferido)

// Regla de oro: si la inferencia acierta, NO escribas el tipo manual.
// Escríbelo cuando quieras ser explícito (ej: params de funciones, APIs públicas).

// ------------------------------------------------------------
// Tipos especiales: never y void
// ------------------------------------------------------------

// void: función que no retorna nada
function logear(msg: string): void {
  console.log(msg);
}

// never: función que nunca retorna (lanza error o loop infinito)
function explotar(msg: string): never {
  throw new Error(msg);
}

logear("hola");

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Declara una variable `precio` de tipo number y otra `moneda` de tipo string.
// 2. Crea una función `formatearPrecio(precio, moneda)` que retorne algo tipo "150 USD".
// 3. Declara una variable `dato: unknown` y haz un narrowing para convertirla a número
//    solo si es realmente un número.

export { };
