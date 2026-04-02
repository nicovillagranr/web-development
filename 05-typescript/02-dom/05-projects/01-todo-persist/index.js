// 01 — Todo List con persistencia (localStorage)
// TS: interfaz Task para tipar el estado; localStorage tipado con generics.
const todoInput = document.querySelector("#todoInput");
const todoAdd = document.querySelector("#todoAdd");
const todoList = document.querySelector("#todoList");
// JSON.parse devuelve 'any'; lo casteamos a Task[]
// El operador '??' (nullish coalescing) maneja el caso localStorage vacío
let tasks = JSON.parse(localStorage.getItem("todo-persist") ?? "[]");
function save() {
    localStorage.setItem("todo-persist", JSON.stringify(tasks));
}
function render() {
    todoList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:center;">
        <label>
          <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
          <span style="${task.done ? "text-decoration:line-through;color:#6b7280;" : ""}">${task.text}</span>
        </label>
        <button class="danger" data-remove="${task.id}">Eliminar</button>
      </div>
    `;
        todoList.appendChild(li);
    });
}
function addTask() {
    const text = todoInput.value.trim();
    if (!text)
        return;
    tasks.unshift({ id: crypto.randomUUID(), text, done: false });
    todoInput.value = "";
    save();
    render();
}
todoAdd.addEventListener("click", addTask);
// Checkbox: marcar/desmarcar tarea
todoList.addEventListener("change", (event) => {
    const target = event.target;
    const id = target.dataset["id"];
    if (!id)
        return;
    tasks = tasks.map((task) => {
        if (task.id !== id)
            return task;
        return { ...task, done: target.checked };
    });
    save();
    render();
});
// Botón eliminar — delegación de eventos
todoList.addEventListener("click", (event) => {
    const target = event.target;
    const id = target.dataset["remove"];
    if (!id)
        return;
    tasks = tasks.filter((task) => task.id !== id);
    save();
    render();
});
render();
export {};
//# sourceMappingURL=index.js.map