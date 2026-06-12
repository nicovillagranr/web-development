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
  - **03 (refuerzo `reduce`, jun 2026) — COMPLETO. Drills 1–7 APROBADOS; 8–10 RESUELTOS por el usuario (8 `todosPositivos`, 9 `sumaDeCuadrados`, 10 `contarParesImpares` capstone acum objeto) — falta solo revisión de coach del razonamiento de 8–10, el código está correcto.** 10 drills aislando `.reduce` (alcancía): número → cambio de tipo → booleano → objeto. 1–3 ya estaban. 4 `maximo`: cazó que faltaba el inicial `-Infinity` (no `0`, que cuela un fantasma; no `Infinity`, que gana siempre) — entendió que `Infinity` es un "tope garantizado", no un número a memorizar; sin inicial `reduce` toma el 1er elemento y revienta en `[]`. 5 `concatenar` (neutro `""`) y 6 `longitudTotal` (`string[]`→`number`, cambio de tipo con `valor.length`): leyó bien acum/valor/inicial. 7 `contarVerdaderos` (`acum + (valor ? 1 : 0)`): dedujo SOLO que contar falsos sería `!valor`; se le corrigió vocabulario (el ternario evalúa el VALOR/veracidad del booleano, no "si existe"; `if(valor)` = truthiness, ≠ `=== true`). **Retomar por el drill 8 `todosPositivos`** (acum `boolean`, inicial `true` como neutro de `&&`, `acum && valor > 0`); luego 9 `sumaDeCuadrados` (cuadrado dentro del reduce) y 10 `contarParesImpares` (capstone: acum OBJETO, `...acum`).
