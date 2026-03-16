// ================= CONTEXTO MODULO =================
// Hook para manejar el cambio de tema dark/light con persistencia en localStorage.
import { useState, useEffect } from 'react'

export function useTheme() {
  // Inicializa con el tema guardado en localStorage; si no hay ninguno, usa 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nexusai-theme')
    return saved || 'dark'
  })

  // Al cambiar el tema: añade la clase al <html> y persiste en localStorage
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('nexusai-theme', theme)
  }, [theme])

  // Función que alterna entre 'dark' y 'light'
  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return { theme, toggle }
}
