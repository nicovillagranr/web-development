// Manipulación del video de fondo
let miVideo = document.querySelector('#miVideo');

// Manipulación del botón
let miBoton = document.querySelector('#myBtn');

// Función para pausar y reproducir el video y cambiar el contenido del botón
miBoton.addEventListener('click' , function(){
    if(miVideo.paused){
        miVideo.play();
        miBoton.innerHTML = "Pause";
    }
    else{
        miVideo.pause();
        miBoton.innerHTML = "Play";
    }
})