// -------------------------------------------------------------
// Objeto Window: el jefe supremo del BOM (Browser Object Model)
// -------------------------------------------------------------
// Hereda de EventTarget, así que también puede escuchar eventos.

// -------------------
// Métodos básicos
// -------------------
// alert("Hola!")         -> Muestra un popup con un mensaje y un botón OK.
// print()                -> Abre el cuadro de impresión del navegador.
// prompt("Tu nombre?")   -> Pide un string al usuario y lo devuelve.
// confirm("Seguro?")     -> Devuelve true/false según Aceptar o Cancelar.

// -------------------
// Pantalla y Scroll
// -------------------
// window.screen          -> Info de la pantalla (resolución, profundidad de color, etc).
// window.scrollX         -> Cuántos píxeles te has movido horizontalmente.
// window.scrollY         -> Cuántos píxeles te has movido verticalmente.
// window.scroll(x, y)    -> Te lleva a la posición indicada.
// window.scroll({top:0}) -> Versión con opciones (ej: smooth scroll).

// -------------------
// Location: URLs y navegación
// -------------------
// window.location.href       -> URL completa (ej: "https://ejemplo.com/about").
// window.location.hostname   -> Solo el dominio (ej: "ejemplo.com").
// window.location.pathname   -> La ruta (ej: "/about").
// window.location.protocol   -> Protocolo (ej: "https:").
// window.location.assign(url)-> Carga un nuevo documento y lo guarda en historial.
// window.location.replace(url)-> Igual que assign, pero sin guardar en historial.
// window.location.reload()   -> Recarga la página (F5, básicamente).

// -------------------
// Ejemplos rápidos
// -------------------
/*
prompt("¿Cómo te llamas?"); 
// Usuario escribe "Nico" -> devuelve "Nico".

if(confirm("¿Quieres salir?")){
  window.location.href = "https://google.com";
}

window.scroll({top: 500, behavior: "smooth"});
*/
