let form = document.querySelector("#formPeli")
let ul = document.querySelector("#peliculas_list")

form.addEventListener("submit" , function(){
    let titulo = document.querySelector("#addPelicula").value;
    if(titulo.length >= 1){
        localStorage.setItem(titulo , titulo)
    }
})

for(let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = localStorage.getItem(key)

    if(typeof value === "string"){
        let li = document.createElement("li")
        li.textContent = value
        ul.append(li)
    }
}

let formBorrar = document.querySelector("#formBorrarPeli")
formBorrar.addEventListener("submit" , function(){
    let titulo = document.querySelector("#borrarPelicula").value;
    if(titulo.length >= 1){
        localStorage.removeItem(titulo)
    }
    else{
        console.log(`Peli no encontrada`);
    }
})