// ============================================================================
// MÉTODOS DE CADENAS (STRINGS) EN TYPESCRIPT
// ============================================================================
// TS: todos los métodos de string están tipados automáticamente.
// No se necesitan anotaciones extra si la variable ya es string.
// - concat() — junta dos o más cadenas y retorna una nueva cadena
let cadena = "Cadena de prueba";
let cadena2 = "Cadena 2";
let resultado = cadena.concat(cadena2);
console.log(resultado);
// - startsWith() — devuelve boolean
cadena = "Cadena de prueba";
let inicio = cadena.startsWith("Cadena");
console.log(inicio); // true
// - endsWith() — devuelve boolean
let fin = cadena.endsWith("prueba");
console.log(fin); // true
// - includes() — verifica si una subcadena está dentro de otra
cadena = "Curso de JavaScript nivel Junior";
let contiene = cadena.includes("nivel Junior");
console.log(contiene); // true
// - indexOf() — devuelve number (índice del primer carácter de la coincidencia, o -1)
let indice = cadena.indexOf("JavaScript");
console.log(indice); // posición donde comienza "JavaScript"
// - lastIndexOf() — devuelve el índice de la última coincidencia
cadena = "Curso de JavaScript nivel Junior Junior Junior Junior";
let ultimoIndice = cadena.lastIndexOf("Junior");
console.log(ultimoIndice);
// - padStart() — rellena al principio hasta alcanzar la longitud indicada
let corta = "Mundo";
let padded = corta.padStart(10, "Hola ");
console.log(padded);
// - padEnd() — rellena al final
let hola = "Hola ";
let paddedFin = hola.padEnd(10, "Mundo");
console.log(paddedFin);
// - repeat() — devuelve la cadena repetida N veces
let repetida = " Hola Mundo".repeat(3);
console.log(repetida);
// - split() — divide la cadena según el separador y devuelve string[]
cadena = "Hola,cómo,estás";
let partes = cadena.split(",");
console.log(partes[2]); // "estás"
// - substring() — parte de la cadena entre dos índices
cadena = "ABCDEFG";
let sub = cadena.substring(2, 5); // "CDE"
console.log(sub);
// - toLowerCase() / toUpperCase()
let mayus = "HOLA MUNDO";
console.log(mayus.toLowerCase()); // "hola mundo"
let minus = "hola mundo";
console.log(minus.toUpperCase()); // "HOLA MUNDO"
// - toString() — convierte a string (útil en otros tipos)
let num = 2025;
let numStr = num.toString();
console.log(10 + numStr); // concatenación: "102025"
// - trim() — elimina espacios al principio y al final
let conEspacios = "   Hola Mundo   ";
let sinEspacios = conEspacios.trim();
console.log(sinEspacios); // "Hola Mundo"
// - replace() — reemplaza la primera coincidencia
let frase = "Hola mundo, mundo bonito";
let reemplazada = frase.replace("mundo", "TypeScript");
console.log(reemplazada); // "Hola TypeScript, mundo bonito"
// - replaceAll() — reemplaza todas las coincidencias
let todasReemplazadas = frase.replaceAll("mundo", "TypeScript");
console.log(todasReemplazadas); // "Hola TypeScript, TypeScript bonito"
export {};
//# sourceMappingURL=index.js.map