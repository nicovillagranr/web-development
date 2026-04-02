// ============================================================================
// COFLA 9 — Calificaciones finales
// ============================================================================
// TS: los inputs del DOM son string; debemos convertir a number para operar.
// querySelector<HTMLInputElement> nos da acceso tipado a .value

interface NotasAlumno {
  parcial1: number;
  parcial2: number;
  trabajos: number;
}

const inputParcial1 = document.querySelector<HTMLInputElement>("#parcial1")!;
const inputParcial2 = document.querySelector<HTMLInputElement>("#parcial2")!;
const inputTrabajos = document.querySelector<HTMLInputElement>("#trabajos")!;
const btnCalcular = document.querySelector<HTMLButtonElement>("#calcular")!;
const resultado = document.querySelector<HTMLElement>("#resultado")!;

function calcularPromedio(notas: NotasAlumno): number {
  // Promedio ponderado: parciales valen 40% cada uno, trabajos 20%
  return notas.parcial1 * 0.4 + notas.parcial2 * 0.4 + notas.trabajos * 0.2;
}

function validarNota(valor: string): number | null {
  const num: number = parseFloat(valor);
  if (isNaN(num) || num < 0 || num > 10) return null;
  return num;
}

btnCalcular.addEventListener("click", (): void => {
  const parcial1: number | null = validarNota(inputParcial1.value);
  const parcial2: number | null = validarNota(inputParcial2.value);
  const trabajos: number | null = validarNota(inputTrabajos.value);

  if (parcial1 === null || parcial2 === null || trabajos === null) {
    resultado.textContent = "Error: ingresa notas válidas (0-10)";
    resultado.style.color = "red";
    return;
  }

  const notas: NotasAlumno = { parcial1, parcial2, trabajos };
  const promedio: number = calcularPromedio(notas);

  if (promedio >= 7) {
    resultado.textContent = `Promedio: ${promedio.toFixed(2)} — ✅ Aprobado`;
    resultado.style.color = "green";
  } else {
    resultado.textContent = `Promedio: ${promedio.toFixed(2)} — ❌ Desaprobado`;
    resultado.style.color = "red";
  }
});
