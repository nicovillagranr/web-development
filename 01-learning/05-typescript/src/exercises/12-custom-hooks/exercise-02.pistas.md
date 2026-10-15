# Pistas — exercise-02 · la limpieza de un efecto

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los 21 starters compilan, así que la Pista 3 casi siempre cita lo que dice el test. La
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

---

## Drill 12 — los registros al montarse

<details><summary>Pista 1 — conceptual</summary>

Un segundo es poco para un temporizador de tres. Piensa solo en lo que pasa al
montarse, y en qué orden.

</details>

<details><summary>Pista 2 — más concreta</summary>

Al montarse, React primero pinta y después corre el efecto: lo viste en el 01. El
temporizador queda programado, pero en el segundo 1 todavía no ha sonado.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 2 registros. Ninguno es "limpieza" ni "se acaba el tiempo".

</details>

<details><summary>Solución</summary>

```ts
export const respuesta12: string[] = ["pinta", "efecto"];
```

El cuerpo del componente corre al pintar y registra "pinta". Después React corre el
efecto, que registra "efecto" y deja el temporizador programado para el segundo 3. En el
segundo 1 no ha sonado y nadie ha desmontado el aviso, así que no hay nada más.

</details>

---

## Drill 13 — `AvisoDemo`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo de un componente es la receta de lo que se pinta, y React la repite en cada
render. ¿Qué pasa con lo que programes ahí cada vez que se repite?

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que tiene que pasar una sola vez, al montarse, va en un efecto con un array que
nunca cambia (el 01).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: temporizadores pendientes: expected 1 to be +0
```

El aviso sí se va a los 3 segundos. Pero `setVisible(false)` provoca un render, el
render vuelve a pasar por el cuerpo y programa otro temporizador: ése es el que queda
pendiente.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  window.setTimeout(() => setVisible(false), 3000);
}, []);
```

Con `[]`, el efecto corre al montarse y ningún render lo repite. Todavía no lleva
limpieza: eso es la fase 3. Si lo dejas sin array, el test vuelve a dar 1, porque sin
array el efecto corre después de cada render, igual que el cuerpo.

</details>

---

## Drill 14 — los registros al pasar 3 segundos

<details><summary>Pista 1 — conceptual</summary>

Es el 12 con el reloj avanzado hasta el segundo 3. ¿Qué hace el temporizador cuando
suena, y qué provoca eso?

</details>

<details><summary>Pista 2 — más concreta</summary>

`setVisible(false)` provoca un render nuevo. El cuerpo corre seguro. ¿Y el efecto, con
`[]`? ¿Y su limpieza?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 4 registros, y "pinta" sale dos veces.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta14: string[] = ["pinta", "efecto", "se acaba el tiempo", "pinta"];
```

El temporizador registra "se acaba el tiempo" y llama a `setVisible(false)`, y eso
repinta. Con `[]`, un render nuevo no repite el efecto, y sin repetición no hay
limpieza: la limpieza corre antes de repetir el efecto o al desmontarse, y aquí no pasa
ninguna de las dos. "Aviso cerrado" es el mismo componente, todavía montado, pintado con
otro estado.

</details>

---

## Drill 15 — `AvisoConLikes`

<details><summary>Pista 1 — conceptual</summary>

Cada clic en "Me gusta" cambia un estado y repinta. ¿Qué hace este efecto después de
cada render?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sin array, el efecto se repite después de cada render, y antes de repetirse su limpieza
cancela el temporizador que había. Cada clic reinicia la cuenta. El efecto tiene que
correr solo al montarse.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected document not to contain element, found <p
  role="status"
>
  AVISO: Proyecto Demo
</p> instead
```

El test hace clic en el segundo 2 y mira en el segundo 3. El aviso sigue ahí porque su
temporizador volvió a empezar en el segundo 2.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const id = window.setTimeout(() => setVisible(false), 3000);
  return () => {
    window.clearTimeout(id);
  };
}, []);
```

La limpieza ya estaba bien: lo que sobraba era repetir el efecto. Con `[]`, el clic
repinta el botón pero no toca el temporizador, y el aviso se va a los 3 segundos del
montaje.

</details>

---

## Drill 16 — los registros si se desmonta en el segundo 1

<details><summary>Pista 1 — conceptual</summary>

En el segundo 1 el aviso se va de la página. ¿Qué le toca correr a React en ese
momento, y qué hace eso con el temporizador?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al desmontarse corre la limpieza. Ésta registra y además cancela con el id. ¿Puede sonar
después un temporizador cancelado?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 3 registros.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta16: string[] = ["pinta", "efecto", "limpieza"];
```

En el segundo 1, React desmonta el aviso y llama a la limpieza: registra "limpieza" y
`clearTimeout(id)` cancela el temporizador. En el segundo 3 ya no hay nada que suene.

</details>

---

## Drill 17 — los registros si la limpieza no cancela

<details><summary>Pista 1 — conceptual</summary>

La limpieza corre igual, en el segundo 1. Lo que cambia es lo que hace dentro.

</details>

<details><summary>Pista 2 — más concreta</summary>

React no cancela nada por ti: solo llama a tu limpieza. Si dentro no hay
`clearTimeout`, el temporizador sigue programado aunque el componente ya no esté.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 4 registros, y el último llega después de "limpieza".

