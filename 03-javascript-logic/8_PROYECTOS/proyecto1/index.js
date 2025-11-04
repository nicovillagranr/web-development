// Enunciado: 
// - Crea un fichero JavaScript vinculado con un fichero HTML
// - Debes crear las variables: nombre, apellido, edad, país y conocimientos esta última deberá ser un array
// - Muestra todos los valores de las variables por la consola
// - Después cambia el valor a edad y añade un nuevo elemento al array 
// - Muestra esos nuevos valores por la consola

// Creamos las variables con la info y las mostramos por consola
let nombre = "Nicolas";
let apellido = "Villagran";
let edad = 22;
let pais = "Chile";
let conocimientos = ["HTML" , "CSS" , "Bootstrap" , "JavaScript"]

console.info(`Nombre: ${nombre}
Apellido: ${apellido}
Edad: ${edad}
Pais: ${pais}
Conocimientos: ${conocimientos}`)

console.info(``)
console.log(`Edad y conociemientos actualizados`)
edad = 23;
conocimientos.push("React")
console.info(`Nueva Edad: ${edad}
Nuevos conociemientos: ${conocimientos}`)