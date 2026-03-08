const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const saveBtn = document.querySelector('#save');
const modal = document.querySelector('#modal');
const title = document.querySelector('#title');
const content = document.querySelector('#content');
const notes = document.querySelector('#notes');

openBtn.addEventListener('click', () => modal.classList.add('open'));
closeBtn.addEventListener('click', () => modal.classList.remove('open'));

saveBtn.addEventListener('click', () => {
  const t = title.value.trim();
  const c = content.value.trim();
  if (!t || !c) return;

  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `<strong>${t}</strong><p>${c}</p>`;
  notes.prepend(li);

  title.value = '';
  content.value = '';
  modal.classList.remove('open');
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.classList.remove('open');
});
