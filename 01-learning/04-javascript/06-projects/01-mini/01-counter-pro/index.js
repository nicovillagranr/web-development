const value = document.querySelector('#value');
const inc = document.querySelector('#inc');
const dec = document.querySelector('#dec');
const reset = document.querySelector('#reset');
const step = document.querySelector('#step');
let count = 0;

function update() { value.textContent = count; }

inc.addEventListener('click', () => { count += Number(step.value || 1); update(); });
dec.addEventListener('click', () => { count -= Number(step.value || 1); update(); });
reset.addEventListener('click', () => { count = 0; update(); });
