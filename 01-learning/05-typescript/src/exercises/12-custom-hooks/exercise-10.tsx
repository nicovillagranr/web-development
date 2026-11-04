import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 10 — repaso de la carpeta 12: efectos, refs y foco · bloque 12
 *
 * 🎯 OBJETIVOS
 * · Elegir el array de un efecto según lo que hace.
 * · Limpiar lo que un efecto pone fuera: escuchas y temporizadores.
 * · Leer .current cuando ya hay algo dentro, y tipar el ref.
 * · Prestar el foco y devolverlo, con el tipo bien estrechado.
 *
 * 🟢 CONTEXTO — un repaso de lo visto en la carpeta 12, un tema por bloque y de
 * fácil a difícil. El último drill es tu MapModal, con todo junto.
 *
 * 🗺️ MAPA
 * A · useEffect y su array → drills 1–3
 * B · la limpieza → drills 4–6
 * C · refs: .current y focus() → drills 7–9
 * D · el préstamo del foco → drills 10–11
 * TODO JUNTO → drill 12
 *
 * ▸ 12 drills en orden. Prohibidos any, as, el ! de «confía en mí» (x!) y los
 * eslint-disable.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-10.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y dos pasan el test con el fallo dentro:
 * ejecuta los tres comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-10.pistas.md. Los 12: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE A — useEffect y su array
 *
 * 📌 Un efecto corre después de pintar. Sin array, después de cada render; con [],
 * solo al nacer; con [x], al nacer y cada vez que x cambia respecto del render
 * anterior.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) TituloDelMapa — mientras el mapa está abierto, la pestaña del navegador dice
 * «Mapa · zoom 1», y tiene que seguir al zoom cuando pulsas «Acercar». Al cerrar,
 * vuelve el título de antes. Ahora se queda en «zoom 1».
 * ¿Por qué? ¿Cada cuánto corría el efecto del starter, y cada cuánto el tuyo?
 *
 */
export function TituloDelMapa({ onClose }: { onClose: () => void }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const anterior = document.title;
    document.title = `Mapa · zoom ${zoom}`;
    return () => {
      document.title = anterior;
    };
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button type="button" onClick={() => setZoom(zoom + 1)}>
        Acercar
      </button>
      <button type="button" onClick={onClose}>
        Cerrar mapa
      </button>
    </div>
  );
}

/* 2) NotaConDosCampos — al abrir una nota nueva, el cursor queda en «Título». Si
 * pinchas en «Texto» y escribes «Hola», todo tiene que ir a «Texto». Ahora, tras la
 * primera letra, el cursor salta a «Título».
 * ¿Por qué? ¿Por qué el salto llega justo después de la primera letra, y no antes?
 *
 */
export function NotaConDosCampos() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const tituloRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    tituloRef.current?.focus();
  });

  return (
    <div>
      <input
        ref={tituloRef}
        aria-label="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea aria-label="Texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
    </div>
  );
}

/* 3) MapaConZoom — al abrirse, el foco va a la ✕. Al pulsar «Acercar», el foco tiene
 * que quedarse en «Acercar», y ahora salta a la ✕. Aquí no hay ninguna línea mal
 * escrita.
 * ¿Por qué? Tu efecto no usa zoom. ¿Por qué el starter lo repetía igual al acercar?
 *
 */
export function MapaConZoom({ onClose }: { onClose: () => void }) {
  const [zoom, setZoom] = useState(1);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarRef.current?.focus();
  }, [zoom]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
      <p>Zoom: {zoom}</p>
      <button type="button" onClick={() => setZoom(zoom + 1)}>
        Acercar
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE B — la limpieza
 *
 * 📌 Lo que un efecto pone fuera de React (una escucha, un temporizador) lo quita
 * su limpieza: la función que devuelve el efecto. React la llama al morir el
 * componente y antes de repetir el efecto.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) MapaConEscape — Escape cierra el mapa. Con el mapa ya cerrado, Escape no tiene
 * que llamar a nadie, y ahora sigue llamando a onClose.
 * ¿Por qué? En el starter, cuando el mapa se cerraba, ¿quién quitaba la escucha?
 *
 */
export function MapaConEscape({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", alPulsarTecla);
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <p>Pulsa Escape para cerrar.</p>
    </div>
  );
}

/* 5) ClicsEnLaPagina — mientras está montado, avisa con onClic de cada clic en la
 * página. Al desmontarse tiene que dejar de avisar, y ahora sigue. Esta vez la
 * limpieza sí está escrita.
 * ¿Por qué? ¿Por qué el removeEventListener del starter no quitaba nada?
 *
 */
export function ClicsEnLaPagina({ onClic }: { onClic: () => void }) {
  useEffect(() => {
    document.addEventListener("click", () => onClic());
    return () => document.removeEventListener("click", () => onClic());
  }, [onClic]);

  return <p>Contando clics en la página…</p>;
}

/* 6) MensajeConAutoguardado — el mensaje del formulario se guarda solo, un segundo
 * después de que dejas de escribir. Si escribes «Hola» de corrido, tiene que
 * guardarse una vez, «Hola»; ahora se guarda cuatro veces, una por letra.
 * ¿Por qué? Al escribir la «o», ¿qué pasaba con el temporizador que puso la «H»?
 *
 */
