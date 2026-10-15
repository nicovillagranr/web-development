# Pistas — exercise-02 · la limpieza de un efecto

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 11 starters compilan, así que la Pista 3 casi siempre cita lo que dice el test. La
excepción es el drill 1, si escribes la limpieza como flecha sin llaves.

---

## Drill 1 — `ModalSinScroll`

<details><summary>Pista 1 — conceptual</summary>

El efecto hace bien su trabajo al abrirse. La pregunta es quién deshace ese trabajo
cuando el modal se va. Ahora mismo, nadie.

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que un efecto deja puesto lo quita su limpieza: una función que el efecto devuelve
con `return`, y que React llama al desmontarse (Teoría 1). Dentro, devuelve el
`overflow` a como estaba.

</details>

<details><summary>Pista 3 — lo que dice el test (y el compilador, si no pones llaves)</summary>

```
AssertionError: expected 'hidden' to be ''
```

El modal ya no está, pero el `body` sigue con `"hidden"`.

Y si escribes la limpieza sin llaves, `return () => document.body.style.overflow = ""`:

```
TS2345: Argument of type '() => () => string' is not assignable to parameter of type 'EffectCallback'.
  Type '() => string' is not assignable to type 'void | Destructor'.
```

Una asignación sin llaves **devuelve** el valor asignado, el `""`. La limpieza no puede
devolver nada: ponle llaves.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "";
  };
}, []);
```

React guarda la función del `return` y la llama cuando el modal desaparece. Tu
`MapModal` va un paso más allá: guarda el valor que había antes
(`previousOverflow`) y restaura ESE, por si otro componente también lo había tocado.
Es la regla de "un solo dueño" de lo que vive fuera de React.

</details>

---

## Drill 2 — `CerrarConEscape`

<details><summary>Pista 1 — conceptual</summary>

El listener está colgado del `document`, no del modal. Cuando el modal se va, el
`document` sigue ahí, y el listener con él.

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta la limpieza, y dentro, `removeEventListener` con el mismo tipo de evento y la
misma función que recibió `addEventListener`. Esa función ya tiene nombre: es lo que
te deja quitarla.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 2 times
```

La primera llamada es el Escape con el mapa abierto (bien). La segunda es el Escape
**después** de desmontarlo: el listener seguía colgado.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const alPulsar = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  document.addEventListener("keydown", alPulsar);
  return () => {
    document.removeEventListener("keydown", alPulsar);
  };
}, [onClose]);
```

`alPulsar` es la misma función en las dos líneas, así que `removeEventListener` la
encuentra y la quita. Es el mismo par que cierra tu `MapModal`.

</details>

---

## Drill 3 — una limpieza que quita otra función

<details><summary>Pista 1 — conceptual</summary>

Las dos flechas se escriben igual. ¿Eso las convierte en la misma función?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada vez que se evalúa una flecha, nace una función nueva. `removeEventListener` no
compara el texto del código: busca exactamente la función que le pasaste a
`addEventListener` (Teoría 1).

</details>

<details><summary>Pista 3 — el dato duro</summary>

`removeEventListener` con una función que no está colgada **no da error**: no
encuentra nada que quitar y sigue adelante en silencio.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: Llamada = "sí, se llama";
```

La limpieza intenta quitar una función recién creada que nunca se colgó. La del
`addEventListener` sigue en el `document`, y con el mapa cerrado cada Escape sigue
llamando a `onClose`. Es como dar de baja a un cliente con el nombre bien escrito pero
el número de cliente de otro.

</details>

---

## Drill 4 — los registros de `Sala`

<details><summary>Pista 1 — conceptual</summary>

Hay tres momentos: el montaje, el cambio de "norte" a "sur" y el desmontaje. Cuenta
qué corre en cada uno.

</details>

<details><summary>Pista 2 — más concreta</summary>

En el cambio corren dos cosas, y en un orden fijo (Teoría 2). Y la limpieza no lee el
`nombre` de ahora: lee el del render en el que nació su efecto.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 4 registros: 1 en el montaje, 2 en el cambio y 1 en el desmontaje.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta4: string[] = [
  "conecta norte",
  "desconecta norte",
  "conecta sur",
  "desconecta sur",
];
```

Al cambiar a "sur", React primero llama a la limpieza del efecto de "norte", y esa
limpieza se acuerda de "norte" porque nació con él. Después corre el efecto nuevo. Al
desmontarse, la que queda es la limpieza de "sur".

</details>

---

## Drill 5 — sin limpieza y con el ensayo de StrictMode

<details><summary>Pista 1 — conceptual</summary>

En `pnpm dev`, "abrir el mapa una vez" no es montarlo una vez. Repasa qué hace
`StrictMode` nada más montar.

</details>

<details><summary>Pista 2 — más concreta</summary>

El ensayo es montar → desmontar → montar. Cada montaje corre el efecto, y cada efecto
cuelga un listener. ¿Qué quita el desmontaje del medio, si no hay limpieza?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Sin limpieza, el desmontaje del ensayo no quita nada. Cuando pulsas Escape, hay más
de un listener colgado del `document`.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: number = 2;
```

El primer montaje cuelga un listener, el desmontaje del ensayo no lo quita (no hay
limpieza) y el segundo montaje cuelga otro. Un Escape, dos llamadas. Con la limpieza,
el ensayo quita el primero y queda uno solo: por eso el ensayo existe, para que lo
veas en desarrollo. Lo puedes comprobar en la tarjeta 02 del banco.

</details>

---

## Drill 6 — una función pasada a otra constante

