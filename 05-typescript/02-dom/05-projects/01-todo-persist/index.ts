// 01 — Todo List con persistencia (localStorage)
// TS: interfaz Task para tipar el estado; localStorage tipado con generics.

const todoInput = document.querySelector<HTMLInputElement>("#todoInput")!;
const todoAdd = document.querySelector<HTMLButtonElement>("#todoAdd")!;
const todoList = document.querySelector<HTMLUListElement>("#todoList")!;

interface Task {
  id: string;
  text: string;
  done: boolean;
}

// JSON.parse devuelve 'any'; lo casteamos a Task[]
// El operador '??' (nullish coalescing) maneja el caso localStorage vacío
let tasks: Task[] = JSON.parse(localStorage.getItem("todo-persist") ?? "[]") as Task[];

function save(): void {
  localStorage.setItem("todo-persist", JSON.stringify(tasks));
}

function render(): void {
  todoList.innerHTML = "";

  tasks.forEach((task: Task): void => {
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

function addTask(): void {
  const text: string = todoInput.value.trim();
  if (!text) return;

  tasks.unshift({ id: crypto.randomUUID(), text, done: false });
  todoInput.value = "";
  save();
  render();
}

todoAdd.addEventListener("click", addTask);

// Checkbox: marcar/desmarcar tarea
todoList.addEventListener("change", (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const id: string | undefined = target.dataset["id"];
  if (!id) return;

  tasks = tasks.map((task: Task): Task => {
    if (task.id !== id) return task;
    return { ...task, done: target.checked };
  });

  save();
  render();
});

// Botón eliminar — delegación de eventos
todoList.addEventListener("click", (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const id: string | undefined = target.dataset["remove"];
  if (!id) return;

  tasks = tasks.filter((task: Task): boolean => task.id !== id);
  save();
  render();
});

render();
