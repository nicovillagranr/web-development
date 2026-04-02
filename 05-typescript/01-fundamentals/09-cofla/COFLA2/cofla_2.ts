// ============================================================================
// COFLA 2 — TypeScript
// ============================================================================

// --------------------
// Problema A — Entrada a la discoteca
// --------------------

function entradaDisco(edad: number, hora: number): string {
  if (edad >= 18 && hora >= 3) {
    return `Tienes ${edad}, puedes pasar.<br>
    Además son las ${hora}:00 AM, pasas gratis.`;
  } else if (edad >= 18 && hora >= 0 && hora <= 2) {
    return `Tienes ${edad}, puedes pasar.<br>
    Pero son las ${hora}:00 AM, tienes que pagar.`;
  } else {
    return `Tienes ${edad}, eres menor de edad.`;
  }
}

// TS: prompt() → string | null; Number() de null devuelve 0
const edadInput: string | null = prompt("Dime tu edad para entrar a la Disco");
const horaInput: string | null = prompt("¿A qué hora entraste?");

if (edadInput !== null && horaInput !== null) {
  const edad: number = Number(edadInput);
  const hora: number = Number(horaInput);
  document.writeln(entradaDisco(edad, hora));
}

// --------------------
// Problema B — Registro de asistencia
// --------------------

interface Alumno {
  nombre: string;
  presentes: number;
}

const cantidadInput: string | null = prompt("¿Cuántos alumnos son?");
if (cantidadInput !== null) {
  const cantidad: number = parseInt(cantidadInput, 10);
  const alumnosTotales: Alumno[] = [];

  for (let i: number = 0; i < cantidad; i++) {
    const nombreAlumno: string | null = prompt(`Nombre del alumno ${i + 1}`);
    if (nombreAlumno !== null) {
      alumnosTotales.push({ nombre: nombreAlumno, presentes: 0 });
    }
  }

  function tomarAsistencia(alumno: Alumno): void {
    const presencia: string | null = prompt(`¿${alumno.nombre} está presente? (P/A)`);
    if (presencia !== null && presencia.toLowerCase() === "p") {
      alumno.presentes++;
    }
  }

  for (let dia: number = 0; dia < 30; dia++) {
    for (const alumno of alumnosTotales) {
      tomarAsistencia(alumno);
    }
  }

  for (const alumno of alumnosTotales) {
    const ausencias: number = 30 - alumno.presentes;
    let resultado: string = `${alumno.nombre}:<br>
    _______Presente: ${alumno.presentes}<br>
    _______Ausencias: ${ausencias}<br>`;

    if (ausencias > 3) {
      resultado += "Reprobado por inasistencias<br>";
    }
    document.writeln(resultado);
  }
}

// --------------------
// Calculadora
// --------------------

type Operador = "+" | "-" | "*" | "/" | "%";

const calculadora = (n1: number, operador: Operador, n2: number): void => {
  let resultado: number;

  if (operador === "+") resultado = n1 + n2;
  else if (operador === "-") resultado = n1 - n2;
  else if (operador === "*") resultado = n1 * n2;
  else if (operador === "/") resultado = n1 / n2;
  else {
    if (n2 === 0) {
      document.writeln("No se puede dividir por 0");
      return;
    }
    resultado = n1 % n2;
  }

  document.writeln(`El resultado de tu operación es: ${resultado}`);
};

const n1Input: string | null = prompt("Ingresa el primer número");
const opInput: string | null = prompt("Ingresa el operador (+, -, *, /, %)");
const n2Input: string | null = prompt("Ingresa el segundo número");

if (n1Input !== null && opInput !== null && n2Input !== null) {
  const n1: number = Number(n1Input);
  const n2: number = Number(n2Input);
  const operadoresValidos: Operador[] = ["+", "-", "*", "/", "%"];

  if (operadoresValidos.includes(opInput as Operador)) {
    calculadora(n1, opInput as Operador, n2);
  } else {
    document.writeln("Operador no válido");
  }
}
