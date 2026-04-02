// 🧮 3. Analizador de cálculos
// Enunciado:
// Crea una función calcularOperaciones() que realice operaciones matemáticas (suma, resta, potencia, raíz).
// Usa console.log() para mostrar cada resultado.
// Usa console.group() para agrupar operaciones por tipo.
// Si una operación produce NaN, muéstrala con console.error().

// TS: literal union type para los operadores válidos
type Operacion = "+" | "-" | "**" | "sqrt" | "cbrt";

function calcularOperaciones(
  operador1: number,
  operacion: Operacion,
  operador2: number = 0
): void {
  console.group(`Operacion: ${operacion}`);

  let resultado: number;

  switch (operacion) {
    case "+":
      resultado = operador1 + operador2;
      break;
    case "-":
      resultado = operador1 - operador2;
      break;
    case "**":
      resultado = operador1 ** operador2;
      break;
    case "sqrt":
      resultado = Math.sqrt(operador1);
      break;
    case "cbrt":
      resultado = Math.cbrt(operador1);
      break;
  }

  if (isNaN(resultado)) {
    console.error(`Resultado inválido (NaN) para: ${operador1} ${operacion} ${operador2}`);
  } else {
    console.log(`Resultado: ${resultado}`);
  }

  console.groupEnd();
}

// Ejemplos
calcularOperaciones(10, "+", 5);
calcularOperaciones(10, "-", 3);
calcularOperaciones(2, "**", 8);
calcularOperaciones(144, "sqrt");
calcularOperaciones(27, "cbrt");
calcularOperaciones(-4, "sqrt"); // NaN — raíz cuadrada de negativo
