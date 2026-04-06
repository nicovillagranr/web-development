// ============================================================
// 04 — FUNCIONES
// ============================================================

// ------------------------------------------------------------
// Función con tipos en parámetros y retorno
// ------------------------------------------------------------
function sumar(a: number, b: number): number {
  return a + b;
}

console.log(sumar(2, 3));

// El retorno puede omitirse: TS lo infiere.
// Aun así, escribirlo es buena práctica en funciones "públicas" / exportadas.

// ------------------------------------------------------------
// Arrow functions
// ------------------------------------------------------------
const multiplicar = (a: number, b: number): number => a * b;
console.log(multiplicar(4, 5));

// ------------------------------------------------------------
// Parámetros opcionales (?) y con valor por defecto
// ------------------------------------------------------------
function saludar(nombre: string, titulo?: string): string {
  if (titulo) return `Hola ${titulo} ${nombre}`;
  return `Hola ${nombre}`;
}

console.log(saludar("Nico"));
console.log(saludar("Nico", "Dr."));

function crearUsuario(nombre: string, activo: boolean = true) {
  return { nombre, activo };
}

console.log(crearUsuario("Ana"));        // activo = true
console.log(crearUsuario("Luis", false));

// ------------------------------------------------------------
// Rest parameters (...)
// ------------------------------------------------------------
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

console.log(sumarTodos(1, 2, 3, 4, 5));

// ------------------------------------------------------------
// Tipar una función como variable (function type)
// ------------------------------------------------------------
type Operacion = (a: number, b: number) => number;

const restar: Operacion = (a, b) => a - b;
const dividir: Operacion = (a, b) => a / b;

console.log(restar(10, 4));
console.log(dividir(20, 5));

// ------------------------------------------------------------
// Funciones como parámetros (callbacks)
// ------------------------------------------------------------
function procesar(valor: number, fn: (n: number) => number): number {
  return fn(valor);
}

console.log(procesar(5, (n) => n * 2));   // 10
console.log(procesar(5, (n) => n + 100)); // 105

// ------------------------------------------------------------
// Retorno void vs undefined
// ------------------------------------------------------------
// void: "no me importa el retorno" (típico en callbacks)
// undefined: "explícitamente retorna undefined"

function registrar(msg: string): void {
  console.log(msg);
  // no hace falta return
}

registrar("guardado");

// ------------------------------------------------------------
// Ejemplo real: función que valida un formulario
// ------------------------------------------------------------
interface LoginData {
  email: string;
  password: string;
}

function validarLogin(data: LoginData): { ok: boolean; errores: string[] } {
  const errores: string[] = [];
  if (!data.email.includes("@")) errores.push("Email inválido");
  if (data.password.length < 6) errores.push("Password muy corto");
  return { ok: errores.length === 0, errores };
}

console.log(validarLogin({ email: "nico@test.com", password: "12345" }));
console.log(validarLogin({ email: "nico@test.com", password: "123456" }));

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Crea `calcularEdad(fechaNacimiento: Date): number`.
// 2. Crea `formatearNombre(nombre, apellido, inicialMedia?)` que retorne el string completo.
// 3. Crea un type `Validador = (valor: string) => boolean` y dos implementaciones:
//    `esEmail` y `esTelefono`.

export {};
