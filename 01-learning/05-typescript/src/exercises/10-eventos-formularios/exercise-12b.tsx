/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — la pareja de objetos que ya montaste en el `12`
 *
 *     const datos:   Credenciales = { email: "nico@mail.cl", clave: "12345678" }
 *     const errores: ErroresLogin = { clave: "La clave necesita 8 caracteres" }
 *
 * Los tres formularios de aquí tienen esa misma pareja: uno con TODAS sus claves
 * siempre, y otro que casi siempre está vacío. Cada drill trae la suya.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { FormEvent } from "react";
import type { ChangeEvent } from "react";

/* =============================================================================
 * 12b · LOS MISMOS FORMULARIOS, SIN ESQUELETO
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · montar de cero un formulario con estado en objeto, validación al enviar y
 *     avisos que solo existen cuando hay error
 *   · dejar la regla en una función aparte y el componente limitado a pintarla
 *   · decir qué te entrega `e.target` en un campo de texto, en uno numérico y en
 *     una casilla de verificación
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el `12` arreglabas esqueletos ajenos: el cuerpo ya estaba, con un fallo dentro.
 * Aquí no hay cuerpo. Es el mismo formulario tres veces, y lo único que cambia entre
 * uno y otro es qué te da `e.target` según el campo que lo dispara.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva: todo lo que hace falta está en el `11` y el `12`. Cada drill son
 * dos piezas —la función que decide y el componente que pinta—, y se escriben las dos.
 *   drill 1 · dos campos de texto  →  el `12` otra vez, desde la hoja en blanco
 *   drill 2 · un campo numérico    →  lo que teclea el usuario y lo que validas
 *   drill 3 · una casilla          →  el campo que no guarda texto
 *
 * ▸ EJERCICIO — 3 formularios, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-12b.test.tsx
 *     pnpm typecheck
 *
 *   Los starters no están rotos: están VACÍOS. Tienes los types y las firmas; los
 *   cuerpos son tuyos, y el `_` de un parámetro solo marca que ahí todavía no se usa
 *   (al escribir el cuerpo, se lo quitas). El archivo arranca SIN imports: vas a
 *   necesitar `useState`, y `ChangeEvent` y `FormEvent` para tipar los manejadores —
 *   esos dos entran con `import type`. Toda la señal está en el test.
 *   ¿Atascado? Las pistas están en `exercise-12b.pistas.md`, de una en una.
 * ===========================================================================*/

// 📌 Los dos types del drill 1:
type Credenciales = { email: string; clave: string };
type ErroresLogin = { email?: string; clave?: string };

// 1) `validarCredenciales` y `Login`, un formulario de acceso.
//    La regla: email vacío da "El email es obligatorio";
//    clave de menos de 8 caracteres, "La clave necesita 8 caracteres". Sin fallos, un objeto sin claves.
//    El formulario: dos campos de texto con `aria-label` "Email" y "Clave", vacíos al
//    arrancar, y un botón "Entrar". No se valida al escribir, solo al enviar, y cada
//    aviso va en un `<p role="alert">` que existe únicamente si ese campo falla.
//    Restricción: el componente no reescribe las reglas, se las pide a la función.
export function validarCredenciales(datos: Credenciales): ErroresLogin {
  const errores: ErroresLogin = {};
  if (datos.email.trim() === "") errores.email = "El email es obligatorio";
  else if (!datos.email.includes("@")) errores.email = "El email necesita un @";
  if (datos.clave.length < 8) errores.clave = "La clave necesita 8 caracteres";
  return errores;
}
// validarCredenciales({ email: "", clave: "" }) -> { email: "El email es obligatorio", clave: "La clave necesita 8 caracteres" }
// validarCredenciales({ email: "n@m.cl", clave: "12345678" }) -> {}
// validarCredenciales({email: "holacomoestas", clave: "12345678"}) -> { email: "El email necesita un @" }

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
    <>
      <form onSubmit={alEnviar}>
        <input
          placeholder="Ingrese su correo electrónico"
          type="text"
          name="email"
          aria-label="Email"
          value={datos.email}
          onChange={alEscribir}
        />
        {errores.email !== undefined && <p role="alert">{errores.email}</p>}

        <input
          placeholder="Ingrese su contraseña"
          type="password"
          name="clave"
          aria-label="Clave"
          value={datos.clave}
          onChange={alEscribir}
        />
        {errores.clave !== undefined && <p role="alert">{errores.clave}</p>}

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
// <Login />

// 📌 Los dos types del drill 2. Mira bien de qué tipo es `precio`:
type Producto = { nombre: string; precio: string };
type ErroresProducto = { nombre?: string; precio?: string };

