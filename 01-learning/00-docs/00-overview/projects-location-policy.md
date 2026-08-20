# Projects Location Policy

Regla de oro: **un proyecto, un solo sitio**. Si un ejercicio crece hasta volverse portfolio, se *mueve* (no se copia).

## Tipos de proyecto

| Tipo | Definición | Ubicación canónica |
|---|---|---|
| Ejercicio de aprendizaje | Drill corto para practicar un concepto del módulo. Vida útil: la sesión + repaso. | `0X-tema/.../proyecto-N/` dentro del módulo correspondiente |
| Proyecto aplicado | Trabajo completo, con README, deploy o intención de portfolio. | `00-portfolio/{stack}/{portfolio\|privados}/NN-<slug>/` — `NN` ordena por dificultad, el slug identifica |

## Carpetas canónicas para proyectos aplicados

**Todas** las carpetas de stack se dividen en las mismas dos, con el mismo criterio:

- `portfolio/` — **el escaparate**: los proyectos publicados, es decir, los que están
  en la API *y* respondiendo en el dominio. Nada más entra aquí.
- `privados/` — todo lo demás: trabajo en curso, práctica que ya cumplió y archivo histórico.

`portfolio/` solo se crea donde hay algo que la cumpla. Un stack cuyos proyectos no estén
publicados tiene solo `privados/`; la carpeta vacía no se deja puesta esperando.

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
3. **`package.json.name`** debe coincidir con el **slug** de la carpeta —el nombre sin el
   `NN-` que lo ordena— y ser único en todo el repo. Se admite el nombre real del producto
   cuando la marca no es el slug: `02-shopreact` declara `nova-fashion`, que es lo que se
   ve en la interfaz. Lo que no vale es un nombre heredado de una numeración muerta;
   `react-portfolio-3` en `03-projex` es deuda pendiente, no el patrón a seguir.
4. **En `00-portfolio/` las carpetas van numeradas por dificultad técnica**, dentro de
   cada `portfolio/` y cada `privados/`: `NN-slug`, del más difícil al más simple
   (`01-store-pulse`, `02-smart-cooler-ui`, `03-projex`…). El número ordena; **el slug
   es lo que identifica** y es el que coincide con la ruta publicada y con el `path`
   de la API: `01-react/portfolio/03-projex/` se publica en `/projex/`, no en
   `/03-projex/`. En `01-learning/` sigue viva la numeración `proyecto-N`, que ahí
   significa otra cosa: cronología del temario.

   *Por qué el número:* la lista deja de ser alfabética y pasa a decir algo. Quien abre
   la carpeta ve primero lo más difícil, que es lo que quiero que mire primero.

   *Riesgo asumido, y cómo se contiene:* la numeración de `00-portfolio/` ya se
   desincronizó tres veces del slot publicado y de las rutas `og:url`/`RewriteBase`,
   y por eso se había eliminado. Ahora se vuelve a usar **con una diferencia**: el
   número no participa de ninguna URL. El `base` de Vite, el `path` de la API y los
   `og:url` van por el slug, así que renumerar no puede romper el sitio. Lo único que
   sí rompe es el **`repo` de la API**, que lleva la ruta completa de GitHub — ver la
   regla 6. Reordenar por dificultad obliga a repasar ese campo.

5. **En `portfolio/` solo hay proyectos publicados.** Un proyecto entra cuando cumple
   las dos condiciones a la vez: **está en la API** (`/projects`) y **responde en el
   dominio**. Si falta cualquiera de las dos vive en `privados/`, por bueno que sea el
   código; y en cuanto las cumple, se mueve. Las dos se comprueban con un `curl`, no de
   memoria.

   **El criterio es el mismo para todos los stacks**, no solo para React. Que un proyecto
   merezca el escaparate es una decisión previa y mía; lo que la hace efectiva es
   publicarlo — subirlo al dominio y darlo de alta en la API. Hasta que eso pasa, el
   proyecto está en `privados/` aunque yo ya haya decidido que es bueno.

   *Por qué:* antes esto eran dos ejes separados —la carpeta decía una intención
   («quiero que alguien lo mire») y el ✅ decía un hecho— y discreparon en las dos
   direcciones a la vez: `sport-mindset` estaba en el escaparate sin desplegar, y
   `store-pulse` figuraba como privado mientras se servía en el dominio y aparecía en
   la API. Con un solo eje, y verificable, no queda nada que sincronizar a mano.

6. **Mover un proyecto entre `portfolio/` y `privados/` no cambia su URL.** El `base`
   está escrito literal en cada `vite.config` (`base: '/projex/'`), así que la carpeta
   y la ruta publicada solo están unidas por esta convención, no por código. Al mover
   algo, revisa a mano que `base`, el `path` de la API, el **`repo` de la API** y el
   enlace del README sigan diciendo lo mismo — el `repo` apunta a la ruta completa
   dentro de GitHub, así que es el único que se rompe con un cambio de carpeta.
7. **Antes de crear un proyecto nuevo**, correr `scripts/check-duplicate-projects.ps1` para confirmar que el nombre elegido está libre.

## Detección de violaciones

```powershell
powershell -ExecutionPolicy Bypass -File scripts/check-duplicate-projects.ps1
```

El script lista names duplicados, names que no coinciden con su carpeta, y proyectos huérfanos.
