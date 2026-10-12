import { useState } from "react";

/* =============================================================================
 * EJERCICIO 10c — `validarSolicitud`: un objeto de errores, una regla a la vez
 * =============================================================================
 *
 * 📌 RECORDATORIO — lo que entra y lo que sale de tu `validarSolicitud`:
 *     entra:  { nombre: "Ana", apellido: "P", correo: "ana@mail.cl", detalle: "(600 letras)" }
 *     sale:   { apellido: "El apellido debe tener al menos 2 caracteres",
 *               detalle:  "El detalle no puede superar los 500 caracteres" }
 *     `servidor` no lo pone nunca el validador: lo pone "envioFallido".
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · decir qué devuelve tu validador cuando todo está bien
 *   · normalizar un dato con `trim()` antes de validarlo
 *   · encadenar las reglas de un campo para que gane la que toca
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Es la pieza que decide, en tu `handleSubmit`, si el envío sigue o se para. Es
 * una función pura, sin React: entran datos, salen errores, y se prueba
 * llamándola a mano. Aquí está la de tu `10`, rota por partes.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la forma del resultado        →  drills 1 a 3
 *   TEORÍA 2 · varias reglas en un campo     →  drills 4 a 6
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-10c.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 6 compilan: toda la señal
 *   está en el test. Las predicciones (1, 3 y 6) se responden leyendo el
 *   validador, sin tocarlo. Los drills 1 y 3 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-10c.pistas.md`, de una en una.
 *
 * 👁️ `ProbadorValidacion` (en `src/App.tsx`) pinta lo que devuelve TU validador.
 * ===========================================================================*/

// Los tipos y `vacios` son los de tu `10` y no se tocan.
export type DatosSolicitud = {
  nombre: string;
  apellido: string;
  correo: string;
  detalle: string;
};

export type ErroresSolicitud = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  detalle?: string;
  servidor?: string;
};

export const vacios: DatosSolicitud = { nombre: "", apellido: "", correo: "", detalle: "" };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la forma del resultado
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un validador parte de un objeto de errores sin claves y le añade una por
 *   cada campo que falla. Los campos que pasan no aparecen: ni con `""` ni con
 *   `undefined`. Simplemente no están.
 *
 * SINTAXIS — con un campo inventado, la ciudad:
 *     const errores: ErroresSolicitud = {};               // empieza sin claves
 *     if (datos.ciudad.trim() === "") {                   // normaliza antes de mirar
 *       errores.ciudad = "La ciudad es obligatoria";      // solo si falla, se añade
 *     }
 *     return errores;
 *
 * 🧠 ANALOGÍA — la revisión técnica del auto: el informe solo lista lo que falló.
 *    Un auto en regla sale con la hoja en blanco, no con "frenos: nada".
 *
 * 🗣️ LAS PIEZAS
 *     `{}` → objeto sin claves: todo en regla  ·  `trim()` → quita los espacios del borde
 *
 * ⚠️ TRAMPA — validar el dato tal como llega. "   " (tres espacios) no es un
 *    texto vacío para JavaScript: mide 3, y `=== ""` lo deja pasar.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) Predice: llegan datos que cumplen todas las reglas. ¿Qué devuelve
//    `validarSolicitud`?
//    Recordatorio:  ErroresSolicitud = { nombre?, apellido?, correo?, detalle?, servidor? }
export const respuesta1: ErroresSolicitud = {};
// ¿Por qué? Al no haber errores, este objeto queda vacío.
// ¿Cuándo entra un error al objeto? Cuando una condicional de la validación se cumple y se asigna un mensaje a la propiedad correspondiente del objeto errores.

// 2) `validarSolicitud`, el nombre — hoy un nombre de solo espacios pasa como
//    válido, y al envío llegaría un nombre en blanco. Tiene que dar "El nombre es
//    obligatorio", y la regla de los 2 caracteres tampoco puede contar los
//    espacios del borde.

