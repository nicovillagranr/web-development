# Autoría de drills — especificación v3

> **Vigente desde el 11 ago 2026.** Sustituye a la "especificación de estilo v2"
> (`README.md`, sección `10-eventos-formularios`), que queda como histórico.
> Esta es la **fuente de verdad única** para montar y revisar ejercicios. El `README`
> es la bitácora: cuenta qué pasó, no cómo se escribe.

---

## 0. El problema que esta spec existe para evitar

La v1 y la v2 se degradaron por el mismo mecanismo, un **trinquete**: cada vez que un
enunciado falló, se añadió un campo obligatorio para tapar ese fallo, y **nunca se
retiró ninguno**. El resultado fue un enunciado de 14-18 líneas donde tres campos
decían la misma respuesta en tres registros distintos, y el alumno dejó de resolver
para ponerse a descifrar.

**Regla que gobierna todas las demás:** cuando un enunciado falle, **arréglalo**; no
le añadas un campo. Si de verdad hace falta un campo nuevo, hay que retirar otro.

---

## 1. La plantilla del drill

Cuatro cosas, en este orden, **ninguna etiquetada**. El orden lo da la prosa.

1. **Situación** — por qué existe este componente, o por qué el problema es un problema.
2. **Tarea** — qué hay que conseguir, con las piezas por su nombre técnico.
3. **Resultado esperado** — el comportamiento observable, en prosa.
4. **Restricciones** — solo si son reales. Línea aparte, en seco.

```ts
// 4) `BotonConIdRecibeManejador`
//    Un manejador reutilizable no puede saber sobre CUÁL de los botones se pulsó:
//    ese dato solo lo tiene el hijo. Por eso el que llega por props aquí pide dos
//    cosas —el evento y un id—, y el hijo tiene que apañárselas para darle las dos.
//    Monta un <button> "Avisar" que lleve ese id como atributo y que al pulsarlo
//    ejecute el manejador con la información completa.
```

**Techo: 3-7 líneas.** Si pasa de 7, o el drill mezcla dos conceptos, o el enunciado
está explicando de más. Las dos cosas se arreglan partiendo, no recortando prosa.

No hace falta usar las cuatro. Un drill fácil son dos frases:

```ts
// 1) `Marco` — recibe `children` y lo pinta dentro de un <article className="marco">,
//    tal cual llega.
```

---

## 2. El test de la frontera

Antes de escribir una línea del enunciado, decidir de qué lado cae.

### NECESARIA → va en el enunciado

Información que el alumno **no puede obtener de ningún sitio**:

- el texto o el marcado que debe producir el componente (`"Avisar"`, `<article>`);
- el nombre de las props y qué representan;
- el valor exacto que el test espera, cuando es arbitrario (`"1. rojo"`, `Total: 3`);
- la forma de una API externa (`forEach` llama a `fn(valor, índice, array)`);
- **el aviso de que el drill exige un import nuevo** (norma desde el 03 de la v1: el
  drill que costó cuatro pasadas fue por no decirlo);
- qué partes del starter no hay que tocar.

### REVELADORA → fuera, a las pistas

Todo lo que el alumno puede **deducir**:

- la expresión o el código final, y el pseudocódigo que sea la solución;
- el hueco concreto (`onKeyDown`), el operador, la envoltura, el argumento a añadir;
- las tablas de correspondencia `lo-que-hay → lo-que-se-espera`;
- comparaciones `❌ incorrecto → ✅ correcto`;
- **los códigos y textos literales de errores de TypeScript.**

### Regla de bolsillo

> **Si al leerlo puedes teclear la solución sin pensar, es reveladora.**

---

## 3. Prohibido en el enunciado