<details><summary>Pista 1 — conceptual</summary>

En la segunda línea, ¿nace una flecha nueva? Busca el `=>`.

</details>

<details><summary>Pista 2 — más concreta</summary>

`const copia = avisar` no copia la función: le pone un segundo nombre a la misma. Es
como darle a otra persona tu ticket del guardarropa: sigue siendo tu abrigo.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Una función nueva solo nace donde se evalúa una flecha (`=>`) o un `function`. Pasarla
a otra constante, o como argumento, mueve la misma.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: boolean = true;
```

`avisar` y `copia` son dos nombres para una sola función. Por eso, en el drill 8,
puedes pasar `alHacerClic` tal cual a los dos métodos: el parámetro también es un
nombre de la misma función.

</details>

---

## Drill 7 — `colgarYQuitar`

<details><summary>Pista 1 — conceptual</summary>

Cuenta las flechas del starter. ¿Cuántos avisos distintos nacen?

</details>

<details><summary>Pista 2 — más concreta</summary>

Nacen dos: uno se cuelga y el otro, que nunca se colgó, es el que se intenta quitar.
Haz que nazca uno solo, guárdalo en una constante y usa ese nombre en las dos líneas.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 1 to be +0
```

Se colgó 1 aviso y sigue ahí: el `quitar` buscó otro y no lo encontró.

</details>

<details><summary>Solución</summary>

```ts
export function colgarYQuitar(tablon: Tablon) {
  const aviso = () => "hola";
  tablon.colgar(aviso);
  tablon.quitar(aviso);
}
```

Una flecha, un nombre, dos usos. El tablón recibe el mismo aviso en las dos líneas y lo
encuentra al quitarlo.

</details>

---

## Drill 8 — `colgarYQuitarClic`

<details><summary>Pista 1 — conceptual</summary>

Es el drill 7 con otro tablón: el `document`. ¿Qué cambia? Solo los nombres de los
métodos.

</details>

<details><summary>Pista 2 — más concreta</summary>

Una constante con la función, y esa misma en `addEventListener` y en
`removeEventListener`. O, mejor aún: mira el drill 6. `alHacerClic` ya es un nombre.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to not be called at all, but actually been called 1 times
```

El test hace un clic después de tu función, y el listener seguía colgado.

</details>

<details><summary>Solución</summary>

```ts
export function colgarYQuitarClic(alHacerClic: () => void) {
  document.addEventListener("click", alHacerClic);
  document.removeEventListener("click", alHacerClic);
}
```

`alHacerClic` es la misma función en las dos líneas. También vale guardar una flecha en
una constante (`const alPulsar = () => alHacerClic();`) y usar esa: lo que importa es
que sea la misma en las dos.

</details>

---

## Drill 9 — `AvisarClics`

<details><summary>Pista 1 — conceptual</summary>

Lo del drill 8 ahora está repartido: la primera mitad en el efecto y la segunda en la
limpieza. ¿Siguen siendo la misma función?

</details>

<details><summary>Pista 2 — más concreta</summary>

Declara la constante dentro del efecto, antes del `addEventListener`. La limpieza
también está dentro del efecto, así que puede usar ese mismo nombre. Es la forma de
tu drill 2.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 2 times
```

El primer clic, con el componente montado, está bien. El segundo es después de
desmontar: el listener seguía ahí.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const alPulsar = () => alHacerClic();
  document.addEventListener("click", alPulsar);
  return () => {
    document.removeEventListener("click", alPulsar);
  };
}, [alHacerClic]);
```

La limpieza nace dentro del mismo efecto que `alPulsar`, así que lo ve y lo quita.
Pasar `alHacerClic` directamente a los dos métodos también vale.

</details>

---

## Drill 10 — `pideMenosMovimiento`

<details><summary>Pista 1 — conceptual</summary>

Ya está escrito en tu archivo: mira el `useState` del drill 11.

</details>

<details><summary>Pista 2 — más concreta</summary>

Llama a `window.matchMedia` con el texto del enunciado y devuelve el `.matches` de lo
que te devuelve.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected false to be true
```

El test hace que la consulta diga `true`, y tu función sigue devolviendo `false` sin
preguntarle.

</details>

<details><summary>Solución</summary>

```ts
export function pideMenosMovimiento(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

`matchMedia` devuelve un objeto, la consulta, y `.matches` es su respuesta de este
momento. Ese objeto también avisa con `"change"` cuando la respuesta cambia: eso es lo
que escucha el drill 11.

</details>

---

## Drill 11 — `PreferenciaMovimiento`

<details><summary>Pista 1 — conceptual</summary>

Para soltar algo hay que poder nombrarlo. ¿Cómo vas a quitar un listener que es una
flecha escrita directamente dentro de `addEventListener`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es tu drill 9 con la consulta en lugar del `document`. Saca la flecha a una constante
y usa ese nombre en `addEventListener` y en `removeEventListener`.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 1 to be +0
```

El test cuenta cuántos listeners siguen colgados de la consulta después de desmontar.
Queda 1. Si ya escribiste una limpieza y sigue saliendo esto, vuelve a tu drill 9.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
  const actualizar = () => setReducidas(consulta.matches);
  consulta.addEventListener("change", actualizar);
  return () => {
    consulta.removeEventListener("change", actualizar);
  };
}, []);
```

Con nombre, `actualizar` es la misma función en las dos líneas. Tu `useMediaPreferences`
hace lo mismo con `updatePreferences`. Lo que tiene de más (`addListener`,
`connection`) es para navegadores viejos y para "Ahorrar datos": es el 06.

</details>
