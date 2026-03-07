# React Hooks (Applied)

Este bloque conecta teoria de hooks con implementaciones reales del repo.

## Hooks usados en proyectos

### useState

- Control de pantalla activa en Smart Cooler:
  - `DeviceShell.jsx`
- Estado de formularios y listas:
  - `useInventory.jsx`

### useEffect

- Intervalos de reloj:
  - `useDateTime.jsx`
- Fetch y polling de clima:
  - `useWeather.jsx`
- Sincronizacion con `localStorage`:
  - `useInventory.jsx`, `useRadioPlayer.jsx`

### useMemo

- Datos derivados de inventario:
  - `useInventory.jsx`
- Normalizacion/modelado de datos de clima:
  - `useWeather.jsx`

### useCallback

- Refresh manual estable en clima:
  - `useWeather.jsx`

## Custom hooks de evidencia

- `03-css/03-frameworks/2-tailwind/proyecto-2/src/features/time/hooks/useDateTime.jsx`
- `03-css/03-frameworks/2-tailwind/proyecto-2/src/features/time/hooks/useSettings.jsx`
- `03-css/03-frameworks/2-tailwind/proyecto-2/src/features/weather/hooks/useWeather.jsx`
- `03-css/03-frameworks/2-tailwind/proyecto-2/src/features/music/hooks/useRadioPlayer.jsx`
- `03-css/03-frameworks/2-tailwind/proyecto-2/src/features/inventory/hooks/useInventory.jsx`

## Nota

Mantengo `README-react-hooks-pareto.md` como referencia teorica de priorizacion.
Este archivo es la capa aplicada al codigo real.
