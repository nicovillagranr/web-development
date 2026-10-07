import { useReducer } from "react";

/* =============================================================================
 * EJERCICIO 10 — el reducer, un case a la vez   ·  bloque 11
 * =============================================================================
 *
 * 📌 RECORDATORIO — la forma del estado, con valores de ejemplo:
 *     {
 *       datos:   { nombre: "Ana", correo: "ana@mail.cl", detalle: "Una landing" },
 *       errores: { correo: "El correo no es válido" },   // solo los que fallan
 *       fase:    "editando",  o "enviando", "enviado" -> type string literal
 *     }
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · decir, de cada case, qué partes del estado cambia y cuáles deja igual
 *   · escribir un guard que devuelve el mismo estado cuando el paso no aplica
 *   · seguir el estado a través de varias acciones seguidas
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el 09 comentaste "escribir" y "rechazar", pero no "empezar", "terminar" ni
 * "limpiar". Aquí cada case es su propio drill, con un formulario nuevo: la
 * solicitud de presupuesto que tendría la agencia de Projex.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · un case: qué cambia y qué se queda  →  drills 1 a 3
 *   TEORÍA 2 · el guard: cuándo el paso no aplica   →  drills 4 a 6
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/11-useState-useReducer/exercise-10.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 6 compilan: toda la señal
 *   está en el test. Los drills 2 y 4 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-10.pistas.md`, de una en una.
 *
 * 👁️ `VisorSolicitud` (en `src/App.tsx`) pinta el estado que devuelve TU reducer.
 * ===========================================================================*/

// Los tipos, `vacios` e `inicial` no se tocan. Cada drill te recuerda el que usa.
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

export type FaseSolicitud = "editando" | "enviando" | "enviado";

export type EstadoSolicitud = {
  datos: DatosSolicitud;
  errores: ErroresSolicitud;
  fase: FaseSolicitud;
};

// const solicitudUno: EstadoSolicitud = {
// datos: { nombre: "Ana", correo: "ana@example.com", detalle: "Necesito un presupuesto" },
// errores: {},
// fase: "editando",
// };

export type AccionSolicitud =
  | { tipo: "escribir"; campo: keyof DatosSolicitud; valor: string }
  | { tipo: "rechazar"; errores: ErroresSolicitud }
  | { tipo: "empezar" }
  | { tipo: "terminar" }
  | { tipo: "limpiar" };

export const vacios: DatosSolicitud = { nombre: "", correo: "", detalle: "" };
export const inicial: EstadoSolicitud = { datos: vacios, errores: {}, fase: "editando" };

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — un case: qué cambia y qué se queda
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cada case del reducer es la regla de UN paso: devuelve un estado nuevo en el
 *   que cambian solo las partes que ese paso toca. El resto se copia tal cual.
 *
 * SINTAXIS — un case inventado, "reabrir", que no está en este reducer:
 *     case "reabrir":
 *       return {
 *         ...estado,          // lo que se queda: datos y errores, copiados
 *         fase: "editando",   // lo que cambia: escrito encima de la copia
 *       };
 *
 * 🧠 ANALOGÍA — la ficha de un paciente: en cada visita el médico corrige solo
 *    las líneas que cambiaron; el resto de la ficha se pasa en limpio igual.
 *
 * 🗣️ LAS PIEZAS
 *     `...estado` → spread, copia todo  ·  `fase: …` después → sobrescribe
 *
 * ⚠️ TRAMPA — lo que va DESPUÉS del spread gana. Con `fase: "editando"` escrito
 *    ANTES de `...estado`, el spread lo pisa con la fase vieja.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) Predice: mira el `case "rechazar"` del reducer de más abajo (ese no está
//    roto). ¿Qué partes del estado cambia? Escribe solo las que cambian.
//    Recordatorio:  EstadoSolicitud = { datos: …; errores: …; fase: … }
export const respuesta1: (keyof EstadoSolicitud)[] = ["errores", "fase"];

// 2) Predice: el `case "limpiar"` de abajo devuelve `inicial`. Un compañero lo
//    reescribe así:
//        return { ...estado, datos: vacios, errores: {}, fase: "editando" };
//    ¿Las dos versiones devuelven el mismo contenido, sea cual sea el estado?
export const respuesta2: boolean = true;
// ¿Por qué? Escribirlo a mano como en el ejemplo da el mismo contenido que escribir
// `inicial`: después del `...estado` se pisan las tres llaves (datos, errores y fase)
// con los mismos valores fijos que tiene `inicial`, así que del estado viejo no llega
// ninguna. Lo que no es igual es el objeto: la versión a mano crea uno nuevo cada vez,
// e `inicial` es siempre el mismo.

// 3) y 4), 5) son cases de `solicitudReducer`, más abajo.
// 3) "escribir" — copiar el texto y borrar el error del campo ya funciona. Falta
//    una regla: si la solicitud estaba "enviado", al escribir otra vez vuelve a
//    "editando", para que se quite el aviso de enviada. Desde las otras dos
//    fases, la fase no cambia.
//    Recordatorio:  FaseSolicitud = "editando" | "enviando" | "enviado"

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el guard: cuándo el paso no aplica
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Un guard es un `if` al principio del case: si el paso no tiene sentido en la
 *   fase actual, devuelve `estado` tal cual, el MISMO objeto, sin copiarlo.
 *
 * SINTAXIS
 *     case "reabrir":
 *       if (estado.fase !== "enviado") return estado;   // no aplica: nada cambia
 *       return { ...estado, fase: "editando" };          // aplica: estado nuevo
 *
 * 🧠 ANALOGÍA — el torniquete del metro: sin tarjeta no gira. No te da otro
 *    torniquete igual al anterior; simplemente se queda donde estaba.
 *
 * 🗣️ LAS PIEZAS
 *     `return estado` → el mismo objeto  ·  `{ ...estado }` → un objeto nuevo
 *
 * ⚠️ TRAMPA — el guard pregunta por la fase en la que el paso NO vale. Escrito
 *    al revés, bloquea justo el caso bueno y deja pasar el malo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) "empezar" — pasa a "enviando" y limpia los errores. Pero si ya se está
