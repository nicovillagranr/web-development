/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — la caja que se actualiza en este archivo
 *
 *     type Datos = { name: string; email: string; message: string }
 *
 *     { name: "Nico", email: "nico@mail.cl", message: "Quiero una landing" }
 *
 * Siempre lleva sus tres campos. Cada vez que alguien teclea una letra en un campo,
 * hay que fabricar OTRA caja igual en la que solo ha cambiado ese campo.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { ChangeEvent } from "react";

/* =============================================================================
 * 14a · UNA CAJA NUEVA CADA LETRA
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · fabricar un objeto nuevo a partir de otro, cambiando un solo campo
 *   · pisar un campo cuyo nombre no sabes hasta que se ejecuta
 *   · explicar qué hace cada trozo del manejador que escribiste en el `14`
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * El `handleChange` del `14` te salió, y me dijiste que te pilló frío. Aquí se sube el
 * mismo escalón seis veces seguidas, empezando por abajo del todo: el drill 6 es tu
 * manejador entero, y los cinco de antes son las piezas de las que está hecho, sueltas.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva: está toda en el `11`, TEORÍA 1.
 *   drills 1-3 · fabricar la caja nueva: primero copiando, luego pisando un campo
 *   drills 4-5 · de dónde salen el nombre del campo y su valor
 *   drill  6  · las dos mitades juntas, dentro de un componente
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-14a.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los seis caen en el test. Uno de ellos
 *   además no compila: ese te lo dice `pnpm typecheck` antes de correr nada.
 *   ¿Atascado? Las pistas están en `exercise-14a.pistas.md`, de una en una.
 * ===========================================================================*/

// 📌 El type de todo el archivo:
export type Datos = { name: string; email: string; message: string };

// 1) `copiaDe` — devuelve una caja NUEVA con los mismos tres campos. Nueva de verdad:
//    quien la reciba tiene que poder cambiarla sin que la original se entere.
export function copiaDe(datos: Datos): Datos {
  return { ...datos };
}
// copiaDe({ name: "Nico", email: "nico@mail.cl", message: "Hola" })
// -> {name: "Nico", email: "nico@mail.cl", message: "Hola"} Al no haber nueva data, se copian los mismos valores en un objeto nuevo

// 2) `conCorreo` — la misma caja que el drill 1, pero con otro correo dentro. Los otros
//    dos campos llegan al final tal y como entraron, y la caja que te dan sigue sin
//    enterarse. El nombre del campo que se pisa lo sabes mientras escribes la función.
export function conCorreo(datos: Datos, correo: string): Datos {
  return { ...datos, email: correo };
}
// conCorreo({ name: "Nico", email: "nico@mail.cl", message: "Hola" }, "otro@mail.cl")
// -> {name: "Nico", email: "otro@mail.cl", message: "Hola"} // Los datos se copian en un objeto nuevo y sólo se pisa el campo "email" con el valor que llega como argumento.

// 3) `conCampo` — ahora QUÉ campo se pisa llega como parámetro, así que el nombre no lo
//    sabes hasta que la función se ejecuta. `campo` solo admite uno de los tres nombres
//    de la caja; si aceptara cualquier texto, un `"emial"` se colaría sin que nadie
//    protestara.
export function conCampo(datos: Datos, campo: keyof Datos, valor: string): Datos {
  return { ...datos, [campo]: valor };
}
// conCampo({ name: "Nico", email: "nico@mail.cl", message: "Hola" }, "email", "otro@mail.cl")
// -> {name: "Nico", email: "otro@mail.cl", message: "Hola"} // El campo a pisar es email, y su valor es el que llega como argumento

// conCampo({name: "Nico", email: "nico@email.cl", message: "Hola"}, "nema", "Ignacio") -> Error de compilación

// 4) `datosDelCampo` — de un campo de formulario solo interesan dos cosas: cómo se llama
//    y qué hay escrito dentro. Sácalas y devuélvelas juntas.
//    El parámetro tiene la forma recortada de lo que trae `e.target` de verdad: el de
//    verdad arrastra unas cuantas propiedades más que aquí no pintan nada.
export function datosDelCampo(target: { name: keyof Datos; value: string }) {
  return { name: target.name, value: target.value };
}
// datosDelCampo({ name: "email", value: "nico@mail.cl" }) -> {name: "email", value: "nico@mail.cl"}

// 5) `siguientesDatos` — la caja que habría que guardar después de que alguien teclee.
//    Recibe la que hay ahora y el par que devuelve el drill 4, tal cual sale de allí.
export function siguientesDatos(
  actuales: Datos,
  cambio: { name: keyof Datos; value: string },
): Datos {
  return { ...actuales, [cambio.name]: cambio.value };
}
// siguientesDatos({ name: "Nico", email: "nico@mail.cl", message: "Hola" }, { name: "message", value: "Hey" }) ->

// 6) `DosCamposUnManejador` — dos campos, "Nombre" y "Correo", y un solo manejador para
//    los dos. Cada `<input>` lleva puesto el nombre que su campo tiene en la caja: `name`
//    el de arriba y `email` el de abajo. Escribir en uno no puede vaciar al otro.
//    Debajo, un `<p>` con el contenido de la caja, para verlo sin abrir el test.
export function DosCamposUnManejador() {
  // Seteamos el estado inicial de los datos. En este caso tomamos las propiedades del type Datos y las iniciamos vacías
  const [datos, setDatos] = useState<Datos>({ name: "", email: "", message: "" });

  // alEscribir es la función que React llama cada vez que el usuario escribe. Recibe el evento, y del evento saca quién lo disparó.
  // Con target identificamos la etiqueta HTML
  // Con name identificamos el nombre del campo que se está escribiendo
  // Con value obtenemos el valor
  const alEscribir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <label htmlFor="c14a-nombre">Nombre</label>
      <input id="c14a-nombre" name="name" value={datos.name} onChange={alEscribir} />

      <label htmlFor="c14a-correo">Correo</label>
      <input id="c14a-correo" name="email" value={datos.email} onChange={alEscribir} />

      <label htmlFor="c14a-mensaje">Mensaje</label>
      <textarea id="c14a-mensaje" name="message" value={datos.message} onChange={alEscribir} />

      <p>{`name: "${datos.name}" · email: "${datos.email}" · message: "${datos.message}"`}</p>
    </form>
  );
}
// <DosCamposUnManejador />

/* ─────────────────────────────────────────────────────────────────────────────
 * Los seis son el mismo gesto: no toques la caja que te dieron, fabrica otra. El 1 lo
 * hace sin cambiar nada, el 6 lo hace sesenta veces mientras escribes una frase.
 * ───────────────────────────────────────────────────────────────────────────── */
