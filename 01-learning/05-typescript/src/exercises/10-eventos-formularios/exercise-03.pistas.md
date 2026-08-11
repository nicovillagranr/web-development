# Pistas — exercise-03 · el manejador fuera del hueco

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales.

---

## Drill 1 — `BotonFuera`

<details><summary>Pista 1 — conceptual</summary>

En el 02 nunca escribiste el tipo de `e` y funcionaba. Pregúntate quién lo estaba
poniendo por ti, y si ese alguien sigue estando aquí.
</details>

<details><summary>Pista 2 — más concreta</summary>

No lo está. Fuera del hueco no hay nadie que informe a TypeScript, así que el
parámetro se queda sin tipo y te toca escribirlo a ti. El tipo que necesitas ya está
importado arriba del archivo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS7006: Parameter 'e' implicitly has an 'any' type.
```

"Implícitamente `any`" = *no me has dicho qué es esto y no tengo forma de saberlo*.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: MouseEvent<HTMLButtonElement>) => avisar(e.type)
```

`MouseEvent` viene de `'react'` (ya importado). El `<HTMLButtonElement>` dice sobre
qué elemento cuelga el manejador.
</details>

---

## Drill 2 — `EnlaceFuera`

<details><summary>Pista 1 — conceptual</summary>

El manejador funciona al ejecutarlo y aun así hay algo mal. Eso significa que el
fallo es de tipos, no de lógica: corre `pnpm typecheck` y léelo.
</details>

<details><summary>Pista 2 — más concreta</summary>

La anotación tiene dos partes, y solo una está mal. No es `MouseEvent` — un clic
sigue siendo un clic. Es lo que va entre los `<…>`: dice sobre QUÉ elemento cuelga, y
este ya no es un botón.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(e: MouseEvent<HTMLButtonElement>) => void' is not assignable to type
'MouseEventHandler<HTMLAnchorElement>'.
```

Lee el final de la línea: ahí te está diciendo qué esperaba esa etiqueta.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: MouseEvent<HTMLAnchorElement>) => avisar(e.type)
```

`<button>` → `HTMLButtonElement` · `<a>` → `HTMLAnchorElement`. Los nombres son los
del DOM, no de React.
</details>

---

## Drill 3 — `CampoFuera`

<details><summary>Pista 1 — conceptual</summary>

Un evento de ratón y uno de teclado no traen la misma información. Pregúntate si el
dato que necesitas (qué tecla se pulsó) puede estar dentro de un evento de ratón.
</details>

<details><summary>Pista 2 — más concreta</summary>

No puede. Necesitas el tipo de evento de teclado, que se llama distinto y **también
viene de `'react'`**. Y como cambia el tipo del evento, cambia también el hueco del
que lo cuelgas: los huecos de ratón no disparan con el teclado.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Da **dos** errores, que son el mismo problema visto desde dentro y desde fuera:

```
TS2339: Property 'key' does not exist on type 'MouseEvent<…>'.
TS2322: Type '(e: MouseEvent<HTMLInputElement>) => void' is not assignable to type
'KeyboardEventHandler<HTMLInputElement>'.
```

El primero mira dentro del molde (ahí no hay teclas), el segundo mira el hueco (que
esperaba otra cosa). **Se curan los dos con un solo cambio.**
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.key)
return <input onKeyDown={manejar} />
```

`KeyboardEvent` ya está en el import de arriba. Si no estuviera, traerlo sería el
primer paso y no el último — sin él, TS coge el `KeyboardEvent` del navegador, que es
otro tipo distinto y no admite `<…>`.
</details>

---

## Drill 4 — `BotonFueraConId`

<details><summary>Pista 1 — conceptual</summary>

Cuenta los argumentos. Cuando React dispara lo que hay colgado de un hueco, ¿cuántas
cosas le pasa? ¿Y cuántas necesita tu manejador para poder avisar con las dos?
</details>

<details><summary>Pista 2 — más concreta</summary>

Uno y dos: nunca van a cuadrar. Lo que cuelgas del hueco no tiene por qué ser el
manejador mismo — puede ser otra cosa que lo llame, y que aporte el dato que a React
no le consta.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: … Target signature provides too few arguments. Expected 2 or more, but got 1.
```

"La firma de destino aporta muy pocos argumentos": el hueco solo sabe dar uno.
El test también está en rojo, porque el `id` nunca llega.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: MouseEvent<HTMLButtonElement>, idBoton: string) =>
  avisar(`${idBoton}:${e.type}`)

<button id={id} onClick={(e) => manejar(e, id)}>Avisar</button>
```

Fíjate en que el `(e)` del envoltorio **no va anotado**: está dentro del hueco, así
que ahí sí hay tipado contextual. Lo que va anotado es el `const` de fuera.
</details>

---

## Drill 5 — `CampoLeeValor`

<details><summary>Pista 1 — conceptual</summary>

El evento sabe sobre qué elemento se disparó, y ese elemento es el `<input>` entero.
Si llegas hasta él, lo que hay escrito dentro es una propiedad suya.
</details>

<details><summary>Pista 2 — más concreta</summary>

`e.currentTarget` es ese elemento. Si el editor te dice que ahí no existe lo que
buscas, no es que no exista en runtime: es que **no le has dicho qué elemento es**.
Vuelve a leer la `⚠️ TRAMPA` de la TEORÍA 2 y mira tu anotación con lupa.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'value' does not exist on type 'EventTarget & Element'.
```

`Element` es el valor por defecto de `KeyboardEvent<T = Element>`: si dejas el hueco
sin rellenar **no se queda vacío, se rellena solo**. Y un `Element` genérico no tiene
`.value`. Este es el drill donde la trampa de la teoría se toca con las manos.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: KeyboardEvent<HTMLInputElement>) => avisar(e.currentTarget.value)
return <input onKeyUp={manejar} />
```

Rellenar el hueco es lo que compra que el editor sepa qué hay al otro lado.
</details>

---

## Drill 6 — `BarraFuera`

<details><summary>Pista 1 — conceptual</summary>

Los dos elementos tienen que avisar cosas distintas. Un solo manejador solo puede
decir una.
</details>

<details><summary>Pista 2 — más concreta</summary>

Y aunque el texto no importara, tampoco encajaría: la anotación de un manejador lo
ata a un tipo de elemento concreto, y aquí hay dos elementos distintos. Son dos
manejadores, cada uno con lo suyo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: … is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

Solo protesta en el `<a>`: el manejador estaba etiquetado para el botón. El test
además está en rojo, porque al pulsar "Salir" avisa `"boton:click"`.
</details>

<details><summary>Solución</summary>

```tsx
const alBoton  = (e: MouseEvent<HTMLButtonElement>) => avisar(`boton:${e.type}`)
const alEnlace = (e: MouseEvent<HTMLAnchorElement>) => avisar(`enlace:${e.type}`)
```

Cada uno colgado del suyo. Escribir `MouseEvent<HTMLButtonElement>` por sexta vez en
el archivo es exactamente el motivo de que exista el 04.
</details>
