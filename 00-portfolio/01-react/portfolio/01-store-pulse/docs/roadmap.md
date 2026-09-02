# Roadmap del rediseño

> Escrito el **27 ago 2026**, al incorporar el design handoff de Claude Design.
> Cada etapa lleva los cuatro campos que pide el §25 del documento de origen:
> **objetivo · implementación · tests · criterio de cierre.**

---

## ⚠ "Etapa" no es lo mismo que "Fase"

El documento de origen numera **Fases** (0 a 9), y esas referencias están escritas dentro de los
comentarios del código: `"el importador de la Fase 6"`, `"la Fase 7 —cambiar mocks por la API
real—"`, `"la autenticación entra en la Fase 9"`.

Este documento numera **Etapas** (1 a 12), que es otra cosa: el trabajo de incorporar el rediseño.

**No se corresponden y no hay que mezclarlas.** Si un comentario del código dice "Fase", habla del
documento de origen. Si algo dice "Etapa", habla de aquí.

---

## De dónde salió esto

El 27 ago 2026 llegó un **design handoff de Claude Design**: 4 artboards `.dc.html` + un README de
27 KB. No es código para portar — lo dice el propio handoff— sino una referencia de alta fidelidad a
recrear.

**Dónde vive** (fuera del repo): `Store Pulse Pickers App.zip`, en Descargas.
**Archivo canónico**: `Store-Pulse.dc.html`. Los otros tres (Calma, Consola, Neon) son exploraciones
estéticas y están marcados como _no implementar_.

### Decisiones tomadas al aprobar (no re-preguntar)

| Decisión             | Elección                                                             |
| -------------------- | -------------------------------------------------------------------- |
| **Datos**            | Nombres reales en local (git los ignora), ficticios en el commit     |
| **Requisito de 400** | **Duro**: por debajo de 400 no hay bono, sin importar las 3 métricas |
| **Estética**         | La canónica, `Store-Pulse.dc.html`                                   |

### El principio que gobierna el rediseño

**El diseño manda en la pantalla; el motor existente manda en los números.**

El prototipo trae `states`, `bonus`, `score`, `rank` y `recs` precocidos dentro de cada picker. Eso
es un _view model_: se deriva con selectores desde el `Dataset`, no se guarda. Y el prototipo no
tiene concepto de período — el §11 (histórico) sí lo exige, y ya existe en `src/data/types.ts`.

**Se conserva** `src/metrics/` y `src/data/`. **Se reemplaza** `src/components/`, `src/features/` y
`App.css`.

---

## ✅ Etapa 1 — Blindaje de datos · CERRADA (27 ago 2026)

**Objetivo.** Que los nombres reales del local no puedan llegar a GitHub ni al despliegue, dado que
se eligió tenerlos en la máquina de desarrollo.

**Implementación.**

| Archivo                             | Qué hace                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `src/mocks/report.ts`               | Capa **RAW** del §16: 30 filas × 20 columnas, con nombres de relleno       |
| `src/mocks/roster.ts`               | Decide qué nombres se usan; rama privada cortada con `import.meta.env.DEV` |
| `src/mocks/roster.private.ts`       | Los 30 nombres reales. **Ignorado por git**                                |
| `scripts/check-no-private-data.mjs` | Corre tras `pnpm build`; busca cada nombre privado dentro de `dist/`       |

Tres barreras, a propósito: `.gitignore` protege del `git add .`, la guarda `DEV` protege del
despliegue, y el script protege de que las dos anteriores fallen **en silencio**.

En `report.ts`, la aridad de las filas la comprueba el compilador con una tupla mapeada: si el
reporte trae una columna nueva y se añade a `REPORT_COLUMNS` sin tocar las 30 filas, no compila. El
descuadre sale en el build y no en pantalla como una columna corrida un puesto.

**Tests.** 8 en `src/mocks/roster.test.ts`, escritos para pasar **con y sin** el archivo privado
presente: ninguno comprueba un nombre concreto (eso sería meter un dato real en un archivo
versionado), sino la propiedad que se cumple en los dos casos — _los nombres pueden cambiar, las
cifras no_.

**Criterio de cierre — cumplido y verificado.** Se montó una build aislada que **sí** importa
`roster.ts`: los nombres de relleno aparecen en el bundle (o sea, el módulo entró de verdad) y aun
así no queda ni un nombre real, ni la cadena `roster.private`, ni el `import()` dinámico. Rollup
elimina la rama entera. 90 tests en verde, typecheck y lint limpios, `git status` sin rastro del
archivo privado.

---

## Frontend

### Etapa 2 — Fusión del catálogo de métricas

**Objetivo.** Un solo catálogo que sirva a los dos modelos. El actual tiene `direction` y una
escalera de `Tier` con ratio normalizado; el diseño tiene tres números por métrica (`target` /
`goal` / `superAt`), `priority` 1–3 y seis estados.

