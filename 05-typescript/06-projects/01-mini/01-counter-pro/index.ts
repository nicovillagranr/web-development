// 01 — Counter Pro
// TS: variables con tipos explícitos; Number() convierte string a number.

const value = document.querySelector<HTMLSpanElement>("#value")!;
const inc = document.querySelector<HTMLButtonElement>("#inc")!;
const dec = document.querySelector<HTMLButtonElement>("#dec")!;
const reset = document.querySelector<HTMLButtonElement>("#reset")!;
const step = document.querySelector<HTMLInputElement>("#step")!;

let count: number = 0;

function update(): void {
  value.textContent = String(count); // textContent es string, no number
}

inc.addEventListener("click", (): void => {
  count += Number(step.value || 1);
  update();
});

dec.addEventListener("click", (): void => {
  count -= Number(step.value || 1);
  update();
});

reset.addEventListener("click", (): void => {
  count = 0;
  update();
});
