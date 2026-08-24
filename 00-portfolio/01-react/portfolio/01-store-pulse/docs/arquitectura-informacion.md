# Arquitectura de información

> Fase 1. Se escribe **antes** de la UI, y la regla que la gobierna es una:
> **cada bloque de pantalla existe para responder una pregunta concreta.**
> Si un bloque no tiene pregunta, no entra. Si dos bloques responden la misma, sobra uno.

---

## Navegación

Tres niveles de información, **dos pestañas**:

```
┌─────────────────────────────┐
│                             │
│      contenido              │
│                             │
├─────────────────────────────┤
│    Equipo   │    Local      │   ← tab bar inferior (pulgar)
└─────────────────────────────┘
```

| Ruta                | Nivel | Pantalla           |
| ------------------- | ----- | ------------------ |
| `/`                 | —     | rebota a `/equipo` |
| `/local`            | 1     | Local              |
| `/equipo`           | 2     | Equipo             |
| `/equipo/:workerId` | 3     | Trabajador         |

**Por qué la app abre en el equipo y no en el local.** Se abre antes de un turno, y lo primero
que se quiere ver es cómo va la gente; el local es el contexto, no la pregunta de entrada. `/` no
renderiza nada: rebota a `/equipo` para que el detalle de una persona pueda seguir colgando de
`/equipo` y marcando su pestaña.

**Por qué dos pestañas y no tres.** El Nivel 3 es el detalle de _una persona concreta_, así que no
puede ser una pestaña hasta que la app sepa quién eres — y eso llega con la autenticación (Fase 9).
Hasta entonces se alcanza pulsando a alguien en el ranking, que es navegación honesta: se entra desde
donde estaba la persona.

Cuando exista la auth, el Nivel 3 gana una tercera pestaña ("Yo") **sin cambiar la pantalla**: es la
misma vista con el `workerId` de la sesión en vez del de la URL.

La tab bar va abajo porque la app se usa de pie, con una mano, en un local. Todo lo pulsable vive en
el tercio inferior.

---

## Nivel 1 — Local (`/`)

> **Pregunta de la pantalla: ¿cómo va el local esta semana?**

| Bloque                     | Pregunta que responde                         |
| -------------------------- | --------------------------------------------- |
| **Cabecera de período**    | ¿De cuándo son estos datos y son de fiar?     |
| **Indicadores clave**      | ¿Cómo vamos en lo que importa, de un vistazo? |
| **Cumplimiento**           | ¿Qué estamos cumpliendo y qué no?             |
| **Evolución**              | ¿Vamos a mejor o a peor?                      |
| **Composición de calidad** | Cuando algo sale mal, ¿qué sale mal?          |

### Cabecera de período

```
Semana 33 · 11–17 de agosto
🟢 Actualizado el lunes 17, 08:32
```

No es decoración. El §18 lo pide explícitamente y además es la única defensa contra el peor fallo
posible de esta app: **que alguien tome una decisión con datos de hace tres semanas creyendo que son
de hoy.** Tres estados: fresco, con retraso, y "sin conexión, viendo lo último guardado".

### Indicadores clave

Rejilla de 2 columnas. Cada tarjeta: valor grande, unidad, comparación con el período anterior y —si
la métrica tiene objetivo— su estado.

```
┌──────────────────┬──────────────────┐
│ Pedidos          │ Prep             │
│ 1.243            │ 6,91 min         │
│ ▲ 4,2% vs W32    │ ▼ 3,1% vs W32 🟢 │
└──────────────────┴──────────────────┘
```

**La flecha y el color son cosas distintas y no hay que confundirlas.** La flecha dice hacia dónde se
movió el número; el color dice si eso es bueno. En el tiempo de preparación el número baja (▼) y eso
es una mejora (verde). Es exactamente el §6 del documento y el motivo de que `direction` exista.

### Cumplimiento de objetivos

Lista compacta, una fila por métrica con objetivo: nombre, actual, objetivo, estado. Ordenada
poniendo primero lo que no se cumple — quien abre la app a las 8:30 quiere ver el problema, no
felicitarse.

### Evolución

Un gráfico de línea, con **una** métrica seleccionable. No cinco líneas a la vez: en 375 px de ancho,
cinco series son ruido.

### Composición de calidad

Barras apiladas: producto mal o faltante / pedido mal o no entregado / calidad de producto. Responde
de qué se compone el total de incidencias, que es lo accionable — el total a secas no dice qué
arreglar.

