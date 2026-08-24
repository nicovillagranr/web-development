import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
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
      // Ahora es la version de typescript-eslint: la regla base de ESLint no
      // entiende `interface`/`type` y marcaria como no usado lo que solo se usa
      // en posicion de tipo.
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // El objetivo de la migracion es cero `any`, como en los dos proyectos
      // anteriores. Que lo diga el linter y no solo la buena voluntad.
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
])