- `04-objetos/` — **01 y 02 APROBADOS, 03 EN CURSO.**
  - 01 (antes 06) — objetos: shapes, opcionales y `readonly` por propiedad.
  - **02 (refuerzo, jun 2026) — APROBADO (7/7).** Actualización INMUTABLE con spread `{ ...obj, prop: ... }`. Surgió porque no entendía la línea `{ ...acum, pares: acum.pares + 1 }` del capstone de `03-arrays/exercise-03` (drill 10). 7 drills en escalera (A=copiar/pisar, B=cambio booleano y calcular-desde-lo-que-había, C=capstone reduce con acum objeto tocando 2 props). Aprendizajes que se consolidaron: (a) el spread copia y la propiedad escrita DESPUÉS pisa (orden manda); (b) `obj.prop + 1` LEE, no muta; (c) drill 6 `aplicarIva`: error conceptual `* iva` (solo el impuesto, 190) → `* (1 + iva)` (precio+impuesto, 1190); puente con el neutro `1` de multiplicar; (d) el `...acum` es NECESARIO solo si dejas propiedades sin tocar — en `resumirCompra` reescribe las 2 props, así que sobra (decorativo), a diferencia de `contarParesImpares` donde sí hacía falta; (e) las dos formas de retornar objeto en arrow: `=> ({...})` (paréntesis = "esto es un valor objeto", evita que `{` se lea como cuerpo/bloque) vs `=> { return {...} }`. Vocabulario afinado: propiedades (de objeto) ≠ parámetros (de función); "retornar" lo hace la función, "tener propiedades" el objeto.
  - **03 (refuerzo, jun 2026) — APROBADO (8/8 tests, tipos limpios).** Actualización inmutable ANIDADA: objeto dentro de array (`.map`+ternario) y dentro de diccionario (`{ ...reg, [id]: { ...u, ... } }`, spread shallow + llave calculada `[id]` + guard del `noUncheckedIndexedAccess` que vuelve `reg[id]` = `Usuario | undefined`). 7 drills: D1 (1–3 arrays), D2 (4–5 diccionario con guard), D3 (6–7 capstone carrito, el 7 combina `.map` para bajar cantidad + `.filter` para eliminar el que llega a 0). Aprendizajes que costaron: (a) **D2 disparó la trampa esperada** — aplicó `.map` + `r.id` sobre un diccionario (que no es array y donde el id es la LLAVE, no una propiedad del usuario); se corrigió con la analogía casillero-con-etiquetas vs fila-numerada. (b) **El `[id]` (llave calculada) fue el muro real**: dijo "sigo sin entender" varias veces; se destrabó con escalera de sustitución concreta (`{ [id]: true }` con `id="carrito9"` → `{ carrito9: true }`; luego nombre repetido → "gana el último"; luego con `...reg`). Frase que quedó: "los corchetes usan el VALOR de la variable como NOMBRE de la propiedad, no el texto literal" (ojo: primero lo dijo al revés, "cambia valor no nombre" → corregido). (c) confundió los dos trabajos del `:` (tipo `edad: number` vs valor `edad: 5`) → aclarado por "¿qué hay a la derecha, un tipo o un valor?". (d) D3·7: intentó meter el `.filter` DENTRO del `.map` ("sobre el return del spread") → se enseñó que son DOS estaciones encadenadas `arr.map(...).filter(...)`, no anidadas (`.map` transforma, no elimina; `.filter` decide quién sobrevive). Nota: 4 errores TS2532 estaban en el `.test.ts` de andamiaje (acceso `arr[0].x` sin `?.`), no en su solución — corregidos a `arr[0]?.x`.
  - **04 (refuerzo `.map`+`.filter` encadenados, jun 2026) — APROBADO COMPLETO (10/10 drills, 10/10 tests, typecheck limpio).** Era el "Bloque E" dentro de exercise-03; a petición del usuario se MOVIÓ a archivo propio (`exercise-04.ts` + test) y se amplió de 6 a 10 drills — le resultaba engorroso subir a leer los tipos al inicio del archivo, así que ahora CADA TIPO está definido justo encima del bloque que lo usa (mantener ese formato en futuros refuerzos largos). Escalera: A (1–3) aísla `.filter`, B (4–5) aísla `.map`, C (6–10) encadenan.
    - **Hitos de la sesión (12 jun 2026), drills 1–8:** (a) 1–3 limpios y rápidos (1 booleano tal cual sin `=== true`; 3 con `!` evitando `=== false` por decisión propia — se le enseñó el matiz: con `boolean` estricto son equivalentes, con `boolean | undefined` no). (b) Pregunta suya valiosa en el 2: "¿stock 0 o null quedan fuera?" → se separó: el 0 sí por `> 0`; el null NI LLEGA (contrato `stock: number`); y preguntó si entonces "había que" añadir `| null` → NO: **el tipo se elige por evidencia, no por miedo** (`| null` solo si el dato real puede traerlo; si no, es trabajo falso defendiéndose de fantasmas — conectado con su regla de F5 "pon `?.` solo donde puede ser null"). (c) En el 4 preguntó por qué el `return` va entre `{}` → se enseñó a fondo los DOS MODOS de la arrow: **VENTANILLA** (expresión: entrega directa, sin return) vs **OFICINA** (bloque `{`: varios trámites, nada sale sin `return` explícito), y los DOS TRABAJOS del `{` (crear objeto / abrir cuerpo) — tras `=>` JS asume SIEMPRE cuerpo, el `(` lo desambigua ("encapsula/protege un valor", frase suya). En el quiz de 3 etiquetas falló justo la `c)` `({...})` → se destrabó con "¿dónde está el return si fuera cuerpo?" + regla mecánica "mira lo PRIMERO tras la flecha". Reescribió el 4 de oficina a ventanilla por iniciativa propia. (d) VOCABULARIO corregido (vigilar, reincide): "map recorre cada PROPIEDAD del array" → los arrays tienen ELEMENTOS, los objetos PROPIEDADES, map recibe el elemento ENTERO; y "se imprime" por "se devuelve/transforma" (conectado con su `imprimir: void` de D3). También "se filtra solo EL que cumpla" (singular) → TODOS los que cumplan. (e) **Analogía que ÉL construyó y quedó como canon del bloque: map = FÁBRICA (salen todos, algunos defectuosos), filter = CONTROL DE CALIDAD (no fabrica ni repara, decide qué llega al cliente; se para a la SALIDA porque los defectos no existen antes de fabricar)** — nació de corregirle el "colador 2 veces" (map NO es un filtro ni atrapa nada). (f) Pregunta suya de las dos capas en el 6: ¿rebajar 50 a un precio de 40 da error? → NINGUNA capa protesta: -10 es `number` válido (TS vigila FORMAS) y JS resta feliz; el -10 vive ENTRE estaciones y muere en el filter — la regla de negocio la vigila el código, no el compilador. (g) 7 perfecto a la primera con narración previa del flujo. (h) El 8 "lo pilló" → pista = su propio `quitarUnaUnidad` + esqueleto con huecos; lo llenó bien. Cambió `Enemigo.id` a `number` por su cuenta (coherente: tipo+firma+ejemplos) → se ACEPTÓ y se sincronizó el test (lección F3 repetida: cambiar un tipo obliga a sincronizar el test; los tests runtime seguían verdes porque JS no mira tipos). (i) **PATRÓN A VIGILAR (costó 3 revisiones):** en sus comentarios de ejemplos escribe el resultado INCOMPLETO — omite los elementos que el ternario no toca (`// → [{...vida:7}]` con 3 enemigos entrando) y los números a ojo (10-11 le salió "0", luego "-10", al fin "-1"; se descartó el modelo videojuego de vida clavada en 0: la resta no tiene piso, el clamp sería `Math.max(0,...)` explícito). Se le dijo: un comentario con resultado falso es peor que no tener comentario. Sus 3 ejemplos finales del 8 cubren golpe normal / id inexistente / golpe letal. **PENDIENTE al retomar: verificar que corrigió el comentario de la línea ~161 (ejemplo 1 del drill 8, debe listar los 3 supervivientes).**
    - **Cierre del bloque (12 jun 2026), drills 9–10:** (a) El 9 (`asequiblesConEnvio`) salió BIEN A LA PRIMERA en código (map suma envío, filter `<=`, ventanilla), y razonó bien de palabra el caso límite. (b) **PATRÓN COMENTARIOS REINCIDIÓ FUERTE — vigilar en próximos bloques:** el comentario pendiente de la línea ~161 (resultado incompleto del drill 8) necesitó TRES recordatorios en la sesión y al final NO lo corrigió él — pidió "haz los cambios tú" y los hizo el coach (aceptado por ser comentarios, no código de drill). Además: al cambiar los números de su ejemplo dejó un `$810000` fantasma desincronizado, y reincidió 2 veces en "el presupuesto es MAYOR" tras corregirle que `<=` incluye IGUAL (frase correcta: "el precio final NO SUPERA el presupuesto"). El coach dejó escrita la pareja de ejemplos del caso límite (presupuesto 810 → sobrevive con `<=`; 809 → se cae) — releerla si vuelve a confundir `<` con `<=`. (c) El 10 (capstone `depurarCarrito`) PERFECTO a la primera: map sin ternario + spread + filter, sin ayuda. (d) Pregunta de control de cierre (orden invertido filter→map en el 10) respondida BIEN: vio que saldría el item zombi con `cantidad: 0` porque el portero miraría la cantidad VIEJA — la regla del bloque (el filter juzga lo que la fábrica acaba de crear → va después) quedó consolidada.
