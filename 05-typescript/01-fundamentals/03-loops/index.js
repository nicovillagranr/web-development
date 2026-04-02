// ============================================================================
// BUCLES EN TYPESCRIPT
// ============================================================================
// TS: los tipos de las variables de control y de los arrays son explícitos.
// El compilador infiere el tipo de 'animal', 'clave', etc. en los bucles.
// -----------------------------------------------------------------------------------
// Bucle While
// -----------------------------------------------------------------------------------
let numero = 0;
while (numero < 5) {
    console.log(numero);
    numero++;
}
// -----------------------------------------------------------------------------------
// Bucle do...While
// -----------------------------------------------------------------------------------
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
// -----------------------------------------------------------------------------------
// Bucle For
// -----------------------------------------------------------------------------------
for (let j = 0; j < 5; j++) {
    console.log(j);
}
const persona = { nombre: "Nicolás", edad: 20, ciudad: "Santiago" };
for (const clave in persona) {
    // TS: keyof typeof permite acceder tipado a las propiedades
    const key = clave;
    console.log(key, persona[key]);
}
// -----------------------------------------------------------------------------------
// for...of — itera sobre los valores de un array
// TS: 'animal' se infiere automáticamente como string
// -----------------------------------------------------------------------------------
const animales = ["Gato", "Perro", "Loro"];
for (const animal of animales) {
    console.log(animal);
}
// -----------------------------------------------------------------------------------
// break
// -----------------------------------------------------------------------------------
for (let k = 0; k < 10; k++) {
    if (k === 5)
        break;
    console.log(k); // imprime 0 a 4
}
// -----------------------------------------------------------------------------------
// continue
// -----------------------------------------------------------------------------------
for (let x = 1; x <= 10; x++) {
    if (x % 2 === 0)
        continue;
    console.log(x); // solo impares
}
// -----------------------------------------------------------------------------------
// 1. Imprime todos los números pares del 0 al 20
// -----------------------------------------------------------------------------------
for (let idx = 0; idx <= 20; idx++) {
    if (idx % 2 === 0) {
        console.log(idx);
    }
}
// -----------------------------------------------------------------------------------
// 2. Recorre array de frutas y detente si encuentra "uva"
// -----------------------------------------------------------------------------------
const listaFrutas = ["manzana", "pera", "uva", "naranja"];
for (let idx = 0; idx < listaFrutas.length; idx++) {
    if (listaFrutas[idx] === "uva") {
        console.log(`Fruta encontrada: ${listaFrutas[idx]}`);
        break;
    }
    console.log(listaFrutas[idx]);
}
export {};
//# sourceMappingURL=index.js.map