// ============================================================================
// OBJETO MATH EN TYPESCRIPT
// ============================================================================
// TS: Math es un namespace global con todos sus métodos tipados.
// Todos retornan 'number'; Math.random() es específicamente () => number.
// Math.sqrt() - Raíz cuadrada — devuelve number
let resultado = Math.sqrt(100);
console.log("Raíz cuadrada de 100:", resultado); // 10
// Math.cbrt() - Raíz cúbica
resultado = Math.cbrt(27);
console.log("Raíz cúbica de 27:", resultado); // 3
// Math.max() - Número máximo — acepta ...values: number[]
resultado = Math.max(4, 1, 3, 12, 16, 89);
console.log("Número máximo:", resultado); // 89
// Math.min() - Número mínimo
resultado = Math.min(4, 1, 3, 12, 16, 89);
console.log("Número mínimo:", resultado); // 1
// Math.random() - Número aleatorio entre 0 y 1 (exclusive)
// TS: Math.random() devuelve number; el resultado de * 100 también es number
let aleatorio = Math.random() * 100;
aleatorio = Math.round(aleatorio);
console.log("Número aleatorio redondeado:", aleatorio);
// Math.floor() - Redondea hacia abajo
resultado = Math.floor(3.99);
console.log("Redondeo hacia abajo:", resultado); // 3
// Math.round() - Redondeo al entero más cercano
resultado = Math.round(3.99);
console.log("Redondeo al entero más cercano:", resultado); // 4
// Math.trunc() - Elimina la parte decimal
resultado = Math.trunc(3.99);
console.log("Truncar número:", resultado); // 3
// Math.abs() - Valor absoluto
resultado = Math.abs(-42);
console.log("Valor absoluto de -42:", resultado); // 42
// Math.pow() - Potencia (equivalente a **)
resultado = Math.pow(2, 10);
console.log("2 elevado a la 10:", resultado); // 1024
// Math.log() / Math.log2() / Math.log10()
console.log("log natural de e:", Math.log(Math.E)); // 1
console.log("log2 de 8:", Math.log2(8)); // 3
console.log("log10 de 1000:", Math.log10(1000)); // 3
// -----------------------------------------------------------------------------------
// Propiedades de Math (constantes — son readonly en TypeScript)
// -----------------------------------------------------------------------------------
console.log("Math.PI:", Math.PI); // 3.141592...
console.log("Math.SQRT1_2:", Math.SQRT1_2); // 0.707...
console.log("Math.SQRT2:", Math.SQRT2); // 1.414...
console.log("Math.E:", Math.E); // 2.718...
console.log("Math.LN2:", Math.LN2); // 0.693...
console.log("Math.LN10:", Math.LN10); // 2.302...
console.log("Math.LOG2E:", Math.LOG2E); // 1.442...
console.log("Math.LOG10E:", Math.LOG10E); // 0.434...
export {};
//# sourceMappingURL=index.js.map