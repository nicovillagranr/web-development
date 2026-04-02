// 🧠 1. Inspector de usuarios
// Enunciado:
// Crea un script que genere un array con 10 objetos usuario (nombre, edad, país).
// Usa console.table() para mostrarlos.
// Si algún usuario tiene edad < 18, márcalo con console.warn().
// Si falta algún campo, lanza console.error().
// Mide cuánto tarda en generarse el array con console.time() y console.timeEnd().
// Simular una base de datos de usuarios
const usuarios = [
    { nombre: "Ana", edad: 25, pais: "Chile" },
    { nombre: "Luis", edad: 17, pais: "México" },
    { nombre: "John", edad: 35, pais: "Estados Unidos" },
    { nombre: "Charles", edad: 29, pais: null }, // pais null — campo incompleto
];
// Mostramos todos nuestros usuarios en una tabla
console.table(usuarios);
// TS: en el for...of, 'usuario' se infiere como tipo Usuario automáticamente
for (const usuario of usuarios) {
    if (!usuario.nombre || !usuario.edad || !usuario.pais) {
        console.error(`Usuario ${usuario.nombre} con datos incompletos.`);
    }
    else if (usuario.edad < 18) {
        console.warn(`El usuario ${usuario.nombre} es menor de edad.`);
    }
}
// Medimos el rendimiento
console.time("generacion");
for (let i = 0; i < 100000; i++) { }
console.timeEnd("generacion");
export {};
//# sourceMappingURL=index.js.map