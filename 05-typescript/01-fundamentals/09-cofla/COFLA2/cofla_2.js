// ============================================================================
// COFLA 2 — TypeScript
// ============================================================================
// --------------------
// Problema A — Entrada a la discoteca
// --------------------
function entradaDisco(edad, hora) {
    if (edad >= 18 && hora >= 3) {
        return `Tienes ${edad}, puedes pasar.<br>
    Además son las ${hora}:00 AM, pasas gratis.`;
    }
    else if (edad >= 18 && hora >= 0 && hora <= 2) {
        return `Tienes ${edad}, puedes pasar.<br>
    Pero son las ${hora}:00 AM, tienes que pagar.`;
    }
    else {
        return `Tienes ${edad}, eres menor de edad.`;
    }
}
// TS: prompt() → string | null; Number() de null devuelve 0
const edadInput = prompt("Dime tu edad para entrar a la Disco");
const horaInput = prompt("¿A qué hora entraste?");
if (edadInput !== null && horaInput !== null) {
    const edad = Number(edadInput);
    const hora = Number(horaInput);
    document.writeln(entradaDisco(edad, hora));
}
const cantidadInput = prompt("¿Cuántos alumnos son?");
if (cantidadInput !== null) {
    const cantidad = parseInt(cantidadInput, 10);
    const alumnosTotales = [];
    for (let i = 0; i < cantidad; i++) {
        const nombreAlumno = prompt(`Nombre del alumno ${i + 1}`);
        if (nombreAlumno !== null) {
            alumnosTotales.push({ nombre: nombreAlumno, presentes: 0 });
        }
    }
    function tomarAsistencia(alumno) {
        const presencia = prompt(`¿${alumno.nombre} está presente? (P/A)`);
        if (presencia !== null && presencia.toLowerCase() === "p") {
            alumno.presentes++;
        }
    }
    for (let dia = 0; dia < 30; dia++) {
        for (const alumno of alumnosTotales) {
            tomarAsistencia(alumno);
        }
    }
    for (const alumno of alumnosTotales) {
        const ausencias = 30 - alumno.presentes;
        let resultado = `${alumno.nombre}:<br>
    _______Presente: ${alumno.presentes}<br>
    _______Ausencias: ${ausencias}<br>`;
        if (ausencias > 3) {
            resultado += "Reprobado por inasistencias<br>";
        }
        document.writeln(resultado);
    }
}
const calculadora = (n1, operador, n2) => {
    let resultado;
    if (operador === "+")
        resultado = n1 + n2;
    else if (operador === "-")
        resultado = n1 - n2;
    else if (operador === "*")
        resultado = n1 * n2;
    else if (operador === "/")
        resultado = n1 / n2;
    else {
        if (n2 === 0) {
            document.writeln("No se puede dividir por 0");
            return;
        }
        resultado = n1 % n2;
    }
    document.writeln(`El resultado de tu operación es: ${resultado}`);
};
const n1Input = prompt("Ingresa el primer número");
const opInput = prompt("Ingresa el operador (+, -, *, /, %)");
const n2Input = prompt("Ingresa el segundo número");
if (n1Input !== null && opInput !== null && n2Input !== null) {
    const n1 = Number(n1Input);
    const n2 = Number(n2Input);
    const operadoresValidos = ["+", "-", "*", "/", "%"];
    if (operadoresValidos.includes(opInput)) {
        calculadora(n1, opInput, n2);
    }
    else {
        document.writeln("Operador no válido");
    }
}
export {};
//# sourceMappingURL=cofla_2.js.map