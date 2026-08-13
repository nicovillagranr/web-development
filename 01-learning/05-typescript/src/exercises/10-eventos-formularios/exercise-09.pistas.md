# Pistas — exercise-09 · el manejador que traduce

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `CampoTexto`

<details><summary>Pista 1 — conceptual</summary>

Entregar una función y entregar un envoltorio que la llama no es lo mismo — es el
concepto del `exercise-01` de esta carpeta, ahora con consecuencias. Mira el
`📌 RECORDATORIO` de arriba: las dos formas están dibujadas juntas.
</details>

<details><summary>Pista 2 — más concreta</summary>

Tal como está, `alEscribir` va a recibir lo que `onChange` reparte: el evento
entero. Y la prop no pide un evento, pide el texto. Alguien tiene que abrir la caja
por el camino, y ese alguien es este componente.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(valor: string) => void' is not assignable to type
'ChangeEventHandler<HTMLInputElement, HTMLInputElement>'.
  Types of parameters 'valor' and 'event' are incompatible.
    Type 'ChangeEvent<HTMLInputElement, HTMLInputElement>' is not assignable to
    type 'string'.
```

La tercera línea es la traducción exacta del problema: te va a llegar un
`ChangeEvent` donde tu función pide un `string`.
</details>

<details><summary>Solución</summary>

```tsx
<input onChange={(e) => alEscribir(e.target.value)} />
```
</details>

---

## Drill 2 — `Interruptor`

<details><summary>Pista 1 — conceptual</summary>

Una casilla no se "escribe": se marca o se desmarca. Su `value` existe —vale `"on"`
por defecto— pero no cuenta lo único que importa de una casilla, que es en qué
estado ha quedado.
</details>

<details><summary>Pista 2 — más concreta</summary>

El elemento tiene otra propiedad para eso, de tipo `boolean`, y se llama igual que
el atributo que pondrías en el HTML para que saliera marcada de inicio.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'boolean'.
```

Corto y exacto: le estás dando un texto a algo que pide un sí/no.
</details>

<details><summary>Solución</summary>

```tsx
<input type="checkbox" onChange={(e) => alCambiar(e.target.checked)} />
```
</details>

---

## Drill 3 — `CampoConNombre`

<details><summary>Pista 1 — conceptual</summary>

Los dos datos que necesitas ya están los dos en la llamada. El problema no es de
dónde sacarlos.
</details>

<details><summary>Pista 2 — más concreta</summary>

Lee la firma de la prop despacio: `(campo: string, valor: string) => void`. Primero
el campo, después el valor. Ahora mira en qué orden se los estás pasando.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador, y este es el caso que más conviene entender de todo
el archivo.** Los dos parámetros son `string`, así que cualquier orden encaja: para
los tipos, `(valor, nombre)` y `(nombre, valor)` son la misma llamada.

**Cuando dos parámetros seguidos tienen el mismo tipo, el compilador deja de
cubrirte.** Por eso en código real se prefiere pasar un objeto —`{ campo, valor }`—
en cuanto hay dos o tres: las claves tienen nombre y el orden deja de importar.
</details>

<details><summary>Solución</summary>

```tsx
<input name="email" onChange={(e) => alCambiar(e.target.name, e.target.value)} />
```
</details>

---

## Drill 4 — `BotonBorrar`

<details><summary>Pista 1 — conceptual</summary>

Estás yendo al DOM a buscar un dato que ya tienes escrito arriba, en las props del
componente. Es el mismo viaje de más que el drill 4 del 08.
</details>

<details><summary>Pista 2 — más concreta</summary>

Si el dato no sale del evento, el manejador no necesita el evento para nada: puede
no declarar el parámetro y llamar directamente con lo que ya sabe.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `e.currentTarget.id` es un `string` perfectamente
válido y `alBorrar` pide un `string`: encaja. Que ese `<button>` no tenga atributo
`id` y devuelva cadena vacía no es algo que los tipos puedan saber — eso se ve
ejecutándolo.
</details>

<details><summary>Solución</summary>

```tsx
<button aria-label={`Borrar ${id}`} onClick={() => alBorrar(id)}>Borrar</button>
```
</details>

---

## Drill 5 — `CampoCantidad`

<details><summary>Pista 1 — conceptual</summary>

`type="number"` es una instrucción para el navegador sobre cómo pintar y validar el
campo. No cambia nada de lo que el evento te entrega.
</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que llega es un texto, siempre, y la prop pide un número. La conversión es cosa
tuya, y ya la hiciste en el drill 2 del 06.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```
</details>

<details><summary>Solución</summary>

```tsx
<input type="number" onChange={(e) => alCambiar(Number(e.target.value))} />
```
</details>

---

## Drill 6 — `SelectorDeColor`

<details><summary>Pista 1 — conceptual</summary>

⚠️ **Este starter pasa el test.** El `<select>` solo puede devolver una de las tres
opciones, así que en la práctica siempre llega un color válido. Pero eso lo sabes
tú mirando el JSX; TypeScript solo ve un `string`.
</details>

<details><summary>Pista 2 — más concreta</summary>

Hay que pasar de `string` a `Color`, y solo hay dos maneras: afirmarlo con `as`
—prohibido aquí, y además no comprueba nada— o **comprobarlo**. Comparar un `string`
con un valor literal concreto es una comprobación, y TypeScript la entiende: dentro
del `if`, la variable ya no es `string`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'Color'.
```

`Color` son tres textos concretos; `string` son todos los textos posibles. Lo ancho
no cabe en lo estrecho — es la misma lección del drill 4 del 07 vista desde el otro
lado.
</details>

<details><summary>Solución</summary>

```tsx
<select
  onChange={(e) => {
    const valor = e.target.value
    if (valor === 'rojo' || valor === 'verde' || valor === 'azul') alElegir(valor)
  }}
>
```

Sí, es más largo que un `as`. La diferencia es que si mañana alguien añade una
`<option value="morado">`, esta versión no llama a `alElegir` con basura: el `as`
sí, y sin decir nada.
</details>
