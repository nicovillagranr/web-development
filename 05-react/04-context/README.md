# React Context

Este modulo define la teoria y el plan para estado global con Context API.

## Estado actual del repo

- Aun no hay implementacion de `createContext` en proyectos activos.
- Hoy la mayoria del estado esta en hooks y se propaga por props.

## Cuándo usar Context

Usalo cuando varios niveles de componentes necesitan el mismo estado y aparece prop drilling.

## Patron recomendado

1. Crear `SomeContext` + `SomeProvider`
2. Exponer un hook `useSomeContext()`
3. Mantener estado y acciones dentro del provider
4. Consumir solo donde aporta valor

## Candidato real para refactor

Smart Cooler podria extraer un `SettingsContext` para:

- estado de hora/formato
- ubicacion de clima
- preferencias globales de UI