# Pistas — exercise-03 · `useRef`: tu propia agarradera a un elemento

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Aquí el compilador habla más que en el 01 y el 02: el starter del drill 4 no compila, y
el drill 2 se queda en verde con un error de tipos si lo resuelves a medias.

---

## Drill 1 — `EnfocarConRef`

<details><summary>Pista 1 — conceptual</summary>

El ref existe y el efecto lo usa. Pero ¿cómo sabe React a qué elemento de la página
apunta ese ref?

</details>

<details><summary>Pista 2 — más concreta</summary>

React solo llena `.current` con un elemento si se lo dices en el JSX, con el atributo
`ref` (Teoría 1). Ahora mismo no está en ningún sitio, así que `.current` se queda en
`null` y el `?.` no hace nada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <button aria-label="Cerrar mapa" type="button">
Received element with focus:
  <body>
```

El efecto corrió, pero `cerrarRef.current` era `null`: no había nada que enfocar.

</details>

<details><summary>Solución</summary>

```tsx
<button ref={cerrarRef} type="button" aria-label="Cerrar mapa">
  ×
</button>
```

Con `ref={cerrarRef}`, React mete el `<button>` en `cerrarRef.current` al pintarlo, y
el efecto, que corre después, ya lo encuentra.

</details>

---

## Drill 2 — `CampoCiudad`

<details><summary>Pista 1 — conceptual</summary>

Dos preguntas, y ya conoces las dos respuestas: ¿en qué momento existe el `<input>` en
la página? ¿Y desde dónde puedes llamar a algo en ese momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto con `[]`, como el del drill 1, que llame a `select()` a través del ref. Y
cuando lo escribas, mira el typecheck: el ref tal como está no sabe qué elemento
guarda (la trampa de la Teoría 1).

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Si escribes el efecto y no tocas el `useRef(null)`, el test pasa, pero:

```
TS2339: Property 'select' does not exist on type 'never'.
```

`useRef(null)` hace una caja de tipo `null`. Quitando el `null` con el `?.`, no queda
nada (`never`), y en "nada" no existe `select`.

</details>

<details><summary>Solución</summary>

```tsx
export function CampoCiudad() {
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    campoRef.current?.select();
  }, []);

  return <input ref={campoRef} aria-label="Ciudad" defaultValue="Santiago" />;
}
```

`<HTMLInputElement>` le dice a TypeScript qué va a haber en la caja: `.current` pasa a
ser `HTMLInputElement | null`, y `select()` existe en un `<input>`.

</details>

---

## Drill 3 — `.current` en el primer render

<details><summary>Pista 1 — conceptual</summary>

Es la pregunta del drill 2 del 01 con otra ropa: ¿qué ha pasado y qué no cuando corre
esa línea?

</details>

<details><summary>Pista 2 — más concreta</summary>

El `console.log` está en el cuerpo del componente, que corre mientras React decide qué
pintar. ¿Cuándo mete React el elemento en `.current`?

</details>

<details><summary>Pista 3 — el dato duro</summary>

React llena `.current` cuando mete el elemento en la página: después del render y
antes de correr los efectos.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta3: Contenido = "null";
```

En el primer render el `<button>` todavía es una descripción en el `return`, no un
elemento de la página. Por eso en tu `MapModal` el `focus()` va dentro del efecto.

</details>

---

## Drill 4 — `PanelEnfocable`

<details><summary>Pista 1 — conceptual</summary>

¿Qué hay en `panelRef.current` cuando el panel no está abierto? El compilador ya lo
sabe, y te lo está diciendo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Comprueba que hay un elemento antes de enfocarlo: con una guardia o con `?.`
(Teoría 2). Con eso desaparecen a la vez el error de tipos y el error al pulsar.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
TS18047: 'panelRef.current' is possibly 'null'.
```

Y el test, que pulsa "Ir al mapa" con el panel cerrado, recibe:

```
TypeError: Cannot read properties of null (reading 'focus')
```

Es la misma advertencia dos veces: TypeScript te la da antes de ejecutar, y el
navegador cuando ya ha pasado.

</details>

<details><summary>Solución</summary>

```tsx
<button type="button" onClick={() => panelRef.current?.focus()}>
  Ir al mapa
</button>
```

Si `.current` es `null`, el `?.` corta ahí y no se llama a nada. Una guardia
(`if (!panelRef.current) return;`) hace lo mismo y es lo que usa tu `MapModal` antes del
focus trap: cuando hay más de una línea detrás, es más fácil de leer.

</details>

---

## Drill 5 — `.current` después de cerrar el panel

<details><summary>Pista 1 — conceptual</summary>

Después de cerrar, ¿sigue el panel en la página?

</details>

<details><summary>Pista 2 — más concreta</summary>

Relee la definición de la Teoría 2: hay tres momentos en los que `.current` es `null`.
¿Cuál es este?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Al quitar un elemento de la página, React vuelve a poner su ref a `null`.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta5: ContenidoPanel = "null";
```

