// Enunciado:
// - Crea un fichero JavaScript y vinculalo con tu fichero HTML ✅
// - Debes crear las variables marca, velocidad, stock y modelos(Array) ✅
// - Todas las variables deberán ser mostradas por la pantalla (Con una frase) ✅
// - Debes mostrar cada uno de los elementos de un Array (Sin hacerlo manualmente)

// Tomamos la caja de HTML para mostrar el contenido
let caja = document.querySelector(".layout__content")
caja.style.fontSize = "3rem"

// Creamos nuestras variables
let marca = "Ferrari",
    velocidad = 350,
    stock = 5,
    modelos = ["La Ferrari" , "Purosangue" , "F40"]

let frase = `Tenemos autos de la marca ${marca}, que van a una velocidad Máxima de ${velocidad}Km/h, con un stock de ${stock} unidades y los modelos son: `

modelos.forEach(modelo => {
    frase += `<br> ${marca} ${modelo}`
})
caja.innerHTML = frase