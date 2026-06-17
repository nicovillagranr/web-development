# 00-vocabulario — Drills de VOCABULARIO TypeScript

Carpeta dedicada a practicar **cómo se NOMBRAN las piezas** de TypeScript/JavaScript,
no a resolver lógica. Surgió (15 jun 2026) porque el usuario se autodiagnosticó que,
al explicar ejercicios por su cuenta, **acierta la lógica pero se equivoca en los
conceptos/vocabulario** (clásico: dice "se imprime" cuando quiere decir "se retorna").

> **Para una sesión futura que abra esta carpeta:** esto NO es un tema nuevo de TS.
> Es refuerzo de *terminología* sobre cosas que el usuario YA sabe usar. El objetivo
> es que pueda explicar en voz alta (entrevista, code review) sin cruzar conceptos.
> Es vocabulario → se arregla con repetición etiquetada, no con teoría nueva.

## Cómo funciona un drill aquí

La gracia es hacer el vocabulario **auto-corregible** reutilizando lo que el usuario
ya domina: **tipos literales + uniones de literales**. Cada drill es una pregunta
cuya respuesta es una palabra de un menú cerrado; el test verifica la palabra.

Formato sugerido (`exercise-NN.ts` + `exercise-NN.test.ts`, igual que el resto del repo):

```ts
// En `function saludar(nombre: string) { ... }`, ¿qué es `nombre`?
export const r1: "parámetro" | "argumento" | "propiedad" = "SIN_RESPONDER"
//                                                          ▲ el usuario reemplaza esto
```

```ts
// exercise-NN.test.ts
expect(r1).toBe("parámetro")
```

- El menú de la unión (`"parámetro" | "argumento" | ...`) ya le enseña las opciones válidas.
- Si pone una palabra que no está en la unión → **error de tipo** (typecheck rojo).
- Si pone una válida pero equivocada → **test rojo**.
- Cada drill lleva su **"¿Por qué?"** como comentario, que el coach revisa (igual que el parcial):
  no basta acertar la palabra, hay que poder justificarla.

Variante alternativa: dar una **frase mal dicha** y pedir la versión corregida
(string exacto), o un fragmento de código y etiquetar varias piezas a la vez.

## Pares que más se le cruzan (material de partida)

Construir los primeros drills alrededor de estos (de las sesiones hasta jun 2026):

| Confunde | Lo correcto | Matiz |
|---|---|---|
| "se **imprime**" | **retornar / devolver** | imprimir = `console.log` (muestra en pantalla); retornar = entregar un valor a quien llamó. Una función puede retornar sin imprimir y viceversa (`void`). |
| **parámetro** | vs **argumento** | parámetro = lo que DECLARA la función (`(x: number)`); argumento = lo que PASAS al llamar (`f(5)`). |
| **propiedad** | vs **parámetro** vs **elemento** | propiedad = de un objeto; parámetro = de una función; elemento = de un array. |
| **tipo** | vs **valor** | los dos trabajos del `:` — `edad: number` (tipo) vs `edad: 5` (valor). "¿a la derecha hay un tipo o un valor?" |
| **parámetro de tipo** (`<T>`) | vs **argumento de tipo** vs **constraint** (`extends`) | `<T>` declara el hueco; el argumento de tipo lo rellena al usar; el `extends` es el contrato/constraint. |
| **declarar / firmar** una función | vs **llamarla** | la firma declara los huecos; la llamada los rellena. |

## Reglas (heredadas del modo coach)

- Vive en este repo, bajo `src/exercises/`, mismo formato `exercise-NN.ts(x)` + test.
- Enunciado completo como comentario dentro del archivo (convención del proyecto).
- Un drill a la vez; no aprobar si la palabra es correcta pero el "¿Por qué?" es flojo.
- Comentarios didácticos (material de estudio), no one-liners secos.

Ver el contrato completo del coach en `../../../README.md` → "Contrato del modo coach".
