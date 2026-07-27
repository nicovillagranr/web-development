# CSS User Preference Media Queries

Las **media queries de preferencias del usuario** son consultas CSS que acceden directamente a las configuraciones de accesibilidad y preferencias del SO del usuario, sin necesidad de permisos especiales. El navegador actúa como intermediario entre el sistema operativo y tu código.

---

## Tabla de referencia completa

### 🎯 Accesibilidad (Soporte: Alto)

| Query | Detecta | Valores | Caso de uso |
|---|---|---|---|
| `prefers-reduced-motion` | Movimiento reducido en el SO | `reduce` \| `no-preference` | Desactiva animaciones, transiciones, autoplay. Critical para a11y. |
| `prefers-color-scheme` | Tema oscuro/claro del SO | `light` \| `dark` | Aplicar paleta de colores acorde al SO. |
| `prefers-contrast` | Contraste elevado requerido | `more` \| `less` \| `no-preference` | Aumentar o disminuir contraste de texto/fondos. |
| `prefers-reduced-transparency` | Transparencias reducidas | `reduce` \| `no-preference` | Reemplazar transparencias por colores sólidos. |
| `forced-colors` | Paleta de colores forzados | `active` \| `none` | Modo alto contraste (Windows), respetar colores del navegador. |

### 📱 Dispositivo & Input (Soporte: Alto)

| Query | Detecta | Valores | Caso de uso |
|---|---|---|---|
| `hover` | Si el dispositivo **principal** soporta hover | `hover` \| `none` | Mostrar tooltips, efectos hover solo en desktop. |
| `pointer` | Tipo de puntero del dispositivo principal | `fine` (mouse) \| `coarse` (touch) \| `none` | Ajustar tamaño de botones, clickables. |
| `any-hover` | Si **algún** input soporta hover | `hover` \| `none` | Diferente a `hover` — detecta si hay mouse aunque sea touchscreen. |
| `any-pointer` | Si **algún** input es puntero | `fine` \| `coarse` \| `none` | Más permisivo que `pointer`. |
| `orientation` | Orientación física | `portrait` \| `landscape` | Layout vertical vs horizontal. |

### 🎨 Color & Pantalla (Soporte: Medio/Experimental)

| Query | Detecta | Valores | Caso de uso |
|---|---|---|---|
| `prefers-color-gamut` | Rango de colores soportado | `srgb` (estándar) \| `p3` (Wide Color Gamut) \| `rec2020` (HDR) | Mostrar imágenes en mayor calidad si la pantalla lo permite. |
| `dynamic-range` | Rango dinámico de brillo | `standard` \| `high` | HDR, contenido de video de alta calidad. |
| `monochrome` | Pantalla monocromática | número (bits por píxel) \| `0` | e-readers, displays especializados. |
| `inverted-colors` | Colores invertidos en el SO | `inverted` \| `none` | Ajustar UI si el usuario invirtió colores. |

### ⚙️ Otras (Soporte: Experimental)

| Query | Detecta | Soporte |
|---|---|---|
| `scripting` | Si JavaScript está habilitado | Muy experimental |
| `update` | Frecuencia de actualización pantalla | Muy experimental |

---

## Ejemplos en CSS

### Desactivar animaciones con reduce-motion

```css
/* Animación normal */
button {
    transition: background 0.3s ease;
}

/* Sin animación si reduce-motion está activo */
@media (prefers-reduced-motion: reduce) {
    button {
        transition: none;
    }
}
```

### Tema oscuro automático

```css
/* Light mode por defecto */
:root {
    --bg: #ffffff;
    --text: #1a1a1a;
}

/* Dark mode si el SO lo tiene activado */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: #1a1a1a;
        --text: #ffffff;
    }
}
```

### Ajustar tamaño de botones por tipo de input

```css
/* Desktop: botones más pequeños */
button {
    padding: 0.5rem 1rem;
}

/* Mobile (touch): botones más grandes */
@media (pointer: coarse) {
    button {
        padding: 1rem 1.5rem;
        min-height: 44px; /* Mínimo recomendado para touch */
    }
}
```

### Contraste elevado

```css
@media (prefers-contrast: more) {
    button {
        border: 2px solid; /* Borde más grueso */
        font-weight: bold; /* Texto más pesado */
    }
}
```

---

## Ejemplos en JavaScript

### Detectar reduce-motion (patrón proyecto-3)

```javascript
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

const updatePreferences = () => {
    if (mediaQuery.matches) {
        // Usuario tiene reduce-motion activo
        // Desactiva animaciones, videos, etc.
    }
}

// Listener para cambios en tiempo real
mediaQuery.addEventListener("change", updatePreferences)

// Cleanup al desmontar componente
return () => {
    mediaQuery.removeEventListener("change", updatePreferences)
}
```

### Detectar tema oscuro y cambiar dinámicamente

```javascript
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")

const updateTheme = () => {
    if (darkModeQuery.matches) {
        document.documentElement.setAttribute("data-theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
    }
}

updateTheme() // Initial
darkModeQuery.addEventListener("change", updateTheme)
```

### Detectar tipo de input (hover disponible)

```javascript
const canHover = window.matchMedia("(hover: hover)").matches
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches

if (!canHover) {
    // Dispositivo sin hover — desactiva tooltips en hover
    // o usa una estrategia alternativa
}

if (isTouchDevice) {
    // Aumenta áreas clickeables
}
```

---

## Tabla de Soporte por Navegador

| Feature | Chrome | Firefox | Safari | Edge | Opera |
|---|---|---|---|---|---|
| `prefers-reduced-motion` | ✅ 74+ | ✅ 63+ | ✅ 10.1+ | ✅ 79+ | ✅ 62+ |
| `prefers-color-scheme` | ✅ 76+ | ✅ 67+ | ✅ 12.1+ | ✅ 79+ | ✅ 62+ |
| `prefers-contrast` | ✅ 96+ | ✅ 101+ | ❌ No | ✅ 96+ | ✅ 82+ |
| `prefers-reduced-transparency` | ✅ 118+ | ✅ 113+ | ❌ No | ✅ 118+ | ✅ 104+ |
| `pointer` / `hover` | ✅ 41+ | ✅ 64+ | ✅ 9+ | ✅ 12+ | ✅ 28+ |
| `prefers-color-gamut` | ✅ 66+ | ✅ 110+ | ❌ No | ✅ 79+ | ✅ 53+ |
| `forced-colors` | ✅ 89+ | ❌ No | ❌ No | ✅ 89+ | ✅ 75+ |

**Nota:** Los dates pueden cambiar — verificar en [caniuse.com](https://caniuse.com) para la info más actual.

---

## Buenas prácticas

1. **Siempre proporciona un fallback** — no todas las media queries tienen soporte universal
2. **`prefers-reduced-motion` es crítica** — es accesibilidad, no decoración
3. **Respeta las preferencias del usuario** — si tiene activado algo en el SO, no lo ignores
4. **Usa `no-preference`** — no todas las queries retornan `true/false`, algunas retornan un valor específico
5. **Testea con DevTools** — F12 → Command Palette → "Emulate CSS media" para emular preferencias sin tocar el SO
6. **Combina queries** — puedes usar `and` / `or` para condiciones múltiples:
   ```css
   @media (prefers-reduced-motion: reduce) and (prefers-color-scheme: dark) {
       /* Dark mode + reduced motion */
   }
   ```

---

## Referencias

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Web.dev: Detecting light/dark mode preference](https://web.dev/articles/prefers-color-scheme)
- [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
