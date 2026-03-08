import React, { useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function App() {
  const [items, setItems] = useState(['Aprender keys', 'Renderizar listas'])
  const [input, setInput] = useState('')

  function addItem(event) {
    event.preventDefault()
    const clean = input.trim()
    if (!clean) return
    setItems((current) => [...current, clean])
    setInput('')
  }

  return (
    <section className="card">
      <h2>Listas y keys</h2>
      <form onSubmit={addItem}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Nueva tarea" />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>Agregar</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
