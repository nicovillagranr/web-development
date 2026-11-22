# Pistas — exercise-08 · «Reintentar»

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos solo en el test: el compilador y el lint no ven nada en ningún starter.

Los drills 1 y 2 no piden nada a la red: su efecto solo apunta «pide», y el test mira cuántas
veces lo apuntó. En los drills 3–5, Open-Meteo falla la primera vez (en el 5, también la
segunda) y luego contesta bien. La petición del ensayo de StrictMode se cancela y no cuenta
como fallo.

---

## Drill 1 — `useRastroDeIntentos`

<details><summary>Pista 1 — conceptual</summary>

intento ya está en las deps. Entonces el efecto tiene que correr si intento cambia. ¿Cambia
de verdad cuando pulsas?

</details>

<details><summary>Pista 2 — más concreta</summary>

reintentar le da a setIntento el valor que intento ya tiene. React compara, ve que es el
mismo, y ni vuelve a pintar ni corre el efecto. Tiene que recibir uno distinto: el
siguiente.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Al pulsar «Reintentar», el efecto tiene que volver a apuntar «pide»: expected [ 'pide' ] to deeply equal [ 'pide', 'pide' ]
```

</details>

<details><summary>Solución</summary>

```ts
return () => setIntento(intento + 1);
```

O con la forma de función, como en la SINTAXIS: `setIntento((anterior) => anterior + 1)`.
Las dos pasan el test. Cada clic deja en intento un número que no había, React vuelve a
pintar, ve que una dep cambió y corre el efecto.

</details>

---

## Drill 2 — `useRastroQueNoEscucha`

<details><summary>Pista 1 — conceptual</summary>

El contador sube bien: el problema no está en reintentar. ¿Qué mira React para decidir si
el efecto vuelve a correr?

</details>

<details><summary>Pista 2 — más concreta</summary>

React solo compara lo que hay en las deps, y en las del starter no está intento. El linter
no lo pide porque el efecto no lo usa dentro (la ⚠️ TRAMPA de la Teoría 1): lo tienes que
poner tú.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Al pulsar «Reintentar», el efecto tiene que volver a apuntar «pide»: expected [ 'pide' ] to deeply equal [ 'pide', 'pide' ]
```

El mismo mensaje del 1, por otro motivo: allí intento no cambiaba; aquí cambia, pero nadie
lo mira.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  apuntar("pide");
}, [apuntar, intento]);
```

Es el refreshTick de tu useWeather (l.258): está en las deps aunque dentro no se use, solo
para que cambiarlo repita el efecto.

</details>

---

## Drill 3 — `useClimaConAvisoPegado`

<details><summary>Pista 1 — conceptual</summary>

El reintento sale bien y la temperatura llega: está guardada. ¿Por qué no se ve? Mira qué
pregunta primero TarjetaReintentable.

</details>

<details><summary>Pista 2 — más concreta</summary>

error se quedó con el aviso del primer intento, y nadie lo borra. La tarjeta pregunta por
error antes que por grados, así que el aviso tapa la temperatura. El camino que acaba bien
tiene que dejar error en null.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: El reintento salió bien: el aviso tiene que irse: expect(element).not.toBeInTheDocument()

expected document not to contain element, found <p
  role="alert"
>
  No fue posible obtener el clima
```

</details>

<details><summary>Solución</summary>

```ts
try {
  setGrados(await pedirTemperatura(lat, lon, controller.signal));
  setError(null);
} catch {
```

Cada camino deja el estado como se tiene que pintar, como en el 06: el que acaba bien
guarda la temperatura y borra el aviso que pudiera quedar del intento anterior. También
pasa el test si borras el aviso en reintentar, al pulsar.

</details>

---

## Drill 4 — `useClimaSinEspera`

<details><summary>Pista 1 — conceptual</summary>

cargando empieza en true y el primer intento lo pone en false. ¿Quién lo vuelve a poner en
true cuando pulsas «Reintentar»?

</details>

<details><summary>Pista 2 — más concreta</summary>

Nadie. Ese cambio es por el clic, así que va en el manejador del clic, reintentar, como en la
SINTAXIS de la Teoría 2. En el cuerpo del efecto, el lint de React lo marca.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Justo después de pulsar «Reintentar», el aviso deja paso a «Cargando…»: expect(element).not.toBeInTheDocument()

expected document not to contain element, found <p
  role="alert"
>
  No fue posible obtener el clima
```

Si lo pones en el cuerpo del efecto, el lint dice:

```
error  Error: Calling setState synchronously within an effect can trigger cascading renders
```

</details>

<details><summary>Solución</summary>

```ts
function reintentar() {
  setCargando(true);
  setIntento((anterior) => anterior + 1);
}
```

Los dos set van en el mismo clic, y React los pinta juntos: «Cargando…» sale ya, y el
efecto corre con el intento nuevo. Tu useWeather lo pone dentro de fetchWeather, antes del
primer await (l.198): también pasa el test y el lint, pero se pinta una vez el aviso
antes de «Cargando…».

</details>

---

## Drill 5 — `useClimaConReintento`

<details><summary>Pista 1 — conceptual</summary>

Es tu 5 del 07 con las piezas de los drills 1–4: un contador en las deps, una función que lo
sube y el estado de cada intento. ¿Qué cuatro useState necesitas?

</details>

<details><summary>Pista 2 — más concreta</summary>

grados, cargando (empieza en true), error e intento. El efecto, como el del 4 ya arreglado:
controller, cargar con su try/catch y su guardia, y la limpieza que aborta, con lat, lon e
intento en las deps. Y reintentar, como en la solución del 4.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: 17 °C.
```

Con el starter, cargando es siempre true. Si falta intento en las deps, tras pulsar
«Reintentar» se queda en «Cargando…» para siempre. Si falta la guardia del catch, la
cancelación del ensayo de StrictMode ya pinta el aviso antes de que Open-Meteo conteste, y
el test se queda esperando la temperatura.

</details>

<details><summary>Solución</summary>

```ts
export function useClimaConReintento(lat: number, lon: number): ClimaReintentable {
  const [grados, setGrados] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
        setError(null);
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
      setCargando(false);
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon, intento]);

  function reintentar() {
    setCargando(true);
    setIntento((anterior) => anterior + 1);
  }

  return { grados, cargando, error, reintentar };
}
```

Si cambias de ciudad, cambian lat y lon: React limpia el efecto anterior, y su controller
corta la petición, sea la primera o la de un reintento.

</details>
