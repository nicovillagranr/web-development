// Enunciado:
// - Dado un sueldo, crea un condicional Switch comparando su sueldo con diferentes tipos de sueldo y mostrar mensajes si su sueldo es bueno, malo, etc...

let sueldo = parseInt(prompt("Cuál es tu sueldo?"))
let resultado = document.querySelector('#resultado')

switch(true){
    case sueldo <= 200000:
        resultado.innerHTML = "Trabajas Part-Time";
        break;
    case sueldo <= 500000:
        resultado.innerHTML = "Ganas el sueldo mínimo";
        break;
    case sueldo <= 750000:
        resultado.innerHTML = "Estás empezando a ganar bien";
        break;
    case sueldo <= 1000000:
        resultado.innerHTML = "Tienes un sueldo bueno";
        break;
    case sueldo > 1000000:
        resultado.innerHTML = "Ganas Good";
        break;
    default:
        resultado.innerHTML = "No tienes sueldo";
}