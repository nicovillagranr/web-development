// ================= CONTEXTO MODULO =================
// Config de lint para JS/JSX.
// Aplica reglas recomendadas de JS, React Hooks y React Refresh.
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { react },
    rules: {
      // Sin esta regla, `no-unused-vars` no ve el uso dentro de JSX: marcaría
      // `motion` (de `<motion.div>`) o `Icon` (de `<Icon />`) como no usados.
      // Se activa suelta a propósito, en vez del preset `react/recommended`,
      // para no arrastrar reglas nuevas (prop-types y compañia) a este proyecto.
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
