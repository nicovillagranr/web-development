// Problema B

// Crear un sistema de visualización de información para que los profesores puedan ver cuándo van a dar la prueba los alumnos

// La interfaz debe ser agradable y atractiva
// Debe contener todos los datos de manera estructurada
// El profesor puede seleccionar cual de las 2 semanas rinde el usuario
// Si el profesor confirma, los datos se deben actualizar y reemplazar el espacio de selección de semana por la semana seleccionada

let alumnos = [{
    nombre: "Lucas Dalto",
    email: "Soydalto@gmail.com",
    materia: "Fisica"
},
{
    nombre: "Lando Norris",
    email: "Soylando@gmail.com",
    materia: "Mecánica"
},
{
    nombre: "Charles Leclerc",
    email: "leclerccharles@gmail.com",
    materia: "Econonomía"
},
{
    nombre: "Carlos Sainz",
    email: "SainzCarlos@gmail.com",
    materia: "Matemática"
},
{
    nombre: "Lewis Hamilton",
    email: "lewishamilton@gmail.com",
    materia: "Historia"
}];

const boton = document.querySelector(".boton-confirmar");

for(let alumno of alumnos){
    let htmlCode = `
    <div class="grid-item nombre">${alumno.nombre}</div>
        <div class="grid-item email">${alumno.email}</div>
        <div class="grid-item materia">${alumno.materia}</div>
        <div class="grid-item semana">
            <select class="semana-elegida">
                <option value="Semana 1">Semana 1</option>
                <option value="Semana 2">Semana 2</option>
            </select>
    </div>`
    document.querySelector(".grid-container").innerHTML += htmlCode
}

boton.addEventListener("click" , () => {
    let confirmar = confirm(`Quieres confirmar tu horario?`)
    if(confirmar){
        document.body.removeChild(boton)
        let elementos = document.querySelectorAll(".semana")
        let selects = document.querySelectorAll(".semana-elegida")

        elementos.forEach((elemento , i) => {
            elemento.innerHTML = selects[i].value
        })
    }
})