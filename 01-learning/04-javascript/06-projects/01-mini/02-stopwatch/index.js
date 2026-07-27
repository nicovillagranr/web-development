const timeEl = document.querySelector('#time');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const lap = document.querySelector('#lap');
const reset = document.querySelector('#reset');
const laps = document.querySelector('#laps');

let timer = null;
let elapsed = 0;

function format(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const tenths = Math.floor((ms % 1000) / 100);
  return `${minutes}:${seconds}.${tenths}`;
}

function render() {
  timeEl.textContent = format(elapsed);
}

start.addEventListener('click', () => {
  if (timer) return;
  const begin = Date.now() - elapsed;
  timer = setInterval(() => {
    elapsed = Date.now() - begin;
    render();
  }, 100);
});

stop.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
});

lap.addEventListener('click', () => {
  const li = document.createElement('li');
  li.className = 'item';
  li.textContent = format(elapsed);
  laps.prepend(li);
});

reset.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  elapsed = 0;
  laps.innerHTML = '';
  render();
});