El ref no guarda un recuerdo del panel: apunta a lo que hay ahora. Por eso el starter
del drill 4 fallaba también después de abrir y cerrar, no solo antes de abrir.

</details>

---

## Drill 6 — `cerrarRef.current` justo después de `setAbierto(true)`

<details><summary>Pista 1 — conceptual</summary>

¿Qué hace de verdad `setAbierto(true)`: pinta la ✕ en ese mismo instante, o pide
algo que pasará después?

</details>

<details><summary>Pista 2 — más concreta</summary>

El setter echa una carta al buzón: pide un render nuevo, y React lo hace cuando tu
manejador termina. La ✕ aparece en ese render. ¿Ha llegado ya en la línea siguiente
al setter?

</details>

<details><summary>Pista 3 — el dato duro</summary>

Es la misma respuesta que la del drill 3, por otra razón: allí la ✕ no existía porque
el render aún no había terminado; aquí, porque aún no ha empezado.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta6: ContenidoCerrar = "null";
```

`setAbierto(true)` no pinta: deja apuntado que `abierto` tiene que valer `true` en el
próximo render. Mientras tu manejador sigue corriendo, el mapa no se ha pintado y
`cerrarRef.current` sigue en `null`. Por eso enfocar algo que acaba de aparecer no
puede ir en el manejador que lo hace aparecer.

</details>

---

## Drill 7 — `MapaSoloIda`

<details><summary>Pista 1 — conceptual</summary>

El `focus()` está bien escrito, pero llega antes de tiempo: es tu predicción del 6.
¿Qué parte de React corre cuando la ✕ ya está en la página?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto que vigile `abierto` corre después del render en el que aparece la ✕. Saca
de ahí el `focus()` y quítalo del manejador.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <button
  aria-label="Cerrar mapa"
  type="button"
>
  ×
</button>
Received element with focus:
  <button
  type="button"
>
  Abrir mapa
</button>
```

El `focus()` del manejador no hace nada, porque `cerrarRef.current` es `null`, y el
foco se queda en el botón que pulsaste.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  if (abierto) {
    cerrarRef.current?.focus();
  }
}, [abierto]);

// y el manejador de "Abrir mapa" vuelve a ser solo: onClick={() => setAbierto(true)}
```

El efecto corre después del render en el que `abierto` pasa a `true`, y para entonces
React ya enganchó la ✕ al ref. El `if` no es obligatorio (con el mapa cerrado,
`cerrarRef.current` es `null` y el `?.` no hace nada), pero dice lo que quieres decir.

</details>

---

## Drill 8 — dónde queda el foco si desaparece la ✕

<details><summary>Pista 1 — conceptual</summary>

El foco vive en un elemento. ¿Qué pasa con él cuando ese elemento sale de la página?

</details>

<details><summary>Pista 2 — más concreta</summary>

El navegador no busca por su cuenta un sitio "razonable" para el foco: solo lo mueve
si alguien llama a `focus()`. Y en `MapaSoloIda` nadie lo hace al cerrar.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Si alguien que usa teclado pulsa Tab justo después, empieza desde el principio de la
página.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta8: DondeQueda = "en ninguna parte: vuelve al <body>";
```

Al quitar la ✕, el foco no tiene dónde estar y vuelve al `<body>`. Con el ratón no se
nota; con teclado, el usuario pierde su sitio y tiene que volver a recorrer la página.
Por eso el 13 devuelve el foco a "Abrir mapa".

</details>

---

## Drill 9 — los registros de un efecto que vigila `abierto`

<details><summary>Pista 1 — conceptual</summary>

Hay tres momentos: el montaje, la apertura y el cierre. ¿En cuáles corre el efecto?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un efecto corre al montarse, y después cada vez que cambia algo de su array. Apunta
qué vale `abierto` en cada una de esas veces.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Son 3 registros, y el primero y el último son iguales.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta9: string[] = ["efecto con false", "efecto con true", "efecto con false"];
```

Al montarse, `abierto` es `false`; al abrir, `true`; al cerrar, `false` otra vez. Desde
dentro del efecto, el primero y el último son idénticos: el efecto no sabe si acaba de
montarse o si el usuario cerró. Por eso un `else` dentro del efecto corre también al
montarse, que es lo que le pasaba a tu primer `MapaConRetorno`.

</details>

---

## Drill 10 — la bandera del primer montaje, con StrictMode

<details><summary>Pista 1 — conceptual</summary>

Repasa qué hace `StrictMode` nada más montar (el drill 5 del 02). ¿Cuántas veces
corre este efecto al montarse, y qué vale la bandera en cada una?

</details>

<details><summary>Pista 2 — más concreta</summary>

El ensayo desmonta y vuelve a montar, pero el componente es el mismo, y sus refs
también: la bandera conserva el `false` que le puso la primera vuelta.

</details>

<details><summary>Pista 3 — el dato duro</summary>

En la segunda vuelta del ensayo, la bandera ya no protege nada y `abierto` sigue en
`false`.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta10: Robo = "sí, lo roba";
```

