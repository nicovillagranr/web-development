# Pistas — exercise-08 · onSubmit y preventDefault

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice. En este archivo son cuatro de seis.

---

## Drill 1 — `FormularioAvisa`

<details><summary>Pista 1 — conceptual</summary>

Enviar un formulario es una cosa que el navegador ya sabía hacer antes de que
existiera JavaScript, y la sigue haciendo salvo que le digas que no. Tu código no
sustituye al suyo: se ejecuta *además* del suyo.
</details>

<details><summary>Pista 2 — más concreta</summary>

El evento trae una función para cancelar esa reacción, y está dibujada en el
`📌 RECORDATORIO` de arriba. Es una función: nombrarla no hace nada, hay que
llamarla. Y para llegar a ella necesitas el parámetro que el starter no declara.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `onSubmit={() => alEnviar()}` es un manejador
perfectamente válido: la regla de aridad permite no declarar el parámetro. Que te
falte una llamada dentro no es algo que los tipos puedan saber. Solo el test.
</details>

<details><summary>Solución</summary>

```tsx
<form onSubmit={(e) => { e.preventDefault(); alEnviar() }}>
```
</details>

---

## Drill 2 — `FormularioConDosBotones`

<details><summary>Pista 1 — conceptual</summary>

Nadie ha escrito que "Limpiar" envíe el formulario, y sin embargo lo envía. O sea
que enviar no es algo que se pida: es lo que ese botón hace **por defecto** por
estar donde está.
</details>

<details><summary>Pista 2 — más concreta</summary>

Dentro de un `<form>`, un `<button>` sin más **es un botón de envío**: su `type`
vale `"submit"` aunque no lo escribas. Los otros dos valores posibles son `"reset"`
y `"button"`, y uno de ellos significa exactamente "yo no hago nada por mi cuenta".
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Un `<button>` sin `type` es HTML válido y muy
común — de hecho es lo que quieres para el botón de enviar. TypeScript no puede
adivinar cuál de los dos botones querías que enviara.
</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={alLimpiar}>Limpiar</button>
```

Es el bug de formularios más frecuente que existe: un botón "Añadir fila" o
"Mostrar más" que recarga la página entera porque nadie le puso el `type`.
</details>

---

## Drill 3 — `FormularioManejadorFuera`

<details><summary>Pista 1 — conceptual</summary>

La anotación tiene dos piezas, `TipoDeEvento<Elemento>`, y esta vez las dos están
mal. Para la primera, mira qué hueco del JSX recibe el manejador. Para la segunda,
mira en qué etiqueta está ese hueco escrito.
</details>

<details><summary>Pista 2 — más concreta</summary>

El hueco es `onSubmit` y está en el `<form>`, no en el `<button>` — el botón solo
dispara el envío, no lo recibe. El tipo de evento que corresponde se llama como la
familia a la que pertenece y hay que importarlo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(e: ChangeEvent<HTMLButtonElement>) => void' is not assignable to type
'SubmitEventHandler<HTMLFormElement>'.
  Types of parameters 'e' and 'event' are incompatible.
    Type 'SubmitEvent<HTMLFormElement>' is not assignable to type
    'ChangeEvent<HTMLButtonElement, Element>'.
      Types of property 'target' are incompatible.
```

La línea que te dice qué esperaba es la segunda: `SubmitEventHandler<HTMLFormElement>`.
Ahí tienes las dos piezas que te faltan, una en cada mitad del nombre.
</details>

<details><summary>Solución</summary>

```tsx
import type { FormEvent } from 'react'

const manejar = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  alEnviar()
}
```

`SubmitEvent<HTMLFormElement>` también vale, y es lo que el propio mensaje de error
te está nombrando. Es el tipo más estrecho de los dos: `FormEvent` cubre toda la
familia de eventos de formulario, `SubmitEvent` solo el envío.
</details>

---

## Drill 4 — `FormularioLeeElNombre`

<details><summary>Pista 1 — conceptual</summary>

