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

---

# 🪜 Escalera P — el nombre de la prop

> Los seis peldaños atacan la misma idea desde seis sitios, así que las pistas se
> parecen mucho entre sí. Eso es a propósito.
>
> En cuatro de los seis, el mensaje del compilador contiene `IntrinsicAttributes`.
> Es solo el saco donde React mete `key` y compañía: ignóralo y lee lo que va detrás
> del `&`, que es el paquete de props de tu componente.

---

## P1 — `TarjetaDeUsuario`

<details><summary>Pista 1 — conceptual</summary>

El nombre de esta prop está escrito en dos sitios: donde el padre la manda y donde el
hijo la pide. Ponlos uno al lado del otro y léelos.
</details>

<details><summary>Pista 2 — más concreta</summary>

No dicen lo mismo, y aquí el que manda es el padre: es él quien bautiza la prop. Ojo,
que el hijo la escribe **dos veces** —al destriparla y en el tipo—, y las dos tienen
que decir lo que dice el padre.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '{ nombre: string; }' is not assignable to type 'IntrinsicAttributes & { usuario: string; }'.
  Property 'nombre' does not exist on type 'IntrinsicAttributes & { usuario: string; }'.
```

Sale en `exercise-05.test.tsx`, no en tu archivo, porque el que se queja es el padre:
está intentando entregar algo que el hijo no pide. **El que protesta no es siempre el
que hay que arreglar.**
</details>

<details><summary>Solución</summary>

```tsx
export function TarjetaDeUsuario({ nombre }: { nombre: string }) {
  return <p>{nombre}</p>
}
```

El padre manda `nombre`, así que el hijo pide `nombre`. Nada más. Podrían llamarse los
dos `pepe` y funcionaría igual de bien.
</details>

---

## P2 — `Insignia`

<details><summary>Pista 1 — conceptual</summary>

Deja de leer el nombre de la prop y lee su **tipo**. ¿Eso que llega se puede ejecutar?
</details>

<details><summary>Pista 2 — más concreta</summary>

Es un texto, y un texto no se ejecuta: no pinta nada colgado de un hueco de evento. Su
sitio es el contenido del `<span>`, como cualquier otro string.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'string' is not assignable to type 'MouseEventHandler<HTMLSpanElement>'.
```

Aquí sí protesta dentro de tu archivo, y por un motivo que importa: `onClick` escrito
sobre un `<span>` **sí** es un hueco de React de verdad. Sobre un componente tuyo no lo
sería.
</details>

<details><summary>Solución</summary>

```tsx
export function Insignia({ onClick }: { onClick: string }) {
  return <span>{onClick}</span>
}
```

La prop podía llamarse `onClick`, `texto` o `pepe`. Lo que decide qué puedes hacer con
ella es su tipo, no su nombre.
</details>

---

## P3 — `BotonCastellano`

<details><summary>Pista 1 — conceptual</summary>

El hijo escribe el nombre de la prop dos veces: una al destriparla y otra en el tipo.
Compáralas antes de mirar nada más.
</details>

<details><summary>Pista 2 — más concreta</summary>

No coinciden, y la buena es la del tipo, porque es la que el padre escribe en el JSX.
Saca esa del paquete y cuélgala del hueco del `<button>`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'onClick' does not exist on type '{ alPulsar: () => void; }'.
```

Traducido: estás sacando del paquete de props algo que el paquete no lleva. Lo que
lleva lo describe el tipo —`{ alPulsar: () => void }`— y ahí dentro no hay ningún
`onClick`.
</details>

<details><summary>Solución</summary>

```tsx
export function BotonCastellano({ alPulsar }: { alPulsar: () => void }) {
  return (
    <button type="button" onClick={alPulsar}>
      Pulsa
    </button>
  )
}
```

`alPulsar` es el nombre de la prop y `onClick` es el hueco. Son dos cosas distintas, y
por eso pueden llamarse distinto sin que pase nada.
</details>

---

## P4 — `BotonIngles`

<details><summary>Pista 1 — conceptual</summary>

Es el fallo de P3 con los dos nombres cambiados de sitio. Que la prop se llame
`onClick` no cambia ni una coma del arreglo.
</details>

<details><summary>Pista 2 — más concreta</summary>

En la línea del `<button>` van a acabar conviviendo dos `onClick`: el hueco a la
izquierda del `=` y tu prop dentro de las llaves. Se ve raro y es lo correcto.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'alPulsar' does not exist on type '{ onClick: () => void; }'.
```