1ª vuelta: la bandera es `true`, la pone en `false` y sale. El ensayo desmonta y
vuelve a montar con los mismos refs. 2ª vuelta: la bandera ya es `false`, `abierto`
también, y enfoca "Abrir mapa". En producción no habría ensayo y no lo robaría: el
fallo solo se ve en `pnpm dev`, que es justo para lo que existe el ensayo. Y es un
parche: le enseña al efecto a ignorar un caso, en vez de llevar el trabajo a donde
toca.

</details>

---

## Drill 11 — manejador o efecto, caso por caso

<details><summary>Pista 1 — conceptual</summary>

Para cada caso, pregúntate quién lo provoca: ¿el clic del usuario, o que algo acabe de
aparecer en pantalla?

</details>

<details><summary>Pista 2 — más concreta</summary>

Y si lo provoca un clic, la segunda pregunta: lo que vas a tocar, ¿existe ya en el
momento del clic? Tu drill 4 y tu drill 2 son un caso de cada.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Dos van en el manejador y dos en un efecto.

</details>

<details><summary>Solución</summary>

```ts
export const respuesta11: Record<"a" | "b" | "c" | "d", Sitio> = {
  a: "efecto",
  b: "manejador",
  c: "efecto",
  d: "manejador",
};
```

La b y la d las provoca un clic y tocan algo que ya está en la página ("Abrir mapa" y
el panel abierto): el manejador basta. La a y la c tocan algo que aparece en ese
render: hasta que no se pinta no hay nada que enfocar o seleccionar, y eso solo lo ve
un efecto.

</details>

---

## Drill 12 — `LimpiarBusqueda`

<details><summary>Pista 1 — conceptual</summary>

¿Quién provoca que el campo se vacíe y se enfoque: que el campo esté vacío, o que el
usuario pulse "Limpiar"? Al montarse también está vacío, y nadie ha pulsado nada.

</details>

<details><summary>Pista 2 — más concreta</summary>

El campo existe siempre, así que no hace falta esperar a ningún render: el manejador
de "Limpiar" puede vaciarlo y enfocarlo él mismo. El efecto sobra entero.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Expected element with focus:
  <input
  aria-label="Campo de fuera"
/>
Received element with focus:
  <input
  aria-label="Ciudad"
  value=""
/>
```

Antes de montar el buscador, el test deja el foco en un campo de fuera. Al montarse,
el texto es `""`, el efecto entra en el `if` y le quita el foco.

</details>

<details><summary>Solución</summary>

```tsx
<button
  type="button"
  onClick={() => {
    setTexto("");
    campoRef.current?.focus();
  }}
>
  Limpiar
</button>
// y el useEffect se borra entero
```

El clic provoca el cambio y el campo ya está en la página: todo cabe en el manejador.
Que el `focus()` vaya después del `setTexto("")` no importa aquí, porque el campo no
desaparece con ese render.

</details>

---

## Drill 13 — `MapaConRetorno`

<details><summary>Pista 1 — conceptual</summary>

Hay dos viajes del foco, y no ocurren en el mismo tipo de momento. Al abrir, la ✕
todavía no existe cuando haces clic. Al cerrar, "Abrir mapa" ya existe y existirá
siempre.

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos refs, uno por botón, enganchados con `ref`. Para la ✕: un efecto que vigile
`abierto` y la enfoque cuando sea `true` (lo del 01). Para "Abrir mapa": el manejador
de la ✕ puede enfocarlo directamente, porque ese botón siempre está pintado.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

Si enfocas la ✕ dentro del `onClick` de "Abrir mapa", justo después del
`setAbierto(true)`:

```
Expected element with focus:
  <button aria-label="Cerrar mapa" type="button">
```

En ese momento la ✕ todavía no se ha pintado: `cerrarRef.current` es `null` (drill 6).

Y si la vuelta a "Abrir mapa" la pones en el efecto, con un `else` o con una bandera:

```
Expected element with focus:
  <input
  aria-label="Campo de fuera"
/>
Received element with focus:
  <button
  type="button"
>
  Abrir mapa
</button>
```

El test monta el mapa con el foco en un campo de fuera, y dentro de `StrictMode`. El
efecto corre al montarse con `abierto` en `false` (drill 9), y la bandera no aguanta
el ensayo (drill 10).

</details>

<details><summary>Solución</summary>

```tsx
export function MapaConRetorno() {
  const [abierto, setAbierto] = useState(false);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (abierto) {
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  function cerrar() {
    setAbierto(false);
    abrirRef.current?.focus();
  }

  // en el JSX: ref={abrirRef} en "Abrir mapa", y ref={cerrarRef} + onClick={cerrar} en la ✕
}
```

El efecto corre con la ✕ ya pintada. Para volver, el manejador basta, porque "Abrir
mapa" no desaparece nunca. Tu `MapModal` hace lo mismo de otra manera: guarda
`document.activeElement` al abrirse y le devuelve el foco en la limpieza. Así no le
hace falta saber qué botón lo abrió.

</details>
