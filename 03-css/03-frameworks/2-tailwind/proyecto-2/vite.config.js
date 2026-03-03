// ================= CONTEXTO MODULO =================
// Config de Vite para el proyecto.
// Activa React, integra Tailwind y define la base de build.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@screen1": fileURLToPath(new URL("./src/Components/layout/screens/screen_1", import.meta.url)),
      "@screen2": fileURLToPath(new URL("./src/Components/layout/screens/screen_2", import.meta.url)),
      "@shared": fileURLToPath(new URL("./src/Components/layout", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  base: '/proyecto-4/',
})
