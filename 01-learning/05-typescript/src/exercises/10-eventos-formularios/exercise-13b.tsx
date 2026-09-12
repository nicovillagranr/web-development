/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — los tres momentos, los mismos del `13`
 *
 *     type EstadoEnvio = "idle" | "submitting" | "success"
 *
 *     idle        quieto: nadie ha pulsado, o lo de antes ya caducó
 *     submitting  pulsado, y la respuesta todavía no ha vuelto
 *     success     volvió, y volvió bien
 *
 * Todo lo que enseña este archivo pasa dentro de ese rato del medio.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";

/* =============================================================================
 * 13b · EL MISMO ENVÍO, MIRADO DESPACIO
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · decir qué corre antes del `await`, qué corre después y qué sigue vivo mientras
 *   · sacar a una función la pregunta que el componente solo tiene que hacer
 *   · elegir entre apagar un botón y proteger la operación por dentro, sabiendo qué
 *     te da cada uno
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el `13` resolviste los nueve drills sin pista, y aun así cerraste el archivo sin
 * tener claro el porqué de la última mitad. Aquí no hay nada nuevo que aprender: es el
 * mismo envío de siempre, partido en las preguntas que se contestan de una en una.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva; lo que haga falta está en el `13`.
 *   drills 1-2 · dos preguntas sueltas, sin componente: traducir el momento a un sí o un no
 *   drill 3    · qué pasa antes del `await` y qué pasa después
 *   drills 4-5 · los dos sitios donde se puede frenar una acción, y qué alcanza cada uno
 *
 * ▸ EJERCICIO — 5 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-13b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y ninguno tiene un tipo mal puesto: aquí
 *   `pnpm typecheck` no va a decirte nada y toda la señal está en el test.
 *   ¿Atascado? Las pistas están en `exercise-13b.pistas.md`, de una en una.
 * ===========================================================================*/

type EstadoEnvio = "idle" | "submitting" | "success";

/* El viaje al servidor, fingido. Aquí no se toca. */
function enviarAlServidor(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

// type EstadoEnvio = "idle" | "submitting" | "success";

// 1) `bloqueaElBoton` — el botón de enviar se apaga mientras el envío está en marcha, y
//    solo entonces: apagado antes de pulsar no dejaría enviar nunca, y apagado al volver
//    no dejaría enviar un segundo comentario. Traduce el momento a esa respuesta de sí
//    o no.
export function bloqueaElBoton(estado: EstadoEnvio): boolean {
  switch (estado) {
    // En caso de que el estado sea "submitting", bloquea el botón devolviendo true
    case "submitting":
      return true;

    // En caso de que el estado sea "idle" o "success", no bloquea el botón devolviendo false
    case "idle":
    case "success":
      return false;
  }
}
// bloqueaElBoton("idle") -> false
// bloqueaElBoton("submitting") -> true
// bloqueaElBoton("success") -> false

// 2) `puedeLimpiar` — vaciar el campo no siempre tiene sentido. Con un envío en marcha
//    deja el formulario contando dos cosas que no encajan, y con el campo ya vacío no
//    hay nada que vaciar. Responde si en ese momento limpiar tiene sentido.
export function puedeLimpiar(estado: EstadoEnvio, comentario: string): boolean {
  switch (estado) {
    // En caso de que el estado sea "submitting", no puede limpiar devolviendo false
    case "submitting":
      return false;

    // En case de que el estado sea "idle" o "success", puede limpiar si el comentario no está vacío
    case "idle":
    case "success":
      return comentario !== "";
  }
}
// puedeLimpiar("idle", "hola") -> true
// puedeLimpiar("submitting", "hola") -> false
// puedeLimpiar("idle", "") -> false
// puedeLimpiar("success", "Hola") -> true

// 3) `ContadorQueSigueVivo` — mientras esperas al servidor la página no se congela, y el
//    usuario puede seguir pulsando: el botón "+1" y su recuento están ahí para que lo
//    veas, ya escritos y sin tocar. El que sí está mal es "Enviados", que canta un envío
//    terminado en cuanto pulsas, cuando todavía no ha vuelto nadie. Muévelo al momento
//    que le toca.
export function ContadorQueSigueVivo() {
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [enviados, setEnviados] = useState(0);
  const [clics, setClics] = useState(0);

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setComentario(e.target.value);
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    // Mientras ocurre el envío, e.preventDefault() evita que la página se recargue y resetee el formulario
    e.preventDefault();

    // Cambia el estado a "submitting" para indicar que el envío está en curso
    setEstado("submitting");

    // Espera a que la función enviarAlServidor() termine antes de continuar
    await enviarAlServidor();

    // Una vez terminada enviarAlServidor(), cambia el estado a "success" para indicar que el envío fue exitoso
    setEstado("success");

    // Incrementa el contador de enviados después de que el envío haya terminado
    setEnviados((n) => n + 1);
  };

  return (
    <form onSubmit={alEnviar}>
      <input type="text" aria-label="Comentario" value={comentario} onChange={alEscribir} />
      <button type="submit">{estado === "submitting" ? "Enviando..." : "Enviar"}</button>
      <p>Enviados: {enviados}</p>
      <button type="button" onClick={() => setClics((n) => n + 1)}>
        +1
      </button>
      <p>Clics: {clics}</p>
    </form>
  );
}
// <ContadorQueSigueVivo />

