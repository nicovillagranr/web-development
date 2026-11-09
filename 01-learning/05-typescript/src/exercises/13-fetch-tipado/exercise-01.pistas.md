# Pistas — exercise-01 · pedir datos en un efecto

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Además, al 1 lo marcan el compilador y el lint, y al 3
el compilador: su Pista 3 cita esos mensajes. El 2, el 4 y el 5 solo los marca el test.

La escalera (1a–1j) va primero, como en el archivo. Nueve peldaños salen rojos en el test;
el 1b lo pasa con el fallo dentro y solo lo caza el compilador. Al 1d, el 1e y el 1g los
marca también el compilador, y al 1a y al 1j, el lint.

---

## Peldaño 1a — `etiquetaDe`

<details><summary>Pista 1 — conceptual</summary>

La plantilla construye bien el texto. Pregúntate qué hace la función con ese texto después
de construirlo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Una flecha con llaves solo devuelve lo que va detrás de return. Hay dos arreglos: añadir el
return, o quitar las llaves para que la flecha devuelva lo que va detrás.

</details>

<details><summary>Pista 3 — lo que dicen el lint y el test</summary>

```
error  Expected an assignment or function call and instead saw an expression  @typescript-eslint/no-unused-expressions
```

```
AssertionError: expected undefined to be 'Projex · Terminado'
```

El lint ve una línea que construye un valor y no hace nada con él. El compilador calla: una
función que no devuelve nada es legal.

</details>

<details><summary>Solución</summary>

```ts
export const etiquetaDe = (project: Project) => {
  return `${project.name} · ${project.status}`;
};
// o, sin llaves:
export const etiquetaDe = (project: Project) => `${project.name} · ${project.status}`;
```

Con llaves, la flecha es un bloque de código, y un bloque solo entrega lo que va detrás de
return. Sin return, el texto se construía y se perdía.

</details>

---

## Peldaño 1b — `contarProyectos`

<details><summary>Pista 1 — conceptual</summary>

El test pasa: corre pnpm typecheck. Su return entrega un número, pero ¿qué devuelve de
verdad una función async?

</details>

<details><summary>Pista 2 — más concreta</summary>

Una función async envuelve lo que entrega su return en una promesa. La anotación del tipo de
retorno tiene que decir eso.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS1064: The return type of an async function or method must be the global Promise<T> type. Did you mean to write 'Promise<number>'?
```

El test no lo ve porque en ejecución no cambia nada: la función ya devolvía una promesa. Lo
que mentía era la anotación.

</details>

<details><summary>Solución</summary>

```ts
export const contarProyectos = async (projects: Project[]): Promise<number> => {
  return projects.length;
};
```

El return entrega un número, y async lo envuelve: quien llama recibe Promise<number>. El
número lo saca quien espere con await (el 1c).

</details>

---

## Peldaño 1c — `avisoDeProyectos`

<details><summary>Pista 1 — conceptual</summary>

contarProyectos es async (el 1b). Cuando la llamas, ¿qué te da, en el momento, antes de que
llegue el número?

</details>

<details><summary>Pista 2 — más concreta</summary>

Para quedarte con el número hay que esperar la promesa. avisoDeProyectos ya es async, así que
puede esperar.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected 'Tienes [object Promise] proyectos' to be 'Tienes 2 proyectos'
```

El compilador calla: meter una promesa en una plantilla es legal. JavaScript la convierte en
texto, y el texto de una promesa es «[object Promise]».

</details>

<details><summary>Solución</summary>

```ts
const total = await contarProyectos(projects);
```

Sin await, total era el resguardo, no la pizza. Con await, la función se para en esa línea
hasta que llega el número, y total ya es 2.

</details>

---

## Peldaño 1d — `RegistrarVisita`

<details><summary>Pista 1 — conceptual</summary>

registrarVisita está bien. Mira solo la flecha que recibe useEffect: ¿tiene llaves? Entonces,
¿qué devuelve?

</details>

<details><summary>Pista 2 — más concreta</summary>

