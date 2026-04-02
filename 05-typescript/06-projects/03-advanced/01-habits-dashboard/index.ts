// 01 — Habits Dashboard
// TS: interface Habit con lastDone: string | null; event delegation con as HTMLElement.

const habitInput = document.querySelector<HTMLInputElement>('#habitInput')!;
const addHabit = document.querySelector<HTMLButtonElement>('#addHabit')!;
const habitList = document.querySelector<HTMLUListElement>('#habitList')!;
const totalHabits = document.querySelector<HTMLSpanElement>('#totalHabits')!;
const doneToday = document.querySelector<HTMLSpanElement>('#doneToday')!;

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastDone: string | null; // ISO date "YYYY-MM-DD" o null si nunca se completó
}

const today: string = new Date().toISOString().slice(0, 10);
let habits: Habit[] = JSON.parse(localStorage.getItem('habits-dashboard') ?? '[]') as Habit[];

function save(): void {
  localStorage.setItem('habits-dashboard', JSON.stringify(habits));
}

function render(): void {
  habitList.innerHTML = '';
  let done: number = 0;

  habits.forEach((habit: Habit): void => {
    const checked: boolean = habit.lastDone === today;
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

addHabit.addEventListener('click', (): void => {
  const name: string = habitInput.value.trim();
  if (!name) return;

  habits.unshift({ id: crypto.randomUUID(), name, streak: 0, lastDone: null });
  habitInput.value = '';
  save();
  render();
});

// Event delegation: un solo listener en el contenedor para todos los botones
habitList.addEventListener('click', (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  const toggleId: string | undefined = target.dataset['toggle'];
  const removeId: string | undefined = target.dataset['remove'];

  if (toggleId) {
    habits = habits.map((habit: Habit): Habit => {
      if (habit.id !== toggleId) return habit;

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
    habits = habits.filter((habit: Habit): boolean => habit.id !== removeId);
    save();
    render();
  }
});

render();
