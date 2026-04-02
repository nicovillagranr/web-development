// 02 — Budget Tracker
// TS: literal union type para el tipo de transacción; interfaz Transaction.

const desc = document.querySelector<HTMLInputElement>("#desc")!;
const amount = document.querySelector<HTMLInputElement>("#amount")!;
const type = document.querySelector<HTMLSelectElement>("#type")!;
const add = document.querySelector<HTMLButtonElement>("#add")!;
const movements = document.querySelector<HTMLUListElement>("#movements")!;
const incomeEl = document.querySelector<HTMLSpanElement>("#income")!;
const expenseEl = document.querySelector<HTMLSpanElement>("#expense")!;
const balanceEl = document.querySelector<HTMLSpanElement>("#balance")!;

// Literal union type — solo "income" o "expense" son válidos
type TransactionType = "income" | "expense";

interface Transaction {
  id: string;
  desc: string;
  amount: number;
  type: TransactionType;
}

let data: Transaction[] = JSON.parse(
  localStorage.getItem("budget-tracker") ?? "[]"
) as Transaction[];

function save(): void {
  localStorage.setItem("budget-tracker", JSON.stringify(data));
}

function totals(): void {
  const income: number = data
    .filter((item: Transaction) => item.type === "income")
    .reduce((sum: number, item: Transaction) => sum + item.amount, 0);

  const expense: number = data
    .filter((item: Transaction) => item.type === "expense")
    .reduce((sum: number, item: Transaction) => sum + item.amount, 0);

  incomeEl.textContent = `Ingresos: ${income}`;
  expenseEl.textContent = `Gastos: ${expense}`;
  balanceEl.textContent = `Saldo: ${income - expense}`;
}

function render(): void {
  movements.innerHTML = "";

  data.forEach((move: Transaction): void => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;">
        <span>${move.desc}</span>
        <strong>${move.type === "income" ? "+" : "-"}${move.amount}</strong>
      </div>
    `;
    movements.appendChild(li);
  });

  totals();
}

add.addEventListener("click", (): void => {
  const d: string = desc.value.trim();
  const a: number = Number(amount.value);
  if (!d || !a) return;

  // type.value es string; lo casteamos a TransactionType porque controlamos el select
  data.unshift({
    id: crypto.randomUUID(),
    desc: d,
    amount: a,
    type: type.value as TransactionType,
  });

  desc.value = "";
  amount.value = "";
  save();
  render();
});

render();
