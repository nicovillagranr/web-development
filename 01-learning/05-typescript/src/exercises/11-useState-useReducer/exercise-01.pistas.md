# Pistas — exercise-01

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.

## Drill 1 — `Contador`

<details><summary>Pista 1 — conceptual</summary>

El componente no tiene ningún error de tipos, y aun así el test lo caza. Eso ya te
dice dónde NO está el problema. Corre el test y mira qué número esperaba y cuál salió:
la diferencia entre los dos te dice qué operación se está ejecutando de verdad en
`n + 1`.
</details>

<details><summary>Pista 2 — más concreta</summary>

En JS el `+` hace dos trabajos distintos según lo que tenga a los lados, y elige solo.
Mira el valor inicial que le has dado al hook y pregúntate de qué tipo es `n` por su
culpa. La corrección es de un solo carácter.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Aquí `pnpm typecheck` **no dice nada**, y es a propósito: `"0" + 1` es código
perfectamente válido en TS. Da `"01"`, luego `"011"`. La señal está solo en el test.

Ese es el aviso del archivo: un tipo mal puesto no siempre rompe la compilación.
</details>

<details><summary>Solución</summary>

```tsx
const [n, setN] = useState(0)
```

El inicial `"0"` hacía que el estado fuese `string`, y entonces `n + 1` era
concatenación, no suma. Con `0` el estado es `number` y el `+` suma.
</details>

---

## Drill 2 — `Interruptor`

<details><summary>Pista 1 — conceptual</summary>

El enunciado te dice que el `useState` ya está bien. Así que no lo toques: lo que hay
que traducir es todo lo demás. Recorre el componente buscando sitios donde se sigue
tratando el estado como si guardara palabras.
</details>

<details><summary>Pista 2 — más concreta</summary>

Hay dos comparaciones con `===` y las dos sobran enteras. Un booleano no necesita que
lo compares con nada para saber si es verdadero: ya lo es o no lo es. Y para obtener
el contrario de un booleano hay un operador de un solo carácter.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2367: This comparison appears to be unintentional because the types 'boolean'
and 'string' have no overlap.
error TS2345: Argument of type '"no" | "si"' is not assignable to parameter of type
'SetStateAction<boolean>'.
```

El primero sale dos veces, una por comparación. "No overlap" significa que los dos
lados no pueden ser iguales jamás, así que esa comparación siempre da `false`.
</details>

<details><summary>Solución</summary>

```tsx
const [encendido, setEncendido] = useState(false)

return (
  <button onClick={() => setEncendido(!encendido)}>
    {encendido ? "ON" : "OFF"}
  </button>
)
```

`!encendido` es el contrario del booleano, y en el ternario el booleano se usa tal cual
como condición. Las dos comparaciones con textos sobraban.
</details>

---

## Drill 3 — `SelectorColor`

<details><summary>Pista 1 — conceptual</summary>

El componente arranca sin nada elegido, y eso está bien: el `null` inicial es correcto
y tiene que quedarse. El problema es que ese `null` es la ÚNICA información que TS
tiene sobre este estado, y con eso ha sacado una conclusión demasiado estrecha.

Pregúntate: además de `null`, ¿qué otra cosa va a guardar este estado alguna vez?
</details>

<details><summary>Pista 2 — más concreta</summary>

Necesitas decirle a TS las dos posibilidades a la vez, y eso se escribe con el mismo
símbolo que ya usas en las uniones de literales. Ese tipo se lo pasas al hook en el
sitio que sale en la SINTAXIS de la teoría 2 — no como anotación de la constante.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'string' is not assignable to parameter of type
'SetStateAction<null>'.
```

Léelo al revés: el setter solo acepta `null`, porque el estado entero es `null`. No es
que sobre el color; es que falta permitir que quepa.
</details>

<details><summary>Solución</summary>

```tsx
const [elegido, setElegido] = useState<string | null>(null)
```

El argumento de tipo `<string | null>` declara las dos situaciones posibles: todavía
sin elegir, o con un color dentro. El valor inicial sigue siendo `null`.
</details>

---

## Drill 4 — `AvisoErrores`

<details><summary>Pista 1 — conceptual</summary>

Aquí no hay ningún `useState`: el objeto llega por props. Pero el problema es
exactamente el mismo del drill 3, un piso más arriba — alguien ha descrito el objeto
por cómo se ve cuando está vacío, en vez de por lo que puede llegar a traer.

Y fíjate en que `ErroresForm` ya está declarada unas líneas más arriba, sin usar.
</details>

<details><summary>Pista 2 — más concreta</summary>

`{}` como tipo no significa "un objeto cualquiera": significa un objeto del que no se
sabe ninguna propiedad. Por eso pedirle `.nombre` es pedirle algo que, según su tipo,
no existe. Cámbialo por el tipo que sí describe las propiedades.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'nombre' does not exist on type '{}'.
error TS2339: Property 'email' does not exist on type '{}'.
```

Y ESLint añade el suyo, que lo explica mejor todavía: *"The `{}` (\"empty object\") type
allows any non-nullish value, including literals like `0` and `\"\"`."*
</details>

<details><summary>Solución</summary>

```tsx
export function AvisoErrores({ errores }: { errores: ErroresForm }) {
```

`ErroresForm` declara `nombre?` y `email?`: los dos rótulos existen, y el `?` permite
que vengan vacíos. Por eso `errores={{}}` sigue siendo válido para el test.
</details>

---

## Drill 5 — `ListaTareas`

<details><summary>Pista 1 — conceptual</summary>

Este tiene DOS fallos independientes, y hasta que no arregles el primero no vas a
poder ver el segundo. Uno es de tipos y te lo canta el compilador. El otro es de
comportamiento: el estado cambia pero la pantalla no.

Empieza por el de tipos, y luego pregúntate qué necesita React para enterarse de que
un array ha cambiado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Primero: `[]` no le dice a TS qué va a caber dentro, y `Tarea` está declarada justo
encima esperando.

Segundo: `.push` modifica el array que ya tienes y devuelve un número. Al pasarle a
React el mismo array de siempre, React compara y ve que no ha cambiado nada. Necesitas
entregarle un array **distinto**, no el mismo con una cosa más.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type '{ id: number; titulo: string; hecha: boolean; }' is
not assignable to parameter of type 'never'.
error TS2339: Property 'id' does not exist on type 'never'.
error TS2339: Property 'titulo' does not exist on type 'never'.
```

`never` es "no puede haber ningún valor de este tipo". Es lo que infiere de `[]`:
un array donde no cabe nada. Cuando lo veas aparecer solo, casi siempre es esto.
</details>

<details><summary>Solución</summary>

```tsx
const [tareas, setTareas] = useState<Tarea[]>([])

const anadir = () => {
  const nueva: Tarea = {
    id: tareas.length + 1,
    titulo: `Tarea ${tareas.length + 1}`,
    hecha: false,
  }
  setTareas([...tareas, nueva])
}
```

`<Tarea[]>` dice qué cabe dentro sin dejar de arrancar vacío. Y `[...tareas, nueva]`
construye un array NUEVO con lo de antes más uno: como es otra referencia, React sí
detecta el cambio y repinta.
</details>
