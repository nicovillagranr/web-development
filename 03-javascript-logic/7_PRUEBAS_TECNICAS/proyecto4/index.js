/*
Advertencias:
- En español por fines didacticos, en la vida real usa nombres en ingles.
- Test en cada ejercicio, lo veremos al final del curso para ir al grano.
- Ejercicios genéricos, puedes usar cualquier lenguaje.
- Ejercicios nuevos y diferentes a los del Master en Lógica de Programación
- Siempre mostrar el resultado en la consola / terminal (salvo excepciones).
- Hay muchas soluciones validas para un mismo ejercicio.

Enunciado Ejercicio 4:
Crea el juego del ahorcado.
El usuario tendrá que ir adivinando y descubriendo las letras de una palabra 
secreta, y tendrá 5 intentos (un intento por extremidad del cuerpo humano).

Utiliza el método de entrada de datos habitual de tu lenguaje,
en el caso de JS, usaremos la función prompt.

Ejemplo:
juegoDelAhorcado('victor');  

// Salida:
Adivina la letra: i
La palabra es: _i___
Te quedan 5 intentos
*/

function juegoDelAhorcado(palabraSecreta){
    let palabraOculta = "_".repeat(palabraSecreta.length);
    let intentos = 5;

    while(intentos > 0 && palabraOculta !== palabraSecreta){
        let letra = prompt("Ingresa una letra para el juego");

        if(palabraSecreta.includes(letra)){
            let palabraArray = palabraOculta.split("");

            for(let i = 0; i < palabraSecreta.length; i++){
                if(palabraSecreta[i] === letra){
                    palabraArray[i] = letra;
                }
            }
            palabraOculta = palabraArray.join("");
        }
        else{
            intentos--;
        }
        console.log(palabraOculta);
        console.log(`Te quedan ${intentos} intentos`);
    }

    if(palabraOculta === palabraSecreta){
        console.info(`Enhorabuena , has ganado! la palabra secreta era: ${palabraSecreta}`)
    }
}

let botonInicio = document.querySelector("#lanzarJuego");
botonInicio.addEventListener("click", () => juegoDelAhorcado("nicolas"));
