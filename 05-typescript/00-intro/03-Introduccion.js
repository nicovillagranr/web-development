// -----------------------------------------------------------------------------------
// INTRODUCCIÓN A TYPESCRIPT (equivalente TypeScript de 03-Introduccion.js)
// -----------------------------------------------------------------------------------
// TS vs JS: TypeScript agrega tipos estáticos sobre JavaScript.
// El compilador (tsc) convierte .ts → .js para que el navegador lo ejecute.
// -----------------------------------------------------------------------------------
// 1. Variables y tipos básicos
// -----------------------------------------------------------------------------------
// TypeScript infiere el tipo si asignas un valor inicial:
let nombre = "Nico";
let Nombre = "Luis"; // diferente de 'nombre' (case sensitive sigue igual)
console.log(nombre, Nombre);
// Tipos primitivos explícitos:
let texto = "Soy un string";
let numero = 42;
let booleano = true;
let nada = undefined; // o simplemente: let nada: undefined;
let nulo = null;
// 'any' desactiva el chequeo de tipos — úsalo con moderación (o evítalo):
// let dinamico: any = "esto puede ser cualquier cosa";
// Union types: cuando una variable puede ser de varios tipos
let valorFlexible = "hola";
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
let a = 10;
a += 5;
a -= 2;
a *= 2;
a /= 3;
a %= 3;
a **= 2;
console.log(a);
let x = 5;
let y = 3;
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
console.log(x === x); // true
console.log(x !== y); // true
console.log(x > y); // true
// TS advertirá si comparas tipos incompatibles:
// console.log(5 === "5"); // error en modo strict: This comparison appears to be unintentional
// -----------------------------------------------------------------------------------
// 4. Variables con tipos múltiples y objeto tipado
// -----------------------------------------------------------------------------------
let nombreUsuario = "Nico";
let edad = 25;
let activo = true;
console.log(nombreUsuario, edad, activo);
// Operador ternario (igual que JS):
let edadTernario = 20;
let mensaje = edadTernario >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);
let userId = "abc-123";
userId = 42; // también válido
export {};
// -----------------------------------------------------------------------------------
// DIFERENCIA CLAVE: TypeScript vs JavaScript
// -----------------------------------------------------------------------------------
// JS (débilmente tipado):  let x = 5; x = "hola"; // sin error
// TS (fuertemente tipado): let x: number = 5; x = "hola"; // error de compilación
// Esto hace que los errores aparezcan antes de ejecutar el código.
//# sourceMappingURL=03-Introduccion.js.map