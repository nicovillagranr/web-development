const valueEl = document.querySelector('#value');
const typeEl = document.querySelector('#type');
const convert = document.querySelector('#convert');
const output = document.querySelector('#output');

convert.addEventListener('click', () => {
  const value = Number(valueEl.value);
  if (Number.isNaN(value)) return;

  let result = 0;
  let label = '';

  if (typeEl.value === 'km-mi') {
    result = value * 0.621371;
    label = 'mi';
  } else if (typeEl.value === 'c-f') {
    result = value * 1.8 + 32;
    label = 'F';
  } else {
    result = value * 2.20462;
    label = 'lb';
  }

  output.textContent = `Resultado: ${result.toFixed(2)} ${label}`;
});
