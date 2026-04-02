// =======================================
// EXPRESIONES REGULARES EN TYPESCRIPT
// =======================================
// TS: las regex son de tipo RegExp. Los métodos test(), exec(), match(), etc.
// están completamente tipados — no se necesitan anotaciones extras.
// -------------------------
// Coincidencias básicas
// -------------------------
const regexDigitos = /\d+/; // Uno o más dígitos (0-9)
const regexAlfanumerico = /\w+/; // Letras, números o guiones bajos
const regexEspacios = /\s+/; // Uno o más espacios en blanco
const regexNoEspacios = /\S+/; // Cualquier carácter que no sea espacio
// -------------------------
// Letras y mayúsculas/minúsculas
// -------------------------
const regexMayusculas = /[A-Z]+/; // Solo letras mayúsculas
const regexMinusculas = /[a-z]+/; // Solo letras minúsculas
// -------------------------
// Posición en string
// -------------------------
const regexPalabra = /^Hola$/i; // Coincide la palabra exacta, insensible a mayúsculas
const regexInicio = /^Inicio/; // Coincide al inicio del string
const regexFinal = /Final$/; // Coincide al final del string
// -------------------------
// Repeticiones y opcionales
// -------------------------
const regexNumeros = /^\d{1,3}$/; // Números de 1 a 3 dígitos
const regexOpcional = /colou?r/; // 'color' o 'colour'
const regexRepetida = /ha+/; // ha, haa, haaa...
// -------------------------
// Caracteres especiales
// -------------------------
const regexEspeciales = /[!@#$%^&*()_+]/; // Coincide caracteres especiales
const regexExclusion = /[^a-zA-Z0-9]/; // Cualquier carácter que NO sea letra o número
// -------------------------
// Validaciones comunes
// -------------------------
const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
const regexTelefono = /^\+?\d{1,4}?[-.\s]?\d{1,14}([-\s]?\d{1,13})?$/;
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
const regexIP = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
// -------------------------
// Ejemplo de uso
// -------------------------
const testString = "Hola";
const coincide = regexPalabra.test(testString); // test() devuelve boolean
console.log("Coincide palabra exacta:", coincide);
// Validar un email
function validarEmail(email) {
    return regexEmail.test(email);
}
console.log("Email válido:", validarEmail("usuario@ejemplo.com")); // true
console.log("Email inválido:", validarEmail("no-es-un-email")); // false
// Buscar con match() — devuelve RegExpMatchArray | null
const frase = "El número es 42 y también 100";
const matches = frase.match(/\d+/g);
if (matches !== null) {
    console.log("Números encontrados:", matches); // ["42", "100"]
}
export {};
// TS: es importante manejar el null que puede devolver match()
// En modo strict, no manejar el null es error de compilación.
//# sourceMappingURL=index.js.map