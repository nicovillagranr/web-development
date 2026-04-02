// 01 — Habits Dashboard
// TS: interface Habit con lastDone: string | null; event delegation con as HTMLElement.
const habitInput = document.querySelector('#habitInput');
const addHabit = document.querySelector('#addHabit');
const habitList = document.querySelector('#habitList');
const totalHabits = document.querySelector('#totalHabits');
const doneToday = document.querySelector('#doneToday');
const today = new Date().toISOString().slice(0, 10);
let habits = JSON.parse(localStorage.getItem('habits-dashboard') ?? '[]');
function save() {
    localStorage.setItem('habits-dashboard', JSON.stringify(habits));
}
function render() {
    habitList.innerHTML = '';
    let done = 0;
    habits.forEach((habit) => {
        const checked = habit.lastDone === today;
        if (checked)
            done += 1;
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
    if (!name)
        return;
    habits.unshift({ id: crypto.randomUUID(), name, streak: 0, lastDone: null });
    habitInput.value = '';
    save();
    render();
});
// Event delegation: un solo listener en el contenedor para todos los botones
habitList.addEventListener('click', (event) => {
    const target = event.target;
    const toggleId = target.dataset['toggle'];
    const removeId = target.dataset['remove'];
    if (toggleId) {
        habits = habits.map((habit) => {
            if (habit.id !== toggleId)
                return habit;
            // Toggle: si ya está hecho hoy → deshacer (bajar streak); si no → marcar done
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
export {};
//# sourceMappingURL=index.js.map