//    enviando (un doble clic en el botón), no hace nada: devuelve el mismo estado.
// ¿Por qué el mismo estado y no una copia con `{ ...estado }`?

// 5) "terminar" — la solicitud queda "enviado" y el formulario vacío para la
//    siguiente. Solo vale desde "enviando".
export function solicitudReducer(
  estado: EstadoSolicitud,
  accion: AccionSolicitud,
): EstadoSolicitud {
  switch (accion.tipo) {
    //
    case "escribir":
      return {
        ...estado,
        datos: { ...estado.datos, [accion.campo]: accion.valor },
        errores: { ...estado.errores, [accion.campo]: "" },
        fase: estado.fase === "enviado" ? "editando" : estado.fase,
      };
    //
    case "rechazar":
      return {
        ...estado,
        errores: accion.errores,
        fase: "editando",
      };
    //
    case "empezar":
      if (estado.fase !== "enviado") {
        return estado;
      }
      return {
        ...estado,
        errores: {},
        fase: "enviando",
      };
    //
    case "terminar": // ← drill 5
      return {
        ...estado,
        fase: "enviado",
      };
    //
    case "limpiar":
      return inicial;
    default: {
      const _exhaustivo: never = accion;
      return _exhaustivo;
    }
  }
}
// solicitudReducer(inicial, { tipo: "empezar" })
// solicitudReducer({ ...inicial, fase: "enviando" }, { tipo: "terminar" })

// 6) Predice: partes de `inicial` y llegan tres acciones seguidas:
//        escribir "Ana" en "nombre"  →  "empezar"  →  "terminar"
//    ¿Cómo queda el estado al final? Con el reducer ya resuelto, no el starter.
//    Recordatorio:  vacios = { nombre: "", correo: "", detalle: "" }
export const respuesta6: EstadoSolicitud = {
  datos: { ...vacios, nombre: "Ana" },
  errores: { nombre: "" },
  fase: "enviado",
};

// 👁️ No es un drill, y no hay que tocarlo: pinta el estado que devuelve tu
//    reducer. Pulsa los botones en distinto orden y mira qué línea cambia.
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
        <button
          onClick={() => pedir({ tipo: "rechazar", errores: { correo: "El correo no es válido" } })}
        >
          Rechazar
        </button>
        <button onClick={() => pedir({ tipo: "empezar" })}>Empezar</button>
        <button onClick={() => pedir({ tipo: "terminar" })}>Terminar</button>
        <button onClick={() => pedir({ tipo: "limpiar" })}>Limpiar</button>
      </div>
    </div>
  );
}
// <VisorSolicitud />
