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
      // Sin esta regla, `no-unused-vars` no ve el uso dentro de JSX: marcaria
      // `motion` (de `<motion.div>`) o `Icon` (de `<Icon />`) como no usados.
      // Se activa suelta a proposito, en vez del preset `react/recommended`,
      // para no arrastrar reglas nuevas (prop-types y compania) a este proyecto.
      'react/jsx-uses-vars': 'error',
      // Antes esta linea llevaba `|^motion$` para silenciar ese falso positivo a
      // mano. Con jsx-uses-vars activa ya no hace falta, y quitarlo devuelve el
      // aviso legitimo si algun dia `motion` se importa y no se usa de verdad.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
