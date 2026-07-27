# Projects Location Policy

Regla de oro: **un proyecto, un solo sitio**. Si un ejercicio crece hasta volverse portfolio, se *mueve* (no se copia).

## Tipos de proyecto

| Tipo | Definición | Ubicación canónica |
|---|---|---|
| Ejercicio de aprendizaje | Drill corto para practicar un concepto del módulo. Vida útil: la sesión + repaso. | `0X-tema/.../proyecto-N/` dentro del módulo correspondiente |
| Proyecto aplicado | Trabajo completo, con README, deploy o intención de portfolio. | `00-portfolio/{stack}/<slug>/` — slug con el nombre del proyecto, nunca numerado |

## Carpetas canónicas para proyectos aplicados

- `00-portfolio/01-react/` — proyectos React + Vite.
- `00-portfolio/02-next/` — proyectos Next.js.
- `00-portfolio/03-bootstrap/` — proyectos Bootstrap (crear cuando haga falta).
- `00-portfolio/04-tailwind/` — proyectos puramente Tailwind/CSS (crear cuando haga falta).

## Carpetas para ejercicios de aprendizaje

- `01-learning/03-css/02-layouts/4-projects/` — drills de layout.
- `01-learning/03-css/03-frameworks/{1-bootstrap,2-tailwind}/proyecto-N/` — drills de cada framework CSS.
- `01-learning/04-javascript/.../proyecto-N/` — drills de JS.
- `01-learning/06-react/projects/proyecto-N/` — drills de React.
- `01-learning/07-nextjs/04-projects/proyecto-N/` — drills de Next.js.

## Reglas

1. **Un proyecto vive en una sola carpeta.** Si necesitas referirte a él desde otro módulo, enlaza con un README de stub, no copies código.
2. **Cuando un drill crece a portfolio**, se *mueve* a `00-portfolio/`. No queda copia detrás.
3. **`package.json.name`** debe coincidir con el nombre de la carpeta padre (o el slug del proyecto si es un nombre real tipo `nexusai-landing`) y debe ser único en todo el repo.
4. **En `00-portfolio/` no hay numeración**: cada carpeta se llama como el proyecto
   (`projex`, `shopreact`, `sport-mindset`…). Para los publicados, el nombre de la
   carpeta coincide además con su ruta en el hosting y con el `path` de la API.
   La numeración `proyecto-N` sobrevive solo en `01-learning/`, donde es local a la
   carpeta padre y el orden sí significa algo (cronología del temario).

   *Por qué:* mientras `00-portfolio/` estuvo numerado, el número de la carpeta, el
   slot publicado y las rutas de los `og:url`/`RewriteBase` se desincronizaron tres
   veces. Un nombre no se desincroniza.
5. **Antes de crear un proyecto nuevo**, correr `scripts/check-duplicate-projects.ps1` para confirmar que el nombre elegido está libre.

## Detección de violaciones

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-duplicate-projects.ps1
```

El script lista names duplicados, names que no coinciden con su carpeta, y proyectos huérfanos.
