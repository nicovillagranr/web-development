const noteTitle = document.querySelector('#noteTitle');
const noteTag = document.querySelector('#noteTag');
const noteBody = document.querySelector('#noteBody');
const noteAdd = document.querySelector('#noteAdd');
const searchText = document.querySelector('#searchText');
const searchTag = document.querySelector('#searchTag');
const notesList = document.querySelector('#notesList');

let notes = JSON.parse(localStorage.getItem('notes-search-tags')) || [];

function persist() {
  localStorage.setItem('notes-search-tags', JSON.stringify(notes));
}

function render() {
  const textQuery = searchText.value.toLowerCase().trim();
  const tagQuery = searchTag.value.toLowerCase().trim();

  const filtered = notes.filter((note) => {
    const byText = `${note.title} ${note.body}`.toLowerCase().includes(textQuery);
    const byTag = !tagQuery || note.tag.toLowerCase().includes(tagQuery);
    return byText && byTag;
  });

  notesList.innerHTML = '';
  filtered.forEach((note) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:center;">
        <strong>${note.title}</strong>
        <span class="badge">${note.tag || 'sin-tag'}</span>
      </div>
      <p style="margin-top:.45rem;">${note.body}</p>
    `;
    notesList.appendChild(li);
  });
}

noteAdd.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const tag = noteTag.value.trim();
  const body = noteBody.value.trim();
  if (!title || !body) return;

  notes.unshift({ id: crypto.randomUUID(), title, tag, body });
  noteTitle.value = '';
  noteTag.value = '';
  noteBody.value = '';
  persist();
  render();
});

searchText.addEventListener('input', render);
searchTag.addEventListener('input', render);

render();
