// ============================================================================
// COFLA 4 — TypeScript
// ============================================================================

// --------------------
// Problema A — Calculadora extendida
// --------------------

type Operador = "+" | "-" | "*" | "/" | "%" | "^" | "sqrt" | "cbrt";

const calculadora = (n1: number, operador: Operador, n2: number = 0): string => {
  let resultado: number;

  switch (operador) {
    case "+": resultado = n1 + n2; break;
    case "-": resultado = n1 - n2; break;
    case "*": resultado = n1 * n2; break;
    case "/": resultado = n1 / n2; break;
    case "%":
      if (n2 === 0) return "No se puede dividir por 0";
      resultado = n1 % n2;
      break;
    case "^": resultado = Math.pow(n1, n2); break;
    case "sqrt":
      if (n1 < 0) return "No se puede sacar raíz cuadrada de un número negativo";
      resultado = Math.sqrt(n1);
      break;
    case "cbrt": resultado = Math.cbrt(n1); break;
  }

  return `El resultado de tu operación es: ${resultado}`;
};

const n1Input: string | null = prompt("Ingresa el primer número");
const opInput: string | null = prompt("Ingresa el operador (+, -, *, /, %, ^, sqrt, cbrt)");
const n2Input: string | null = prompt("Ingresa el segundo número");

if (n1Input !== null && opInput !== null && n2Input !== null) {
  const n1: number = Number(n1Input);
  const n2: number = Number(n2Input);
  const operadoresValidos: string[] = ["+", "-", "*", "/", "%", "^", "sqrt", "cbrt"];

  if (operadoresValidos.includes(opInput)) {
    console.log(calculadora(n1, opInput as Operador, n2));
  } else {
    console.log("Operador no válido");
  }
}

// --------------------
// Problema B — Materias y alumnos
// --------------------

interface Materia {
  nombre: string;
  profesor: string;
  alumnos: string[];
}

const materias: Materia[] = [
  { nombre: "Física", profesor: "Prof. García", alumnos: ["Cofla", "Ana", "Luis"] },
  { nombre: "Matemática", profesor: "Prof. López", alumnos: ["Cofla", "Pedro"] },
  { nombre: "Programación", profesor: "Prof. Dalto", alumnos: ["Cofla", "Marta", "Juan"] },
];

function infoMateria(nombreMateria: string): void {
  const materia: Materia | undefined = materias.find(
    (m) => m.nombre.toLowerCase() === nombreMateria.toLowerCase()
  );

  if (materia === undefined) {
    console.log(`Materia "${nombreMateria}" no encontrada`);
    return;
  }

  console.log(`Materia: ${materia.nombre}`);
  console.log(`Profesor: ${materia.profesor}`);
  console.log(`Alumnos: ${materia.alumnos.join(", ")}`);
}

function materiasDeAlumno(alumno: string): void {
  const encontradas: Materia[] = materias.filter((m) =>
    m.alumnos.includes(alumno)
  );
  console.log(`${alumno} está en ${encontradas.length} materia(s):`);
  for (const m of encontradas) {
    console.log(`  - ${m.nombre} (${m.profesor})`);
  }
}

infoMateria("Física");
materiasDeAlumno("Cofla");

// --------------------
// Clase Estudiante
// --------------------

class Estudiante {
  constructor(
    public nombre: string,
    public edad: number,
    public curso: string
  ) {}

  // TS: método con return type void
  verInfo(): void {
    document.writeln(
      `Nombre: ${this.nombre} | Edad: ${this.edad} | Curso: ${this.curso}.<br>`
    );
  }
}

const estudiantes: Estudiante[] = [
  new Estudiante("Nico", 25, "JavaScript"),
  new Estudiante("Javi", 22, "Python"),
  new Estudiante("Cami", 20, "HTML y CSS"),
  new Estudiante("Joaquin", 18, "Three JS"),
];

for (const alumno of estudiantes) {
  alumno.verInfo();
}

// --------------------
// Problema C — Inscripción a materias
// --------------------

interface MateriaConCupo {
  nombre: string;
  alumnos: string[];
  cupoMax: number;
}

const materiasConCupo: MateriaConCupo[] = [
  { nombre: "Física", alumnos: [], cupoMax: 20 },
  { nombre: "Programación", alumnos: [], cupoMax: 20 },
];

function inscribir(alumno: string, nombreMateria: string): void {
  const materia: MateriaConCupo | undefined = materiasConCupo.find(
    (m) => m.nombre === nombreMateria
  );

  if (materia === undefined) {
    console.log(`Materia "${nombreMateria}" no existe`);
    return;
  }

  if (materia.alumnos.length >= materia.cupoMax) {
    console.log(`No hay cupo en ${nombreMateria}`);
  } else {
    materia.alumnos.push(alumno);
    console.log(`${alumno} inscripto en ${nombreMateria}`);
  }
}

inscribir("Cofla", "Física");
inscribir("Cofla", "Programación");
