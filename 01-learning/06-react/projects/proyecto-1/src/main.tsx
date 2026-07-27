import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* SinglePage Aplication */}
    {/* Una sola Página. El contenido se actualiza dinámicamente */}
    <App />
  </StrictMode>,
)

// Lo que hace StrictMode es:
// 1. Renderizar el componente dos veces para detectar errores.
// 2. Renderizar el componente en modo de desarrollo.
// 3. Renderizar el componente en modo de producción.
// 4. Renderizar el componente en modo de test.