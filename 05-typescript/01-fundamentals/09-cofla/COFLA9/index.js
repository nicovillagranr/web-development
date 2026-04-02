// ============================================================================
// COFLA 9 — Calificaciones finales
// ============================================================================
// TS: los inputs del DOM son string; debemos convertir a number para operar.
// querySelector<HTMLInputElement> nos da acceso tipado a .value
const inputParcial1 = document.querySelector("#parcial1");
const inputParcial2 = document.querySelector("#parcial2");
const inputTrabajos = document.querySelector("#trabajos");
const btnCalcular = document.querySelector("#calcular");
const resultado = document.querySelector("#resultado");
function calcularPromedio(notas) {
    // Promedio ponderado: parciales valen 40% cada uno, trabajos 20%
    return notas.parcial1 * 0.4 + notas.parcial2 * 0.4 + notas.trabajos * 0.2;
}
function validarNota(valor) {
    const num = parseFloat(valor);
    if (isNaN(num) || num < 0 || num > 10)
        return null;
    return num;
}
btnCalcular.addEventListener("click", () => {
    const parcial1 = validarNota(inputParcial1.value);
    const parcial2 = validarNota(inputParcial2.value);
    const trabajos = validarNota(inputTrabajos.value);
    if (parcial1 === null || parcial2 === null || trabajos === null) {
        resultado.textContent = "Error: ingresa notas válidas (0-10)";
        resultado.style.color = "red";
        return;
    }
    const notas = { parcial1, parcial2, trabajos };
    const promedio = calcularPromedio(notas);
    if (promedio >= 7) {
        resultado.textContent = `Promedio: ${promedio.toFixed(2)} — ✅ Aprobado`;
        resultado.style.color = "green";
    }
    else {
        resultado.textContent = `Promedio: ${promedio.toFixed(2)} — ❌ Desaprobado`;
        resultado.style.color = "red";
    }
});
export {};
//# sourceMappingURL=index.js.map