// 3) Predice: el detalle llega como "   Hola   " (tres espacios, Hola, tres
//    espacios: 10 caracteres en total). ¿Qué error le toca? Si ninguno, `undefined`.
export const respuesta3: string | undefined = "El detalle debe tener al menos 10 caracteres";
// ¿Por qué? El if del detalle si abarca el trim, por lo tanto ese hola quedaría con 4 caracteres.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — varias reglas en un campo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando un campo tiene varias reglas, se encadenan con `else if`: se mira la
 *   primera, y solo si pasa se mira la siguiente. Gana la primera que falla, así
 *   que el ORDEN de la cadena decide qué mensaje sale.
 *
 * SINTAXIS — con un campo inventado, la edad:
 *     if (edad === "") {
 *       errores.edad = "La edad es obligatoria";        // falla esta → se para aquí
 *     } else if (Number(edad) < 18) {
 *       errores.edad = "Tienes que ser mayor de edad";  // solo si la de arriba pasó
 *     }
 *
 * 🧠 ANALOGÍA — el guardia de una discoteca: si no traes carnet, no te pregunta
 *    la edad. Te da un solo motivo, el primero.
 *
 * 🗣️ LAS PIEZAS
 *     `else if` → regla encadenada  ·  dos `if` sueltos → reglas independientes
 *
 * ⚠️ TRAMPA — con dos `if` sueltos se miran las dos reglas, y si fallan ambas, la
 *    segunda sobrescribe a la primera. Y en una cadena mal ordenada, una regla
 *    puede tapar a otra que nunca llega a mirarse.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `validarSolicitud`, el apellido — con el apellido vacío tiene que salir "El
//    apellido es obligatorio", y hoy sale el mensaje de la longitud.

// 5) `validarSolicitud`, el detalle — con el detalle vacío tiene que salir "El
//    detalle es obligatorio", y hoy sale otro mensaje. Las tres reglas están bien
//    escritas una por una.

// 6) Predice, con el validador ya resuelto (drills 2, 4 y 5): llegan estos datos.
//        { nombre: "   ", apellido: "Pérez", correo: "ana@mail", detalle: "Hola" }
//    ¿Qué devuelve `validarSolicitud`?
export const respuesta6: ErroresSolicitud = {
  nombre: "El nombre es obligatorio",
  correo: "El correo no es válido",
  detalle: "El detalle debe tener al menos 10 caracteres",
};

// 2), 4) y 5) son partes de `validarSolicitud`. El correo está bien y no se toca.
export function validarSolicitud(datos: DatosSolicitud): ErroresSolicitud {
  const errores: ErroresSolicitud = {};

  // Validación Nombre
  if (datos.nombre.trim() === "") {
    errores.nombre = "El nombre es obligatorio";
  } else if (datos.nombre.trim().length < 2) {
    errores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  // Validación Apellido
  if (datos.apellido.trim() === "") {
    errores.apellido = "El apellido es obligatorio";
  } else if (datos.apellido.trim().length < 2) {
    errores.apellido = "El apellido debe tener al menos 2 caracteres";
  }

  // Validación Correo
  const correoValido = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(datos.correo);
  if (datos.correo.trim() === "") {
    errores.correo = "El correo es obligatorio";
  } else if (!correoValido) {
    errores.correo = "El correo no es válido";
  }

  // Validación Detalle
  if (datos.detalle.trim() === "") {
    errores.detalle = "El detalle es obligatorio";
  } else if (datos.detalle.trim().length < 10) {
    errores.detalle = "El detalle debe tener al menos 10 caracteres";
  } else if (datos.detalle.trim().length > 500) {
    errores.detalle = "El detalle no puede superar los 500 caracteres";
  }

  // Retorno del objeto/resultado final.
  return errores;
}
// validarSolicitud(vacios)
// validarSolicitud({ ...vacios, nombre: "Ana", apellido: "Pérez" })

// 👁️ No es un drill, y no hay que tocarlo: escribe en los cuatro campos y mira
//    qué objeto devuelve tu validador en cada tecla.
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
        aria-label="Apellido"
        placeholder="Apellido"
        value={datos.apellido}
        onChange={(e) => cambiar("apellido", e.target.value)}
      />
      <input
        aria-label="Correo"
        placeholder="Correo"
        value={datos.correo}
        onChange={(e) => cambiar("correo", e.target.value)}
      />
      <textarea
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
