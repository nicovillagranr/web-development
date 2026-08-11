# Pistas — exercise-02 · el evento llega solo

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.
>
> Los mensajes de la Pista 3 son los que escupe `pnpm typecheck` sobre el starter,
> literales. Cuando no hay mensaje es porque **ese drill typecheck no lo caza**, y la
> pista lo dice.

---

## Drill 1 — `BotonPelado`

<details><summary>Pista 1 — conceptual</summary>

Vuelve al drill 1 del `exercise-01`: la diferencia entre entregar una función y
ejecutarla. Aquí es lo mismo, solo que quien la va a ejecutar es React.
</details>

<details><summary>Pista 2 — más concreta</summary>

Si el componente ya avisa nada más pintarse, es que alguien la llamó al escribir el
JSX. Mira qué hay pegado al nombre de la función dentro del hueco.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2322: Type 'void' is not assignable to type
'MouseEventHandler<HTMLButtonElement> | undefined'.
```

Le diste **el retorno** (que es nada) donde se pedía **la función**. El `| undefined`
sale porque `onClick` es opcional: puedes no ponerlo, pero si lo pones va función.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={alPulsar}>Avisar</button>
```

Va pelada. `onClick` pide `(e: MouseEvent<HTMLButtonElement>) => void` y tú tienes
`() => void`: una función que acepta **menos** parámetros encaja, los sobrantes se
tiran.
</details>

---

## Drill 2 — `BotonAvisaTipo`

<details><summary>Pista 1 — conceptual</summary>

`avisar` pide un texto. Pregúntate qué es exactamente lo que le estás dando: ¿un
texto, o la caja que contiene ese texto entre otras veinticinco cosas?
</details>

<details><summary>Pista 2 — más concreta</summary>

Es la caja. Mira el `📌 RECORDATORIO` de arriba del archivo: `e` es todo el objeto, y
el texto que buscas es **un campo suyo**.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'MouseEvent<HTMLButtonElement, MouseEvent>' is not
assignable to parameter of type 'string'.
```

No te falta un tipo: te falta un punto.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={(e) => avisar(e.type)}>Avisar</button>
```

Y `e` sin anotar: el hueco ya le puso el tipo. Eso es el tipado contextual.
</details>

---

## Drill 3 — `BotonAvisaDobleClic`

<details><summary>Pista 1 — conceptual</summary>

El manejador está bien escrito. Lo que está mal es **cuándo salta**.
</details>

<details><summary>Pista 2 — más concreta</summary>

El hueco que usa el starter reacciona a un clic suelto. Hay otro para el doble clic,
y su nombre es el que dirías en inglés, en `camelCase` como todos los demás.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador en este drill.** Los dos huecos aceptan exactamente la
misma función, así que el fallo no es de tipos: es de haber elegido mal. Solo lo caza
el test, y el test lo caza porque espera `"dblclick"` y recibe `"click"`.
</details>

<details><summary>Solución</summary>

```tsx
<button onDoubleClick={(e) => avisar(e.type)}>Avisar</button>
```

El texto que sale cambia solo, porque lo trae el evento.
</details>

---

## Drill 4 — `CampoAvisaTecla`

<details><summary>Pista 1 — conceptual</summary>

Estás pidiéndole a un evento un dato que ese tipo de evento no tiene. ¿De verdad un
clic sabe qué tecla se pulsó?
</details>

<details><summary>Pista 2 — más concreta</summary>

No. El hueco decide qué evento te llega, y este es de ratón. Cambia el hueco por el
del teclado y el evento cambiará con él — con los campos que necesitas dentro.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2339: Property 'key' does not exist on type 'MouseEvent<HTMLInputElement, MouseEvent>'.
```

Léelo entero: te está diciendo qué molde has elegido.
</details>

<details><summary>Solución</summary>

```tsx
<input onKeyDown={(e) => avisar(e.key)} />
```

`onClick` → `e: MouseEvent<…>`, sin `key`. `onKeyDown` → `e: KeyboardEvent<…>`, con
`key`.
</details>

---

## Drill 5 — `BotonAvisaNativo`

<details><summary>Pista 1 — conceptual</summary>

Hay dos objetos en juego con el mismo nombre. El que te da React envuelve al del
navegador, y `avisar` quiere el de dentro.
</details>

<details><summary>Pista 2 — más concreta</summary>

Ese "de dentro" es un campo del evento, y está dibujado en el `📌 RECORDATORIO` de
arriba del archivo. También lo tienes en `🗣️ LAS PIEZAS` de la TEORÍA 2.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
TS2345: Argument of type 'MouseEvent<HTMLButtonElement, MouseEvent>' is not
assignable to parameter of type 'MouseEvent'.
  … is missing the following properties … layerX, layerY, offsetX, offsetY, and 16 more
```

Los **dos homónimos cara a cara**, y debajo TS te dice en qué se diferencian. El de la
izquierda es el de React; el de la derecha, el global del DOM.
</details>

<details><summary>Solución</summary>

```tsx
<button onClick={(e) => avisar(e.nativeEvent)}>Avisar</button>
```

`e` es el envoltorio de React; `e.nativeEvent`, la carta de dentro.
</details>

---

## Drill 6 — `BotonAvisaConId`

<details><summary>Pista 1 — conceptual</summary>

Cuenta las fuentes de datos que tienes ahí dentro. Son dos, y en el resultado tiene
que aparecer algo de cada una.
</details>

<details><summary>Pista 2 — más concreta</summary>

El `id` viene de las props y el otro trozo viene del evento. El starter está usando
una sola. La `e` que declares dentro del hueco llegará tipada sola, como siempre.
</details>

<details><summary>Pista 3 — por qué typecheck no dice nada</summary>

**No hay mensaje de compilador en este drill.** `id` ya es un `string` perfectamente
válido, así que entregar solo la mitad es correcto para TypeScript. No es un fallo de
tipos, es de haberte dejado media pieza. Solo el test lo caza.
</details>

<details><summary>Solución</summary>

```tsx
<button id={id} onClick={(evento) => avisar(`${id}:${evento.type}`)}>Avisar</button>
```
</details>
