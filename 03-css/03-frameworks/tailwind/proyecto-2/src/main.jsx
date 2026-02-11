import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/**
 * Punto de entrada de la aplicación React.
 *
 * - createRoot monta React en el div #root del index.html
 * - StrictMode ayuda a detectar errores y malas prácticas en desarrollo
 *   (NO afecta producción)
 * - App es el componente raíz de toda la aplicación
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
