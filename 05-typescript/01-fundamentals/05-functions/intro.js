// ============================================================================
// FUNCIONES EN TYPESCRIPT
// ============================================================================
// TS: las funciones tienen tipos para sus parámetros y para el valor de retorno.
// Esto hace explícito el "contrato" de cada función.
// ---------------------------
// 1. Funciones básicas con tipo de retorno
// ---------------------------
function saludar() {
    // void = no retorna ningún valor
    document.writeln("¡Hola desde la función!<br>");
}
saludar();
// ---------------------------
// 2. Parámetros tipados
// ---------------------------
function saludarPersona(nombre) {
    const mensaje = `Hola ${nombre}, ¿cómo estás?<br>`;
    document.writeln(mensaje);
}
saludarPersona("Javier");
saludarPersona("Carito");
// ---------------------------
// 3. Parámetros y retorno tipado
// ---------------------------
function sumar(n1, n2) {
    const resultado = n1 + n2;
    return resultado;
}
const suma1 = sumar(50, 70);
const suma2 = sumar(10, 30);
document.writeln("50 + 70 = " + suma1 + "<br>");
document.writeln("10 + 30 = " + suma2 + "<br><br>");
// ---------------------------
// 4. Funciones con prompt — TypeScript fuerza el manejo de null
// prompt() devuelve string | null, no solo string
// ---------------------------
// TS en modo strict: esto daría error — 'edad' puede ser null
// let edad = prompt("Ingresa tu edad");
// document.writeln("Tienes " + edad + " años.");
// La forma correcta con TypeScript:
const edadInput = prompt("Ingresa tu edad");
if (edadInput !== null) {
    const edad = parseInt(edadInput, 10);
    if (!isNaN(edad)) {
        document.writeln(`Tienes ${edad} años.<br><br>`);
    }
}
// ---------------------------
// 5. Función que retorna string — control de flujo tipado
// ---------------------------
function evaluarNumero(num) {
    if (num > 0)
        return "El número es positivo";
    if (num < 0)
        return "El número es negativo";
    return "El número es cero";
}
const numeroInput = prompt("Ingresa un número");
if (numeroInput !== null) {
    const num = parseFloat(numeroInput);
    document.writeln(evaluarNumero(num) + "<br>");
}
// ---------------------------
// 6. Arrow functions tipadas
// ---------------------------
const multiplicar = (a, b) => a * b;
console.log("3 × 4 =", multiplicar(3, 4));
// ---------------------------
// 7. Parámetros opcionales y por defecto
// ---------------------------
// Parámetro opcional con '?'
function crearSaludo(nombre, titulo) {
    return titulo ? `Hola ${titulo} ${nombre}` : `Hola ${nombre}`;
}
console.log(crearSaludo("Nico")); // "Hola Nico"
console.log(crearSaludo("Nico", "Dr.")); // "Hola Dr. Nico"
// Parámetro con valor por defecto
function incrementar(valor, paso = 1) {
    return valor + paso;
}
console.log(incrementar(5)); // 6
console.log(incrementar(5, 3)); // 8
// ---------------------------
// 8. Rest parameters — múltiples argumentos del mismo tipo
// ---------------------------
function sumarTodos(...numeros) {
    return numeros.reduce((total, n) => total + n, 0);
}
console.log("Suma total:", sumarTodos(1, 2, 3, 4, 5)); // 15
export {};
//# sourceMappingURL=intro.js.map