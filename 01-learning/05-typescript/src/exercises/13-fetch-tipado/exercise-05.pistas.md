# Pistas — exercise-05 · el timeout

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 3 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Al 1, al 2, al 4 y al 5, solo el test.

La escalera (1a–1d) va entre el 1 y el 2, como en el archivo. Los cuatro peldaños salen rojos
en el test, y el compilador no marca ninguno.

La escalera del 5 (5a–5g) va al final, debajo del 5, como en el archivo. Los siete peldaños
salen rojos en el test, y el compilador no marca ninguno. El 5e, el 5f y el 5g usan tu avisoDe
del 5d: si el 5d no está, fallan los tres.

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

## Peldaño 1a — `cuantoTarda`

<details><summary>Pista 1 — conceptual</summary>

Para medir cuánto duró algo, el segundo vistazo al reloj tiene que ser cuando ese algo ya
terminó. ¿En qué línea termina la petición?

</details>

<details><summary>Pista 2 — más concreta</summary>

La petición termina en el await: lo que va debajo corre cuando la respuesta ya llegó. fin
tiene que tomarse ahí, no antes.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: restar dos Date.now() es código válido.

```
AssertionError: expected 0 to be greater than or equal to 150
```

La API tardó 200 ms, pero inicio y fin se toman uno detrás del otro, antes de esperar: entre
los dos no pasa nada.

</details>

<details><summary>Solución</summary>

```ts
const inicio = Date.now();
await fetch(API_PROJECTS);
const fin = Date.now();
return fin - inicio;
```

fin corre cuando la respuesta ya llegó, así que mide la espera entera. Es lo que hace el if de
tu drill 1: mide bien, pero mide cuando la espera ya pasó entera.

</details>

---

## Peldaño 1b — `pedirYAnular`

<details><summary>Pista 1 — conceptual</summary>

Anular sirve mientras se espera. Cuando corre la línea del abort(), ¿qué queda por cortar?

</details>

<details><summary>Pista 2 — más concreta</summary>

abort() tiene que correr antes de que la función se quede parada en el await. Mira la
SINTAXIS de la Teoría 1 del exercise-02: ahí la petición sale sin await, y el abort() va
justo debajo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: llamar a abort() tarde es código válido.

```
AssertionError: promise resolved "200" instead of rejecting
```

La lista llegó entera, con su 200, y el abort() corrió después, sobre una petición que ya
había terminado.

</details>

<details><summary>Solución</summary>

```ts
const controller = new AbortController();
const peticion = fetch(API_PROJECTS, { signal: controller.signal });
controller.abort();
const res = await peticion;
return res.status;
```

fetch sale sin await, así que la función sigue de largo y llega al abort() con la petición en
vuelo. El await de debajo recibe el rechazo: AbortError. También vale llamar a abort() antes
del fetch: la petición nace anulada y ni siquiera sale.

</details>

---

## Peldaño 1c — `pedirConAlarma`

<details><summary>Pista 1 — conceptual</summary>

El mando está creado y su signal viaja a fetch. Falta quien lo apriete. En el starter, ¿quién
llama a abort()?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un setTimeout que llame a controller.abort() a los limiteMs, programado antes del await:
mientras la función espera, la alarma sigue corriendo. El if del Date.now() ya no decide nada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: un controller que nadie aprieta es código válido.

```
AssertionError: expected Error: La API tardó demasiado to have property "name" with value 'AbortError'
```

Es el mismo mensaje que tu drill 1, con otro name: el starter espera los 200 ms enteros y
falla después, con el Error del if.

</details>

<details><summary>Solución</summary>

```ts
const controller = new AbortController();
setTimeout(() => controller.abort(), limiteMs);
const res = await fetch(API_PROJECTS, { signal: controller.signal });
return ProjectsSchema.parse(await res.json());
```

Con la API lenta, la alarma salta a los limiteMs y aprieta el botón: fetch rechaza en ese
momento con AbortError, sin esperar a la lista. Fuera inicio y el if: cuando la lista no llega
a tiempo, la función ya falló antes de llegar a él. En código real, si la lista llega a
tiempo, la alarma se apagaría con clearTimeout; aquí no hace falta, porque abortar una
petición ya terminada no hace nada, y en el 1d la alarma desaparece.

</details>

---

## Peldaño 1d — `pedirConReloj`

<details><summary>Pista 1 — conceptual</summary>

