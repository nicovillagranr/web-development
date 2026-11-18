# Pistas — exercise-06 · el plan B

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 1 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Al 2, al 3, al 4 y al 5, solo el test.

Van en orden: todos leen el snapshot con tu leerSnapshot del 1. Mientras el 1 no esté, el 3
falla con el error de Zod del 1 en vez de con el suyo.

---

## Drill 1 — `leerSnapshot`

<details><summary>Pista 1 — conceptual</summary>

El snapshot no es una lista: es un objeto que trae una lista dentro. ¿Con qué schema lo estás
comprobando?

</details>

<details><summary>Pista 2 — más concreta</summary>

Arriba del archivo hay un schema hecho para el snapshot entero, con los otros dos dentro. Es
el que tiene que validar lo que llega.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2739: Type '{ id: number; name: string; status: string; }[]' is missing the following properties from type '{ generatedAt: string; projects: { id: number; name: string; status: string; }[]; profile: { name: string; role: string; }; }': generatedAt, projects, profile
```

```
AssertionError: promise rejected "ZodError: [ … "Invalid input: expected array, received object" … ]"
```

TypeScript ya lo avisa antes de ejecutar: el schema de la lista devuelve una lista, y la
función promete un Snapshot. Al ejecutar, Zod dice lo mismo con sus palabras.

</details>

<details><summary>Solución</summary>

```ts
return SnapshotSchema.parse(await pedirJson(API_SNAPSHOT, signal));
```

SnapshotSchema es un z.object hecho de ProjectsSchema y ProfileSchema: valida el snapshot
entero de una vez, y su tipo es el Snapshot que promete la función.

</details>

---

## Drill 2 — `pedirConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

El catch se rinde a la primera. ¿Qué otro camino tiene para conseguir tus datos?

</details>

<details><summary>Pista 2 — más concreta</summary>

En vez de lanzar, el catch lee el snapshot con tu leerSnapshot y devuelve sus datos, con
stale en true. Mira la SINTAXIS de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: lanzar un error dentro del catch es válido.

```
AssertionError: promise rejected "Error: La API no contestó" instead of resolving
```

La API dio 500 y el snapshot estaba bien, pero nadie lo leyó.

</details>

<details><summary>Solución</summary>

```ts
} catch {
  const snapshot = await leerSnapshot(signal);
  return { projects: snapshot.projects, profile: snapshot.profile, stale: true };
}
```

Si en vivo falla, por lo que sea, el catch prueba el plan B. Si el snapshot también falla,
leerSnapshot lanza y el error sale de la función: aquí eso está bien, porque quien llama decide
qué hacer. En el 3, en cambio, no hay nadie arriba.

</details>

---

## Drill 3 — `cargarConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

El plan B también puede fallar. Cuando leerSnapshot lanza dentro del catch, ¿queda algún catch
por debajo que lo atrape?

</details>

<details><summary>Pista 2 — más concreta</summary>

El plan B necesita su propio try/catch, dentro del catch. En ese segundo catch se apunta el
error, después de la misma guardia de siempre. Es la ⚠️ TRAMPA de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: un await dentro de un catch es válido.

```
AssertionError: promise rejected "Error: HTTP error — /data-snapshot.json:4…" instead of resolving
```

El 404 del snapshot salió de la función sin apuntar nada. Si todavía no resolviste el 1, aquí
sale antes su error de Zod.

</details>

<details><summary>Solución</summary>

```ts
} catch {
  if (signal.aborted) return;
  try {
    await leerSnapshot(signal);
    apuntar("snapshot");
  } catch (err) {
    if (signal.aborted) return;
    apuntar(`error: ${err instanceof Error ? err.message : "Error desconocido"}`);
  }
}
```

Es la forma de tu load (l.93-111): en vivo; si falla y no se fue, el snapshot; si también falla,
el error. Cada camino con su catch.

</details>

---

## Drill 4 — `pedirConLimiteYRespaldo`

<details><summary>Pista 1 — conceptual</summary>

Cuando el catch arranca el plan B, el reloj ya saltó. ¿Qué le pasa a una petición que sale con
esa misma señal?

</details>

<details><summary>Pista 2 — más concreta</summary>

La combinada quedó abortada por el reloj, así que el plan B nace cortado. El snapshot tiene que
salir con la señal de quien llama, que solo se aborta si cancela. Mira la SINTAXIS de la
Teoría 2.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: las dos señales son AbortSignal.

```
AssertionError: promise rejected "DOMException{ stack: 'TimeoutError: …' }" instead of resolving
```

El snapshot ni llegó a salir: fetch vio la señal ya abortada y rechazó al instante, con el
motivo del reloj.

</details>

<details><summary>Solución</summary>

```ts
const snapshot = await leerSnapshot(signal);
```

En vivo, la combinada: se corta si quien llama cancela o si salta el reloj. El plan B, solo la
de quien llama. Si canceló, el snapshot también se corta y sale el AbortError; si fue el reloj,
el snapshot sale entero. Es tu l.77: fetchSnapshot usa controller.signal, no la combinada.

</details>

---

## Drill 5 — `usePortfolioConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

El catch de en vivo enseña el error. En tu portada, ¿qué tendría que intentar antes de rendirse?

</details>

<details><summary>Pista 2 — más concreta</summary>

Después de la guardia, el plan B con su propio try/catch (drill 3), con la señal del controller
(drill 4). Si llega, guarda sus datos y stale en true. Si no, la guardia otra vez y el error.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el starter es tu hook del 05, que es válido.

```
TestingLibraryElementError: Unable to find an element with the text: Datos del último deploy.
```

Con la API lenta, el starter enseña el error del reloj en vez de tu portada del snapshot.

</details>

<details><summary>Solución</summary>

```ts
async function load() {
  try {
    const vivo = await pedirEnVivo(signal);
    setProjects(vivo.projects);
    setProfile(vivo.profile);
    setStale(false);
  } catch {
    if (controller.signal.aborted) return;
    try {
      const snapshot = await leerSnapshot(controller.signal);
      setProjects(snapshot.projects);
      setProfile(snapshot.profile);
      setStale(true);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }
}
```

Es tu usePortfolioDataWithFallback (l.87-113), línea por línea: en vivo con la combinada, el
plan B con la del desmontaje, cada uno con su catch, y la guardia antes de tocar el estado.
Tu portfolio guarda el error entero; aquí, su mensaje.

</details>