// 4) `EnvioConBotonApagado` — el mismo formulario, ahora con el botón de enviar apagado
//    mientras dura el envío para que el usuario no insista. Esa decisión ya la tomaste
//    en el drill 1, así que aquí no se vuelve a escribir: se le pregunta.
//    El texto del botón ya cambia solo y no hay que tocarlo.
export function EnvioConBotonApagado() {
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setComentario(e.target.value);
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    await enviarAlServidor();
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input type="text" aria-label="Comentario" value={comentario} onChange={alEscribir} />
      <button type="submit" disabled={bloqueaElBoton(estado)}>
        {estado === "submitting" ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
// <EnvioConBotonApagado />

// 5) `LimpiarDesdeDosSitios` — vaciar el campo se puede pedir de dos maneras: con el botón
//    "Limpiar" o con la tecla Escape dentro del campo, como en media aplicación de
//    escritorio. El starter apaga el botón durante el envío y da por hecho que con eso ya
//    está cubierto. Consigue que ninguno de los dos caminos vacíe el campo cuando limpiar
//    no tiene sentido, y que con el formulario quieto los dos sigan vaciándolo.
//    Tipar el manejador de la tecla pide un import nuevo: `KeyboardEvent`, con `import type`.
export function LimpiarDesdeDosSitios() {
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setComentario(e.target.value);
  };

  const alLimpiar = () => {
    if (puedeLimpiar(estado, comentario)) {
      setComentario("");
    }
  };

  const alPulsarTecla = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") alLimpiar();
  };

  const alEnviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEstado("submitting");
    await enviarAlServidor();
    setEstado("success");
  };

  return (
    <form onSubmit={alEnviar}>
      <input
        type="text"
        aria-label="Comentario"
        value={comentario}
        onChange={alEscribir}
        onKeyDown={alPulsarTecla}
      />
      <button type="submit" disabled={bloqueaElBoton(estado)}>
        {estado === "submitting" ? "Enviando..." : "Enviar"}
      </button>
      <button type="button" onClick={alLimpiar} disabled={bloqueaElBoton(estado)}>
        Limpiar
      </button>
    </form>
  );
}
// <LimpiarDesdeDosSitios />

/* ─────────────────────────────────────────────────────────────────────────────
 * El `13` te prohibía el `disabled` en su drill 5d y no te decía por qué. Aquí no se te
 * prohíbe nada: el drill 5 te deja usar los dos frenos y comprobar hasta dónde llega
 * cada uno. Esa es la pregunta que traías de antes, y esta vez la contestas tú.
 * ───────────────────────────────────────────────────────────────────────────── */