Sin llaves, la flecha devuelve lo que va detrás: la promesa de registrarVisita. Con llaves y
sin return, la llama y no devuelve nada.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2322: Type 'Promise<void>' is not assignable to type 'void | Destructor'.
```

```
TypeError: destroy is not a function
```

Un efecto solo puede devolver nada (void) o su limpieza (Destructor). React guarda lo que
devuelve para llamarlo al limpiar, y en el ensayo de StrictMode intenta llamar a la promesa.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  registrarVisita();
}, []);
```

Con llaves, la flecha llama a registrarVisita y no devuelve nada: la promesa nace dentro y no
la recoge nadie. La visita se registra igual; React recibe undefined, que para él es «sin
limpieza».

</details>

---

## Peldaño 1e — `pedirProyectos`

<details><summary>Pista 1 — conceptual</summary>

fetch no trae los proyectos tal cual. ¿Qué trae? Mira la Teoría B: el sobre.

</details>

<details><summary>Pista 2 — más concreta</summary>

Hacen falta dos esperas: una para la respuesta, y otra para leer su cuerpo con res.json().

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2740: Type 'Response' is missing the following properties from type 'Project[]': length, pop, push, concat, and 35 more.
```

Le dices a TypeScript que data es una lista de proyectos, y fetch te da un Response: no tiene
nada de lo que tiene una lista.

</details>

<details><summary>Solución</summary>

```ts
const res = await fetch(API_PROJECTS);
const data: Project[] = await res.json();
return data;
```

El primer await te da el sobre (Response). El segundo lo abre: res.json() lee el cuerpo, y
ahí sí están los proyectos.

</details>

---

## Peldaño 1f — `nombresDeProyectos`

<details><summary>Pista 1 — conceptual</summary>

TypeScript no se queja porque cree que data ya son nombres. ¿Quién se lo dijo?

</details>

<details><summary>Pista 2 — más concreta</summary>

res.json() es any, y TypeScript se fía de la anotación que pongas. Anota data con lo que de
verdad manda la API, y TypeScript te dirá qué falta para devolver solo los nombres.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ …(2) ] to deeply equal [ 'Projex', 'Smart Cooler' ]
```

El compilador calla: res.json() devuelve any, y un any se deja anotar como cualquier cosa,
también como string[].

</details>

<details><summary>Solución</summary>

```ts
const data: Project[] = await res.json();
return data.map((project) => project.name);
```

Con la anotación verdadera, TypeScript sabe que data son proyectos y no te deja devolverlos
como si fueran nombres. El map se queda con el name de cada uno.

</details>

---

## Peldaño 1g — `pedirOFallar`

<details><summary>Pista 1 — conceptual</summary>

El if detecta bien el 404. Fíjate en qué hace con el Error que construye.

</details>

<details><summary>Pista 2 — más concreta</summary>

return entrega el Error como si fuera un resultado normal: la función termina bien. Para que
falle, el Error hay que lanzarlo.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2740: Type 'Error' is missing the following properties from type 'Project[]': length, pop, push, concat, and 35 more.
```

```
AssertionError: promise resolved "Error: HTTP error — 404" instead of rejecting
```

La función promete devolver una lista de proyectos, y en el 404 devuelve un Error. El test lo
dice con otras palabras: la promesa terminó bien («resolved») en vez de fallar.

</details>

<details><summary>Solución</summary>

```ts
if (!res.ok) {
  throw new Error(`HTTP error — ${res.status}`);
}
```

throw corta la función y la hace fallar con ese Error: quien la espera con await recibe el
error, y si está en un try, salta a su catch.

</details>

---

## Peldaño 1h — `mensajeDeCarga`

<details><summary>Pista 1 — conceptual</summary>

Con la red caída, sigue el camino línea a línea: ¿cuál es la primera que lanza? ¿Está
vigilada?

</details>

<details><summary>Pista 2 — más concreta</summary>

El try solo vigila lo que hay entre sus llaves. La línea que lanza con la red caída está
fuera.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
TypeError: Failed to fetch
```

Es el error de la red caída, que llega hasta el test sin que el catch se entere. El compilador
calla: no hay ningún tipo mal puesto.

</details>

<details><summary>Solución</summary>

```ts
try {
  const res = await fetch(API_PROJECTS);
  const data: Project[] = await res.json();
  return `${data.length} proyectos cargados`;
} catch {
  return "Sin conexión";
}
```

