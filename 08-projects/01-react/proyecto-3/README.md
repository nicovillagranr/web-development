# Projex — Landing Page

Landing page de una agencia ficticia ("Projex"), construida con React 19 y Tailwind
CSS v4. Proyecto de práctica enfocado en composición por secciones, sistema visual
consistente y animaciones de entrada con Framer Motion.

## Características

- **Secciones funcionales**: Hero, servicios, proyectos y contacto.
- **Formulario de contacto funcional** con EmailJS (envío real de correos).
- **Accesibilidad**: focus-trap en el menú/modal y navegación por teclado.
- **Animaciones** de entrada con Framer Motion sin afectar la legibilidad.
- **Responsive** en los anchos de uso común (mobile, tablet, desktop).
- **Routing compatible con hosting estático** (HashRouter, base `/proyecto-3/`).

## Stack

| Herramienta      | Versión | Uso                                  |
| ---------------- | ------- | ------------------------------------ |
| React            | 19.2    | UI por componentes                   |
| Tailwind CSS     | 4.1     | Estilos utilitarios + sistema visual |
| Framer Motion    | 12      | Animaciones                          |
| React Router DOM | 7       | Navegación (HashRouter)              |
| Vite             | 7       | Build y dev server                   |
| EmailJS          | 4       | Formulario de contacto               |

## Sistema visual

- **Colores**: `primary` #ff5959, `surface` #E8E8E8, `dark` #1a1a1a, `light` #ffffff
- **Tipografía**: Poppins (`font-size: 10px` en `body`, así `1rem = 10px`)

## Cómo ejecutar

```bash
pnpm install
pnpm dev        # servidor de desarrollo
pnpm build      # build de producción
pnpm preview    # previsualizar el build
pnpm lint       # linting con ESLint
```

> Demo: _(pendiente de publicar el enlace de despliegue)_
