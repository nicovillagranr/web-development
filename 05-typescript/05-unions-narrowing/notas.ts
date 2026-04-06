// ============================================================
// 05 — UNIONS, LITERAL TYPES Y NARROWING
// ============================================================

// ------------------------------------------------------------
// Union types: un valor puede ser de varios tipos
// ------------------------------------------------------------
let id: string | number;
id = 42;
id = "abc-123";
// id = true; // ❌ error

// ------------------------------------------------------------
// Narrowing: reducir el tipo en tiempo de ejecución
// ------------------------------------------------------------
function imprimirId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // aquí TS sabe que id es string
  } else {
    console.log(id.toFixed(2));    // aquí TS sabe que id es number
  }
}

imprimirId("abc");
imprimirId(3.14159);

// ------------------------------------------------------------
// Literal types: valores EXACTOS como tipo
// ------------------------------------------------------------
// Esto es lo que reemplaza a los enums en TS moderno.
type Estado = "pendiente" | "en-progreso" | "completado";

let tareaEstado: Estado = "pendiente";
tareaEstado = "completado";
// tareaEstado = "hecho"; // ❌ error: solo los 3 valores permitidos

// Combinado con funciones:
function cambiarEstado(nuevo: Estado): void {
  console.log(`Estado cambiado a: ${nuevo}`);
}

cambiarEstado("en-progreso");

// ------------------------------------------------------------
// Literal types numéricos
// ------------------------------------------------------------
type DadoValor = 1 | 2 | 3 | 4 | 5 | 6;

function tirarDado(): DadoValor {
  return (Math.floor(Math.random() * 6) + 1) as DadoValor;
}

console.log(tirarDado());

// ------------------------------------------------------------
// Narrowing con 'in' (verificar propiedades)
// ------------------------------------------------------------
interface Pajaro {
  tipo: "pajaro";
  volar(): void;
}

interface Pez {
  tipo: "pez";
  nadar(): void;
}

function mover(animal: Pajaro | Pez): void {
  if ("volar" in animal) {
    animal.volar(); // TS sabe: Pajaro
  } else {
    animal.nadar(); // TS sabe: Pez
  }
}

// ------------------------------------------------------------
// Discriminated unions: el patrón MÁS potente de TS
// ------------------------------------------------------------
// Una propiedad "discriminante" le dice a TS qué forma tiene el objeto.
// Es el patrón estrella para manejar estados (éxito/error/loading).

type Resultado<T> =
  | { estado: "loading" }
  | { estado: "ok"; data: T }
  | { estado: "error"; mensaje: string };

function renderResultado(r: Resultado<string>): string {
  switch (r.estado) {
    case "loading":
      return "Cargando...";
    case "ok":
      return `Datos: ${r.data}`;      // TS sabe que hay `data`
    case "error":
      return `Error: ${r.mensaje}`;   // TS sabe que hay `mensaje`
  }
}

console.log(renderResultado({ estado: "loading" }));
console.log(renderResultado({ estado: "ok", data: "Usuario cargado" }));
console.log(renderResultado({ estado: "error", mensaje: "404 Not Found" }));

// Este patrón lo vas a usar UN MONTÓN en React para manejar fetchs.

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Crea un type `Tema = "claro" | "oscuro"` y una función `aplicarTema(t: Tema)`.
// 2. Crea una función `formatear(valor: string | number | Date): string` que use narrowing.
// 3. Modela un `Resultado<User>` con discriminated unions y escribe una función que lo consuma.

export {};
