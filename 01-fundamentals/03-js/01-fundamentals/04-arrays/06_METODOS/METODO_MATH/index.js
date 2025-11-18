// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// Objeto Math | Básico
// -----------------------------------------------------------------------------------

// Math.sqrt() - Raíz cuadrada
let numero = Math.sqrt(100); 
console.log("Raíz cuadrada de 100:", numero);

// Math.cbrt() - Raíz cúbica
numero = Math.cbrt(27);
console.log("Raíz cúbica de 27:", numero);

// Math.max() - Número máximo
numero = Math.max(4, 1, 3, 12, 16, 89);
console.log("Número máximo:", numero);

// Math.min() - Número mínimo
numero = Math.min(4, 1, 3, 12, 16, 89);
console.log("Número mínimo:", numero);

// Math.random() - Número aleatorio entre 0 y 1
numero = Math.random() * 100;
numero = Math.round(numero);
console.log("Número aleatorio redondeado:", numero);

// Math.floor() - Redondea hacia abajo
numero = Math.floor(3.99);
console.log("Redondeo hacia abajo:", numero);

// Math.round() - Redondeo al entero más cercano
numero = Math.round(3.99);
console.log("Redondeo al entero más cercano:", numero);

// Math.trunc() - Elimina decimales
numero = Math.trunc(3.99);
console.log("Truncar número:", numero);

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// Propiedades de Math
// -----------------------------------------------------------------------------------

console.log("Math.PI:", Math.PI);
console.log("Math.SQRT1_2:", Math.SQRT1_2);
console.log("Math.SQRT2:", Math.SQRT2);
console.log("Math.E:", Math.E);
console.log("Math.LN2:", Math.LN2);
console.log("Math.LN10:", Math.LN10);
console.log("Math.LOG2E:", Math.LOG2E);
console.log("Math.LOG10E:", Math.LOG10E);
