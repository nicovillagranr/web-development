// Problema A:
// Crea una función entradaFiesta que reciba una edad y la hora de entrada (como número, por ejemplo 1 para 1AM) y devuelva "Puede entrar gratis", "Debe pagar" o "No puede entrar" según corresponda.

// function entradaDisco(edad , hora){
//     if (edad >= 18 && hora >= 3) {
//         return `Tienes ${edad}, puedes pasar.<br>
//         Además son las ${hora}:00 AM, pasas gratis.`;
//     } 
//     else if (edad >= 18 && (hora >= 0 && hora <= 2)) {
//         return `Tienes ${edad}, puedes pasar.<br>
//         Pero son las ${hora}:00 AM, tienes que pagar flaco.`;
//     } 
//     else {
//         return `Tienes ${edad}, eres menor de edad.`;
//     }
// }

// let edad = Number(prompt("Dime tu edad para entrar a la Disco"))
// let hora = Number(prompt("¿A qué hora entraste?"))

// document.writeln(entradaDisco(edad , hora))
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Problema B:
// Crear un mini sistema que nos permita registrar a los alumnos presentes y ausentes.
// Pasados 30 días, mostrar su situación final del alumno.
// Máximo de 10% de ausencias.

// let cantidad = parseInt(prompt(`¿Cuántos alumnos son?`));
// let alumnosTotales = [];

// // Pedir nombres
// for (let i = 0; i < cantidad; i++) {
//     let nombreAlumno = prompt("Nombre del alumno " + (i + 1));
//     alumnosTotales.push({ nombre: nombreAlumno, presentes: 0 });
// }

// // Función para registrar asistencia
// function tomarAsistencia(alumno) {
//     let presencia = prompt(`¿${alumno.nombre} está presente? (P/A)`);
//     if (presencia.toLowerCase() === "p") {
//         alumno.presentes++;
//     }
// }

// // Tomar asistencia por 30 días
// for (let dia = 0; dia < 30; dia++) {
//     for (let alumno of alumnosTotales) {
//         tomarAsistencia(alumno);
//     }
// }

// // Mostrar resultados
// for (let alumno of alumnosTotales) {
//     let ausencias = 30 - alumno.presentes;
//     let resultado = `${alumno.nombre}:<br>
//     _______Presente: ${alumno.presentes}<br>
//     _______Ausencias: ${ausencias}<br>`;
    
//     if (ausencias > 3) { // 10% de 30 días = 3
//         resultado += `Reprobado por inasistencias<br>`;
//     }
    
//     document.writeln(resultado);
// }



// Crear una calculadora para ayudar a Cofla a estudiar para su examen de matemáticas
const calculadora = (n1 , operador , n2) => {
    let resultado
    if(operador === "+") resultado = n1 + n2
    else if(operador === "-") resultado = n1 - n2
    else if(operador === "*") resultado = n1 * n2
    else if(operador === "/") resultado = n1 / n2
    else if(operador === "%"){
        if(n2 === 0){
            return document.writeln("No se puede dividir por 0")
        }
        resultado = n1 % n2
    }
    else return document.writeln(`Operador no válido`)

    document.writeln(`El resultado de tu operación es: ${resultado}`)
}
let n1 = Number(prompt("Ingresa el primer número a la calculadora"))
let operador = prompt("Ingresa el operador (+, -, *, /, %)");
let n2 = Number(prompt("Ingresa el segundo número a la calculadora"))

calculadora(n1, operador , n2)