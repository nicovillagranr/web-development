// 03 — Modal Notes
// TS: HTMLInputElement para campos de texto, HTMLTextAreaElement para textarea.

const openBtn = document.querySelector<HTMLButtonElement>("#open")!;
const closeBtn = document.querySelector<HTMLButtonElement>("#close")!;
const saveBtn = document.querySelector<HTMLButtonElement>("#save")!;
const modal = document.querySelector<HTMLDivElement>("#modal")!;
const title = document.querySelector<HTMLInputElement>("#title")!;
const content = document.querySelector<HTMLTextAreaElement>("#content")!;
const notes = document.querySelector<HTMLUListElement>("#notes")!;

openBtn.addEventListener("click", (): void => modal.classList.add("open"));
closeBtn.addEventListener("click", (): void => modal.classList.remove("open"));

saveBtn.addEventListener("click", (): void => {
  const t: string = title.value.trim();
  const c: string = content.value.trim();
  if (!t || !c) return;

  const li = document.createElement("li");
  li.className = "item";
  li.innerHTML = `<strong>${t}</strong><p>${c}</p>`;
  notes.prepend(li);

  title.value = "";
  content.value = "";
  modal.classList.remove("open");
});

// Cerrar modal al hacer click en el fondo
modal.addEventListener("click", (event: MouseEvent): void => {
  // event.target es el elemento exacto clickeado
  if (event.target === modal) modal.classList.remove("open");
});
