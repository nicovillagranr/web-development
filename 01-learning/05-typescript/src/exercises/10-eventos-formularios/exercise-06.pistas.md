# Pistas — exercise-06 · onChange y el texto del campo

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `CampoAvisaTexto`

<details><summary>Pista 1 — conceptual</summary>

`avisar` quiere un texto. Mira el `📌 RECORDATORIO` de arriba del archivo y
pregúntate si lo que le estás dando es el texto o la caja donde vive el texto.
</details>

<details><summary>Pista 2 — más concreta</summary>

Es la caja: `e.target` es el `<input>` entero, con sus cien propiedades. Lo escrito
es una de ellas.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'EventTarget & HTMLInputElement' is not assignable to
parameter of type 'string'.
```

Te está nombrando el elemento entero. Es la confusión objeto-vs-propiedad otra vez,
un piso más adentro que en el 02.
</details>

<details><summary>Solución</summary>

```tsx
<input onChange={(e) => avisar(e.target.value)} />
```
</details>

---

## Drill 2 — `CampoNumeroAvisaDoble`

<details><summary>Pista 1 — conceptual</summary>

⚠️ **Este starter pasa el test.** Y aun así está mal. Corre `pnpm typecheck` antes de
darlo por bueno.
</details>

<details><summary>Pista 2 — más concreta</summary>

`value` es un `string` aunque el campo sea `type="number"`: el navegador no convierte
nada. Multiplicar un texto por dos es una operación que TypeScript no te deja
escribir, y la conversión la tienes que hacer tú antes.
</details>

<details><summary>Pista 3 — lo que dice el compilador, y por qué el test miente</summary>

```
TS2362: The left-hand side of an arithmetic operation must be of type 'any',
'number', 'bigint' or an enum type.
```

**El test pasa porque JavaScript hace la conversión por su cuenta**: `"21" * 2` da
`42` sin protestar. TypeScript no acepta esa magia, y tiene razón — con `+` en vez de
`*`, ese mismo apaño te habría dado `"212"`. Este drill es la demostración más clara
del archivo de que un test verde no es una aprobación.
</details>

<details><summary>Solución</summary>

```tsx
<input type="number" onChange={(e) => avisar(Number(e.target.value) * 2)} />
```
</details>

---

## Drill 3 — `AreaAvisaTexto`

<details><summary>Pista 1 — conceptual</summary>

⚠️ **Este starter también pasa el test.** Al ejecutar funciona: un `<textarea>` tiene
`value` igual que un `<input>`. Corre `pnpm typecheck`.
</details>

<details><summary>Pista 2 — más concreta</summary>

El manejador vive fuera del hueco, así que la anotación la escribiste tú — y está
copiada del drill 1. La `T` de `ChangeEvent<T>` dice qué elemento cambió, y este ya
no es un `<input>`. El nombre del elemento sigue el mismo patrón que
`HTMLInputElement` y `HTMLAnchorElement`.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type '(e: ChangeEvent<HTMLInputElement>) => void' is not assignable to type
'ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>'.
```

Lee el final de la línea: ahí está el nombre que buscabas.
</details>

<details><summary>Solución</summary>

```tsx
const manejar = (e: ChangeEvent<HTMLTextAreaElement>) => avisar(e.target.value)
```
</details>

---

## Drill 4 — `CampoGuardaTexto`

<details><summary>Pista 1 — conceptual</summary>

`setTexto` guarda lo que le des, y el `<p>` pinta lo que haya guardado. Si en pantalla
no sale el texto, mira qué le estás dando a `setTexto`.
</details>

<details><summary>Pista 2 — más concreta</summary>

Mismo fallo que el drill 1, en otro sitio: le estás pasando el elemento en vez de su
contenido.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'EventTarget & HTMLInputElement' is not assignable to
parameter of type 'SetStateAction<string>'.
```

`SetStateAction<string>` es el tipo de lo que `setTexto` acepta. Léelo como "algo con
lo que dejar el estado en un `string`".
</details>

<details><summary>Solución</summary>

```tsx
<input onChange={(e) => setTexto(e.target.value)} />
```
</details>

---

## Drill 5 — `CampoEnMayusculas`

<details><summary>Pista 1 — conceptual</summary>

Mira el `<p>`: ahí SÍ salen las mayúsculas, o sea que guardar funciona. El problema
está en la otra dirección — nadie le está diciendo al campo qué tiene que mostrar.
</details>

<details><summary>Pista 2 — más concreta</summary>

Un `<input>` sin más se pinta a sí mismo con lo que tecleaste, ignorando tu estado.
Para que mande el estado hay que darle explícitamente lo que debe mostrar, con un
atributo que ya has visto en la SINTAXIS de la TEORÍA 2.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** Un `<input>` sin ese atributo es HTML perfectamente
válido — de hecho es lo normal. TypeScript no tiene forma de saber que tú querías el
campo controlado. Solo el test lo caza, comparando lo que hay dentro del campo.
</details>

<details><summary>Solución</summary>

```tsx
<input value={texto} onChange={(e) => setTexto(e.target.value.toUpperCase())} />
```

Con el `value` puesto, el campo deja de pintarse solo y pasa a pintar el estado. Esa
es la definición de campo controlado.
</details>

---

## Drill 6 — `FormularioNombre`

<details><summary>Pista 1 — conceptual</summary>

Este es el fallo espejo del drill 5. Allí el estado se actualizaba y nadie lo pintaba;
aquí el `value` está bien puesto y lo que no cambia nunca es el estado.
</details>

<details><summary>Pista 2 — más concreta</summary>

Mira qué le pasa el `onChange` a `setNombre`: le está dando el nombre que YA había
guardado, así que lo deja igual que estaba. Lo nuevo que ha tecleado el usuario no
está en el estado — está en el evento, y el manejador ni lo pide.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador.** `nombre` es un `string` y `setNombre` acepta un
`string`: para TypeScript la línea es impecable. Y como el manejador no declara el
parámetro del evento, tampoco hay ningún parámetro sin usar del que quejarse — es la
regla de aridad del drill 13 del `01` jugando en tu contra.
</details>

<details><summary>Solución</summary>

```tsx
<input value={nombre} onChange={(e) => setNombre(e.target.value)} />
```

Las dos mitades del circuito: el `value` baja del estado al campo, y el `onChange`
sube del campo al estado.
</details>
