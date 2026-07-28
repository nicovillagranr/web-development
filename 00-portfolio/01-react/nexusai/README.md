# NexusAI — Landing de agencia

Landing de una agencia de IA ficticia ("NexusAI"), construida con React 19 y Tailwind
CSS v4. Estética dark premium con una estructura de conversión completa: del gancho
inicial a la reserva de reunión, pasando por dolor, servicios, proceso, métricas,
testimonios y FAQ.

> Demo: **[nico-villagran.com/nexusai](https://nico-villagran.com/nexusai/)**

## Características

- **Estructura de conversión de 10 secciones** — hero, dolor, servicios, proceso,
  métricas, testimonios, FAQ y cierre, en ese orden y por ese motivo.
- **Tema claro/oscuro con persistencia** en `localStorage` (`useTheme`), arrancando
  en oscuro por defecto.
- **Animaciones al entrar en viewport** con Framer Motion, encapsuladas en un único
  componente `AnimateOnScroll` en vez de repetirse por toda la app.
- **Todo el copy centralizado** en `src/data/content.js`: los componentes no llevan
  texto dentro, así que cambiar el mensaje no obliga a tocar JSX.
- **Scroll suave a secciones** con un hook propio (`useScrollTo`).
- **Responsive** en los anchos de uso común (mobile, tablet, desktop).

## Stack

| Herramienta   | Versión | Uso                          |
| ------------- | ------- | ---------------------------- |
| React         | 19.2    | UI por componentes           |
| Tailwind CSS  | 4.1     | Estilos utilitarios + tokens |
| Framer Motion | 12      | Animaciones de entrada       |
| React Icons   | 5.5     | Iconografía                  |
| Vite          | 7       | Build y dev server           |

## Sistema visual

- **Acento**: `#00e5ff` (cian) · **Cálido**: `#ff2d95` (magenta) · **Sunset**: `#ff6b35`
  — los tres tienen su variante `-dim` y su equivalente en tema claro.
- **Tipografía**: Syne para titulares, Outfit para cuerpo.
- Los tokens viven como variables CSS en `src/assets/App.css`; el tema claro los
  redefine bajo una clase en `<html>`.

## Estructura

```
src/
├── components/
│   ├── layout/      Navbar y Footer
│   ├── sections/    las 8 secciones de la página
│   └── ui/          piezas reutilizables (Button, AnimateOnScroll, tarjetas)
├── data/content.js  todo el copy
└── hooks/           useScrollTo, useTheme
```

## Cómo ejecutar

```bash
pnpm install
pnpm dev        # servidor de desarrollo
pnpm build      # build de producción
pnpm preview    # previsualizar el build
pnpm lint       # linting con ESLint
```

**Despliegue:** Hostinger, servido desde el subdirectorio `/nexusai/`
(configurado en `base` de `vite.config.js`).
