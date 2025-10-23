// Cofla ya terminó el semestre
// Para aprobar sus materias necesitará el 90% de asistencias
// El promedio por materias debe ser de al menos 7/10
// Y el 75% de los trabajos prácticos entregados

// Problema A
// Solicitar los datos y decirle si aprueba o no
// Mostrar todo esto con colores representativos en consola

// const materias = {
//     fisica: [90 , 6 , 3 , "Fisica"],
//     matematica: [84 , 8 , 2 , "Matematica"],
//     logica: [92 , 8 , 4 , "Logica"],
//     quimica: [96 , 6 , 3 , "Quimica"],
//     calculo: [91 , 6 , 3 , "Calculo"],
//     programacion: [79 , 6 , 3 , "Programacion"],
//     biologia: [75 , 6 , 3 , "Biologia"],
//     baseDatos: [98 , 9 , 2 , "Base de Datos"],
//     algebra: [100 , 9 , 4 , "Algebra"],
//     diseño: [95 , 10 , 4 , "Diseño"]
// }

// const aprobar = () => {
//     for(let materia in materias){

//         let asistencia = materias[materia][0]
//         let promedio = materias[materia][1]
//         let trabajos = materias[materia][2]

//         console.log(materias[materia][3])
//         if(asistencia >= 90){
//             console.log(`%cAsistencias en orden` , "color: green;");
//         }
//         else{
//             console.log(`%cFalta de asistencias` , "color: red;");
//         }

//         if(promedio >= 7){
//             console.log(`%cPromedio en orden` , `color: green;`)
//         }
//         else{
//             console.log(`%cPromedio desaprobado` , "color: red;");
//         }

//         if(trabajos >= 3){
//             console.log(`%cTrabajos prácticos en orden` , `color: green`)
//         }
//         else{
//             console.log(`%cTrabajos prácticos insuficientes` , "color: red;");
//         }
//     }
// }
// aprobar()
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// Cofla está preocupado, porque a pesar de contar con el 90% de asistencias y 
// tener un promedio superior a 7/10 no cree llegar a entregar el 75% de los trabajos
// prácticos ya que necesita dividir las tareas que hará semanalmente.
// Cofla debe trabajar 8 horas por día durante 2 semanas en las que tiene:

// 24 Horas para estudiar
// 24 Horas para hacer trabajos prácticos
// 56 Horas para trabajar
// Y 8 horas para hacer las cosas de la casa

// Problema B
// Organizar diariamente las tareas
// Utilizar la consola para organizarlo
// Cada tarea no debe superar las 4Hrs


// Dividimos las horas totales de cada tarea por la cantidad totales de días(2 semanas)

// 30 Minutos para tareas de la casa
// 100 minutos Trabajos
// 100 minutos para estudiar
// 10 min de descanso
// 240 minutos de Trabajo

// let trabajo = "240 Minutos de trabajo"
// let trabajosPracticos = "100 Minutos de trabajos practicos"
// let descanso = "10 Minutos"
// let estudio = "100 Minutos de estudio"
// let homeWork = "30 Minutos de cosas para la casa"


// console.log("Tareas")
// for(let i = 1; i <= 14; i++){
//     if(i == 1){
//         console.groupCollapsed("Semana 1")
//     }
//     console.groupCollapsed(`Día ${i}`)
//     console.log(trabajo);
//     console.log(trabajosPracticos)
//     console.log(descanso)
//     console.log(estudio)
//     console.log(homeWork)
//     console.groupEnd()
//     if(i == 7){
//         console.groupEnd()
//         console.groupCollapsed("Semana 2")
//     }
// }