⚠️ **Este starter pasa el test.** Y aun así está mal. El dato que envías lo estás
yendo a buscar al DOM, cuando ya lo tienes guardado en otro sitio desde que se
tecleó.
</details>

<details><summary>Pista 2 — más concreta</summary>

`elements` es la colección de campos tal como la ve el DOM, y TypeScript no sabe
qué campos pusiste tú dentro: para él es una colección de controles genéricos, sin
nombres. El estado sí lo sabe, porque el tipo lo declaraste tú al crearlo.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'nombre' does not exist on type 'HTMLFormControlsCollection'.
```

Fíjate en lo que NO dice: no dice que no exista el campo. Dice que esa colección no
tiene una propiedad con ese nombre **para TypeScript**. En el navegador funciona
perfectamente, y por eso el test pasa.
</details>

<details><summary>Solución</summary>

```tsx
<form onSubmit={(e) => { e.preventDefault(); alEnviar(nombre) }}>
```

El estado ya tenía el dato. Ir a buscarlo al DOM es preguntar dos veces, y la
segunda sin tipos.
</details>

---

## Drill 5 — `FormularioLimpiaAlEnviar`

<details><summary>Pista 1 — conceptual</summary>

El campo se pinta de lo que haya en el estado. Si después de enviar sigue saliendo
lo de antes, es que el estado sigue teniendo lo de antes.
</details>

<details><summary>Pista 2 — más concreta</summary>

Vaciar el campo no se hace tocando el campo: se hace dejando el estado como estaba
al principio. La función que lo cambia ya la tienes ahí.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** No limpiar es un comportamiento perfectamente
válido — hay formularios que deben conservar lo escrito. Nadie puede deducir de los
tipos cuál de los dos querías.
</details>

<details><summary>Solución</summary>

```tsx
<form onSubmit={(e) => { e.preventDefault(); alEnviar(nombre); setNombre('') }}>
```
</details>

---

## Drill 6 — `FormularioNoEnviaVacio`

<details><summary>Pista 1 — conceptual</summary>

Ahora mismo el manejador hace siempre lo mismo pase lo que pase. Lo que falta es
que mire el estado **antes** de hacer nada y decida si hay algo que enviar.
</details>

<details><summary>Pista 2 — más concreta</summary>

El freno del navegador se pone siempre, envíes o no — eso no depende de la
validación. Lo que va dentro de la condición es lo demás.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `alEnviar('')` es una llamada válida: la firma
pide un `string` y la cadena vacía lo es. Que tú no quieras enviar cadenas vacías es
una regla de tu aplicación, no del sistema de tipos.

(Existen tipos capaces de expresar "string no vacío", pero eso es de mucho más
adelante y no de este archivo.)
</details>

<details><summary>Solución</summary>

```tsx
<form onSubmit={(e) => {
  e.preventDefault()
  if (nombre === '') return
  alEnviar(nombre)
  setNombre('')
}}>
```
</details>

---

# Escalera S — el click y el envío son dos cosas

> Ninguno de los seis peldaños da error de tipos: **los seis son de comportamiento**,
> así que aquí el único juez es el test. La Pista 3 de cada uno explica por qué el
> compilador se queda callado, que en esta escalera es parte de la lección.

## S1 — `BotonSuelto`

<details><summary>Pista 1 — conceptual</summary>

Este botón no está dentro de ningún formulario. ¿Qué evento puede ocurrirle a un
botón suelto cuando lo pulsas? Solo uno.
</details>

<details><summary>Pista 2 — más concreta</summary>

`onSubmit` escucha el envío de un formulario. Aquí no hay formulario, así que ese
hueco no se va a activar jamás — está esperando algo que no puede pasar.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador**, y esto sorprende: React acepta `onSubmit` en
cualquier elemento, no solo en `<form>`. Es válido escribirlo en un `<button>`, en
un `<div>` o en un `<span>`. Válido y completamente inútil.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => registrar('click')}>Pulsa</button>
```
</details>

## S2 — `EnvioSinManejadorEnElBoton`

<details><summary>Pista 1 — conceptual</summary>

El que se envía es el formulario, no el botón. El botón solo lo provoca.
</details>

