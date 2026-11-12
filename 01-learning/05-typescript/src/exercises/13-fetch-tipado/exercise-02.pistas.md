# Pistas — exercise-02 · cancelar la petición

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 1 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Del 2 al 5, solo el test.

La escalera (4a–4i) va entre el 4 y el 5, como en el archivo. Los nueve peldaños salen rojos
en el test. Al 4a lo marca además el compilador, y al 4f, el lint.

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

## Peldaño 4a — `mensajeDe`

<details><summary>Pista 1 — conceptual</summary>

err puede ser cualquier cosa. Antes de pedirle el mensaje, pregunta si es de los que tienen
mensaje.

</details>

<details><summary>Pista 2 — más concreta</summary>

instanceof Error responde esa pregunta, y el ternario elige entre dos valores: el mensaje si
la respuesta es sí, el texto fijo si es no.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS18046: 'err' is of type 'unknown'.
```

```
AssertionError: expected undefined to be 'Error desconocido' // Object.is equality
```

Un texto suelto no tiene .message: en ejecución sale undefined, y TypeScript ya lo avisaba.

</details>

<details><summary>Solución</summary>

```ts
return err instanceof Error ? err.message : "Error desconocido";
```

Dentro de la rama del sí, TypeScript ya sabe que err es un Error y deja leer .message. Es la
misma línea que va dentro del setError de tu drill 4.

</details>

---

## Peldaño 4b — `cargarB`

<details><summary>Pista 1 — conceptual</summary>

El catch no pregunta nada antes de apuntar. ¿Qué tendría que preguntar, y qué tendría que
hacer si la respuesta es «sí, la cancelaron»?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al principio del catch, una guardia: si signal.aborted, return. Todo lo que hay debajo deja
de correr para la cancelada.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ …(2) ] to deeply equal []
```

Debajo, en el diff, verás lo que apuntó: `setError(This operation was aborted)` y
`setLoading(false)`. En tu componente, eso es el aviso rojo del drill 4.

</details>

<details><summary>Solución</summary>

```ts
} catch (err) {
  if (signal.aborted) return;
  apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
  apuntar("setLoading(false)");
}
```

return sale de cargarB entera: la cancelada no llega a ninguno de los dos apuntes.

</details>

---

## Peldaño 4c — `cargarC`

<details><summary>Pista 1 — conceptual</summary>

La guardia está, pero mira qué pasa antes de que le toque el turno.

</details>

<details><summary>Pista 2 — más concreta</summary>

El código corre de arriba abajo. Una guardia solo protege lo que viene después de ella: tiene
que ir la primera del catch.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ Array(1) ] to deeply equal []
```

Ese único apunte es `setError(This operation was aborted)`: se escribió antes de que la
guardia pudiera cortar.

</details>

<details><summary>Solución</summary>

```ts
} catch (err) {
  if (signal.aborted) return;
  apuntar(`setError(${err instanceof Error ? err.message : "Error desconocido"})`);
  apuntar("setLoading(false)");
}
```

Primero se pregunta, después se toca. Una guardia que llega tarde no guarda nada.

</details>

---

## Peldaño 4d — `cargarD`

<details><summary>Pista 1 — conceptual</summary>

El catch ya corta bien. Lo que apunta la cancelada no sale del catch.

</details>

<details><summary>Pista 2 — más concreta</summary>

El finally corre también después de un return. Dos salidas: que el finally pregunte también
por signal.aborted, o quitar el finally y apagar loading al final del try y del catch.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'setLoading(false)' ] to deeply equal []
```

Ese setLoading(false) es el finally, que corrió por la cancelada.

</details>

<details><summary>Solución</summary>

```ts
} finally {
  if (!signal.aborted) apuntar("setLoading(false)");
}
```

O la otra salida, que es la que elegiste en el drill 4: sin finally, con setLoading(false)
en el try y en el catch, debajo de la guardia. Las dos pasan.

</details>

---

## Peldaño 4e — `cargarE`

<details><summary>Pista 1 — conceptual</summary>

Recorre los tres caminos y apunta, en cada uno, quién apaga loading.

</details>

<details><summary>Pista 2 — más concreta</summary>

