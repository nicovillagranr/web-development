# 05 — TypeScript

Ruta de aprendizaje progresiva de TypeScript, del cero a aplicarlo en proyectos React.

## Setup inicial

```bash
npm install
```

## Cómo ejecutar cada archivo

```bash
npx tsx 01-tipos-basicos/notas.ts
```

O para chequear tipos sin ejecutar (como lo haría el IDE):

```bash
npm run check
```

## Orden recomendado

| # | Tema | Qué aprendes |
|---|---|---|
| 00 | intro | Qué es TS y por qué usarlo |
| 01 | tipos-basicos | `string`, `number`, `boolean`, `any`, `unknown`, inferencia |
| 02 | arrays-tuplas | Arrays tipados, tuplas, readonly |
| 03 | objetos-interfaces | `interface` vs `type`, propiedades opcionales |
| 04 | funciones | Parámetros tipados, retorno, opcionales, overloads |
| 05 | unions-narrowing | `\|`, literal types, type guards |
| 06 | generics | Funciones y tipos genéricos |
| 07 | utility-types | `Partial`, `Pick`, `Omit`, `Record`, `Readonly` |
| 08 | clases | Clases tipadas, modificadores, `implements` |
| 09 | react-practico | Cómo aplicar todo esto a componentes React |

## Cómo estudiar cada carpeta

1. Lee el archivo `notas.ts` de arriba a abajo.
2. Los comentarios explican el concepto, el código muestra el uso.
3. Al final de cada archivo hay una sección **EJERCICIOS** — intenta resolverlos.
4. Ejecuta con `npx tsx <ruta>` para ver el resultado.

## Recursos oficiales

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TS Playground](https://www.typescriptlang.org/play) — probar sin instalar nada
- [Type Challenges](https://github.com/type-challenges/type-challenges) — cuando domines lo básico
