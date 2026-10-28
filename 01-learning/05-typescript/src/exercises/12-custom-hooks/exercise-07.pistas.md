# Pistas — exercise-07 · tu custom hook: `useMediaPreferences`

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

El 1 solo lo marca el lint: su Pista 3 cita a `pnpm lint`. El 3 y el 4 no compilan: su
Pista 3 cita al compilador. El 2 compila, y su Pista 3 trae el dato duro del test.

---

## Drill 1 — `prefiereMenosMovimiento`

<details><summary>Pista 1 — conceptual</summary>

Relee las piezas de la Teoría 1. ¿Cómo sabe el lint que una función es un hook?

</details>

<details><summary>Pista 2 — más concreta</summary>

El cuerpo está bien. Lo que el lint mira es el nombre: para él, una función que no empieza
por `use` no es un hook, y dentro de una función cualquiera no se puede llamar a `useState`.
Cambia el nombre, y también donde la llama `HeroDeProjex`.

</details>

<details><summary>Pista 3 — lo que dice el lint</summary>

```
React Hook "useState" is called in function "prefiereMenosMovimiento" that is neither a React
function component nor a custom React Hook function. React component names must start with an
uppercase letter. React Hook names must start with the word "use"   react-hooks/rules-of-hooks
```

Y lo mismo con `useEffect`. El test pasa: en el navegador, el nombre no cambia nada.

</details>

<details><summary>Solución</summary>

```tsx
export function usePrefiereMenosMovimiento() {
  // … el mismo cuerpo …
}

export function HeroDeProjex() {
  const estatico = usePrefiereMenosMovimiento();
  // …
}
```

Con `use` delante, el lint sabe que es un hook y comprueba sus reglas: que se llame arriba del
todo, nunca dentro de un `if` o de un bucle. Sin `use`, no sabría a quién aplicárselas.

</details>

---

## Drill 2 — `FondoDelContacto`

<details><summary>Pista 1 — conceptual</summary>

El drill 1 ya tiene esta lógica, y bien hecha: con su limpieza. ¿Para qué copiarla?

</details>

<details><summary>Pista 2 — más concreta</summary>

Borra el `useState` y el `useEffect` del fondo. En su lugar, una sola línea que llame al hook
del drill 1 y guarde lo que devuelve con el nombre que ya usa el `return`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El typecheck calla. El test, después de desmontar el fondo:

```
AssertionError: expected 2 to be +0
```

Son los listeners que siguen colgados de la consulta. Son 2 y no 1 porque el test va en
`StrictMode`: el ensayo registra uno, y sin limpieza nadie lo quita.

</details>

<details><summary>Solución</summary>

```tsx
export function FondoDelContacto() {
  const prefiere = usePrefiereMenosMovimiento();

  return <p>{prefiere ? "Fondo: quieto" : "Fondo: animado"}</p>;
}
```

La copia tenía el fallo; el hook, no. Usando el hook, el fondo se lleva la limpieza gratis, y
si algún día el hook cambia, cambia en los dos sitios a la vez.

</details>

---

## Drill 3 — `ahorraDatos`

<details><summary>Pista 1 — conceptual</summary>

Relee la Teoría 2. TypeScript no conoce `navigator.connection`. ¿Quién se lo tiene que contar,
y dónde?

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos `interface` dentro de un `declare global`, encima del drill: `Navigator` con un campo
`connection` opcional, y la forma de ese campo con otra `interface`, `NetworkInformation`, que
tenga `saveData` opcional y pueda escuchar eventos (`extends`, como en el 01 de tipos básicos).
Después, TypeScript te dirá qué falta en `ahorraDatos`.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2339: Property 'connection' does not exist on type 'Navigator'.
```

Y el test, en el caso sin `connection` (Safari, Firefox):

```
TypeError: Cannot read properties of undefined (reading 'saveData')
```

Si declaras `connection` sin `?`, el primero se va y el segundo se queda.

</details>

<details><summary>Solución</summary>

```tsx
declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }

  interface NetworkInformation extends EventTarget {
    saveData?: boolean;
  }
}

export function ahorraDatos(): boolean {
  return Boolean(navigator.connection?.saveData);
}
```

El `?` de la declaración hace que TypeScript te pida el `?.` al leer: donde no hay
`connection`, se corta ahí y `Boolean(undefined)` da `false`. `extends EventTarget` le da a
`connection` el `addEventListener` que usa el drill 4.

En Projex, este bloque puede ir arriba del todo en `useMediaPreferences.ts`. Ese archivo tiene
`import`, así que necesita el `declare global`.

</details>

---

## Drill 4 — `useMediaPreferences`

<details><summary>Pista 1 — conceptual</summary>

Son dos arreglos separados. Los tipos: con el drill 3 hecho, ¿qué le queda por conocer a
TypeScript? El primer render: ¿qué valor tiene `usarHeroEstatico` antes de que corra el efecto?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tipos: los prefijos `moz` y `webkit`, o los declaras igual que `connection` o los borras. Lo
simple es borrarlos. Primer render: el valor tiene que salir del `useState`, con un
inicializador (la flecha de tu drill 11 del 02) que haga la misma cuenta que
`updatePreferences`. Si la cuenta va en una función aparte, la usan los dos.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

Sin el drill 3, los tres de tu Projex:

```
error TS2339: Property 'connection' does not exist on type 'Navigator'.
error TS2339: Property 'mozConnection' does not exist on type 'Navigator'.
error TS2339: Property 'webkitConnection' does not exist on type 'Navigator'.
```

Con el drill 3 hecho, solo quedan los prefijos (el de `moz` cambia a `TS2551 … Did you mean
'connection'?`). Y el test, con menos movimiento pedido, ve «vídeo» en el primer render.

</details>

<details><summary>Solución</summary>

```tsx
interface Preferencias {
  prefiereReducirMovimiento: boolean;
  prefiereAhorrarDatos: boolean;
}

function leerPreferencias(): Preferencias {
  return {
    prefiereReducirMovimiento: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    prefiereAhorrarDatos: Boolean(navigator.connection?.saveData),
  };
}

export function useMediaPreferences(): Preferencias {
  const [preferencias, setPreferencias] = useState(leerPreferencias);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;

    const updatePreferences = () => {
      setPreferencias(leerPreferencias());
    };

    mediaQuery.addEventListener("change", updatePreferences);
    connection?.addEventListener("change", updatePreferences);

    return () => {
      mediaQuery.removeEventListener("change", updatePreferences);
      connection?.removeEventListener("change", updatePreferences);
    };
  }, []);

  return preferencias;
}
```

`useState(leerPreferencias)` le pasa la función sin llamarla: es lo mismo que
`useState(() => leerPreferencias())`, y React solo la llama al nacer. Con eso, el primer
render ya sale bien, y la llamada a `updatePreferences()` al empezar el efecto sobra.

El hook devuelve las dos preferencias por separado y el Hero decide:
`prefiereReducirMovimiento || prefiereAhorrarDatos`. Al llevarlo a Projex, tu `Hero.tsx` usa
`!shouldUseStaticHero`: hay que juntar las dos ahí, porque un objeto siempre cuenta como
verdadero y el vídeo no saldría nunca.

Los `if (mediaQuery.addEventListener)` con `addListener` eran para Safari 13 y anteriores. Hoy
no hacen falta: para TypeScript, `addEventListener` existe siempre.

</details>
