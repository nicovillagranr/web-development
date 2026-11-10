# Pistas — exercise-02 · cancelar la petición

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 1 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Del 2 al 5, solo el test.

Un aviso para el banco: el texto de una cancelación depende de quién la hace. En los tests
sale «This operation was aborted» y en Chrome, «signal is aborted without reason». Las dos
son la misma cancelación.

---

## Drill 1 — `pedirCancelable`

<details><summary>Pista 1 — conceptual</summary>

fetch no recibe sueltas las cosas que acompañan a la petición. ¿Cómo es su segundo
argumento en la Teoría 1?

</details>

<details><summary>Pista 2 — más concreta</summary>

El segundo argumento de fetch es un objeto de opciones, y fetch busca dentro una propiedad
que se llama signal. Si le pasas la señal sola, no tiene esa propiedad dentro.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2559: Type 'AbortSignal' has no properties in common with type 'RequestInit'.
```

RequestInit es el tipo de las opciones de fetch. Todas son opcionales, así que TypeScript
solo puede quejarse de que lo que le pasas no comparte ni una con ellas.

```
AssertionError: promise resolved "[ …(2) ]" instead of rejecting
```

El test cancela y la lista llega igual: fetch nunca vio la señal.

</details>

<details><summary>Solución</summary>

```ts
const res = await fetch(API_PROJECTS, { signal });
```

`{ signal }` es la forma corta de `{ signal: signal }`: un objeto con la propiedad signal,
que es donde fetch la busca. Al abortar, la promesa de fetch rechaza, y con ella la de
pedirCancelable.

</details>

---

## Drill 2 — `avisoDeCarga`

<details><summary>Pista 1 — conceptual</summary>

El catch no sabe por qué llegó lo que llegó. ¿Quién de los que están a mano sí sabe si
alguien canceló?

</details>

<details><summary>Pista 2 — más concreta</summary>

El signal que recibe la función. Si ya se llamó a abort(), signal.aborted vale true. Pregunta
eso al principio del catch, antes de leer el error.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 'This operation was aborted' to be 'Carga cancelada' // Object.is equality
```

La cancelación llega al catch como un Error, con su mensaje: el starter la trata igual que la
red caída. TypeScript no avisa porque no hay ningún tipo mal puesto.

</details>

<details><summary>Solución</summary>

```ts
} catch (err) {
  if (signal.aborted) return "Carga cancelada";
  return err instanceof Error ? err.message : "Error desconocido";
}
```

Desde dentro del catch, una cancelación y la red caída se ven igual: un error. Solo el signal
sabe si alguien apretó el botón, así que es a él a quien hay que preguntarle.

</details>

---

## Drill 3 — `ProyectosAlCerrar`

<details><summary>Pista 1 — conceptual</summary>

Tienes el mando, pero nadie lo usa. ¿Qué parte del efecto corre justo cuando la sección se
cierra?

</details>

<details><summary>Pista 2 — más concreta</summary>

La limpieza: la función que devuelve el efecto. Este efecto no devuelve nada. Que devuelva
una que apriete el botón del controller.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 2 to be +0 // Object.is equality
```

Son las peticiones a /api/projects que siguen sin cancelar después de cerrar: dos, porque el
ensayo de StrictMode monta el componente dos veces. Tienen que quedar cero.

</details>

<details><summary>Solución</summary>

```tsx
load();
return () => controller.abort();
```

React llama a la limpieza al desmontar, y también en el ensayo de StrictMode. Como el
controller se creó en el efecto, la limpieza lo tiene a mano y cancela justo la petición de
esa pasada. Si se creara dentro de load, la limpieza no podría verlo.

</details>

---

## Drill 4 — `CancelacionSilenciosa`

<details><summary>Pista 1 — conceptual</summary>

El aviso rojo no es de la API. Es de la petición que canceló el ensayo de StrictMode. ¿Por
qué bloques pasa esa petición después de que la cancelen?

</details>

<details><summary>Pista 2 — más concreta</summary>

Pasa por el catch y por el finally. En el catch, sal antes de tocar error si su signal está
abortado. Pero el finally corre igual, aunque salgas con return: ahí también tiene que
mirar el signal antes de tocar loading.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

Con el starter:

```
expected document not to contain element, found <p
  role="alert"
>
  This operation was aborted
</p> instead
```

Si solo arreglas el catch:

```
TestingLibraryElementError: Unable to find an element with the text: Cargando….
```

Ese segundo mensaje es el finally: apaga loading por la petición cancelada, y la pantalla
enseña una lista vacía antes de tiempo.

</details>

<details><summary>Solución</summary>

```tsx
} catch (err) {
  if (controller.signal.aborted) return;
  setError(err instanceof Error ? err.message : "Error desconocido");
} finally {
  if (!controller.signal.aborted) setLoading(false);
}
```

La cancelada sale del catch sin tocar error, y el finally no apaga loading por ella. Otra
forma que también vale es la de tu usePortfolioData: quitar el finally y apagar loading al
final del try y del catch, después de la guardia.

</details>

---

## Drill 5 — `useProyecto`

<details><summary>Pista 1 — conceptual</summary>

Las dos peticiones siguen vivas, y las dos llaman a setProject al llegar. ¿Cuál de las dos
sobra en cuanto cambia el id, y quién corre justo en ese momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

Las tres piezas de la Teoría 2: un controller por pasada del efecto, su signal en el fetch y
su abort() en la limpieza. Y en el catch, la guardia del 4, para que la cancelada no pinte
un error.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

Con el starter, Smart Cooler sale, pero no aguanta:

```
TestingLibraryElementError: Unable to find an element with the text: Smart Cooler · En curso.
```

Mira el DOM que imprime debajo: dice «Projex · Terminado». Si tapas el bug con una bandera
en vez de cancelar, la pantalla queda bien, pero el test cuenta peticiones vivas:

```
AssertionError: expected 2 to be +0 // Object.is equality
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    try {
      const res = await fetch(`${API_PROJECTS}/${id}`, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
      const data: Project = await res.json();
      setProject(data);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  load();
  return () => controller.abort();
}, [id]);
```

Al cambiar el id, React corre la limpieza de la pasada anterior antes de la nueva: la
petición de Projex se cancela antes de que salga la de Smart Cooler. Gana la que se pidió
última, porque la otra ya no existe. Sin cancelar, gana la que llega última.

</details>
