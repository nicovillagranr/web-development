# Pistas — exercise-10 · CAPSTONE: el formulario entero

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.
>
> En este archivo no hay nada nuevo: si una pista te suena, es que ya la resolviste
> en otro archivo del bloque. Se te dice cuál.

---

## Drill 1 — `CampoTexto`

<details><summary>Pista 1 — conceptual</summary>

`alEscribir` pide un texto. Lo que `onChange` reparte es un evento. Falta el paso
del medio.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es el drill 1 del 09, igual: hay que envolver el manejador para sacar del evento
lo que la prop pide.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(valor: string) => void' is not assignable to type
'ChangeEventHandler<HTMLInputElement, HTMLInputElement>'.
```
</details>

<details><summary>Solución</summary>

```tsx
<input value={texto} onChange={(e) => alEscribir(e.target.value)} />
```
</details>

---

## Drill 2 — `SelectorPrioridad`

<details><summary>Pista 1 — conceptual</summary>

⚠️ **Este starter pasa el test.** El `<select>` solo puede devolver una de las tres
opciones, así que en la práctica siempre llega una prioridad válida — pero eso lo
sabes tú leyendo el JSX, no TypeScript.
</details>

<details><summary>Pista 2 — más concreta</summary>

Del drill 6 del 09: para pasar de `string` a una unión sin `as`, hay que comprobar.
Comparar contra los valores concretos estrecha el tipo dentro del `if`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'Prioridad'.
```
</details>

<details><summary>Solución</summary>

```tsx
onChange={(e) => {
  const valor = e.target.value
  if (valor === 'baja' || valor === 'media' || valor === 'alta') alElegir(valor)
}}
```
</details>

---

## Drill 3 — `FormularioTarea`

<details><summary>Pista 1 — conceptual</summary>

Lee el test: comprueba tres cosas, no una. Que se entregue lo escrito, que el campo
quede vacío y que la prioridad vuelva a estar en "media".
</details>

<details><summary>Pista 2 — más concreta</summary>

El starter entrega bien. Lo que no hace es dejarse limpio, y son dos estados los
que hay que devolver a su valor de arranque — el mismo con el que los creaste.
Drill 5 del 08.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** No limpiar es un comportamiento válido; hay
formularios que conservan lo escrito a propósito. Cuál de los dos querías no es
algo que los tipos puedan saber.
</details>

<details><summary>Solución</summary>

```tsx
alAñadir({ texto, prioridad })
setTexto('')
setPrioridad('media')
```
</details>

---

## Drill 4 — `FilaTarea`

<details><summary>Pista 1 — conceptual</summary>

Una casilla no se escribe: se marca o se desmarca. `alMarcar` pide un sí/no.
</details>

<details><summary>Pista 2 — más concreta</summary>

Drill 2 del 09: la propiedad que dice si quedó marcada es `boolean` y se llama
igual que el atributo que pondrías para que saliera marcada de inicio.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'string' is not assignable to parameter of type 'boolean'.
```
</details>

<details><summary>Solución</summary>

```tsx
onChange={(e) => alMarcar(tarea.id, e.target.checked)}
```
</details>

---

## Drill 5 — `ListaTareas`

<details><summary>Pista 1 — conceptual</summary>

Las dos props de aviso las estás pasando bien. El problema es la tercera: le estás
dando a `FilaTarea` una parte de la tarea en vez de la tarea.
</details>

<details><summary>Pista 2 — más concreta</summary>

`FilaTarea` necesita el objeto entero: usa el `id` para avisar y el `texto` para
pintar. Si solo le das el texto, se queda sin la mitad.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'string' is not assignable to type 'Tarea'.
```

Es la confusión objeto-vs-propiedad del principio del bloque —`e.target` frente a
`e.target.value`— con otros nombres. Cierra el círculo bastante bien.
</details>

<details><summary>Solución</summary>

```tsx
<FilaTarea key={tarea.id} tarea={tarea} alMarcar={alMarcar} alBorrar={alBorrar} />
```
</details>

---

## Drill 6 — `GestorDeTareas`

