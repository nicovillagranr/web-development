// 05 — Quiz Game
// TS: interfaz QuizItem para estructurar cada pregunta del quiz.

const questionEl = document.querySelector<HTMLHeadingElement>("#question")!;
const answersEl = document.querySelector<HTMLDivElement>("#answers")!;
const restartBtn = document.querySelector<HTMLButtonElement>("#restart")!;

interface QuizItem {
  q: string;
  options: string[];
  ok: number; // índice de la respuesta correcta
}

const quiz: QuizItem[] = [
  {
    q: "¿Qué método convierte JSON a objeto?",
    options: ["JSON.parse", "JSON.stringify", "Object.toJSON"],
    ok: 0,
  },
  {
    q: "¿Qué evento se dispara al escribir en un input?",
    options: ["submit", "input", "load"],
    ok: 1,
  },
  {
    q: "¿Cuál NO es tipo primitivo en JavaScript?",
    options: ["string", "number", "array"],
    ok: 2,
  },
];

let index: number = 0;
let score: number = 0;

function render(): void {
  if (index >= quiz.length) {
    questionEl.textContent = `Juego terminado. Puntaje: ${score}/${quiz.length}`;
    answersEl.innerHTML = "";
    return;
  }

  const current: QuizItem = quiz[index];
  questionEl.textContent = current.q;
  answersEl.innerHTML = "";

  current.options.forEach((option: string, i: number): void => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", (): void => {
      if (i === current.ok) score += 1;
      index += 1;
      render();
    });
    answersEl.appendChild(button);
  });
}

restartBtn.addEventListener("click", (): void => {
  index = 0;
  score = 0;
  render();
});

render();
