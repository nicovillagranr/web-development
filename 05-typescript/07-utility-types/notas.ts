// ============================================================
// 07 — UTILITY TYPES
// ============================================================

// TS viene con tipos helpers que transforman otros tipos.
// Son la herramienta que te ahorra escribir tipos repetitivos.

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  edad: number;
  activo: boolean;
}

// ------------------------------------------------------------
// Partial<T>: hace TODAS las propiedades opcionales
// ------------------------------------------------------------
// Útil para funciones de update, donde solo pasas algunos campos.

function actualizarUsuario(id: number, cambios: Partial<Usuario>) {
  console.log(`Actualizando user ${id} con:`, cambios);
}

actualizarUsuario(1, { nombre: "Nico" });                 // ✅
actualizarUsuario(1, { email: "nico@test.com", edad: 29 }); // ✅

// ------------------------------------------------------------
// Required<T>: lo opuesto — hace todo OBLIGATORIO
// ------------------------------------------------------------
interface Config {
  host?: string;
  port?: number;
}

const configCompleta: Required<Config> = {
  host: "localhost",
  port: 3000,
}; // ahora host y port son obligatorios

// ------------------------------------------------------------
// Readonly<T>: hace todas las propiedades readonly
// ------------------------------------------------------------
const user: Readonly<Usuario> = {
  id: 1,
  nombre: "Nico",
  email: "nico@test.com",
  password: "secret",
  edad: 28,
  activo: true,
};

// user.nombre = "Otro"; // ❌ readonly

// ------------------------------------------------------------
// Pick<T, K>: crear un tipo con SOLO las propiedades elegidas
// ------------------------------------------------------------
type UsuarioPublico = Pick<Usuario, "id" | "nombre" | "email">;

const u: UsuarioPublico = {
  id: 1,
  nombre: "Nico",
  email: "nico@test.com",
}; // password, edad, activo NO existen aquí

console.log(u);

// ------------------------------------------------------------
// Omit<T, K>: crear un tipo EXCLUYENDO propiedades
// ------------------------------------------------------------
// Es lo opuesto a Pick. Muy útil para "quitar" campos sensibles.
type UsuarioSinPassword = Omit<Usuario, "password">;

const seguro: UsuarioSinPassword = {
  id: 1,
  nombre: "Nico",
  email: "nico@test.com",
  edad: 28,
  activo: true,
};

console.log(seguro);

// ------------------------------------------------------------
// Record<K, V>: objeto con claves de tipo K y valores de tipo V
// ------------------------------------------------------------
// Muy útil para "diccionarios" o mapas.

type Rol = "admin" | "user" | "guest";

const permisos: Record<Rol, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

console.log(permisos);

// ------------------------------------------------------------
// ReturnType<T>: extraer el tipo de retorno de una función
// ------------------------------------------------------------
function crearUsuario() {
  return { id: 1, nombre: "Nico", activo: true };
}

type NuevoUsuario = ReturnType<typeof crearUsuario>;
// NuevoUsuario = { id: number; nombre: string; activo: boolean }

const u2: NuevoUsuario = { id: 2, nombre: "Ana", activo: true };
console.log(u2);

// ------------------------------------------------------------
// Parameters<T>: extraer los tipos de los parámetros
// ------------------------------------------------------------
function login(email: string, password: string, recordar: boolean) {
  return { email, password, recordar };
}

type LoginParams = Parameters<typeof login>;
// LoginParams = [string, string, boolean]

const args: LoginParams = ["nico@test.com", "1234", true];
console.log(login(...args));

// ------------------------------------------------------------
// Combinar utility types (poder real)
// ------------------------------------------------------------
// "Un usuario parcial, pero sin password"
type UsuarioUpdate = Partial<Omit<Usuario, "id" | "password">>;

const cambios: UsuarioUpdate = {
  nombre: "Nico V",
  edad: 29,
};

console.log(cambios);

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Dado `interface Producto { id, nombre, precio, stock, descripcion }`,
//    crea `ProductoPreview` = solo id, nombre y precio (Pick).
// 2. Crea `ProductoUpdate` = todos los campos opcionales excepto id.
// 3. Crea un `Record<Dia, number>` donde Dia es "lun"|"mar"|...|"dom"
//    y el valor son las horas trabajadas.

export {};
