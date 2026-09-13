/* ─────────────────────────────────────────────────────────────────────────────
 * 📌 RECORDATORIO — el panel y su momento delicado
 *
 *     type EstadoGuardado = "idle" | "guardando" | "guardado"
 *
 *     idle       abierto y quieto, o recién abierto
 *     guardando  pulsó Guardar y la respuesta todavía no ha vuelto
 *     guardado   volvió, y volvió bien
 *
 * Cerrar el panel borra lo escrito. Hacerlo en mitad del guardado es perder el trabajo
 * a medio mandar, y por eso hay una regla que decide cuándo se puede cerrar.
 * ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

/* =============================================================================
 * 13c · UNA ACCIÓN, VARIAS PUERTAS
 * =============================================================================
 *
 * 🎯 AL TERMINAR SABRÁS
 * ----------------------------------------------------------------------------
 *   · contar cuántos caminos llevan a una misma acción antes de ponerle un freno
 *   · juntar esos caminos en una función y frenar ahí, en vez de en cada botón
 *   · reconocer el camino que se salta ese punto de encuentro, con la guarda bien puesta
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * ----------------------------------------------------------------------------
 * En el `13b` cerraste el drill 5 con la guarda dentro de `alLimpiar`. Aquí se ve para
 * qué sirve de verdad: un panel tiene más puertas que un formulario, apagar botones no
 * llega a todas, y la misma línea de guarda cubre lo que entre por cualquiera.
 *
 * 🗺️ MAPA DEL ARCHIVO
 * ----------------------------------------------------------------------------
 * Cero teoría nueva; lo que haga falta está en el `13b`.
 *   drill 1 · dos salidas que hacen cada una lo suyo → juntarlas
 *   drill 2 · una tercera salida que no se puede apagar: la tecla
 *   drill 3 · la guarda bien escrita, y una salida que no pasa por ella
 *
 * ▸ EJERCICIO — 3 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/10-eventos-formularios/exercise-13c.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y ninguno tiene un tipo mal puesto: aquí
 *   `pnpm typecheck` no va a decirte nada y toda la señal está en el test.
 *   ¿Atascado? Las pistas están en `exercise-13c.pistas.md`, de una en una.
 * ===========================================================================*/

type EstadoGuardado = "idle" | "guardando" | "guardado";

/* El viaje al servidor, fingido. Aquí no se toca. */
function guardarEnServidor(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

/* La regla, ya escrita y ya probada en el `13b`. Aquí no se toca: se le pregunta. */
function puedeCerrar(estado: EstadoGuardado): boolean {
  return estado !== "guardando";
}

// type EstadoGuardado = "idle" | "guardando" | "guardado";

// 1) `PanelConDosSalidas` — del panel se sale por dos sitios, el botón "Cancelar" y la ✕
//    de la esquina, y salir tiene que dejarlo como estaba: cerrado y sin la nota de
//    antes. Hoy cada botón se lo monta por su cuenta y no dejan lo mismo detrás.
//    Consigue que las dos salidas cierren igual.
export function PanelConDosSalidas() {
  const [abierto, setAbierto] = useState(false);
  const [nota, setNota] = useState("");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNota(e.target.value);
  };

  // Si el estado está en false, mostramos un botón para abrir el panel
  if (!abierto)
    return (
      <button type="button" onClick={() => setAbierto(true)}>
        Abrir panel
      </button>
    );

  // Para no redundar en ambos botones, creamos una función que setee el estado a cerrado y limpie la nota, y la usamos en ambos botones.
  const cerrarBorrar = () => {
    setAbierto(false);
    setNota("");
  };

  return (
    <div>
      <input type="text" aria-label="Nota" value={nota} onChange={alEscribir} />
      <button type="button" aria-label="Cancelar" onClick={cerrarBorrar}>
        Cancelar
      </button>
      <button type="button" aria-label="Cerrar" onClick={cerrarBorrar}>
        ✕
      </button>
    </div>
  );
}
// <PanelConDosSalidas />

// 2) `PanelQueEscuchaEscape` — el mismo panel, ahora con una regla: en mitad del guardado
//    no se cierra, porque cerrarlo borra justo lo que se está mandando. "Cancelar" ya la
//    respeta y aun así el panel se cierra mientras dura el guardado. Consigue que la
//    regla se cumpla entre por donde entre, y que con el panel quieto se siga cerrando.
export function PanelQueEscuchaEscape() {
  const [abierto, setAbierto] = useState(false);
  const [nota, setNota] = useState("");
  const [estado, setEstado] = useState<EstadoGuardado>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNota(e.target.value);
  };

  const cerrar = () => {
    if (!puedeCerrar(estado)) {
      setAbierto(false);
      setNota("");
      setEstado("idle");
    }
  };

  const alPulsarTecla = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") cerrar();
  };

  const alGuardar = async () => {
    setEstado("guardando");
    await guardarEnServidor();
    setEstado("guardado");
  };

  if (!abierto)
    return (
      <button type="button" onClick={() => setAbierto(true)}>
        Abrir panel
      </button>
    );

  return (
    <div>
      <input
        type="text"
        aria-label="Nota"
        value={nota}
        onChange={alEscribir}
        onKeyDown={alPulsarTecla}
      />
      <button type="button" onClick={alGuardar} disabled={estado === "guardando"}>
        {estado === "guardando" ? "Guardando..." : "Guardar"}
      </button>
      <button type="button" onClick={cerrar} disabled={!puedeCerrar(estado)}>
        Cancelar
      </button>
    </div>
  );
}
// <PanelQueEscuchaEscape />

// 3) `PanelConTresSalidas` — la ✕ de la esquina no se apaga nunca: es la salida de
//    emergencia y el diseño la quiere siempre encendida. La guarda de `cerrar` está bien
//    escrita, y aun así el panel se cierra en mitad del guardado. Encuentra por dónde se
//    está colando y tápalo.
export function PanelConTresSalidas() {
  const [abierto, setAbierto] = useState(false);
  const [nota, setNota] = useState("");
  const [estado, setEstado] = useState<EstadoGuardado>("idle");

  const alEscribir = (e: ChangeEvent<HTMLInputElement>) => {
    setNota(e.target.value);
  };

  const cerrar = () => {
    if (!puedeCerrar(estado)) {
      setAbierto(false);
      setNota("");
      setEstado("idle");
    }
  };

  const alPulsarTecla = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") cerrar();
  };

  const alGuardar = async () => {
    setEstado("guardando");
    await guardarEnServidor();
    setEstado("guardado");
  };

  if (!abierto)
    return (
      <button type="button" onClick={() => setAbierto(true)}>
        Abrir panel
      </button>
    );

  return (
    <div>
      <input
        type="text"
        aria-label="Nota"
        value={nota}
        onChange={alEscribir}
        onKeyDown={alPulsarTecla}
      />
      <button type="button" onClick={alGuardar} disabled={estado === "guardando"}>
        {estado === "guardando" ? "Guardando..." : "Guardar"}
      </button>
      <button type="button" onClick={cerrar} disabled={!puedeCerrar(estado)}>
        Cancelar
      </button>
      <button type="button" aria-label="Cerrar" onClick={cerrar}>
        ✕
      </button>
    </div>
  );
}
// <PanelConTresSalidas />

/* ─────────────────────────────────────────────────────────────────────────────
 * En el `13b` la guarda ya estaba escrita y tú le pusiste la condición. Aquí el trabajo
 * es el de antes de eso: mirar una acción y contar por cuántas puertas se entra. El
 * freno se escribe una vez, en el sitio por donde pasan todas.
 * ───────────────────────────────────────────────────────────────────────────── */
