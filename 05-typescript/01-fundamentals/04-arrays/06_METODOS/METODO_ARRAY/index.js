// ============================================================================
// MÉTODOS DE ARRAYS EN TYPESCRIPT
// ============================================================================
// TS: todos los métodos de array están tipados — el compilador sabe qué
// retorna cada uno y verifica que los callbacks tengan los tipos correctos.
// -------------------------------------------------------------------------------------
// Métodos Transformadores
// -------------------------------------------------------------------------------------
// pop() — elimina el último elemento y lo devuelve
let nombres = ["Nico", "Javi", "Lucas"];
document.writeln(`Array Original: <b>${nombres}</b><br>`);
const elementoRemovido = nombres.pop(); // puede ser undefined si el array está vacío
document.writeln(`Elemento removido: <b style='color:red'>${elementoRemovido}</b><br>`);
document.writeln(`Resultado: <b>${nombres}</b><br>`);
// -------------------------------------------------------------------------------------
// shift() — elimina el primer elemento y lo devuelve
let nombres2 = ["Nico", "Javi", "Lucas"];
document.writeln(`Array Original: <b>${nombres2}</b><br>`);
const primerElemento = nombres2.shift();
document.writeln(`Elemento removido: <b style='color:red'>${primerElemento}</b><br>`);
document.writeln(`Resultado: <b>${nombres2}</b><br>`);
// -------------------------------------------------------------------------------------
// push() — agrega elementos al final, devuelve la nueva longitud
let lista = ["Manzana", "Naranja", "Sandía", "Pera", "Mango"];
const nuevaLongitud = lista.push("Uva"); // push devuelve number (nueva longitud)
document.writeln(`Nueva longitud: ${nuevaLongitud}<br>`);
// -------------------------------------------------------------------------------------
// reverse() — invierte el orden del array (muta el original)
let numerosRev = [1, 2, 3, 4, 5];
document.writeln(`${numerosRev.reverse()}<br>`);
// -------------------------------------------------------------------------------------
// unshift() — agrega elementos al inicio
let nombres3 = ["Nico", "Javi", "Juaco"];
nombres3.unshift("Ruben");
document.writeln(`${nombres3}<br>`);
// -------------------------------------------------------------------------------------
// sort() — ordena (como strings por defecto; para numbers usar comparador)
let numerosSort = [2, 1, 4, 6, 7, 8, 9, 3];
numerosSort.sort((a, b) => a - b); // TS: a y b son number (infieridos del array)
document.writeln(`${numerosSort}<br>`);
// -------------------------------------------------------------------------------------
// splice() — agrega, elimina o reemplaza elementos
let elementos = ["abc", "manzana", "roberto", "dedo", "Ferrari"];
document.writeln(`${elementos}<br>`);
elementos.splice(0, 3, "Bugatti", "Koenigsegg", "Lamborghini");
document.writeln(`${elementos}<br>`);
// -------------------------------------------------------------------------------------
// Métodos Accesores
// -------------------------------------------------------------------------------------
// join() — une todos los elementos en un string
const autos = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
document.writeln(`${autos}<br>`);
const autosUnidos = autos.join(" - "); // devuelve string
document.writeln(`${autosUnidos}<br>`);
// -------------------------------------------------------------------------------------
// slice() — copia superficial sin modificar el original
const autos2 = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
const autosCopia = autos2.slice(0, 5); // devuelve string[]
document.writeln(`${autosCopia}<br>`);
// -------------------------------------------------------------------------------------
// includes() — devuelve boolean
const autos3 = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
const tieneNissan = autos3.includes("Nissan");
document.writeln(`${tieneNissan}<br>`); // false
// -------------------------------------------------------------------------------------
// indexOf() — devuelve number (-1 si no existe)
const autos4 = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
const posicion = autos4.indexOf("Pagani");
document.writeln(`${posicion}<br>`); // 2
// -------------------------------------------------------------------------------------
// Métodos de Arrays de Repetición
// -------------------------------------------------------------------------------------
// filter() — devuelve un nuevo array con los elementos que cumplen la condición
const autos5 = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
const autosLargos = autos5.filter((auto) => auto.length > 4); // auto: string (inferido)
document.writeln(`${autosLargos}<br>`);
// forEach() — ejecuta una función por cada elemento (no retorna nada: void)
const autos6 = ["BMW", "Mercedes", "Pagani", "Bugatti", "Ferrari", "Dodge"];
autos6.forEach((auto) => {
    document.writeln(`${auto}<br>`);
});
// map() — crea un nuevo array con los resultados de la función
const nums = [1, 2, 3, 4, 5];
const dobles = nums.map((n) => n * 2); // n: number (inferido)
document.writeln(`${dobles}<br>`);
// reduce() — acumula un valor a partir del array
const suma = nums.reduce((acum, n) => acum + n, 0); // acum y n: number
document.writeln(`Suma: ${suma}<br>`);
// find() — devuelve el primer elemento que cumple la condición (o undefined)
const primerGrande = nums.find((n) => n > 3);
document.writeln(`Primer número > 3: ${primerGrande}<br>`);
// some() — devuelve boolean si al menos uno cumple la condición
const hayMayorDe4 = nums.some((n) => n > 4);
document.writeln(`¿Hay alguno mayor de 4? ${hayMayorDe4}<br>`);
// every() — devuelve boolean si todos cumplen la condición
const todosMayorDe0 = nums.every((n) => n > 0);
document.writeln(`¿Todos son mayores de 0? ${todosMayorDe0}<br>`);
export {};
//# sourceMappingURL=index.js.map