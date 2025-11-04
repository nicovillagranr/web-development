// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// 1. ¿Qué es JavaScript?
// -----------------------------------------------------------------------------------

// Lenguaje de programación, interpretado, orientado a objetos.
// Imperativo: se ejecuta paso a paso.
// Case Sensitive: distingue mayúsculas y minúsculas.
// Basado en prototipos, tipado débil y lenguaje dinámico.

// Ejemplo: variables y case sensitive
let nombre = "Nico";
let Nombre = "Luis"; // diferente de 'nombre'
console.log(nombre, Nombre);

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// 2. ¿Para qué se usa?
// -----------------------------------------------------------------------------------

// Usos comunes:
console.log("Dinamismo de sitios web");
console.log("Servidor con NodeJS");
console.log("Frameworks Front-End: Angular, React, Vue");

// Otros usos menos comunes:
console.log("Inteligencia artificial");
console.log("Placas electrónicas con Johnny-Five");
console.log("Mobile Apps");
console.log("Desktop Apps");

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// 3. Formas de enlazar JavaScript
// -----------------------------------------------------------------------------------

// 1. En línea: <button onclick="alert('Hola')">Click</button>
// 2. Dentro de la etiqueta <script> en HTML
// 3. Archivo externo .js
// 4. Con require (NodeJS)

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// 4. Variables
// -----------------------------------------------------------------------------------

// Concepto: contenedor de datos
let numero = 23;
const constante = 10;
var variableGlobal = "Hola";

// Tipos de datos
let texto = "Soy un string";
let numero2 = 42;
let booleano = true;
let nada; // undefined
let nulo = null;

// Alcance y comportamiento
// Scope: let y const tienen bloque, var tiene función
// Hoisting: var se eleva, let/const no

// Crear múltiples variables
let nombreUsuario = "Nico", edad = 25, activo = true;
console.log(nombreUsuario, edad, activo);

// Prueba con prompt (simulado)
let nombrePrompt = "Juan"; // simulando prompt("Ingresa tu nombre:")
console.log(`Hola ${nombrePrompt}`);

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// 5. Operadores básicos en JavaScript
// -----------------------------------------------------------------------------------

// 5.1 Asignación
let a = 10;
a += 5; // a = a + 5
a -= 2; // a = a - 2
a *= 2; // a = a * 2
a /= 3; // a = a / 3
a %= 3; // a = a % 3
a **= 2; // a = a ** 2
console.log(a);

// 5.2 Aritméticos
let x = 5, y = 3;
console.log(x + y); // suma
console.log(x - y); // resta
console.log(x * y); // multiplicación
console.log(x / y); // división
console.log(x % y); // módulo
console.log(x ** y); // potencia
x++; // incremento
y--; // decremento

// 5.3 Comparación
console.log(5 == "5");   // true
console.log(5 === "5");  // false
console.log(5 != 3);     // true
console.log(5 !== "5");  // true
console.log(5 > 3);      // true
console.log(5 < 10);     // true
console.log(5 >= 5);     // true
console.log(5 <= 4);     // false

// 5.4 Lógicos
console.log(true && false); // AND
console.log(true || false); // OR
console.log(!true);         // NOT

// 5.5 Concatenación y otros
let saludo = "Hola" + " " + "Mundo";
console.log(saludo);

// Operador ternario
let edadTernario = 20;
let mensaje = edadTernario >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(mensaje);
