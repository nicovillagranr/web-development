/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres momentos de un pedido
 *
 *     type EstadoEnvio = "idle" | "enviando" | "enviado"
 *
 *     idle      quieto: nadie ha pulsado, o lo de antes ya caducó
 *     enviando  pulsado, y la respuesta todavía no ha vuelto
 *     enviado   volvió, y volvió bien
 *
 * Todo lo que se decide en este archivo se decide durante el rato del medio.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/* =============================================================================
 * 13d · DÓNDE SE PONE EL FRENO
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · contar cuántas puertas llevan a una acción antes de decidir dónde frenarla
 *   · distinguir el freno que AVISA del freno que PROTEGE, y decir qué te da cada uno
 *   · frenar una acción que se dispara por una puerta sin interruptor
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el `13c` pusiste la guarda en el sitio bueno y cerraste los tres drills. Pero lo
 * cerraste sabiendo QUÉ hacer, no POR QUÉ ahí. Aquí se sube el mismo escalón seis veces
 * seguidas, empezando por abajo del todo, hasta que el porqué se vea sin que te lo diga
 * nadie.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva; lo que haga falta está en el `13b` y en el `13c`.
 *   drills 1-2 · el freno en la puerta: primero una, luego dos
 *   drills 3-4 · la regla y la acción salen a una función propia
 *   drills 5-6 · las dos puertas donde apagar el botón no sirve de nada
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-13d.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y ninguno tiene un tipo mal puesto: aquí
 *   `pnpm typecheck` no va a decirte nada y la señal está en el test. 1 de los 6 lo pasa
 *   con el fallo dentro: ese se comprueba leyendo tu código.
 *   ¿Atascado? Las pistas están en `exercise-13d.pistas.md`, de una en una.
 * ===========================================================================*/

type EstadoEnvio = "idle" | "enviando" | "enviado";

/* El viaje al servidor, fingido. Aquí no se toca: el servidor apunta cada viaje que le
 * llega, y el test mira esa cuenta. */
export const servidor = { viajes: 0 };

function mandarAlServidor(): Promise<void> {
  servidor.viajes += 1;
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const rotulo = (estado: EstadoEnvio) =>
  estado === "enviando" ? "Enviando..." : estado === "enviado" ? "Enviado" : "Sin enviar";

// type EstadoEnvio = "idle" | "enviando" | "enviado";

// 1) `BotonQueSeApaga` — el pedido tarda un segundo en irse, y en ese rato el botón
//    sigue pulsable: dos clics seguidos lo mandan dos veces. Haz que no se pueda pulsar
//    mientras el envío está en marcha, y que vuelva a poder pulsarse en cuanto termine.
export function BotonQueSeApaga() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  // Cuando la función asíncrona enviar se dispara ocurren tres cosas:
  const enviar = async () => {
    // El estado del envío pasa a "enviando". React vuelve a renderizar el componente,
    // estado === "enviando" da true y activa el disabled
    setEstado("enviando");
    // Se espera a que vuelva la respuesta del servidor
    await mandarAlServidor();
    // Cuando vuelve la respuesta, el estado pasa a "enviado". React vuelve a renderizar,
    // la misma expresión estado === "enviando" ahora da false y desactiva el disabled
    setEstado("enviado");
  };

  return (
    <div>
      <p>{rotulo(estado)}</p>
      <button type="button" onClick={enviar} disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}
// <BotonQueSeApaga />

// 2) `DosBotonesUnEnvio` — el formulario es largo y por eso lleva el mismo botón arriba
//    y abajo; los dos mandan el mismo pedido. Hoy solo uno se entera de que hay un envío
//    en marcha. Consigue que ninguno de los dos se pueda pulsar mientras dura.
export function DosBotonesUnEnvio() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const enviar = async () => {
    setEstado("enviando");
    await mandarAlServidor();
    setEstado("enviado");
  };

  return (
    <div>
      <p>{rotulo(estado)}</p>
      <button type="button" onClick={enviar} disabled={estado === "enviando"}>
        Enviar
      </button>
      <button type="button" onClick={enviar} disabled={estado === "enviando"}>
        Enviar ahora
      </button>
    </div>
  );
}
// <DosBotonesUnEnvio />

// 3) `puedeEnviar` — la regla de cuándo se puede mandar deja de vivir suelta dentro del
//    JSX y pasa a una función a la que se le pregunta. Se puede mandar siempre que no
//    haya un envío en marcha, y eso incluye el momento de después: quien acaba de mandar
//    un pedido tiene derecho a mandar otro.
export function puedeEnviar(estado: EstadoEnvio): boolean {
  switch (estado) {
    case "idle":
    case "enviado":
      return true;
    case "enviando":
      return false;
  }
}
// puedeEnviar("idle") -> true
// puedeEnviar("enviando") -> false
// puedeEnviar("enviado") -> true

