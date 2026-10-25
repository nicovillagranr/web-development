import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 06 — el modal que nace abierto: el foco vuelve al morir · bloque 12
 *
 * 📌 RECORDATORIO — como con typeof, instanceof estrecha el tipo dentro del if.
 * En el ejercicio 04, la vuelta del foco iba en el manejador de cerrar. Aquí el
 * modal se monta y desmonta, así que la limpieza del efecto devuelve el foco.
 *
 * 🎯 OBJETIVOS
 * · Estrechar tipos con instanceof.
 * · Guardar y devolver el foco al montar/desmontar.
 * · Restaurar el scroll como estaba antes del modal.
 *
 * 🟢 CONTEXTO — MapModal se monta con {isMapOpen && <MapModal />}.
 * Puede cerrarse con la ✕, Escape o el fondo, sin saber qué botón lo abrió.
 * El efecto debe guardar el foco y el overflow al nacer y restaurarlos al morir.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · instanceof → drills 1–2
 * TEORÍA 2 · montaje y limpieza → drills 3–5
 * ARMARLO TÚ → drill 6
 *
 * ▸ 6 drills en orden. Prohibidos any, as y el ! de «confía en mí» (x!).
 * pnpm test:run src/exercises/12-custom-hooks/exercise-06.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta ambos comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-06.pistas.md. Drills 2–6: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — instanceof: de Element a HTMLElement
 *
 * DEFINICIÓN
 * x instanceof Clase comprueba en ejecución si x pertenece a esa clase.
 * TypeScript estrecha el tipo dentro del if. Sirve para comprobar valores como
 * document.activeElement, que no es una llamada genérica como querySelectorAll.
 *
 * SINTAXIS
 * const anterior = document.activeElement; // Element | null
 * if (anterior instanceof HTMLElement) {
 *   anterior.focus(); // aquí TypeScript sabe que es HTMLElement
 * }
 *
 * 🧠 ANALOGÍA — as es decir «soy del staff»; instanceof es enseñar la credencial.
 *
 * 🗣️ LAS PIEZAS
 * Node        → cualquier nodo: elemento HTML, SVG, texto o comentario.
 * Element     → elemento HTML o SVG; no incluye nodos de texto. Sin focus().
 * HTMLElement → elemento HTML, como button, input, a o div. Con focus().
 * null        → no se encontró un elemento o no hay uno disponible.
 *
 * Ejemplos:
 * document.body                  → HTMLElement
 * document.querySelector(".boton") → Element | null
 * document.createTextNode("Hola") → Text (Node, pero no Element)
 *
 * ⚠️ TRAMPA — ?. evita el acceso cuando el valor es null, pero no estrecha
 * Element a HTMLElement. instanceof comprueba el tipo y permite estrecharlo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) devolverFoco — devuelve el foco al elemento anterior, si es HTML.
 * ¿Por qué? ¿Por qué ?. no bastaba y instanceof sí?
 *
 */
export function devolverFoco(elemento: Element | null) {
  elemento.focus();
}
// devolverFoco(document.activeElement);

/* 2) MenuQueSeCierraFuera — el menú se cierra al pulsar fuera. En el navegador
 * ya funciona, pero el typecheck no lo deja pasar.
 * ¿Por qué? En el navegador, event.target siempre era algo de la página.
 * ¿Por qué TypeScript no se lo creía?
 *
 */
