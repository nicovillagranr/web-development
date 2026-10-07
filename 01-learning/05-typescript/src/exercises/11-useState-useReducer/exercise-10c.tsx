import { useReducer, type FormEvent } from "react";

/* =============================================================================
 * EJERCICIO 10c — enviar: decidir con lo de ahora, y en orden   ·  bloque 11
 * =============================================================================
 *
 * 📌 RECORDATORIO — lo que puede pedir un envío, y para qué:
 *     "validacionFallida" → hay errores: se enseñan y no se envía nada
 *     "envioIniciado"     → arranca el envío: fase "enviando", botón bloqueado
 *     "envioCompletado"   → acabó la espera: fase "enviado", formulario vacío
 *   Los tres los pide el envío, no el usuario: él solo pulsa "Enviar solicitud".
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · decidir el envío con los errores recién calculados, no con los del estado
 *   · ordenar los pasos de un envío y cortar con `return` cuando se rechaza
 *   · tipar el manejador de un `onSubmit`
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * El reducer (`10`) y el validador (`10b`) ya están hechos y aquí no se tocan.
 * Lo único que falta es quién los usa en el momento justo: el manejador del
 * envío. Cada drill es un envío distinto con un fallo distinto.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · los pasos de un envío, en orden   →  drills 1 a 4
 *   TEORÍA 2 · el envío espera; la pantalla, no  →  drills 5, 6
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-10c.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. 1 de los 6 pasa el test con el
 *   fallo dentro: corre siempre los dos comandos.
 *   ¿Atascado? Las pistas están en `exercise-10c.pistas.md`, de una en una.
 *
 * 👁️ Los componentes de los drills 3 a 6 están montados en `src/App.tsx`.
 * ===========================================================================*/

// De aquí hasta los drills, nada se toca: tipos, reducer y validador ya funcionan.
export type DatosSolicitud = { nombre: string; correo: string; detalle: string };
export type ErroresSolicitud = { nombre?: string; correo?: string; detalle?: string };
export type FaseSolicitud = "editando" | "enviando" | "enviado";
export type EstadoSolicitud = {
  datos: DatosSolicitud;
  errores: ErroresSolicitud;
  fase: FaseSolicitud;
};
export type AccionSolicitud =
  | { tipo: "validacionFallida"; errores: ErroresSolicitud }
  | { tipo: "envioIniciado" }
  | { tipo: "envioCompletado" };

export const vacios: DatosSolicitud = { nombre: "", correo: "", detalle: "" };
const inicial: EstadoSolicitud = { datos: vacios, errores: {}, fase: "editando" };

function solicitudReducer(estado: EstadoSolicitud, accion: AccionSolicitud): EstadoSolicitud {
  switch (accion.tipo) {
    case "validacionFallida":
      return { ...estado, errores: accion.errores, fase: "editando" };
    case "envioIniciado":
      if (estado.fase === "enviando") return estado;
      return { ...estado, errores: {}, fase: "enviando" };
    case "envioCompletado":
      if (estado.fase !== "enviando") return estado;
      return { ...estado, datos: vacios, fase: "enviado" };
  }
}

function validarSolicitud(datos: DatosSolicitud): ErroresSolicitud {
  const errores: ErroresSolicitud = {};
  if (!datos.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
    errores.correo = "El correo no es válido";
  }
  if (!datos.detalle.trim()) errores.detalle = "El detalle es obligatorio";
  return errores;
}

const esperar = (ms: number) => new Promise((resolver) => setTimeout(resolver, ms));

