# Pistas — exercise-06 · el plan B

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 1 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Al 2, al 3, al 4 y al 5, solo el test. Los peldaños de las dos escaleras (4a–4c y
5a–5c), también solo el test.

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
deRespaldo en true. Mira la SINTAXIS de la Teoría 1.

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
  return { projects: snapshot.projects, profile: snapshot.profile, deRespaldo: true };
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

## Peldaño 4a — `enVivoConReloj`

<details><summary>Pista 1 — conceptual</summary>

fetch solo escucha la señal que le das. ¿Cuál le estás dando, y cuál solo miras con un if?

</details>

<details><summary>Pista 2 — más concreta</summary>

El reloj se mira una vez, al salir, cuando todavía no ha saltado. Para que corte durante la
espera, tiene que ir dentro de la señal que recibe fetch, junto con la del usuario. Mira la
SINTAXIS del bloque A.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el if usa el reloj, así que no hay ningún parámetro sin usar.

```
AssertionError: promise resolved "{ projects: [ …(2) ], …(1) }" instead of rejecting
```

Con la API lenta y un reloj de 50 ms, el test esperaba un TimeoutError, y tus datos llegaron
enteros a los 200 ms.

</details>

<details><summary>Solución</summary>

```ts
return await pedirEnVivo(AbortSignal.any([signal, reloj]));
```

La combinada corta por cualquiera de los dos motivos, lo que pase antes. El if del principio
puede quedarse o irse: ya no hace falta. Si en fetch dejas solo el reloj, signal se queda sin
usar y el compilador avisa; y aunque lo silenciaras, el caso del usuario que se va sale rojo.

</details>

---

## Peldaño 4b — `enVivoConSalida`

<details><summary>Pista 1 — conceptual</summary>

Es el 4a con los papeles cambiados. ¿Qué señal mira el if, y cuál escucha fetch?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al usuario se le mira una vez, al salir. Si se va mientras espera, fetch no se entera, porque
solo lleva el reloj. Los dos motivos tienen que ir dentro de la señal de fetch.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el if usa signal.

```
AssertionError: promise resolved "{ projects: [ …(2) ], …(1) }" instead of rejecting
```

El usuario se fue a los 20 ms y tus datos llegaron igual a los 200: el reloj era de 1 s.

</details>

<details><summary>Solución</summary>

```ts
return await pedirEnVivo(AbortSignal.any([signal, reloj]));
```

La misma línea que el 4a. Cada señal tapa un motivo, y la petición en vivo tiene los dos: por
eso tu 4 la pide con la combinada.

</details>

---

## Peldaño 4c — `respaldoConLaQueQueda`

<details><summary>Pista 1 — conceptual</summary>

Si llegas al catch porque saltó el reloj, ¿cómo está la combinada en ese momento?

</details>

<details><summary>Pista 2 — más concreta</summary>

La combinada quedó abortada para siempre, así que lo que salga con ella nace cortado. Al
snapshot solo le queda un motivo para cortar, que el usuario se vaya, y esa señal la tienes a
mano. Mira el bloque B.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: las dos son AbortSignal.

```
AssertionError: promise rejected "DOMException{ stack: 'TimeoutError: …' }" instead of resolving
```

Con la API lenta, el reloj de 50 ms cortó la petición en vivo, y después cortó también el
snapshot sin dejarlo salir.

</details>

<details><summary>Solución</summary>

```ts
const snapshot = await leerSnapshot(signal);
```

En vivo va la combinada, con sus dos motivos; el snapshot, signal, con el único que le queda.
Con new AbortController().signal también llegaría, pero si el usuario se va nadie lo corta: el
último caso del test sale rojo.

</details>

---

## Peldaño 5a — `usePerfilConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

Cuando la API falla, ¿qué hace el catch del load: intenta algo más, o se rinde?

</details>

<details><summary>Pista 2 — más concreta</summary>

