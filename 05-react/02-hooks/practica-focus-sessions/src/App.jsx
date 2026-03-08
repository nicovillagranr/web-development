import { useMemo, useRef, useState } from 'react'
import { useCountdown } from './hooks/useCountdown'
import { useLocalStorage } from './hooks/useLocalStorage'

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export default function App() {
  const [minutes, setMinutes] = useState(15)
  const [sessionName, setSessionName] = useState('Lectura React')
  const [sessions, setSessions] = useLocalStorage('focus-sessions', [])
  const inputRef = useRef(null)

  const timer = useCountdown(minutes * 60, () => {
    const newSession = {
      id: Date.now(),
      name: sessionName.trim() || 'Sesion sin nombre',
      minutes,
      date: new Date().toISOString(),
    }

    setSessions((current) => [newSession, ...current])
    inputRef.current?.focus()
  })

  const stats = useMemo(() => {
    const totalSessions = sessions.length
    const totalMinutes = sessions.reduce((acc, item) => acc + item.minutes, 0)

    const today = new Date().toDateString()
    const todayMinutes = sessions
      .filter((item) => new Date(item.date).toDateString() === today)
      .reduce((acc, item) => acc + item.minutes, 0)

    return {
      totalSessions,
      totalMinutes,
      todayMinutes,
    }
  }, [sessions])

  function deleteSession(id) {
    setSessions((current) => current.filter((session) => session.id !== id))
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">React Hooks</p>
        <h1>Focus Sessions Tracker</h1>
        <p>Practica hooks base y custom hooks con persistencia local.</p>
      </header>

      <section className="panel setup">
        <label>
          Nombre de sesion
          <input
            ref={inputRef}
            value={sessionName}
            onChange={(event) => setSessionName(event.target.value)}
          />
        </label>

        <label>
          Duracion (minutos)
          <select value={minutes} onChange={(event) => setMinutes(Number(event.target.value))}>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={45}>45</option>
          </select>
        </label>
      </section>

      <section className="panel timer">
        <p className="clock">{formatTime(timer.remaining)}</p>
        <div className="timer-actions">
          {!timer.isRunning ? (
            <button onClick={timer.start}>Iniciar</button>
          ) : (
            <button className="secondary" onClick={timer.pause}>
              Pausar
            </button>
          )}
          <button className="secondary" onClick={timer.reset}>
            Reiniciar
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <article className="panel">
          <h3>Sesiones</h3>
          <p>{stats.totalSessions}</p>
        </article>
        <article className="panel">
          <h3>Minutos totales</h3>
          <p>{stats.totalMinutes}</p>
        </article>
        <article className="panel">
          <h3>Minutos hoy</h3>
          <p>{stats.todayMinutes}</p>
        </article>
      </section>

      <section className="panel">
        <h2>Historial</h2>
        {sessions.length === 0 ? (
          <p className="empty">Todavia no completas sesiones.</p>
        ) : (
          <ul className="list">
            {sessions.map((session) => (
              <li key={session.id}>
                <div>
                  <strong>{session.name}</strong>
                  <small>{new Date(session.date).toLocaleString()}</small>
                </div>
                <div className="row-end">
                  <span>{session.minutes} min</span>
                  <button className="danger" onClick={() => deleteSession(session.id)}>
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
