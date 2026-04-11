# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Problemas encontrados durante el desarrollo

### Prettier rompe arbitrary values de Tailwind al guardar

**Síntoma:** al hacer `Ctrl + S` sobre archivos `.css` que usan `@apply`, Prettier reformatea las funciones dentro de *arbitrary values* de Tailwind (ej: `shadow-[0_12px_28px_rgba(56,189,248,0.25)]`) agregando espacios después de cada coma. Tailwind no tolera espacios dentro de los `[...]`, así que la regla se rompe silenciosamente y también puede tumbar la siguiente regla del archivo.

**Causa:** Prettier formatea el CSS con reglas estándar (espacios tras comas en `rgba()`, `calc()`, etc.) sin entender que el contenido de los `[...]` de Tailwind es un token único.

**Soluciones posibles:**

1. **Sacar el valor complejo del `@apply` y escribirlo como CSS plano** (opción aplicada en este proyecto). Así Prettier puede formatear libremente:
   ```css
   .button-light {
       @apply rounded-btn bg-accent px-5 py-2.5 text-sm font-bold;
       box-shadow: 0 12px 28px rgba(56, 189, 248, 0.25);
   }
   ```

2. **Comentario `/* prettier-ignore */`** sobre la línea problemática.

3. **Desactivar format on save solo para CSS** en `.vscode/settings.json`:
   ```json
   { "[css]": { "editor.formatOnSave": false } }
   ```

4. **Instalar `prettier-plugin-tailwindcss`** (recomendado a largo plazo). Es un plugin de Prettier que entiende la sintaxis de Tailwind y además ordena las clases automáticamente. Se instala como dependencia del proyecto:
   ```
   npm i -D prettier-plugin-tailwindcss
   ```
   Prettier lo detecta automáticamente desde `node_modules` sin configuración adicional.

