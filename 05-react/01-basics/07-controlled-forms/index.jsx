import React, { useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function App() {
  const [form, setForm] = useState({ name: '', role: 'Frontend' })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <main>
      <section className="card">
        <h2>Formulario controlado</h2>
        <label>
          Nombre
          <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
        </label>
        <label style={{ marginLeft: '0.5rem' }}>
          Rol
          <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Fullstack</option>
          </select>
        </label>
      </section>

      <section className="card">
        <h3>Preview</h3>
        <p>
          {form.name || 'Sin nombre'} - {form.role}
        </p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
