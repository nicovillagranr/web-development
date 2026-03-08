import { useMemo, useState } from 'react'

const INITIAL_TASKS = [
  { id: 1, title: 'Definir componentes base', priority: 'alta', done: false },
  { id: 2, title: 'Crear formulario controlado', priority: 'media', done: true },
  { id: 3, title: 'Agregar filtros por estado', priority: 'baja', done: false },
]

function Stats({ total, done }) {
  const pending = total - done

  return (
    <section className="stats-grid">
      <article>
        <h3>Total</h3>
        <p>{total}</p>
      </article>
      <article>
        <h3>Completadas</h3>
        <p>{done}</p>
      </article>
      <article>
        <h3>Pendientes</h3>
        <p>{pending}</p>
      </article>
    </section>
  )
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('media')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) return

    onAdd({ title: cleanTitle, priority })
    setTitle('')
    setPriority('media')
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <label>
        Tarea
        <input
          type="text"
          value={title}
          placeholder="Ej: Crear componente Header"
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        Prioridad
        <select value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </label>

      <button type="submit">Agregar tarea</button>
    </form>
  )
}

function Filters({ value, onChange }) {
  return (
    <div className="filters card">
      <button className={value === 'all' ? 'active' : ''} onClick={() => onChange('all')}>
        Todas
      </button>
      <button className={value === 'pending' ? 'active' : ''} onClick={() => onChange('pending')}>
        Pendientes
      </button>
      <button className={value === 'done' ? 'active' : ''} onClick={() => onChange('done')}>
        Completadas
      </button>
    </div>
  )
}

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No hay tareas para este filtro.</p>
  }

  return (
    <ul className="tasks">
      {tasks.map((task) => (
        <li key={task.id} className={`card task ${task.done ? 'done' : ''}`}>
          <div>
            <h4>{task.title}</h4>
            <small>Prioridad: {task.priority}</small>
          </div>
          <div className="actions">
            <button onClick={() => onToggle(task.id)}>{task.done ? 'Reabrir' : 'Completar'}</button>
            <button className="danger" onClick={() => onDelete(task.id)}>
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')

  const filteredTasks = useMemo(() => {
    if (filter === 'done') return tasks.filter((task) => task.done)
    if (filter === 'pending') return tasks.filter((task) => !task.done)
    return tasks
  }, [tasks, filter])

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])

  function addTask(newTask) {
    setTasks((current) => [
      {
        id: Date.now(),
        ...newTask,
        done: false,
      },
      ...current,
    ])
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">React Basics</p>
        <h1>Task Board Basico</h1>
        <p>Practica props, estado local y eventos con componentes pequenos.</p>
      </header>

      <Stats total={tasks.length} done={doneCount} />
      <TaskForm onAdd={addTask} />
      <Filters value={filter} onChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </main>
  )
}
