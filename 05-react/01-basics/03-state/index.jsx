import React, { useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <section className="card">
      <h2>Contador</h2>
      <p>Valor actual: {count}</p>
      <button onClick={() => setCount((current) => current + 1)}>Incrementar</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem', background: '#334155' }}>
        Reset
      </button>
    </section>
  )
}
createRoot(document.getElementById('root')).render(<Counter />)