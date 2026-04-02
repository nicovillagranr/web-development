// 01 — Dynamic Cards
// TS: querySelector<T> especifica el tipo exacto del elemento.
// Esto da acceso a .value (HTMLInputElement), .prepend(), etc.
const text = document.querySelector("#text");
const add = document.querySelector("#add");
const list = document.querySelector("#list");
add.addEventListener("click", () => {
    const value = text.value.trim();
    if (!value)
        return;
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
list.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches("button[data-remove]")) {
        // optional chaining (?.) evita error si closest devuelve null
        target.closest("li")?.remove();
    }
});
export {};
//# sourceMappingURL=index.js.map