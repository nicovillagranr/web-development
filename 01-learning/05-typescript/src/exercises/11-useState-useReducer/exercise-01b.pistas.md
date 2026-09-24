# Pistas — exercise-01b · la función que le entregas a `filter`

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Aquí casi toda la señal está en el test. Solo el drill 2 rompe el compilador, y es el único
cuya Pista 3 empieza por un `TS####`.

---

## Drill 1 — `soloLargos`

<details><summary>Pista 1 — conceptual</summary>

El starter devuelve el array tal cual: nunca llega a decidir nada sobre cada palabra.

Lo que falta es un sitio donde se haga una pregunta, una vez por elemento. La pregunta ya
la sabes ("¿mide más de 3?"); lo que falta es quién la hace y dónde se escribe.

</details>

<details><summary>Pista 2 — más concreta</summary>

`filter` es ese sitio. Recibe una función, la llama con cada palabra, y se queda con
aquellas para las que la llamada devolvió algo truthy.

Esa función la escribes tú ahí mismo, entre los paréntesis de `filter`. Recibe una palabra
y devuelve la respuesta.

Y no hace falta que protejas el array original: `filter` fabrica uno nuevo, por eso el
segundo test pasa ya con el starter.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'sol', 'luna', 'mar', 'cielo' ] to deeply equal [ 'luna', 'cielo' ]
+   "sol",
+   "mar",
```

El `+` es lo que devolvió tu función. Sobran las dos cortas: no se ha descartado ninguna.

</details>

<details><summary>Solución</summary>

```ts
export function soloLargos(palabras: string[]): string[] {
  return palabras.filter((p) => p.length > 3);
}
```

`(p) => p.length > 3` es el **callback**: una función que no llamas tú. Se la entregas a
`filter` y él la llama cuatro veces, una por palabra.

</details>

---

## Drill 2 — `soloLargosConRegla`

<details><summary>Pista 1 — conceptual</summary>

La regla ya está escrita en `mideMasDeTres`, así que aquí no hay que pensar ninguna
condición: hay que entregar esa función.

Mira con lupa lo que el starter le pasa a `filter`. Hay dos caracteres de más, y cambian
por completo lo que llega.

</details>

<details><summary>Pista 2 — más concreta</summary>

`mideMasDeTres` es la función. `mideMasDeTres()` es **llamarla ahora mismo**, sin ningún
argumento, y entregar a `filter` lo que esa llamada devuelva.

Es el `exercise-01` del bloque 10, el de entregar contra ejecutar: los paréntesis con algo
dentro son la marca de una llamada.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Este es el único drill del archivo que no compila:

```
exercise-01b.tsx(89,26): error TS2554: Expected 1 arguments, but got 0.
exercise-01b.tsx(89,26): error TS2769: No overload matches this call.
```

El primero es la queja directa: `mideMasDeTres` pide una palabra y la estás llamando con
las manos vacías. El segundo es la consecuencia: lo que esa llamada devolvería no encaja
en lo que `filter` acepta.

</details>

<details><summary>Solución</summary>

```ts
export function soloLargosConRegla(palabras: string[]): string[] {
  return palabras.filter(mideMasDeTres);
}
```

Sin paréntesis. Le das la función y `filter` se encarga de llamarla, pasándole cada
palabra como argumento. Los paréntesis los pone él, no tú.

</details>

---

## Drill 3 — `sinVacios`

<details><summary>Pista 1 — conceptual</summary>

El starter se queda exactamente con lo que había que tirar. La estructura es correcta y el
resultado es el contrario del que se pide.

</details>

<details><summary>Pista 2 — más concreta</summary>

`filter` conserva los elementos para los que el callback devuelve algo truthy. Tu condición
devuelve `true` justo para los vacíos.

Ojo con el enunciado: `"  "` con espacios **no** está vacío y tiene que quedarse. Compara
con el texto vacío exacto, no uses la truthiness aquí.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ '' ] to deeply equal [ 'hola', '  ', 'adios' ]
```

Devolviste solo el vacío, que es precisamente el único que sobraba.

</details>

<details><summary>Solución</summary>

```ts
export function sinVacios(textos: string[]): string[] {
  return textos.filter((t) => t !== "");
}
```

Aquí la comparación exacta importa: si hubieras escrito `filter((t) => t)`, el `"  "` se
salvaría igual —tiene espacios, es truthy— pero estarías filtrando por categoría sin
quererlo. El drill 5 va justo de eso.

