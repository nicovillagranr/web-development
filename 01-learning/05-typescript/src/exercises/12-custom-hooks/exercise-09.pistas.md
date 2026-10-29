# Pistas — exercise-09 · el tema de tu portfolio

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los seis compilan, así que su Pista 3 trae el dato duro del test. El 1 y el 4 además los
marca `pnpm lint`, y su Pista 3 lo cita.

---

## Drill 1 — `useTemaGuardado`

<details><summary>Pista 1 — conceptual</summary>

El tema guardado se lee bien, pero tarde: el primer render ya salió con `"dark"`. ¿Qué
parte del componente corre antes de que el navegador pinte?

</details>

<details><summary>Pista 2 — más concreta</summary>

Mueve la lectura del `localStorage` al inicializador del `useState`, una función que
devuelve el tema. Con eso, el efecto sobra entero, y también el `setTema`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`pnpm lint` lo avisa antes que el test:

```
Error: Calling setState synchronously within an effect can trigger cascading renders
```

Y el test, con `"light"` guardado, en el primer render:

```
AssertionError: expected 'dark' to be 'light'
```

</details>

<details><summary>Solución</summary>

```tsx
export function useTemaGuardado(): Tema {
  const [tema] = useState<Tema>(() => {
    const guardado = localStorage.getItem(CLAVE_TEMA);
    return guardado === "light" ? "light" : "dark";
  });

  return tema;
}
```

El inicializador corre en el primer render, antes de pintar. El efecto corría después de
pintar: quien guardó el claro veía el oscuro un instante, y luego un segundo render lo
corregía. Es el mismo fallo del vídeo del 4 del 07.

</details>

---

## Drill 2 — `BotonDeTema`

<details><summary>Pista 1 — conceptual</summary>

Con cada clic, la función del componente corre entera, de arriba abajo. ¿Qué pasa en esa
línea del `useState` cada vez que corre?

</details>

<details><summary>Pista 2 — más concreta</summary>

Con paréntesis, `leerTema` se llama ahí mismo, en cada render, y `useState` recibe el
resultado. Pásale la función sin llamarla, para que sea React quien la llame, y solo al
nacer.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de tres clics:

```
AssertionError: expected "vi.fn()" to be called 1 times, but got 4 times
```

Una vez al nacer, y una por cada clic.

</details>

<details><summary>Solución</summary>

```tsx
const [tema, setTema] = useState<Tema>(leerTema);
```

`useState(leerTema)` le da a React la función; React la llama al nacer y la ignora en los
demás renders. `useState(() => leerTema())` hace lo mismo. Con `useState(leerTema())`, el
valor del segundo render en adelante se tira, pero la lectura ya se hizo.

</details>

---

## Drill 3 — `TemaDelSistema`

<details><summary>Pista 1 — conceptual</summary>

El tema se lee bien y se escucha bien. Lo que falta pasa al final: cuando el componente
se va, alguien se queda escuchando.

</details>

<details><summary>Pista 2 — más concreta</summary>

Para dar de baja una escucha, `removeEventListener` necesita la **misma** función que se
registró. Dale un nombre a la flecha y devuelve una limpieza que la quite.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después de desmontar:

```
AssertionError: expected 2 to be +0
```

Dos, no uno: StrictMode monta, desmonta y vuelve a montar, y cada montaje deja su oyente.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const consulta = window.matchMedia("(prefers-color-scheme: light)");
  const actualizar = () => setTema(consulta.matches ? "light" : "dark");
  consulta.addEventListener("change", actualizar);
  return () => consulta.removeEventListener("change", actualizar);
}, []);
```

Sin limpieza, cada vez que el componente nace suma un oyente que nunca se va. Si el
sistema cambia, todos intentan actualizar un tema que ya no se ve.

</details>

---

## Drill 4 — `TemaDelPortfolio`

<details><summary>Pista 1 — conceptual</summary>

El efecto sabe poner y quitar la clase. El problema es cuándo corre: ¿cuántas veces corre
con ese array?

</details>

<details><summary>Pista 2 — más concreta</summary>

El efecto usa `tema`, así que tiene que volver a correr cada vez que `tema` cambia. Eso se
le dice a React en el array.

</details>

<details><summary>Pista 3 — el dato duro</summary>

`pnpm lint` ya lo ve:

```
React Hook useEffect has a missing dependency: 'tema'. Either include it or remove the dependency array.
```

Y el test, después del primer clic:

```
expect(element).toHaveClass("light")
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const raiz = document.documentElement;
  if (tema === "light") {
    raiz.classList.add("light");
  } else {
    raiz.classList.remove("light");
  }
}, [tema]);
```

Con `[]`, el efecto corre al nacer y nunca más: el `<html>` se queda con el tema del
primer render. Con `[tema]`, corre al nacer y cada vez que `tema` cambia.

</details>

---

## Drill 5 — `TemaQueNoVuelve`

<details><summary>Pista 1 — conceptual</summary>

El efecto corre en cada cambio, como debe. Pero solo sabe hacer algo con uno de los dos
temas. ¿Qué hace cuando el tema es `"dark"`?

</details>

<details><summary>Pista 2 — más concreta</summary>

Falta la otra mitad: quitar la clase cuando el tema es oscuro. Puedes añadir el `else`, o
usar la pieza de la teoría que pone o quita según una condición.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Después del segundo clic, de vuelta al oscuro:

```
expect(element).not.toHaveClass("light")
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  document.documentElement.classList.toggle("light", tema === "light");
}, [tema]);
```

`toggle` con dos argumentos pone la clase si la condición es `true` y la quita si es
`false`: el `<html>` queda siempre como dice el tema. Con el `if` y el `else` de tu
`App.jsx` también vale.

</details>

---

## Drill 6 — `useTema`

<details><summary>Pista 1 — conceptual</summary>

Es tu `App.jsx` entero, metido en un hook. Lee el tema una vez, escribe cada cambio fuera
y devuelve las dos cosas que necesita quien lo usa.

</details>

<details><summary>Pista 2 — más concreta</summary>

Tres piezas:
- un inicializador para el `useState`, que devuelve lo guardado si es `"light"` o
  `"dark"`, y si no, lo que diga `matchMedia("(prefers-color-scheme: light)")`;
- un efecto con `[tema]` que pone o quita la clase y guarda en el `localStorage`;
- un `alternarTema` que cambia de `"dark"` a `"light"` y al revés.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el sistema en claro y nada guardado, en el primer render:

```
AssertionError: expected 'dark' to be 'light'
```

Y con `"azul"` guardado, el efecto tiene que sobrescribirlo:

```
AssertionError: expected 'azul' to be 'dark'
```

</details>

<details><summary>Solución</summary>

```tsx
function leerTemaInicial(): Tema {
  const guardado = localStorage.getItem(CLAVE_TEMA);
  if (guardado === "light" || guardado === "dark") {
    return guardado;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTema(): { tema: Tema; alternarTema: () => void } {
  const [tema, setTema] = useState<Tema>(leerTemaInicial);

  useEffect(() => {
    document.documentElement.classList.toggle("light", tema === "light");
    localStorage.setItem(CLAVE_TEMA, tema);
  }, [tema]);

  const alternarTema = () => setTema(tema === "dark" ? "light" : "dark");

  return { tema, alternarTema };
}
```

`leerTemaInicial` corre una vez, al nacer. El efecto corre al nacer y después de cada
cambio. El `if` que compara con `"light"` y `"dark"` estrecha el `string | null` del
`localStorage` a `Tema` sin `as`.

En tu portfolio, el `App.jsx` quedaría con una línea:
`const { tema, alternarTema } = useTema();`.

</details>