// 4) `DosBotonesMismaAccion` — otra vez los dos botones, y ahora cada uno lleva su propia
//    copia de lo que hay que hacer al enviar. Las copias ya se han desincronizado: por
//    uno de los dos el pedido se queda enviándose para siempre. Consigue que los dos
//    hagan exactamente lo mismo, sin copias que puedan volver a separarse.
export function DosBotonesMismaAccion() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const enviar = async () => {
    setEstado("enviando");
    await mandarAlServidor();
    setEstado("enviado");
  };

  return (
    <div>
      <p>{rotulo(estado)}</p>
      <button type="button" disabled={!puedeEnviar(estado)} onClick={enviar}>
        Enviar
      </button>
      <button type="button" disabled={!puedeEnviar(estado)} onClick={enviar}>
        Enviar ahora
      </button>
    </div>
  );
}
// <DosBotonesMismaAccion />

// 5) `FormularioConEnter` — dentro de un formulario, Enter en el campo manda el pedido
//    sin tocar ningún botón: es una puerta que no tiene interruptor, y por eso apagar el
//    botón no llega hasta ella. Mientras hay un envío en marcha no puede arrancar otro,
//    y eso se comprueba en dos sitios: el contador de envíos arrancados y los viajes que
//    apunta el servidor.
export function FormularioConEnter() {
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [nota, setNota] = useState("");
  const [arrancados, setArrancados] = useState(0);

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNota(e.target.value);
  };

  // Paso a paso de la función:

  const enviar = async () => {
    // ¿Puede enviar?
    // Sí → continúa.
    // No → la función se corta.
    //
    // puedeEnviar(estado) = true
    // → estado === "idle" || estado === "enviado"
    //
    // puedeEnviar(estado) = false
    // → estado === "enviando"

    if (!puedeEnviar(estado)) {
      return;
    }

    // Si puede enviar, se sube el contador
    setArrancados((actual) => actual + 1);

    // El estado pasa a "enviando"
    setEstado("enviando");

    // Se espera a que vuelva la respuesta
    await mandarAlServidor();

    // Cuando vuelve la respuesta,
    // el estado pasa a "enviado"
    setEstado("enviado");
  };

  const alEnviarFormulario = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enviar();
  };

  return (
    <form onSubmit={alEnviarFormulario}>
      <p>{`Arrancados: ${arrancados}`}</p>
      <p>{rotulo(estado)}</p>
      <input type="text" aria-label="Nota" value={nota} onChange={alEscribir} />
      <button type="button" onClick={enviar} disabled={!puedeEnviar(estado)}>
        Enviar
      </button>
    </form>
  );
}
// <FormularioConEnter />

// 6) `SalidaSiempreEncendida` — "Cancelar pedido" es la salida de emergencia y el diseño
//    la quiere encendida siempre, también mientras el pedido viaja. Y aun así, en mitad
//    del envío no puede cancelar nada: lo que ya salió no se deshace desde aquí.
//    Protégela sin apagarla.
export function SalidaSiempreEncendida() {
  // Seteamos el estado inicial del envío. Sólo pueden ser los valores del type EstadoEnvio. Estos son "idle" - "enviando" - "enviado"
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  // Seteamos el estado inicial de un eventual cancelamiento. Inicialmente no hay cancelamiento, por lo que el valor inicial es false.
  const [cancelado, setCancelado] = useState(false);

  const enviar = async () => {
    setEstado("enviando");
    await mandarAlServidor();
    setEstado("enviado");
  };

  const cancelar = () => {
    if (estado === "enviando") {
      return;
    }

    setCancelado(true);
  };

  return (
    <div>
      <p>{cancelado ? "Pedido cancelado" : rotulo(estado)}</p>
      <button type="button" onClick={enviar} disabled={!puedeEnviar(estado)}>
        Enviar
      </button>
      <button type="button" onClick={cancelar}>
        Cancelar pedido
      </button>
    </div>
  );
}
// <SalidaSiempreEncendida />

/* ─────────────────────────────────────────────────────────────────────────────
 * Los seis drills son el mismo freno puesto en sitios distintos. Si al llegar al 6 te
 * parece que el 1 estaba mal, no lo estaba: estaba solo. Un freno en la puerta vale
 * mientras haya una puerta y se pueda cerrar.
 * ───────────────────────────────────────────────────────────────────────────── */
