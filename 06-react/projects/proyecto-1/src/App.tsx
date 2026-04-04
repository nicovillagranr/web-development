// Import de Hooks
import { useState } from 'react'

// Import de Componentes
import { Button, UseEffectDemo } from "./Components"

// Import de Estilos
import './assets/styles/App.css'

function App() {
  // BATCHING (explicación simple)
// React agrupa varios setState y hace un solo render al final (esto es batching).
//
// Problema:
// Si usas el valor actual del estado directamente, puede estar desactualizado
// cuando hay varios updates seguidos.
//
// MAL:
// setName(name === "Nico" ? "Villagrán" : "Nico")

// BIEN:
// setName((prev) => prev === "Nico" ? "Villagrán" : "Nico")

// ¿Por qué?
// Porque `prev` siempre es el valor más reciente,
// incluso si React agrupó varios cambios.

// Ejemplo claro:
// setCount((prev) => prev + 1)
// setCount((prev) => prev + 1)

// Resultado final: +2 (correcto)
// Si usaras `count + 1`, probablemente solo sumaría 1.

  const [count, setCount] = useState(0)
  const [name, setName] = useState("Nico")

  const countMore = () => {
    setCount((count) => count + 1)
  }

  const changeName = () => {
    setName((name) => name === "Nico" ? "Villagrán" : "Nico")
  }

  const handleClick = () => {
    console.log("Hoy me clickearon")
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-2xl font-bold mb-8 text-center">React Hooks</h1>

      <div className="flex flex-col gap-6 max-w-xl mx-auto">

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">useState</h2>
          <div className="flex flex-col gap-3">
            <Button label={`Cantidad de Clicks: ${count}`} parentMethod={countMore} />
            <Button label='Cambiar el nombre' parentMethod={changeName} />
            <Button label='Hacer Click' parentMethod={handleClick} /> 
            <p className="text-gray-300">{name}</p>
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">useEffect</h2>
          <UseEffectDemo />
        </section>

      </div>
    </main>
  )
}
export default App