// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Métodos Transformadores
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// pop() -> Elimina el último elemento de un array y lo devuelve.
// let nombres = ["Nico" , "Javi" , "Lucas"]
// document.writeln(`Array Original: <b>${nombres}</b><br>`)
// let resultado = nombres.pop()

// document.writeln(`Elemento removido: <b style= 'color:red'>${resultado}</b><br>`)
// document.writeln(`Resultado: <b>${nombres}</b>`)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// shift() -> Elimina el primer elemento de un array y lo devuelve.
// let nombres = ["Nico" , "Javi" , "Lucas"]
// document.writeln(`Array Original: <b>${nombres}</b><br>`)
// let resultado = nombres.shift()

// document.writeln(`Elemento removido: <b style= 'color:red'>${resultado}</b><br>`)
// document.writeln(`Resultado: <b>${nombres}</b>`)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// push() -> Agrega uno o más elementos al final del array.
// let lista = ["Manzana" , "Naranja" , "Sandía" , "Pera" , "Mango"]
// let nuevaLista = lista.push("Uva")
// document.writeln(nuevaLista)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// reverse() -> Invierte el orden de los elementos del array.
// let numeros = [1,2,3,4,5]
// document.writeln(numeros.reverse())
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// unshift() -> Agrega uno o más elementos al inicio del array.
// let nombres = ["Nico" , "Javi" , "Juaco"]
// nombres.unshift("Ruben")
// document.writeln(nombres)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// sort() -> Ordena los elementos del array (por defecto como strings).
// let numeros = [2,1,4,6,7,8,9,3]
// numeros.sort()
// document.writeln(numeros)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// splice() -> Permite agregar, eliminar o reemplazar elementos en el array.
// let numeros = ["abc" , "manzana" , "roberto" , "dedo" , "Ferrari"]
// document.writeln(`${numeros}<br>`)

// numeros.splice(0,3, "Bugatti" , "Koenigsegg" , "Lamborguini")
// document.writeln(numeros)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Métodos Accesores

// join() -> Une todos los elementos del array en un string, separado por un delimitador.
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]
// document.writeln(autos + "<br>")
// let autosNuevo = autos.join(` - `)
// document.writeln(autosNuevo)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// slice() -> Devuelve una copia superficial de una parte del array sin modificar el original.
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]
// document.writeln(autos + "<br>")

// let autosNuevo = autos.splice(0 , 5)
// document.writeln(autosNuevo)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// includes() -> Devuelve en Booleano si hay un elemento dentro del array o no
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]
// document.writeln(autos + "<br>")

// let autosNuevo = autos.includes("Nissan") // Nissan da false
// document.writeln(autosNuevo)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// indexOf -> Duelve la posición en el string del dato que estamos buscando
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]
// document.writeln(autos + "<br>")

// let autosNuevo = autos.indexOf("Pagani")
// document.writeln(autosNuevo)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Métodos de Arrays de Repetición
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// filter() -> Crea un nuevo array con los elementos que cumplen una condición.
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]
// resultado = autos.filter(autos => autos.length > 4)
// document.writeln(resultado)
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// forEach() -> Ejecuta una función por cada elemento del array.
// let autos = ["BMW" , "Mercedes" , "Pagani" , "Bugatti" , "Ferrari" , "Dodge"]

// autos.forEach(function(autos){
    // document.writeln(autos + "<br>")
// })