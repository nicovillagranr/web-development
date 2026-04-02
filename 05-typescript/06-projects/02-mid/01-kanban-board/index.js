// 01 — Kanban Board (Drag & Drop)
// TS: DragEvent para eventos de arrastre; HTMLDivElement para las columnas.
const taskInput = document.querySelector("#taskInput");
const addTask = document.querySelector("#addTask");
const columns = document.querySelectorAll(".column");
function createTask(text) {
    const card = document.createElement("div");
    card.className = "task";
    card.draggable = true; // boolean
    card.textContent = text;
    card.addEventListener("dragstart", () => {
        card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
    });
    return card;
}
addTask.addEventListener("click", () => {
    const value = taskInput.value.trim();
    if (!value)
        return;
    const todoCol = document.querySelector('[data-col="todo"]');
    todoCol?.appendChild(createTask(value));
    taskInput.value = "";
});
columns.forEach((col) => {
    col.addEventListener("dragover", (event) => {
        event.preventDefault();
        const dragging = document.querySelector(".dragging");
        if (dragging !== null)
            col.appendChild(dragging);
    });
});
export {};
//# sourceMappingURL=index.js.map