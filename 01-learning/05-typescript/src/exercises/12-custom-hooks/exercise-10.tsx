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
 * ESCALERA · el drill 4, pieza a pieza → peldaños 4a–4d, debajo del 4
 *
 * ▸ 4 drills + 4 peldaños en orden. Prohibidos any, as, el ! de «confía en mí»
 * (x!) y los eslint-disable.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-10.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito: ejecuta los tres comandos. Contesta cada
 * ¿Por qué? en la línea libre de debajo. Pistas: exercise-10.pistas.md.
 * Drills 1–4 y la escalera: banco, pestaña 12.
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

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — el drill 4, pieza a pieza (refuerzo)
 *
 * Tu MapModal junta tres préstamos y un padre que se vuelve a pintar. Cada
 * peldaño añade una pieza: de un préstamo a los tres, y de un efecto a un hook.
 *
 * DEFINICIÓN
 * Un efecto tiene un solo array. Cuando algo de ese array cambia, React corre su
 * limpieza entera y después su cuerpo entero, también las líneas que no usan lo
 * que cambió. Meter el efecto en un hook no cambia eso: el array viaja dentro.
 *
 * 🧠 ANALOGÍA — la zapatilla eléctrica: la tele, la lámpara y el router en el
 * mismo enchufe. Para reiniciar el router la desenchufas, y la lámpara se apaga
 * y se enciende aunque no le pasara nada. Con un enchufe por aparato, reinicias
 * solo el router.
 *
 * 🗣️ LAS PIEZAS
 * el array    → lo que React compara después de cada render.
 * la limpieza → entera: todo lo que devuelve el efecto.
 * el cuerpo   → entero: todas sus líneas, otra vez.
 * un hook     → corre en cada render; su efecto, solo si cambia su array. Puede
 *               llamar a otros hooks, igual que los tuyos llaman a useEffect.
 *
 * 4a un préstamo · 4b dos préstamos en un efecto · 4c los tres en un hook ·
 * 4d el 4 otra vez, en tu menú del móvil. Al terminar, relee tu ¿Por qué? del 4.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4a) MapaQueSalta — solo el préstamo del foco de tu MapModal: al nacer, a la ✕;
 * al morir, de vuelta a quien lo tenía. El padre es el mismo del 4. Al pulsar
 * «Copiar dirección», el foco tiene que quedarse ahí, y ahora salta a la ✕.
 * ¿Por qué? Con [onClose], cada vez que el padre manda uno nuevo, ¿qué hace la
 * limpieza de tu efecto, y qué hace después su cuerpo?
 *
 */
export function MapaQueSalta({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  // Hacemos referencia a un botón HTML que hará la función de cerrar el mapa.
  // Inicialmente el valor de cerrarRef es null, pero después de que el componente se renderiza, apuntará al botón de cerrar.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Una vez que el componente se monta, este efecto se ejecuta.
  useEffect(() => {
    // Guardamos el elemento que estaba enfocado antes de que el componente se montase.
    const anterior = document.activeElement;
    // Enfocamos el botón de cerrar el mapa.
    cerrarRef.current?.focus();
    // La función de limpieza se ejecuta cuando el componente se desmonta o cuando onClose cambia.
    return () => {
      // Si el elemento previamente enfocado es un HTMLElement, devolvemos el foco a él.
      if (anterior instanceof HTMLElement) {
        anterior.focus();
      }
    };
    // Array de dependencias que incluye onClose, lo que significa que si onClose cambia, el efecto se ejecutará de nuevo.
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <button type="button" onClick={onCopiar}>
        Copiar dirección
      </button>
    </div>
  );
}

/* 4b) MapaConEscape — el foco y el Escape, juntos en un efecto. Esta vez el
 * Escape sí usa onClose: el padre apunta cuántas copias llevabas al cerrar
 * («Copias al cerrar: 1» si copiaste una vez). Al copiar, el foco salta a la ✕.
 * Tiene que quedarse en «Copiar dirección», y Escape tiene que apuntar las copias
 * de ese momento.
 * ¿Por qué? ¿Por qué a este efecto no le servía ni [onClose] ni []?
 *
 */
export function MapaConEscape({
  onClose,
  onCopiar,
}: {
  onClose: () => void;
  onCopiar: () => void;
}) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const anterior = document.activeElement;
    cerrarRef.current?.focus();

    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", alPulsarTecla);

    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      if (anterior instanceof HTMLElement) anterior.focus();
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <button type="button" onClick={onCopiar}>
        Copiar dirección
      </button>
    </div>
  );
}

/* 4c) useModal — los tres préstamos de tu MapModal en un solo hook: el
 * componente llama a useModal y a nada más. Pero dentro siguen en un efecto, y al
 * copiar el foco salta a la ✕. Arregla useModal sin tocar MapaConUnHook: tiene
 * que seguir llamando a un solo hook.
 * ¿Por qué? Tu useModal del starter ya era un hook, y el foco saltaba igual.
 * ¿Qué tenía que cambiar dentro de él, y por qué?
 *
 */
export function useModal(cerrarRef: RefObject<HTMLElement | null>, onClose: () => void): void {
  useEffect(() => {
    const anteriorOverflow = document.body.style.overflow;
    const anteriorFoco = document.activeElement;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", alPulsarTecla);

    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      document.body.style.overflow = anteriorOverflow;
      if (anteriorFoco instanceof HTMLElement) anteriorFoco.focus();
    };
  }, [cerrarRef, onClose]);
}

export function MapaConUnHook({
  onClose,
  onCopiar,
}: {
  onClose: () => void;
  onCopiar: () => void;
}) {
  const cerrarRef = useRef<HTMLButtonElement>(null);
  useModal(cerrarRef, onClose);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <button type="button" onClick={onCopiar}>
        Copiar dirección
      </button>
    </div>
  );
}

/* 4d) MenuConTema — el 4 otra vez, en tu menú del móvil. Al nacer: scroll
 * bloqueado y el foco en «Servicios»; Escape cierra; al morir, el overflow y el
 * foco vuelven. «Cambiar tema» avisa al padre, que se vuelve a pintar y al cerrar
 * apunta el tema que había. El foco tiene que quedarse en «Cambiar tema», y ahora
 * salta a «Servicios». Cambia el efecto por hooks.
 * ¿Por qué? Con tus hooks, MenuConTema ya no tiene ningún useEffect. ¿Dónde quedó
 * cada array, y cuál se repite al cambiar el tema?
 * 💡 En el 08 partiste este mismo menú en tres efectos.
 *
 */
export function MenuConTema({
  onClose,
  onCambiarTema,
}: {
  onClose: () => void;
  onCambiarTema: () => void;
}) {
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anteriorOverflow = document.body.style.overflow;
    const anteriorFoco = document.activeElement;
    document.body.style.overflow = "hidden";
    primerEnlaceRef.current?.focus();

    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", alPulsarTecla);

    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      document.body.style.overflow = anteriorOverflow;
      if (anteriorFoco instanceof HTMLElement) anteriorFoco.focus();
    };
  }, [onClose]);

  return (
    <ul aria-label="Menú del móvil">
      <li>
        <a ref={primerEnlaceRef} href="#servicios" onClick={onClose}>
          Servicios
        </a>
      </li>
      <li>
        <a href="#portfolio" onClick={onClose}>
          Portfolio
        </a>
      </li>
      <li>
        <button type="button" onClick={onCambiarTema}>
          Cambiar tema
        </button>
      </li>
    </ul>
  );
}
