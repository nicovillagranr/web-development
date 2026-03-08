import React, { useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <section className="card">
      <h2>Renderizado condicional</h2>
      {isLogged ? (
        <p>Sesion activa. Ya puedes crear componentes privados.</p>
      ) : (
        <p>Sesion cerrada. Practica el flujo de login visual.</p>
      )}
      <button onClick={() => setIsLogged((current) => !current)}>
        {isLogged ? 'Cerrar sesion' : 'Iniciar sesion'}
      </button>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
