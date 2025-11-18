/* 
🏎️ Ejercicio 19. Campeonato de Fórmula 1

Objetivo:
Crear un sistema completo para simular un campeonato de F1.

Clases principales:
1. Piloto → nombre, edad, escudería, puntos.
2. Auto → marca, modelo, velocidad máxima, combustible.
3. Escuderia → nombre, pilotos y autos.
4. Circuito → nombre, país, kilómetros.
5. Carrera → se corre en un circuito, participan pilotos con autos.
//    - Se asignan puntos según posición (FIA: 1º=25, 2º=18, 3º=15, ...).
//    - Se actualizan puntos del campeonato automáticamente.

Lo que se pide:
- Crear varias escuderías con pilotos y autos.
- Crear un campeonato con diferentes circuitos y carreras.
- Simular carreras y actualizar puntos y combustible.
- Mostrar la tabla de clasificación final de pilotos.

Este ejercicio combina herencia, arrays, métodos y simulación.
*/

// ===========================
// 🚀 Campeonato 2025
// ===========================

class Campeonato{
    constructor(nombre){
        this.nombre = nombre
        this.listaCircuitos = []
        this.listaCarreras = []
        this.listaScuderias = []
        this.carrerasTerminadas = 0
    }

    presentarCampeonato(){
        console.info(`¡Sean todos bienvenidos a este nuevo campeonato ${this.nombre}!`)
        console.info(``)
    }

    crearCircuito(indice , nombre , pais , kilometros){
        const circuito = this.listaCircuitos.find(c => c.indice === indice)
        if(circuito){
            console.warn(`El circuito con índice ${indice} ya existe`)
            return
        }
        this.listaCircuitos.push({indice , nombre , pais , kilometros})
    }

    mostrarCircuitos(){
        console.info(`Esta es la lista de Circuitos disponibles para este año:`)
        for(let i = 0; i < this.listaCircuitos.length; i++){
            const circuito = this.listaCircuitos[i]
            console.info(`Circuito: ${circuito.nombre} - País: ${circuito.pais} - Kilómetros Totales: ${circuito.kilometros}`)
        }
    }

    crearCarreras(indice , fecha){
        const circuito = this.listaCircuitos[indice]
        if(!circuito){
            console.warn(`El circuito seleccionado no existe` )
            return
        }
        this.listaCarreras.push({ circuito , fecha })
    }

    mostrarCarreras(){
        console.info(``)
        console.info(`Estas son las carreras para este año:`)
        for(let i = 0; i < this.listaCarreras.length; i++){
            const carrera = this.listaCarreras[i]
            console.info(`${i+1}: ${carrera.circuito.nombre} - (${carrera.circuito.pais}) - (${carrera.fecha})`)
        }
    }

    crearScuderia(nombreScuderia){
        this.listaScuderias.push({ nombreScuderia , pilotos: [] , autos: [] })
    }

    ficharPilotos(nombreScuderia , piloto , puntos = 0){
        const scuderia = this.listaScuderias.find(s => s.nombreScuderia === nombreScuderia)
        if(!scuderia){
            console.warn(`No existe la Scudería ${nombreScuderia}`)
            return
        }
        if(scuderia.pilotos.length >= 2){
            console.warn(`${nombreScuderia} ya tiene sus 2 pilotos.`)
            return
        }
        scuderia.pilotos.push({ nombre: piloto , puntos: puntos })
    }

    ficharAutos(nombreScuderia , auto){
        const scuderia = this.listaScuderias.find(s => s.nombreScuderia === nombreScuderia)
        if(!scuderia){
            console.warn(`No existe la scudería ${nombreScuderia}`)
            return
        }
        scuderia.autos.push(auto)
    }

    mostrarScuderias(){
        console.info(``)
        console.info(`Estas son las Scuderias de este año:`)
        for(let scuderia of this.listaScuderias){
            console.info(`\n➡️ ${scuderia.nombreScuderia}`)

            if(scuderia.pilotos.length > 0) {
                console.info(`Pilotos:`)
                for (let piloto of scuderia.pilotos){
                    console.info(`Nombre: ${piloto.nombre} Puntos: ${piloto.puntos}`)
                }
            }
            else {
                console.info(`(Sin pilotos aún)`)
            }

            if(scuderia.autos.length > 0){
                console.info(`Autos:`)
                for(let auto of scuderia.autos){
                    console.info(`- ${auto}`)
                }
            }
            else{
                console.info(`(Sin autos aún)`)
            }
        }
    }