// 2) `validarProducto` y `AltaProducto`, el alta de un artículo.
//    El precio es un `<input type="number">`: el navegador le pone flechitas y te sigue
//    entregando lo tecleado como texto, y por eso su type dice `string`.
//    La regla: nombre vacío da "El nombre es obligatorio"; un precio que no sea mayor
//    que 0, "El precio tiene que ser mayor que 0" — ojo, el campo en blanco también.
//    El formulario: `aria-label` "Nombre" y "Precio", botón "Crear", y las mismas reglas
//    de juego del drill 1.
export function validarProducto(datos: Producto): ErroresProducto {
  const errores: ErroresProducto = {};
  // Si el input del nombre está vacío, agrego un error al objeto de errores.
  if (datos.nombre.trim() === "") errores.nombre = "El nombre es obligatorio";

  // Del string -> transformamos el valor a number
  const precio = Number(datos.precio);

  // Si el precio no es un número o es menor o igual a 0, agrego un error al objeto de errores.
  if (isNaN(precio) || precio <= 0) errores.precio = "El precio tiene que ser mayor que 0";

  // Retornamos el objeto de errores. Si no hay errores, será un objeto vacío.
  return errores;
}
// validarProducto({ nombre: "Teclado", precio: "" }) -> { precio: "El precio tiene que ser mayor que 0" }
// validarProducto({ nombre: "Teclado", precio: "25" }) -> {}

export function AltaProducto() {
  const [datos, setDatos] = useState<Producto>({ nombre: "", precio: "" });
  const [errores, setErrores] = useState<ErroresProducto>({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validarProducto(datos));
  };

  return (
    <>
      <form onSubmit={alEnviar}>
        <input
          placeholder="Ingrese el nombre del producto"
          type="text"
          name="nombre"
          aria-label="Nombre"
          value={datos.nombre}
          onChange={alEscribir}
        />
        {errores.nombre !== undefined && <p role="alert">{errores.nombre}</p>}
        <input
          placeholder="Ingrese el precio del producto"
          type="number"
          name="precio"
          aria-label="Precio"
          value={datos.precio}
          onChange={alEscribir}
        />
        {errores.precio !== undefined && <p role="alert">{errores.precio}</p>}
        <button type="submit">Crear</button>
      </form>
    </>
  );
}
// <AltaProducto />

// 📌 Los dos types del drill 3. `acepta` no guarda texto:
type Alta = { nombre: string; acepta: boolean };
type ErroresAlta = { nombre?: string; acepta?: string };

// 3) `validarAlta` y `AltaConTerminos`, un registro con condiciones.
//    Una casilla no guarda lo que el usuario escribe, guarda si está marcada, y
//    `e.target` lo entrega en una propiedad distinta de la de los campos de texto.
//    La regla: nombre vacío da "El nombre es obligatorio"; la casilla sin marcar,
//    "Tienes que aceptar los términos".
//    El formulario: `aria-label` "Nombre", una casilla `aria-label` "Acepto los términos"
//    desmarcada al arrancar, y un botón "Registrarme".
export function validarAlta(datos: Alta): ErroresAlta {
  const errores: ErroresAlta = {};
  if (datos.nombre.trim() === "") errores.nombre = "El nombre es obligatorio";
  if (!datos.acepta) errores.acepta = "Tienes que aceptar los términos";
  return errores;
}
// validarAlta({ nombre: "Nico", acepta: false }) -> { acepta: "Tienes que aceptar los términos" }
// validarAlta({ nombre: "Nico", acepta: true }) -> {}

export function AltaConTerminos() {
  const [datos, setDatos] = useState<Alta>({ nombre: "", acepta: false });
  const [errores, setErrores] = useState<ErroresAlta>({});

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDatos({ ...datos, [e.target.name]: valor });
  };

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrores(validarAlta(datos));
  };

  return (
    <>
      <form onSubmit={alEnviar}>
        <input
          placeholder="Ingrese su nombre"
          type="text"
          name="nombre"
          aria-label="Nombre"
          value={datos.nombre}
          onChange={alEscribir}
        />
        {errores.nombre !== undefined && <p role="alert">{errores.nombre}</p>}
        <input
          type="checkbox"
          name="acepta"
          aria-label="Acepto los términos"
          checked={datos.acepta}
          onChange={alEscribir}
        />
        {errores.acepta !== undefined && <p role="alert">{errores.acepta}</p>}
        <button type="submit">Registrarme</button>
      </form>
    </>
  );
}
// <AltaConTerminos />

/* ─────────────────────────────────────────────────────────────────────────────
 * Si los tres te salieron sin volver al `12`, el formulario ya no es un patrón que
 * copias: es uno que sabes montar. Lo que le falta al `Login` para parecerse al de
 * verdad es qué pasa MIENTRAS se envía, y eso es el `13`.
 * ───────────────────────────────────────────────────────────────────────────── */
