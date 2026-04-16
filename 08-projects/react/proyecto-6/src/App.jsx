// Import de estilos
import './assets/styles/App.css'

// Importamos el contenedor principal del dispositivo
import { Shell } from "@shell/Shell"

function App() {
  return (
    <>
      <main className="min-h-screen w-full flex items-center justify-center bg-black/50">
        <Shell />
      </main>
    </>
  )
}
export default App