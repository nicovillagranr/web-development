# Pistas — exercise-05 · el manejador llega por props

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `BotonRecibeManejador`

<details><summary>Pista 1 — conceptual</summary>

Compara dos cosas: lo que el hueco `onClick` espera recibir, y lo que dice el alias
de la prop. Si son lo mismo, ¿hace falta algo entre medias?
</details>

<details><summary>Pista 2 — más concreta</summary>

No hace falta. Y ese "algo entre medias" que puso el starter es justo lo que se está
comiendo el evento: la función de dentro se llama sin pasarle nada.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2554: Expected 1 arguments, but got 0.
```

Y el test también está en rojo: `alPulsar` recibe `undefined` en vez del evento.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={alPulsar}>Avisar</button>
```

Pelada. `onClick` espera `(e: MouseEvent<HTMLButtonElement>) => void` y
`ManejadorDeClic` **es** exactamente eso: encajan sin envoltorio.
</details>

---

## Drill 2 — `EnlaceRecibeManejador`

<details><summary>Pista 1 — conceptual</summary>

El componente funciona. Corre `pnpm typecheck` de todas formas.
</details>

<details><summary>Pista 2 — más concreta</summary>

La prop está tipada con el alias de los botones, y esto es un `<a>`. Arriba del
archivo tienes los tres alias tallados: uno de ellos es el que toca.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'ManejadorDeClic' is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

**Este es el único drill del archivo que pasa el test con el fallo dentro**: al
ejecutar funciona igual de bien con el alias equivocado.
</details>

<details><summary>Solución</summary>

```tsx
export function EnlaceRecibeManejador({ alPulsar }: { alPulsar: ManejadorDeEnlace }) {
```
</details>

---

## Drill 3 — `CampoRecibeManejador`

<details><summary>Pista 1 — conceptual</summary>

Mira el alias de la prop y pregúntate qué gesto del usuario produce ese tipo de
evento. Ahora mira de qué hueco cuelga.
</details>

<details><summary>Pista 2 — más concreta</summary>

Un manejador de teclado colgado de un hueco de ratón. El hueco tiene que ser el que
dispara al teclear.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'ManejadorDeTecla' is not assignable to type 'MouseEventHandler<HTMLInputElement>'.
```

Y el test en rojo: al teclear no salta nada.
</details>

<details><summary>Solución</summary>

```tsx
<input onKeyDown={alTeclear} />
```
</details>

---

## Drill 4 — `BotonConIdRecibeManejador`

<details><summary>Pista 1 — conceptual</summary>

El hueco `onClick` llama a lo que le cuelgues con un único argumento: el evento.
Compara ese número con lo que pide la prop.
</details>

<details><summary>Pista 2 — más concreta</summary>

Uno contra dos, y el que falta es el `id` — que React no tiene forma de conocer, pero
tú sí, porque te llega por props. Lo que cuelgas del hueco no tiene por qué ser la
prop misma.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'ManejadorConId' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
  Target signature provides too few arguments. Expected 2 or more, but got 1.
```

El test también en rojo: el `id` llega `undefined`.
</details>

<details><summary>Solución</summary>

```tsx
<button id={id} onClick={(e) => alPulsar(e, id)}>Avisar</button>
```

La `e` del envoltorio **no se anota**: sigue estando dentro del hueco, así que ahí
hay tipado contextual. Lo que va tipado es la prop.
</details>

---

## Drill 5 — `BarraRecibeDos`

<details><summary>Pista 1 — conceptual</summary>

Lee los nombres de las props y lee el texto de cada elemento. ¿Cuadran?
</details>

<details><summary>Pista 2 — más concreta</summary>

Están cruzados. Y aquí el cruce no es solo un fallo de lógica: cada alias está atado
a un elemento distinto, así que el compilador protesta por los dos lados a la vez.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Dos `TS2322`, uno por elemento, cada uno espejo del otro:

```
TS2322: Type 'ManejadorDeEnlace' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
TS2322: Type 'ManejadorDeClic' is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

Y el test en rojo: al pulsar "Guardar" se dispara el manejador de salir.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={alGuardar}>Guardar</button>
<a href="/salir" onClick={alSalir}>Salir</a>
```
</details>

---

## Drill 6 — `BotonDeAccion`

<details><summary>Pista 1 — conceptual</summary>

Hay tres cosas distintas que puedes poner en un hueco: la función, la llamada a la
función, y una función que la llame. Solo una de las tres hace que al pulsar pase
algo. Mira cuál puso el starter.
</details>

<details><summary>Pista 2 — más concreta</summary>

El starter envuelve, pero dentro del envoltorio **entrega** la función en vez de
llamarla. Al pulsar, el envoltorio se ejecuta, produce una función y la tira a la
basura. Es el drill 14 del `exercise-01` reapareciendo dentro de un componente.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador en este drill, y ese es el tema.** El hueco es
`=> void`, y en un `void` cualquier retorno vale — incluido devolver una función. La
permisividad de `void` es la que te deja sin red aquí. Solo el test lo caza.

⚠️ Y ojo con "arreglarlo" cambiando el tipo de la prop: `PanelDeConteo` le pasa un
`ManejadorDeClic`, así que si estrechas la firma a `() => void` el botón compila y el
**padre** se rompe (`TS2322` en la línea del `<BotonDeAccion …/>`).
</details>

<details><summary>Solución</summary>

```tsx
export function BotonDeAccion({ texto, alPulsar }: { texto: string; alPulsar: ManejadorDeClic }) {
  return <button onClick={alPulsar}>{texto}</button>
}
```

Encaja pelada, como en el drill 1. El envoltorio sobraba desde el principio.
</details>