El catch lo apaga para la red caída, y la guardia salta para la cancelada. El try no lo
apaga nunca: es el mismo resbalón de tu drill 3.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'setProjects(2 proyectos)' ] to deeply equal [ 'setProjects(2 proyectos)', …(1) ]
```

El camino bueno apunta los proyectos y se acaba sin apagar loading.

</details>

<details><summary>Solución</summary>

```ts
apuntar(`setProjects(${data.length} proyectos)`);
apuntar("setLoading(false)");
```

Sin finally, cada camino que acaba la carga tiene que apagar loading por su cuenta. La
cancelada es el único que no.

</details>

---

## Peldaño 4f — `NombreDelProyecto`

<details><summary>Pista 1 — conceptual</summary>

El efecto usa id, pero React no sabe que tiene que volver a correrlo cuando id cambia.

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que decide cuándo se repite un efecto es su array de dependencias. Ahora está vacío.

</details>

<details><summary>Pista 3 — lo que dicen el lint y el test</summary>

```
warning  React Hook useEffect has a missing dependency: 'id'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
```

```
TestingLibraryElementError: Unable to find an element with the text: Smart Cooler.
```

</details>

<details><summary>Solución</summary>

```tsx
}, [id]);
```

Con id en el array, cada vez que cambia React vuelve a correr el efecto, y el efecto pide el
proyecto nuevo.

</details>

---

## Peldaño 4g — `RastroDeId`

<details><summary>Pista 1 — conceptual</summary>

«suelta» se apunta cuando una pasada del efecto termina. ¿Qué parte del efecto corre justo en
ese momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

La limpieza: la función que devuelve el efecto. Que devuelva una que apunte «suelta», con el
mismo id que usó el «pide».

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'pide 1', 'pide 2' ] to deeply equal [ 'suelta 1', 'pide 2' ]
```

Son los dos últimos apuntes después de pasar del 1 al 2: entre medias falta la limpieza del 1.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  apuntar(`pide ${id}`);
  return () => apuntar(`suelta ${id}`);
}, [id, apuntar]);
```

La limpieza se creó en la pasada del 1, y el id que ve es el de esa pasada. Igual que el
controller del 5: cada limpieza aborta el suyo, no el de la pasada nueva.

</details>

---

## Peldaño 4h — `ProyectosQueNoLlegan`

<details><summary>Pista 1 — conceptual</summary>

En pnpm dev el efecto corre dos veces por el ensayo. Cuenta cuántos mandos hay para esas dos
peticiones.

</details>

<details><summary>Pista 2 — más concreta</summary>

Hay un solo mando, creado fuera del componente. La limpieza del ensayo lo aborta, y un mando
abortado se queda abortado para siempre: la segunda petición nace cancelada. Cada pasada del
efecto necesita el suyo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: Projex.
```

La segunda petición rechaza nada más salir, el catch ve el mando abortado y sale sin apagar
loading.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const mando = new AbortController();

  async function load() {
    // … el mismo try/catch, con mando.signal
  }

  load();
  return () => mando.abort();
}, []);
```

Y borra el `const mando` de fuera, que ya no usa nadie. Con un mando por pasada, el ensayo
cancela solo el suyo.

</details>

---

## Peldaño 4i — `FichaQueNoEscucha`

<details><summary>Pista 1 — conceptual</summary>

El botón se aprieta, pero ¿hay alguien escuchándolo? Vuelve a tu drill 1.

</details>

<details><summary>Pista 2 — más concreta</summary>

El fetch no recibe el signal del controller. abort() cambia el signal, pero si fetch no lo
tiene, la petición sigue y su respuesta llega.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TestingLibraryElementError: Unable to find an element with the text: Smart Cooler · En curso.
```

Mira el DOM que imprime debajo: dice «Projex · Terminado». Si tapas la carrera con otra
guardia en el try, la pantalla queda bien, pero el test cuenta peticiones vivas:

```
AssertionError: expected 2 to be +0 // Object.is equality
```

</details>

<details><summary>Solución</summary>

```tsx
const res = await fetch(`${API_PROJECTS}/${id}`, { signal: controller.signal });
```

Con el signal dentro, al cambiar de id la limpieza cancela la petición de Projex, su promesa
rechaza y la guardia del catch sale sin tocar nada.

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