---

## Nivel 2 — Equipo (`/equipo`)

> **Pregunta de la pantalla: ¿cómo estamos unos respecto a otros, y quién necesita apoyo?**

| Bloque                    | Pregunta que responde                |
| ------------------------- | ------------------------------------ |
| **Selector de orden**     | ¿Según qué estoy mirando esta lista? |
| **Búsqueda**              | ¿Dónde está una persona concreta?    |
| **Lista rankeada**        | ¿Cómo se reparte el rendimiento?     |
| **Referencia del equipo** | ¿Qué es "normal" aquí?               |

### Selector de métrica de orden

```
Ordenado por:  [ Tiempo de picking ▾ ]
```

Visible y siempre presente, no escondido en un menú. El §17 avisa de que no existe un ranking
universal, y una lista ordenada sin decir por qué es una lista que se malinterpreta.

### Lista rankeada

Una fila por persona: nombre, barra proporcional, valor, y variación respecto al período anterior.
Toda la fila es pulsable → Nivel 3.

### Referencia del equipo

La **mediana** del equipo, marcada sobre las barras.

Es una decisión de producto, no técnica: un ranking desnudo de personas convierte una herramienta de
consulta en una tabla de humillación pública, y esta app la van a abrir los propios compañeros. Con
la mediana visible, la pregunta deja de ser "quién es el último" y pasa a ser "estoy dentro de lo
normal". Por el mismo motivo no hay medallas, ni podio, ni etiqueta para el peor.

_(Mediana y no media: con equipos de 6–10 personas, un solo turno raro desplaza la media lo bastante
como para mover la referencia de todos.)_

---

## Nivel 3 — Trabajador (`/equipo/:workerId`)

> **Pregunta de la pantalla: ¿cómo voy yo, y en qué puedo mejorar?**

| Bloque                  | Pregunta que responde                         |
| ----------------------- | --------------------------------------------- |
| **Cabecera**            | ¿De quién y de cuándo es esto?                |
| **Desglose de tiempos** | ¿En qué parte del proceso se me va el tiempo? |
| **Calidad**             | ¿Estoy cometiendo errores?                    |
| **Objetivos**           | ¿Cumplo lo que se espera?                     |
| **Evolución**           | ¿Estoy mejorando?                             |

### Desglose de tiempos

El bloque más útil de toda la app, y el que justifica `derivedFrom`:

```
Tiempo de preparación                6,91 min
├─ Asignación    1,56  ████
├─ Picking       3,77  ██████████
└─ Empaque       1,58  ████
```

Un total de 6,91 no dice qué hacer. El desglose sí: señala **dónde** está el tiempo. Y si las tres
partes dejan de sumar el total, aparece un aviso — la relación es una observación por confirmar, no
una ley (ver `src/metrics/`).

### Evolución

La misma línea del Nivel 1, con los datos de esta persona. Mismo componente, distinto sujeto: es lo
que permite el registro de métricas.

---

## Lo que deliberadamente NO entra

| Descartado                                      | Por qué                                                                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Gráfico de tarta para la composición de calidad | La fuente actual lo usa; comparar ángulos es peor que comparar longitudes, y en móvil las etiquetas no caben                         |
| Un gráfico por métrica                          | El §9 lo dice: cada visualización responde una pregunta. Doce gráficos no responden ninguna                                          |
| Podio, medallas, "empleado del mes"             | Ver la nota de la mediana. Gamificar el rendimiento ajeno con datos laborales reales tiene un coste social que la app no puede pagar |
| Comparador libre de períodos arbitrarios        | Fuera del MVP. "Actual vs anterior" cubre el 90 % del uso real                                                                       |
| Filtros avanzados en el equipo                  | Con 6–10 personas, buscar por nombre basta                                                                                           |

---

## Estados que toda pantalla debe tener

No son un extra del final: son parte de la pantalla desde el primer commit.

1. **Cargando** — esqueleto fiel al layout final (mismas cajas, mismas alturas), nunca un spinner
   centrado que cambia todo de sitio al llegar los datos.
2. **Vacío** — "aún no hay datos de esta semana", que es un estado real y esperable los lunes por la
   mañana.
3. **Error** — qué pasó y qué hacer, no un `Error: fetch failed`.
4. **Obsoleto / sin conexión** — se ven datos, pero antiguos. El caso más peligroso de los cuatro,
   porque es el único que _parece_ que funciona.
