// ================= CONTEXTO MODULO =================
// Config de Vite para el proyecto.
// Activa React, integra Tailwind y define la base de build.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/nexusai/',
})
