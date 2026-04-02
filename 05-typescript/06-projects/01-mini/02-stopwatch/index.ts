// 02 — Stopwatch
// TS: ReturnType<typeof setInterval> para el tipo del timer.

const timeEl = document.querySelector<HTMLSpanElement>("#time")!;
const start = document.querySelector<HTMLButtonElement>("#start")!;
const stop = document.querySelector<HTMLButtonElement>("#stop")!;
const lap = document.querySelector<HTMLButtonElement>("#lap")!;
const reset = document.querySelector<HTMLButtonElement>("#reset")!;
const laps = document.querySelector<HTMLUListElement>("#laps")!;

// ReturnType<typeof setInterval> es el tipo correcto para el ID del intervalo
let timer: ReturnType<typeof setInterval> | null = null;
let elapsed: number = 0;

function format(ms: number): string {
  const totalSeconds: number = Math.floor(ms / 1000);
  const minutes: string = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds: string = String(totalSeconds % 60).padStart(2, "0");
  const tenths: number = Math.floor((ms % 1000) / 100);
  return `${minutes}:${seconds}.${tenths}`;
}

function render(): void {
  timeEl.textContent = format(elapsed);
}

start.addEventListener("click", (): void => {
  if (timer !== null) return; // ya está corriendo
  const begin: number = Date.now() - elapsed;
  timer = setInterval((): void => {
    elapsed = Date.now() - begin;
    render();
  }, 100);
});

stop.addEventListener("click", (): void => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
});

lap.addEventListener("click", (): void => {
  const li = document.createElement("li");
  li.className = "item";
  li.textContent = format(elapsed);
  laps.prepend(li);
});

reset.addEventListener("click", (): void => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  elapsed = 0;
  laps.innerHTML = "";
  render();
});