// Lo que pinta cada drill: el botón, los errores que haya y la fase. Los drills
// no tienen inputs: los datos llegan ya escritos por props, para mirar solo el envío.
function PanelEnvio(props: {
  estado: EstadoSolicitud;
  alEnviar: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const { errores, fase } = props.estado;
  return (
    <form onSubmit={props.alEnviar} noValidate>
      <button type="submit" disabled={fase === "enviando"}>
        Enviar solicitud
      </button>
      {errores.nombre && <p>{errores.nombre}</p>}
      {errores.correo && <p>{errores.correo}</p>}
      {errores.detalle && <p>{errores.detalle}</p>}
      <p role="status">
        {fase === "enviando" ? "Enviando…" : fase === "enviado" ? "Solicitud enviada" : ""}
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — los pasos de un envío, en orden
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un envío es una receta fija: frenar la recarga, validar AHORA, y decidir con
 *   ese resultado. Si hay errores, se rechaza y la función se corta con `return`.
 *
 * SINTAXIS
 *     e.preventDefault();                          // el navegador no recarga
 *     const errores = validar(estado.datos);       // recién calculados
 *     if (Object.keys(errores).length > 0) {       // ¿alguna clave? → hay errores
 *       pedir({ tipo: "validacionFallida", errores });
 *       return;                                    // lo de abajo no se ejecuta
 *     }
 *
 * 🧠 ANALOGÍA — el control del aeropuerto revisa tu maleta cuando pasas, y si
 *    encuentra algo no te deja seguir hacia la puerta de embarque.
 *
 * 🗣️ LAS PIEZAS
 *     `errores` → lo de ahora  ·  `estado.errores` → la foto de este render
 *
 * ⚠️ TRAMPA — sin el `return`, el rechazo se pide, pero la función sigue de largo
 *    y pide también "envioIniciado" y "envioCompletado": el reducer los aplica
 *    en ese orden.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) Predice: los datos están bien y se pulsa "Enviar solicitud". Ordena los
//    pasos que se ejecutan, sin poner los que no se ejecutan.
export type Paso =
  | "preventDefault"
  | "validar"
  | "validacionFallida"
  | "envioIniciado"
  | "esperar"
  | "envioCompletado";
export const respuesta1: Paso[] = [
  "preventDefault",
  "validar",
  "esperar",
  "envioIniciado",
  "envioCompletado",
];

// 2) Predice: lo mismo, pero con el nombre vacío. ¿Qué pasos se ejecutan?
export const respuesta2: Paso[] = [
  "preventDefault",
  "validar",
  "validacionFallida",
  "envioIniciado",
  "esperar",
  "envioCompletado",
];

// 3) `EnvioFoto` — con los datos vacíos, la solicitud se envía igual y no sale
//    ningún error. Tiene que enseñar los errores y no enviar nada.
//    Recordatorio:  `inicial` = { datos: vacios, errores: {}, fase: "editando" }
export function EnvioFoto({ datos }: { datos: DatosSolicitud }) {
  const [estado, pedir] = useReducer(solicitudReducer, { ...inicial, datos });

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarSolicitud(estado.datos);
    if (Object.keys(estado.errores).length > 0) {
      pedir({ tipo: "validacionFallida", errores });
      return;
    }
    pedir({ tipo: "envioIniciado" });
    await esperar(1000);
    pedir({ tipo: "envioCompletado" });
  };

  return <PanelEnvio estado={estado} alEnviar={enviar} />;
}

// 4) `EnvioSinReturn` — con los datos vacíos, los errores no llegan a verse y al
//    rato sale "Solicitud enviada". Tiene que quedarse con los errores a la vista.
export function EnvioSinReturn({ datos }: { datos: DatosSolicitud }) {
  const [estado, pedir] = useReducer(solicitudReducer, { ...inicial, datos });

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarSolicitud(estado.datos);
    if (Object.keys(errores).length > 0) {
      pedir({ tipo: "validacionFallida", errores });
    }
    pedir({ tipo: "envioIniciado" });
    await esperar(1000);
    pedir({ tipo: "envioCompletado" });
  };

  return <PanelEnvio estado={estado} alEnviar={enviar} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el envío espera; la pantalla, no
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `await` pausa la función del envío, pero no a React: mientras dura la espera
 *   se pinta lo que diga el estado. Lo que tenga que verse DURANTE la espera se
 *   pide ANTES del `await`.
 *
 * SINTAXIS
 *     pedir({ tipo: "envioIniciado" });    // antes: la pantalla dice "Enviando…"
 *     await esperar(1000);           // la función se pausa; React pinta
 *     pedir({ tipo: "envioCompletado" });   // después: "Solicitud enviada"
 *
 * 🧠 ANALOGÍA — el cartel de "en preparación" del local de comida se cuelga
 *    cuando entra el pedido, no cuando el plato ya está en la bandeja.
 *
 * 🗣️ LAS PIEZAS
 *     `async` → la función puede esperar  ·  `await` → aquí espera
 *
 * ⚠️ TRAMPA — el evento de un `onSubmit` es el del formulario, no el del botón
 *    que lo dispara, aunque el clic sea en el botón.
 * ───────────────────────────────────────────────────────────────────────────── */

// 5) `EnvioTarde` — con datos buenos, durante la espera no sale "Enviando…" y el
//    botón se puede volver a pulsar. Tiene que salir en cuanto se pulsa.
export function EnvioTarde({ datos }: { datos: DatosSolicitud }) {
  const [estado, pedir] = useReducer(solicitudReducer, { ...inicial, datos });

  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errores = validarSolicitud(estado.datos);
    if (Object.keys(errores).length > 0) {
      pedir({ tipo: "validacionFallida", errores });
      return;
    }
    await esperar(1000);
    pedir({ tipo: "envioIniciado" });
    pedir({ tipo: "envioCompletado" });
  };

  return <PanelEnvio estado={estado} alEnviar={enviar} />;
}

// 6) `EnvioTipado` — funciona, pero el tipo del evento del manejador no es el
//    que le llega desde `PanelEnvio`.
export function EnvioTipado({ datos }: { datos: DatosSolicitud }) {
  const [estado, pedir] = useReducer(solicitudReducer, { ...inicial, datos });

  const enviar = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errores = validarSolicitud(estado.datos);
    if (Object.keys(errores).length > 0) {
      pedir({ tipo: "validacionFallida", errores });
      return;
    }
    pedir({ tipo: "envioIniciado" });
    await esperar(1000);
    pedir({ tipo: "envioCompletado" });
  };

  return <PanelEnvio estado={estado} alEnviar={enviar} />;
}
// <EnvioFoto datos={vacios} />  ·  <EnvioTarde datos={{ nombre: "Ana", correo: "ana@mail.cl", detalle: "Una landing" }} />
