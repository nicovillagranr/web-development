# MGD Exports Landing Page - Guía de Configuración

¡El landing page está listo! Aquí te encontrarás todo lo que necesitas saber para personalizar y lanzar el sitio.

---

## 🚀 Estado Actual

✅ **Completado:**
- Landing page responsivo de una página con scroll suave
- 7 secciones: Hero, Nosotros, Servicios, Por qué elegirnos, Contacto, Footer
- Paleta de colores industrial-luxe (azules + naranja)
- Tipografía distintiva (Montserrat + Open Sans)
- Formulario de contacto integrado con EmailJS
- Navbar fijo con hamburger menu para mobile
- Animaciones CSS (fadeInUp, glow, floating, etc.)
- Iconos SVG inline personalizados
- Tailwind CSS v4 con custom design tokens

✏️ **Pendiente de tu parte:**
1. Configurar EmailJS y obtener credenciales
2. Reemplazar imágenes placeholder
3. Actualizar información de contacto
4. Personalizar textos si es necesario

---

## 🔧 Paso 1: Configurar EmailJS

El formulario de contacto necesita EmailJS para enviar correos. Es gratuito para los primeros 200 emails/mes.

### Instrucciones:

1. **Crea una cuenta en EmailJS:**
   - Ve a https://emailjs.com
   - Regístrate con tu email

2. **Configura un Email Service:**
   - En el dashboard, ve a "Email Services"
   - Haz clic en "Add Service"
   - Elige tu proveedor (Gmail, Outlook, SMTP, etc.)
   - Sigue las instrucciones para conectar tu cuenta de correo
   - Guarda el **Service ID** (ej: `service_abc123def`)

3. **Crea un Email Template:**
   - Ve a "Email Templates"
   - Haz clic en "Create New Template"
   - Usa estas variables en el template:
     ```
     De: {{from_name}} ({{from_email}})
     Empresa: {{company}}
     Mensaje:
     {{message}}
     ```
   - Guarda el template y anota el **Template ID** (ej: `template_xyz789`)

4. **Obtén tu Public Key:**
   - En el menú superior, ve a "Account" → "API Keys"
   - Copia tu **Public Key**

5. **Configura las variables de entorno:**
   - Abre el archivo `.env` en la raíz del proyecto
   - Reemplaza los valores placeholder:
     ```env
     VITE_EMAILJS_SERVICE_ID=service_tu_id_aqui
     VITE_EMAILJS_TEMPLATE_ID=template_tu_id_aqui
     VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
     ```
   - Guarda el archivo

6. **Prueba el formulario:**
   - Abre http://localhost:5173 en tu navegador
   - Ve a la sección "Contacto"
   - Completa el formulario y envía
   - Deberías recibir un correo en tu bandeja de entrada

---

## 🖼️ Paso 2: Reemplazar Imágenes

Las imágenes están en `public/images/`. Actualmente son placeholders.

### Archivos a reemplazar:

1. **hero-bg.jpg** - Imagen de fondo del hero
   - Dimensiones recomendadas: 1920x1080px
   - Tema: Minería, industria pesada, equipamiento industrial

2. **logo.png** - Logo de MGD Exports
   - Dimensiones recomendadas: 200x50px mínimo
   - Formato: PNG con transparencia

3. **about-team.jpg** - Foto para sección "Sobre Nosotros"
   - Dimensiones recomendadas: 500x500px
   - Tema: Equipo, instalaciones o equipamiento

**Optimización:**
- Usa herramientas como TinyPNG, ImageOptim o Squoosh para comprimir
- Mantén el tamaño < 500KB por imagen
- Considera convertir a WebP para mejor performance

---

## 📝 Paso 3: Personalizar Contenido

### Información de Contacto (Contact.jsx)

Actualiza estos datos en `src/components/Contact.jsx`:
- Email: `contacto@mgdexports.com` (línea ~255)
- Teléfono: `+51 1 XXX XXXX` (línea ~270)
- Ubicación: `Lima, Perú` (línea ~285)
- Horario: Actualiza los horarios (línea ~295-300)

### Textos Principales

**Hero:** `src/components/Hero.jsx`
- Línea 27: Cambiar el subtítulo del hero
- Línea 49: Cambiar "Soluciones Integrales..."

**About:** `src/components/About.jsx`
- Línea 32: Cambiar el título de la sección
- Línea 35-45: Actualizar la descripción de la empresa

