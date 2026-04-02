import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

// No usen más Create React App, usen Vite
// WebPack ya no es el estándar, Vite es el estándar.
// ViteJs es el estándar de facto para crear aplicaciones React.