<details><summary>Pista 1 — conceptual</summary>

La tarea se añade —puedes comprobarlo con un `console.log` dentro de `añadir`— y la
pantalla no cambia. Así que el problema no es que no se añada: es que React no se
entera de que la lista ha cambiado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Mira cómo están escritos `marcar` y `borrar`, que sí funcionan: ninguno de los dos
toca el array que tenía; los dos construyen uno nuevo con `map` y `filter` y lo
guardan. `añadir` es el único que modifica el que ya había.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador**, y este es el silencio más caro del bloque.
`tareas.push(nueva)` es código válido: el array existe y `push` es suyo.
TypeScript no sabe que ese array es estado de React ni que React compara por
identidad. Ni el compilador ni la consola dicen una palabra — solo la pantalla,
quedándose quieta.
</details>

<details><summary>Solución</summary>

```tsx
const nueva: Tarea = { id: crypto.randomUUID(), hecha: false, ...datos }
setTareas([...tareas, nueva])
```

`[...tareas, nueva]` es un array nuevo con los de antes más uno. React compara el
que le das con el que tenía, ve que no es el mismo, y repinta.
</details>

---

# Escalera E — el estado vive arriba

> Cuatro de los seis peldaños no dan error de tipos: son de comportamiento y solo
> los caza el test. Los otros dos (E2 y E6) sí, y su Pista 3 cita el mensaje.

## E1 — `EtiquetaTexto`

<details><summary>Pista 1 — conceptual</summary>

El componente pinta bien la primera vez y se queda congelado cuando la prop cambia.
O sea que lo que está pintando no es la prop: es algo que se guardó al nacer.
</details>

<details><summary>Pista 2 — más concreta</summary>

`useState(texto)` usa el valor de la prop **solo la primera vez**, para inicializar.
A partir de ahí la caja va por su cuenta y la prop puede cambiar cien veces sin
enterarse. Copiar una prop al estado es un error clásico, y aquí no hace falta
estado ninguno.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje.** `useState(texto)` es válido y a veces es lo que quieres (un
valor inicial editable). Que aquí no lo sea es una decisión de diseño, no un tipo.
</details>

<details><summary>Solución</summary>

```tsx
export function EtiquetaTexto({ texto }: { texto: string }) {
  return <p>{texto}</p>
}
```

Un hijo que solo pinta no necesita estado. **Lo que le llega es la verdad.**
</details>

## E2 — `BotonQueAvisa`

<details><summary>Pista 1 — conceptual</summary>

El test comprueba dos cosas: que avise al pulsar **y que no avise antes**. Falla la
segunda, así que la función se está ejecutando en el momento de pintar.
</details>

<details><summary>Pista 2 — más concreta</summary>

Los paréntesis ejecutan. Al hueco hay que entregarle la función, no el resultado de
llamarla — es el primer concepto de esta carpeta, el `exercise-01`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'void' is not assignable to type
'MouseEventHandler<HTMLButtonElement> | undefined'.
```

`void` es lo que devuelve `alPulsar()`: nada. Le estás dando al `onClick` el
resultado de la llamada, y ese resultado no existe.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={alPulsar}>Pulsa</button>
```
</details>

## E3 — `PadreQueGuarda`

<details><summary>Pista 1 — conceptual</summary>

El hijo avisa bien: recibe cada tecla y llama a `alEscribir` con lo tecleado. Mira
qué hace el padre con ese aviso.
</details>

<details><summary>Pista 2 — más concreta</summary>

El padre le pasa una función que **ignora el argumento** y guarda cadena vacía
pase lo que pase. Lo que necesita entregarle al hijo es su propia función de
cambiar el estado — la segunda cosa que devuelve `useState`, tal cual, sin
envolverla en nada.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje.** `() => setTexto('')` encaja perfectamente en
`(valor: string) => void`: la regla de aridad permite declarar menos parámetros de
los que te van a pasar. Que ignorar el valor sea un error es cosa tuya, no del tipo.
</details>

<details><summary>Solución</summary>

```tsx
<CajaQueAvisa alEscribir={setTexto} />
```

