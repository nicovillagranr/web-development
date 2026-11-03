# Pistas — exercise-01 · pedir datos en un efecto

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Además, al 1 lo marcan el compilador y el lint, y al 3
el compilador: su Pista 3 cita esos mensajes. El 2, el 4 y el 5 solo los marca el test.

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