- `05-unions-narrowing/` — **01, 02 y 03 APROBADOS (03 completo, 22/22 tests).** 01 (antes 05) tipos literales y unions de literales; 02 (antes 07) narrowing con `typeof` y `undefined`. **03 (refuerzo, jun 2026)** — narrowing con objetos y `null`: surgió en el parcial (B3) que no tenía claras dos herramientas.
  - **A–D (APROBADOS):** trampa `typeof null === "object"` (descartar null por valor / truthiness, NO con `typeof`) + operador `in` para distinguir objetos sin tag (escalera C/D con 1→3 variantes, campos compartidos, capstone null+`in`).
  - **BLOQUE E (APROBADO, E1–E6):** el `null` en el borde de una API REAL, enmarcado en los dos proyectos del usuario (portfolio + e-commerce junior). Enseñó por escrito `?.` (optional chaining) y `??` (nullish coalescing) por primera vez. Drills: recurso null (404), campo opcional null, descuento null, `?.`+`??` en una línea, normalizar carrito null a `[]`, capstone con formato `$`. Aprendizajes clave que costaron: `throw` vs `return` (un valor de respaldo se DEVUELVE, no se lanza — lo confundió 2 veces); `?? []` NO produce `[undefined]` sino `[]` (0 elementos); reuso DRY de `precioFinal` en el capstone (criterio sobre su nivel).
  - **BLOQUE F (APROBADO, F1–F6):** sintaxis fina de `?.`/`??`. F1 encadenar `?.` dos niveles (lee bien la posición del `?.` con la regla mecánica "¿lo de la IZQUIERDA del punto puede ser null?"). F2 trampa del `0` (`??` vs `||`, preserva el `0` legítimo). F3 forma `?.[]` (índice opcional): aquí su `if (length===0)` chocó con `noUncheckedIndexedAccess` (TS no conecta el chequeo de `length` con `[0]`, sigue `string | undefined`) → la idiomática `fotos?.[0] ?? fallback` resuelve los 3 casos y satisface a TS. Cambió `placeholder.png`→`.webp` por realismo; se actualizó el test y el enunciado a `.webp` (lección: cambiar un valor obliga a sincronizar el test que lo verifica). F4 forma `?.()` (llamada opcional): TENÍA EL MODELO MENTAL CRUZADO — creía que accedía al DOM/evento `onClick`; se corrigió a fondo: `b` es un objeto plano, `onClick` una propiedad que guarda una FUNCIÓN (un valor), `b.onClick` la lee y `()` la ejecuta; puente con `props.onClick?.()` de React. F5 encadenar `?.`+índice: error conceptual valioso — puso el `?? "vacío"` A MITAD de la cadena (`u.carrito?.items ?? "vacío"`) creando un tipo mezcla `array | string`; se enseñó que el `??` va UNA vez AL FINAL (analogía tobogán+colchón). Y CAZÓ SOLO un `?.` de más en `items?.[0]` (items no es `|null`) → dedujo la regla "pon `?.` solo donde la izquierda puede ser null/undefined". Quedó la versión mínima de 2 `?.`. F6 capstone 3 formas (`?.prop`+`?.()`+`??`): salió a la primera, usó `??` y no `||` para preservar el descuento `0%` sin recordárselo. Nota histórica: en F2 sobrescribió con un ternario de strings (mi ejemplo "del mundo real") y lo rompió; se aclaró que ese ejemplo era para otro concepto.
