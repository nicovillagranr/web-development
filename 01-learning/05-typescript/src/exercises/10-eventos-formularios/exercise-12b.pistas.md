# Pistas — exercise-12b · los mismos formularios, sin esqueleto

Cuatro niveles por drill. Ábrelas **de una en una** y vuelve al archivo entre una y la
siguiente: si abres tres seguidas, te has leído la solución sin darte cuenta.

Este archivo no tiene errores de tipos esperándote: toda la señal está en
`pnpm test:run`. Aun así corre `pnpm typecheck` antes de dar un drill por bueno.

---

## Drill 1 — `validarCredenciales` y `Login`

<details><summary>Pista 1 — conceptual</summary>

Son dos piezas con dos trabajos que no se pisan.

La función **no sabe nada de React**: le entra un objeto con los datos y le sale un
objeto con los errores. Podrías llamarla desde una consola.

El componente **no sabe nada de las reglas**: guarda lo que el usuario escribe y, al
enviar, le pregunta a la función. Si te encuentras escribiendo un `if (email === "")`
dentro del componente, las dos piezas se te cruzaron.

Empieza por la función: es la mitad que puedes probar sin pintar nada.
</details>

<details><summary>Pista 2 — más concreta</summary>

La función es el `validar` del drill 8 del `12`, pero con las reglas dentro en vez de
repartidas: arranca de un objeto de errores vacío **anotado con su type**, le mete la
clave que toque y lo devuelve.

El componente son cuatro cosas, y las cuatro las escribiste en el drill 10 del `12`:

- dos estados, uno por objeto, cada uno con su type entre picos
- un manejador de cambio que actualiza **una sola clave** del objeto de datos, la que
  diga el `name` del campo que lo disparó
- un manejador de envío que corta el refresco del navegador y guarda lo que devuelve la
  función de arriba
- un aviso por campo, que solo existe si esa clave está en el objeto de errores

Ojo con la clave: 8 caracteres **sí** valen. El que falla es el de 7.
</details>

<details><summary>Pista 3 — el dato duro</summary>

Mientras el componente devuelva `null`, el test dice esto:

```
Unable to find an accessible element with the role "button" and name "Entrar"
```

No es que el botón esté mal escrito: es que todavía no hay nada en pantalla.

Y el dato que decide la regla de la clave: **menos de 8** es error. Con `"12345678"`
(ocho) el objeto de errores tiene que salir sin la clave `clave`.

Para el manejador de cambio, el atributo del `<input>` que te dice qué clave tocar es
`name`, y llega en `e.target.name`.
</details>

<details><summary>Solución</summary>

```tsx
export function validarCredenciales(datos: Credenciales): ErroresLogin {
  const errores: ErroresLogin = {};
  if (datos.email === "") errores.email = "El email es obligatorio";
  if (datos.clave.length < 8) errores.clave = "La clave necesita 8 caracteres";
  return errores;
}

export function Login() {
  const [datos, setDatos] = useState<Credenciales>({ email: "", clave: "" });
  const [errores, setErrores] = useState<ErroresLogin>({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validarCredenciales(datos));
  };

  return (
    <form onSubmit={alEnviar}>
      <input name="email" aria-label="Email" value={datos.email} onChange={alEscribir} />
      {errores.email !== undefined && <p role="alert">{errores.email}</p>}
      <input name="clave" aria-label="Clave" value={datos.clave} onChange={alEscribir} />
      {errores.clave !== undefined && <p role="alert">{errores.clave}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
}
```

Los avisos se preguntan con `!== undefined` y no con un `if (errores.email)` porque una
clave que no está y un mensaje vacío son cosas distintas — la trampa de la TEORÍA 2
del `12`.
</details>

---

## Drill 2 — `validarProducto` y `AltaProducto`

<details><summary>Pista 1 — conceptual</summary>

El `type="number"` es una instrucción para el **navegador**: pon flechitas, saca el
teclado numérico en el móvil, no dejes teclear letras. No cambia nada de lo que pasa
después.

Lo que llega a tu manejador sale de una caja de texto, y sale como lo que es. Por eso el
type de arriba dice `precio: string` — no es un descuido, es la verdad del DOM.

Así que antes de preguntar *"¿es mayor que 0?"* tienes que hacer algo con ese valor.
</details>

<details><summary>Pista 2 — más concreta</summary>

Comparar un texto con un número no te va a dejar: pásalo a número primero, y compara
después.

Y ahora el caso que el enunciado te avisa y que se escapa siempre: **el campo en
blanco**. Antes de escribir la condición, contesta esto de cabeza — ¿qué número sale de
convertir la cadena vacía? Si tu regla es "menor o igual que 0", ¿la cadena vacía entra
por ahí o se escapa?

