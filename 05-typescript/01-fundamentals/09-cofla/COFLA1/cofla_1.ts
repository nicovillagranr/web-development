// ============================================================================
// COFLA 1 — TypeScript
// ============================================================================
// TS IMPORTANTE: prompt() devuelve string | null.
// En modo strict debemos manejar el null antes de usar el valor.
// Esto es una de las primeras diferencias prácticas que TS hace visible.

// --------------------
// Problema A — Heladería
// --------------------

const definirCompra = (nombre: string): string => {
  const input: string | null = prompt(`Monto que tiene ${nombre}`);
  if (input === null) return `${nombre}: Canceló la consulta<br>`;

  const dinero: number = parseFloat(input);
  if (isNaN(dinero)) return `${nombre}: Valor inválido<br>`;

  if (dinero >= 0.6 && dinero < 1) return `${nombre}: Helado de agua<br>`;
  if (dinero >= 1 && dinero < 1.6) return `${nombre}: Helado de crema<br>`;
  if (dinero >= 1.6 && dinero < 1.7) return `${nombre}: Helado de Heladix<br>`;
  if (dinero >= 1.7 && dinero < 1.8) return `${nombre}: Helado de Heladovich<br>`;
  if (dinero >= 1.8 && dinero < 2.9) return `${nombre}: Helado de Helardo<br>`;
  if (dinero >= 2.9) return `${nombre}: Helado de confites o pote de 1/4 Kg<br>`;
  return `${nombre}: No te alcanza para ningún helado<br>`;
};

document.writeln(definirCompra("Roberto"));
document.writeln(definirCompra("Pedro"));
document.writeln(definirCompra("Cofla"));

// --------------------
// Problema B — Boletos de lotería
// --------------------

function compra(dinero: number, precio: number): void {
  const cantidad: number = Math.floor(dinero / precio);
  const vuelto: number = dinero % precio;

  if (cantidad === 0) {
    document.writeln("No puedes comprar ni un Kino<br>");
  } else if (cantidad === 1) {
    document.writeln("Compraste 1 Kino<br>");
  } else if (cantidad === 2) {
    document.writeln("Compraste 2 Kinos<br>");
  } else if (cantidad >= 3) {
    document.writeln(`Compraste 3 Kinos y te quedó un vuelto de ${vuelto} pesos.<br>`);
  }
}

compra(3000, 1000);

// --------------------
// Problema C — Detector de mentiras
// --------------------

type Respuesta = "miente" | "verdad" | string; // literal union + fallback

function detector(respuesta: Respuesta, nombre: string): void {
  if (respuesta === "miente") {
    console.log(`${nombre} recibe una descarga eléctrica ⚡`);
  } else if (respuesta === "verdad") {
    console.log(`${nombre} no recibe castigo`);
  } else {
    console.log("La máquina no entiende, la pregunta debe ser más clara");
  }
}

detector("miente", "Sospechoso 1");
detector("verdad", "Sospechoso 2");
detector("dudoso", "Sospechoso 3");
