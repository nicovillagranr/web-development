import React, { useMemo, useState } from 'https://esm.sh/react@19.2.0'
import { createRoot } from 'https://esm.sh/react-dom@19.2.0/client'

function TemperatureInput({ value, onChange }) {
  return <input type="number" value={value} onChange={(event) => onChange(event.target.value)} />
}

function App() {
  const [celsius, setCelsius] = useState(0)

  const fahrenheit = useMemo(() => (Number(celsius) * 9) / 5 + 32, [celsius])

  return (
    <section className="card">
      <h2>Lifting state</h2>
      <p>El estado vive en el componente padre y se comparte a hijos.</p>
      <label>
        Celsius
        <TemperatureInput value={celsius} onChange={setCelsius} />
      </label>
      <p>Fahrenheit: {Number.isFinite(fahrenheit) ? fahrenheit.toFixed(1) : '-'}</p>
    </section>
  )
}

createRoot(document.getElementById('root')).render(<App />)
