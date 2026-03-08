import React, { useEffect, useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function App() {
  const [background, setBackground] = useState('#f1f5f9')

  useEffect(() => {
    document.body.style.background = background
    return () => {
      document.body.style.background = '#f1f5f9'
    }
  }, [background])

  return (
    <main>
      <section className="card">
        <h2>Eventos en React</h2>
        <p>Selecciona un color para cambiar el fondo de la pagina.</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setBackground('#fef3c7')}>Amarillo</button>
          <button onClick={() => setBackground('#dbeafe')}>Azul</button>
          <button onClick={() => setBackground('#dcfce7')}>Verde</button>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
