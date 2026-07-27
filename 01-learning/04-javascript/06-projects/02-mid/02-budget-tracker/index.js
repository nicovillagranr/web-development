const desc = document.querySelector('#desc');
const amount = document.querySelector('#amount');
const type = document.querySelector('#type');
const add = document.querySelector('#add');
const movements = document.querySelector('#movements');
const incomeEl = document.querySelector('#income');
const expenseEl = document.querySelector('#expense');
const balanceEl = document.querySelector('#balance');

let data = JSON.parse(localStorage.getItem('budget-tracker')) || [];

function save() {
  localStorage.setItem('budget-tracker', JSON.stringify(data));
}

function totals() {
  const income = data.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  const expense = data.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  incomeEl.textContent = `Ingresos: ${income}`;
  expenseEl.textContent = `Gastos: ${expense}`;
  balanceEl.textContent = `Saldo: ${income - expense}`;
}

function render() {
  movements.innerHTML = '';

  data.forEach((move) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;">
        <span>${move.desc}</span>
        <strong>${move.type === 'income' ? '+' : '-'}${move.amount}</strong>
      </div>
    `;
    movements.appendChild(li);
  });

  totals();
}

add.addEventListener('click', () => {
  const d = desc.value.trim();
  const a = Number(amount.value);
  if (!d || !a) return;

  data.unshift({ id: crypto.randomUUID(), desc: d, amount: a, type: type.value });
  desc.value = '';
  amount.value = '';
  save();
  render();
});

render();
