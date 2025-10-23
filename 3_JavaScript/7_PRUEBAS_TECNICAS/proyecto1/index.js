/*
Advertencias:
- En español por fines didacticos, en la vida real usa nombres en ingles.
- Test en cada ejercicio, lo veremos al final del curso para ir al grano.
- Ejercicios genéricos, puedes usar cualquier lenguaje.
- Ejercicios nuevos y diferentes a los del Master en Lógica de Programación
- Siempre mostrar el resultado en la consola / terminal.
- Hay muchas soluciones validas para un mismo ejercicio.

Enunciado Ejercicio 1:
Dado un array o un objeto de superhéroes de Marvel, haz un programa que pueda
mostrar la información de un superheroe.

Y añade una capacidad de buscar la información de varios superhéroes a la vez.

Ejemplo:
mostrarInformacionSuperheroe('Iron Man');

Salida:
Nombre real: Tony Stark
Poderes: Tecnología avanzada, Movilidad aérea
Equipo: Los vengadores

Ejemplo 2: 
mostrarInformacionSuperheroes([array de nombres]]);

Salida:
Muestra la información de todos los superheroes
*/

// Creamos un Array de Objetos Super Heroes
const infoSuperHeroes = {
    "Iron Man": {
        nombreReal: `Tony Stark`,
        poderes: ["Tecnología Avanzada" , "Movilidad Aérea"],
        equipo: "Los Vengadores"
    },
    "Capitán América":{
        nombreReal: `Steve Rogers`,
        poderes: [`Fuerza Sobrehumana` , `Agilidad y Reflejos sobresalientes`],
        equipo: `Los Vengadores`
    },
    "Thor":{
        nombreReal: 'Thor Odinson',
        poderes: ['Mjolnir', 'Viento y trueno'],
        equipo: 'Los vengadores'
    },
    'Spider-Man': {
        nombreReal: 'Peter Parker',
        poderes: ['Balanceo', 'Telarañas pegajosas', 'Sentido aracnido'],
        equipo: 'Los vengadores'
    },
    'Hulk': {
        nombreReal: 'Bruce Banner',
        poderes: ['Fuerza sobrehumana', 'Invulnerabilidad'],
        equipo: 'Los vengadores'
    }
}

function mostrarInformacionSuperheroe(aka){
    // Comprobamos si el superheroe existe dentro del Array de Objetos
    if(aka in infoSuperHeroes){
    // Conseguir la info del superheroe
    const informacion = infoSuperHeroes[aka]
    // Mostrar la info
        return `SuperHeroe ${aka} - Nombre real: ${informacion.nombreReal} - Poderes: ${informacion.poderes.join(", ")} - Equipo: ${informacion.equipo}.`
    }
    else{
        return `SuperHeroe ${aka} no encontrado.`
    }
}
// console.log(mostrarInformacionSuperheroe("Iron Man"));

const mostrarInformacionSuperheroes = (akas) => {
    // Recorrer todos los nombres
    akas.forEach(nombre => {
    // Mostramos la infro usando la función anterior
    console.log(mostrarInformacionSuperheroe(nombre))
    })
}
mostrarInformacionSuperheroes(["Iron Man" , "Thor" , "Spider-Man" , "SuperMan"])