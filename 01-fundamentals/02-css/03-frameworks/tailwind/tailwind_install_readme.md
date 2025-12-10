# Instalación de Tailwind CSS con Vite Plugin

Guía rápida y reutilizable para integrar Tailwind CSS usando el plugin oficial de Vite. Funciona perfecto con frameworks como Laravel, SvelteKit, React Router, Nuxt y SolidJS.

---

## 01. Crear el proyecto
Si aún no tienes un proyecto Vite, créalo con:

```bash
npm create vite@latest my-project
cd my-project
```

---

## 02. Instalar Tailwind CSS
Instala Tailwind y el plugin oficial para Vite:

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## 03. Configurar el plugin en Vite
Agrega `@tailwindcss/vite` a la configuración de Vite.

**vite.config.ts**
```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

---

## 04. Agregar las directivas de Tailwind
Crea o edita tu archivo CSS principal y agrega:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Normalmente en proyectos Vite este archivo está en `src/index.css` o `src/style.css`.

---

## 05. Importar tu CSS en el entrypoint
En tu archivo principal (ej: `src/main.ts` o `src/main.jsx`):

```js
import './index.css'
```

---

## 06. Ejecutar el servidor
Corre el proyecto:

```bash
npm run dev
```

Tailwind ya estará funcionando sin necesidad de configurar `content[]` ni PostCSS manualmente.

---

## Listo
Tu proyecto Vite ya tiene Tailwind CSS integrado de forma nativa usando el plugin oficial.

