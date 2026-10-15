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

## Drill 6 — `MapaConRetorno`

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

En ese momento la ✕ todavía no se ha pintado: `cerrarRef.current` es `null` (drill 3).

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
