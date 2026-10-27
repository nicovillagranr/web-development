// Se crea una vez y se reutiliza: construir un Intl.NumberFormat por tarjeta y por
// render es caro para lo que hace.
const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function formatClp(amount: number): string {
  return clp.format(amount);
}
