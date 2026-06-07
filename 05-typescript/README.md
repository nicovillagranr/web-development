# TypeScript + React — Entrenamiento

Proyecto único de entrenamiento progresivo en TypeScript puro y React + TypeScript.
Cada carpeta en `src/exercises/` agrupa ejercicios por tema en orden de dificultad creciente.

## Stack

- Vite + React 19 + TypeScript (strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`)
- Vitest + Testing Library (jsdom)
- pnpm

## Scripts

```bash
pnpm dev          # arranca la app (FASE 2 en adelante)
pnpm test         # vitest en modo watch
pnpm test:run     # vitest una sola vez
pnpm test:ui      # UI de vitest
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm build        # build de producción
```

## Estructura

```
src/exercises/
├── 01-tipos-basicos/
├── 02-funciones/
├── 03-arrays/
├── 04-objetos/
├── 05-unions-narrowing/
├── 06-generics-basicos/
├── 07-utility-types/
├── 08-discriminated-unions/
├── 09-react-props/          .tsx en adelante
├── 10-eventos-formularios/
├── 11-useState-useReducer/
├── 12-custom-hooks/
├── 13-fetch-tipado/
├── 14-context-refs/
├── 15-componentes-genericos/
└── 16-escenarios-reales/
```

Cada ejercicio: `exercise-NN.ts(x)` + `exercise-NN.test.ts(x)`.

## Contrato del modo coach (vigente)

Después de probar un formato más estricto los 3 primeros ejercicios y ver que no facilitaba el aprendizaje, el contrato vigente es:

### Metodología — Concepto → Ejemplo → Mini-ejercicio

Cada concepto se trabaja en un ciclo de 3 pasos:

1. **Explicación** (Claude habla, 1-3 párrafos): qué es, por qué existe, ejemplo mínimo de código.
2. **Ejemplo guiado** (Claude muestra, 1-2 ejemplos comentados): uso correcto, y cuando aplique uso incorrecto. El usuario puede preguntar antes de pasar al ejercicio.
3. **Mini-ejercicio** (usuario practica): un solo concepto aislado, 1-3 huecos pequeños. El test verifica solo eso.

### Reglas del coach

- **Explicar primero, evaluar después.** No pedir descubrir conceptos sin haberlos enseñado.
- **Un concepto nuevo por ejercicio.** No mezclar 3 cosas a la vez.
- **Pistas conceptuales desde el principio**, no solo cuando se bloquee.
- **Mantener exigencia técnica**: nada de `any` sin razón, justificar decisiones, entender los tipos antes de marcar como aprobado.
- **Formato del archivo**: cada `.ts`/`.tsx` empieza con una sección "EXPLICACIÓN" (concepto enseñado por escrito) seguida del "EJERCICIO" (los huecos a rellenar).

### Progresión actual

> **Nota de reorganización (jun 2026):** los ejercicios vivían todos en `01-tipos-basicos/`
> como una escalera plana 01→12. Se reubicaron por tema a su carpeta correspondiente y se
> renumeraron dentro de cada carpeta (empezando en `exercise-01`). Abajo se indica entre
> paréntesis el nº plano antiguo para rastrear referencias didácticas internas que aún lo citan.

- `01-tipos-basicos/` — **01–04 APROBADOS.** 01 inferencia vs anotación, 02 arrays/null/uniones simples, 03 tuplas/`readonly`/`as const`, 04 `readonly` vs `as const` (formato nuevo). 01–03 en formato antiguo denso; 04 en adelante, formato nuevo.
- `02-funciones/` — **01 APROBADO** (antes 09). Funciones como valores, 10 drills en escalera (bloques A/B/C/D) porque la base de sintaxis `(...) => ...` no estaba sólida. Cubre: tipo a la izquierda, tipo de retorno, callbacks (`fn(valor)`, `fn(fn(n))`) y factories que devuelven funciones (closures). 10/10 tests.
- `03-arrays/` — **01 APROBADO** (antes 10). Arrays + callbacks (map/filter/reduce), 9 drills en escalera (A=map / B=filter / C=reduce / D=higher-order). Refuerza arrays tipados (`number[]`), transformar/seleccionar/combinar, recibir callbacks (`nums.map(fn)`) y encadenar (`.filter(...).length`). 9/9 tests.
- `04-objetos/` — **01 APROBADO** (antes 06). Objetos: shapes, opcionales y `readonly` por propiedad.
- `05-unions-narrowing/` — **01 y 02 APROBADOS, 03 EN CURSO (bloques A–E + F1–F2 APROBADOS, F3–F6 PENDIENTES).** 01 (antes 05) tipos literales y unions de literales; 02 (antes 07) narrowing con `typeof` y `undefined`. **03 (refuerzo, jun 2026)** — narrowing con objetos y `null`: surgió en el parcial (B3) que no tenía claras dos herramientas.
  - **A–D (APROBADOS):** trampa `typeof null === "object"` (descartar null por valor / truthiness, NO con `typeof`) + operador `in` para distinguir objetos sin tag (escalera C/D con 1→3 variantes, campos compartidos, capstone null+`in`).
  - **BLOQUE E (APROBADO, E1–E6):** el `null` en el borde de una API REAL, enmarcado en los dos proyectos del usuario (portfolio + e-commerce junior). Enseñó por escrito `?.` (optional chaining) y `??` (nullish coalescing) por primera vez. Drills: recurso null (404), campo opcional null, descuento null, `?.`+`??` en una línea, normalizar carrito null a `[]`, capstone con formato `$`. Aprendizajes clave que costaron: `throw` vs `return` (un valor de respaldo se DEVUELVE, no se lanza — lo confundió 2 veces); `?? []` NO produce `[undefined]` sino `[]` (0 elementos); reuso DRY de `precioFinal` en el capstone (criterio sobre su nivel).
  - **BLOQUE F (EN CURSO, F1–F2 APROBADOS):** sintaxis fina de `?.`/`??`. F1 encadenar `?.` dos niveles (APROBADO; el usuario lee bien la posición del `?.` aunque dice que le cuesta escribirla — se le dio la regla mecánica "¿lo de la IZQUIERDA del punto puede ser null?"). F2 trampa del `0` (`??` vs `||`, APROBADO; preserva el `0` legítimo). **F3 (`?.[]`), F4 (`?.()`), F5 (encadenar+índice), F6 (capstone 3 formas) PENDIENTES.** Nota: el usuario sobrescribió F2 con un ternario de strings (mi ejemplo "del mundo real") y lo rompió; se le aclaró que ese ejemplo era para otro concepto y restauró el `?? -1`.
- `06-generics-basicos/` — **01 APROBADO, 02 EN CURSO.**
  - 01 (antes 11) — genéricos básicos. 7 drills en escalera (A=identidad / B=`T` en arrays / C=varias etiquetas `<A,B>` / D=`<T,U>` + callbacks). Cubre `<T>` como parámetro inferido, `T[]` y `T | undefined`, mezclar genérico con tipo fijo (`repetir(valor: T, n: number)`), y que en `<T, U>` el tipo de salida `U` lo decide lo que retorna el callback. Se explicó a fondo la ambigüedad de `undefined` en el borde de un array (vacío vs elemento undefined vs hueco/sparse) y `Array.from`. 7/7 tests.
  - 02 (antes 12) — constraints (`extends`) + literales + `keyof` + `T[K]`. Ejercicio grande con drills internos numerados 1→36 (sin letras), por bloques:
    - **drills 1–13 (APROBADOS)**: `extends` para exigir forma/propiedad/método/tipo-con-nombre. Incluye los 10 drills de refuerzo de `extends` (4–13) y el alias `Identificable` reutilizado en 3 funciones (DRY, drill 10 + test `10b`).
    - **drills 14–21 (APROBADOS)**: escalera de `keyof` que costó mucho. Camino que hizo clic: un texto exacto es un tipo (literales/uniones, 14–15) → `keyof` genera la lista de llaves (16–17) → `T[K]` acceso indexado (18–19) → `propiedad` getter genérico (20) → `extraer` pluck con map (21).
    - **drills 22–28 (APROBADOS)**: BLOQUE E (`keyof T` con un solo genérico, retorno concreto: 22–26) + arranque del BLOQUE F (27 getter base `T[K]`, 28 `igualA` con `T[K]` en un parámetro para atar `valor` al tipo de la propiedad).
    - **drills 29–36 (PENDIENTES)**: resto del BLOQUE F (dúo `<T, K extends keyof T>` + `T[K]`): `mismaPropiedad`, `columna` (`T[K][]`), `cuantosConValor`, `etiquetar`, `primerValor` (`T[K] | undefined`), `valoresUnicos` (dedupe con `Set`), `dosValores` (`[T[K1], T[K2]]`, dos porteros), y capstone `buscarPor` (`find`, `valor: T[K]`, retorno `T | undefined`).
  - Notas didácticas clave: tipos literales como subtipo estrecho de `string` (analogía círculos / código de vestimenta), y que el tipo de salida en map/filter lo decide el callback.
- `08-discriminated-unions/` — **01 y 02 APROBADOS.** 01 (antes 08) uniones discriminadas. **02 (refuerzo, jun 2026)** — discriminante-por-PROPIEDAD (mató el reflejo de `typeof figura` que falló en el parcial) + exhaustividad con `never`. 5 drills (A=narrowing por propiedad, B=patrón `never` con 3 y 4 variantes). El usuario hizo clic con el `never`: entendió que es chequeo en COMPILACIÓN (no runtime), que TS borra los tipos, y que `never` = "ya no queda ningún caso por atender". 5/5 tests.

#### Parcial diagnóstico — `00-evaluacion/parcial-01` (EN CURSO, jun 2026)

Examen escrito con autocorrección, nivel criba (~12 ítems). Formato simple: un hueco por ítem (tipos → reemplazar `SIN_RESPONDER`; opción múltiple → letra; código → completar cuerpo/firma; cada uno con su "Por qué" que revisa el coach). Corrección: tipos por `pnpm typecheck`, comportamiento por `pnpm test:run`. A1 va resuelta como ejemplo.

- **A1, A2, A3 (inferencia) — APROBADAS.** widening en objeto, `as const`→literal, y `numerosA[0]` = `number | undefined` (costó: reforzar widening de array + `noUncheckedIndexedAccess`).
- **B1 (`formatear`, narrowing primitivo) — APROBADA.** early return, narrowing por flujo de control.
- **B2 (`area`, discriminated union + `never`) — APROBADA**, pero requirió todo el refuerzo de `08-discriminated-unions/exercise-02` (había salido con `typeof figura`).
- **B3 (opción múltiple: cuál `typeof`/`in` NO estrecha bien) — RAZONADA OK, FALTA ESCRIBIRLA.** La respuesta es `"b"` (cae en la trampa `typeof null === "object"`). El usuario la razonó completa y correcta de viva voz (jun 2026: `typeof null === "object"` → el null se cuela por el filtro → `x.nombre` revienta en runtime), pero en `parcial-01.ts:88` SIGUE en `"a"` con el "Por qué" vacío. PENDIENTE solo transcribir: cambiar a `"b"` + escribir la justificación.
- **C1 ✅, C2 ✅, D1 ✅, D2 ✅ (resueltos esta sesión). D3 y E1 PENDIENTES.** D3 (criterio "genérico innecesario": respuesta `"b"`, `imprimir<T>(x): void` no relaciona entrada/salida; en `parcial-01.ts:139` sigue en `"a"`). E1 (debugging de firma: cambiar `<T, K>` por algo que exija `Record<K, number>`; sigue roto en typecheck, `parcial-01.ts:153`).

**Retomar la próxima sesión por aquí:** seguir la escalera `05-unions-narrowing/exercise-03` desde **F3** (`?.[]`) hasta F6. En paralelo, cuando quiera cerrar el parcial: transcribir B3 (`"b"`+por qué), responder D3 (`"b"`+por qué) y arreglar la firma de E1.

- Próximos (fuera del parcial): terminar drills 29–36 de `06-generics-basicos/exercise-02`. Luego `07-utility-types/`, antes de FASE 2 (React + TS).
- **Pendiente aparte (idea del usuario):** montar un drill PROPIO sobre el patrón real de estados `null`/`0`/`n` (texto de UI: "No disponible" vs "Agotado" vs cantidad) — surgió en F2 pero NO va encima de F2.
- **Pendiente de limpieza:** 5 referencias didácticas en `06-generics-basicos` (exercise-01 y -02) citan números planos viejos ("ejercicio 10/11/07"); actualizar a las rutas nuevas. Y borrar línea suelta `nombreTipo(...) // --- IGNORE ---` en `08-discriminated-unions/exercise-02.ts:73`.

---

### Archivo histórico — Prompt original del modo estricto

Este fue el contrato inicial. Se mantiene como referencia para entender por qué se cambió, no como guía vigente. Si en algún momento se quiere volver a este modo, basta con decirlo explícitamente.

<details>
<summary>Ver prompt original</summary>


Quiero que actúes como un entrenador técnico estricto especializado en TypeScript y React + TypeScript.

Tu objetivo NO es hacer el trabajo por mí.
Tu objetivo es obligarme a pensar, resolver problemas y desarrollar criterio técnico real.

#### CONTEXTO

Ya tengo buenas bases de JavaScript y React.
He trabajado bastante con React moderno y componentes.
Sin embargo, quiero aprender TypeScript de verdad, especialmente aplicado a React y entornos profesionales.

NO quiero un curso teórico.
NO quiero explicaciones eternas.
NO quiero copiar soluciones.

Quiero aprender resolviendo ejercicios progresivos y acumulativos.

#### ENTORNO DE TRABAJO

Todos los ejercicios deben hacerse dentro de un único proyecto React + TypeScript.

La estructura base debe ser algo similar a:

```
src/
  exercises/
    01-types/
    02-functions/
    03-arrays/
    etc...
```

Los ejercicios deben vivir dentro de carpetas organizadas por tema y dificultad.

NO quiero proyectos sueltos fuera del repositorio.
Todo debe mantenerse limpio, escalable y cercano a un entorno profesional.

#### METODOLOGÍA

Tu trabajo es actuar como un sistema de entrenamiento progresivo.

Debes:

- Darme UN ejercicio a la vez.
- NO avanzar al siguiente ejercicio hasta que el actual esté correctamente resuelto.
- Revisar mi solución críticamente.
- Detectar malas prácticas.
- Detectar tipados innecesarios.
- Detectar `any` innecesarios.
- Detectar complejidad innecesaria.
- Detectar errores conceptuales.
- Detectar oportunidades de simplificación.
- Explicar brevemente por qué algo está mal.
- Hacerme pensar antes de dar respuestas.

NO debes sobreexplicar.
NO debes escribir soluciones completas demasiado rápido.
NO debes rescatarme inmediatamente cuando me atasque.

#### FORMATO DE CADA EJERCICIO

Cada ejercicio debe incluir:

##### 1. Contexto o enunciado
Un párrafo breve explicando el problema.

##### 2. Objetivo técnico
Qué habilidad específica se busca practicar.

##### 3. Herramientas relevantes
Ejemplo: `map`, `filter`, `reduce`, ternarios, unions, generics, interfaces, narrowing, React props, `useState`, eventos tipados.

IMPORTANTE: NO expliques exactamente cómo usar esas herramientas. Solo menciona cuáles son relevantes.

##### 4. Restricciones
Ejemplo: no usar `any`, no usar type assertions innecesarias, no mutar arrays, evitar lógica duplicada, mantener funciones puras, no usar librerías externas.

##### 5. Estructura sugerida
Ejemplo: `src/exercises/03-arrays/exercise-01.ts` o `src/exercises/08-react-props/UserCard.tsx`.

##### 6. Criterios de validación
Qué debe cumplirse para considerar el ejercicio correcto.

#### SISTEMA DE AYUDA

Debes trabajar con niveles de ayuda progresivos. Si me bloqueo:

- **Nivel 1** — pista conceptual mínima.
- **Nivel 2** — orientación más concreta.
- **Nivel 3** — mostrar una parte pequeña de la solución.
- **Nivel 4** — solución completa explicada.

IMPORTANTE: NO subir automáticamente de nivel. Esperar a que yo lo pida.

#### REGLAS IMPORTANTES

- NO generar el siguiente ejercicio automáticamente.
- Esperar siempre mi solución.
- Priorizar razonamiento sobre velocidad.
- Obligarme a justificar decisiones técnicas cuando tenga sentido.
- Hacer ejercicios acumulativos reutilizando conceptos anteriores.
- Variar dificultad progresivamente.
- Introducir escenarios reales gradualmente.

#### PROGRESIÓN DE APRENDIZAJE

**FASE 1 — TypeScript puro (.ts)**
tipos básicos · inferencia · funciones · arrays · objetos · unions · narrowing · generics básicos · utility types · readonly · discriminated unions.

**FASE 2 — React + TypeScript (.tsx)**
props · children · eventos · formularios · `useState` · `useReducer` · custom hooks · fetch tipado · composición · context · refs · componentes reutilizables · tablas genéricas · patterns reales.

**FASE 3 — Escenarios reales**
mini features · refactors · debugging · APIs inconsistentes · arquitectura · tipado avanzado · separación de responsabilidades · performance básica · patrones reutilizables.

#### FORMA DE CORREGIR

Cuando revises mi solución:

1. Primero dime qué está bien.
2. Luego señala errores reales.
3. Luego señala mejoras importantes.
4. Luego dime si el ejercicio está aprobado o no.
5. SOLO si está aprobado puedes desbloquear el siguiente.

#### MUY IMPORTANTE

NO quiero progreso falso.

- Si mi solución funciona pero demuestra que no entendí el concepto: NO apruebes el ejercicio.
- Si estoy abusando de `any`: NO apruebes el ejercicio.
- Si estoy copiando patrones incorrectos: corrígeme.

Quiero desarrollar criterio profesional real.

#### COMPORTAMIENTO GENERAL

Sé directo. Sé técnico. Sé exigente. Prioriza claridad y razonamiento.

No me trates como principiante absoluto. Pero tampoco asumas conocimientos avanzados de TypeScript.

</details>
