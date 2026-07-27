const habitInput = document.querySelector('#habitInput');
const addHabit = document.querySelector('#addHabit');
const habitList = document.querySelector('#habitList');
const totalHabits = document.querySelector('#totalHabits');
const doneToday = document.querySelector('#doneToday');

const today = new Date().toISOString().slice(0, 10);
let habits = JSON.parse(localStorage.getItem('habits-dashboard')) || [];

function save() {
  localStorage.setItem('habits-dashboard', JSON.stringify(habits));
}

function render() {
  habitList.innerHTML = '';
  let done = 0;

  habits.forEach((habit) => {
    const checked = habit.lastDone === today;
    if (checked) done += 1;

    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:center;">
        <div>
          <strong>${habit.name}</strong>
          <p>streak: ${habit.streak} dias</p>
        </div>
        <div class="row">
          <button data-toggle="${habit.id}">${checked ? 'Undo' : 'Done'}</button>
          <button class="danger" data-remove="${habit.id}">Eliminar</button>
        </div>
      </div>
    `;
    habitList.appendChild(li);
  });

  totalHabits.textContent = `Habitos: ${habits.length}`;
  doneToday.textContent = `Completados hoy: ${done}`;
}

addHabit.addEventListener('click', () => {
  const name = habitInput.value.trim();
  if (!name) return;

  habits.unshift({ id: crypto.randomUUID(), name, streak: 0, lastDone: null });
  habitInput.value = '';
  save();
  render();
});

habitList.addEventListener('click', (event) => {
  const toggleId = event.target.dataset.toggle;
  const removeId = event.target.dataset.remove;

  if (toggleId) {
    habits = habits.map((habit) => {
      if (habit.id !== toggleId) return habit;

      if (habit.lastDone === today) {
        return { ...habit, lastDone: null, streak: Math.max(0, habit.streak - 1) };
      }

      return { ...habit, lastDone: today, streak: habit.streak + 1 };
    });

    save();
    render();
  }

  if (removeId) {
    habits = habits.filter((habit) => habit.id !== removeId);
    save();
    render();
  }
});

render();
