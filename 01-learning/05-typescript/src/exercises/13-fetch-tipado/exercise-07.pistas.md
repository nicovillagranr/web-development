# Pistas — exercise-07 · la ciudad vieja

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos solo en el test: el compilador y el lint no ven nada en ningún starter.

En todos los tests pasa lo mismo: la tarjeta se monta en Santiago, que tarda 0,2 s, y pasa a
Valparaíso, que tarda 0,03 s, antes de que llegue Santiago. Santiago hace dos peticiones, no
una: la del ensayo de StrictMode y la de verdad. Por eso los mensajes hablan de
`[ false, false ]`.

---

## Drill 1 — `useTemperaturaConBandera`

<details><summary>Pista 1 — conceptual</summary>

La bandera está bien hecha: nace dentro del efecto y la limpieza la pone en true. El
problema es **cuándo** se mira. ¿Qué ha pasado ya, y qué no, en ese momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cuando cargar mira la bandera, la petición ni siquiera ha salido, y la limpieza todavía no
ha corrido: la bandera vale false siempre. Tiene que mirarse cuando ya llegó la respuesta,
justo antes de guardarla.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Santiago llegó tarde y pisó a Valparaíso: expect(element).not.toBeInTheDocument()

expected document not to contain element, found <p>
  24
```

A los 0,03 s se ve «17 °C», de Valparaíso, pero a los 0,2 s llega Santiago y lo cambia
por «24 °C».

</details>

<details><summary>Solución</summary>

```ts
async function cargar() {
  const temperatura = await pedirTemperatura(lat, lon);
  if (ignorar) return;
  setGrados(temperatura);
}
```

El await es la espera. Antes de él, nadie ha podido cambiar la ciudad; después, sí. Cuando
pasas a Valparaíso, la limpieza de Santiago pone su ignorar en true, y cuando llega su
respuesta, el if la tira.

</details>

---

## Drill 2 — `useTemperaturaConRef`

<details><summary>Pista 1 — conceptual</summary>

Un ref es una sola caja para toda la vida del componente. ¿Cuántas banderas hay en el
starter, y cuántas ejecuciones del efecto la comparten?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cuando pasas a Valparaíso, la limpieza de Santiago pone la caja en true, pero el efecto
nuevo empieza con `ignorarRef.current = false`: la misma caja, otra vez en false. Cada
ejecución necesita su propia bandera, como en la SINTAXIS de la Teoría 1: un let dentro del
efecto.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
Error: Santiago llegó tarde y pisó a Valparaíso: expect(element).not.toBeInTheDocument()

expected document not to contain element, found <p>
  24
```

Si quitas el ref, el compilador te avisa de que useRef ya no se usa: quítalo también del
import de arriba.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  let ignorar = false;

  async function cargar() {
    const temperatura = await pedirTemperatura(lat, lon);
    if (ignorar) return;
    setGrados(temperatura);
  }

  cargar();
  return () => {
    ignorar = true;
  };
}, [lat, lon]);
```

Cada vez que el efecto corre, nace un ignorar nuevo, y su cargar y su limpieza ven ese y no
otro. La limpieza de Santiago marca el de Santiago; el efecto de Valparaíso estrena el suyo.

</details>

---

## Drill 3 — `useTemperaturaCancelable`

<details><summary>Pista 1 — conceptual</summary>

Para cancelar una petición hay que llamar a abort() **mientras viaja**. ¿Quién llama a
abort() en el starter, y en qué momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

El controller nace dentro de cargar, y solo el finally lo aborta, cuando la petición ya
terminó. Además, el efecto no tiene limpieza. Créalo en el cuerpo del efecto, para que la
limpieza lo vea, y que la limpieza lo aborte. El finally sobra.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada (signal.aborted en true): expected [ false, false ] to not include false
```

Las dos peticiones de Santiago siguen vivas cuando ya se ve Valparaíso.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  const controller = new AbortController();

  async function cargar() {
    try {
      setGrados(await pedirTemperatura(lat, lon, controller.signal));
    } catch {
      if (controller.signal.aborted) return;
      setGrados(null);
    }
  }

  cargar();
  return () => controller.abort();
}, [lat, lon]);
```

Cuando pasas a Valparaíso, la limpieza de Santiago aprieta su controller: la petición se
corta en ese momento, el fetch rechaza y el catch se calla porque signal.aborted ya vale
true. No hace falta bandera: esa es la bandera.

</details>

---

## Drill 4 — `useTemperaturaConLasDos`

<details><summary>Pista 1 — conceptual</summary>

La tarjeta se ve bien, y aun así el test falla. Lo que se ve lo arregla la bandera; lo que
el test mira es la red. ¿Quién cancela la petición de Santiago?

</details>

<details><summary>Pista 2 — más concreta</summary>

Es el mismo fallo del 3, tapado por la bandera: el controller vive dentro de cargar y la
limpieza solo toca ignorar. Sube el controller al efecto y que la limpieza haga las dos
cosas.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: Cuando llega Valparaíso, cada petición de Santiago tiene que estar cancelada (signal.aborted en true): expected [ false, false ] to not include false
```

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  let ignorar = false;
  const controller = new AbortController();

  async function cargar() {
    try {
      const temperatura = await pedirTemperatura(lat, lon, controller.signal);
      if (ignorar) return;
      setGrados(temperatura);
    } catch {
      if (ignorar || controller.signal.aborted) return;
      setGrados(null);
    }
  }

  cargar();
  return () => {
    ignorar = true;
    controller.abort();
  };
}, [lat, lon]);
```

Ahora la limpieza para la petición, y la bandera queda de sobra: si quieres, quítala y deja
solo signal.aborted, como en el 3. Las dos versiones pasan el test.

</details>

---

## Drill 5 — `useClima`

<details><summary>Pista 1 — conceptual</summary>

Es el 3 con un estado más: el error. ¿Qué tiene que pasar en cada uno de los tres caminos?
Llegó la temperatura, falló Open-Meteo, o se canceló porque cambiaste de ciudad.

</details>

<details><summary>Pista 2 — más concreta</summary>

Dos useState, grados y error. En el efecto, el controller y cargar, con un try que guarda
la temperatura y un catch que, si no fue una cancelación, guarda el texto del aviso. La
limpieza aborta el controller. Al final, devuelve los dos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: 17 °C.
```

Con el starter, grados es siempre null y la tarjeta se queda en «Cargando…». Si el aviso
sale al cambiar de ciudad, el test se queja en el último expect: falta la guardia del catch.

</details>

<details><summary>Solución</summary>

```ts
export function useClima(lat: number, lon: number): { grados: number | null; error: string | null } {
  const [grados, setGrados] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      try {
        setGrados(await pedirTemperatura(lat, lon, controller.signal));
      } catch {
        if (controller.signal.aborted) return;
        setError("No fue posible obtener el clima");
      }
    }

    cargar();
    return () => controller.abort();
  }, [lat, lon]);

  return { grados, error };
}
```

Tu useWeather usa dos piezas, isCancelled y un controller. Aquí basta una: el controller
en el efecto corta la petición, y su signal.aborted le dice al catch que no fue un error.

</details>