export function MensajeConAutoguardado({ onGuardar }: { onGuardar: (texto: string) => void }) {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (texto === "") return;
    setTimeout(() => onGuardar(texto), 1000);
  }, [texto, onGuardar]);

  return <textarea aria-label="Mensaje" value={texto} onChange={(e) => setTexto(e.target.value)} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE C — refs: .current y focus()
 *
 * 📌 useRef da una caja con .current dentro. React mete el elemento en .current al
 * pintarlo y lo saca al quitarlo: mientras no está pintado, .current vale null.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) BuscadorConRef — al abrirse, el buscador deja el cursor en el campo. En el
 * navegador ya funciona, pero no compila.
 * ¿Por qué? ¿Qué vale campoRef.current antes de que React pinte el campo, y qué
 * tiene que decir el tipo sobre eso?
 *
 */
export function BuscadorConRef() {
  const campoRef = useRef<HTMLInputElement>();

  useEffect(() => {
    campoRef.current?.focus();
  }, []);

  return <input ref={campoRef} type="search" aria-label="Buscar proyectos" />;
}

/* 8) PanelDeFiltros — «Filtrar proyectos» abre el panel de filtros de tu portfolio y
 * tiene que dejar el cursor en «Buscar tecnología». Ahora el foco se queda en el
 * botón.
 * ¿Por qué? Justo después de setAbierto(true), ¿qué hay en busquedaRef.current?
 *
 */
export function PanelDeFiltros() {
  const [abierto, setAbierto] = useState(false);
  const busquedaRef = useRef<HTMLInputElement>(null);

  function abrir() {
    setAbierto(true);
    busquedaRef.current?.focus();
  }

  return (
    <div>
      <button type="button" onClick={abrir}>
        Filtrar proyectos
      </button>
      {abierto && (
        <div role="region" aria-label="Filtros">
          <input ref={busquedaRef} aria-label="Buscar tecnología" />
        </div>
      )}
    </div>
  );
}

/* 9) useFocoAlNacer — un hook que pone el foco en un elemento cuando nace el
 * componente. ConfirmacionDeEnvio lo usa con su botón «Entendido», pero el foco no
 * se mueve. Arregla el hook y su llamada: te hará falta un import nuevo.
 * ¿Por qué? ¿Qué hay en entendidoRef.current mientras ConfirmacionDeEnvio se pinta
 * por primera vez, y qué cuando corre el efecto?
 *
 */
export function useFocoAlNacer(elemento: HTMLElement | null): void {
  useEffect(() => {
    elemento?.focus();
  }, [elemento]);
}

export function ConfirmacionDeEnvio({ onClose }: { onClose: () => void }) {
  const entendidoRef = useRef<HTMLButtonElement>(null);
  useFocoAlNacer(entendidoRef.current);

  return (
    <div role="dialog" aria-label="Mensaje enviado">
      <p>Te respondemos en menos de 24 horas.</p>
      <button ref={entendidoRef} type="button" onClick={onClose}>
        Entendido
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ BLOQUE D — el préstamo del foco
 *
 * 📌 document.activeElement es Element | null, y Element no tiene focus(): solo
 * HTMLElement lo tiene. Lo que el efecto mueve al nacer, la limpieza lo devuelve.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 10) MenuQueDevuelveFoco — tu menú del móvil: al abrirse, el foco va a «Servicios»;
 * al cerrarse, vuelve a quien lo tenía. En el navegador ya funciona, pero no
 * compila.
 * ¿Por qué? Si en el navegador funciona, ¿por qué TypeScript no te deja llamar a
 * focus() en anterior?
 *
 */
export function MenuQueDevuelveFoco({ onClose }: { onClose: () => void }) {
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const anterior = document.activeElement;
    primerEnlaceRef.current?.focus();
    return () => {
      anterior?.focus();
    };
  }, []);

  return (
    <nav aria-label="Menú del móvil">
      <a ref={primerEnlaceRef} href="#servicios" onClick={onClose}>
        Servicios
      </a>
      <button type="button" onClick={onClose}>
        Cerrar menú
      </button>
    </nav>
  );
}

/* 11) GraciasPorEscribir — al enviar el formulario sale «¡Gracias por escribir!»
 * con el foco en «Cerrar», y al cerrar el foco tiene que volver a «Enviar». Ahora se
 * pierde. Aquí no hay ninguna línea mal escrita.
 * ¿Por qué? En el starter, ¿quién tenía el foco en el momento de anotar anterior?
 *
 */
export function GraciasPorEscribir({ onClose }: { onClose: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarRef.current?.focus();
    const anterior = document.activeElement;
    return () => {
      if (anterior instanceof HTMLElement) anterior.focus();
    };
  }, []);

  return (
    <div role="dialog" aria-label="Gracias">
      <p>¡Gracias por escribir!</p>
      <button ref={cerrarRef} type="button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TODO JUNTO — tu MapModal
 *
 * 📌 Un efecto tiene un solo array: si algo de él cambia, se repiten su limpieza y
 * su cuerpo enteros, también las líneas que no usan lo que cambió.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 12) MapModal — tu MapModal de Projex, recortado. Al nacer: scroll bloqueado y foco
 * en la ✕; Escape cierra; al morir, el overflow y el foco vuelven. «Copiar
 * dirección» avisa al padre, que se vuelve a pintar y te pasa un onClose nuevo: el
 * foco tiene que quedarse en «Copiar dirección», y ahora salta a la ✕.
 * ¿Por qué? ¿Qué parte de tu MapModal necesita onClose, y cuáles no?
 *
 */
export function MapModal({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  const cerrarRef = useRef<HTMLButtonElement>(null);

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
