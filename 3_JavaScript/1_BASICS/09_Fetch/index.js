// Fetch (AJAX) y Peticiones a servicios / APIS Rest


let divUsuarios = document.querySelector("#usuarios")

    getUsuarios()
    .then(data => data.json())
    .then(users => {
        listadoUsuarios(users)
    })

function getUsuarios(){
    return fetch('https://jsonplaceholder.typicode.com/users')
}

function listadoUsuarios(usuarios){
    for (let i = 0; i < usuarios.length; i++){
        let nombre = document.createElement("h4");
        nombre.innerHTML = `${i} ${usuarios[i].name}`;
        divUsuarios.appendChild(nombre);
    }

    // Ocultamos el Loading después de mostrar todos los usuarios
    document.querySelector(".loading").style.display = "none";
}