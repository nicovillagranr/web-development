import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// TODO(tipos): `getElementById` devuelve el elemento O `null`. TS no ha leído tu
// index.html, así que no se fía de que el <div id="root"> exista de verdad.
// Estrecha el valor antes de pasárselo a createRoot. Es narrowing puro
// (05-unions-narrowing), no un truco nuevo de React.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
