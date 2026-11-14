# Pistas — exercise-05 · el timeout

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 3 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Al 1, al 2, al 4 y al 5, solo el test.

---

## Drill 1 — `pedirConLimite`

<details><summary>Pista 1 — conceptual</summary>

Medir no es cortar. ¿En qué momento mira el reloj el starter: mientras espera a la API, o
cuando la respuesta ya llegó?

</details>

<details><summary>Pista 2 — más concreta</summary>

El límite tiene que viajar con la petición, para que sea fetch quien la corte cuando se acaba
el tiempo. Mira la SINTAXIS de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: medir el tiempo con Date.now() es código válido.

```
AssertionError: expected Error: La API tardó demasiado to have property "name" with value 'TimeoutError'
Expected: "TimeoutError"
Received: "Error"
```

El starter sí falla, pero con un Error suyo y cuando la lista ya llegó, a los 200 ms. El test
esperaba que la petición se cortara a los 50 ms, con el error del reloj.

</details>

<details><summary>Solución</summary>

```ts
const res = await fetch(API_PROJECTS, { signal: AbortSignal.timeout(limiteMs) });
```

Y fuera inicio y el if del Date.now(). El reloj viaja ahora dentro de fetch: cuando se acaba el
tiempo, la petición se corta y rechaza con TimeoutError, sin esperar a la API. Es tu
AbortSignal.timeout(TIMEOUT_MS) de la l.46 de usePortfolioDataWithFallback.js.

</details>

---

## Drill 2 — `pedirConReintento`

<details><summary>Pista 1 — conceptual</summary>

Fíjate en cuándo nace la señal y cuántas veces se usa. Relee la ⚠️ TRAMPA de la Teoría 1.

</details>

<details><summary>Pista 2 — más concreta</summary>

Los dos intentos comparten un solo reloj, que empezó a contar antes del primero. Cada intento
necesita un reloj que nazca cuando él sale.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: la señal es una señal válida, solo que gastada.

```
AssertionError: promise rejected "DOMException{ stack: 'TimeoutError: …' }" instead of resolving
Caused by: TimeoutError: The operation was aborted due to timeout
```

El primer intento recibe el 500 a los 100 ms. El segundo sale con 50 ms de reloj y la lista
tarda 80: se corta por el camino.

</details>

<details><summary>Solución</summary>

```ts
try {
  return await pedirLista(AbortSignal.timeout(limiteMs));
} catch {
  return await pedirLista(AbortSignal.timeout(limiteMs));
}
```

Cada AbortSignal.timeout nace justo cuando sale su intento, con el límite entero. Ninguna
línea estaba mal escrita: la señal estaba en el sitio equivocado.

</details>

---

## Drill 3 — `pedirCancelableConLimite`

<details><summary>Pista 1 — conceptual</summary>

fetch tiene sitio para una sola señal, y tú tienes dos motivos para cortar. ¿Cómo los metes
en una?

</details>

<details><summary>Pista 2 — más concreta</summary>

Hay una función que recibe una lista de señales y devuelve una sola, que se aborta en cuanto
se aborta cualquiera. Está en la Teoría 2, y la lista ya la tienes escrita.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2740: Type 'AbortSignal[]' is missing the following properties from type 'AbortSignal': aborted, onabort, reason, throwIfAborted, and 3 more.
```

Un array de señales no es una señal. Y al ejecutar, la petición ni siquiera sale:

```
TypeError: Failed to execute 'fetch' on 'Window': Failed to read the 'signal' property from 'RequestInit': Failed to convert value to 'AbortSignal'.
```

Es el mismo texto que da Chrome si le pasas a fetch algo que no es un AbortSignal.

</details>

<details><summary>Solución</summary>

```ts
const res = await fetch(API_PROJECTS, {
  signal: AbortSignal.any([signal, AbortSignal.timeout(limiteMs)]),
});
```

AbortSignal.any convierte tu array en una sola señal. Si quien llama cancela, se aborta con
AbortError; si salta el reloj, con TimeoutError. Es tu l.44-47 de
usePortfolioDataWithFallback.js.

</details>

---

## Drill 4 — `ListaConLimite`

<details><summary>Pista 1 — conceptual</summary>

La primera línea del catch decide si callarse. ¿A qué señal le pregunta?

</details>

<details><summary>Pista 2 — más concreta</summary>

La señal combinada se aborta por los dos motivos. La única que se aborta solo cuando el
componente se desmonta es la del controller. Relee la ⚠️ TRAMPA de la Teoría 2.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: preguntar a una señal o a otra es igual de válido.

```
TestingLibraryElementError: Unable to find role="alert"
```

Con el límite vencido, el catch se calla como si el usuario se hubiera ido, y la lista se queda
en «Cargando…».

</details>

<details><summary>Solución</summary>

```ts
if (controller.signal.aborted) return;
```

controller.signal solo se aborta en la limpieza, así que solo calla al desmontar. Si cortó el
reloj, la guardia deja pasar, y el name del error elige el aviso «La API tardó demasiado».

</details>

---

## Drill 5 — `usePortfolioConLimite`

<details><summary>Pista 1 — conceptual</summary>

Tu hook del 04 ya cancela al desmontar. Le falta el segundo motivo para cortar, y avisar
cuando sea ese el que cortó.

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo del 4, con dos peticiones: una señal combinada que viaje en las dos, la guardia
preguntándole al controller, y en el catch, el name del error para elegir el aviso «La API
tardó demasiado».

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: limiteMs se usa en las dependencias del efecto, así que no sobra.

```
TestingLibraryElementError: Unable to find role="alert"
```

Con la API lenta, el starter espera los 200 ms que tarda la lista y pinta la portada: no hay
aviso.

</details>

<details><summary>Solución</summary>

```ts
const controller = new AbortController();
const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

async function load() {
  try {
    const [lista, perfil] = await Promise.all([pedirJson(API_PROJECTS, signal), pedirJson(API_PROFILE, signal)]);
    const projectsOk = ProjectsSchema.parse(lista);
    const profileOk = ProfileSchema.parse(perfil);
    setProjects(projectsOk);
    setProfile(profileOk);
  } catch (err) {
    if (controller.signal.aborted) return;
    if (err instanceof Error && err.name === "TimeoutError") {
      setError("La API tardó demasiado");
      return;
    }
    setError(err instanceof Error ? err.message : "Error desconocido");
  }
}
```

Un reloj para toda la carga: las dos peticiones viajan con la misma señal, y cuando salta,
corta las dos. Es tu fetchLive (l.44-52) sin el snapshot: allí, en vez del aviso, el catch
intenta leer el snapshot. Eso queda para cuando toque el snapshot.

</details>
