// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// Arrays y Objetos
// -----------------------------------------------------------------------------------

// Array común
const cajaFrutas = ["Pera", "Manzana", "Sandía", "Mangos"];
console.log("Segunda fruta:", cajaFrutas[1]);

// Array asociativo (objeto)
const pc = {
    nombre: "NicoPC",
    procesador: "Intel Core I7",
    ram: "16GB",
    espacio: "1TB"
};

console.log(`El nombre de mi PC es: ${pc.nombre}, procesador: ${pc.procesador}, RAM: ${pc.ram}, almacenamiento: ${pc.espacio}`);

// Array anidado
const grupos = [
    ["Juan", "Pedro", "Luis"],
    ["Ana", "Marta", "Carla"]
];
console.log("Segundo nombre de la segunda lista:", grupos[1][1]);

// -----------------------------------------------------------------------------------
// ------------ Bucles con arrays y objetos ------------

// for básico
const colores = ["Rojo", "Verde", "Azul", "Amarillo"];
for (let i = 0; i < colores.length; i++) {
    console.log("Color:", colores[i]);
}

// for...in con objeto
const IPhone = {
    modelo: "IPhone 16 Pro",
    color: "Titanio Desierto",
    almacenamiento: "1Tb"
};
for (let prop in IPhone) {
    console.log(`${prop}: ${IPhone[prop]}`);
}

// for...of con array
const numeros = [1, 2, 3, 4, 5];
for (let n of numeros) {
    console.log("Doble:", n * 2);
}

// -----------------------------------------------------------------------------------
// ------------ Objetos y arrays con template strings ------------

// Objeto videojuego
const TLOU = {
    nombre: "The Last Of Us",
    genero: "Post-Apocalíptico",
    año: 2013,
    plataforma: "PS3",
    jugadores: "1 Player"
};
console.log(`Mi juego favorito es: ${TLOU.nombre}. Año: ${TLOU.año}, Género: ${TLOU.genero}, Plataforma: ${TLOU.plataforma}, Jugadores: ${TLOU.jugadores}`);

// Array de arrays (países y capitales)
const maps = [
    ["Chile", "Argentina", "Perú"],
    ["Santiago", "Buenos Aires", "Lima"]
];
console.log(`La capital de ${maps[0][1]} es ${maps[1][1]}`);

// Objeto con nueva propiedad
const persona = {
    nombre: "David",
    edad: 30,
    ciudad: "Santiago"
};
persona.profesion = "Desarrollador de Software";
console.log(persona);

// -----------------------------------------------------------------------------------
// ------------ Operadores Rest y Spread ------------

// Spread con arrays
const pilotos = ["Leclerc", "Sainz", "Verstappen"];
const nuevosPilotos = ["Piastri", "Norris"];
const todosPilotos = [...pilotos, ...nuevosPilotos];
console.log(todosPilotos);

// Spread con objetos
const coche1 = {marca: "Ferrari", motor: "V6"};
const coche2 = {...coche1, color: "Rojo"};
console.log(coche2);

// Rest en funciones
function sumarTodos(...numeros) {
    return numeros.reduce((a,b) => a + b, 0);
}
console.log(sumarTodos(10, 20, 30, 40));