**Implementación.** Ampliar `src/metrics/types.ts` y `definitions.ts` con `priority`, las bandas y
los estados `wait` / `nogoal` / `prog`. Incorporar las columnas del reporte que hoy no están en el
registro. Las bandas confirmadas por operaciones:

| Métrica           | Supera   | Logra         | No logra |
| ----------------- | -------- | ------------- | -------- |
| Partial Orders    | < 0,38 % | 0,38 – 1,54 % | > 1,54 % |
| Inaccuracy        | < 1,93 % | 1,93 – 3,58 % | > 3,58 % |
| Item Picking Time | < 20 s   | 20 – 39,8 s   | > 39,8 s |

**Tests.** Cada banda en sus tres fronteras (justo debajo, justo encima, exacto). Métrica sin meta →
`nogoal`. Valor `null` → `wait`. Regla de volumen mínimo: con `orders < 40`, **todas** las métricas
pasan a `wait`.

**Criterio de cierre.** Añadir una métrica al registro la hace aparecer en la UI sin tocar ningún
componente. Ninguna métrica nueva rompe un test existente.

---

### Etapa 3 — Reglas de negocio aisladas

**Objetivo.** Que el bono, el ranking y la frescura sean funciones puras, testeables sin React y
reemplazables sin tocar pantalla. Es lo que el §5 pide ("la lógica de negocio debe vivir en Backend")
y lo que permite mover el archivo tal cual cuando el backend exista.

**Implementación.** `src/metrics/bonus.ts`, `score.ts`, `freshness.ts`.

El bono, **con el requisito de 400 como duro** (decisión tomada):

```
alguna métrica en 'wait' o 'nogoal' → En curso            · monto "—"
orders < 400                        → Sin bono            · $ 0   ← requisito duro
alguna en 'no'                      → No logra            · $ 0
3 en 'super'                        → Supera ampliamente  · $ 60.000
2 en 'super'                        → Supera              · $ 30.000
resto (0 o 1 en 'super')            → Logra               · $ 0
```

El orden de las reglas importa y es parte del contrato: el requisito de 400 se evalúa **antes** que
las métricas, para que nunca se muestre "SUPERA · $30.000" encima de un requisito sin cumplir.

`computeScore` queda aislado a propósito: la fórmula del §10 es provisional.

**Tests.** Los cinco resultados del bono. La frontera de 400 (399 / 400 / 401) y la condición
configurable `gte` / `gt`. El escenario _mes reseteado_: **nadie puede aparecer en rojo por falta de
datos**. Frescura: 0 días → "hoy", 1 → "ayer", 2 → nivel 0, 3 → nivel 1, 5 → nivel 2.

**Criterio de cierre.** Cambiar la fórmula del ranking toca **un solo archivo** y ningún test de
bono. Los tres módulos no importan React ni nada de `src/data/`.

---

### Etapa 4 — Normalización RAW → Dataset

**Objetivo.** Cerrar el circuito del §16: `report.ts` (RAW) → normalización → `Dataset`
(`Period` / `Subject` / `MetricSnapshot`), validado con los schemas Zod que ya existen.

**Implementación.** Un normalizador que mapee las 20 columnas del reporte a los `MetricId` del
registro, convierta unidades y descarte las columnas que llegan vacías. Reemplazar `mockDataSource`
para que sirva este dataset.

**Decisión pendiente.** `src/mocks/generate.ts` (el generador sintético) sirve para el escenario
_mes reseteado_ que el handoff pide conservar. Decidir si sobrevive junto al reporte real o se
sustituye. **No resolver sin preguntar.**

**Tests.** El `Dataset` resultante pasa `DatasetSchema`. Un `null` del reporte no se convierte en 0.
El invariante `assignment + picking + packaging = prep_time` avisa en la fila que descuadra —y **sólo**
en esa (ver `docs/analisis-reporte-pdf.md`).

**Criterio de cierre.** Ningún componente importa `report.ts`; todos pasan por `DataSource`.

---

### Etapa 5 — Tokens y armazón

**Objetivo.** El esqueleto visual del diseño: 4 pestañas, header, barra de frescura, área segura.

**Implementación.** `src/styles/tokens.css` con los tokens del artboard canónico (tema claro y
oscuro, 6 paletas, 3 modos de daltonismo Okabe-Ito, alto contraste). `AppShell`, `BottomNav`,
`FreshnessBar`. Rutas: Equipo / Local / Ranking / Configuración, entrando por Equipo.

**Ojo con la regla de contraste del handoff:** `--accent`, `--cyan` y `--bad` son para rellenos y
trazos; para **texto** van siempre `--accent-text`, `--cyan-text` y `--bad-text`. Ignorarlo rompe la
legibilidad en tema claro.

**Tests.** El modo daltonismo manda sobre la paleta elegida. Las preferencias persisten en
`localStorage`. `aria-current="page"` en la pestaña activa.

**Criterio de cierre.** Sin scroll horizontal entre 320 y 560 px. Todo control ≥ 44 px.

---

### Etapa 6 — Equipo + detalle del picker

**Objetivo.** Las dos pantallas centrales del §3.

