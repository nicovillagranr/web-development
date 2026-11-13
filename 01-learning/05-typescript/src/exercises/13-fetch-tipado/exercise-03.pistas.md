# Pistas — exercise-03 · pedir dos cosas a la vez

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 1 lo marca además el compilador, y su Pista 3 cita ese
mensaje. Del 2 al 5, solo el test.

---

## Drill 1 — `saludoDelPortfolio`

<details><summary>Pista 1 — conceptual</summary>

TypeScript no adivina qué hay en una variable por cómo se llama. ¿Qué hay en la posición 0
del array que le pasas a Promise.all?

</details>

<details><summary>Pista 2 — más concreta</summary>

Al desestructurar un array, cada variable se lleva la posición que ocupa. En el starter, la
primera variable recibe lo que devuelve pedirProyectos, se llame como se llame. Las
posiciones de las variables y las del array tienen que coincidir.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2339: Property 'name' does not exist on type 'Project[]'.
error TS2339: Property 'length' does not exist on type 'Profile'.
```

TypeScript te dice qué hay de verdad en cada variable: en profile está la lista, y en
projects, el perfil.

```
AssertionError: expected 'undefined · undefined proyectos' to be 'Nicolás · 2 proyectos'
```

Al ejecutarlo pasa lo mismo: un array no tiene name y tu perfil no tiene length. Los dos dan
undefined.

</details>

<details><summary>Solución</summary>

```ts
const [projects, profile] = await Promise.all([pedirProyectos(), pedirPerfil()]);
return `${profile.name} · ${projects.length} proyectos`;
```

Vale también dejar las variables como estaban y cambiar el orden del array. Promise.all
devuelve el tipo `[Project[], Profile]`, y la desestructuración reparte por posición: lo que
importa es que las dos coincidan.

</details>

---

## Drill 2 — `pedirALaVez`

<details><summary>Pista 1 — conceptual</summary>

await detiene la función ahí mismo hasta que la promesa termina. Mientras la primera línea
espera, ¿qué pasa con la segunda?

</details>

<details><summary>Pista 2 — más concreta</summary>

Para que salgan las dos, hay que llamar a las dos funciones antes de esperar nada.
Promise.all las recibe ya llamadas, dentro de un array, y un solo await espera a las dos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: los tipos del starter están bien. Es lento, no está mal tipado.

```
AssertionError: expected [ '/api/projects' ] to deeply equal [ '/api/profile', '/api/projects' ]
```

Al llamar a la función solo había salido la lista. El perfil esperaba su turno.

</details>

<details><summary>Solución</summary>

```ts
const [projects, profile] = await Promise.all([pedirProyectos(), pedirPerfil()]);
return { projects, profile };
```

Las dos funciones se llaman al construir el array, así que las dos peticiones salen en ese
momento. El único await espera a la promesa de Promise.all: con la lista a 0,9 s y el perfil
a 0,6 s, tarda 0,9 s, lo que tarda la más lenta, y no 1,5 s.

Ojo con `Promise.all([await pedirProyectos(), await pedirPerfil()])`: los await dentro del
array vuelven a ponerlas en fila, y el test lo caza.

</details>

---

## Drill 3 — `pedirPortfolio`

<details><summary>Pista 1 — conceptual</summary>

¿Qué tiene que pasar para que la promesa de un fetch rechace? Mira el recordatorio de la
cabecera.

</details>

<details><summary>Pista 2 — más concreta</summary>

Con el 404, la promesa de fetch se cumple, con un Response que trae status 404. Promise.all
solo ve dos promesas cumplidas, así que se cumple también. El starter comprueba si vino bien
una de las dos respuestas, pero no la otra.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el starter está bien tipado.

```
AssertionError: promise resolved "{ projects: [ …(2) ], …(1) }" instead of rejecting
```

Con el perfil en 404, la función devuelve el cuerpo del 404, `{ message: "Not found" }`,
como si fuera tu perfil.

</details>

<details><summary>Solución</summary>

```ts
if (!projectsRes.ok) throw new Error(`HTTP error — projects:${projectsRes.status}`);
if (!profileRes.ok) throw new Error(`HTTP error — profile:${profileRes.status}`);
```

Cada Response trae su propio ok. Promise.all solo te entrega las dos respuestas; decidir si
vinieron bien es cosa tuya, una por una. Tu usePortfolioData hace lo mismo, pero junta los
dos fallos en un solo mensaje con el array failed (l.54-59), y después lee los dos .json()
con otro Promise.all (l.61-64), que aquí también valdría.

</details>

---

## Drill 4 — `CabeceraAlCerrar`

<details><summary>Pista 1 — conceptual</summary>

abort() cancela lo que escucha su señal. ¿Cuáles de las dos peticiones la están escuchando?

</details>

<details><summary>Pista 2 — más concreta</summary>

Las dos peticiones van en el mismo Promise.all, pero el signal lo recibe cada una por
separado. En el starter, una de las dos no lo recibe.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: en pedirPerfil el signal es opcional, así que llamarla sin él es legal.

```
AssertionError: expected 2 to be +0 // Object.is equality
```

Es la línea de /api/profile: al cerrar siguen vivas las dos peticiones del perfil, la del
ensayo de StrictMode y la buena.

</details>

<details><summary>Solución</summary>

```ts
const [lista, perfil] = await Promise.all([pedirProyectos(controller.signal), pedirPerfil(controller.signal)]);
```

Promise.all no cancela nada: el abort() solo llega a las peticiones que llevan su signal. Es
tu 4i del 02, con dos peticiones en vez de una.

</details>

---

## Drill 5 — `usePortfolio`

<details><summary>Pista 1 — conceptual</summary>

La lista ya sabe llegar: el controller, la guardia y la limpieza están puestos. Lo que falta
es otra petición en la misma carga, y un sitio donde guardar lo que traiga.

</details>

<details><summary>Pista 2 — más concreta</summary>

Tres piezas: un estado para el perfil; un Promise.all que pida las dos, cada una con el
signal del controller; y guardar las dos cuando lleguen. El catch y la limpieza que ya
están valen para las dos.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: devolver `profile: null` encaja con `Profile | null`.

```
TestingLibraryElementError: Unable to find an element with the text: Nicolás · Frontend Developer.
```

Portada se queda en «Cargando…» porque el perfil no llega nunca. Si al arreglarlo falla con
otro mensaje:

- `expected [ '/api/projects', '/api/projects' ] to include '/api/profile'` → el perfil
  sale, pero después de la lista.
- `expected 2 to be +0` → al perfil le falta el signal.

</details>

<details><summary>Solución</summary>

```tsx
const [projects, setProjects] = useState<Project[]>([]);
const [profile, setProfile] = useState<Profile | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const controller = new AbortController();

  async function load() {
    try {
      const [lista, perfil] = await Promise.all([
        pedirProyectos(controller.signal),
        pedirPerfil(controller.signal),
      ]);
      setProjects(lista);
      setProfile(perfil);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  load();
  return () => controller.abort();
}, []);

return { projects, profile, error };
```

Una carga, un solo await y dos estados. Si una de las dos rechaza, la de Promise.all
rechaza, el await lanza y setProjects no llega a correr: va directo al catch. O llega todo o
llega el aviso. Es tu usePortfolioData sin Zod, el timeout ni el snapshot: el controller
(l.35), el Promise.all (l.49-52), los dos set (l.90-91), la guardia (l.96) y la limpieza
(l.117-119).

</details>
