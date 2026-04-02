// ============================================================================
// COFLA 5 — TypeScript
// ============================================================================
const materias = {
    fisica: { asistencia: 90, promedio: 6, trabajos: 3, nombre: "Fisica" },
    matematica: { asistencia: 84, promedio: 8, trabajos: 2, nombre: "Matematica" },
    logica: { asistencia: 92, promedio: 8, trabajos: 4, nombre: "Logica" },
    quimica: { asistencia: 96, promedio: 6, trabajos: 3, nombre: "Quimica" },
    calculo: { asistencia: 91, promedio: 6, trabajos: 3, nombre: "Calculo" },
    programacion: { asistencia: 79, promedio: 6, trabajos: 3, nombre: "Programacion" },
    biologia: { asistencia: 75, promedio: 6, trabajos: 3, nombre: "Biologia" },
    baseDatos: { asistencia: 98, promedio: 9, trabajos: 2, nombre: "Base de Datos" },
    algebra: { asistencia: 100, promedio: 9, trabajos: 4, nombre: "Algebra" },
    diseño: { asistencia: 95, promedio: 10, trabajos: 4, nombre: "Diseño" },
};
// TS: 'materia' se infiere como DatosMateria gracias al tipo de Record
function aprobar() {
    for (const key in materias) {
        const materia = materias[key];
        console.log(materia.nombre);
        if (materia.asistencia >= 90) {
            console.log("%cAsistencias en orden", "color: green;");
        }
        else {
            console.log("%cFalta de asistencias", "color: red;");
        }
        if (materia.promedio >= 7) {
            console.log("%cPromedio en orden", "color: green;");
        }
        else {
            console.log("%cPromedio desaprobado", "color: red;");
        }
        if (materia.trabajos >= 3) {
            console.log("%cTrabajos prácticos en orden", "color: green");
        }
        else {
            console.log("%cTrabajos prácticos insuficientes", "color: red;");
        }
    }
}
aprobar();
// --------------------
// Problema B — Organización semanal
// --------------------
const trabajo = "240 Minutos de trabajo";
const trabajosPracticos = "100 Minutos de trabajos practicos";
const descanso = "10 Minutos de descanso";
const estudio = "100 Minutos de estudio";
const homeWork = "30 Minutos de cosas para la casa";
console.log("Tareas");
for (let i = 1; i <= 14; i++) {
    if (i === 1) {
        console.groupCollapsed("Semana 1");
    }
    console.groupCollapsed(`Día ${i}`);
    console.log(trabajo);
    console.log(trabajosPracticos);
    console.log(descanso);
    console.log(estudio);
    console.log(homeWork);
    console.groupEnd();
    if (i === 7) {
        console.groupEnd();
        console.groupCollapsed("Semana 2");
    }
}
export {};
//# sourceMappingURL=index.js.map