Con el fetch dentro del try, cuando la red cae, la línea que lanza está vigilada, y el catch
devuelve «Sin conexión».

</details>

---

## Peldaño 1i — `cargarConAvisos`

<details><summary>Pista 1 — conceptual</summary>

Con la red caída, ¿qué líneas del try llegan a correr? ¿Está «listo» entre ellas?

</details>

<details><summary>Pista 2 — más concreta</summary>

Hace falta un sitio que corra siempre, después del try y del catch, haya ido bien o mal.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

```
AssertionError: expected [ 'cargando', 'error' ] to deeply equal [ 'cargando', 'error', 'listo' ]
```

Con la red caída, el fetch lanza, el resto del try se salta y corre el catch. «listo» estaba
en lo que se saltó.

</details>

<details><summary>Solución</summary>

```ts
try {
  const res = await fetch(API_PROJECTS);
  const data: Project[] = await res.json();
  avisar(`${data.length} proyectos`);
} catch {
  avisar("error");
} finally {
  avisar("listo");
}
```

finally corre siempre, después del try si fue bien o después del catch si falló. Por eso el
orden es «cargando», «error», «listo».

</details>

---

## Peldaño 1j — `ListaConEspera`

<details><summary>Pista 1 — conceptual</summary>

cargar(); arranca el recado. ¿La línea siguiente espera a que el recado termine?

</details>

<details><summary>Pista 2 — más concreta</summary>

setLoading(false) tiene que correr cuando los datos ya han llegado: dentro de cargar, después
de los await.

</details>

<details><summary>Pista 3 — lo que dicen el test y el lint</summary>

```
TestingLibraryElementError: Unable to find an element with the text: Cargando….
```

```
error  Error: Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect
```

El lint ve un setLoading que corre en el cuerpo del efecto, en el momento, no cuando llega
algo. Es justo lo que pasa: «Cargando…» se apaga antes de que lleguen los datos.

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  const cargar = async () => {
    const res = await fetch(API_PROJECTS);
    const data: Project[] = await res.json();
    setProjects(data);
    setLoading(false);
  };
  cargar();
}, []);
```

La llamada cargar(); no espera: el efecto termina enseguida. Lo que va después de los await
corre más tarde, cuando llega la respuesta, y ahí ya se puede apagar «Cargando…».

</details>

---

## Drill 1 — `ListaDeProyectos`

<details><summary>Pista 1 — conceptual</summary>

El recado está bien escrito: pide, lee y guarda. Lo que falla es quién lo hace. ¿Qué le
devuelve a React la función que le pasas a useEffect?

</details>

<details><summary>Pista 2 — más concreta</summary>

La función del efecto no puede ser async. Declara dentro una función async con el recado y
llámala desde el efecto, como en la sintaxis de la Teoría 1.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el lint</summary>

```
error TS2345: Argument of type '() => Promise<void>' is not assignable to parameter of type 'EffectCallback'.
  Type 'Promise<void>' is not assignable to type 'void | Destructor'.
