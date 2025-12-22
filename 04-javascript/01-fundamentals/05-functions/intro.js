// INTRODUCCIÓN A VARIABLES EN JAVASCRIPT

// ---------------------------
// 1️⃣ Declarar variables
// Podemos guardar información en variables usando `let` o `const`
// let nombre = "Nico";         // Una variable que guarda un nombre
// const PI = 3.1416;           // Una constante que no cambia su valor

// document.writeln("Hola, " + nombre + "!<br>");
// document.writeln("El valor de PI es: " + PI + "<br><br>");

// ---------------------------
// 2️⃣ Variables dentro de funciones
// Podemos crear variables dentro de funciones, que solo existen ahí
// function saludar() {
    // let mensaje = "¡Hola desde la función!"; // Variable local
    // document.writeln(mensaje + "<br>");
// }
// saludar();

// ---------------------------
// 3️⃣ Variables y parámetros
// Podemos pasar información a las funciones usando parámetros
// function saludarPersona(nombre) {
    // let mensaje = `Hola ${nombre}, ¿cómo estás?<br>`;
    // document.writeln(mensaje);
// }
// saludarPersona("Javier");
// saludarPersona("Carito");

// ---------------------------
// 4️⃣ Variables y retorno (return)
// Podemos guardar el resultado de una función en una variable
// function sumar(n1, n2) {
    // let resultado = n1 + n2;
    // return resultado; // Retorna el resultado, no lo imprime directamente
// }
// let suma1 = sumar(50, 70);
// let suma2 = sumar(10, 30);
// document.writeln("50 + 70 = " + suma1 + "<br>");
// document.writeln("10 + 30 = " + suma2 + "<br><br>");

// ---------------------------
// 5️⃣ Variables con inputs del usuario
// Podemos guardar lo que el usuario ingresa en variables
// let edad = prompt("Ingresa tu edad");
// document.writeln("Tienes " + edad + " años.<br><br>");

// ---------------------------
// 6️⃣ Combinando variables y condiciones
// function evaluarNumero(num) {
//     if (num > 0) return "El número es positivo";
//     if (num < 0) return "El número es negativo";
//     return "El número es cero";
// }
// let numeroUsuario = prompt("Ingresa un número");
// document.writeln(evaluarNumero(numeroUsuario) + "<br>");