`setTexto` **es** una función `(valor: string) => void`. Encaja en la prop sin
envolverla, y entregarla es literalmente darle al hijo la llave del estado del padre.
</details>

## E4 — `PadreQueLimpia`

<details><summary>Pista 1 — conceptual</summary>

El padre guarda bien —el `<p>` de abajo lo demuestra— y al pulsar "Limpiar" el
estado se vacía. Pero el campo sigue enseñando lo de antes: el campo no está
mirando el estado.
</details>

<details><summary>Pista 2 — más concreta</summary>

`CajaQueAvisa` solo sabe avisar; no recibe nada que pintar, así que su `<input>`
se pinta solo con lo que el usuario tecleó. En este archivo hay otra caja que sí
acepta lo que debe mostrar.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje.** Un `<input>` sin `value` es válido y muy común. Que tú
quisieras el campo controlado no está escrito en ningún tipo — es la misma lección
del drill 5 del 06, ahora con el estado un piso más arriba.
</details>

<details><summary>Solución</summary>

```tsx
<CajaControlada texto={texto} alEscribir={setTexto} />
```

**Un hijo controlado necesita las DOS props.** Con una sola funciona a medias.
</details>

## E5 — `PadreConDosCajas`

<details><summary>Pista 1 — conceptual</summary>

Escribes en una caja y el que cambia es el `<p>` de la otra. Sigue el recorrido de
un solo carácter: sale de la caja de arriba, y ¿en qué estado aterriza?
</details>

<details><summary>Pista 2 — más concreta</summary>

Cada caja pinta un estado y avisa a **otro**. Están cruzadas: lo que hay que
emparejar es `texto=` y `alEscribir=` de cada una.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje**, y es el caso del drill 3 del 09 otra vez: los dos estados son
`string`, así que los dos setters tienen exactamente el mismo tipo
—`(valor: string) => void`— y son intercambiables para el compilador. **Cuando dos
cosas tienen el mismo tipo, cruzarlas no es un error de tipos.**
</details>

<details><summary>Solución</summary>

```tsx
<CajaControlada texto={nombre} alEscribir={setNombre} />
<CajaControlada texto={email} alEscribir={setEmail} />
```
</details>

## E6 — `PadreQueEntregaLosDos`

<details><summary>Pista 1 — conceptual</summary>

Lee la firma de `alEnviar`: pide **un** argumento, y ese argumento es un objeto con
dos claves.
</details>

<details><summary>Pista 2 — más concreta</summary>

