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
