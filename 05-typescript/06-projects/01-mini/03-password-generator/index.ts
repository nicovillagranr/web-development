// 03 — Password Generator
// TS: HTMLInputElement para checkboxes (.checked) y text inputs (.value).

const len = document.querySelector<HTMLInputElement>("#len")!;
const upper = document.querySelector<HTMLInputElement>("#upper")!;
const numbers = document.querySelector<HTMLInputElement>("#numbers")!;
const symbols = document.querySelector<HTMLInputElement>("#symbols")!;
const result = document.querySelector<HTMLInputElement>("#result")!;
const generate = document.querySelector<HTMLButtonElement>("#generate")!;

const lowerChars: string = "abcdefghijklmnopqrstuvwxyz";
const upperChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars: string = "0123456789";
const symbolChars: string = "!@#$%^&*()_+-=[]{}";

generate.addEventListener("click", (): void => {
  let pool: string = lowerChars;
  if (upper.checked) pool += upperChars;    // .checked es boolean (HTMLInputElement)
  if (numbers.checked) pool += numberChars;
  if (symbols.checked) pool += symbolChars;

  const size: number = Math.max(6, Math.min(32, Number(len.value || 12)));
  let pwd: string = "";
  for (let i: number = 0; i < size; i++) {
    pwd += pool[Math.floor(Math.random() * pool.length)];
  }
  result.value = pwd;
});
