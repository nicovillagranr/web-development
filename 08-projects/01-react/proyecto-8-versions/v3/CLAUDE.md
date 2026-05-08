# CLAUDE.md — proyecto-4

## Qué es
UI simulada de un refrigerador inteligente (Smart Cooler). Pantalla táctil con gestión de inventario de alimentos, hora/clima configurable y panel de sistema. Sin backend — todo el estado vive en localStorage.

## Stack
| Tecnología | Versión |
|---|---|
| React | 19 |
| Tailwind CSS | v4 (plugin Vite) |
| Vite | 7 |
| react-icons | v5 |

Sin router. Sin state manager externo (Redux, Zustand, etc.).

## Scripts
```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run preview   # previsualizar build
npm run lint      # ESLint
```

Base URL de producción: `/proyecto-4/`

## Arquitectura

**Feature-first.** Cada dominio es autocontenido en `src/features/<feature>/`.

```
src/
├── shell/          # DeviceShell (orquestador) + HomeScreens (carrusel)
├── screens/        # screen-1 (HomePanel + widgets + header) | screen-2 (SystemPanel)
├── features/       # inventory | time | weather  →  components / hooks / utils / constants
├── ui/             # componentes globales reutilizables (ej: SettingsHeader)
└── assets/         # fonts, icons/weather, styles/App.css
```

**State machine en DeviceShell:**
`activeScreen` (`null` | `"time"` | `"weather"` | `"recipe"`) controla qué panel de ajustes se muestra. Los paneles se montan siempre y se muestran/ocultan con `translate-x` (transición CSS).

**Carrusel en HomeScreens:**
2 pantallas con scroll horizontal snap. `useDateTime` se llama UNA SOLA VEZ aquí y se pasa como prop `time` hacia abajo.

## Aliases de Vite/jsconfig
| Alias | Ruta |
|---|---|
| `@shell` | `src/shell` |
| `@features` | `src/features` |
| `@screen1` | `src/screens/screen-1` |
| `@screen2` | `src/screens/screen-2` |
| `@ui` | `src/ui` |
| `@assets` | `src/assets` |

## Colores (Tailwind)
| Token | Hex | Uso |
|---|---|---|
| `surface` | `#27313A` | fondos de cards/formularios |
| `dark` | `#1F2933` | fondo base del dispositivo |
| `light` | `#F9FAFB` | texto claro |
| `accent` | `#22C55E` | verde principal (foco, botones activos) |

## Variables CSS (App.css)
```css
--accent:        #22C55E
--accent-dim:    rgba(34, 197, 94, 0.12)
--glass-dark:    rgba(39, 49, 58, 0.92)   /* fondo modales/wizard */
--glass-border:  rgba(255, 255, 255, 0.10)
```

## Animaciones CSS
Usar las clases ya definidas en App.css — no agregar librerías de animación:
- `.card-enter` — entrada de tarjetas (opacity + translateY, 0.35s)
- `.wizard-enter` — slide-up del WizardModal (translateY desde abajo, 0.28s)

## Convenciones de código

**Nombres:**
- Componentes: `PascalCase.jsx`
- Hooks: `useCamelCase.jsx`
- Utils/constantes: `camelCase.js`
- Directorios de feature: `kebab-case`

**Props:**
- Callbacks: `onXxx` (ej: `onBack`, `onOpenWeatherSettings`)
- Booleanas de control: `isXxx` (ej: `isActive`, `isOpen`)

**Bloque de encabezado en cada archivo:**
```js
// ================= CONTEXTO MODULO =================
// Descripción de responsabilidad
// ================= IMPORTS =================
// ================= [CONSTANTS | HOOK | COMPONENT] =================
```

## Patrones de estado
- **Persistencia:** `localStorage` directo en hooks (`useInventory`, `useSettings`)
- **Comunicación cross-component:** `CustomEvent` (`smart-cooler:inventory-updated`)
- **Settings globales:** `useSettings` en `DeviceShell` — pasa props hacia abajo, no Context

## Tailwind v4 — sintaxis correcta

**Este proyecto usa Tailwind v4.** Varias utilidades de v3 están obsoletas y VSCode las marca en amarillo. Usar siempre la sintaxis v4:

**Gradientes:**
```
// MALO (v3)          bg-gradient-to-r from-slate-900 to-slate-800
// BUENO (v4)         bg-linear-to-r from-slate-900 to-slate-800

// Arbitrario — sigue siendo válido:
bg-[linear-gradient(145deg,#0D111E_0%,#0A0F1A_100%)]
```

**Opacidad de color** — usar siempre el modificador `/`:
```
// MALO  bg-opacity-50  text-opacity-75  border-opacity-10
// BUENO bg-white/50    text-white/75    border-white/10
```

**Sombras con color:**
```
// MALO   shadow-lg shadow-black/50  (sintaxis v3 separada)
// BUENO  shadow-[0_4px_24px_rgba(0,0,0,0.5)]  (arbitrario) o shadow-black/50
```

**Bordes:**
```
// MALO   border border-white border-opacity-10
// BUENO  border border-white/10
```

## Qué NO hacer
- No agregar imágenes a `src/assets/images/` — directorio eliminado intencionalmente (peso innecesario)
- No usar `Header.jsx` (`src/screens/screen-1/header/Header.jsx`) — dead code, reemplazado por `TopBar` y `Nav` directos
- No instalar Framer Motion ni otras librerías de animación — las animaciones van en App.css
- No instalar routers — la navegación es un state machine local (`activeScreen`)
- **Al hacer commits, nunca incluir `.env`** — asegurarse de que esté en `.gitignore` antes de subir
