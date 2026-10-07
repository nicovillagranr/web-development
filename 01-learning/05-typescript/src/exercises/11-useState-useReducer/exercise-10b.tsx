import { useState } from "react";

/* =============================================================================
 * EJERCICIO 10b — validar: un objeto de errores, una regla a la vez   ·  bloque 11
 * =============================================================================
 *
 * 📌 RECORDATORIO — lo que entra y lo que sale de `validarSolicitud`:
 *     entra:  { nombre: "A", correo: "ana@mail", detalle: "" }
 *     sale:   { nombre: "El nombre debe tener al menos 2 caracteres",
 *               correo: "El correo no es válido",
 *               detalle: "El detalle es obligatorio" }
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · decir qué devuelve un validador cuando todo está bien
 *   · normalizar un dato con `trim()` antes de validarlo
 *   · encadenar varias reglas de un campo para que gane la primera que falla
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Es la pieza que decide si el envío sigue o se rechaza. Es una función pura,
 * sin React: entran datos, salen errores, y se prueba llamándola a mano. Es el
 * mismo trabajo que hace `ContactValidation` en Projex.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la forma del resultado        →  drills 1 a 3
 *   TEORÍA 2 · varias reglas en un campo     →  drills 4, 5
 *
 * ▸ EJERCICIO — 5 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-10b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 5 compilan: toda la señal
 *   está en el test. El drill 1 lleva un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-10b.pistas.md`, de una en una.
 *
 * 👁️ `ProbadorValidacion` (en `src/App.tsx`) pinta lo que devuelve TU validador.
 * ===========================================================================*/

// Los tipos y `vacios` no se tocan.
export type DatosSolicitud = { nombre: string; correo: string; detalle: string };
export type ErroresSolicitud = { nombre?: string; correo?: string; detalle?: string };

export const vacios: DatosSolicitud = { nombre: "", correo: "", detalle: "" };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la forma del resultado
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un validador parte de un objeto de errores vacío y le añade una clave por
 *   cada campo que falla. Los campos que pasan no aparecen.
 *
 * SINTAXIS
 *     const errores: ErroresSolicitud = {};          // empieza vacío
 *     const nombre = datos.nombre.trim();            // normalizado antes de mirar
 *     if (!nombre) errores.nombre = "…";             // solo si falla, se añade
 *     return errores;
 *
 * 🧠 ANALOGÍA — la revisión técnica del auto: el informe solo lista lo que falló.
 *    Un auto en regla sale con la hoja en blanco, no con "frenos: nada".
 *
 * 🗣️ LAS PIEZAS
 *     `{}` → objeto vacío, todo en regla  ·  `trim()` → quita espacios al borde
 *
 * ⚠️ TRAMPA — validar el dato tal como llega. "  " (dos espacios) no es un campo
 *    vacío para JavaScript, y un correo pegado con un espacio al final no casa
 *    con la expresión regular.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) Predice: llegan datos que cumplen todas las reglas. ¿Qué devuelve
//    `validarSolicitud`?
//    Recordatorio:  ErroresSolicitud = { nombre?: string; correo?: string; detalle?: string }
export const respuesta1: ErroresSolicitud = { nombre: "", correo: "", detalle: "" };
// ¿Por qué?

// 2) `validarSolicitud`, el correo — un correo copiado de otro lado llega con
//    espacios alrededor, como " ana@mail.cl ", y hoy se rechaza. Tiene que
//    aceptarse, como ya se hace con el nombre y el detalle.

// 3) Predice: el nombre llega como " A " (espacio, A, espacio). ¿Qué error le
//    toca al nombre? Si no le toca ninguno, `undefined`.
export const respuesta3: string | undefined = undefined;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — varias reglas en un campo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando un campo tiene varias reglas, se encadenan con `else if`: se mira la
 *   primera, y solo si pasa se mira la siguiente. Gana la primera que falla.
 *
 * SINTAXIS — una regla inventada para la edad, que no está en este archivo:
 *     if (!edad) {
 *       errores.edad = "La edad es obligatoria";      // falla esta → se para aquí
 *     } else if (edad < 18) {
 *       errores.edad = "Tienes que ser mayor de edad"; // solo si la de arriba pasó
 *     }
 *
 * 🧠 ANALOGÍA — el guardia de una discoteca: si no traes carnet, no te pregunta
 *    la edad. Te da un solo motivo, el primero.
 *
 * 🗣️ LAS PIEZAS
 *     `else if` → regla encadenada  ·  dos `if` sueltos → reglas independientes
 *
 * ⚠️ TRAMPA — con dos `if` sueltos se miran las dos reglas, y si fallan ambas,
 *    la segunda sobrescribe a la primera: sale el motivo menos importante.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `validarSolicitud`, el nombre — con el nombre vacío tiene que salir "El
//    nombre es obligatorio", y hoy sale el mensaje de la longitud.

// 5) `validarSolicitud`, el detalle — falta su segunda regla: si tiene menos de
//    20 caracteres (sin contar los espacios del borde), el error es
//    "Cuéntanos un poco más: mínimo 20 caracteres". Vacío sigue siendo obligatorio.
const FORMA_DE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarSolicitud(datos: DatosSolicitud): ErroresSolicitud {
  const errores: ErroresSolicitud = {};

  const nombre = datos.nombre.trim();
  const detalle = datos.detalle.trim();

  // ← drill 4
  if (!nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (nombre.length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  // ← drill 2
  if (!FORMA_DE_CORREO.test(datos.correo)) {
    errores.correo = "El correo no es válido";
  }

  // ← drill 5
  if (!detalle) {
    errores.detalle = "El detalle es obligatorio";
  }

  return errores;
}
// validarSolicitud(vacios)
// validarSolicitud({ nombre: "Ana", correo: " ana@mail.cl ", detalle: "Una landing para mi tienda" })

// 👁️ No es un drill, y no hay que tocarlo: escribe en los tres campos y mira qué
//    objeto devuelve tu validador en cada tecla.
export function ProbadorValidacion() {
  const [datos, setDatos] = useState<DatosSolicitud>(vacios);
  const errores = validarSolicitud(datos);

  const cambiar = (campo: keyof DatosSolicitud, valor: string) => {
    setDatos({ ...datos, [campo]: valor });
  };

  return (
    <div>
      <input
        aria-label="Nombre"
        placeholder="Nombre"
        value={datos.nombre}
        onChange={(e) => cambiar("nombre", e.target.value)}
      />
      <input
        aria-label="Correo"
        placeholder="Correo"
        value={datos.correo}
        onChange={(e) => cambiar("correo", e.target.value)}
      />
      <input
        aria-label="Detalle"
        placeholder="Detalle"
        value={datos.detalle}
        onChange={(e) => cambiar("detalle", e.target.value)}
      />
      <p>errores: {JSON.stringify(errores)}</p>
    </div>
  );
}
// <ProbadorValidacion />
