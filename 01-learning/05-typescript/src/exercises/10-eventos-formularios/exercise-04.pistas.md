# Pistas — exercise-04 · ponerle nombre al tipo

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales.

---

## Drill 1 — `ManejadorDeClic` + `BotonConSello`

<details><summary>Pista 1 — conceptual</summary>

Vuelve a la `⚠️ TRAMPA` de la TEORÍA 1 y léela mirando tu alias. Hay dos cosas que se
pueden nombrar aquí y solo una sirve para estampársela a un `const` que es una
función.
</details>

<details><summary>Pista 2 — más concreta</summary>

El alias del starter nombra el objeto que llega, no a quien lo recibe. Le falta
envolverlo en una firma de función: unos paréntesis con el evento dentro, y qué
devuelve.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Tres errores en cascada, y en este orden cuentan la historia entera:

```
TS2322: Type '(e: any) => void' is not assignable to type 'ManejadorDeClic'.
TS7006: Parameter 'e' implicitly has an 'any' type.
TS2322: Type 'ManejadorDeClic' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
```

1º le das una función donde el alias dice que va un objeto → 2º como el alias no es
una función, no hay contexto y la `e` se queda sin tipo → 3º y por eso `onClick` lo
rechaza. **Los tres se curan con un solo cambio.**
</details>

<details><summary>Solución</summary>

```tsx
export type ManejadorDeClic = (evento: MouseEvent<HTMLButtonElement>) => void

const manejar: ManejadorDeClic = (evento) => avisar(evento.type)
```

Y `evento` sin anotar: el alias en el `const` devuelve el contexto.
</details>

---

## Drill 2 — `ManejadorDeEnlace` + `EnlaceConSello`

<details><summary>Pista 1 — conceptual</summary>

Lee el alias entero, de izquierda a derecha, y luego mira sobre qué etiqueta lo estás
estampando. ¿Coinciden?
</details>

<details><summary>Pista 2 — más concreta</summary>

No. El nombre dice una cosa y el contenido dice otra: por dentro sigue hablando de
botones. Solo hay que cambiar una palabra, y está entre los `<…>`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'ManejadorDeEnlace' is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

Ojo a la ironía: el alias se **llama** "DeEnlace" y el error lo rechaza igual. El
nombre no comprueba nada.
</details>

<details><summary>Solución</summary>

```tsx
export type ManejadorDeEnlace = (e: MouseEvent<HTMLAnchorElement>) => void
```
</details>

---

## Drill 3 — `ManejadorDeTecla` + `CampoConSello`

<details><summary>Pista 1 — conceptual</summary>

Un alias tiene que tener los mismos huecos que el sitio donde lo estampas. Cuenta los
parámetros de tu alias y cuenta los que React va a pasar al disparar el hueco.
</details>

<details><summary>Pista 2 — más concreta</summary>

Dos contra uno. El alias pide la tecla suelta además del evento, y eso nadie se lo va
a dar — la tecla ya viene dentro del evento.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'ManejadorDeTecla' is not assignable to type 'KeyboardEventHandler<HTMLInputElement>'.
  Target signature provides too few arguments. Expected 2 or more, but got 1.
```

El test además sale **rojo**: ese segundo parámetro nunca llega y avisa
`"a-undefined"`.
</details>

<details><summary>Solución</summary>

```tsx
export type ManejadorDeTecla = (e: KeyboardEvent<HTMLInputElement>) => void
```
</details>

---

## Drill 4 — `BotonConSelloDeReact`

<details><summary>Pista 1 — conceptual</summary>

Hay dos sitios donde puede ir una etiqueta de tipo: pegada al `const` o pegada al
parámetro. El starter eligió uno de los dos y no es el que hace falta.
</details>

<details><summary>Pista 2 — más concreta</summary>

Está anotando la `e`, o sea diciendo que **la `e` es un manejador**. Y no lo es: la
`e` es el evento; el manejador es la función entera. La etiqueta va un nivel más
arriba.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'type' does not exist on type 'MouseEventHandler<HTMLButtonElement>'.
TS2322: Type '(e: MouseEventHandler<…>) => void' is not assignable to type 'MouseEventHandler<…>'.
```

El primero es el que lo delata: claro que no existe `.type`, **las funciones no
tienen `.type`**.
</details>

<details><summary>Solución</summary>

```tsx
const manejar: MouseEventHandler<HTMLButtonElement> = (e) => avisar(e.type)
```

La etiqueta en el `const`, y la `e` desnuda.
</details>

---

## Drill 5 — `CampoConSelloDeReact`

<details><summary>Pista 1 — conceptual</summary>

Aplica la regla del nombre que acabas de leer en la TEORÍA 2, en la dirección que
toca: sabes cómo se llama el evento del teclado, y de ahí sale cómo se llama su
manejador.
</details>

<details><summary>Pista 2 — más concreta</summary>

`XEvent<T>` es el objeto, `XEventHandler<T>` la función que lo recibe. El starter se
quedó con el primero. Y ese nombre no está en el import de arriba: tráelo tú.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Mismo trío en cascada que el drill 1, porque es el mismo error de fondo:

```
TS2322: Type '(e: any) => void' is not assignable to type 'KeyboardEvent<HTMLInputElement>'.
TS7006: Parameter 'e' implicitly has an 'any' type.
```

Le has dicho al `const` que **es** un evento, cuando lo que es, es quien lo recibe.
</details>

<details><summary>Solución</summary>

```tsx
import type { KeyboardEventHandler } from 'react'   // añadido al import de arriba

const manejar: KeyboardEventHandler<HTMLInputElement> = (e) => avisar(e.key)
```
</details>

---

## Drill 6 — `BarraConSellos`

<details><summary>Pista 1 — conceptual</summary>

Los dos elementos avisan cosas distintas, así que un solo manejador no puede servir
para los dos ni aunque los tipos cuadraran. Y no cuadran.
</details>

<details><summary>Pista 2 — más concreta</summary>

Son dos `const`, cada uno con su etiqueta. Uno la lleva de React y el otro el alias
que tallaste en el drill 2 — ese es el punto del ejercicio: comprobar que da igual de
dónde venga el nombre.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: … is not assignable to type 'MouseEventHandler<HTMLAnchorElement>'.
```

Solo protesta en el `<a>`. El test además está en rojo: al pulsar "Salir" avisa
`"boton:click"`.
</details>

<details><summary>Solución</summary>

```tsx
const alBoton: MouseEventHandler<HTMLButtonElement> = (e) => avisar(`boton:${e.type}`)
const alEnlace: ManejadorDeEnlace                   = (e) => avisar(`enlace:${e.type}`)
```

El de React y el tuyo, uno al lado del otro, funcionando igual. Los dos son solo
nombres del mismo tipo.
</details>

---

## Escalera T — T1 a T6

> La escalera aísla una sola frase: **la etiqueta del `const` es la que le dice al
> parámetro qué es.** Los cuerpos vienen mal a propósito y los enunciados ya te dicen
> qué tiene que salir, así que aquí solo hay pistas para el último peldaño, que es el
> único con error de tipos.

<details><summary>T6 — lo que dice el compilador</summary>

```
TS7006: Parameter 'e' implicitly has an 'any' type.
```

Sin etiqueta en el `const` y sin anotación en el parámetro, TypeScript no tiene de
dónde deducir la `e`. **El cuerpo ya está bien**: se cura poniendo la etiqueta.
Y el test sale VERDE, porque en ejecución la `e` es el evento de verdad — este
peldaño solo lo caza `pnpm typecheck`.
</details>
