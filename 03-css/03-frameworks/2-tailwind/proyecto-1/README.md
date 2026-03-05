# Proyecto 3 | Projex Landing

Landing page construida con React, React Router, Tailwind CSS y Framer Motion.

## Contexto Del Repositorio

Este proyecto vive localmente en la carpeta:

`03-css/03-frameworks/2-tailwind/proyecto-1`

Pero en hosting se publica como:

`/proyecto-3/`

Ese desacople es intencional y responde a la estructura global del repositorio (proyectos 1, 2, 3 y 4 en raiz de hosting).

## Nota De Configuracion

- `vite.config.js` usa `base: "/proyecto-3/"` para que los assets y rutas resuelvan bien en produccion.
- La app usa `HashRouter` para compatibilidad de navegacion en hosting estatico.

## Scripts

- `npm run dev`: levanta entorno local.
- `npm run build`: genera build de produccion.
- `npm run preview`: previsualiza build localmente.
- `npm run lint`: ejecuta ESLint.
