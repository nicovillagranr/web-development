// 01 — Kanban Board (Drag & Drop)
// TS: DragEvent para eventos de arrastre; HTMLDivElement para las columnas.

const taskInput = document.querySelector<HTMLInputElement>("#taskInput")!;
const addTask = document.querySelector<HTMLButtonElement>("#addTask")!;
const columns = document.querySelectorAll<HTMLDivElement>(".column");

function createTask(text: string): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "task";
  card.draggable = true; // boolean
  card.textContent = text;

  card.addEventListener("dragstart", (): void => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", (): void => {
    card.classList.remove("dragging");
  });

  return card;
}

addTask.addEventListener("click", (): void => {
  const value: string = taskInput.value.trim();
  if (!value) return;

  const todoCol = document.querySelector<HTMLDivElement>('[data-col="todo"]');
  todoCol?.appendChild(createTask(value));
  taskInput.value = "";
});

columns.forEach((col: HTMLDivElement): void => {
  col.addEventListener("dragover", (event: DragEvent): void => {
    event.preventDefault();
    const dragging = document.querySelector<HTMLDivElement>(".dragging");
    if (dragging !== null) col.appendChild(dragging);
  });
});