Espejo exacto del de P3: mismo error, mismos dos nombres, intercambiados.
</details>

<details><summary>Solución</summary>

```tsx
export function BotonIngles({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      Pulsa
    </button>
  )
}
```

`onClick={onClick}`: el de la izquierda es el hueco de React, el de la derecha es tu
prop. Comparten nombre por casualidad —el padre la bautizó así— y no por parentesco.
Compara este cuerpo con el de P3: es el mismo botón dos veces.
</details>

---

## P5 — `BotonMini`

<details><summary>Pista 1 — conceptual</summary>

El padre está escrito justo encima y no se toca. Léelo: el nombre bueno está ahí.
</details>

<details><summary>Pista 2 — más concreta</summary>

El hijo pide un nombre que el padre no manda, así que esa prop llega `undefined` y el
botón se queda sin nada que ejecutar. Se cambian los dos sitios del hijo, como en P1.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '{ alSubir: () => void; }' is not assignable to type 'IntrinsicAttributes & { onClick: () => void; }'.
  Property 'alSubir' does not exist on type 'IntrinsicAttributes & { onClick: () => void; }'.
```

Mira la línea a la que apunta: no es `BotonMini`, es `PanelMini`. Otra vez el padre
protestando por el hijo — y aquí el que no se puede tocar es el que protesta.
</details>

<details><summary>Solución</summary>

```tsx
export function BotonMini({ alSubir }: { alSubir: () => void }) {
  return (
    <button type="button" onClick={alSubir}>
      Subir
    </button>
  )
}
```

El padre manda `alSubir`, el hijo pide `alSubir` y lo cuelga del hueco. Fíjate en que
el hueco sigue llamándose `onClick` aunque la prop no: el hueco no se elige.
</details>

---

## P6 — `PanelBilingue`

<details><summary>Pista 1 — conceptual</summary>

Aquí fallan **dos** cosas y el compilador solo caza una. La otra la tienes en el test:
lee qué texto espera y compáralo con el que pintas.
</details>

<details><summary>Pista 2 — más concreta</summary>

En el `<p>` falta el valor que guarda el estado. Y de los dos hijos, uno está montado
con el nombre de prop que pide el otro, y encima con un valor que no es una función:
los dos botones tienen que recibir lo mismo, cada uno por el nombre que él pide.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '{ alPulsar: number; }' is not assignable to type 'IntrinsicAttributes & { onClick: () => void; }'.
  Property 'alPulsar' does not exist on type 'IntrinsicAttributes & { onClick: () => void; }'.
```

`alPulsar: number` te da las dos mitades del fallo de golpe: el nombre que no toca, y
un número donde iba una función.

**Del `<p>` no vas a ver nada aquí, ni ahora ni después:** pintar de menos no es un
error de tipos. Ese solo lo caza el test.
</details>

<details><summary>Solución</summary>

```tsx
export function PanelBilingue() {
  const [total, setTotal] = useState(0)
  const sumar = () => setTotal(total + 1)
  return (
    <div>
      <p>Bilingüe: {total}</p>
      <BotonCastellano alPulsar={sumar} />
      <BotonIngles onClick={sumar} />
    </div>
  )
}
```

La misma función entra por dos props que se llaman distinto y las dos suben el mismo
total. Esa es la frase de la escalera, ya en verde: **el nombre de una prop no hace
nada, solo tiene que coincidir arriba y abajo.**
</details>
