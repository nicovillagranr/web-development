# Pistas — exercise-14 · el formulario de contacto, desde la hoja en blanco

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Aquí `pnpm typecheck` sí habla, y en dos drills es la única herramienta que ve el fallo:
en el 1, si un type es demasiado ancho; en el 3, si el manejador no sirve para los dos
tipos de campo. La pista 3 de cada drill es lo que dicen las herramientas cuando fallan.

---

## Drill 1 — `DatosContacto`, `ErroresContacto` y `CONTACTO_VACIO`

<details><summary>Pista 1 — conceptual</summary>

Piensa en qué significa que a cada caja le falte un campo.

A los datos les falta el mensaje: eso es un formulario roto. A los errores les falta el
del mensaje: eso es lo normal, quiere decir que el mensaje está bien. Las dos cajas
hablan de los mismos tres campos, pero no les exigen lo mismo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Los datos: tres propiedades de texto, obligatorias. Los errores: esas mismas tres, cada
una **opcional**.

Y la constante lleva su type anotado. Sin la anotación, TypeScript deduce la forma a
partir del valor, y no se entera de que esos tres campos en blanco son un `DatosContacto`.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter, `pnpm typecheck` señala el archivo de test, porque es quien importa los
dos types:

```
exercise-14.test.tsx(5,15): error TS2305: Module '"./exercise-14"' has no exported member 'DatosContacto'.
exercise-14.test.tsx(5,30): error TS2305: Module '"./exercise-14"' has no exported member 'ErroresContacto'.
```

Cuando ya existen pero alguno es demasiado ancho, el error cambia:

```
exercise-14.test.tsx(25,5): error TS2578: Unused '@ts-expect-error' directive.
exercise-14.test.tsx(28,5): error TS2578: Unused '@ts-expect-error' directive.
```

Se lee al revés de lo que parece: la línea 26 intenta crear unos datos sin `message`, y la
29 unos errores con un campo inventado. Las dos **deberían** fallar al compilar. Si tu type
se las traga, la directiva de encima se queda sin trabajo y TypeScript avisa de que sobra.

Y el test, sobre la constante:

```
AssertionError: expected {} to deeply equal { name: '', email: '', message: '' }
```

</details>

<details><summary>Solución</summary>

```ts
export type DatosContacto = { name: string; email: string; message: string };
export type ErroresContacto = { name?: string; email?: string; message?: string };

export const CONTACTO_VACIO: DatosContacto = { name: "", email: "", message: "" };
```

Los dos types tienen las mismas claves, y lo único que cambia es el `?`: esa interrogación
es toda la diferencia entre "siempre está llena" y "casi siempre está vacía".

`ErroresContacto` también se puede escribir como `Partial<DatosContacto>`, que coge un type
y le pone `?` a todas sus claves. Hace lo mismo, y además no se desincroniza si mañana el
formulario gana un campo.

</details>

---

## Drill 2 — `validarContacto`

<details><summary>Pista 1 — conceptual</summary>

Cada campo se hace dos preguntas **en orden**, y la segunda solo tiene sentido si la
primera pasó: no tiene gracia decir que un nombre en blanco es corto.

Pero los campos no dependen unos de otros. Que falle el nombre no impide mirar el correo.

</details>

<details><summary>Pista 2 — más concreta</summary>

Una caja de errores que arranca vacía, con su type. Después, tres bloques seguidos, uno por
campo, cada uno con su `if` y su `else if`. Los bloques no se encadenan entre sí.

"En blanco" se mira sobre el texto sin espacios de los bordes. La longitud, como en Projex,
sobre el texto tal cual.

Y el parámetro deja de ser `unknown`: con `unknown` no puedes leerle ningún campo.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter, el test falla así en los dos primeros casos:

```
AssertionError: expected {} to deeply equal { …(3) }
```

Debajo imprime la comparación: el `-` es lo que esperaba (los tres avisos) y el `+` lo que
devolvió tu función. El tercer caso, *"con todo bien, un objeto sin claves"*, ya pasa con el
starter, y tiene que seguir pasando cuando escribas las reglas.

</details>

<details><summary>Solución</summary>