Tienes los dos datos en dos variables sueltas. Hay que juntarlos en un objeto antes
de entregarlos, y las claves se llaman igual que las variables.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2554: Expected 1 arguments, but got 2.
```
</details>

<details><summary>Solución</summary>

```tsx
onClick={() => alEnviar({ nombre, email })}
```

`{ nombre, email }` es la forma corta de `{ nombre: nombre, email: email }`. Y esta
es exactamente la línea que necesita el drill 3, con otros nombres.
</details>

---

# Escalera F — cambiar una lista es construir otra

> Aviso sobre las pistas 3 de esta escalera: en los seis peldaños `pnpm typecheck`
> está **en silencio**. Mutar un array es código perfectamente válido en TypeScript,
> así que aquí no hay error de compilador que citar. En su lugar va el dato duro:
> qué devuelve cada método y qué ve React.

## F1 — `conUnoMas`

<details><summary>Pista 1 — conceptual</summary>

El enunciado pide dos cosas y el starter solo cumple una: devuelve una lista con el
elemento nuevo, sí, pero la de entrada también acabó con un elemento más. Pregúntate
cuántos arrays hay en juego cuando la función termina. Tienen que ser dos.
</details>

<details><summary>Pista 2 — más concreta</summary>

`push` no fabrica nada: escribe dentro del array que le das. Lo que necesitas es lo
contrario — partir del contenido del viejo y construir uno aparte.

La sintaxis que hace eso ya la tienes en la TEORÍA 2 del archivo, en la primera de
las tres líneas.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```js
const a = ["a"]
a.push("b")     // devuelve 2, el NÚMERO de elementos. Y `a` ahora es ["a","b"]
[...a, "b"]     // devuelve ["a","b"] y `a` sigue como estaba
```

`push` devuelve la longitud nueva, no el array.
</details>

<details><summary>Solución</summary>

```ts
export function conUnoMas(lista: string[], nuevo: string): string[] {
  return [...lista, nuevo]
}
```

Los tres puntos vuelcan uno a uno los elementos de `lista` dentro de un array recién
creado, y luego se añade `nuevo` al final. La lista de entrada no se toca.
</details>

---

## F2 — `sinElQueSea`

<details><summary>Pista 1 — conceptual</summary>

Buscar la posición y recortar por ahí es pensar en términos de "dónde está". Hay otra
forma de pensarlo que no necesita la posición: **quedarse con los que cumplen una
condición**. Descríbelo con esa frase y el método aparece solo.
</details>

<details><summary>Pista 2 — más concreta</summary>

`splice` corta sobre el array original. El que necesitas recorre y devuelve uno nuevo
con los que pasan el filtro — está en la segunda línea de la TEORÍA 2.

Y fíjate en que ese método resuelve gratis el caso raro del test: si el elemento no
está, no pasa nada especial, simplemente ninguno se cae.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```js
const a = ["a","b"]
a.splice(0, 1)              // devuelve ["a"], los QUITADOS. Y `a` queda ["b"]
a.filter((t) => t !== "a")  // devuelve ["b"] y `a` sigue ["a","b"]
```

`splice` devuelve lo que arrancó, no lo que queda. Es el error de lectura clásico.
</details>

<details><summary>Solución</summary>

```ts
export function sinElQueSea(lista: string[], quitar: string): string[] {
  return lista.filter((t) => t !== quitar)
}
```

`filter` construye un array nuevo con los elementos cuya condición da `true`. Como la
condición es "que NO sea el que quiero quitar", sobreviven todos menos ese. Y si no
está, sobreviven todos: por eso sale una copia igual.
</details>

---

## F3 — `conUnoCambiado`

<details><summary>Pista 1 — conceptual</summary>

Los dos anteriores cambiaban cuántos elementos hay. Este no: salen los mismos, pero
uno de ellos es distinto. Necesitas un método que recorra y **transforme cada
elemento**, decidiendo uno por uno si lo dejas igual o lo cambias.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es la tercera línea de la TEORÍA 2, y ya lo has usado en el drill 4 del archivo para
marcar una tarea. Míralo: la forma es idéntica.

Dentro, para cada elemento decides con un ternario: si es el que buscas devuelves el
nuevo, y si no devuelves el que había.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```js
const a = ["a","b"]
a[0] = "z"                           // no devuelve nada útil. `a` es ["z","b"]
a.map((t) => (t === "a" ? "z" : t))  // devuelve ["z","b"] y `a` sigue ["a","b"]
```

Asignar por índice es escribir sobre el original. `map` siempre devuelve un array
nuevo, con exactamente la misma cantidad de elementos.
</details>

<details><summary>Solución</summary>

```ts
export function conUnoCambiado(lista: string[], viejo: string, nuevo: string): string[] {
  return lista.map((t) => (t === viejo ? nuevo : t))
}
```

`map` visita cada elemento y guarda en el array nuevo lo que devuelvas para él. Los
que no coinciden se devuelven tal cual, y por eso sobreviven sin cambios.
</details>

---

## F4 — `ListaQueCrece`

<details><summary>Pista 1 — conceptual</summary>

Aquí está el fallo que da nombre a la escalera, y lo raro es lo que NO pasa: no hay
error en consola, no hay error de tipos, y el dato se guarda de verdad. Solo que la
pantalla no cambia.

La pregunta que lo desbloquea: ¿cómo decide React si tiene que volver a pintar?
</details>

<details><summary>Pista 2 — más concreta</summary>

React no mira dentro del array para ver si tiene más cosas. Compara **si es el mismo
array de antes**, y `push` te deja exactamente el mismo. Le estás entregando al setter
lo que ya tenía guardado.

Ya has resuelto esto en el F1: entrégale al setter lo que devuelve aquella función.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Typecheck en silencio y test rojo. Lo que sale al ejecutar:

| | starter | esperado |
|---|---|---|
| tras 1 click | 0 `<li>` | 1 `<li>` con "item 1" |
| tras 2 clicks | 0 `<li>` | 2 `<li>` |

Cero, no uno: la pantalla nunca se entera. Y si metes un `console.log(items)` dentro
de `añadir` verás que el array SÍ va creciendo. Ese contraste es el ejercicio.
</details>

<details><summary>Solución</summary>

```tsx
const añadir = () => {
  setItems([...items, `item ${items.length + 1}`])
}
```

Es el F1 escrito dentro del componente. Al entregarle un array recién construido, la
comparación que hace React da distinto y se repinta.
</details>

---

## F5 — `ListaQueMengua`

<details><summary>Pista 1 — conceptual</summary>

Mismo fallo que el F4, otra operación. Si el F4 ya lo tienes, aquí solo cambia qué
función del primer tramo te toca copiar.
</details>

<details><summary>Pista 2 — más concreta</summary>

`splice` sobre el array del estado es el `push` del peldaño anterior: escribe en el
que ya tenías. Usa el del F2 y entrégale al setter lo que devuelve.
</details>

<details><summary>Pista 3 — el dato duro</summary>

El starter tiene un segundo problema, más feo que el primero: como `splice` sí muta,
el array del estado se queda con dos elementos aunque la pantalla siga enseñando tres.
A partir de ahí lo que ves y lo que hay dejan de coincidir, y los siguientes clicks
borran cosas que no esperas.
</details>

<details><summary>Solución</summary>

```tsx
const quitar = (item: string) => {
  setItems(items.filter((i) => i !== item))
}
```

El F2 dentro del componente. Fíjate en que desaparecen las dos líneas de buscar la
posición: `filter` no necesita saber dónde está, solo cuál no quieres.
</details>

---

## F6 — `MiniGestor`

<details><summary>Pista 1 — conceptual</summary>

No hay nada nuevo en este peldaño. Son las tres operaciones que ya has escrito, cada
una en su sitio. Si te atascas no es de este drill: vuelve al F1, F2 o F3 según cuál
de las tres falle.

La única diferencia es que aquí los elementos son objetos, no textos.
</details>

<details><summary>Pista 2 — más concreta</summary>

`marcar` es el que tiene truco. No puedes cambiarle la propiedad al objeto que
encuentres, porque eso es mutar un piso más abajo: el array sería nuevo pero el objeto
seguiría siendo el mismo.

Necesitas devolver un objeto **nuevo** para el que cambia, copiando lo que ya tenía y
pisando solo la propiedad que toca. Esa forma exacta está en el drill 4 del archivo.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Los tres métodos y qué devuelve cada uno, para tenerlos juntos:

```js
[...items, nuevo]                                      // añadir
items.filter((i) => i.id !== id)                       // quitar
items.map((i) => (i.id === id ? { ...i, hecho } : i))  // cambiar uno
```

Y ojo con `find` más asignación: `find` te devuelve **el objeto de dentro del array**,
no una copia. Cambiarle una propiedad muta el estado aunque no toques el array.
</details>

<details><summary>Solución</summary>

```tsx
const añadir = () => {
  const nuevo: ItemMini = { id: crypto.randomUUID(), texto: `item ${items.length + 1}`, hecho: false }
  setItems([...items, nuevo])
}

const marcar = (id: string, hecho: boolean) => {
  setItems(items.map((i) => (i.id === id ? { ...i, hecho } : i)))
}

const borrar = (id: string) => {
  setItems(items.filter((i) => i.id !== id))
}
```

Las tres devuelven algo nuevo y ninguna toca lo que había. En `marcar`,
`{ ...i, hecho }` copia todas las propiedades del item y luego pisa `hecho` con el
valor que llega — por eso el objeto resultante es otro, y React ve el cambio.

Esto es, línea por línea, lo que le falta al drill 6.
</details>
