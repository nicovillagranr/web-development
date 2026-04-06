// ============================================================
// 06 — GENERICS
// ============================================================

// Los generics permiten escribir código REUTILIZABLE que funciona
// con CUALQUIER tipo, manteniendo el type safety.
//
// Piensa en ellos como "parámetros" pero para tipos.

// ------------------------------------------------------------
// Sin generics (malo): perdemos información de tipos
// ------------------------------------------------------------
function primeroMalo(arr: any[]): any {
  return arr[0];
}

const x = primeroMalo([1, 2, 3]); // x: any ❌ perdimos que era number

// ------------------------------------------------------------
// Con generics (bueno): TS infiere el tipo
// ------------------------------------------------------------
function primero<T>(arr: T[]): T {
  return arr[0];
}

const n = primero([1, 2, 3]);        // n: number ✅
const s = primero(["a", "b", "c"]);  // s: string ✅
const b = primero([true, false]);    // b: boolean ✅

console.log({ n, s, b });

// <T> es como un "hueco" que se llena con el tipo real al llamar la función.

// ------------------------------------------------------------
// Múltiples type parameters
// ------------------------------------------------------------
function emparejar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const par = emparejar("Nico", 28); // par: [string, number]
console.log(par);

// ------------------------------------------------------------
// Constraints: limitar qué tipos se aceptan con `extends`
// ------------------------------------------------------------
// Queremos una función que funcione con CUALQUIER cosa que tenga `.length`

function medir<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(medir("hola"));          // 4 (string tiene length)
console.log(medir([1, 2, 3, 4, 5])); // 5 (array tiene length)
// console.log(medir(42));           // ❌ number no tiene length

// ------------------------------------------------------------
// Generics en interfaces / types
// ------------------------------------------------------------
interface Caja<T> {
  contenido: T;
}

const cajaNum: Caja<number> = { contenido: 42 };
const cajaStr: Caja<string> = { contenido: "hola" };

interface ApiResponse<T> {
  ok: boolean;
  data: T;
  timestamp: Date;
}

interface User {
  id: number;
  nombre: string;
}

const resp: ApiResponse<User> = {
  ok: true,
  data: { id: 1, nombre: "Nico" },
  timestamp: new Date(),
};

console.log(resp);

// ------------------------------------------------------------
// Ejemplo real: función `fetchData` tipada
// ------------------------------------------------------------
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as Promise<T>;
}

// Al llamarla, le decimos qué esperamos recibir:
// const user = await fetchData<User>("/api/users/1");
// user.nombre // ✅ TS sabe que es string

// ------------------------------------------------------------
// Valor por defecto para generics
// ------------------------------------------------------------
interface Estado<T = string> {
  valor: T;
}

const e1: Estado = { valor: "hola" };        // T = string (default)
const e2: Estado<number> = { valor: 42 };    // T = number

console.log({ e1, e2 });

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Crea una función genérica `ultimo<T>(arr: T[]): T | undefined` que retorne el último.
// 2. Crea una función `invertir<T>(arr: T[]): T[]` que devuelva el array invertido.
// 3. Crea una interface `Repositorio<T>` con métodos `obtener(id): T` y `guardar(item: T): void`.

export {};
