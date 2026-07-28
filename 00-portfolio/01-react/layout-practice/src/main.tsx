import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('No hay un elemento con el id "root" en el DOM')
}
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
