import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 10d — inputs controlados y errores en el JSX · bloque 11
 *
 * 📌 RECORDATORIO — un input controlado tiene dos mitades:
 * value={estado.datos.nombre} // estado → input
 * onChange={(e) => pedir({ tipo: "escribir", campo: "nombre",
 *   valor: e.target.value })} // input → estado
 *
 * 🎯 OBJETIVOS
 * · Reconocer qué mitad le falta a un input que no obedece.
 * · Pintar un error solo cuando existe, con &&.
 * · Pasar un error a aria-invalid con el tipo que pide.
 *
 * 🟢 CONTEXTO — es la última pieza del formulario: lo que el usuario ve y toca.
 * El reducer y el validador ya están hechos y no se tocan; aquí solo cambia el
 * JSX. Los role="alert" y aria-invalid son los mismos del formulario de Projex.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · las dos mitades de un input → drills 1–3
 * TEORÍA 2 · el error, solo cuando existe → drills 4–6
 *
 * ▸ 6 drills en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/11-useState-useReducer/exercise-10d.test.tsx
 * pnpm typecheck
 *
 * Los starters están rotos a propósito. El drill 5 lleva un ¿Por qué?: contéstalo
 * en la línea libre de debajo. Pistas: exercise-10d.pistas.md. Drills 1–4 y 6:
 * banco, pestaña 11.
 * ============================================================================= */

/* De aquí hasta los drills, nada se toca: tipos, reducer y validador ya funcionan. */
export type DatosSolicitud = {
  nombre: string;
  correo: string;
  detalle: string;
};

export type ErroresSolicitud = {
  nombre?: string;
  correo?: string;
  detalle?: string;
};

export type EstadoSolicitud = {
  datos: DatosSolicitud;
  errores: ErroresSolicitud;
};

export type AccionSolicitud =
  | { tipo: "escribir"; campo: keyof DatosSolicitud; valor: string }
  | { tipo: "revisado"; errores: ErroresSolicitud }
  | { tipo: "limpiar" };

const vacios: DatosSolicitud = {
  nombre: "",
  correo: "",
  detalle: "",
};

const inicial: EstadoSolicitud = {
  datos: vacios,
  errores: {},
};

function solicitudReducer(estado: EstadoSolicitud, accion: AccionSolicitud): EstadoSolicitud {
  switch (accion.tipo) {
    // Cuando el usuario escribe:
    //  1) actualiza el campo correspondiente en `datos`
    //  2) borra el error de ese campo, si lo había
    case "escribir":
      return {
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        errores: { ...estado.errores, [accion.campo]: "" },
      };
    // Cuando el usuario pulsa "Revisar":
    // El validador ejecuta su lógica y devuelve un objeto de errores. El reducer lo guarda en `errores`.
    case "revisado":
      return { ...estado, errores: accion.errores };
    // El usuario quiere limpiar los campos:
    // 1) borra todos los datos. De qué forma? Retornando el objeto`inicial` que ya tiene los datos vacíos.
    case "limpiar":
      return inicial;
  }
}

function validarSolicitud(datos: DatosSolicitud): ErroresSolicitud {
  const errores: ErroresSolicitud = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
    errores.correo = "El correo no es válido";
  }
  return errores;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — las dos mitades de un input
 *
 * DEFINICIÓN
 * Un input controlado no guarda nada: value le dice qué pintar (del estado) y
 * onChange avisa de cada tecla (al estado). Si falta una mitad, o si avisa a otro
 * campo, el input deja de reflejar lo que escribes.
 *
 * SINTAXIS
 * <input
 *   value={estado.datos.correo} // mitad 1: estado → pantalla
 *   onChange={(e) => pedir({ tipo: "escribir", campo: "correo",
 *     valor: e.target.value })} // mitad 2
 * />
 *
 * 🧠 ANALOGÍA — un espejo y un timbre: value es el espejo, que solo enseña lo que
 * hay en el estado; onChange es el timbre que avisa de que algo cambió.
 *
 * 🗣️ LAS PIEZAS
 * sin onChange → solo lectura.
 * sin value    → el input va por libre.
 *
 * ⚠️ TRAMPA — campo es keyof DatosSolicitud, así que el compilador acepta
 * cualquiera de los tres. Si el input de Correo avisa a "nombre", compila igual.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) CampoNombre — al escribir en el input no aparece nada. Tiene que verse lo
 * que escribes.
 */
