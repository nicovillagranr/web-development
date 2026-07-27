# Layer 04: Scalability

## Objetivo

Preparar CSS para crecer sin degradar mantenimiento.

## Riesgos comunes

- reglas globales invasivas
- especificidad creciente
- sobreuso de `!important`
- acoplamiento entre pantallas

## Practica minima

1. Reorganizar un proyecto en capas.
2. Reducir selectores excesivos.
3. Estandarizar breakpoints.
4. Documentar decisiones de arquitectura.

## Checklist

- [ ] nuevo componente no obliga a tocar multiples archivos sin razon
- [ ] cambios visuales locales no generan regresiones globales
- [ ] responsive consistente con sistema de breakpoints