</details>

<details><summary>Solución</summary>

```ts
export const respuesta17: string[] = ["pinta", "efecto", "limpieza", "se acaba el tiempo"];
```

El temporizador vive fuera de React: suena en el segundo 3 aunque el aviso ya no esté, y
registra. Es el teléfono sonando en la habitación vacía. Su `setVisible(false)` no hace
nada, porque React ignora el setter de un componente desmontado. Todo lo demás que haga
el temporizador (registrar, avisar al padre, navegar) sí ocurre.

</details>

---

## Drill 18 — `AvisoConLimpieza`

<details><summary>Pista 1 — conceptual</summary>

Para cancelar un temporizador hay que poder decir cuál. ¿Dónde está su número?

</details>

<details><summary>Pista 2 — más concreta</summary>

`setTimeout` devuelve el id, y aquí se pierde. Guárdalo en una constante y cancélalo
con `clearTimeout` dentro de la limpieza. Esa constante es el ticket del guardarropa de
la primera escalera.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: temporizadores pendientes: expected 1 to be +0
```

El test desmonta en el segundo 1 y cuenta los temporizadores que siguen programados.
Queda 1.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const id = window.setTimeout(() => setVisible(false), 3000);
  return () => {
    window.clearTimeout(id);
  };
}, []);
```

El efecto guarda el id y la limpieza cancela ESE temporizador. Sin llaves también vale,
`return () => window.clearTimeout(id)`: `clearTimeout` no devuelve nada, así que aquí
no te pasa lo del drill 1.

</details>

---

## Drill 19 — el segundo en que desaparece el aviso

<details><summary>Pista 1 — conceptual</summary>

Hay dos momentos: el montaje y el cambio de `texto`. Repasa qué corre en cada uno: es
el drill 4 con un temporizador.

</details>

<details><summary>Pista 2 — más concreta</summary>

Al cambiar `texto`, la limpieza del efecto anterior cancela el temporizador que llevaba
2 segundos contando. Después el efecto nuevo programa otro de 3. ¿Desde cuándo cuenta
ése?

</details>

<details><summary>Pista 3 — el dato duro</summary>

No es 3.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta19: number = 5;
```

En el segundo 2 cambia `texto`: React llama a la limpieza del efecto de "Enviado", que
cancela su temporizador, y corre el efecto de "Reenviado", que programa uno nuevo.
2 + 3 = 5.

</details>

---

## Drill 20 — los registros de tu `PortfolioItem`

<details><summary>Pista 1 — conceptual</summary>

Este efecto vigila `showDemoMessage`. Cuenta cuántas veces cambia ese valor desde el
clic hasta el segundo 3.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cambia dos veces: a `true` con el clic y a `false` cuando suena el temporizador. Cada
cambio repite el efecto, y antes de repetirlo React llama a la limpieza del anterior,
si la hay. Fíjate en lo que devuelve el efecto cuando `showDemoMessage` es `false`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 2 registros.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta20: string[] = ["programa", "limpieza"];
```

Al montarse, `showDemoMessage` es `false`: el efecto sale por el `return;` sin dejar
limpieza. El clic lo pone a `true`, el efecto se repite, registra "programa" y programa
el temporizador. En el segundo 3 vuelve a `false`: antes de repetir el efecto, React
llama a la limpieza del anterior ("limpieza"), y el efecto nuevo vuelve a salir por el
`return;`.

La diferencia con el 14: allí el array era `[]` y nada repetía el efecto. Aquí el
propio temporizador cambia lo que el array vigila. "En el segundo 3 no hay limpieza" vale
para `[]`, no para tu Projex.

</details>

---

## Drill 21 — `AvisoProyectoDemo`

<details><summary>Pista 1 — conceptual</summary>

Ya tienes todas las piezas: un efecto, un temporizador con su id y una limpieza. Lo
nuevo es cuándo tiene que correr el efecto: no al montarse, sino cuando aparece el aviso.

</details>

<details><summary>Pista 2 — más concreta</summary>

El efecto vigila `showDemoMessage`. Si es `false`, no hay nada que programar. Si es
`true`, programa el temporizador y devuelve la limpieza que lo cancela. Es tu drill 20.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
expected document not to contain element, found <p
  role="status"
>
  AVISO: Proyecto Demo
</p> instead
```

Sin efecto, nadie vuelve a poner `showDemoMessage` a `false`. Si te sale con `[]`, es
que el efecto solo corrió al montarse, cuando aún era `false`. Si te sale sin array, es
que el repintado del padre en el segundo 2 reinició la cuenta (el 15). Y si lo que sale
es `temporizadores pendientes: expected 1 to be +0`, falta la limpieza (el 18).

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (!showDemoMessage) return;
  const id = window.setTimeout(() => setShowDemoMessage(false), 3000);
  return () => {
    window.clearTimeout(id);
  };
}, [showDemoMessage]);
```

Es el efecto de tu `PortfolioItem` de Projex. El clic pone `true` y el efecto programa.
En el segundo 3, el temporizador pone `false`, la limpieza cancela (ya había sonado, no
pasa nada) y el efecto nuevo sale por el `return;`. Un repintado del padre no cambia
`showDemoMessage`, así que no repite nada. Y si se desmonta antes, la limpieza cancela
el temporizador que quedaba.

</details>
