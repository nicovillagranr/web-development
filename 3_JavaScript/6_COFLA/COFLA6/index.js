// Cofla se quedó encerrado en su casa porque se le rompió la llave, pero necesita ir urgente a la U si quiere aprobar el resto de materias que le faltan. 
// Lo que se le ocurrió es llamar a un cerrajero, para que traiga la llave indicada
// El problema recide en que no hay tiempo para que el cerrajero vea las llaves a elegir
// El tiene que tomar una y salir

// Problema A
// Se debe crear un sistema que le muestre a Cofla todas las llaves posibles con sus 4 imágenes y Cofla debe seleccionar cual llave debe usar.
// Una vez seleccionada enviar los datos al servidor y que otro programador se encargue


const contenedor = document.querySelector(".flex-container")

function crearLlave(nombre , modelo , precio){
    img = "<img class='llave-img' src='llave.png'>"
    nombre = `<h2>${nombre}</h2>`
    modelo = `<h3>${modelo}</h3>`
    precio = `<p>Precio: <b>$${precio}</b></p>`
    return [img , nombre , modelo , precio]
}

const changeHidden = (Number) => {
    document.querySelector(".key-data").value = Number
}

let documentFragment = document.createDocumentFragment()

for(let i = 1; i <= 20; i++){
    let modeloRandom = Math.round(Math.random() * 10000)
    let precioRandom = Math.round(Math.random()*10+30)
    let llave = crearLlave(`Llave: ${i}` , `Modelo: ${modeloRandom}` , precioRandom)
    let div = document.createElement("DIV")
    div.addEventListener("click" , () => {changeHidden(modeloRandom)})
    div.tabIndex = i
    div.classList.add(`item-${i}` , `flex-item`)
    div.innerHTML = llave[0] + llave[1] + llave[2] + llave[3]
    documentFragment.appendChild(div)
}

contenedor.appendChild(documentFragment)