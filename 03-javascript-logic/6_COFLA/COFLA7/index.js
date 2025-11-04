// Después de aprobar el año, Cofla se compra una mejor computadora para poder hacer todo de forma más fácil.
// El problema viene a la hora de necesitar una resolución más optima para poder programar mejor

// Problema A
// La pantalla debe ser por lo menor Full HD (1920x1080)
// Preguntarle si está seguro a la hora de comprar

// let alto = window.screen.height
// let ancho = window.screen.width

// let comprar = confirm(`El alto es de: ${alto}px y el ancho es de ${ancho}px`)
// if(comprar){
    // alert(`Compra realizada`)
// }else{
    // alert(`Compra cancelada`)
// }


// Cofla llega a su casa a navegar por un sitio web y presiona F11. Ahora Cofla está navegando en pantalla completa, pero esto nos trae un problema. No se puede visualizar ni URL ni protocolo ni barra de marcadores.

// Problema B
// Crear un sistema que muestre los suficientes datos para conocer el sitio web

let href = window.location.href
let pathname = window.location.pathname
let hostname = window.location.hostname
let protocol = window.location.protocol

let html = `Procotolo: <b>${protocol}</b><br>`
html += `Hostname: <b>${hostname}</b><br>`
html += `Pathname: <b>${pathname}</b><br>`
html += `Url Completa: <b>${href}</b>`

document.writeln(html)