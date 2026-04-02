// 06 — Drag & Drop básico
// TS: DragEvent es el tipo para eventos de arrastre.
// draggable es una propiedad boolean (a diferencia de contentEditable).

const taskInput = document.querySelector<HTMLInputElement>("#taskInput")!;
const addTask = document.querySelector<HTMLButtonElement>("#addTask")!;
const cols = document.querySelectorAll<HTMLDivElement>(".column");

// createTask devuelve HTMLDivElement — TS infiere el tipo desde createElement
function createTask(text: string): HTMLDivElement {
  const node = document.createElement("div");
  node.className = "task";
  node.draggable = true; // boolean en TS
  node.textContent = text;

  node.addEventListener("dragstart", (): void => {
    node.classList.add("dragging");
  });

  node.addEventListener("dragend", (): void => {
    node.classList.remove("dragging");
  });

  return node;
}

addTask.addEventListener("click", (): void => {
  const value: string = taskInput.value.trim();
  if (!value) return;

  const todoCol = document.querySelector<HTMLDivElement>('[data-col="todo"]');
  todoCol?.appendChild(createTask(value));
  taskInput.value = "";
});

// cols es NodeListOf<HTMLDivElement> — forEach está disponible en NodeList
cols.forEach((col: HTMLDivElement): void => {
  col.addEventListener("dragover", (event: DragEvent): void => {
    event.preventDefault();
    // querySelector devuelve Element | null; casteamos a HTMLDivElement
    const dragging = document.querySelector<HTMLDivElement>(".dragging");
    if (dragging !== null) col.appendChild(dragging);
  });
});