export function CampoNombre() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  return (
    <>
      <input
        aria-label="Nombre"
        placeholder="Nombre"
        value={estado.datos.nombre}
        onChange={(e) => pedir({ tipo: "escribir", campo: "nombre", valor: e.target.value })}
      />
      <p>{estado.datos.nombre}</p>
    </>
  );
}

/* 2) CampoCorreo — al escribir en el input de Correo, el texto no aparece. */
export function CampoCorreo() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  return (
    <>
      <input
        aria-label="Correo"
        placeholder="Correo"
        value={estado.datos.correo}
        onChange={(e) => pedir({ tipo: "escribir", campo: "correo", valor: e.target.value })}
      />
      <p>{estado.datos.correo}</p>
    </>
  );
}

/* 3) CampoDetalle — se escribe bien, pero «Limpiar» no borra el texto. */
export function CampoDetalle() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  return (
    <div>
      <input
        aria-label="Detalle"
        placeholder="Detalle"
        value={estado.datos.detalle}
        onChange={(e) => pedir({ tipo: "escribir", campo: "detalle", valor: e.target.value })}
      />
      <button onClick={() => pedir({ tipo: "limpiar" })}>Limpiar</button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el error, solo cuando existe
 *
 * DEFINICIÓN
 * a && b devuelve a si es falsy, y b si no. En el JSX sirve para pintar un
 * elemento solo cuando hay algo que enseñar: sin error, no hay párrafo.
 *
 * SINTAXIS
 * {estado.errores.nombre && <p role="alert">{estado.errores.nombre}</p>}
 *
 * Ejemplos:
 * undefined o ""    → no pinta nada
 * "El nombre es…"   → pinta el <p>
 *
 * 🧠 ANALOGÍA — la luz de «puerta abierta» del auto: no se queda encendida con la
 * palabra «nada» escrita; se apaga.
 *
 * 🗣️ LAS PIEZAS
 * &&           → renderizado condicional.
 * role="alert" → el lector de pantalla lee el texto en cuanto aparece.
 *
 * ⚠️ TRAMPA — un <p role="alert"> vacío sigue existiendo: el lector de pantalla lo
 * encuentra, y el hueco ocupa sitio en el diseño.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) ErrorNombre — antes de pulsar «Revisar» ya hay un alert vacío en la página.
 * Solo tiene que existir cuando el nombre tiene error.
 * Recordatorio:  ErroresSolicitud = { nombre?: string; correo?: string; detalle?: string }
 */
export function ErrorNombre() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  return (
    <div>
      <button onClick={() => pedir({ tipo: "revisado", errores: validarSolicitud(estado.datos) })}>
        Revisar
      </button>
      {estado.errores.nombre && <p role="alert">{estado.errores.nombre}</p>}
      {/* {estado.errores.correo && <p role="alert">{estado.errores.correo}</p>} */}
      {/*
        <p role="alert">{estado.errores.detalle}</p> No forma parte de la validación, así que no se pinta.
       */}
    </div>
  );
}

/* 5) Predice: con un error de nombre a la vista, el usuario escribe una letra en
 * el nombre. El reducer deja errores.nombre en "". ¿Qué pinta entonces
 * {estado.errores.nombre && <p role="alert">…</p>}?
 * ¿Por qué? El operador && en este caso sirve para renderizar la etiqueta HTML sólo cuando error es truthy. Si errores.nombre es "" o undefined, React ni siquiera se tomará la molestia de renderizar el <p> y no aparecerá en el DOM.
 */
export type Pinta = "ningún <p>" | "un <p> vacío";
export const respuesta5: Pinta = "ningún <p>";

/* 6) ErrorCorreo — el input tiene que avisar con aria-invalid de si su valor es
 * inválido: "true" con error, "false" sin él. Hoy le llega el texto del error.
 */
export function ErrorCorreo() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);
  return (
    <div>
      <input
        aria-label="Correo"
        placeholder="Correo"
        value={estado.datos.correo}
        onChange={(e) => pedir({ tipo: "escribir", campo: "correo", valor: e.target.value })}
        aria-invalid={!!estado.errores.correo}
      />
      <button onClick={() => pedir({ tipo: "revisado", errores: validarSolicitud(estado.datos) })}>
        Revisar
      </button>
      {estado.errores.correo && <p role="alert">{estado.errores.correo}</p>}
    </div>
  );
}
// <CampoNombre />  ·  <ErrorNombre />  ·  <ErrorCorreo />