export function MenuQueSeCierraFuera() {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alPulsar = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", alPulsar);
    return () => document.removeEventListener("mousedown", alPulsar);
  }, []);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Compartir
      </button>

      {abierto && (
        <div ref={menuRef} role="group" aria-label="Opciones para compartir">
          <button type="button">Copiar enlace</button>
          <button type="button">Enviar por correo</button>
        </div>
      )}

      <p>Fuera del menú</p>
    </div>
  );
}
// <MenuQueSeCierraFuera />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — nacer abierto, morir cerrado
 *
 * Un modal que solo existe mientras está abierto nace al montarse y muere al
 * desmontarse. El efecto con [] guarda el estado original al nacer; su limpieza
 * lo restaura al morir, independientemente de cómo se cierre.
 *
 * SINTAXIS
 * useEffect(() => {
 *   const anterior = document.activeElement; // 1. guardar el foco
 *   cerrarRef.current?.focus();              // 2. mover el foco
 *   return () => devolverFoco(anterior);     // 3. devolver el foco
 * }, []);
 *
 * 🧠 ANALOGÍA — el marcapáginas: anotas dónde ibas antes de dejar el libro.
 *
 * 🗣️ LAS PIEZAS
 * document.activeElement → quién tiene el foco en ese momento, no antes.
 *
 * ⚠️ TRAMPA — devolver el foco desde un manejador solo cubre esa forma de
 * cierre. La limpieza cubre la ✕, Escape y el fondo.
 *
 * 💡 En StrictMode, el ensayo de desarrollo ejecuta montaje, limpieza y montaje
 * otra vez. No rompe nada: la limpieza devuelve el foco, y la segunda pasada
 * vuelve a guardar el mismo botón.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) ContactoConDosEntradas — el mapa se abre desde «Ver mapa» o «Cómo llegar».
 * El foco debe volver al botón que lo abrió. Pasa la responsabilidad al modal;
 * Pie no se toca.
 * ¿Por qué el padre no puede devolver el foco al botón correcto?
 *
 */
function Pie({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <footer>
      <button type="button" onClick={onOpenMap}>
        Cómo llegar
      </button>
    </footer>
  );
}

export function ModalDosEntradas({ onClose }: { onClose: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarRef.current?.focus();
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <a href="#mapa">Abrir en Google Maps</a>
    </div>
  );
}

export function ContactoConDosEntradas() {
  const [abierto, setAbierto] = useState(false);
  const verMapaRef = useRef<HTMLButtonElement>(null);

  function cerrar() {
    setAbierto(false);
    verMapaRef.current?.focus();
  }

  return (
    <div>
      <button ref={verMapaRef} type="button" onClick={() => setAbierto(true)}>
        Ver mapa
      </button>

      <Pie onOpenMap={() => setAbierto(true)} />

      {abierto && <ModalDosEntradas onClose={cerrar} />}
    </div>
  );
}
// <ContactoConDosEntradas />

/* 4) MapaConMarcapaginas — el foco se guarda y se devuelve, pero al cerrar el
 * modal se pierde. Tiene que volver al botón que lo abrió.
 * ¿Por qué? En el starter, ¿a quién había guardado anterior?
 *
 */
export function MapaConMarcapaginas({ onClose }: { onClose: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarRef.current?.focus();
    const anterior = document.activeElement;
    return () => devolverFoco(anterior);
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <a href="#mapa">Abrir en Google Maps</a>
    </div>
  );
}
// <MapaConMarcapaginas onClose={() => {}} />

/* 5) MapaSobreElMenu — se abre desde un menú del móvil que ya bloquea el scroll,
 * y al cerrar el mapa el fondo vuelve a moverse con el menú abierto. Al morir,
 * el overflow del body tiene que quedar como lo encontró.
 * ¿Por qué overflow = "" no sirve cuando el menú ya lo había bloqueado?
 *
 */
export function MapaSobreElMenu({ onClose }: { onClose: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const anterior = document.activeElement;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      devolverFoco(anterior);
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <a href="#mapa">Abrir en Google Maps</a>
    </div>
  );
}
// <MapaSobreElMenu onClose={() => {}} />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — al nacer, guarda lo que cambiarás; después, cámbialo.
 * Al morir, restaura el foco y el overflow original.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) MapModalDeProjex — completa el efecto: al nacer, foco en la ✕ y scroll
 * bloqueado; al morir, el scroll como estaba. Se cierra con ✕, Escape o clic
 * en el fondo; con las dos primeras, el foco vuelve a quien lo abrió (con el
 * fondo no: el clic se lo lleva después). El manejador de Escape ya funciona.
 * ¿Por qué la limpieza evita repetir la devolución del foco en cada cierre?
 *
 */
export function MapModalDeProjex({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Escape cierra el modal.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mapa de ubicación"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
          &times;
        </button>
        <a href="#mapa">Abrir en Google Maps</a>
      </div>
    </div>
  );
}
// <MapModalDeProjex onClose={() => {}} />
