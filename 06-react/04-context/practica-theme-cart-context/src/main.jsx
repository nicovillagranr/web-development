import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