- `06-generics-basicos/` — **01 y 02 APROBADOS (02 COMPLETO, 36/36 drills, jun 2026).**
  - 01 (antes 11) — genéricos básicos. 7 drills en escalera (A=identidad / B=`T` en arrays / C=varias etiquetas `<A,B>` / D=`<T,U>` + callbacks). Cubre `<T>` como parámetro inferido, `T[]` y `T | undefined`, mezclar genérico con tipo fijo (`repetir(valor: T, n: number)`), y que en `<T, U>` el tipo de salida `U` lo decide lo que retorna el callback. Se explicó a fondo la ambigüedad de `undefined` en el borde de un array (vacío vs elemento undefined vs hueco/sparse) y `Array.from`. 7/7 tests.
  - 02 (antes 12) — constraints (`extends`) + literales + `keyof` + `T[K]`. Ejercicio grande con drills internos numerados 1→36 (sin letras), por bloques: A/B/refuerzo `extends` (1–13), keyof en escalera (14–21), `keyof` con un solo genérico (BLOQUE E, 22–26), y refuerzo dúo `<T,K>`+`T[K]`+pluck (BLOQUE F, 27–36).
    - **REINICIADO (jun 2026) a "versión nombres descriptivos".** El usuario tenía resueltos 1–30 con la convención `T`/`K`, pero se atascó leyendo la sintaxis ("siento que leo chino", "los tipos vacíos T y K"). A petición suya, se reescribió `exercise-02.ts` DESDE 0 (mismos 36 drills, mismos nombres de función → tests intactos) cambiando los genéricos a **nombres descriptivos** (`Objeto`, `Llave`, `Item`) en explicaciones y starters, con una NOTA arriba aclarando que la convención profesional es `T`/`K` y hay que aprender a LEER ambas. Starters "flojos" otra vez (sin portero / retorno `unknown` / clave `string`) para resolver todos de nuevo. Decisión del usuario: "Reemplazar exercise-02" + "Vacíos para resolver" (aceptó perder las soluciones previas).
    - **Lo que destrabó la lectura** (registrar para FASE 2 React+TS): (a) un genérico es un HUECO que se RELLENA al LLAMAR (T = la forma del objeto que pasas, K = el nombre exacto de la llave); (b) analogía del VESTUARIO — objeto = casilleros; la LLAVE es la ETIQUETA (nombre), el VALOR es lo guardado dentro; `keyof Objeto` = lista de etiquetas, `Objeto[Llave]` = tipo de lo guardado; (c) `keyof T` NO es `string`, es un MENÚ cerrado de literales ("patata" se rechaza) — conecta con drills 14–15; (d) puedes renombrar los genéricos como quieras (no son palabra reservada). Cuesta especialmente: distinguir LLAVE (nombre) vs VALOR (contenido).
    - **Estado tras el reinicio: drills 1–13 APROBADOS (bloque `extends` completo, jun 2026), 14–36 PENDIENTES.** El usuario resolvió 5–13 SOLO entre sesiones, incluidos los dos con truco (7 `areaRect` portero con DOS campos, 8 `presentar` portero con MÉTODO `{ saludar(): string }`), y reutilizó bien el alias `Identificable` en 3 funciones. Dos correcciones menores en la revisión: un typo (`18Va`) y un comentario que decía `false` donde la llamada devuelve `true` (`tieneContenido("Hola buenas tardes")`) — al preguntarle, razonó correcto ("length es 18 y 18 > 0") y lo corrigió él, añadiendo además el caso de contraste `tieneContenido([]) → false`. **Drills 14–36 APROBADOS — BLOQUE F CERRADO (jun 2026), exercise-02 COMPLETO.** Hitos del cierre 28–36: (a) 28 `igualA` (`Objeto[Llave]` en PARÁMETRO): primer intento confundió el tipo del ARGUMENTO (`"treinta"` = string) con el tipo del PARÁMETRO (`valor: number`), y mezcló rechazo de tipos con "devolver false" → se separaron las DOS CAPAS (rechazo en compilación vs comparación en runtime: `25` compila y da false; `"treinta"` ni corre); en el 2º intento aplicó la escalera de sustitución perfecto. (b) 29: la palabra **CONTRATO** hizo clic (la firma define cantidad+tipos; las llamadas se adaptan, no al revés — propuso añadir `c[clave]` para encajar una llamada rota de 4 argumentos y se le corrigió la dirección). La bonus (¿`Llave` se gana su sueldo?) la esquivó ~7 turnos y dijo "no entiendo" → se destrabó con las firmas del 24 vs 29 lado a lado + traza de hover (¿cambia algún tipo al cambiar la llave?); respondió bien "b, sobra porque el retorno siempre es boolean", y la inversa también (28 sin `Llave` → `valor: unknown` = el starter flojo). (c) 30–34: los 5 porteros a la primera (gesto automatizado). PATRÓN a vigilar: cuando el 👉 dice "portero + RETORNO" entrega solo el portero (pasó en 30/33/34 y de nuevo en 35) — darle el check mental "① puerta ② salida". En 34 reincidió en escribir el RESULTADO a mano (`string[]`, mismo error que 18–19) + arrastró un `| undefined` de contrabando del 33; lo corrigió leyendo el error TS2322 (que nombra el tipo correcto en su 1ª línea). Preguntó cómo dedupe el Set → analogía ÁLBUM DE LÁMINAS (lámina repetida no tiene segundo casillero) + 3 pasos map→Set→spread; cerró bien. (d) 35 `dosValores`: la TUPLA costó 3 intentos (unión `A | B[]` → `Objeto[Llave1, Llave2]` → coma faltante) → se enseñó la SIMETRÍA valor↔tipo (`["Nico", 23]` ↔ `[string, number]`) + tabla de los 3 corchetes (`X[]` array / `[X,Y]` tupla / dueño de cada par); pregunta de control bien: con UN hueco compartido TS infiere la UNIÓN y las dos posiciones pierden precisión. (e) 36 capstone `buscarPor`: firma de 3 piezas A LA PRIMERA. Su ejemplo `buscarPor({}, ...)` decía "undefined" pero en realidad NO COMPILA (las dos capas otra vez, espejo del error del 21) — lo corrigió él con un caso runtime real (`[{id:3}], "id", 2` → undefined). Pregunta de control bien: `.find` devuelve el OBJETO COMPLETO (vs `valorDe` que da el contenido del casillero) → por eso `Objeto | undefined`. Nota didáctica del 22: su primer intento trajo el DÚO completo (`<Objeto, Llave extends keyof Objeto>`) — compila, pero es un genérico que "no gana su sueldo" (nadie usa lo que `Llave` captura; se conectó con el criterio D3 del parcial). Se le dio la REGLA DE DECISIÓN del bloque: ¿el retorno depende de la llave? → dúo + `Objeto[Llave]`; ¿retorno concreto (boolean/string/number)? → un solo genérico + `clave: keyof Objeto`. Corrigió a la forma ligera bien. Hitos del cierre del bloque E (24–27, jun 2026): (a) 24 `sonIguales` lo resolvió SOLO entre sesiones aplicando la regla de decisión sin recordatorio, y probó con llaves number Y string. (b) 25–26: firmas bien, pero su modelo verbal de `filter` necesitó TERCERA corrección de LLAVE vs VALOR (insistía en "¿la clave está dentro del objeto?") — lo destrabó el argumento "si fuera existencia de la llave, los dos objetos la tienen → retornaría siempre arr.length, pero retorna 1" + traza peldaño a peldaño de `obj[clave]` (la etiqueta se USA para sacar el valor; `Boolean` evalúa su veracidad). Cerró con frase correcta propia: "saca false porque el VALOR de ok es false". Matiz enseñado: cuenta truthy, no solo `true` literal. (c) La pregunta de control (¿por qué E no necesita `Llave`?) dijo "no sé" DOS veces → se enseñó con escalera concreta (mismas 3 llamadas contra `mostrarValor` vs `valorDe`: ¿cambia el TIPO de salida al cambiar la llave?) + **analogía GUARDARROPA vs FOTOCOPIADORA** (guardarropa = te devuelven LO QUE dejaste → el ticket `Llave` debe recordar el casillero → dúo; fotocopiadora = salga lo que salga es papel/string → salida fija → sin `Llave`). Respondió bien: "fotocopiadora, siempre retorna number aunque cambie la llave". REGISTRAR: la analogía guardarropa/fotocopiadora funcionó — reusarla en bloque F y FASE 2. (d) 27 `valorDe`: el dúo completo a la primera. Además dijo que el 21 fue "el techo" de sintaxis y pidió expandir con más ejercicios tipo 21 → se le mostró que el bloque F (27–36) ES esa expansión; si tras terminar F sigue floja la sintaxis, montarle un bloque G con más plucks. En el 21 la firma salió bien a la primera, pero su llamada de ejemplo pasó UN objeto suelto donde iba `Objeto[]` (TS2353 "'id' does not exist in type 'unknown[]'") — se conectó con la mochila/argumentos y con CÓMO LEER el error ("si TS menciona `X[]` donde veías un objeto, sospecha corchetes"); lo corrigió él. Hitos del tramo 14–20: (a) en 18–19 escribió el RESULTADO a mano (`string`/`boolean`) en vez del acceso indexado — se le exigió la sintaxis `Libro["titulo"]` con el argumento de mantenimiento + "en el 20 no podrás escribir el resultado porque no lo sabes"; corrigió bien. (b) En el 20 tenía la firma correcta pero NO el modelo: preguntó "¿la función retorna Objeto[Llave]?" y creía que la llamada `propiedad({...}, "name")` tenía 3 ARGUMENTOS (contaba las propiedades del objeto inline como argumentos) — se destrabó con: comas dentro de `{}` separan PROPIEDADES vs coma del paréntesis separa ARGUMENTOS (analogía mochila: 2 cosas, no 3) + reescritura `const ana = {...}; propiedad(ana, "name")`. (c) Pidió ver la versión JS → se enseñó type erasure en concreto (la firma es 80% tipos; lo que sobrevive es `function propiedad(obj, llave) { return obj[llave] }` que ya dominaba de JS). (d) En la pregunta de control dijo "el retorno podría ser un objeto" → se destrabó con la ESCALERA DE SUSTITUCIÓN (rellenar huecos = reemplazar texto: `Objeto[Llave]` → `{id:number;tipo:string;activo:boolean}["tipo"]` → drill 18 → `string`); verificó solo la segunda (`"activo"` → boolean). Patrón didáctico que le funciona 2 veces ya: sustitución mecánica peldaño a peldaño.
    - **Terreno conceptual cubierto esta sesión (jun 2026) — registrar para no repetir:** (a) VOCABULARIO afinado: lo de `<>` es un **parámetro de tipo** (paralelo a parámetro de valor `(x)`); lo que entra al llamar es el **argumento de tipo**; TS lo deduce solo = **inferencia**. (b) Es **exclusivo de TS/lenguajes tipados**: JS no tiene tipos, por eso nunca los usó; al compilar se **borran** (*type erasure*). (c) Analogía que funcionó y se CORRIGIÓ: chapa de baño (abre con cualquier cosa) = `<Item>` PELADO; la "llave con diseño" = el `extends`/constraint, NO el parámetro de tipo (él la confundía). Superpoder que la analogía no capturaba: el parámetro de tipo **recuerda qué lo abrió** (captura el tipo para reusarlo en la salida) — por eso brilla cuando el retorno depende de la entrada (`Objeto[Llave]`), y por eso en drill 3 "no ganaba su sueldo". (d) El constraint es un **contrato de doble lado**: tiene que servir al CUERPO (`> 0` pide algo numérico) Y a los CALLERS reales (el `.length` de string/array ES number) — `{length:string}` fallaría por ambos. (e) "¿Para qué sirven en la vida real?" (pregunta suya, hilo de impostor): se aterrizó con casos de SUS proyectos — ya usó genéricos sin saberlo (`useState<Producto[]>`, `useRef<HTMLInputElement>`), `getJSON<T>` (fetch tipado), `sortBy(productos, "precio")` con `keyof` (typo de columna = error en editor), `<Table items={...}>` reutilizable. (f) Frase-resumen que quedó: **genéricos = reutilización SIN perder precisión de tipo** (vs duplicar = preciso pero no reusable; vs `any` = reusable pero tiras la seguridad); y la "seguridad" es en DESARROLLO (editor/CI), no protege el producto en runtime.
  - Notas didácticas clave: tipos literales como subtipo estrecho de `string` (analogía círculos / código de vestimenta), y que el tipo de salida en map/filter lo decide el callback.
