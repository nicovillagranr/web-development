// =======================================
// Hoja de referencia rápida de Expresiones Regulares en JS
// =======================================

// -------------------------
// Coincidencias básicas
// -------------------------
const regexDigitos = /\d+/;             // Uno o más dígitos (0-9)
const regexAlfanumerico = /\w+/;        // Letras, números o guiones bajos
const regexEspacios = /\s+/;            // Uno o más espacios en blanco
const regexNoEspacios = /\S+/;          // Cualquier carácter que no sea espacio

// -------------------------
// Letras y mayúsculas/minúsculas
// -------------------------
const regexMayusculas = /[A-Z]+/;       // Solo letras mayúsculas
const regexMinusculas = /[a-z]+/;       // Solo letras minúsculas

// -------------------------
// Posición en string
// -------------------------
const regexPalabra = /^Hola$/i;         // Coincide la palabra exacta, insensible a mayúsculas/minúsculas
const regexInicio = /^Inicio/;          // Coincide al inicio del string
const regexFinal = /Final$/;            // Coincide al final del string

// -------------------------
// Repeticiones y opcionales
// -------------------------
const regexNumeros = /^\d{1,3}$/;      // Números de 1 a 3 dígitos
const regexOpcional = /colou?r/;        // 'color' o 'colour'
const regexRepetida = /ha+/;            // ha, haa, haaa...

// -------------------------
// Caracteres especiales
// -------------------------
const regexEspeciales = /[!@#$%^&*()_+]/; // Coincide caracteres especiales
const regexExclusion = /[^a-zA-Z0-9]/;    // Coincide cualquier carácter que NO sea letra o número

// -------------------------
// Validaciones comunes
// -------------------------
const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;       // Email simple
const regexTelefono = /^\+?\d{1,4}?[-.\s]?\d{1,14}([-\s]?\d{1,13})?$/; // Teléfono internacional simple
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;                   // Fecha YYYY-MM-DD
const regexIP = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/; // IPv4

// -------------------------
// Ejemplo de uso
// -------------------------
const testString = 'Hola';
console.log('Coincide palabra exacta:', regexPalabra.test(testString));
