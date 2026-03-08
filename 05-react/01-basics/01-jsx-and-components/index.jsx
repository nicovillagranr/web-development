import React from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function WelcomeCard({ title, description }) {
  return (
    <article className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}

function App() {
  return (
    <main>
      <WelcomeCard
        title="Primer componente"
        description="Este bloque practica JSX y composicion de componentes funcionales."
      />
      <WelcomeCard
        title="Segundo componente"
        description="Cambia los textos para experimentar con props y layout."
      />
    </main>
  )
}
createRoot(document.getElementById('root')).render(<App />)