El corte ya llega a tiempo. Lo que falla es quién firma el error. Relee qué dice el name en la
Teoría 1.

</details>

<details><summary>Pista 2 — más concreta</summary>

Cambia el mando y la alarma por una señal que traiga su propio reloj. Mira la SINTAXIS de la
Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el starter corta bien, solo que a mano.

```
AssertionError: expected DOMException{ stack: 'AbortError: Th…' } to have property "name" with value 'TimeoutError'
```

Corta a los 50 ms, pero el error dice AbortError: para fetch, alguien llamó a abort(). No
sabe que ese alguien era un setTimeout.

</details>

<details><summary>Solución</summary>

```ts
const res = await fetch(API_PROJECTS, { signal: AbortSignal.timeout(limiteMs) });
return ProjectsSchema.parse(await res.json());
```

AbortSignal.timeout(limiteMs) es el controller y el setTimeout del 1c en una sola pieza, y
cuando corta, el error dice que fue el reloj: TimeoutError. Fuera el controller: si se queda
sin usar, el lint y el compilador lo marcan. Con esto vuelve al 1: es esta línea, con el
res.ok de su starter.

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

---

## Peldaño 5a — `PerfilAlMontar`

<details><summary>Pista 1 — conceptual</summary>

El cuerpo del efecto se lee de arriba abajo, como cualquier función. ¿Qué línea corre justo
antes de load()?

</details>

<details><summary>Pista 2 — más concreta</summary>

Un return termina la función en ese punto: lo de debajo no corre. load() tiene que ir antes que
el return de la limpieza. Mira la SINTAXIS del bloque A.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: código debajo de un return es válido, aunque tu editor lo pinte en gris.

```
TestingLibraryElementError: Unable to find an element with the text: Nicolás · Frontend Developer.
```

load está definida, pero nadie la llama: no sale ninguna petición y se queda en «Cargando…».

</details>

<details><summary>Solución</summary>

```ts
load();
return () => controller.abort();
```

Primero sale la petición, después el efecto le entrega la limpieza a React. El efecto acaba ahí,
en un instante; load sigue sola hasta que llega tu perfil.

</details>

---

## Peldaño 5b — `PerfilAlCerrar`

<details><summary>Pista 1 — conceptual</summary>

React solo se queda con lo que devuelve el efecto. ¿Qué devuelve el efecto del starter?

</details>

<details><summary>Pista 2 — más concreta</summary>

El return de la limpieza está dentro de load: se lo devuelve a quien llamó a load, que no lo
guarda. Tiene que ser la última línea del efecto, no de load.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: una función async puede devolver otra función.

```
AssertionError: al cerrar, la petición tenía que cancelarse: expected false to be true
```

El efecto no devuelve nada, así que al cerrar React no tiene a quién llamar, y la señal sigue
sin abortar.

</details>

<details><summary>Solución</summary>

```ts
useEffect(() => {
  const controller = new AbortController();
  async function load() { /* el try/catch, sin return al final */ }
  load();
  return () => controller.abort();
}, []);
```

La limpieza la devuelve el efecto. React la guarda y la llama al cerrar la sección: abort()
corta la petición, y el catch se calla por la guardia.

</details>

---

## Peldaño 5c — `pedirLasDos`

<details><summary>Pista 1 — conceptual</summary>

Es tu 1c otra vez: hay una señal que nadie va a apretar nunca. ¿Cuál?

</details>

<details><summary>Pista 2 — más concreta</summary>

La señal del perfil nace de un controller que no guarda nadie. Las dos peticiones tienen que
escuchar la misma señal, la que recibe pedirLasDos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: new AbortController().signal es un AbortSignal válido.

```
AssertionError: la petición del perfil tenía que cortarse también: expected false to be true
```

Promise.all falla con AbortError, porque la lista sí se cortó, pero el perfil sigue en vuelo.

</details>

<details><summary>Solución</summary>

```ts
return await Promise.all([pedirJson(API_PROJECTS, signal), pedirJson(API_PROFILE, signal)]);
```

Una señal, dos oyentes: cuando quien llama aprieta abort(), se cortan las dos a la vez. Es lo
que hace tu 5 con la señal combinada.

</details>

---

## Peldaño 5d — `avisoDe`

<details><summary>Pista 1 — conceptual</summary>

Las ventanillas se prueban en orden. Un TimeoutError, ¿es un Error?

</details>

<details><summary>Pista 2 — más concreta</summary>

