// =======================================
// EXPRESIONES REGULARES EN TYPESCRIPT
// =======================================
// TS: las regex son de tipo RegExp. Los métodos test(), exec(), match(), etc.
// están completamente tipados — no se necesitan anotaciones extras.

// -------------------------
// Coincidencias básicas
// -------------------------
const regexDigitos: RegExp = /\d+/;             // Uno o más dígitos (0-9)
const regexAlfanumerico: RegExp = /\w+/;        // Letras, números o guiones bajos
const regexEspacios: RegExp = /\s+/;            // Uno o más espacios en blanco
const regexNoEspacios: RegExp = /\S+/;          // Cualquier carácter que no sea espacio

// -------------------------
// Letras y mayúsculas/minúsculas
// -------------------------
const regexMayusculas: RegExp = /[A-Z]+/;       // Solo letras mayúsculas
const regexMinusculas: RegExp = /[a-z]+/;       // Solo letras minúsculas

// -------------------------
// Posición en string
// -------------------------
const regexPalabra: RegExp = /^Hola$/i;         // Coincide la palabra exacta, insensible a mayúsculas
const regexInicio: RegExp = /^Inicio/;          // Coincide al inicio del string
const regexFinal: RegExp = /Final$/;            // Coincide al final del string

// -------------------------
// Repeticiones y opcionales
// -------------------------
const regexNumeros: RegExp = /^\d{1,3}$/;       // Números de 1 a 3 dígitos
const regexOpcional: RegExp = /colou?r/;        // 'color' o 'colour'
const regexRepetida: RegExp = /ha+/;            // ha, haa, haaa...

// -------------------------
// Caracteres especiales
// -------------------------
const regexEspeciales: RegExp = /[!@#$%^&*()_+]/;  // Coincide caracteres especiales
const regexExclusion: RegExp = /[^a-zA-Z0-9]/;     // Cualquier carácter que NO sea letra o número

// -------------------------
// Validaciones comunes
// -------------------------
const regexEmail: RegExp = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
const regexTelefono: RegExp = /^\+?\d{1,4}?[-.\s]?\d{1,14}([-\s]?\d{1,13})?$/;
const regexFecha: RegExp = /^\d{4}-\d{2}-\d{2}$/;
const regexIP: RegExp = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

// -------------------------
// Ejemplo de uso
// -------------------------
const testString: string = "Hola";
const coincide: boolean = regexPalabra.test(testString); // test() devuelve boolean
console.log("Coincide palabra exacta:", coincide);

// Validar un email
function validarEmail(email: string): boolean {
  return regexEmail.test(email);
}
console.log("Email válido:", validarEmail("usuario@ejemplo.com"));   // true
console.log("Email inválido:", validarEmail("no-es-un-email"));       // false

// Buscar con match() — devuelve RegExpMatchArray | null
const frase: string = "El número es 42 y también 100";
const matches: RegExpMatchArray | null = frase.match(/\d+/g);
if (matches !== null) {
  console.log("Números encontrados:", matches); // ["42", "100"]
}

// TS: es importante manejar el null que puede devolver match()
// En modo strict, no manejar el null es error de compilación.
