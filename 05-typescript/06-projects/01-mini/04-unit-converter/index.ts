// 04 — Unit Converter
// TS: HTMLSelectElement para el dropdown; literal union type para las conversiones.

const valueEl = document.querySelector<HTMLInputElement>("#value")!;
const typeEl = document.querySelector<HTMLSelectElement>("#type")!;
const convert = document.querySelector<HTMLButtonElement>("#convert")!;
const output = document.querySelector<HTMLParagraphElement>("#output")!;

type ConversionType = "km-mi" | "c-f" | "kg-lb";

interface ConversionResult {
  value: number;
  label: string;
}

function convertValue(amount: number, type: ConversionType): ConversionResult {
  switch (type) {
    case "km-mi":
      return { value: amount * 0.621371, label: "mi" };
    case "c-f":
      return { value: amount * 1.8 + 32, label: "°F" };
    case "kg-lb":
      return { value: amount * 2.20462, label: "lb" };
  }
}

convert.addEventListener("click", (): void => {
  const amount: number = Number(valueEl.value);
  if (Number.isNaN(amount)) return;

  const type: ConversionType = typeEl.value as ConversionType;
  const { value, label }: ConversionResult = convertValue(amount, type);

  output.textContent = `Resultado: ${value.toFixed(2)} ${label}`;
});
