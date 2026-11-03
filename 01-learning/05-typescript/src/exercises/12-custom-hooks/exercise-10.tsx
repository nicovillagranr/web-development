import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

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
 * Porque es un efecto con array de dependencias vacío, el cuerpo del efecto corre solo al montar el componente (cuando FotoAmpliada se abre) y la limpieza corre solo al desmontar el componente (cuando FotoAmpliada se cierra). Esto asegura que el scroll se bloquee mientras la foto está ampliada y se restaure cuando se cierra.
 */

// useBloquearScroll es un custom hook que bloquea el scroll del body mientras el componente que lo utiliza está montado.
// Al montar, guarda el valor anterior del overflow del body y lo establece en "hidden" para bloquear el scroll.
// Al desmontar, restaura el valor anterior del overflow, permitiendo que el scroll vuelva a funcionar normalmente.
export function useBloquearScroll(): void {
  // Usamos useEffect para bloquear el scroll al montar el componente y restaurarlo al desmontar.
  useEffect(() => {
    // Guardamos el valor anterior del overflow del body.
    const previousOverflow = document.body.style.overflow;
    // Bloqueamos el scroll estableciendo overflow en "hidden".
    document.body.style.overflow = "hidden";

    // La función de limpieza se ejecuta al desmontar el componente.
    return () => {
      // Restauramos el valor anterior del overflow del body.
      document.body.style.overflow = previousOverflow;
    };
    // El array de dependencias vacío asegura que este efecto solo se ejecute una vez al montar y desmontar.
  }, []);
}

export function FotoAmpliada({ onClose }: { onClose: () => void }) {
  // Llamamos a useBloquearScroll a modo de préstamo: bloquea el scroll mientras FotoAmpliada está montada y lo restaura al desmontarse.
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
 *  Dentro de entendidoRef.current es null mientras ConfirmacionDeEnvio se pinta por primera vez, y cuando corre el efecto, entendidoRef.current apunta al botón "Entendido" que ya ha sido renderizado en el DOM. Esto permite que el efecto pueda enfocar correctamente el botón cuando el componente se monta.
 */
export function useFocoQueVuelve(destino: RefObject<HTMLElement | null>): void {
  // Usamos useEffect para manejar el enfoque del elemento referenciado por destino.
  useEffect(() => {
    // Hacemos referencia al elemento que estaba enfocado antes de que el componente se montara.
    const anterior = document.activeElement;
    // Enfocamos el elemento referenciado por destino si existe.
    destino.current?.focus();
    // La función de limpieza se ejecuta al desmontar el componente.
    return () => {
      // Si el elemento previamente enfocado es un HTMLElement, devolvemos el foco a él.
      if (anterior instanceof HTMLElement) {
        anterior.focus();
      }
    };
  }, [destino]);
}

export function ConfirmacionDeEnvio({ onClose }: { onClose: () => void }) {
  // Hacemos referencia al botón "Entendido" para poder enfocar en él cuando el componente se monta y devolver el foco al elemento previamente enfocado cuando se desmonta.
  const entendidoRef = useRef<HTMLButtonElement>(null);
  // Usamos el hook useFocoQueVuelve para manejar el enfoque del botón "Entendido" y devolver el foco al elemento previamente enfocado al cerrar el componente.
  useFocoQueVuelve(entendidoRef);

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
 * Lo que hace el efecto cada vez que llega una flecha nueva es eliminar el event listener anterior y agregar uno nuevo con la nueva función. Esto asegura que siempre se llame a la función más reciente cuando se presiona la tecla Escape, evitando que se quede con una versión antigua de la función que podría no reflejar el estado actual del componente.
 */

export function useTeclaEscape(alPulsar: () => void): void {
  useEffect(() => {
    // Escuchamos las pulsaciones del teclado.
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        alPulsar();
      }
    };
    // addEventListener debe recibir 2 parámetros: el tipo de evento y la función que se ejecutará cuando ocurra ese evento. Aquí estamos escuchando el evento "keydown" y llamando a alPulsarTecla cuando se detecta.
    document.addEventListener("keydown", alPulsarTecla);

    // Limpiamos el listener al desmontar o cambiar la función.
    return () => document.removeEventListener("keydown", alPulsarTecla);
  }, [alPulsar]);
}

export function MensajeRapido({ onClose }: { onClose: () => void }) {
  const [mensaje, setMensaje] = useState("");
  const [preguntando, setPreguntando] = useState(false);

  // Para hacer foto en el botón descartar, necesitamos un ref a él.
  //  Lo creamos con useRef y lo pasamos al botón con ref={botonRef}.
  const botonRef = useRef<HTMLButtonElement>(null);

  // Movemos el foco cuando el botón ya existe en el DOM.
  useEffect(() => {
    if (preguntando) {
      botonRef.current?.focus();
    }
  }, [preguntando]);

  // Gestionamos el cierre o la confirmación al pulsar Escape.
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
          <button ref={botonRef} type="button" onClick={onClose}>
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
 * ¿El efecto de cuál de tus tres hooks vuelve a correr, y por qué los otros
 * dos no?
 * Porque al pulsar "Copiar dirección", el padre pasa un onClose nuevo, lo que hace que el hook useTeclaEscape vuelva a correr debido a que tiene alPulsar en su array de dependencias. Los otros dos hooks, useBloquearScroll y useFocoQueVuelve, no vuelven a correr porque no dependen de onClose ni de ningún otro valor que haya cambiado; sus arrays de dependencias están vacíos o solo contienen referencias que no han cambiado.
 */

export function MapModal({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  // Hacemos referencia al botón de cerrar para poder enfocar en él cuando el componente se monta y devolver el foco al elemento previamente enfocado cuando se desmonta.
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // CORRECCIÓN 1: bloqueamos el scroll con el hook existente.
  useBloquearScroll();

  // CORRECCIÓN 2: pasamos el objeto ref completo.
  useFocoQueVuelve(closeButtonRef);

  // CORRECCIÓN 3: delegamos Escape al hook existente.
  useTeclaEscape(onClose);

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
