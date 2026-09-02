# Análisis del reporte PDF de origen

> Evidencia para el §13 del documento de origen, levantada el **27 ago 2026** contra un PDF real
> (`Picker Performance`, local `CH_22_Manquehue`). Sustituye suposiciones por hechos comprobados.
>
> **El PDF no está en el repositorio** y no debe estarlo (`.gitignore` ignora `*.pdf`). Este
> documento guarda lo aprendido de él, no su contenido.

---

## Lo esencial

| Pregunta del §13            | Respuesta                                                       |
| --------------------------- | --------------------------------------------------------------- |
| ¿Contiene texto?            | **Sí.** No hace falta OCR                                       |
| ¿Las tablas son extraíbles? | Sí, pero **sólo en modo `-raw`**                                |
| ¿Cuántas columnas?          | **20 de datos** + nombre = 21                                   |
| ¿Cuántas filas?             | **30 pickers**                                                  |
| ¿Formato numérico?          | es-CL: coma decimal, punto de miles (`1,32%`, `856.617`)        |
| ¿Cómo viene la celda vacía? | Un guion `-` → debe normalizarse a `null`, **nunca a 0**        |
| ¿Trae período o fecha?      | **No. En ninguna parte.** Ver "La consecuencia grave" más abajo |
| ¿Trae recomendaciones?      | No. El §7 asume que sí; este reporte no las tiene               |

## Cómo se extrae

```bash
pdftotext -raw -enc UTF-8 reporte.pdf salida.txt
```

Las dos banderas son obligatorias y por motivos distintos:

- **`-raw`** — el reflejo natural para una tabla es `-layout`, y con este documento **sale
  ilegible**: las columnas se entrelazan y el nombre del local se funde con el del picker
  (`CH_22_ManquehCamilo Zú�iga`). En `-raw` el orden de lectura sale correcto y una fila cabe
  en una línea.
- **`-enc UTF-8`** — sin ella las eñes y las tildes se pierden (`Zú�iga`, `Alca�no`). En un archivo
  cuya clave natural es el nombre de una persona, eso no es cosmético.

## Las tres trampas del parser

Comprobadas en el documento real. Un parser que las ignore produce filas silenciosamente mal.

**1. El nombre se pega al número cuando es largo.**

```
Antonella Barraza309 1,29% 3,24% ...
Carola Bahamonde400 1,75% 2,25% ...
Fernanda Alcaíno386 0,78% 2,85% ...
```

Partir por espacios da `"Barraza309"` como nombre y descoloca la fila entera. Hay que separar con
una expresión que corte en la frontera letra→dígito, no en el espacio.

**2. Otros nombres saltan de línea.**

```
Leandro Bustamante
250 0,80% 4,40% ...
```

Una línea sin dígitos es un nombre huérfano: hay que unirla con la siguiente antes de parsear.

**3. La cabecera viene partida en tres líneas.** No se puede leer la primera línea y dar por hecho
que están todas las columnas.

## La consecuencia grave: el PDF no trae fecha

**El documento no contiene ningún período, fecha ni marca temporal.** Esto rompe el §17 tal como
está escrito, que da por supuesto que "cada PDF representa una actualización" identificable por su
contenido.

No se puede derivar la clave de idempotencia del documento. Las salidas posibles, de mejor a peor:

1. **El período se aporta en la carga** — quien sube el PDF indica a qué semana/mes corresponde.
   Es una intervención humana mínima (un campo) y hace la clave explícita y auditable.
2. **Hash del contenido + fecha de recepción** — idempotente frente al mismo archivo subido dos
   veces, pero incapaz de detectar que dos archivos distintos son el mismo período.
3. **Deducirlo del nombre del archivo** — frágil: depende de que quien lo exporta no lo renombre.

Sin decidir. Afecta a la Etapa 11.

## Los dos invariantes, medidos

### `assignment + picking + packaging = prep_time` — se cumple en 29 de 30

Un único descuadre real, de +0,25 min. El resto cuadra exacto o con diferencia de redondeo (±0,01).

Esto **valida la decisión ya tomada** en `src/metrics/definitions.ts`: `derivedFrom` se comprueba y
avisa, nunca calcula. Si `prep_time` se calculara sumando sus partes, esa fila mostraría 5,75 en vez
del 5,50 que el local midió, y la app estaría inventando un número que nadie reportó.

### `item_picking_time ≈ picking_time × 60 / basket_size` — **no es una identidad**

| Estadístico | Desvío |
| ----------- | ------ |
| Medio       | 3,6 %  |
| Máximo      | 19,6 % |

Es una correlación, no una fórmula. La causa probable es que las tres columnas son promedios, y el
promedio de un cociente no es el cociente de los promedios.

**Conclusión: la app lee `item_picking_time`, nunca lo calcula.** Confirma que estaba bien dejarlo
fuera de `derivedFrom` — ese campo sólo modela sumas, y habría avisado de un descuadre inventado.

## Estado de las columnas

| Columna                             | Nulos     | Nota                            |
| ----------------------------------- | --------- | ------------------------------- |
| `rating`                            | **30/30** | Llega entera vacía              |
| `ausencias`                         | **30/30** | Llega entera vacía              |
| `totalTask`, `taskDurationMin`      | 25/30     | Sólo 5 filas con dato           |
| `partialOrders`                     | 5/30      | Métrica **del bono** con huecos |
| `inaccuracyTotal` / `WmItem` / `Pq` | 3/30      | Métrica **del bono** con huecos |
| El resto                            | 0         | Completas                       |

Que dos métricas del bono lleguen con huecos es justo el caso que obliga al estado `wait`
("En curso") en vez de tratar el hueco como un cero.

## Cobertura de casos que dan los datos

El reporte cubre por sí solo los casos límite que hay que probar, sin inventar nada:

- **Volumen**: de 2 a 719 pedidos, con un `400` exacto para probar la frontera `>=` vs `>`.
- **Sin datos**: dos filas con casi todo en `null` (2 y 9 pedidos) — el caso "nadie en rojo por
  falta de datos" del escenario de mes reseteado.
- **Los cuatro resultados de bono** están representados.

## Qué falta comprobar

Este análisis se hizo con **un solo PDF**. El §13 avisa de no dar por hecho que todos son idénticos,
y sigue siendo válido:

- [ ] ¿La cabecera trae siempre las mismas 20 columnas, o varía según lo que se exporte?
- [ ] ¿El orden de columnas es estable?
- [ ] ¿Aparece la fecha en otro tipo de exportación del mismo reporte?
- [ ] ¿Cambia el número de pickers entre semanas? (afecta a la validación del §15)
