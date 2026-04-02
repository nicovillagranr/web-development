// 🔁 2. Contador de ejecuciones
// Enunciado:
// Haz una función registrarPeticion() que simule recibir peticiones de red.
// Cada vez que se ejecute, muestra console.count('Petición').
// Cuando llegue a 10, usa console.countReset() y agrupa con console.group() el resumen.

// TS: la variable es number, la función no retorna nada (void)
let totalPeticiones: number = 0;

function registrarPeticion(): void {
  console.count("Peticion");
  totalPeticiones++;

  if (totalPeticiones === 10) {
    console.group("Resumen de peticiones");
    console.log("Se han registrado 10 peticiones");
    console.log("Reiniciando contador...");
    console.groupEnd();

    console.countReset("Peticion");
    totalPeticiones = 0;
  }
}

// Creamos un bucle para hacer la simulación del llamado de peticiones
for (let i: number = 0; i < 10; i++) {
  registrarPeticion();
}
