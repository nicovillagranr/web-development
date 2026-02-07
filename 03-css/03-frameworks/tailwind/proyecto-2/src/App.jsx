// Importamos los estilos generales
import './assets/styles/App.css'

// Imports de Componentes
import Device from "./Components/0-DeviceShell/DeviceShell.jsx"

function App() {
  return (
    <>
      <main className="min-h-screen w-full flex items-center justify-center bg-blue-400">
        <Device />
      </main>
    </>
  )
}
export default App