    correrCarrera(indice){
        const carrera = this.listaCarreras[indice]
        if(!carrera){
            console.warn(`La carrera ${indice} no existe.`)
            return
        }

        console.info(`\n🏁 Carrera en ${carrera.circuito.nombre} (${carrera.circuito.pais}) - ${carrera.fecha}`)

        let pilotos = []
        for(let scuderia of this.listaScuderias){
            for(let piloto of scuderia.pilotos){
                pilotos.push({ nombre: piloto.nombre , puntos: piloto.puntos , scuderia: scuderia.nombreScuderia})
            }
        }

        for(let i = pilotos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[pilotos[i], pilotos[j]] = [pilotos[j], pilotos[i]]
        }

        const puntosFIA = [25,18,15,12,10,8,6,4,2,1]

        for(let i = 0; i < pilotos.length; i++){
            const puntos = puntosFIA[i] || 0
            pilotos[i].puntos = pilotos[i].puntos + puntos
            const scuderia = this.listaScuderias.find(s => s.nombreScuderia === pilotos[i].scuderia)
            const pilotoRef = scuderia.pilotos.find(p => p.nombre === pilotos[i].nombre)
            pilotoRef.puntos = pilotos[i].puntos
            console.info(`${i+1}° ${pilotos[i].nombre} (${pilotos[i].scuderia}) +${puntos}Pts`)
        }

        this.carrerasTerminadas++
        console.info(`\nCarrera completada ✅ | Total de carreras terminadas: ${this.carrerasTerminadas}`)
    }

    mostrarClasificacion(){
        console.info(`\n📊 Clasificación General - ${this.nombre}`)
        let todosPilotos = []
        for(let scuderia of this.listaScuderias){
            for(let piloto of scuderia.pilotos){
                todosPilotos.push({ 
                    nombre: piloto.nombre, 
                    puntos: piloto.puntos, 
                    scuderia: scuderia.nombreScuderia
                })
            }
        }

        todosPilotos.sort((a,b) => b.puntos - a.puntos)

        todosPilotos.forEach((piloto, index) => {
            console.info(`${index+1}. ${piloto.nombre} (${piloto.scuderia}) - ${piloto.puntos} pts`)
        })
    }
}

// -------------------------------
// USO DEL CAMPEONATO
// -------------------------------

const F12025 = new Campeonato("Formula 1 2025")
F12025.presentarCampeonato()

F12025.crearCircuito(0 , "Circuit de Monaco" , "Mónaco" , 3337)
F12025.crearCircuito(1 , "Autodromo Nazionale di Monza" , "Italia" , 5793)
F12025.crearCircuito(2 , "Silverstone Circuit" , "Reino Unido" , 5891)
F12025.crearCircuito(3 , "Spa-Francorchamps" , "Bélgica" , 7004)
F12025.crearCircuito(4 , "Suzuka International Racing Course" , "Japón" , 5807)
F12025.crearCircuito(5 , "Autódromo José Carlos Pace (Interlagos)" , "Brasil" , 4309)
F12025.crearCircuito(6 , "Circuit Gilles Villeneuve" , "Canadá" , 4361)
F12025.crearCircuito(7 , "Nürburgring" , "Alemania" , 5148)
F12025.crearCircuito(8 ,"Hungaroring" , "Hungría" , 4381)
F12025.crearCircuito(9 , "Autodromo Enzo e Dino Ferrari (Imola)" , "Italia" , 4909)
F12025.crearCircuito(10 , "Circuit de Barcelona-Catalunya" , "España" , 4675)
F12025.crearCircuito(11 , "Yas Marina Circuit" , "Emiratos Árabes Unidos" , 5281)
F12025.crearCircuito(12 , "Red Bull Ring" , "Austria" , 4326)
F12025.crearCircuito(13 , "Circuit of the Americas" , "Estados Unidos" , 5513)
F12025.crearCircuito(14 , "Albert Park Circuit" , "Australia" , 5303)
F12025.crearCircuito(15 , "Bahrain International Circuit" , "Baréin" , 5412)

F12025.mostrarCircuitos()

F12025.crearCarreras(0 , "30/09/2025")
F12025.crearCarreras(1 , "30/10/2025")
F12025.crearCarreras(2 , "30/11/2025")
F12025.crearCarreras(3 , "30/12/2025")
F12025.crearCarreras(4 , "30/01/2026")
F12025.crearCarreras()