- `08-discriminated-unions/` — **01 y 02 APROBADOS.** 01 (antes 08) uniones discriminadas. **02 (refuerzo, jun 2026)** — discriminante-por-PROPIEDAD (mató el reflejo de `typeof figura` que falló en el parcial) + exhaustividad con `never`. 5 drills (A=narrowing por propiedad, B=patrón `never` con 3 y 4 variantes). El usuario hizo clic con el `never`: entendió que es chequeo en COMPILACIÓN (no runtime), que TS borra los tipos, y que `never` = "ya no queda ningún caso por atender". 5/5 tests.

#### Parcial diagnóstico — `00-evaluacion/parcial-01` (EN CURSO, jun 2026)

Examen escrito con autocorrección, nivel criba (~12 ítems). Formato simple: un hueco por ítem (tipos → reemplazar `SIN_RESPONDER`; opción múltiple → letra; código → completar cuerpo/firma; cada uno con su "Por qué" que revisa el coach). Corrección: tipos por `pnpm typecheck`, comportamiento por `pnpm test:run`. A1 va resuelta como ejemplo.

- **A1, A2, A3 (inferencia) — APROBADAS.** widening en objeto, `as const`→literal, y `numerosA[0]` = `number | undefined` (costó: reforzar widening de array + `noUncheckedIndexedAccess`).
- **B1 (`formatear`, narrowing primitivo) — APROBADA.** early return, narrowing por flujo de control.
- **B2 (`area`, discriminated union + `never`) — APROBADA**, pero requirió todo el refuerzo de `08-discriminated-unions/exercise-02` (había salido con `typeof figura`).
- **B3 — APROBADA (jun 2026).** `"b"` + Por qué completo en el archivo (quirk `typeof null === "object"`, quién se cuela, y el chequeo correcto `typeof x === "object" && x !== null` — llegó solo a la forma profesional). Corrección de dirección en su 1ª frase: "object puede ser null" → "null se DISFRAZA de object ante typeof".
- **C1 ✅, C2 ✅, D1 ✅, D2 ✅.** OJO: en D2 añadió una llamada con comentario falso (`columna([...{animal:"perro"}], "numero") // [1,2], perro no cuenta`) — se le corrigió: `.map` NUNCA salta elementos, devuelve `[1, 2, undefined]` (largo 3); "decidir quién cuenta" es de `.filter` → conecta con el bloque E pendiente de `04-objetos`. PENDIENTE verificar que corrigió ese comentario.
- **D3 — APROBADA (jun 2026).** Primero adivinó "c" por desconocer `void` → se enseñó `void` ("no devuelve nada", console.log/handlers) + traducción de `T`/`U` a nombres descriptivos; con eso aplicó SOLO el criterio fotocopiadora del 29 y respondió "b" bien. Vocabulario corregido: dijo "constraint" donde era "parámetro de tipo" (en `imprimir<T>` no hay `extends`). La "firma mínima" costó 3 intentos (escribió una LLAMADA de mapear; luego CÓDIGO VIVO `imprimir(x: number): number {return x+1}` con export default de autocompletado) → se separó FIRMA (declara huecos) vs LLAMADA (los rellena) y se le dio la respuesta: `imprimir(x: unknown): void`; quedó apuntado el contraste `<T>` (recuerda, nadie lo usa = decorativo) vs `unknown` (acepta todo sin recordar = correcto aquí; en los plucks era DEFECTO, aquí es elección).
- **E1 — FIRMA CORRECTA Y VERIFICADA (12/12 tests + rechazo de tipos activo); falta SOLO el "Por qué" (línea 169).** Su solución: `<Objeto extends Record<Clave, number>, Clave extends keyof Objeto>` — MEJOR que la receta del coach (que proponía `Clave extends string` por miedo a circularidad): TS acepta esta referencia mutua y su forma expresa los 2 requisitos literalmente. REGISTRAR la confesión hecha: el chequeo de circularidad de TS es más laxo de lo que el coach pintó. Se enseñó `Record<Llaves, Valor>` (fábrica de formas; puente: es la "llave calculada `[id]`" a nivel de tipos) y la FLECHA INVERTIDA (antes: Objeto manda, Llave del menú; ahora: Clave manda, Objeto debe tenerla con number — necesaria cuando el cuerpo hace matemática: `>`, `+`). Tras la firma dijo "se me hace demasiado complejo" y pidió ejercicios aparte → se montó `07-utility-types/exercise-01` (ver abajo). El "Por qué" de la línea 169 se responde con el drill 6 de ese archivo (el operador `>` exige números; keyof solo garantiza que la etiqueta existe).

