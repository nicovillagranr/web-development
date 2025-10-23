// 📂 devTools.js
// ============================================================================
// ----------------- HERRAMIENTAS DE DEBUGGING EN JAVASCRIPT -----------------
// ============================================================================

// ==========================
// 1️⃣ Consola (console.*)
// ==========================

// Funciones básicas de registro
console.log("Mensaje normal");
console.error("Mensaje de error");
console.warn("Advertencia");
console.info("Información");
console.assert(2 + 2 === 5, "Esto es un error");

// Mostrar datos en tabla
const usuarios = [
    { nombre: "Ana", edad: 25 },
    { nombre: "Luis", edad: 30 },
];
console.table(usuarios);
console.dir(usuarios[0]);

// ==========================
// Conteo y temporizadores
// ==========================
console.count("veces");
console.count("veces");
console.countReset("veces");

console.time("Temporizador");
for(let i = 0; i < 1000000; i++){} // simulación de tarea
console.timeEnd("Temporizador");

// ==========================
// Agrupación de mensajes
// ==========================
console.group("Grupo de ejemplo");
console.log("Mensaje dentro del grupo");
console.log("Otro mensaje");
console.groupEnd();

console.groupCollapsed("Grupo colapsado");
console.log("Mensaje dentro del grupo colapsado");
console.groupEnd();

// ============================================================================
// ----------------- DEVELOPER TOOLS (Chrome / Navegador) -----------------
// ============================================================================

// Pestaña Elements
// - Filtros y búsqueda
// - Modificar / crear / eliminar etiquetas
// - Modificar CSS
// - Event Listeners
// - Properties
// - Copiar elementos y explorar

// Pestaña Resources
// - Ver y guardar archivos
// - Cambios en tiempo real
// - Snippets (ejecutar fragmentos de código)

// Pestaña Network
// - Interfaz, filtros y sorting
// - Limpiar cookies y caché
// - Importar / exportar requests

// Pestaña Timeline / Performance
// - Uso y grabación
// - Screenshots
// - Overview FPS, CPU, NET
// - Flame Chart y detalles
// - Sugerencias de grabación

// Pestaña Aplicación / Application
// - Storage, Cache, Background Services
// - Frames

// Ejemplo rápido de manipulación desde DevTools
// document.querySelector("body > div > p").style.color = "black";
