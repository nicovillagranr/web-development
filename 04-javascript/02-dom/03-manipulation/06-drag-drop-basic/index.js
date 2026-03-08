const taskInput = document.querySelector('#taskInput');
const addTask = document.querySelector('#addTask');
const cols = document.querySelectorAll('.column');

function createTask(text) {
  const node = document.createElement('div');
  node.className = 'task';
  node.draggable = true;
  node.textContent = text;
  node.addEventListener('dragstart', () => node.classList.add('dragging'));
  node.addEventListener('dragend', () => node.classList.remove('dragging'));
  return node;
}

addTask.addEventListener('click', () => {
  const value = taskInput.value.trim();
  if (!value) return;
  document.querySelector('[data-col="todo"]').appendChild(createTask(value));
  taskInput.value = '';
});

cols.forEach((col) => {
  col.addEventListener('dragover', (event) => {
    event.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (dragging) col.appendChild(dragging);
  });
});
