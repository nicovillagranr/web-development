import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 10b — el reducer de tu `10`, case por case   ·  bloque 11
 * =============================================================================
 *
 * 📌 RECORDATORIO — el estado de tu formulario, con valores de ejemplo:
 *     {
 *       datos:   { nombre: "Ana", apellido: "Pérez", correo: "ana@mail.cl", detalle: "…" },
 *       errores: { servidor: "Sin conexión" },   // solo los que hay
 *       fase:    "error",        // o "editando", "enviando", "enviado"
 *     }
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · decir qué partes del estado cambia cada case de tu reducer
 *   · distinguir un case que copia los errores de uno que los reemplaza
 *   · escribir los guards de "envioCompletado" y "envioFallido"
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Es el `solicitudReducer` de tu `exercise-10`, con los mismos tipos y nombres,
 * roto por partes. Reconstruirlo pieza a pieza es la forma de entender al 100%
 * el archivo entero, sobre todo lo que trajo la versión nueva: "envioFallido",
 * la fase "error" y el error del servidor.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · copiar o reemplazar     →  drills 1 a 4
 *   TEORÍA 2 · el guard                →  drills 5 a 7
 *
 * ▸ EJERCICIO — 7 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-10b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 7 compilan: toda la señal
 *   está en el test. Los drills 4 y 5 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-10b.pistas.md`, de una en una.
 *
 * 👁️ `VisorSolicitud` (en `src/App.tsx`) pinta el estado que devuelve TU reducer.
 * ===========================================================================*/

// Los tipos, `vacios` e `inicial` son los de tu `10` y no se tocan.
export type DatosSolicitud = { nombre: string; apellido: string; correo: string; detalle: string };
export type ErroresSolicitud = {
  nombre?: string;
  apellido?: string;
  correo?: string;
  detalle?: string;
  servidor?: string;
};
export type FaseSolicitud = "editando" | "enviando" | "enviado" | "error";
export type EstadoSolicitud = {
  datos: DatosSolicitud;
  errores: ErroresSolicitud;
  fase: FaseSolicitud;
};

// Quién pide cada acción: "escribir" y "limpiar", el usuario; las otras cuatro,
// el envío (`handleSubmit`), según lo que haya pasado.
export type AccionSolicitud =
  | { tipo: "escribir"; campo: keyof DatosSolicitud; valor: string }
  | { tipo: "validacionFallida"; errores: ErroresSolicitud }
  | { tipo: "envioIniciado" }
  | { tipo: "envioCompletado" }
  | { tipo: "envioFallido"; mensaje: string }
  | { tipo: "limpiar" };

export const vacios: DatosSolicitud = { nombre: "", apellido: "", correo: "", detalle: "" };
export const inicial: EstadoSolicitud = { datos: vacios, errores: {}, fase: "editando" };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — copiar o reemplazar
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un objeto anidado se puede COPIAR y tocar una llave (spread + llave), o
 *   REEMPLAZAR entero por otro (sin spread). Lo que no aparece en un reemplazo,
 *   desaparece.
 *
 * SINTAXIS
 *     errores: { ...estado.errores, nombre: "" }   // copia: los demás se quedan
 *     errores: { nombre: "Muy corto" }             // reemplazo: solo queda este
 *
 * 🧠 ANALOGÍA — corregir una lista con típex frente a tirarla y escribir una
 *    nueva: con el típex, el resto de la lista sigue ahí; con la hoja nueva,
 *    solo está lo que escribiste en ella.
 *
 * 🗣️ LAS PIEZAS
 *     `{ ...a, x }` → copia con cambio  ·  `{ x }` → objeto nuevo desde cero
 *
 * ⚠️ TRAMPA — en tu reducer conviven los dos: "escribir" copia los errores y
 *    "validacionFallida" los reemplaza. Leerlos con el mismo molde confunde.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) y 2) son el `case "escribir"`, más abajo.
// 1) "escribir" — borrar el error del campo ya funciona. Pero si había un error
//    del servidor, también tiene que quedar en "" al volver a escribir: el
//    usuario está corrigiendo, y el aviso viejo ya no vale.
//    Recordatorio:  ErroresSolicitud = { nombre?, apellido?, correo?, detalle?, servidor? }

// 2) "escribir" — desde "enviado" ya vuelve a "editando". Desde "error" tiene que
//    volver también; desde "editando" o "enviando", la fase no cambia.
//    Recordatorio:  FaseSolicitud = "editando" | "enviando" | "enviado" | "error"

// 3) Predice: cuando "envioFallido" aplica, ¿qué partes del estado cambia?
export const respuesta3: (keyof EstadoSolicitud)[] = ["fase"];

// 4) Predice: el estado está "enviando" y sus errores son
//    { correo: "El correo no es válido" }. Llega "envioFallido" con el mensaje
//    "Sin conexión". ¿Qué vale `errores` después?
export const respuesta4: ErroresSolicitud = {
  correo: "El correo no es válido",
  servidor: "Sin conexión",
};
// ¿Por qué?

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el guard
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un guard es un `if` antes del `return { … }`: si el paso no tiene sentido en
 *   la fase actual, devuelve `estado`, el MISMO objeto, sin construir nada.
 *
 * SINTAXIS — con un case inventado, "reabrir":
 *     case "reabrir":
 *       if (estado.fase !== "enviado") return estado;   // origen: ¿vengo de ahí?
 *       return { ...estado, fase: "editando" };          // destino
 *
 * 🧠 ANALOGÍA — el boleto de tren: el revisor mira la estación de ORIGEN en la
 *    puerta (el guard); el DESTINO es adonde te lleva el viaje (el return).
 *
 * 🗣️ LAS PIEZAS
 *     `return estado` → el mismo objeto  ·  `{ ...estado }` → uno nuevo
 *
 * ⚠️ TRAMPA — el origen va en el `if` y el destino en el `return`. Si escribes
 *    el destino en el `if`, el guard bloquea justo el caso bueno.
 * ───────────────────────────────────────────────────────────────────────────── */

// 5) "envioFallido" — solo tiene sentido si se estaba enviando. Desde cualquier
//    otra fase, devuelve el mismo estado.
// ¿Por qué el mismo estado y no una copia con `{ ...estado }`?

// 6) "envioCompletado" — el guard está bien. Pero la solicitud tiene que quedar
//    "enviado" CON el formulario vacío, listo para la siguiente.
export function solicitudReducer(
  estado: EstadoSolicitud,
  accion: AccionSolicitud,
): EstadoSolicitud {
  switch (accion.tipo) {
    case "escribir": // ← drills 1 y 2
      return {
        ...estado,
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        errores: { ...estado.errores, [accion.campo]: "" },
        fase: estado.fase === "enviado" ? "editando" : estado.fase,
      };
    case "validacionFallida":
      return { ...estado, errores: accion.errores, fase: "editando" };
    case "envioIniciado":
      if (estado.fase === "enviando") return estado;
      return { ...estado, errores: {}, fase: "enviando" };
    case "envioCompletado": // ← drill 6
      if (estado.fase !== "enviando") return estado;
      return { ...estado, errores: {}, fase: "enviado" };
    case "envioFallido": // ← drill 5
      return { ...estado, errores: { servidor: accion.mensaje }, fase: "error" };
    case "limpiar":
      return inicial;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// solicitudReducer({ ...inicial, fase: "error" }, { tipo: "escribir", campo: "nombre", valor: "A" })
// solicitudReducer(inicial, { tipo: "envioFallido", mensaje: "Sin conexión" })

// 7) Predice: partes de `inicial` y llegan cuatro acciones seguidas, con el
//    reducer ya resuelto:
//        escribir "Ana" en "nombre"  →  "envioIniciado"
//        →  "envioFallido" con "Sin conexión"  →  escribir "P" en "apellido"
//    ¿Cómo queda el estado al final?
export const respuesta7: EstadoSolicitud = {
  datos: { ...vacios, nombre: "Ana" },
  errores: { servidor: "Sin conexión" },
  fase: "error",
};

// 👁️ No es un drill, y no hay que tocarlo: aquí haces tú de usuario Y de envío,
//    pulsando cada acción a mano. Mira qué línea cambia con cada botón.
export function VisorSolicitud() {
  const [estado, pedir] = useReducer(solicitudReducer, inicial);

  return (
    <div>
      <p>datos: {JSON.stringify(estado.datos)}</p>
      <p>errores: {JSON.stringify(estado.errores)}</p>
      <p>fase: {estado.fase}</p>
      <div>
        <button
          onClick={() =>
            pedir({ tipo: "escribir", campo: "nombre", valor: estado.datos.nombre + "a" })
          }
        >
          Escribir
        </button>
        <button onClick={() => pedir({ tipo: "envioIniciado" })}>Envío iniciado</button>
        <button onClick={() => pedir({ tipo: "envioCompletado" })}>Envío completado</button>
        <button onClick={() => pedir({ tipo: "envioFallido", mensaje: "Sin conexión" })}>
          Envío fallido
        </button>
        <button onClick={() => pedir({ tipo: "limpiar" })}>Limpiar</button>
      </div>
    </div>
  );
}
// <VisorSolicitud />
