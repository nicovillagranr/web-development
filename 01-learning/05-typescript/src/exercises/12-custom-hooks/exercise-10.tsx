import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 10 — tu MapModal en tres hooks: un préstamo, un hook · bloque 12
 *
 * 📌 RECORDATORIO — del 01 y el 02: un efecto vuelve a correr cuando cambia algo
 * de su array de dependencias, y una flecha escrita en el render es una función
 * nueva en cada render, aunque su código sea el mismo.
 *
 * 🎯 OBJETIVOS
 * · Sacar un préstamo a un custom hook que no devuelve nada.
 * · Pasarle al hook lo que su efecto necesita: el ref entero y la función.
 * · Reescribir tu MapModal con tres hooks.
 *
 * 🟢 CONTEXTO — el 🏁 de la carpeta: reescribir tu MapModal tú solo. Su efecto
 * hace tres préstamos a la vez (el scroll, el foco y el Escape) con un solo
 * array de dependencias. Aquí sale cada uno a su hook, y al final los juntas.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el hook que no devuelve nada → drill 1
 * TEORÍA 2 · lo que el hook recibe → drills 2–3
 * ARMARLO TÚ → drill 4
 *
 * ▸ 4 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-10.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo. Pistas: exercise-10.pistas.md.
 * Drills 1–4: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el hook que no devuelve nada
 *
 * DEFINICIÓN
 * Un custom hook puede no devolver nada: su trabajo es el efecto que lleva
 * dentro. El componente lo llama arriba del todo y se lleva el préstamo entero,
 * con su limpieza.
 *
 * SINTAXIS — el cursor de espera del 08, sacado a un hook:
 * function useCursorDeEspera(): void {
 *   useEffect(() => {
 *     const anterior = document.body.style.cursor;
 *     document.body.style.cursor = "wait";
 *     return () => {
 *       document.body.style.cursor = anterior;
 *     };
 *   }, []);
 * }
 * useCursorDeEspera(); // en el componente, sin const: no hay nada que recoger
 *
 * 🧠 ANALOGÍA — el hotel: la llave se deja en recepción, no se le da a un amigo.
 * Recepción es quien sabe cuándo te vas, y la limpieza se le entrega a React.
 *
 * 🗣️ LAS PIEZAS
 * el hook      → la función use…: corre entera en cada render del componente.
 * el efecto    → lo que el hook le entrega a React con useEffect.
 * la limpieza  → la devuelve el efecto, no el hook.
 * : void       → el contrato: el hook no devuelve nada.
 *
 * ⚠️ TRAMPA — escribir el préstamo suelto en el cuerpo del hook: corre en cada
 * render, y la función que devuelves no la llama nadie.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) useBloquearScroll — el bloqueo del scroll de tu MapModal, sacado a un hook
 * para que lo use cualquier modal. Mientras FotoAmpliada está abierta, el fondo
 * no se mueve; al cerrarla, el overflow vuelve a como estaba. FotoAmpliada ya
 * está bien: solo falla el hook.
 * ¿Por qué? El cuerpo de tu hook corre en cada render de FotoAmpliada. ¿Cuándo
 * corre el cuerpo del efecto que lleva dentro, y cuándo su limpieza?
 *
 */
export function useBloquearScroll(): void {
  const anterior = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = anterior;
  };
}

