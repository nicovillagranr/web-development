// ============================================================
// 03 — OBJETOS, INTERFACES Y TYPE ALIASES
// ============================================================

// ------------------------------------------------------------
// Objetos con tipo inline
// ------------------------------------------------------------
const persona: { nombre: string; edad: number } = {
  nombre: "Nico",
  edad: 28,
};

// Funciona pero es feo si el tipo se repite. Mejor darle nombre.

// ------------------------------------------------------------
// interface: define la forma de un objeto
// ------------------------------------------------------------
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number; // el ? hace la propiedad OPCIONAL
  readonly createdAt: Date; // readonly: no se puede reasignar
}

const user1: Usuario = {
  id: 1,
  nombre: "Nico",
  email: "nico@test.com",
  createdAt: new Date(),
};

// user1.createdAt = new Date(); // ❌ readonly

// ------------------------------------------------------------
// type alias: igual que interface para objetos, pero más flexible
// ------------------------------------------------------------
type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

const prod: Producto = { id: 1, nombre: "Mouse", precio: 25 };

// ------------------------------------------------------------
// interface VS type — ¿cuándo usar cuál?
// ------------------------------------------------------------
// interface:
//   - Para describir objetos y clases
//   - Se puede EXTENDER y mezclar automáticamente (declaration merging)
//   - Convención común en librerías públicas
//
// type:
//   - Para TODO lo demás: uniones, tuplas, tipos primitivos, mapped types
//   - Más flexible y versátil
//
// Regla práctica: usa `type` por defecto. Usa `interface` si vas a extender
// o si trabajas con clases/APIs públicas.

// ------------------------------------------------------------
// Extender interfaces
// ------------------------------------------------------------
interface Animal {
  nombre: string;
  edad: number;
}

interface Perro extends Animal {
  raza: string;
  ladrar(): void;
}

const firulais: Perro = {
  nombre: "Firulais",
  edad: 3,
  raza: "Labrador",
  ladrar() {
    console.log("¡Guau!");
  },
};

firulais.ladrar();

// ------------------------------------------------------------
// Intersección de types (equivalente a extends)
// ------------------------------------------------------------
type Empleado = {
  id: number;
  salario: number;
};

type Gerente = Empleado & {
  subordinados: number;
};

const g: Gerente = { id: 1, salario: 5000, subordinados: 10 };
console.log(g);

// ------------------------------------------------------------
// Objetos anidados
// ------------------------------------------------------------
interface Direccion {
  calle: string;
  ciudad: string;
  pais: string;
}

interface UsuarioCompleto {
  id: number;
  nombre: string;
  direccion: Direccion;
}

const usuarioFull: UsuarioCompleto = {
  id: 1,
  nombre: "Nico",
  direccion: {
    calle: "Av. Siempre Viva 742",
    ciudad: "Rosario",
    pais: "Argentina",
  },
};

console.log(usuarioFull);

// ============================================================
// EJERCICIOS
// ============================================================
// 1. Define una interface `Libro` con: titulo, autor, añoPublicacion y paginas (opcional).
// 2. Crea un type `Pelicula` con: titulo, director, duracion (minutos) y generos (string[]).
// 3. Extiende `Usuario` a `UsuarioPremium` agregando `plan: string` y `descuento: number`.

export {};
