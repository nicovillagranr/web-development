const editable = document.querySelector('#editable');
const edit = document.querySelector('#edit');
const save = document.querySelector('#save');

edit.addEventListener('click', () => {
  editable.contentEditable = 'true';
  editable.focus();
});

save.addEventListener('click', () => {
  if (!editable.textContent.trim()) {
    alert('El texto no puede quedar vacio.');
    editable.focus();
    return;
  }
  editable.contentEditable = 'false';
});
