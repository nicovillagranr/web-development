import { useState } from "react";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — las dos cajas del formulario de contacto de Projex
 *
 *     datos    { name: "Nico", email: "nico@mail.cl", message: "Quiero una landing" }
 *     errores  { email: "El correo no es válido" }
 *
 * La primera lleva siempre sus tres campos. La segunda casi siempre está vacía, y cuando
 * no, trae solo los campos que fallan. En Projex la segunda nació sin forma, y de ahí
 * salen 12 de los 21 errores de tipos de su `07-Contact`.
 * ───────────────────────────────────────────────────────────────────────────── */

/* =============================================================================
 * 14 · EL FORMULARIO DE CONTACTO, DESDE LA HOJA EN BLANCO · capstone, parte 1 de 2
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · darle forma a la caja que siempre está llena y a la que casi siempre está vacía
 *   · escribir el `ContactForm` de Projex en TypeScript sin copiar de ningún drill
 *   · usar un mismo valor para arrancar el formulario y para vaciarlo
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * Lo pediste al cerrar el `12`: un formulario entero desde cero, sin esqueleto que
 * rellenar. Tiene la forma del `ContactForm` de Projex, y lo que escribas aquí es lo que
 * después vas a llevar a su `07-Contact`. Va en dos partes: aquí, el formulario que
 * valida; en el `14b`, el que envía.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva: todo está en el `11`, el `12` y el `12b`.
 *   drill 1 · las dos cajas y el valor con el que arranca el formulario
 *   drill 2 · las reglas, en una función que no sabe nada de React
 *   drill 3 · el componente, que pinta y le pregunta a la función
 *
 * ▸ EJERCICIO — 3 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-14.test.tsx
 *     pnpm typecheck
 *
 *   No hay starters rotos: solo los nombres que busca el test. Los types, los imports y
 *   los cuerpos son tuyos; `unknown` marca dónde va un type tuyo, y `_`, un parámetro que
 *   aún no se usa. Un type mal puesto no rompe ningún test, así que corre siempre los dos
 *   comandos; y hay dos condiciones del enunciado que no ve ninguna herramienta.
 *   ¿Atascado? Las pistas están en `exercise-14.pistas.md`, de una en una.
 * ===========================================================================*/

/* La forma de un correo, sacada tal cual del `ContactValidation` de Projex. Aquí no se
 * toca: `FORMA_DE_CORREO.test(texto)` devuelve `true` si el texto encaja. */
export const FORMA_DE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 1) `DatosContacto`, `ErroresContacto` y `CONTACTO_VACIO` — las dos cajas del formulario
//    y el valor con el que arranca. Los datos llevan siempre sus tres campos, `name`,
//    `email` y `message`, los tres de texto; los errores pueden traer cualquiera de esos
//    tres, o ninguno. Los dos types se exportan, porque el test los importa.
//    `CONTACTO_VACIO` son los datos con los tres campos en blanco, y es el único sitio
//    del archivo donde se escribe ese valor.

// Definimos los tipos de datos que recibirá el formulario de contacto
export type DatosContacto = {
  name: string;
  email: string;
  message: string;
};
// Definimos los posibles errores que pueden surgir en el formulario de contacto, <Partial> hace que todos los datos sean opcionales
export type ErroresContacto = Partial<DatosContacto>;

// Definimos un objeto que representa un contacto vacío, con todos los campos en blanco
export const CONTACTO_VACIO: DatosContacto = {
  name: "",
  email: "",
  message: "",
};

// 2) `validarContacto` — las reglas del `ContactForm` de Projex, tal cual. Cada campo da
//    como mucho un aviso: el primero que falle. En blanco (los espacios no cuentan):
//    "El nombre es obligatorio", "El correo es obligatorio", "El mensaje es obligatorio".
//    Si no están en blanco: un nombre de menos de 2 caracteres, "El nombre debe tener al
//    menos 2 caracteres"; un correo que no encaje en `FORMA_DE_CORREO`, "El correo no es
//    válido"; un mensaje de menos de 10, "El mensaje debe tener al menos 10 caracteres".
//    Sin fallos, un objeto sin claves.

