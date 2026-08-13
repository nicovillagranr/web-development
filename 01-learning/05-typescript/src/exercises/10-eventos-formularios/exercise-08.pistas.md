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