export function FotoAmpliada({ onClose }: { onClose: () => void }) {
  useBloquearScroll();

  return (
    <div role="dialog" aria-label="Foto ampliada">
      <button type="button" onClick={onClose}>
        Cerrar foto
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — lo que el hook recibe
 *
 * DEFINICIÓN
 * Lo que el efecto del hook necesita, el hook lo recibe como parámetro. Un
 * elemento del DOM llega dentro de su ref. Una función puede cambiar de un render
 * a otro, así que va en las dependencias del efecto.
 *
 * SINTAXIS — cerrar un panel al pulsar fuera de él:
 * function useClicFuera(panelRef: RefObject<HTMLElement | null>, alSalir: () => void): void {
 *   useEffect(() => {
 *     const alPulsar = (event: MouseEvent) => {
 *       const dentro = event.target instanceof Node && panelRef.current?.contains(event.target);
 *       if (!dentro) alSalir();
 *     };
 *     document.addEventListener("mousedown", alPulsar);
 *     return () => document.removeEventListener("mousedown", alPulsar);
 *   }, [panelRef, alSalir]);
 * }
 * useClicFuera(panelRef, onClose); // en el componente
 *
 * 🧠 ANALOGÍA — el casillero del 04: al hook le das el casillero, no lo que había
 * dentro en el momento de dárselo.
 *
 * 🗣️ LAS PIEZAS
 * RefObject<T> → el tipo de un ref: la caja con .current dentro. Se importa de react.
 * panelRef     → la caja: es la misma en todos los renders.
 * .current     → lo de dentro: null hasta que React pinta el elemento.
 *
 * ⚠️ TRAMPA — dejar fuera de las dependencias la función que recibe el hook: el
 * efecto se queda con la del primer render, y con lo que ella leía entonces.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2) useFocoQueVuelve — el préstamo del foco de tu MapModal, sacado a un hook.
 * Al nacer, ConfirmacionDeEnvio pone el foco en «Entendido»; al morir, lo
 * devuelve a quien lo tenía. El hook recibe a quién enfocar, pero el foco no se
 * mueve. Arregla el hook y su llamada, sin que el hook devuelva nada: te hará
 * falta un import nuevo.
 * ¿Por qué? ¿Qué hay dentro de entendidoRef mientras ConfirmacionDeEnvio se pinta
 * por primera vez, y qué cuando corre el efecto?
 *
 */
export function useFocoQueVuelve(destino: HTMLElement | null): void {
  useEffect(() => {
    const anterior = document.activeElement;
    destino?.focus();
    return () => {
      if (anterior instanceof HTMLElement) anterior.focus();
    };
  }, [destino]);
}

export function ConfirmacionDeEnvio({ onClose }: { onClose: () => void }) {
  const entendidoRef = useRef<HTMLButtonElement>(null);
  useFocoQueVuelve(entendidoRef.current);

  return (
    <div role="dialog" aria-label="Mensaje enviado">
      <p>Te respondemos en menos de 24 horas.</p>
      <button ref={entendidoRef} type="button" onClick={onClose}>
        Entendido
      </button>
    </div>
  );
}

/* 3) useTeclaEscape — el Escape de tu MapModal, sacado a un hook. En
 * MensajeRapido, Escape cierra si no has escrito nada; si has escrito, pregunta
 * «¿Descartar el mensaje?» antes de cerrar. Ahora cierra siempre, aunque hayas
 * escrito. MensajeRapido ya está bien: solo falla el hook.
 * ¿Por qué? MensajeRapido le pasa a tu hook una flecha nueva en cada render. ¿Qué
 * hace tu efecto cada vez que llega una?
 *
 */
export function useTeclaEscape(alPulsar: () => void): void {
  useEffect(() => {
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") alPulsar();
    };
    document.addEventListener("keydown", alPulsarTecla);
    return () => document.removeEventListener("keydown", alPulsarTecla);
  }, []);
}

export function MensajeRapido({ onClose }: { onClose: () => void }) {
  const [mensaje, setMensaje] = useState("");
  const [preguntando, setPreguntando] = useState(false);

  useTeclaEscape(() => {
    if (mensaje === "") {
      onClose();
    } else {
      setPreguntando(true);
    }
  });

  return (
    <div role="dialog" aria-label="Mensaje rápido">
      <textarea
        aria-label="Tu mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
      />
      {preguntando && (
        <p>
          ¿Descartar el mensaje?{" "}
          <button type="button" onClick={onClose}>
            Descartar
          </button>
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — tu MapModal, en tres hooks
 *
 * Es tu MapModal de Projex, recortado: sin el Tab atrapado ni el clic fuera. En
 * Projex no falla, porque handleCloseMap usa useCallback. Aquí el padre le pasa
 * una flecha, como haría cualquiera que reutilizara tu modal.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) MapModal — al nacer, bloquea el scroll y pone el foco en la ✕; Escape
 * cierra; al morir, devuelve el overflow y el foco. «Copiar dirección» avisa al
 * padre, y el padre se vuelve a pintar: el foco tiene que quedarse en «Copiar
 * dirección», y ahora salta a la ✕. Cambia el efecto por tus tres hooks.
 * ¿Por qué? Al pulsar «Copiar dirección», el padre te pasa un onClose nuevo.
 * ¿Cuál de tus tres hooks vuelve a correr, y por qué los otros dos no?
 *
 */
export function MapModal({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <button type="button" onClick={onCopiar}>
        Copiar dirección
      </button>
    </div>
  );
}
