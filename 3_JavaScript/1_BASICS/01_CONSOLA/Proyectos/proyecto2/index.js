// 🔁 2. Contador de ejecuciones
// Enunciado:
// Haz una función registrarPeticion() que simule recibir peticiones de red.
// Cada vez que se ejecute, muestra console.count('Petición').
// Cuando llegue a 10, usa console.countReset() y agrupa con console.group() el resumen.

// Definimos la variable inicial
let totalPeticiones = 0

// Creamos la función para iniciar las peticiones y validad el número de estas
function registrarPeticion(){
    console.count("Peticion")
    totalPeticiones++

    if(totalPeticiones === 10){
        console.group("Resumen de peticiones")
        console.log("Se han registrado 10 peticiones")
        console.log("Reiniciando contador...");
        console.groupEnd("Resumen de peticiones")
        
        console.countReset("Peticion")
        totalPeticiones = 0
    }
}

// Creamos un bucle para hacer la simulación del llamado de peticiones
for(let i = 0; i < 10; i++){
    registrarPeticion()
}