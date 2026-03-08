const questionEl = document.querySelector('#question');
const answersEl = document.querySelector('#answers');
const restart = document.querySelector('#restart');

const quiz = [
  { q: 'Que metodo convierte JSON a objeto?', options: ['JSON.parse', 'JSON.stringify', 'Object.toJSON'], ok: 0 },
  { q: 'Que evento se dispara al escribir en un input?', options: ['submit', 'input', 'load'], ok: 1 },
  { q: 'Cual no es tipo primitivo?', options: ['string', 'number', 'array'], ok: 2 }
];

let index = 0;
let score = 0;

function render() {
  if (index >= quiz.length) {
    questionEl.textContent = `Juego terminado. Puntaje: ${score}/${quiz.length}`;
    answersEl.innerHTML = '';
    return;
  }

  const current = quiz[index];
  questionEl.textContent = current.q;
  answersEl.innerHTML = '';

  current.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => {
      if (i === current.ok) score += 1;
      index += 1;
      render();
    });
    answersEl.appendChild(button);
  });
}

restart.addEventListener('click', () => {
  index = 0;
  score = 0;
  render();
});

render();
