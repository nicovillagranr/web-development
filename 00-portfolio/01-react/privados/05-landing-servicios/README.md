# Landing de servicios (demo)

## Objetivo

Landing **mobile-first** de tres servicios (mantenimiento y armado de PCs, páginas web
y diseño mecánico en SolidWorks) que convierte por WhatsApp. Marca y datos ficticios:
es una pieza para mostrar, no un sitio de cliente.

## Alcance

- Entra: hero, catálogo de servicios (precio "desde" opcional; hoy todos "A cotizar"),
  proceso en 3 pasos, CTA final y una barra fija de WhatsApp en móvil.
- Cada servicio abre WhatsApp con un mensaje ya redactado que nombra ese servicio.
- Queda fuera: formulario, backend, analítica y router (es una sola página).

## Stack

React 19.2 · TypeScript 6.0 (strict, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`) · Tailwind CSS 4.3 · Vite 8.

## Decisiones técnicas

- **El contenido vive en `src/data/`**, no en los componentes. `site.ts` lleva marca,
  número de WhatsApp y textos; `services.ts`, el catálogo. Cambiar de rubro es editar
  esos dos archivos.
- **CTA abajo y fijo en móvil** (`MobileCtaBar`), en la zona del pulgar, con
  `env(safe-area-inset-bottom)` para no quedar bajo la barra de gestos del iPhone.
  Por eso en móvil el header no es sticky y el hero no repite el botón de WhatsApp.
- **Catálogo en una columna en móvil, sin carrusel**: deslizar en horizontal esconde
  tarjetas que nadie llega a ver.
- **`base: "/landing-servicios/"`** literal, como el resto de `00-portfolio/`: la ruta
  publicada es el slug de la carpeta (`public_html/landing-servicios/`).
- **`noindex`** en `index.html` mientras sea prototipo (marca ficticia y número de
  WhatsApp de relleno).
- **Fuente del sistema** (SF Pro en Apple, Segoe/Roboto en el resto): cero descargas de
  tipografía, que en 4G es lo primero que se nota.

## Ejecución

```bash
pnpm install
pnpm dev          # servidor de desarrollo
pnpm build        # typecheck + build a dist/
pnpm preview      # sirve dist/ en local
pnpm typecheck
pnpm lint
pnpm format
```

> Antes de mostrarlo: cambia `whatsappNumber` en `src/data/site.ts` por un número real.
