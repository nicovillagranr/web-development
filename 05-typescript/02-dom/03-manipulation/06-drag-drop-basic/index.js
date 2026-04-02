// 06 — Drag & Drop básico
// TS: DragEvent es el tipo para eventos de arrastre.
// draggable es una propiedad boolean (a diferencia de contentEditable).
const taskInput = document.querySelector("#taskInput");
const addTask = document.querySelector("#addTask");
const cols = document.querySelectorAll(".column");
// createTask devuelve HTMLDivElement — TS infiere el tipo desde createElement
function createTask(text) {
    const node = document.createElement("div");
    node.className = "task";
    node.draggable = true; // boolean en TS
    node.textContent = text;
    node.addEventListener("dragstart", () => {
        node.classList.add("dragging");
    });
    node.addEventListener("dragend", () => {
        node.classList.remove("dragging");
    });
    return node;
}
addTask.addEventListener("click", () => {
    const value = taskInput.value.trim();
    if (!value)
        return;
    const todoCol = document.querySelector('[data-col="todo"]');
    todoCol?.appendChild(createTask(value));
    taskInput.value = "";
});
// cols es NodeListOf<HTMLDivElement> — forEach está disponible en NodeList
cols.forEach((col) => {
    col.addEventListener("dragover", (event) => {
        event.preventDefault();
        // querySelector devuelve Element | null; casteamos a HTMLDivElement
        const dragging = document.querySelector(".dragging");
        if (dragging !== null)
            col.appendChild(dragging);
    });
});
export {};
//# sourceMappingURL=index.js.map