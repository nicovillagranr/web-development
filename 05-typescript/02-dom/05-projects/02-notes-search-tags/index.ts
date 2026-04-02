// 02 — Notes con búsqueda por texto y tags
// TS: interfaz Note para tipar las notas; filtros tipados.

const noteTitle = document.querySelector<HTMLInputElement>("#noteTitle")!;
const noteTag = document.querySelector<HTMLInputElement>("#noteTag")!;
const noteBody = document.querySelector<HTMLTextAreaElement>("#noteBody")!;
const noteAdd = document.querySelector<HTMLButtonElement>("#noteAdd")!;
const searchText = document.querySelector<HTMLInputElement>("#searchText")!;
const searchTag = document.querySelector<HTMLInputElement>("#searchTag")!;
const notesList = document.querySelector<HTMLUListElement>("#notesList")!;

interface Note {
  id: string;
  title: string;
  tag: string;
  body: string;
}

let notes: Note[] = JSON.parse(
  localStorage.getItem("notes-search-tags") ?? "[]"
) as Note[];

function persist(): void {
  localStorage.setItem("notes-search-tags", JSON.stringify(notes));
}

function render(): void {
  const textQuery: string = searchText.value.toLowerCase().trim();
  const tagQuery: string = searchTag.value.toLowerCase().trim();

  const filtered: Note[] = notes.filter((note: Note): boolean => {
    const byText: boolean = `${note.title} ${note.body}`
      .toLowerCase()
      .includes(textQuery);
    const byTag: boolean = !tagQuery || note.tag.toLowerCase().includes(tagQuery);
    return byText && byTag;
  });

  notesList.innerHTML = "";
  filtered.forEach((note: Note): void => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:center;">
        <strong>${note.title}</strong>
        <span class="badge">${note.tag || "sin-tag"}</span>
      </div>
      <p style="margin-top:.45rem;">${note.body}</p>
    `;
    notesList.appendChild(li);
  });
}

noteAdd.addEventListener("click", (): void => {
  const title: string = noteTitle.value.trim();
  const tag: string = noteTag.value.trim();
  const body: string = noteBody.value.trim();
  if (!title || !body) return;

  notes.unshift({ id: crypto.randomUUID(), title, tag, body });
  noteTitle.value = "";
  noteTag.value = "";
  noteBody.value = "";
  persist();
  render();
});

searchText.addEventListener("input", render);
searchTag.addEventListener("input", render);

render();
