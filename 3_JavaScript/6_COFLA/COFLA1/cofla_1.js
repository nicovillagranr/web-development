// --------------------
// --------------------
// Problema A

// 3 chicos entran a comprar a una heladería, pero hay un problema, los precios no están al lado de cada estante con su respectivo helado.
// Ellos quieren comprar el helado más caro que puedan con el dinero que tienen.

// 1. Pedirles que ingresen el monto que tienen y mostrarles el helado más caro que puedan comprar.
// 2. Si hay 2 o más con el mismo precio, mostrar ambos.
// 3. Cofla quiere saber cuánto es el vuelto.`

// Los precios de los helados son los siguientes: <br>
// Palito de Helado de Agua: $0.6 USD.
// Palito de Helado de Crema: $1 USD.
// Bombón Helado marca Heladix: $1.6 USD.
// Bombón Helado marca Heladovich: $1.7 USD.
// Bombón Helado marca Helardo: $1.8 USD.
// Potecito de Helado con Confites: $2.9 USD.
// Pote de 1/4 KG: $2.9 USD.

// Roberto tiene: $1.5USD
// Pedro tiene: $1.7USD
// Cofla tiene: $3USD

// Código de un PRO
// const definirCompra = (n) =>{
//     let dinero = prompt(`Monto que tiene ${n}`)
//     if(dinero >= 0.6 && dinero < 1) return (`${n}: Helado de agua<br>`)
//     if(dinero >= 1 && dinero < 1.6) return (`${n}: Helado de crema<br>`)
//     if(dinero >= 1.6 && dinero < 1.7) return (`${n}: Helado de Heladix<br>`)
//     if(dinero >= 1.7 && dinero < 1.8) return (`${n}: Helado de Heladovich<br>`)
//     if(dinero >= 1.8 && dinero < 2.9) return (`${n}: Helado de Helardo<br>`)
//     if(dinero >= 2.9) return (`${n}: Helado de confites o pote de 1/4 Kg<br>`)
//         else return (`${n}: No te alcanza para ningún helado pobre de mierda<br>`)
// }
// document.writeln(definirCompra(`Roberto`))
// document.writeln(definirCompra(`Pedro`))
// document.writeln(definirCompra(`Cofla`))
// --------------------
// --------------------
// Problema B
// Cofla no compra ningún helado y decide regalar ese dinero a un sin techo
// Este con el dinero decide comprar boletos de lotería, los que le alcancen.

// Si le alcanza uno, lo compra
// Si le alcanza 2 compra 2
// Si le alcanza 3 y sobra, regala el vuelto
// Debe mostrar qué compró y el vuelto

// let dinero = 3000
// let precioKino = 1000

// function compra(dinero, precio) {
//     let cantidad = Math.floor(dinero / precio) // cuántos Kinos puede comprar
//     let vuelto = dinero % precio // lo que sobra

//     if (cantidad === 0) {
//         document.writeln("No puedes comprar ni un Kino")
//     } else if (cantidad === 1) {
//         document.writeln("Compraste 1 Kino")
//     } else if (cantidad === 2) {
//         document.writeln("Compraste 2 Kinos")
//     } else if (cantidad >= 3) {
//         document.writeln(`Compraste 3 Kinos y te quedó un vuelto de ${vuelto} pesos.`)
//     }
// }
// compra(dinero, precioKino)
// --------------------
// --------------------
// Problema C
// Hubo un asesinato en el barrio y hay 3 sospechosos que serán sometidos al detector de mentiras
// Si el sospechoso miente, se le da una descarga eléctrica
// Si no miente, no hacer nada
// Si el aparato no se decide, aclarar que la pregunta debe ser más clara

// function detector(respuesta, nombre) {
//     if(respuesta === "miente"){
//         console.log(`${nombre} recibe una descarga eléctrica ⚡`)
//     }
//     else if(respuesta === "verdad"){
//         console.log(`${nombre} no recibe castigo`)
//     }
//     else{
//         console.log(`La máquina no entiende, la pregunta debe ser más clara`)
//     }
// }

// // Ejemplo con 3 sospechosos
// detector("miente", "Sospechoso 1")
// detector("verdad", "Sospechoso 2")
// detector("dudoso", "Sospechoso 3")