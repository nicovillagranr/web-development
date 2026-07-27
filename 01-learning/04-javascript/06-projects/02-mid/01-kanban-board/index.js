const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTask');
const columns = document.querySelectorAll('.column');

function createTask(text) {
  const card = document.createElement('div');
  card.className = 'task';
  card.draggable = true;
  card.textContent = text;
  card.addEventListener('dragstart', () => card.classList.add('dragging'));
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
  return card;
}

addTask.addEventListener('click', () => {
  const value = taskInput.value.trim();
  if (!value) return;
  document.querySelector('[data-col="todo"]').appendChild(createTask(value));
  taskInput.value = '';
});

columns.forEach((col) => {
  col.addEventListener('dragover', (event) => {
    event.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) col.appendChild(dragging);
  });
});
