import { useEffect, useMemo, useState } from 'react'
import './App.css'

const INITIAL_TASKS = [
  { id: 1, title: 'Definir backlog inicial', owner: 'Nico', points: 3, status: 'todo' },
  { id: 2, title: 'Crear layout base', owner: 'Vale', points: 5, status: 'doing' },
  { id: 3, title: 'Configurar deploy preview', owner: 'Nico', points: 2, status: 'done' },
]

const STATUS = [
  { id: 'todo', label: 'To Do' },
  { id: 'doing', label: 'Doing' },
  { id: 'done', label: 'Done' },
]

function Stats({ tasks }) {
  const metrics = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((task) => task.status === 'done')
    const donePoints = done.reduce((acc, task) => acc + task.points, 0)
    const totalPoints = tasks.reduce((acc, task) => acc + task.points, 0)

    return {
      total,
      done: done.length,
      completion: total === 0 ? 0 : Math.round((done.length / total) * 100),
      donePoints,
      totalPoints,
    }
  }, [tasks])

  return (
    <section className="stats-grid">
      <article className="panel">
        <h3>Tareas</h3>
        <p>{metrics.total}</p>
      </article>
      <article className="panel">
        <h3>Completadas</h3>
        <p>{metrics.done}</p>
      </article>
      <article className="panel">
        <h3>Avance</h3>
        <p>{metrics.completion}%</p>
      </article>
      <article className="panel">
        <h3>Puntos</h3>
        <p>
          {metrics.donePoints} / {metrics.totalPoints}
        </p>
      </article>
    </section>
  )
}

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('Nico')
  const [points, setPoints] = useState(3)

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()

    if (!cleanTitle) return

    onAdd({
      id: Date.now(),
      title: cleanTitle,
      owner,
      points: Number(points),
      status: 'todo',
    })

    setTitle('')
    setPoints(3)
  }

  return (
    <form className="panel form" onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>

      <label>
        Titulo
        <input value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>

      <div className="row">
        <label>
          Responsable
          <select value={owner} onChange={(event) => setOwner(event.target.value)}>
            <option>Nico</option>
            <option>Vale</option>
            <option>Team</option>
          </select>
        </label>

        <label>
          Story points
          <input
            type="number"
            min="1"
            max="13"
            value={points}
            onChange={(event) => setPoints(event.target.value)}
          />
        </label>
      </div>

      <button type="submit">Agregar al sprint</button>
    </form>
  )
}

function Board({ tasks, onMove, filter }) {
  const visible = useMemo(() => {
    if (filter === 'all') return tasks
    return tasks.filter((task) => task.status === filter)
  }, [tasks, filter])

  return (
    <section className="board">
      {STATUS.map((column) => {
        const columnTasks = visible.filter((task) => task.status === column.id)

        return (
          <article key={column.id} className="panel column">
            <header>
              <h2>{column.label}</h2>
              <small>{columnTasks.length} tareas</small>
            </header>

            <ul>
              {columnTasks.map((task) => (
                <li key={task.id} className="task-card">
                  <strong>{task.title}</strong>
                  <p>
                    {task.owner} · {task.points} pts
                  </p>
                  <div className="actions">
                    {STATUS.filter((status) => status.id !== task.status).map((status) => (
                      <button key={status.id} onClick={() => onMove(task.id, status.id)}>
                        Mover a {status.label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </section>
  )
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem('sprint-board-tasks')
    return raw ? JSON.parse(raw) : INITIAL_TASKS
  })
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('sprint-board-tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(task) {
    setTasks((current) => [task, ...current])
  }

  function moveTask(taskId, status) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    )
  }

  return (
    <main className="container">
      <header className="hero panel">
        <p className="eyebrow">Proyecto React Aplicado</p>
        <h1>Productivity Hub</h1>
        <p>Tablero de sprint con metricas y flujo simple de trabajo.</p>
      </header>

      <Stats tasks={tasks} />
      <TaskForm onAdd={addTask} />

      <section className="panel filter-row">
        <span>Filtro:</span>
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          Todo
        </button>
        <button className={filter === 'todo' ? 'active' : ''} onClick={() => setFilter('todo')}>
          To Do
        </button>
        <button className={filter === 'doing' ? 'active' : ''} onClick={() => setFilter('doing')}>
          Doing
        </button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>
          Done
        </button>
      </section>

      <Board tasks={tasks} onMove={moveTask} filter={filter} />
    </main>
  )
}
