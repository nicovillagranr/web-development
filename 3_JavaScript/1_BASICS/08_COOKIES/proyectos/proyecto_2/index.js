// 2. Tema oscuro/claro persistente
// - Botón que cambia el tema de la web.
// - Guarda la elección en LocalStorage para que al recargar la página se mantenga.

let body = document.querySelector("body")
let botonTema = document.querySelector("#boton__tema")

// Al cargar el sitio revisamos si hay un valor de background guardado
let fondoGuardado = localStorage.getItem("fondo")

if(fondoGuardado){
    body.style.background = fondoGuardado
}

// Al hacer Click, cambiamos el fondo y lo guardamos en localStorage
botonTema.addEventListener("click" , function(){
    if(body.style.background === "black"){
        body.style.background = "white"
        localStorage.setItem("fondo" , "white")
    }
    else{
        body.style.background = "black"
        localStorage.setItem("fondo" , "black")
    }
})




















// Lista de tareas (To-Do List)

// Permite agregar, borrar y marcar tareas como completadas.

// Todo se guarda en LocalStorage para que al recargar la página no se pierdan.

// Carrito de compras básico

// Simula productos en un array, agrega al carrito y guarda el carrito en LocalStorage.

// Al recargar, el carrito sigue igual.

// Contador de visitas por usuario

// Cada vez que alguien entra, incrementa un contador y guárdalo en LocalStorage.

// Muestra “Bienvenido, esta es tu visita número X”.

// Formulario guardado a medio llenar

// Si el usuario empieza a llenar un formulario pero cierra la página, al volver los datos ya están.

// Ideal para practicar JSON.stringify y JSON.parse.

// Notas rápidas

// Un mini “bloc de notas” donde el usuario puede crear y borrar notas.

// Guarda todas en LocalStorage con un ID único.

// Juego de memoria simple

// Guarda la puntuación más alta en LocalStorage.

// Cada vez que el jugador gane, compara con la puntuación anterior y actualiza si es mejor.

// Lista de favoritos

// Simula una página de películas o libros.

// Permite marcar elementos como favoritos y guardarlos en LocalStorage.

// Reloj con alarma personalizada

// Permite al usuario configurar una alarma o recordatorio.

// Guarda la configuración en LocalStorage para que no se pierda al recargar.