// Importamos los estilos generales
import './assets/styles/App.css'

// Imports de Componentes
import Device from "./Components/0-DeviceShell/DeviceShell.jsx"

function App() {
  return (
    <>
      {/* Contenedor Principal para renderizar la App | En el proyecto Final será un contenedor de THREE.JS */}
      <main className="min-h-screen w-full flex items-center justify-center bg-blue-400">
        <Device />
      </main>
    </>
  )
}
export default App