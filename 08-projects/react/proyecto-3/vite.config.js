import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Esta carpeta local es "proyecto-1", pero en hosting este sitio se publica en "/proyecto-3/".
  // Se mantiene este base para respetar la estructura raiz del portafolio en produccion.
  base: '/react/proyecto-3/',
})
