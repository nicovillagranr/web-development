/*
Advertencias:
- En español por fines didacticos, en la vida real usa nombres en ingles.
- Test en cada ejercicio, lo veremos al final del curso para ir al grano.
- Ejercicios genéricos, puedes usar cualquier lenguaje.
- Ejercicios nuevos y diferentes a los del Master en Lógica de Programación
- Siempre mostrar el resultado en la consola / terminal (salvo excepciones).
- Hay muchas soluciones validas para un mismo ejercicio.

Enunciado Ejercicio 6:
Dado un año actual, crea un programa que me muestre 
los años bisiestos que habrá en los proximos 30 años

Ejemplo:
bisiestos(2023);

// Salida:
2024
2028
2032
2036
2040
2044
2048
2052
*/

function bisiestos(anio){
    // Asignamos el límite de años en que comprobaremos si hay bisiestos
    const limite = 30

    // Bucle que se ejecute tantas veces como años límite tengamos
    for(let i = 0; i < limite; i++){

        // Comprobar si el día 29 de Febrero existe en el año actual
        const fecha = new Date(anio , 1 , 29).getMonth();

        if(fecha === 1){
            console.info(anio)
        }
        anio++
    }
}

bisiestos(2000)