# Smart Cooler UI

Interfaz Front-end para la pantalla de un refrigerador inteligente.
Disenada como producto independiente y como modulo para un portfolio 3D (Three.js).

## Demo en vivo

- App web 2D: publicacion pendiente
- Integracion 3D: en progreso

## Problema que resuelve

Cuando una persona sale con prisa, necesita contexto rapido (hora, clima y estado de compras)
sin depender de abrir el telefono.

## Alcance actual (implementado)

- Panel de fecha y hora
- Modo automatico/manual de tiempo
- Cambio de formato 12h/24h
- Clima actual (Open-Meteo)
- Pronostico diario y por hora
- Grid de metricas del clima (UV, humedad, sensacion termica, presion, AQI y UV diario)
- Modulo de inventario de alimentos (crear/eliminar items, seguimiento de vencimiento)
- Lista inteligente de compras basada en inventario + sugerencias de recetas
- Reordenamiento de tarjetas del dashboard persistido en localStorage
- Layout adaptado a mobile (dvh + safe-area)

## Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Icons
- ESLint 9
- APIs de Open-Meteo (clima + calidad del aire)

## Ejecucion local

Requisitos:

- Node.js LTS

Comandos:

1. `npm install`
2. `npm run dev`
3. `npm run lint`
4. `npm run build`
5. `npm run preview`

## Arquitectura (alto nivel)

```txt
src/
  Components/
    layout/
      hardware/
      screens/
        HomeScreens.jsx
        screen_1/
          header/
          main/
          ui/
          features/
            time/
            weather/
            shopping/
        screen_2/
  assets/
```

## Senales tecnicas para portfolio

Este proyecto busca demostrar:

- Arquitectura jerarquica por pantalla (screen-first) con modulos internos por feature
- Hooks personalizados para orquestacion de estado y datos
- Integracion real con APIs y normalizacion de respuesta
- Modelado de estados de UI (loading, empty, error, stale data)
- Persistencia local aplicada a un caso de uso real

## Proximos hitos

- Publicar URL de demo (Vercel/Netlify)
- Agregar tests automaticos para hooks criticos
- Incluir checklist base de accesibilidad (a11y) y navegacion por teclado
- Integrar el modulo como panel interactivo dentro del departamento 3D

## Autor

- LinkedIn: <https://www.linkedin.com/in/nico-villagran/>
