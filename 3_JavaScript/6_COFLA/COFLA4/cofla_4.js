// Problema A
// A la calculadora ya perfeccionada implementarle nuevas funcionalidades:
// Potencias
// Raices Cuadradas
// Raices Cúbicas
// const calculadora = (n1, operador, n2) => {
//     let resultado = 0

//     if(operador === "+") resultado = n1 + n2
//     else if(operador === "-") resultado = n1 - n2
//     else if(operador === "*") resultado = n1 * n2
//     else if(operador === "/") resultado = n1 / n2
//     else if(operador === "%"){
//         if(n2 === 0){
//             return document.writeln("No se puede dividir por 0")
//         }
//         resultado = n1 % n2
//     }
//     else if(operador === "^") resultado = Math.pow(n1 , n2)
//     else if(operador === "sqrt"){
//         if (n1 < 0) return document.writeln("No se puede sacar raíz cuadrada de un número negativo")
//         resultado = Math.sqrt(n1)
//     }
//     else if(operador === "cbrt") resultado = Math.cbrt(n1)
//     else{
//         return document.writeln(`Operador no válido`)
//     }
//     return `El resultado de tu operación es: ${resultado}`
// }
// let n1 = Number(prompt("Ingresa el primer número a la calculadora"))
// let operador = prompt("Ingresa el operador (+, -, *, /, %, ^, sqrt, cbrt)");
// let n2 = Number(prompt("Ingresa el segundo número a la calculadora"))
// console.log(calculadora(n1, operador , n2));






// Problema B
// La facultad de Cofla está por arrancar nuevamente. Las 12 materias ya tienen asignadas a un profesor, todos los alumnos ya están anotados en esas clases.
// Se deberá crear una función que al pasarle el parámetro materia nos devuelva:
// Profesor asignado
// Nombres de los alumnos apuntados a esa materia
// Se deberá crear una función que nos indique en cuántas clases está Cofla
// Nombre de las clases y sus profesores














// class Estudiante{
//     constructor(nombre , edad , curso){
//         this.nombre = nombre
//         this.edad = edad
//         this.curso = curso
//     }
//     verInfo(){
//         document.writeln(`Nombre: ${this.nombre} | Edad: ${this.edad} | Curso: ${this.curso}.<br>`)
//     }
// }
// let estudiantes = [
//     new Estudiante("Nico" , 25 , "JavaScript"),
//     new Estudiante("Javi" , 22 , "Python"),
//     new Estudiante("Cami" , 20 , "HTML y CSS"),
//     new Estudiante("Joaquin" , 18 , "Three JS")
// ]

// for(let alumno of estudiantes){
//     alumno.verInfo()
// }







// Problema C
// Cofla ya vió las 12 materias y ya sabe en cuáles inscribirse
// Debemos crear una función que le pregunte a Cofla en qué materias se quiere inscribir
// Si ya hay 20 inscritos, negarle la  inscripción
// Si hay menos de 20, inscribirlo y añadirlo a la lista de alumnos.