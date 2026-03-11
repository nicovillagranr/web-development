// ================= CONTEXTO MODULO =================
// Hook para manejar el cambio de tema dark/light con persistencia en localStorage.
import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('nexusai-theme')
    return saved || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('nexusai-theme', theme)
  }, [theme])

  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return { theme, toggle }
}