```

```
warning  Effect callbacks are synchronous to prevent race conditions. Put the async function inside:
error    Error: Calling setState synchronously within an effect can trigger cascading renders
```

El error del lint no es un segundo fallo: el setProjects está bien. Sale por el mismo motivo
que el aviso, y se va con él.

Y el test, en StrictMode, cuando React prueba la limpieza:

```
TypeError: destroy is not a function
```

</details>

<details><summary>Solución</summary>

```tsx
useEffect(() => {
  async function load() {
    const res = await fetch(API_PROJECTS);
    const data: Project[] = await res.json();
    setProjects(data);
    setLoading(false);
  }
  load();
}, []);
```

Una función async devuelve siempre una promesa, y React guarda lo que devuelve el efecto
para llamarlo como limpieza. Con el starter, en el ensayo de StrictMode, React intentaba
llamar a una promesa: `destroy is not a function`. Con load dentro, el efecto no devuelve
nada.

</details>

---

## Drill 2 — `ProyectosSinRed`

<details><summary>Pista 1 — conceptual</summary>

Sigue el camino de la red caída línea a línea: fetch lanza, y el código salta al catch.
¿Qué estado se quedó como estaba?

</details>

<details><summary>Pista 2 — más concreta</summary>

loading tiene que apagarse también en el camino del error: en el catch, o una sola vez en un
finally, que corre en los dos.

</details>

<details><summary>Pista 3 — el dato duro</summary>

```
TestingLibraryElementError: Unable to find role="alert"
```

La pantalla sigue en «Cargando…»: el componente devuelve ese `<p>` antes de llegar al aviso.

</details>

<details><summary>Solución</summary>

```tsx
} catch {
  setError("No se pudieron cargar los proyectos");
  setLoading(false);
}
```

O `finally { setLoading(false); }` y quitarlo del try. Con la red caída, fetch lanza en la
primera línea del try, y todo lo que hay debajo ya no corre: tampoco el setLoading(false).

</details>

---

## Drill 3 — `MotivoDelError`

<details><summary>Pista 1 — conceptual</summary>

El estado error guarda un string, y lo que llega al catch puede ser cualquier cosa. ¿Cómo
compruebas que es un Error antes de leerle el mensaje?

</details>

<details><summary>Pista 2 — más concreta</summary>

Estrecha con instanceof Error, como hiciste con instanceof HTMLElement en el 12. Si lo es,
guarda su message; si no, el texto fijo.

</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

```
error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction<string | null>'.
```

Y el test no encuentra el aviso:

```
TestingLibraryElementError: Unable to find role="alert"
```

porque el render revienta antes. El motivo sale más abajo, en «Unhandled Errors»:

```
Error: Objects are not valid as a React child (found: [object Error]). If you meant to render a collection of children, use an array instead.
```

</details>

<details><summary>Solución</summary>

```tsx
} catch (err) {
  setError(err instanceof Error ? err.message : "Error desconocido");
  setLoading(false);
}
```

Con throw se puede lanzar cualquier cosa: un Error, un string, un número. Por eso
TypeScript tipa err como unknown y no te deja guardarlo como string sin mirarlo antes.

</details>

---

## Drill 4 — `ProyectosQueNoEstan`

<details><summary>Pista 1 — conceptual</summary>

Con el 404, fetch no lanzó: devolvió una respuesta. ¿Qué hay en data cuando el cuerpo es
{ message: "Not found" }, y qué intenta hacer el render con eso?

</details>

<details><summary>Pista 2 — más concreta</summary>

Antes de leer el cuerpo, mira res.ok. Si es false, lanza tú un Error con el status: el catch
ya sabe qué hacer con él.

</details>

<details><summary>Pista 3 — el dato duro</summary>

El test no encuentra el aviso:

```
TestingLibraryElementError: Unable to find role="alert"
```

y más abajo, en «Unhandled Errors», sale por qué:

```
TypeError: projects.map is not a function
```

TypeScript no avisa: res.json() devuelve any, y la anotación `const data: Project[]` se la
cree sin mirar.

</details>

<details><summary>Solución</summary>

```tsx
const res = await fetch(API_PROJECTS);
if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
const data: Project[] = await res.json();
```

fetch solo rechaza si la petición no llega a salir o no vuelve. Un 404 es una respuesta
completa del servidor, con res.ok en false: si no la miras, el cuerpo del error acaba
guardado como si fuera la lista.

</details>

---

## Drill 5 — `useProjects`

<details><summary>Pista 1 — conceptual</summary>

Tienes todas las piezas en los drills 1 a 4. ¿Qué estados necesita el hook, y quién los
cambia?

</details>

<details><summary>Pista 2 — más concreta</summary>

Tres useState (projects, loading en true, error en null), un efecto con [] que llama a una
función async con try, catch y finally, y el return con los tres.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter, el hook devuelve siempre lo mismo:

```
TestingLibraryElementError: Unable to find an element with the text: Projex · Terminado.
```

</details>

<details><summary>Solución</summary>

```tsx
export function useProjects(): { projects: Project[]; loading: boolean; error: string | null } {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_PROJECTS);
        if (!res.ok) throw new Error(`HTTP error — ${res.status}`);
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { projects, loading, error };
}
```

loading empieza en true porque el efecto corre después del primer pintado: con false, ese
primer instante pintaría una lista vacía, como si no tuvieras proyectos.

</details>