El catch guarda el error y termina. Entre la guardia y ese error falta el plan B: leer el
snapshot con su propio try/catch, como en tu 3, y guardar su perfil. El error pasa al catch de
dentro. Mira la SINTAXIS del bloque A.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: rendirse es código válido.

```
TestingLibraryElementError: Unable to find an element with the text: Nicolás · Frontend Developer.
```

Con la API caída, el starter pinta «HTTP error — /api/profile:500» en vez de tu perfil. Si
pones el plan B sin su propio try/catch, el caso sin snapshot no pinta el 404: el error se
escapa.

</details>

<details><summary>Solución</summary>

```ts
} catch {
  if (controller.signal.aborted) return;
  try {
    const snapshot = await leerSnapshot(controller.signal);
    setProfile(snapshot.profile);
  } catch (err) {
    if (controller.signal.aborted) return;
    setError(err instanceof Error ? err.message : "Error desconocido");
  }
}
```

Es tu 3 dentro del hook: el plan B con su propio try/catch, y cada camino termina guardando en
el estado en vez de apuntar.

</details>

---

## Peldaño 5b — `cargarConGuardias`

<details><summary>Pista 1 — conceptual</summary>

Si el usuario se va mientras se lee el snapshot, ¿a cuál de los dos catch llega la cancelación?

</details>

<details><summary>Pista 2 — más concreta</summary>

Llega al catch de dentro, y ese no pregunta si el usuario se fue: apunta la cancelación como si
fuera un fallo. La guardia de fuera ya pasó cuando empezó el snapshot. Mira los Ejemplos del
bloque B.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: apuntar sin preguntar es código válido.

```
AssertionError: expected [ 'error: This operation was aborted' ] to deeply equal []
```

La API cayó a los 20 ms, el snapshot empezó y el usuario se fue a los 60, con el snapshot a
medias. En Chrome, el mensaje es «signal is aborted without reason».

</details>

<details><summary>Solución</summary>

```ts
} catch (err) {
  if (signal.aborted) return;
  apuntar(`error: ${err instanceof Error ? err.message : "Error desconocido"}`);
}
```

La misma guardia que la de fuera, en el otro catch. Cada catch puede recibir una cancelación,
así que cada uno pregunta antes de tocar nada.

</details>

---

## Peldaño 5c — `useListaConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

Con la API caída el snapshot llega. ¿Qué es lo primero que pregunta el render de
ListaConRespaldo?

</details>

<details><summary>Pista 2 — más concreta</summary>

El camino del snapshot guarda la lista, pero también un error, y el render pinta el error antes
que nada. Ese camino tiene que dejar los datos con deRespaldo en true, sin error. Mira el
bloque C.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: guardar un texto en error es código válido.

```
TestingLibraryElementError: Unable to find an element with the text: Datos del último deploy.
```

Con el starter sale «La API no contestó». Si solo quitas el setError, la lista aparece, pero el
aviso no: sale el mismo mensaje.

</details>

<details><summary>Solución</summary>

```ts
const snapshot = await leerSnapshot(controller.signal);
setProjects(snapshot.projects);
setDeRespaldo(true);
```

Que en vivo fallara no es un error para el usuario: el respaldo llegó. Lo que sí tiene que
saber es que los datos son del último deploy, y eso lo dice deRespaldo.

</details>

---

## Drill 5 — `usePortfolioConRespaldo`

<details><summary>Pista 1 — conceptual</summary>

El catch de en vivo enseña el error. En tu portada, ¿qué tendría que intentar antes de rendirse?

</details>

<details><summary>Pista 2 — más concreta</summary>

Después de la guardia, el plan B con su propio try/catch (drill 3), con la señal del controller
(drill 4). Si llega, guarda sus datos y deRespaldo en true. Si no, la guardia otra vez y el error.

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
    setDeRespaldo(false);
  } catch {
    if (controller.signal.aborted) return;
    try {
      const snapshot = await leerSnapshot(controller.signal);
      setProjects(snapshot.projects);
      setProfile(snapshot.profile);
      setDeRespaldo(true);
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
