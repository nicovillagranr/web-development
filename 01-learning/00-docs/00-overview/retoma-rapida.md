# Retoma Rapida

Guia corta para volver al repo despues de semanas o meses sin tocar un tema.

## Flujo de 10 Minutos

1. Ejecuta el chequeo estructural:
   `powershell -ExecutionPolicy Bypass -File scripts/repo-health.ps1`
2. Revisa `README.md` (raiz) para contexto global.
3. Entra al modulo que quieres retomar y lee su `README`.
4. Abre una practica concreta y ejecutala localmente.
5. Registra lo aprendido en `session-log.md`.

## Si Olvidaste X, Ve Aqui

- Git base: `01-learning/01-git/00-fundamentals/fundamentos-git.md`
- HTML semantico: `01-learning/02-html/03-guides/README.md`
- CSS arquitectura: `01-learning/03-css/01-architecture/README.md`
- JS DOM: `01-learning/04-javascript/02-dom/`
- JS async: `01-learning/04-javascript/04-async/`
- React hooks: `01-learning/06-react/02-hooks/`
- Docker compose: `01-learning/09-docker/03-compose/flujo-compose.md`

## Regla de Continuidad

Cada sesion debe terminar con 3 lineas en la bitacora:

- que estudiaste
- que te falto
- siguiente paso exacto
