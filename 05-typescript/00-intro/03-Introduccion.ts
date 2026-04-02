// -----------------------------------------------------------------------------------
// INTRODUCCIÓN A TYPESCRIPT (equivalente TypeScript de 03-Introduccion.js)
// -----------------------------------------------------------------------------------

// TS vs JS: TypeScript agrega tipos estáticos sobre JavaScript.
// El compilador (tsc) convierte .ts → .js para que el navegador lo ejecute.

// -----------------------------------------------------------------------------------
// 1. Variables y tipos básicos
// -----------------------------------------------------------------------------------

// TypeScript infiere el tipo si asignas un valor inicial:
let nombre: string = "Nico";
let Nombre: string = "Luis"; // diferente de 'nombre' (case sensitive sigue igual)
console.log(nombre, Nombre);

// Tipos primitivos explícitos:
let texto: string = "Soy un string";
let numero: number = 42;
let booleano: boolean = true;
let nada: undefined = undefined; // o simplemente: let nada: undefined;
let nulo: null = null;

// 'any' desactiva el chequeo de tipos — úsalo con moderación (o evítalo):
// let dinamico: any = "esto puede ser cualquier cosa";

// Union types: cuando una variable puede ser de varios tipos
let valorFlexible: string | number = "hola";
valorFlexible = 42; // válido porque el tipo es string | number

// -----------------------------------------------------------------------------------
// 2. ¿Para qué se usa TypeScript?
// -----------------------------------------------------------------------------------
console.log("Dinamismo de sitios web con tipos seguros");
console.log("Servidor con NodeJS + TypeScript");
console.log("Frameworks: Angular (usa TS por defecto), React/Vue con soporte TS");

// -----------------------------------------------------------------------------------
// 3. Operadores básicos (igual que JS, pero con tipos)
// -----------------------------------------------------------------------------------

let a: number = 10;
a += 5;
a -= 2;
a *= 2;
a /= 3;
a %= 3;
a **= 2;
console.log(a);

let x: number = 5;
let y: number = 3;
console.log(x + y);
console.log(x - y);
console.log(x * y);
console.log(x / y);
console.log(x % y);
console.log(x ** y);
x++;
y--;

// Comparación estricta — TypeScript fuerza tipos, así que === es la norma
// Usamos variables tipadas: comparar literales `5 !== 3` daría TS2367 (siempre true)
console.log(x === x);   // true
console.log(x !== y);   // true
console.log(x > y);     // true

// TS advertirá si comparas tipos incompatibles:
// console.log(5 === "5"); // error en modo strict: This comparison appears to be unintentional

// -----------------------------------------------------------------------------------
// 4. Variables con tipos múltiples y objeto tipado
// -----------------------------------------------------------------------------------

let nombreUsuario: string = "Nico";
let edad: number = 25;
let activo: boolean = true;
console.log(nombreUsuario, edad, activo);

// Operador ternario (igual que JS):
let edadTernario: number = 20;
let mensaje: string = edadTernario >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);

// -----------------------------------------------------------------------------------
// 5. Type alias — nombrar un tipo reutilizable
// -----------------------------------------------------------------------------------

type ID = string | number; // puede ser string o number

let userId: ID = "abc-123";
userId = 42; // también válido

// -----------------------------------------------------------------------------------
// DIFERENCIA CLAVE: TypeScript vs JavaScript
// -----------------------------------------------------------------------------------
// JS (débilmente tipado):  let x = 5; x = "hola"; // sin error
// TS (fuertemente tipado): let x: number = 5; x = "hola"; // error de compilación
// Esto hace que los errores aparezcan antes de ejecutar el código.