La ventanilla de «cualquier Error» acepta también al TimeoutError, así que la del reloj no le
llega nunca. La más concreta va antes que la general.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: los tres if son válidos en cualquier orden.

```
AssertionError: expected 'signal timed out' to be 'La API tardó demasiado'
```

El error del reloj entró por el segundo if y salió con su mensaje en inglés.

</details>

<details><summary>Solución</summary>

```ts
if (miSenal.aborted) return null;
if (err instanceof Error && err.name === "TimeoutError") return "La API tardó demasiado";
if (err instanceof Error) return err.message;
return "Error desconocido";
```

Se fue → nada. El reloj → el aviso. Cualquier otro Error → su mensaje. Y si ni siquiera es un
Error → el texto fijo. De lo más concreto a lo más general.

</details>

---

## Peldaño 5e — `ListaConAvisos`

<details><summary>Pista 1 — conceptual</summary>

avisoDe quiere saber si el usuario se fue. ¿Qué señal le estás pasando para preguntarlo?

</details>

<details><summary>Pista 2 — más concreta</summary>

La combinada está abortada tanto si se fue como si saltó el reloj. Para saber si se fue, avisoDe
tiene que recibir la del controller. Es la ⚠️ TRAMPA de la Teoría 2.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: las dos señales son AbortSignal.

```
TestingLibraryElementError: Unable to find role="alert"
```

Con el reloj vencido, la combinada vale aborted true, avisoDe devuelve null y nadie pinta el
aviso. Si el 5d no está resuelto, este también falla: ahí el aviso sale en inglés.

</details>

<details><summary>Solución</summary>

```ts
const aviso = avisoDe(err, controller.signal);
```

controller.signal solo se aborta al desmontar: si el que cortó fue el reloj, vale false, y
avisoDe sigue de largo hasta el aviso.

</details>

---

## Peldaño 5f — `useListaDeCero`

<details><summary>Pista 1 — conceptual</summary>

Es tu ListaConAvisos del 5e, pero repartida: el estado y el efecto en el hook, y el pintado en
ListaDeCero, que ya está hecho. ¿Qué piezas del 5e van al hook?

</details>

<details><summary>Pista 2 — más concreta</summary>

Los dos useState, el efecto entero con su array de dependencias y, al final, un return con
projects y error. El efecto va en el orden del bloque A: controller y señal, load, load(), y la
limpieza.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: un efecto vacío es válido.

```
TestingLibraryElementError: Unable to find an element with the text: Smart Cooler.
```

El hook devuelve siempre projects null: ListaDeCero se queda en «Cargando…».

</details>

<details><summary>Solución</summary>

```ts
const [projects, setProjects] = useState<Project[] | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const controller = new AbortController();
  const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(limiteMs)]);

  async function load() {
    try {
      setProjects(await pedirLista(signal));
    } catch (err) {
      const aviso = avisoDe(err, controller.signal);
      if (aviso !== null) setError(aviso);
    }
  }

  load();
  return () => controller.abort();
}, [limiteMs]);

return { projects, error };
```

Un hook es un componente sin JSX: guarda el estado, corre el efecto y devuelve lo que el
componente necesita para pintar.

</details>

---

## Peldaño 5g — `usePortadaDeCero`

<details><summary>Pista 1 — conceptual</summary>

Es el 5f con una petición más. ¿Qué cambia cuando son dos: la señal, el await o el estado?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tres estados (projects, profile y error). En el try, un Promise.all con la misma señal para las
dos (bloque B) y los dos parse antes de guardar nada. En el catch, tu avisoDe con la señal del
controller (bloque C).

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: un efecto vacío es válido.

```
TestingLibraryElementError: Unable to find an element with the text: Nicolás · Frontend Developer.
```

El hook devuelve siempre profile null: PortadaDeCero se queda en «Cargando…».

</details>

<details><summary>Solución</summary>

```ts
const [projects, setProjects] = useState<Project[]>([]);
const [profile, setProfile] = useState<Profile | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
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
      const aviso = avisoDe(err, controller.signal);
      if (aviso !== null) setError(aviso);
    }
  }

  load();
  return () => controller.abort();
}, [limiteMs]);

return { projects, profile, error };
```

Es tu 5, con el catch de tres ramas metido en avisoDe. Las cuatro piezas en su sitio: el orden
del efecto (A), una señal para las dos (B), el catch (C) y el hook que devuelve lo que la
portada pinta (D).

</details>
