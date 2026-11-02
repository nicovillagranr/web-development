# Landing de servicios — SERVICIOS VPS

> **Favor personal para un amigo.** No es un proyecto de mi portfolio ni de mi web
> profesional: por eso vive en `privados/` y no aparece en la API del portfolio.

## Objetivo

Landing **mobile-first** de tres servicios (mantenimiento y armado de PCs, páginas web
y diseño mecánico en SolidWorks) que convierte por WhatsApp, con la marca
**SERVICIOS VPS**. El diseño sale de un mockup de escritorio hecho en Claude Design
(oct 2026), reimplementado aquí empezando por el móvil.

## Alcance

- Entra: header, hero con mosaico de servicios, catálogo (precio "desde" opcional; hoy
  todos "A cotizar"), proceso en 3 pasos, preguntas frecuentes, CTA final y una barra
  fija de WhatsApp en móvil.
- Cada servicio abre WhatsApp con un mensaje ya redactado que nombra ese servicio.
- Queda fuera: formulario, backend, analítica y router (es una sola página).

## Stack

React 19.2 · TypeScript 6.0 (strict, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`) · Tailwind CSS 4.3 · Vite 8.

## Decisiones técnicas

- **El contenido vive en `src/data/`**, no en los componentes. `site.ts` lleva marca,
  contacto, textos del hero, pasos y preguntas; `services.ts`, el catálogo. Correo y
  ciudad son opcionales: si faltan, la página no los muestra.
- **Un color por servicio** (`Tone` en `src/data/tone.ts`). Los datos solo eligen el
  color; las clases que lo pintan viven en `components/ui/tones.ts`, escritas enteras
  para que Tailwind las encuentre.
- **CTA abajo y fijo en móvil** (`MobileCtaBar`), en la zona del pulgar, con
  `env(safe-area-inset-bottom)` para no quedar bajo la barra de gestos del iPhone.
  Por eso en móvil el header lleva solo el logo, no es sticky, y el hero no repite el
  botón de WhatsApp. Los enlaces del header aparecen desde `lg`.
- **Catálogo en una columna en móvil, sin carrusel**: deslizar en horizontal esconde
  tarjetas que nadie llega a ver.
- **Preguntas con `<details name>` nativo**: teclado, estado y anuncio del lector de
  pantalla sin JavaScript; abrir una cierra la anterior, como en el mockup.
- **Contraste AA**: tres colores del mockup no llegaban a 4,5:1 con texto pequeño y se
  ajustaron lo justo (anotados en `src/index.css`).
- **`base: "/landing-servicios/"`** literal, como el resto de `00-portfolio/`: la ruta
  publicada es el slug de la carpeta (`public_html/landing-servicios/`).
- **`noindex`** en `index.html` mientras el número de WhatsApp sea de relleno.
- **Inter + Space Grotesk desde Google Fonts**, las del diseño. Cada una llega como
  fuente variable (un archivo por familia) y con `display=swap`, así que en 4G el texto
  se ve desde el principio con la fuente del sistema.

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