**Implementación.** Grid de 2 columnas, buscador, la fila de 4 filtros (`Todos` · `Rumbo al bono` ·
`Por mejorar` · `Meta 400` — los nombres son deliberados, **no** usar "Con bono" ni "En riesgo"),
anillo doble de progreso, métricas por prioridad, panel de resultado, recomendaciones, gráfico
histórico con crosshair.

**Tests.** La búsqueda se combina con el filtro activo. El orden alfabético por nombre de pila es
estable en todos los filtros. Un picker sin datos muestra "—" y nunca 0.

**Criterio de cierre.** El panel de resultado y el requisito de 400 **nunca se contradicen** en
pantalla. La sección de Prioridad 3 vacía muestra "A la espera de datos", no un hueco.

---

### Etapa 7 — Local, Ranking y Configuración

**Objetivo.** Las tres pantallas restantes.

**Implementación.** Local: objetivos del mes con marca de meta, evolución semanal, y la nota honesta
de que la fórmula de agregación se define en backend. Ranking: podio sobrio, lista, bono pagado del
mes anterior, desglose de pesos. Configuración: tema, tamaño de texto, paleta, daltonismo, contraste,
origen de los datos.

**Ojo con el §9:** las métricas del local **no se agregan todas igual**. Orders acumula; los
porcentajes y tiempos se muestran como promedio semanal, y eso hay que decirlo en pantalla mientras
la fórmula definitiva no exista. Merma es exclusiva del local.

**Tests.** La dirección de la métrica se respeta en flechas y colores (bajar es mejorar en los
tiempos). Las metas del local **no** se mezclan con las bandas individuales del bono.

**Criterio de cierre.** Ninguna cifra agregada se muestra sin decir cómo se agregó.

---

### Etapa 8 — PWA, accesibilidad y README

**Objetivo.** Cerrar el frontend presentable.

**Implementación.** Manifest, service worker, iconos, offline. Repasar el §24: el README explica
problema, solución, arquitectura y decisiones, sin datos reales.

**Tests.** Todo estado se comunica con icono + texto + color, nunca sólo color. Jerarquía real de
encabezados. `prefers-reduced-motion` desactiva las animaciones.

**Criterio de cierre.** `pnpm build` pasa, incluido `check-no-private-data`. La app instala y abre
sin conexión.

---

## Backend

### Etapa 9 — Comparativa de arquitectura

**Objetivo.** Elegir el stack **explicándolo**, no dándolo por hecho. El §25 pide que el
desarrollador pueda defender la arquitectura en una entrevista.

**Implementación.** Comparar alternativas para recepción de PDF, extracción, persistencia y API.
Hay una elección previa anotada en memoria (Vercel Functions + Postgres/Neon + Prisma + Zod) que
**hay que revalidar**, no heredar: se tomó antes de saber que la fuente sería PDF y no Excel.

**Criterio de cierre.** Un documento con las alternativas, la elegida y **por qué**, incluyendo qué
se pierde con ella.

---

### Etapa 10 — Parser de PDF

**Objetivo.** Convertir el PDF en filas estructuradas, de forma reproducible.

**Implementación.** Extracción con `pdftotext -raw -enc UTF-8` (ver `docs/analisis-reporte-pdf.md`
para el porqué de cada bandera) y las **tres trampas ya identificadas**: el nombre pegado al número,
el nombre que salta de línea, y la cabecera partida en tres.

**Tests.** Las tres trampas, cada una con su caso. Un `-` produce `null` y nunca 0. Un PDF con
columnas distintas **falla**, no adivina.

**Criterio de cierre.** El parser reproduce exactamente las 30 filas de `report.ts` a partir del PDF
de origen.

---

### Etapa 11 — Validación, persistencia e idempotencia

**Objetivo.** Que un PDF mal procesado no pueda sobrescribir datos correctos (§15).

**Decisión bloqueante.** El PDF **no trae fecha ni período en ninguna parte**, así que la clave de
idempotencia del §17 no puede salir de su contenido. Las tres salidas están planteadas y comparadas
en `docs/analisis-reporte-pdf.md`; la recomendada es que el período se aporte en la carga.

**Tests.** El mismo documento cargado dos veces no duplica. Una extracción incompleta falla de forma
segura y deja registro. Valores imposibles se rechazan.

**Criterio de cierre.** No existe ninguna ruta por la que un PDF defectuoso deje la base en un
estado peor que antes de subirlo.

---

### Etapa 12 — API y sustitución del mock

**Objetivo.** Que el frontend deje de usar mocks sin que cambie ni un componente.

**Implementación.** Endpoints del §19. Sustituir la implementación de `DataSource` — que existe
justamente para que esto sea cambiar un archivo.

**Criterio de cierre.** Cambiar de mock a API real toca `src/data/dataSource.ts` y nada más.

---

## Orden recomendado

Las etapas 2 y 3 son las que más conviene hacer con calma: son puras, se prueban aisladas y es donde
vive la regla del bono. Son también las que mejor se explican en una entrevista.