**Retomar la próxima sesión por aquí (actualizado 12 jun 2026): `07-utility-types/exercise-01`, drill 1** — `04-objetos/exercise-04` quedó CERRADO (10/10) y vuelve el hilo de Record: escalera montada a petición suya porque el E1 del parcial "se le hizo complejo". 8 drills: A (1–3, fabricar tipos con Record, starters `unknown`), B (4, portero de clave FIJA `Record<"precio", number>` = puente con su bloque B de generics), C (5–8, clave VARIABLE con el dúo `<Clave extends string, Objeto extends Record<Clave, number>>`; el 6 `esPositivo` contiene la respuesta al "Por qué" del E1; el 8 `minimoPor` es el ESPEJO exacto del E1 con `<`). Estado inicial verificado: 8/8 tests runtime verdes, typecheck rojo solo por starters (TS2344 aliases + TS2578 expect-errors dormidos + TS2536/TS2339 firmas flojas). **Al terminar el drill 8: (a) escribir el "Por qué" de `parcial-01.ts:169` (con eso el parcial queda CERRADO), (b) releer la firma de `maximoPor` para confirmar que ya se lee sola.** Otros hilos abiertos: el "Por qué" del E1 (parcial línea ~170) ya tiene una respuesta breve del usuario ("requiere number para comparar con `>`") — va bien encaminada pero falta la otra mitad (por qué `keyof` solo NO basta); revisarla al llegar al drill 6 de Record. El comentario de D2 quedó VERIFICADO como corregido (12 jun 2026). Si los plucks aún se sienten flojos, bloque G opcional en 06-generics.

- Próximos: terminar `07-utility-types/` (tras exercise-01 de Record: Partial, Pick, Omit, Readonly...), antes de FASE 2 (React + TS).
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
