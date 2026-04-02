// 01 — Dynamic Cards
// TS: querySelector<T> especifica el tipo exacto del elemento.
// Esto da acceso a .value (HTMLInputElement), .prepend(), etc.

const text = document.querySelector<HTMLInputElement>("#text")!;
const add = document.querySelector<HTMLButtonElement>("#add")!;
const list = document.querySelector<HTMLUListElement>("#list")!;

add.addEventListener("click", (): void => {
  const value: string = text.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `
    <div class="row" style="justify-content:space-between;align-items:center;">
      <span>${value}</span>
      <button class="danger" data-remove="1">Eliminar</button>
    </div>
  `;

  list.prepend(li);
  text.value = "";
});

list.addEventListener("click", (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  if (target.matches("button[data-remove]")) {
    // optional chaining (?.) evita error si closest devuelve null
    target.closest("li")?.remove();
  }
});