</details>

---

## Drill 4 — `esTruthy`

<details><summary>Pista 1 — conceptual</summary>

Te preguntan si el valor pertenece a una categoría, no si es igual a un valor concreto.
El starter compara con uno concreto.

Es la distinción que cerraste en el `exercise-03` del vocabulario.

</details>

<details><summary>Pista 2 — más concreta</summary>

El enunciado dice que la respuesta ya la da una función que existe. Existe desde siempre en
JavaScript y lleva el nombre de lo que devuelve.

Llámala con el valor y devuelve lo que responda. Una línea.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected false to be true // Object.is equality
```

Sale en el primer caso, con `"hola"`. Un texto no vacío es truthy, pero no es `true`: por
eso `valor === true` dice que no.

</details>

<details><summary>Solución</summary>

```ts
export function esTruthy(valor: unknown): boolean {
  return Boolean(valor);
}
```

`Boolean(x)` contesta exactamente esa pregunta y no otra. Y fíjate en los dos casos del
test que sorprenden: `[]` y `{}` son **truthy**, aunque estén vacíos. Solo hay seis falsy y
ninguno de los dos está en la lista.

</details>

---

## Drill 5 — `sinHuecos`

<details><summary>Pista 1 — conceptual</summary>

El starter descarta un hueco de los dos que menciona el enunciado. Le falta el otro.

Puedes añadir una segunda comparación con `&&`… o cambiar de idea y preguntar por la
categoría en vez de por cada valor concreto.

</details>

<details><summary>Pista 2 — más concreta</summary>

`undefined` y `""` son los dos falsy. Preguntar por la categoría los descarta a los dos de
una vez, y con la función del drill 4.

Las dos formas valen y hacen lo mismo:
una función flecha que llame a esa función, o entregar esa función directamente.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'hola', '', 'adios' ] to deeply equal [ 'hola', 'adios' ]
+   "",
```

El `undefined` sí se fue. El texto vacío sigue ahí: `"" !== undefined` es cierto, así que
tu condición lo dejó pasar.

</details>

<details><summary>Solución</summary>

```ts
export function sinHuecos(valores: (string | undefined)[]): (string | undefined)[] {
  return valores.filter(Boolean);
}
```

Equivale a `valores.filter((v) => Boolean(v))`, y es la forma corta que verás escrita por
ahí. Las dos entregan la misma pregunta.

El tipo de salida sigue diciendo `(string | undefined)[]` aunque dentro ya no quede ningún
hueco: `filter` limpia el array en ejecución y no se lo cuenta a TypeScript. Está declarado
en la teoría a propósito — no es que te falte nada.

</details>

---

## Drill 6 — `mensajesDe`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 5 otra vez, y lo único que cambia es de dónde sale el array.

Aquí no te lo dan hecho: lo fabricas tú con las dos propiedades de la caja, y luego lo
filtras igual que antes.

</details>

<details><summary>Pista 2 — más concreta</summary>

Primero mete las dos propiedades en un array literal, en el orden del enunciado. Como las
dos son opcionales, ese array puede traer huecos.

Después, el mismo filtro del drill 5. No hace falta ningún `if` para el caso sin errores:
filtrar un array de dos huecos deja un array vacío, que es justo lo que se pide.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ '', 'Correo inválido' ] to deeply equal [ 'Correo inválido' ]
+   "",
```

Los dos primeros casos del drill ya pasan con el starter: mientras los huecos sean
`undefined`, descartar solo `undefined` funciona. El caso que lo tumba es el del nombre
vacío — el mismo borde del drill 5.

</details>

<details><summary>Solución</summary>

```ts
export function mensajesDe(errores: ErroresForm): (string | undefined)[] {
  return [errores.nombre, errores.email].filter(Boolean);
}
```

Esta es, línea por línea, la del drill 4 del `exercise-01`:

```ts
const mensajes = [errores.nombre, errores.email].filter(Boolean);
```

Ahora puedes leerla entera: un array literal con dos propiedades opcionales, `filter`
llamando a `Boolean` una vez por elemento, y los seis falsy fuera. Lo único que falta allí
es el `if (mensajes.length === 0) return null`, que no es de `filter` — es que un componente
que devuelve `null` no pinta nada.

</details>
