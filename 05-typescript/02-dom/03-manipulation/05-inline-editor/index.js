// 05 — Inline Editor
// TS: contentEditable es un string ("true"/"false"/"inherit") en la DOM API,
// no un boolean. Esto es un detalle que TypeScript hace explícito.
const editable = document.querySelector("#editable");
const editBtn = document.querySelector("#edit");
const saveBtn = document.querySelector("#save");
editBtn.addEventListener("click", () => {
    editable.contentEditable = "true"; // string, no boolean
    editable.focus();
});
saveBtn.addEventListener("click", () => {
    if (!editable.textContent?.trim()) {
        alert("El texto no puede quedar vacío.");
        editable.focus();
        return;
    }
    editable.contentEditable = "false"; // vuelve a solo lectura
});
export {};
//# sourceMappingURL=index.js.map