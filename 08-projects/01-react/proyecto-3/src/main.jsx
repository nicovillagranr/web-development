// ================= CONTEXTO MODULO =================
// Punto de entrada de la app. Monta el componente raiz en el DOM.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/App.css'

// StrictMode renderiza los componentes dos veces en desarrollo para detectar efectos secundarios
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
