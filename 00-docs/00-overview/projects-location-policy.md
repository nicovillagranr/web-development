# Projects Location Policy

Regla de oro: **un proyecto, un solo sitio**. Si un ejercicio crece hasta volverse portfolio, se *mueve* (no se copia).

## Tipos de proyecto

| Tipo | Definición | Ubicación canónica |
|---|---|---|
| Ejercicio de aprendizaje | Drill corto para practicar un concepto del módulo. Vida útil: la sesión + repaso. | `0X-tema/.../proyecto-N/` dentro del módulo correspondiente |
| Proyecto aplicado | Trabajo completo, con README, deploy o intención de portfolio. | `08-projects/{stack}/proyecto-N/` o `08-projects/{stack}/<slug>/` |

## Carpetas canónicas para proyectos aplicados

- `08-projects/01-react/` — proyectos React + Vite.
- `08-projects/02-next/` — proyectos Next.js.
- `08-projects/03-bootstrap/` — proyectos Bootstrap (crear cuando haga falta).
- `08-projects/04-tailwind/` — proyectos puramente Tailwind/CSS (crear cuando haga falta).

## Carpetas para ejercicios de aprendizaje

- `03-css/02-layouts/4-projects/` — drills de layout.
- `03-css/03-frameworks/{1-bootstrap,2-tailwind}/proyecto-N/` — drills de cada framework CSS.
- `04-javascript/.../proyecto-N/` — drills de JS.
- `06-react/projects/proyecto-N/` — drills de React.
- `07-nextjs/04-projects/proyecto-N/` — drills de Next.js.

## Reglas

1. **Un proyecto vive en una sola carpeta.** Si necesitas referirte a él desde otro módulo, enlaza con un README de stub, no copies código.
2. **Cuando un drill crece a portfolio**, se *mueve* a `08-projects/`. No queda copia detrás.
3. **`package.json.name`** debe coincidir con el nombre de la carpeta padre (o el slug del proyecto si es un nombre real tipo `nexusai-landing`) y debe ser único en todo el repo.
4. **Numeración `proyecto-N`** es local a la carpeta padre. `06-react/projects/proyecto-2` y `08-projects/01-react/proyecto-2` son válidos como entidades distintas, pero su `name` interno debe distinguirlos.
5. **Antes de crear un proyecto nuevo**, correr `scripts/check-duplicate-projects.ps1` para confirmar que el nombre elegido está libre.

## Detección de violaciones

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-duplicate-projects.ps1
```

El script lista names duplicados, names que no coinciden con su carpeta, y proyectos huérfanos.