El resto del componente es calcado al drill 1. Lo único distinto es ese campo.
</details>

<details><summary>Pista 3 — el dato duro</summary>

```js
Number("") === 0; // true  ← el campo en blanco pasa a ser un cero
Number("25") === 25; // true
```

Es decir: el campo vacío **cae solo** por la misma regla que el 0, sin necesidad de un
`if` aparte para él.

Y el mensaje del test mientras el componente devuelva `null`:

```
Unable to find a label with the text of: Nombre
```
</details>

<details><summary>Solución</summary>

```tsx
export function validarProducto(datos: Producto): ErroresProducto {
  const errores: ErroresProducto = {};
  if (datos.nombre === "") errores.nombre = "El nombre es obligatorio";
  if (Number(datos.precio) <= 0) errores.precio = "El precio tiene que ser mayor que 0";
  return errores;
}
```

El componente es el del drill 1 cambiando los nombres, con el campo del precio así:

```tsx
<input
  type="number"
  name="precio"
  aria-label="Precio"
  value={datos.precio}
  onChange={alEscribir}
/>
```

Fíjate en que el manejador de cambio es **el mismo** para los dos campos, sin tocar
nada: como guarda por `e.target.name`, le da igual que uno sea de texto y el otro
numérico. Los dos le entregan `e.target.value` y los dos son `string`.
</details>

---

## Drill 3 — `validarAlta` y `AltaConTerminos`

<details><summary>Pista 1 — conceptual</summary>

Una casilla de verificación no guarda texto: guarda un sí o un no. Y eso se nota en tres
sitios a la vez.

- en el type: `acepta` no es `string`
- en lo que te da el evento: `e.target.value` de una casilla no te sirve de nada
- en el JSX: el atributo que la pinta marcada no es el mismo que llena un campo de texto

Los otros dos drills tenían un manejador para todos los campos porque todos guardaban lo
mismo. Aquí no todos guardan lo mismo.
</details>

<details><summary>Pista 2 — más concreta</summary>

El evento de una casilla trae el sí/no en **otra propiedad** de `e.target`, hermana de
`value`, y su tipo ya es `boolean`: no hay que convertir nada.

En el JSX, una casilla controlada se ata con el atributo que dice si está marcada, no con
el que lleva texto.

Y como el nombre guarda un `string` y la casilla un `boolean`, el manejador único de los
drills 1 y 2 se te queda corto. La salida más simple —y la que se lee mejor— es tener dos
manejadores pequeños, uno por campo.

La validación no tiene truco: la casilla falla cuando **no** está marcada.
</details>

<details><summary>Pista 3 — el dato duro</summary>

La propiedad es `e.target.checked`, y el atributo del JSX es `checked`:

```tsx
<input type="checkbox" checked={datos.acepta} onChange={alMarcar} />
```

El test lo comprueba con `toBeChecked()`, que mira exactamente ese atributo. Si atas la
casilla con `value` en vez de con `checked`, React no la controla y el test lo canta.
</details>

<details><summary>Solución</summary>

```tsx
export function validarAlta(datos: Alta): ErroresAlta {
  const errores: ErroresAlta = {};
  if (datos.nombre === "") errores.nombre = "El nombre es obligatorio";
  if (!datos.acepta) errores.acepta = "Tienes que aceptar los términos";
  return errores;
}

export function AltaConTerminos() {
  const [datos, setDatos] = useState<Alta>({ nombre: "", acepta: false });
  const [errores, setErrores] = useState<ErroresAlta>({});

  const alEscribirNombre = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, nombre: e.target.value });
  };

  const alMarcar = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, acepta: e.target.checked });
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validarAlta(datos));
  };

  return (
    <form onSubmit={alEnviar}>
      <input aria-label="Nombre" value={datos.nombre} onChange={alEscribirNombre} />
      {errores.nombre !== undefined && <p role="alert">{errores.nombre}</p>}
      <input
        type="checkbox"
        aria-label="Acepto los términos"
        checked={datos.acepta}
        onChange={alMarcar}
      />
      {errores.acepta !== undefined && <p role="alert">{errores.acepta}</p>}
      <button type="submit">Registrarme</button>
    </form>
  );
}
```

`if (!datos.acepta)` sí es un falsy check, y aquí está bien: `acepta` es un `boolean`,
así que sus dos únicos valores son los dos que te interesan. El `||` del `12` daba
problemas porque `string | undefined` tiene **tres** casos, no dos.

Los dos manejadores por separado evitan tener que preguntar dentro qué clase de campo
disparó el evento. Cuando los campos son muchos y mezclados, esa pregunta se hace
inevitable — pero eso es otro archivo.
</details>
