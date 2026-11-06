import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
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
 * El efecto del starter sólo corría al nacer porque no tenía array
 * El mío [zoom], corre al nacer y cuando el valor de zoom cambia, por eso se queda en zoom 1
 * Al morir el componente, la limpiza se encarga de restaurar el título y el valor de zoom, por eso al cerrar todo vuelve a la normalidad.
 */
export function TituloDelMapa({ onClose }: { onClose: () => void }) {
  // Hacemos un ref al botón que nos servirá para acercar.
  const acercarRef = useRef<HTMLButtonElement>(null);
  // Guardamos el valor del título anterior en un ref, para poder restaurarlo al desmontar.
  const tituloAnteriorRef = useRef(document.title);
  // Seteamos en 1 el valor inicial del zoom, para después modificarlo con la función setZoom.
  const [zoom, setZoom] = useState(1);

  // Enfocamos Acercar al montar.
  useEffect(() => {
    // acercarRef.current? Significa: Si acercarRef existe en el DOM? Entonces le damos focus.
    acercarRef.current?.focus();
  }, []);

  // Actualizamos el título cuando cambia el zoom.
  useEffect(() => {
    document.title = `Mapa · zoom ${zoom}`;
  }, [zoom]);

  // Restauramos el título original al desmontar.
  useEffect(() => {
    // Copiamos lo que hay en la caja al nacer: la limpieza usa esta copia, no lo que haya
    // en la caja cuando el mapa muera.
    const tituloAnterior = tituloAnteriorRef.current;
    return () => {
      document.title = tituloAnterior;
    };
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button
        ref={acercarRef}
        type="button"
        onClick={() => {
          setZoom((zoomAnterior) => zoomAnterior + 1);
        }}
      >
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
 * Sin array de dependencias, al escribir una tecla el efecto se ejecuta de nuevo y vuelve a enfocar el input de título,
 * por eso saltaba después de la primera letra.
 */
export function NotaConDosCampos() {
  // Seteamos el valor inicial del título con un string vacío.
  const [titulo, setTitulo] = useState("");
  // Setemos el valor inicial del texto con un string vacío.
  const [texto, setTexto] = useState("");
  // Hacemos referencia al input del título para poder darle focus al montar el componente.
  const tituloRef = useRef<HTMLInputElement>(null);

  // El efecto se ejecuta al montar el componente y le da focus al input del título.
  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  return (
    <div>
      <label htmlFor="titulo">Título</label>
      <input
        ref={tituloRef}
        id="titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label htmlFor="texto">Texto</label>
      <textarea id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
    </div>
  );
}

/* 3) MapaConZoom — al abrirse, el foco va a la ✕. Al pulsar «Acercar», el foco tiene
 * que quedarse en «Acercar», y ahora salta a la ✕. Aquí no hay ninguna línea mal
 * escrita.
 * ¿Por qué? Tu efecto no usa zoom. ¿Por qué el starter lo repetía igual al acercar?
 * Cada vez que el usuario daba click en zoom, el valor de zoom cambiada y volvía a ejecutar el efecto por culpa del array de dependencias con [zoom]
 */
export function MapaConZoom({ onClose }: { onClose: () => void }) {
  // Seteamos el valor inicial del zoom en 1, para después modificarlo con la función setZoom.
  const [zoom, setZoom] = useState(1);
  // Hacemos referencia a un eventual botón de cerrar que estará en el DOM para poder darle focus al montar el componente.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Al montar se corre este efecto, que le da focus al botón de cerrar.
  // Con array de dependencias vacío, el efecto solo se ejecuta al montar el componente y no al actualizarlo.
  useEffect(() => {
    cerrarRef.current?.focus();
  }, []);

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
 * Nadie quitaba la escucha, por eso al cerrar el mapa, la escucha seguía activa y seguía llamando a onClose duplicadamente hasta el infinito.
 */
export function MapaConEscape({ onClose }: { onClose: () => void }) {
  // Al montar el componente, se ejecuta este efecto que añade un event listener al documento para escuchar la tecla Escape.
  // El efecto volverá a correr cada vez que onClose cambie, y al desmontar el componente se ejecutará la función de limpieza que quita el event listener.
  useEffect(() => {
    const alPulsarTecla = (event: KeyboardEvent) => {
      // Si la tecla pulsada por el usuario es Escape, se llama a la función onClose que cierra el mapa.
      if (event.key === "Escape" || event.key === "Esc") {
        onClose();
      }
    };
    // Se añade el event listener al documento para escuchar la tecla Escape.
    document.addEventListener("keydown", alPulsarTecla);
    // Una vez que el componente se desmonta, se ejecuta la función de limpieza que quita el event listener para evitar que siga llamando a onClose.
    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
    };
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
 * Porque el starter no pasaba la misma función que se pasó al addEventListener, sino una nueva función que no estaba registrada como listener, por eso no quitaba nada.
 */
export function ClicsEnLaPagina({ onClic }: { onClic: () => void }) {
  // Seteamos un contador inicial en 0, para después modificarlo con la función setContador.
  const [, setContador] = useState(0);

  useEffect(() => {
    // Cuando el usuario ejecuta onClic, se incrementa el contador y se llama a la función onClic que avisa del clic en la página.
    const alClic = () => {
      onClic();
      setContador((contadorAnterior) => contadorAnterior + 1);
    };
    // Se añade el event listener al documento para escuchar los clics en la página.
    document.addEventListener("click", alClic);
    // Una vez que el componente se desmonta, se ejecuta la función de limpieza que quita el event listener para evitar que siga llamando a onClic.
    return () => {
      document.removeEventListener("click", alClic);
    };
    // El efecto volverá a correr cada vez que onClic cambie, y al desmontar el componente se ejecutará la función de limpieza que quita el event listener.
  }, [onClic]);

  return (
    <>
      <p>Contando clics en la página…</p>
    </>
  );
}

/* 6) MensajeConAutoguardado — el mensaje del formulario se guarda solo, un segundo
 * después de que dejas de escribir. Si escribes «Hola» de corrido, tiene que
 * guardarse una vez, «Hola»; ahora se guarda cuatro veces, una por letra.
 * ¿Por qué? Al escribir la «o», ¿qué pasaba con el temporizador que puso la «H»?
 * Al no haber un clearTimeout en el efecto, cada vez que se escribía una letra se creaba un nuevo temporizador sin limpiar el anterior, por eso se guardaba cada letra individualmente.
 */
export function MensajeConAutoguardado({ onGuardar }: { onGuardar: (texto: string) => void }) {
  // Seteamos el valor inicial de texto con un string vacío, para después modificarlo con la función setTexto.
  const [texto, setTexto] = useState("");

  useEffect(() => {
    // Si el texto está vacío, no se hace nada y no se ejecuta el temporizador.
    if (texto === "") {
      return;
    }
    // Se crea un temporizador que llama a la función onGuardar con el texto actual después de 1 segundo.
    const temporizador = setTimeout(() => {
      onGuardar(texto);
    }, 1000);
    // La función de limpieza se ejecuta antes de que el efecto se vuelva a ejecutar, y cancela el temporizador anterior para evitar que se guarde el texto varias veces.
    return () => {
      clearTimeout(temporizador);
    };
  }, [texto, onGuardar]);

  return (
    <>
      <textarea aria-label="Mensaje" value={texto} onChange={(e) => setTexto(e.target.value)} />
    </>
  );
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
 * En la línea de tipado de campoRef, se indica que el tipo de current es HTMLInputElement | null, por lo que TypeScript no permite llamar a focus() directamente sobre current sin antes verificar que no sea null.
 */
export function BuscadorConRef() {
  // Hacemos referencia al input del buscador para poder darle focus al montar el componente.
  const campoRef = useRef<HTMLInputElement>(null);

  // Al montar el componente, se ejecuta este efecto que le da focus al input del buscador.
  useEffect(() => {
    campoRef.current?.focus();
    // Array de dependencias vacío, el efecto solo se ejecuta al montar el componente y no al actualizarlo.
  }, []);

  return (
    <>
      <input ref={campoRef} type="search" aria-label="Buscar proyectos" />
    </>
  );
}

/* 8) PanelDeFiltros — «Filtrar proyectos» abre el panel de filtros de tu portfolio y
 * tiene que dejar el cursor en «Buscar tecnología». Ahora el foco se queda en el
 * botón.
 * ¿Por qué? Justo después de setAbierto(true), ¿qué hay en busquedaRef.current?
 * No hay nada, porque el input aún no se ha renderizado, por eso el foco no se mueve al input.
 * Para solucionar esto, aplicamos un useEffect que se ejecuta después de que el componente se ha renderizado y el input está disponible en el DOM, y dentro de ese efecto le damos focus al input.
 */
export function PanelDeFiltros() {
  // Seteamos el valor inicial de abierto en false, para después modificarlo con la función setAbierto.
  const [abierto, setAbierto] = useState(false);
  // Hacemos referencia al input del buscador para poder darle focus al abrir el panel de filtros.
  const busquedaRef = useRef<HTMLInputElement>(null);

  // Una vez montado el componente y es renderizado el input en el DOM, se ejecuta este efecto
  useEffect(() => {
    // Si abierto pasa a true, le damos focus al input del buscador, porque en ese momento ya pasa a existir en el DOM
    if (abierto) {
      busquedaRef.current?.focus();
    }
    // El efecto se ejecuta cada vez que cambia el valor de abierto.
  }, [abierto]);

  // Esta es la función para abrir el panel de filtros, que cambia el estado de abierto a true.
  const abrir = () => {
    setAbierto(true);
  };

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
 * Lo que hay en entendidoRef.current mientras ConfirmacionDeEnvio se pinta por primera vez es null, porque el botón aún no se ha renderizado. Cuando corre el efecto, entendidoRef.current ya apunta al botón, por eso podemos darle focus en ese momento.
 */

// Usamos RefObject para tipar la referencia que se pasa al hook, y useEffect para ejecutar el efecto después de que el componente se ha renderizado.
export function useFocoAlNacer(referencia: RefObject<HTMLElement | null>): void {
  // El efecto se ejecuta después de que el componente se ha renderizado, y le da focus al elemento referenciado si existe.
  useEffect(() => {
    referencia.current?.focus();
    // El efecto se ejecuta cada vez que cambia la referencia, aunque en este caso no debería cambiar.
  }, [referencia]);
}

export function ConfirmacionDeEnvio({ onClose }: { onClose: () => void }) {
  // Hacemos referencia al botón «Entendido» para poder darle focus al montar el componente.
  const entendidoRef = useRef<HTMLButtonElement>(null);
  // Llamamos al hook useFocoAlNacer con la referencia del botón, para que el foco se mueva a él cuando el componente se monta.
  useFocoAlNacer(entendidoRef);

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
 * Porque document.activeElement devuelve un tipo Element | null, y Element no tiene el método focus(). Para poder llamar a focus(), necesitamos asegurarnos de que anterior es un HTMLElement antes de llamarlo.
 */
export function MenuQueDevuelveFoco({ onClose }: { onClose: () => void }) {
  // Hacemos referencia al primer enlace del menú para poder darle focus al montar el componente.
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  // Una vez montado el componente, se ejecuta este efecto que le da focus al primer enlace del menú y guarda el elemento que tenía el foco antes de abrir el menú.
  useEffect(() => {
    // Guardamos el elemento que tenía puesto el foco antes de abrir el menú, osea el botón "Abrir menú" del componente padre.
    const activo = document.activeElement;
    // Evaluamos si el elemento activo es un HTMLElement, y si lo es, lo guardamos en la variable anterior. Si no lo es, guardamos null.
    const anterior = activo instanceof HTMLElement ? activo : null;
    // Si primerEnlaceRef existe en el DOM, le damos focus.
    primerEnlaceRef.current?.focus();
    // La función de limpieza se ejecuta al desmontar el componente, y devuelve el foco al elemento que lo tenía antes de abrir el menú.
    return () => {
      anterior?.focus();
    };
    // Array de dependencias vacío, el efecto solo se ejecuta al montar el componente y no al actualizarlo.
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
  // Hacemos referencia a un botón HTML que inicialmente será null
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Una vez montado el componente, se ejecuta el efecto
  useEffect(() => {
    // Se toma el elemento que tenía focus antes de abrir el modal
    const anterior = document.activeElement;
    // Si cerrarRef ya está en el DOM, se le dá focus
    cerrarRef.current?.focus();
    // Cuando se desmonta el componente
    return () => {
      if (anterior instanceof HTMLElement) {
        anterior.focus();
      }
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
 * La única parte del MapModal que necesita onClose es la escucha del "Escape", porque es el único efecto que utiliza onClose
 * Los demás no lo necesitan porque su funcionalidad no pasa por el estado o uso de onClose
 */
export function MapModal({ onClose, onCopiar }: { onClose: () => void; onCopiar: () => void }) {
  // Hacemos referencia a un elemento Button HTML. Iniciará en null antes del primer render
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // 1. Primer Efecto: Bloqueamos y restauramos el scroll
  useEffect(() => {
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
    // Array de dependencias vacío, el efecto solo se ejecuta al montar el componente y no al actualizarlo.
  }, []);

  // 2. Segundo efecto: Gestionamos el focus al abrir y cerrar el modal
  useEffect(() => {
    // Guardamos el elemento que tenía puesto el foco previo al abrir el modal
    const anteriorFoco = document.activeElement;
    // Si cerrarRef ya existe en el DOM, lo focuamos de nuevo al cerrar el modal
    cerrarRef.current?.focus();

    // Si al cerrar el modal, el foco estaba en el botón de cerrar, lo focuamos de nuevo al abrir el modal
    return () => {
      if (anteriorFoco instanceof HTMLElement) {
        anteriorFoco.focus();
      }
    };
    // Array de dependencias vacío, el efecto solo se ejecuta al montar el componente y no al actualizarlo.
  }, []);

  // 3. Escuchamos el Escape
  useEffect(() => {
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", alPulsarTecla);
    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
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
