// ============================================================================
// ARRAYS Y OBJETOS EN TYPESCRIPT
// ============================================================================
// -----------------------------------------------------------------------------------
// Array tipado
// -----------------------------------------------------------------------------------
const cajaFrutas = ["Pera", "Manzana", "Sandía", "Mangos"];
console.log("Segunda fruta:", cajaFrutas[1]);
// -----------------------------------------------------------------------------------
// Objeto con interfaz
// -----------------------------------------------------------------------------------
const pc = {
    nombre: "NicoPC",
    procesador: "Intel Core I7",
    ram: "16GB",
    espacio: "1TB",
};
console.log(`El nombre de mi PC es: ${pc.nombre}, procesador: ${pc.procesador}, RAM: ${pc.ram}, almacenamiento: ${pc.espacio}`);
// -----------------------------------------------------------------------------------
// Array anidado — array de arrays de strings
// -----------------------------------------------------------------------------------
const grupos = [
    ["Juan", "Pedro", "Luis"],
    ["Ana", "Marta", "Carla"],
];
console.log("Segundo nombre de la segunda lista:", grupos[1][1]);
// -----------------------------------------------------------------------------------
// Bucles con arrays y objetos
// -----------------------------------------------------------------------------------
// for básico con array de strings
const colores = ["Rojo", "Verde", "Azul", "Amarillo"];
for (let i = 0; i < colores.length; i++) {
    console.log("Color:", colores[i]);
}
// for...in con objeto tipado
// TS: keyof typeof IPhone permite acceso tipado a las propiedades
const IPhone = {
    modelo: "IPhone 16 Pro",
    color: "Titanio Desierto",
    almacenamiento: "1Tb",
};
for (const prop in IPhone) {
    const key = prop;
    console.log(`${key}: ${IPhone[key]}`);
}
// for...of con array de números
const numeros = [1, 2, 3, 4, 5];
for (const n of numeros) {
    console.log("Doble:", n * 2);
}
// -----------------------------------------------------------------------------------
// Objeto videojuego con interfaz
// -----------------------------------------------------------------------------------
const TLOU = {
    nombre: "The Last Of Us",
    genero: "Post-Apocalíptico",
    año: 2013,
    plataforma: "PS3",
    jugadores: "1 Player",
};
console.log(`Mi juego favorito es: ${TLOU.nombre}. Año: ${TLOU.año}, Género: ${TLOU.genero}, Plataforma: ${TLOU.plataforma}, Jugadores: ${TLOU.jugadores}`);
// -----------------------------------------------------------------------------------
// Array de arrays (países y capitales)
// -----------------------------------------------------------------------------------
const maps = [
    ["Chile", "Argentina", "Perú"],
    ["Santiago", "Buenos Aires", "Lima"],
];
console.log(`La capital de ${maps[0][1]} es ${maps[1][1]}`);
// -----------------------------------------------------------------------------------
// Objeto con propiedad opcional — Persona
// -----------------------------------------------------------------------------------
const persona = {
    nombre: "David",
    edad: 30,
    ciudad: "Santiago",
};
persona.profesion = "Desarrollador de Software"; // OK porque profesion es opcional (?)
console.log(persona);
// -----------------------------------------------------------------------------------
// Operadores Rest y Spread con tipos
// -----------------------------------------------------------------------------------
// Spread con arrays de strings
const pilotos = ["Leclerc", "Sainz", "Verstappen"];
const nuevosPilotos = ["Piastri", "Norris"];
const todosPilotos = [...pilotos, ...nuevosPilotos]; // tipo string[] infierido
console.log(todosPilotos);
// Spread con objetos tipados
const coche1 = { marca: "Ferrari", motor: "V6" };
const coche2 = { ...coche1, color: "Rojo" }; // color es propiedad opcional
console.log(coche2);
// Rest en funciones — '...numeros' es un array de number
function sumarTodos(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
}
console.log(sumarTodos(10, 20, 30, 40));
export {};
//# sourceMappingURL=index.js.map