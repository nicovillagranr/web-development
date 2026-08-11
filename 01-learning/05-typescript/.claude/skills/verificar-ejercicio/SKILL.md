---
name: verificar-ejercicio
description: Verifica un ejercicio de 05-typescript antes de darlo por montado o por
  cerrado — tests, typecheck, lint, señal por drill, métrica de la spec v3 y los dos
  pasos de criterio. Úsala al terminar de montar un exercise-NN, al retocar sus
  enunciados, o antes de aprobarle un archivo al alumno.
---

# Verificar un ejercicio

Ejecuta el protocolo de `docs/AUTORIA-DRILLS.md` §8. La parte mecánica va en un
script; los dos últimos pasos son de criterio y los haces tú.

## 1. Correr el script

```bash
bash .claude/skills/verificar-ejercicio/verificar.sh 10-eventos-formularios/exercise-06
```

Sale con código 1 si encuentra un problema mecánico. Comprueba, en este orden:

| Bloque | Qué mira |
|---|---|
| TESTS | qué drills pasan y cuáles no |
| TYPECHECK | los errores de ESTE archivo, y aparte los de otros |
| RUIDO | `TS6133`/`TS6196` — variables huérfanas del starter |
| SEÑAL POR DRILL | mapea cada error a su drill y marca los que no tienen ninguno |
| SPEC v3 | etiquetas de formulario, códigos `TS####`, líneas, `.pistas.md` |
| ENUNCIADOS | líneas de prosa por drill, techo 7 |

## 2. Leer la salida

**Todo drill tiene que fallar en algún sitio.** El script lista los que no tienen
error de tipos: ésos están obligados a salir en ROJO en el test. Si alguno no aparece
ni en una lista ni en otra, su starter no enseña nada y hay que rediseñarlo.

**Cuadra el recuento de la cabecera** con los dos números que da el script. La
cabecera anuncia cuántos starters pasan el test con el fallo dentro y cuántos fallan
sin que typecheck hable. Si no coincide, **el archivo le está mintiendo al alumno** —
y esto ya ha pasado dos veces.

**`TS6133` es defecto de diseño, no ruido tolerable.** Un starter que deja una
variable sin usar (a) señala con el dedo dónde está el fallo y (b) suele desmentir la
cabecera. Ha aparecido **cuatro veces**. Las dos curas conocidas: darle al elemento un
uso natural (un `<p>` que pinte el estado, un `id={id}` en la etiqueta), o **no
declarar el parámetro**, que es legal por la regla de aridad.

## 3. Los dos pasos que no se scriptean

**Paso 5 — la Pista 3 contra la salida real.** Cada `Pista 3` del `.pistas.md` tiene
que citar el error **literal** que acaba de imprimir el typecheck, ni uno más. Si un
drill no da error de tipos, su Pista 3 dice *por qué typecheck calla* en vez de
inventarse un mensaje.

**Paso 6 — auditoría de spoiler.** Lee cada enunciado tapando el starter y el test:

- ¿Basta para saber **qué** construir? Si no → falta información necesaria.
- ¿Dice algo que el compilador o el test ya dicen? Si sí → **fuera**, a las pistas.

## Notas de método, ganadas a base de fallar

- **`pnpm typecheck` es `tsc -b`.** `tsc --noEmit` a secas no comprueba nada y sale
  con código 0.
- **Nunca truncar su salida con `tail`** antes de contar: se pierden los errores de
  cabecera. Un `tail -30` hizo dar por cerrado un archivo que estaba en 1/6. El
  script usa `grep -E "^src/.*error TS"`.
- **Un test verde no es una aprobación.** El caso más claro del repo: un starter con
  `e.target.value * 2` pasa el test porque JavaScript coacciona `"21" * 2` a `42`, y
  solo `typecheck` lo caza (`TS2362`).
- El contador de enunciados **no cuenta los apartes** (📌 recordatorio, → resultado,
  👀 observación, 💡 nota) ni el código comentado. Los detecta por byte, no por
  emoji: este `awk` no matchea emojis dentro de una alternancia `(a|b)` y fallaba en
  silencio.

## Si retocas un archivo ya resuelto

El diff no puede contener una sola línea de código — solo comentarios:

```bash
git diff -U0 -- <archivo> | grep -E '^[+-]' | grep -v '^[+-][+-]' \
  | grep -vE '^[+-]\s*(//|\*|/\*)'      # → vacío
```
