// 📂 sentencias.js
// ============================================================================
// ----------------- SENTENCIAS CONDICIONALES -----------------
// ============================================================================

// -----------------
// if
// -----------------
let edad = 18;
if (edad >= 18) {
    console.log("Eres mayor de edad");
}

// -----------------
// if...else
// -----------------
let numero = 5;
if (numero % 2 === 0) {
    console.log("El número es par");
} else {
    console.log("El número es impar");
}

// -----------------
// if...else if...else
// -----------------
let nota = 75;
if (nota >= 90) {
    console.log("Excelente");
} else if (nota >= 60) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

// -----------------
// switch
// -----------------
const dia = 3;
switch (dia) {
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miércoles");
        break;
    case 4:
        console.log("Jueves");
        break;
    case 5:
        console.log("Viernes");
        break;
    default:
        console.log("Fin de semana");
}

// -----------------
// Ejercicios adicionales con if...else
// -----------------

// 1️⃣ Positivo, negativo o cero
let numeroTest = -3;
if(numeroTest > 0){
    console.log("Es positivo");
} else if(numeroTest < 0){
    console.log("Es negativo");
} else {
    console.log("Es cero");
}

// ============================================================================
// ----------------- TERNARIOS (mini cheat sheet) -----------------
// ============================================================================

// Par o impar
let numT = 8;
console.log(numT % 2 === 0 ? "Es par" : "Es impar");

// Comparar dos números
let a = 7, b = 12;
console.log(a > b ? `${a} mayor` : a < b ? `${b} mayor` : "Son iguales");

// Texto mayúsculas
let texto = "HOLA";
console.log(texto === texto.toUpperCase() ? "Todo mayúsculas" : "No todo mayúsculas");

// Aprobado o reprobado
let notaT = 5;
console.log(notaT < 0 || notaT > 7 ? "Nota no válida" : notaT >= 4 ? "Aprobado" : "Reprobado");

// Clasificación de edad
let edadT = 15;
console.log(edadT < 13 ? "Niño" : edadT <= 17 ? "Adolescente" : "Adulto");

// Login simple
let user = "admin", pass = "1234";
console.log(user.toLowerCase() === "admin" && pass === "1234" ? "Acceso concedido" : "Acceso denegado");

// Positivo, negativo o cero
let n = 0;
console.log(n < 0 ? "Negativo" : n === 0 ? "Cero" : "Positivo");
