// Importamos los estilos globales de la aplicación
import './assets/styles/App.css'

// Importamos el contenedor principal del dispositivo
import DeviceShell from "./Components/1-layout/hardware/DeviceShell"

/**
 * App es el componente raíz de la UI.
 *
 * Su responsabilidad es:
 * - Definir el layout general
 * - Montar el "dispositivo" dentro de la pantalla
 *
 * En el proyecto final:
 * - este <main> será reemplazado o envuelto por THREE.JS
 */
function App() {
  return (
    <>
      {/* Contenedor principal centrado en pantalla */}
      <main className="min-h-screen w-full flex items-center justify-center bg-black">
        <DeviceShell />
      </main>
    </>
  )
}

export default App