```ts
export function validarContacto(datos: DatosContacto): ErroresContacto {
  const errores: ErroresContacto = {};

  if (datos.name.trim() === "") errores.name = "El nombre es obligatorio";
  else if (datos.name.length < 2) errores.name = "El nombre debe tener al menos 2 caracteres";

  if (datos.email.trim() === "") errores.email = "El correo es obligatorio";
  else if (!FORMA_DE_CORREO.test(datos.email)) errores.email = "El correo no es válido";

  if (datos.message.trim() === "") errores.message = "El mensaje es obligatorio";
  else if (datos.message.length < 10)
    errores.message = "El mensaje debe tener al menos 10 caracteres";

  return errores;
}
```

El `else if` es lo que garantiza "como mucho un aviso por campo": si la primera pregunta ya
falló, la segunda no llega a hacerse. Y como los tres bloques van sueltos, un formulario en
blanco devuelve los tres avisos de golpe, no solo el primero.

</details>

---

## Drill 3 — `FormularioContacto`

<details><summary>Pista 1 — conceptual</summary>

Es el `Login` del `12b` con un campo más, y ese campo no es un `<input>`.

Lo que cambia no está en el JSX, está en el manejador: ahora le llegan eventos de dos
tipos de elemento distintos.

</details>

<details><summary>Pista 2 — más concreta</summary>

El evento del manejador tiene que admitir los dos elementos: una **unión** dentro de
`ChangeEvent<…>`.

Al enviar, en este orden: pedirle los errores a `validarContacto`, guardarlos **siempre**
(también cuando vienen vacíos, o los avisos del envío anterior se quedan en pantalla) y,
solo si no hay ninguno, volver a `CONTACTO_VACIO`.

Para saber si hay alguno, acuérdate del `12`: un objeto vacío no es `false`, y
`errores !== {}` no compara lo que parece.

</details>

<details><summary>Pista 3 — el dato duro</summary>

Con el starter no hay nada en pantalla, así que el test falla al buscar el primer campo:

```
TestingLibraryElementError: Unable to find a label with the text of: Nombre
```

Si el mensaje es un `<input>` en vez de un `<textarea>`:

```
AssertionError: expected 'INPUT' to be 'TEXTAREA' // Object.is equality
```

Y si el manejador solo admite `<input>`, los tests pasan y quien protesta es
`pnpm typecheck`, en el `onChange` del `<textarea>`:

```
error TS2322: Type '(e: ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement>'.
```

Dicho en claro: le estás dando al `<textarea>` un manejador que solo sabe tratar con
`<input>`.

</details>

<details><summary>Solución</summary>

```tsx
export function FormularioContacto() {
  const [datos, setDatos] = useState<DatosContacto>(CONTACTO_VACIO);
  const [errores, setErrores] = useState<ErroresContacto>({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const alEnviar = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encontrados = validarContacto(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;
    setDatos(CONTACTO_VACIO);
  };

  return (
    <form onSubmit={alEnviar} noValidate>
      <label htmlFor="contacto-nombre">Nombre</label>
      <input id="contacto-nombre" type="text" name="name" value={datos.name} onChange={alEscribir} />
      {errores.name !== undefined && <p role="alert">{errores.name}</p>}

      <label htmlFor="contacto-correo">Correo</label>
      <input id="contacto-correo" type="email" name="email" value={datos.email} onChange={alEscribir} />
      {errores.email !== undefined && <p role="alert">{errores.email}</p>}

      <label htmlFor="contacto-mensaje">Mensaje</label>
      <textarea id="contacto-mensaje" name="message" rows={6} value={datos.message} onChange={alEscribir} />
      {errores.message !== undefined && <p role="alert">{errores.message}</p>}

      <button type="submit">Enviar mensaje</button>
    </form>
  );
}
```

Con los imports `import { useState } from "react"` y
`import type { ChangeEvent, SubmitEvent } from "react"`. En los archivos anteriores viste
`FormEvent` para el envío. Sigue funcionando, pero la versión de React del cuaderno lo marca
como obsoleto, y el que le corresponde a un `onSubmit` es `SubmitEvent`.

**Las dos condiciones que no ve ninguna herramienta**, y que se comprueban leyendo:

- **Un solo manejador para los tres campos.** Con tres, los tests pasan igual, pero te
  saltas la unión, que es la pieza que vas a necesitar en Projex.
- **`CONTACTO_VACIO` aparece dos veces**, al arrancar y al vaciar, y el valor en blanco no se
  vuelve a escribir a mano. Si mañana el formulario gana un campo, se añade en un solo
  sitio.

</details>
