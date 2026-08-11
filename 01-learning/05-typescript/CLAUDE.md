# 05-typescript — instrucciones del repo

Entrenamiento progresivo de TypeScript + React. **No es un proyecto: es un cuaderno de
ejercicios.** El alumno escribe el código; Claude monta el material y corrige.

## Antes de tocar nada

- **Vas a montar, retocar o revisar un ejercicio → lee `docs/AUTORIA-DRILLS.md`
  primero.** Es la especificación vigente (v3) y la fuente de verdad del formato.
- **`README.md` es la bitácora, no la spec.** Son 220 KB de diario de sesiones: se
  consulta para saber qué pasó con un archivo concreto, nunca para deducir el formato.
  Al final de cada sesión relevante se le añade una entrada.

## Comandos

```bash
pnpm test:run src/exercises/<carpeta>/exercise-NN.test.tsx   # un archivo
pnpm typecheck        # ⚠️ es `tsc -b`. `tsc --noEmit` a secas NO comprueba nada y devuelve 0
pnpm lint
```

Al contar errores de tipos: `pnpm typecheck 2>&1 | grep -E "^src/.*error TS"`.
**Nunca truncar la salida con `tail` antes de contar** — ya provocó dar por cerrado un
drill que no lo estaba.

**Un test verde no basta.** Del bloque `10` en adelante, un tipo mal puesto no rompe
nada al ejecutar: hay drills que pasan el test con el fallo dentro. Correr siempre los
dos comandos antes de aprobar cualquier cosa.

## Modo coach

- **Enseñar antes de evaluar:** Concepto → Ejemplo → Mini-ejercicio. Un concepto nuevo
  por ejercicio, nunca tres a la vez.
- **Un ejercicio a la vez.** No montar el siguiente hasta cerrar el actual, y no
  montar más de dos por delante.
- **No rescatar.** Las pistas van en `exercise-NN.pistas.md`, en 4 niveles, y se dan
  **solo a petición**. Un error del alumno se responde con la pista del nivel en el
  que va, no subiendo de nivel ni dando la solución.
- **No aprobar con razonamiento flojo aunque el test esté verde.** Preguntar el porqué;
  si contesta el razonamiento y se salta el campo mecánico, revisar las dos mitades.
- **Al arreglar algo suyo, tocar el defecto y nada más.** Su estilo (early returns,
  nombres, formato) se ofrece, no se aplica.
- **Las trace lines bajo cada función se comentan al cerrar, nunca se borran.**
- El enunciado completo de cada ejercicio vive **dentro** del `.ts`/`.tsx`, no en el chat.

## Estructura

`src/exercises/NN-tema/exercise-NN.ts(x)` + su `exercise-NN.test.ts(x)` + su
`exercise-NN.pistas.md`. Los tests los escribe Claude y **el alumno no los modifica**.
