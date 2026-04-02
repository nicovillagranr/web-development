// 05 — Inline Editor
// TS: contentEditable es un string ("true"/"false"/"inherit") en la DOM API,
// no un boolean. Esto es un detalle que TypeScript hace explícito.

const editable = document.querySelector<HTMLDivElement>("#editable")!;
const editBtn = document.querySelector<HTMLButtonElement>("#edit")!;
const saveBtn = document.querySelector<HTMLButtonElement>("#save")!;

editBtn.addEventListener("click", (): void => {
  editable.contentEditable = "true"; // string, no boolean
  editable.focus();
});

saveBtn.addEventListener("click", (): void => {
  if (!editable.textContent?.trim()) {
    alert("El texto no puede quedar vacío.");
    editable.focus();
    return;
  }
  editable.contentEditable = "false"; // vuelve a solo lectura
});
