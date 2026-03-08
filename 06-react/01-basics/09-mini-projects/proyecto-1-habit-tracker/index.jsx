import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function App() {
  const [habit, setHabit] = useState('')
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('react-basic-habits')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('react-basic-habits', JSON.stringify(habits))
  }, [habits])

  const completed = useMemo(() => habits.filter((item) => item.done).length, [habits])

  function addHabit(event) {
    event.preventDefault()
    const clean = habit.trim()
    if (!clean) return

    setHabits((current) => [
      ...current,
      { id: Date.now(), name: clean, done: false },
    ])
    setHabit('')
  }

  function toggleHabit(id) {
    setHabits((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    )
  }

  function removeHabit(id) {
    setHabits((current) => current.filter((item) => item.id !== id))
  }

  return (
    <main>
      <section className="card">
        <h2>Nuevo habito</h2>
        <form className="row" onSubmit={addHabit}>
          <input
            value={habit}
            onChange={(event) => setHabit(event.target.value)}
            placeholder="Ej: 20 min de React"
          />
          <button type="submit">Agregar</button>
        </form>
      </section>

      <section className="card">
        <h3>Progreso: {completed} / {habits.length}</h3>
        {habits.length === 0 ? (
          <p>Agrega tu primer habito.</p>
        ) : (
          <ul>
            {habits.map((item) => (
              <li key={item.id} className={item.done ? 'done' : ''}>
                <strong>{item.name}</strong>
                <div className="row">
                  <button onClick={() => toggleHabit(item.id)}>
                    {item.done ? 'Reabrir' : 'Completar'}
                  </button>
                  <button onClick={() => removeHabit(item.id)} style={{ background: '#dc2626' }}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