**Services:** `src/components/Services.jsx`
- Líneas 8-35: Editar títulos y descripciones de servicios

---

## 🎨 Personalización de Estilos

### Colores

Los colores están definidos en `src/assets/styles/App.css` en la sección `@theme`:

```css
--color-mgd-navy: #1F2F3A      /* Navbar */
--color-mgd-hero: #2F4F5F      /* Hero overlay */
--color-mgd-blue: #3E6A85      /* Elementos secundarios */
--color-mgd-cta: #2E4C8C       /* Botón azul */
--color-mgd-orange: #C97A2B    /* Acentos/hover */
```

Para cambiar colores, edita estos valores directamente en `App.css`.

### Tipografías

Las fuentes están importadas desde Google Fonts:
- **Montserrat**: Títulos (font-display)
- **Open Sans**: Cuerpo (font-body)

Para cambiar a otras fuentes:
1. Edita `src/assets/styles/App.css` (línea 8)
2. Cambia la URL de Google Fonts
3. Actualiza los nombres en `@theme`

---

## 🔍 Estructura del Proyecto

```
mgdexports/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── WhyUs.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── icons/
│   │       ├── MiningIcon.jsx
│   │       ├── EPPIcon.jsx
│   │       ├── HydraulicIcon.jsx
│   │       └── EngineeringIcon.jsx
│   ├── assets/
│   │   └── styles/
│   │       └── App.css        ← Estilos globales y @theme
│   ├── App.jsx               ← Componente raíz
│   └── main.jsx              ← Inicialización de EmailJS
├── public/
│   └── images/
│       ├── hero-bg.jpg       ← Reemplazar
│       ├── logo.png          ← Reemplazar
│       └── about-team.jpg    ← Reemplazar
├── .env                      ← Credenciales EmailJS
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## ✨ Características Implementadas

### Animaciones
- **fadeInUp**: Entrada suave del hero
- **glowPulse**: Efecto de brillo en CTAs
- **floating**: Flotación sutil del scroll indicator
- **slideInRight**: Reveal de stats
- **scalePulse**: Hover en iconos

### Responsive Design
- Mobile-first con Tailwind breakpoints
- Hamburger menu en dispositivos pequeños
- Grid responsive (1 columna → 2 → 4)
- Imágenes y textos adaptativos

### Accesibilidad
- Navegación por teclado (smooth scroll)
- Etiquetas ARIA en menú mobile
- Contraste de colores WCAG compliant
- Respeto a `prefers-reduced-motion`

### Performance
- CSS puro (sin librerías de animación)
- Imágenes optimizables
- HTML semántico
- Smooth scroll con CSS nativo

---

## 🚀 Despliegue

### Generar build de producción:

```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos listos para producción.

### Subirlo a un servidor:

El contenido de la carpeta `dist/` puede alojarse en:
- **Vercel** (recomendado, gratuito)
  ```bash
  npm i -g vercel
  vercel
  ```
- **Netlify** (gratuito, drag-and-drop)
- **GitHub Pages**
- Cualquier servidor web (Apache, Nginx, etc.)

---

## 🔗 Recursos Útiles

- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **EmailJS**: https://www.emailjs.com/docs/
- **Google Fonts**: https://fonts.google.com/
- **Compresión de imágenes**: https://tinypng.com/

---

## 📞 Soporte

Si tienes problemas:

1. **Verifica que el dev server está corriendo:**
   ```bash
   npm run dev
   ```

2. **Borra cache y recarga:**
   - Ctrl+Shift+R (o Cmd+Shift+R en Mac)

3. **Revisa la consola del navegador (F12):**
   - Busca mensajes de error

4. **Verifica las variables de entorno:**
   - Asegúrate de que `.env` tiene valores válidos
   - Reinicia el dev server después de cambiar `.env`

---

## ✅ Checklist antes de lanzar

- [ ] EmailJS configurado y probado
- [ ] Imágenes reemplazadas y optimizadas
- [ ] Información de contacto actualizada
- [ ] Textos personalizados
- [ ] Probado en desktop y mobile
- [ ] Probado el formulario de contacto
- [ ] Build de producción generado (`npm run build`)
- [ ] Dominio configurado y DNS apuntado

---

¡El sitio está listo para personalizar y lanzar! 🎉
