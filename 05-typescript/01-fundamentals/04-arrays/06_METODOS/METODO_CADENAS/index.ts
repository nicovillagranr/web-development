// ============================================================================
// MÉTODOS DE CADENAS (STRINGS) EN TYPESCRIPT
// ============================================================================
// TS: todos los métodos de string están tipados automáticamente.
// No se necesitan anotaciones extra si la variable ya es string.

// - concat() — junta dos o más cadenas y retorna una nueva cadena
let cadena: string = "Cadena de prueba";
let cadena2: string = "Cadena 2";
let resultado: string = cadena.concat(cadena2);
console.log(resultado);

// - startsWith() — devuelve boolean
cadena = "Cadena de prueba";
let inicio: boolean = cadena.startsWith("Cadena");
console.log(inicio); // true

// - endsWith() — devuelve boolean
let fin: boolean = cadena.endsWith("prueba");
console.log(fin); // true

// - includes() — verifica si una subcadena está dentro de otra
cadena = "Curso de JavaScript nivel Junior";
let contiene: boolean = cadena.includes("nivel Junior");
console.log(contiene); // true

// - indexOf() — devuelve number (índice del primer carácter de la coincidencia, o -1)
let indice: number = cadena.indexOf("JavaScript");
console.log(indice); // posición donde comienza "JavaScript"

// - lastIndexOf() — devuelve el índice de la última coincidencia
cadena = "Curso de JavaScript nivel Junior Junior Junior Junior";
let ultimoIndice: number = cadena.lastIndexOf("Junior");
console.log(ultimoIndice);

// - padStart() — rellena al principio hasta alcanzar la longitud indicada
let corta: string = "Mundo";
let padded: string = corta.padStart(10, "Hola ");
console.log(padded);

// - padEnd() — rellena al final
let hola: string = "Hola ";
let paddedFin: string = hola.padEnd(10, "Mundo");
console.log(paddedFin);

// - repeat() — devuelve la cadena repetida N veces
let repetida: string = " Hola Mundo".repeat(3);
console.log(repetida);

// - split() — divide la cadena según el separador y devuelve string[]
cadena = "Hola,cómo,estás";
let partes: string[] = cadena.split(",");
console.log(partes[2]); // "estás"

// - substring() — parte de la cadena entre dos índices
cadena = "ABCDEFG";
let sub: string = cadena.substring(2, 5); // "CDE"
console.log(sub);

// - toLowerCase() / toUpperCase()
let mayus: string = "HOLA MUNDO";
console.log(mayus.toLowerCase()); // "hola mundo"

let minus: string = "hola mundo";
console.log(minus.toUpperCase()); // "HOLA MUNDO"

// - toString() — convierte a string (útil en otros tipos)
let num: number = 2025;
let numStr: string = num.toString();
console.log(10 + numStr); // concatenación: "102025"

// - trim() — elimina espacios al principio y al final
let conEspacios: string = "   Hola Mundo   ";
let sinEspacios: string = conEspacios.trim();
console.log(sinEspacios); // "Hola Mundo"

// - replace() — reemplaza la primera coincidencia
let frase: string = "Hola mundo, mundo bonito";
let reemplazada: string = frase.replace("mundo", "TypeScript");
console.log(reemplazada); // "Hola TypeScript, mundo bonito"

// - replaceAll() — reemplaza todas las coincidencias
let todasReemplazadas: string = frase.replaceAll("mundo", "TypeScript");
console.log(todasReemplazadas); // "Hola TypeScript, TypeScript bonito"