- Etiquetas de formulario: `QUÉ CONSTRUIR:`, `🔧 STARTER ROTO A PROPÓSITO:`, `📎`.
- `TS2322`, `TS7006`, `Target signature provides too few arguments…` y familia.
  El compilador **ya los imprime** cuando corres `pnpm typecheck`: repetirlos en el
  archivo cuesta el spoiler entero a cambio de cero información nueva. → **Pista 3**.

  > **Única excepción, y es de los bloques de TEORÍA, no del enunciado:** un mensaje
  > del compilador puede citarse cuando **el mensaje ES la lección** y no es la
  > respuesta de ningún drill de ese archivo. Ejemplo bueno: `TS2315: Type
  > 'KeyboardEvent' is not generic` en la `⚠️ TRAMPA` del `exercise-03`, donde lo
  > que se enseña es que ese mensaje admite dos lecturas y solo una arregla.
  > Ejemplo malo: citar en la teoría el error exacto que va a dar el drill que hay
  > veinte líneas más abajo. Si lo pega con su drill, es spoiler aunque esté en la
  > teoría.
- La línea `→ click → alPulsar recibe "click"`. El test **es** esa especificación, y
  hay que correrlo igualmente. (Excepción: valores arbitrarios, ver §2 NECESARIA.)
- Referencias cruzadas obligatorias a otros archivos. Si un drill repite un patrón
  visto antes, va como nota al margen — nunca como el enunciado.
- Cajas ASCII de dibujo, inventarios de propiedades, diagramas de más de una rama,
  enunciados escritos como firma de tipos, bloques de vocabulario largos.

---

## 4. Los starters rotos: se conservan, cambia el anuncio

El starter roto a propósito sigue siendo el motor del ejercicio, y el mensaje del
compilador sigue siendo el mejor profesor de la casa. Lo que se retira es el `🔧` por
drill, que hacía **tres** trabajos a la vez. Se reparten así:

| Trabajo que hacía el `🔧` | Dónde va ahora |
|---|---|
| "aquí hay algo roto a propósito" | **Cabecera, una vez:** *"Todos los starters de este archivo están rotos a propósito."* Desaparece de los drills. |
| "este drill pasa el test con el fallo dentro" | **Cabecera, en número y sin nombrar drills:** *"2 de los 6 pasan el test con el fallo dentro — corre siempre los dos comandos."* |
| el error literal de `tsc` | **Pista 3** del `.pistas.md`. |

Se conserva la ventaja de diseño de siempre: **los starters USAN sus parámetros**, así
que no hay `no-unused-vars` que silenciar ni una sola línea de `eslint-disable`.

---

## 5. Anatomía del archivo

Lo que sigue **igual que en la v2** — funciona, el problema estaba en el enunciado:

**Cabecera, techo 40 líneas**, en este orden:

1. `📌 RECORDATORIO` (≤16 líneas, solo lo que ese archivo usa; si manipula un objeto,
   su FORMA dibujada con valores de ejemplo reales y un `(recortada, trae ~25 campos)`
   que diga la verdad).
2. `🎯 AL TERMINAR SABRÁS` — 2-4 viñetas comprobables, en infinitivo.
3. `🟢 ¿POR QUÉ ESTE ARCHIVO?` — 2-4 frases, segunda persona.
4. `🗺️ MAPA DEL ARCHIVO` — `TEORÍA 1 → drills 1-3 · TEORÍA 2 → drills 4-6`.
5. `▸ EJERCICIO` — prohibido `any`/`as`, comandos de test y typecheck, la frase de los
   starters rotos (§4), el recuento de verdes de mentira (§4) y **una sola línea**
   diciendo que existe `exercise-NN.pistas.md` y que se abre cuando uno se atasca.

**Bloques de teoría intercalados**, 2-3 por archivo, ~20-25 líneas, cada uno pegado a
sus drills. Estructura fija: `DEFINICIÓN` (una frase, en términos técnicos) ·
`SINTAXIS` (la forma escrita, con las piezas señaladas) · `EJEMPLO` (código mínimo
ejecutable y su resultado) · `🧠 ANALOGÍA` (una, **de apoyo — no sustituye a la
definición**) · `🗣️ LAS PIEZAS` (pieza → nombre técnico) · `⚠️ TRAMPA` (el error
concreto que va a cometer, y por qué).

**Otras invariantes:** un concepto por archivo · techo ~230 líneas · trace lines
comentadas bajo cada función · los recordatorios de un `type` van **junto al drill que
lo usa**, no solo al principio del archivo.

---

## 6. Tono

Un senior explicándole una tarea a un junior sentado al lado. Natural, directo,
pedagógico, ligeramente informal cuando toque.

