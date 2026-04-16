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
      "@shell": fileURLToPath(new URL("./src/hardware", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@screen1": fileURLToPath(new URL("./src/screens/screen-1", import.meta.url)),
      "@screen2": fileURLToPath(new URL("./src/screens/screen-2", import.meta.url)),
      "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
      "@ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  base: '/react/proyecto-6/',
})
