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

const chileanMobile = /^56(9)(\d{4})(\d{4})$/;

// "56912345678" → "+56 9 1234 5678". Cualquier otro formato se muestra tal cual con
// el "+": mejor un número sin espacios que uno partido por el lugar equivocado.
export function formatPhone(digits: string): string {
  return chileanMobile.test(digits) ? digits.replace(chileanMobile, "+56 $1 $2 $3") : `+${digits}`;
}
