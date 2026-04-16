# Smart Cooler UI

Interfaz front-end para la pantalla de un refrigerador inteligente.

## Objetivo

Aplicar arquitectura de componentes, estado local y estilos utilitarios en una UI funcional de producto.

## Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Icons
- ESLint 9
- Open-Meteo API

## Alcance implementado

- fecha y hora con modo automatico y manual
- clima actual y pronostico diario/horario
- metricas de clima (UV, humedad, sensacion termica, presion, AQI)
- inventario de alimentos
- lista de compras inteligente
- reordenamiento de tarjetas persistido en localStorage
- pantalla secundaria (`screen_2`) como prototipo visual

## Arquitectura resumida

- `screen_1`: funcional, con features activas
- `screen_2`: demostracion visual lista para evolucion funcional
- organizacion modular por `layout`, `ui` y `features`

## Checklist de validacion

- [ ] estado consistente entre tarjetas y modales
- [ ] degradacion controlada ante error de API
- [ ] persistencia local sin corrupcion de datos
- [ ] responsive estable en el contenedor principal

## Ejercicio propuesto

Implementar una card nueva de consumo energetico diario usando la misma arquitectura de `Card` y mantener persistencia de orden en dashboard.

## Solucion esperada

- nueva card integrada sin romper cards existentes
- logica desacoplada en su propio hook/componente
- comportamiento coherente con el sistema visual actual

## Scripts

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run preview`