**No:** lenguaje de documentación de API · academicismo innecesario · frases
motivacionales de póster · explicaciones infladas · emojis a puñados.

El listón: que al leer el enunciado pueda pensar **"ok, entiendo qué me piden; ahora
tengo que pensar cómo hacerlo"**.

---

## 7. Las pistas

Archivo hermano `exercise-NN.pistas.md`, con cada pista dentro de `<details>` para que
el preview de Markdown las muestre **plegadas**: abrirlo tiene que ser una decisión,
no un accidente de scroll. Plantilla en `docs/PLANTILLA-pistas.md`.

Cuatro niveles por drill, y **cada uno tiene un trabajo distinto**:

| Nivel | Qué es | Qué NO es |
|---|---|---|
| **Pista 1** | Conceptual. Reencuadra el problema o señala dónde mirar. | No nombra la pieza que falta. |
| **Pista 2** | Concreta. Nombra el mecanismo, sin escribirlo. | No es código. |
| **Pista 3** | El error literal de `tsc`, o el dato duro que lo cierra. | No es la línea final. |
| **Solución** | El código + por qué funciona. | — |

**Protocolo en el chat** (contrato del coach, sin cambios):

> enunciado → intento → pista 1 si se atasca → intento → pista 2 → … → solución solo
> si corresponde.

El coach **no sube de nivel por su cuenta** ni entrega la solución porque el alumno
haya cometido un error: un error se responde con la pista del nivel en el que va. El
alumno pide.

---

## 8. Protocolo de verificación de un archivo

Comandos (`pnpm typecheck` es `tsc -b`; **`tsc --noEmit` a secas no comprueba nada y
miente con código 0**):

```bash
pnpm test:run src/exercises/<carpeta>/exercise-NN.test.tsx
pnpm typecheck 2>&1 | grep -E "^src/.*error TS"   # nunca truncar con `tail` antes de contar
pnpm lint
```

1. Escribir la **solución completa** → tests en verde + typecheck exit 0 + lint 0.
2. Vaciar los cuerpos a los **starters rotos**.
3. Comprobar que salen **rojos**, con mensajes autoexplicativos.
4. **Comprobar drill a drill que su starter tiene señal en ALGÚN sitio** (test rojo o
   error de tipos). Un tipo mal puesto no rompe nada al ejecutar: del `03` en adelante
   los tests **dejan de bastar**. Cuadrar el recuento de verdes de mentira que anuncia
   la cabecera.
5. **Comprobar que la Pista 3 de cada drill cita el error literal que escupe `tsc`,
   ni uno más.** (Era el paso 4 de la v2 sobre el `🔧`; ahora vive aquí. El chequeo
   que impide que el material mienta sigue en pie, solo cambia de sitio.)
6. **Auditoría de spoiler.** Leer cada enunciado tapando el starter y el test:
   - ¿Basta para saber **qué** construir? Si no → falta información necesaria (§2).
   - ¿Dice algo que el compilador o el test ya dicen? Si sí → **fuera**, a las pistas.

Métrica objetiva, rápida de comprobar en un archivo terminado:

```bash
grep -nE "TS[0-9]{4}" exercise-NN.tsx                      # solo en TEORÍA, y solo
                                                           # si cumple la excepción de §3
grep -cE "QUÉ CONSTRUIR|STARTER ROTO|📎" exercise-NN.tsx   # → 0
```

Y la prueba dura cuando se retocan enunciados de un archivo ya resuelto: **el diff no
puede contener una sola línea de código.**

```bash
git diff -U0 -- <archivo> | grep -E '^[+-]' | grep -v '^[+-][+-]' \
  | grep -vE '^[+-]\s*(//|\*|/\*)'      # → vacío
```

---

## 9. Cuando el alumno se queje

Los dos síntomas y su lectura:

- *"No sé qué quiere el autor"* → falla la **información necesaria** (§2). Añade el
  dato que falta al enunciado.
- *"Esto me lo estaba diciendo"* → falla la **frontera** (§2). Mueve la línea a las
  pistas.

En ninguno de los dos casos se añade un campo permanente a la plantilla. Ese es el
trinquete que se llevó por delante a la v1 y a la v2.