// Para validar la data creamos una función
export function validarContacto(contacto: DatosContacto): ErroresContacto {
  // Iremos metiendo los errores en un objeto vacío de tipo ErroresContacto
  const errores: ErroresContacto = {};

  switch (true) {
    case contacto.name.trim() === "":
      errores.name = "El nombre es obligatorio"; // Llenamos el objeto
      break;

    case contacto.name.trim().length < 2:
      errores.name = "El nombre debe tener al menos 2 caracteres"; // Llenamos el objeto
      break;
  }

  switch (true) {
    case contacto.email.trim() === "":
      errores.email = "El correo es obligatorio"; // Llenamos el objeto
      break;

    case !FORMA_DE_CORREO.test(contacto.email): // Si la forma de correo que pedimos NO ES VÁLIDA, entonces llenamos el objeto con el error
      errores.email = "El correo no es válido"; // Llenamos el objeto
      break;
  }

  switch (true) {
    case contacto.message.trim() === "":
      errores.message = "El mensaje es obligatorio"; // Llenamos el objeto
      break;

    case contacto.message.trim().length < 10:
      errores.message = "El mensaje debe tener al menos 10 caracteres"; // Llenamos el objeto
      break;
  }

  return errores;
}
// validarContacto({ name: "N", email: "nico@", message: "Hola" }) ->
// { name: "El nombre debe tener al menos 2 caracteres", email: "El correo no es válido", message: "El mensaje debe tener al menos 10 caracteres" }

// validarContacto({ name: "Nico", email: "nico@mail.cl", message: "Quiero una landing" }) -> {} -> No hay errores

// 3) `FormularioContacto` — el formulario entero. Tres campos con su etiqueta: "Nombre" y
//    "Correo" son `<input>`, "Mensaje" es un `<textarea>`; arrancan con `CONTACTO_VACIO` y
//    los tres se actualizan con un solo manejador. Un botón "Enviar mensaje".
//    No se valida al escribir, solo al enviar, y con `validarContacto`: cada aviso va en
//    un `<p role="alert">` que existe solo si su campo falla. Si no falla ninguno, no
//    queda ningún aviso y el formulario vuelve a `CONTACTO_VACIO`.
//    💡 Con `type="email"`, el navegador valida el correo por su cuenta y tapa tus
//    avisos: por eso el `<form>` de Projex lleva `noValidate`.
export function FormularioContacto() {
  // Estado de los datos del formulario, inicializado con un contacto vacío
  const [datos, setDatos] = useState(CONTACTO_VACIO); // -> {name: "", email: "", message: ""}

  // Estado de los errores
  const [errores, setErrores] = useState<ErroresContacto>({}); // -> {}

  // Manejador de cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Obtenemos el nombre y valor del campo que cambió
    setDatos((prevDatos) => ({
      ...prevDatos, // Mantenemos los datos anteriores
      [name]: value, // Actualizamos el campo que cambió
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitamos que al enviarse el formulario este recargue la página
    const erroresValidacion = validarContacto(datos); // Validamos los datos del formulario
    setErrores(erroresValidacion); // Actualizamos el estado de errores

    if (Object.keys(erroresValidacion).length === 0) {
      // Si no hay errores, reseteamos el formulario a su estado inicial
      setDatos(CONTACTO_VACIO);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Escriba su nombre"
        value={datos.name}
        onChange={handleChange}
      />
      {errores.name && <p role="alert">{errores.name}</p>}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Escriba su correo"
        value={datos.email}
        onChange={handleChange}
      />
      {errores.email && <p role="alert">{errores.email}</p>}
      <label htmlFor="message">Mensaje</label>
      <textarea
        id="message"
        name="message"
        placeholder="Escriba un mensaje"
        value={datos.message}
        onChange={handleChange}
      />
      {errores.message && <p role="alert">{errores.message}</p>}
      <button type="submit">Enviar mensaje</button>
    </form>
  );
}

// <FormularioContacto />

/* ─────────────────────────────────────────────────────────────────────────────
 * Si te salió sin abrir el `12b`, esto ya es el `ContactForm` de Projex menos una cosa:
 * qué pasa mientras el mensaje viaja. Eso, y el botón que en Projex vive fuera del
 * formulario, son el `14b`.
 * ───────────────────────────────────────────────────────────────────────────── */
