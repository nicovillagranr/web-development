# Pistas — exercise-04 · validar con Zod

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente.

Los cinco salen rojos en el test. Al 2, al 3 y al 5 los marca además el compilador, y su
Pista 3 cita ese mensaje. Al 1 y al 4, solo el test.

---

## Drill 1 — `ContactoSchema`

<details><summary>Pista 1 — conceptual</summary>

El schema es una descripción de cómo llegan los datos. Compara campo por campo el ejemplo
del enunciado con lo que dice el schema.

</details>

<details><summary>Pista 2 — más concreta</summary>

En el ejemplo, years llega como 2, sin comillas. El schema espera otra cosa para ese campo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: para TypeScript, el schema es un schema válido, describa lo que
describa.

```
ZodError: [
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "years"
    ],
    "message": "Invalid input: expected string, received number"
  }
]
```

Así se lee un ZodError: path dice qué campo falló, y message, qué esperaba y qué recibió.

</details>

<details><summary>Solución</summary>

```ts
years: z.number(),
```

.parse no mira el tipo de TypeScript: compara los datos con el schema, al ejecutar. Si el
schema describe mal los datos, rechaza datos buenos.

</details>

---

## Drill 2 — `leerPerfil`

<details><summary>Pista 1 — conceptual</summary>

unknown significa «no sé qué es». ¿Qué tiene que pasar antes de poder tratar data como un
Profile? Mira la SINTAXIS de la Teoría 1.

</details>

<details><summary>Pista 2 — más concreta</summary>

Ya hay un schema que describe un Profile, arriba del todo. Su .parse recibe unknown y
devuelve un Profile, o lanza.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2322: Type 'unknown' is not assignable to type '{ name: string; role: string; }'.
```

`{ name: string; role: string; }` es Profile: es lo que sale de z.infer.

```
AssertionError: expected [Function] to throw an error
```

El perfil sin role pasó sin más: nadie lo comprobó.

</details>

<details><summary>Solución</summary>

```ts
return ProfileSchema.parse(data);
```

.parse es la puerta entre unknown y Profile: comprueba al ejecutar, y por eso TypeScript se
fía de lo que devuelve. Es lo mismo que hace tu unknown del 4a del 02 con instanceof, pero
con un objeto entero.

</details>

---

## Drill 3 — `ciudadDe`

<details><summary>Pista 1 — conceptual</summary>

.parse no te devuelve data: te devuelve otra cosa. ¿Qué claves tiene esa otra cosa?

</details>

<details><summary>Pista 2 — más concreta</summary>

z.object se queda solo con las claves que declaraste y descarta las demás (la ⚠️ TRAMPA de la
Teoría 1). Si necesitas based, el schema tiene que nombrarlo.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2339: Property 'based' does not exist on type '{ name: string; role: string; }'.
```

```
AssertionError: expected undefined to be 'Santiago, CL' // Object.is equality
```

Los dos dicen lo mismo, cada uno a su manera: TypeScript, porque el tipo sale del schema;
el test, porque .parse descartó based al ejecutar.

</details>

<details><summary>Solución</summary>

```ts
export const PerfilConCiudadSchema = z.object({ name: z.string(), role: z.string(), based: z.string() });
```

Al añadirlo al schema, lo arreglas en los dos sitios a la vez: z.infer da un tipo con based,
y .parse lo conserva. Una fuente para los dos.

</details>

---

## Drill 4 — `pedirProyectosValidados`

<details><summary>Pista 1 — conceptual</summary>

`const data: Project[] = …` es una promesa tuya a TypeScript, no una comprobación. ¿Qué
pieza de la Teoría 1 sí comprueba?

</details>

<details><summary>Pista 2 — más concreta</summary>

Lo que llega de res.json() tiene que pasar por el schema de la lista, que es un z.array del
de un proyecto, antes de devolverlo.

</details>

<details><summary>Pista 3 — lo que dice el test</summary>

El compilador calla: el tipo anotado encaja, porque .json() devuelve any.

```
AssertionError: promise resolved "[ { id: 1, name: 'Projex' } ]" instead of rejecting
```

El proyecto sin status salió como si fuera un Project.

</details>

<details><summary>Solución</summary>

```ts
return ProjectsSchema.parse(await res.json());
```

Ahora el que se entera es el fetch, en cuanto llega la respuesta: el ZodError sale por el
mismo camino que un 404. Es tu ProjectsSchema.parse de usePortfolioData (l.67).

</details>

---

## Drill 5 — `usePortfolioValidado`

<details><summary>Pista 1 — conceptual</summary>

pedirJson ya no finge un tipo: devuelve unknown. ¿Qué tiene que pasar entre lo que llega y
el set del estado?

</details>

<details><summary>Pista 2 — más concreta</summary>

Cada uno por su schema: la lista por ProjectsSchema y el perfil por ProfileSchema. Dentro del
try, para que un ZodError caiga en el catch que ya está. Mejor si validas los dos antes de
guardar ninguno: así la pantalla tampoco queda a medias.

</details>

<details><summary>Pista 3 — lo que dicen el compilador y el test</summary>

```
error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction<{ id: number; name: string; status: string; }[]>'.
error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction<{ name: string; role: string; } | null>'.
```

SetStateAction es lo que acepta un set: el valor nuevo, o una función que lo calcula. unknown
no encaja en ninguno.

```
TestingLibraryElementError: Unable to find role="alert"
```

Con el perfil sin role no salió el aviso: se pintó la portada con el rol vacío.

</details>

<details><summary>Solución</summary>

```ts
const [lista, perfil] = await Promise.all([
  pedirJson(API_PROJECTS, controller.signal),
  pedirJson(API_PROFILE, controller.signal),
]);
const projectsOk = ProjectsSchema.parse(lista);
const profileOk = ProfileSchema.parse(perfil);
setProjects(projectsOk);
setProfile(profileOk);
```

Si un .parse lanza, es como cualquier otro error dentro del try: el catch ve que no fue una
cancelación y lo guarda en error. Es tu usePortfolioData (l.66-69 y l.89-92) sin el timeout
ni el snapshot: allí fetchLive devuelve los dos ya validados, y después se guardan.

</details>
