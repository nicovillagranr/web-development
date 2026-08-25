// Importa una herramienta de desarrollo de React que ayuda a encontrar problemas potenciales en el código (como funciones obsoletas o efectos secundarios duplicados). No genera elementos visuales.
import { StrictMode } from 'react'

// Importa el método moderno de React 18 + para tomar el control de un elemento del diseño web(HTML) y gestionar los componentes dentro de él.
import { createRoot } from 'react-dom/client'

// Importa el componente principal de la aplicación
import App from './App.tsx'

// Creamos una variable que almacena el elemento HTML con el ID 'root'
const rootElement = document.getElementById('root')

// Si el elemento HTML existe, creamos una raiz de React y la renderizamos
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
