import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL no definida. Copia .env.example a .env")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