<details><summary>Pista 2 — más concreta</summary>

Mueve el manejador entero al `<form>` y deja el `<button>` pelado. Va a seguir
funcionando: es lo que demuestra este peldaño.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje**, por lo mismo que en S1: el `onSubmit` en el botón compila. Un
manejador colocado en un elemento al que ese evento no le ocurre nunca es código
muerto que nadie señala.
</details>

<details><summary>Solución</summary>

```tsx
<form onSubmit={(e) => { e.preventDefault(); registrar('submit') }}>
  <button>Enviar</button>
</form>
```
</details>

## S3 — `RegistraLosDos`

<details><summary>Pista 1 — conceptual</summary>

Un solo click del usuario, dos eventos distintos. Cada uno necesita su manejador, y
cada manejador va en su elemento.
</details>

<details><summary>Pista 2 — más concreta</summary>

El `<form>` ya tiene el suyo. Al botón le falta el `onClick`.
</details>

<details><summary>Pista 3 — el orden, que es lo que se entrena aquí</summary>

**No hay mensaje de compilador.** Lo que importa es el orden que va a dar el test:
`['click', 'submit']`. Primero ocurre lo del botón; el envío es una consecuencia
posterior. Si lo tuvieras al revés en la cabeza, S6 no tendría sentido.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={() => registrar('click')}>Enviar</button>
```
</details>

## S4 — `BotonQueNoProvoca`

<details><summary>Pista 1 — conceptual</summary>

No hay que impedir que el envío ocurra: hay que conseguir que este botón no lo
provoque. Son dos cosas distintas, y esa distinción es todo el drill 2.
</details>

<details><summary>Pista 2 — más concreta</summary>

Un `<button>` dentro de un `<form>` es de envío por defecto. Su atributo `type`
admite tres valores, y uno de ellos significa "yo no hago nada por mi cuenta".
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje.** Un botón sin `type` es HTML válido y es lo que quieres para el
de enviar. Cuál de tus botones debe enviar es una decisión tuya, no un tipo.
</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={() => registrar('click')}>Pulsa</button>
```
</details>

## S5 — `EnterEnvia`

<details><summary>Pista 1 — conceptual</summary>

Enviar con Enter no es magia del campo: el navegador busca un botón de envío en el
formulario y lo pulsa por ti. Si no encuentra ninguno, no hay nada que pulsar.
</details>

<details><summary>Pista 2 — más concreta</summary>

En este formulario el único botón lleva `type="button"`, así que no es de envío. Se
llama *envío implícito*, y necesita que exista un botón capaz de enviar.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje.** Un formulario sin botón de envío es válido. Y ojo con este
peldaño al revés: **es la factura de S4.** Poner `type="button"` a todos tus
botones deja el formulario inservible para quien no usa ratón.
</details>

<details><summary>Solución</summary>

```tsx
<button>Enviar</button>
```
</details>

## S6 — `CortarAntesDeNacer`

<details><summary>Pista 1 — conceptual</summary>

El botón sigue siendo de envío, así que el envío se va a provocar. Lo que puedes
hacer es cancelar lo que ese click iba a provocar, en el momento del click.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es el mismo freno del drill 1, en otro evento: `preventDefault` cancela lo que el
navegador iba a hacer **a continuación de ese evento**. En el submit, cancela la
navegación. En el click de un botón de envío, cancela el envío entero.
</details>

<details><summary>Pista 3 — la comparación con S4, que es el objetivo del peldaño</summary>

**No hay mensaje de compilador**, y el resultado visible es idéntico al de S4:
`['click']`. La diferencia está en lo que el botón ES:

- **S4** — el botón deja de ser de envío. El Enter en un campo va a otro botón.
- **S6** — el botón sigue siendo de envío y solo se le cancela el efecto. El Enter
  sigue apuntándole a él, así que el formulario tampoco se envía con el teclado.

Por eso el drill 2 se arregla con `type` y no con esto.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={(e) => { e.preventDefault(); registrar('click') }}>Pulsa</button>
```
</details>
