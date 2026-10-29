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
 * ESCALERA 2 · el drill 2, pieza a pieza → peldaños 2a–2e, debajo del 2
 * TEORÍA 2 · montaje y limpieza → drills 3–5
 * ARMARLO TÚ → drill 6
 *
 * ▸ 6 drills + 5 peldaños en orden. Prohibidos any, as y el ! de «confía en mí» (x!).
 * pnpm test:run src/exercises/12-custom-hooks/exercise-06.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta ambos comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-06.pistas.md. Drills 2–6 y la escalera: banco, pestaña 12.
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
 * Porque ?. solo evita errores al intentar acceder a propiedades de null o undefined, pero no cambia el tipo del elemento. Por eso necesitamos instanceof para asegurarnos de que podemos llamar a focus() de manera segura.
 */
export function devolverFoco(elemento: Element | null) {
  // Qué significa instanceof HTMLElement?
  // instanceof HTMLElement comprueba en tiempo de ejecución si el elemento es una instancia de HTMLElement, osea si es un elemento HTML válido que puede recibir foco. Esto es necesario porque document.activeElement puede devolver un Element que no sea un HTMLElement (por ejemplo, un SVGElement o null). El operador ?. solo evita errores al intentar acceder a propiedades de null o undefined, pero no cambia el tipo del elemento. Por eso necesitamos instanceof para asegurarnos de que podemos llamar a focus() de manera segura.
  if (elemento instanceof HTMLElement) {
    elemento.focus();
  }
}
// devolverFoco(document.activeElement);

/* 2) MenuQueSeCierraFuera — el menú se cierra al pulsar fuera. En el navegador
 * ya funciona, pero el typecheck no lo deja pasar.
 * ¿Por qué? En el navegador, event.target siempre era algo de la página.
 * ¿Por qué TypeScript no se lo creía?
 * Porque event.target puede ser cualquier EventTarget, que incluye nodos de la página y otros objetos como window. Por eso necesitamos usar instanceof para comprobar si event.target es un Node antes de acceder a su propiedad contains.
 */
export function MenuQueSeCierraFuera() {
  // Seteamos en false el estado inicial del menú
  const [abierto, setAbierto] = useState(false);
  // Hacemos referencia al div del menú para poder comprobar si el clic fue dentro o fuera de él
  const menuRef = useRef<HTMLDivElement>(null);

  // Una vez montado el componente, ejecutamos el efecto:
  useEffect(() => {
    // Definimos la función que se ejecutará al pulsar en cualquier parte del documento
    const alPulsar = (event: MouseEvent) => {
      // Comprobamos si el menú está abierto y si el clic fue fuera del menú
      if (
        abierto && // Si el menú está abierto
        event.target instanceof Node && // Y el objeto del evento es un nodo(para poder usar contains): El evento fue hecho sobre un nodo de la página (Node)
        !menuRef.current?.contains(event.target) // El click no fue dentro del menú (contains devuelve true si el nodo está dentro del menú, y false si no lo está)
      ) {
        // Si es así, cerramos el menú
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", alPulsar);
    return () => document.removeEventListener("mousedown", alPulsar);
  }, [abierto]);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Compartir
      </button>

      {abierto && (
        // Este div usa menuRef para poder comprobar si el clic fue dentro o fuera de él
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
 * ▸ ESCALERA 2 — el drill 2, pieza a pieza (refuerzo)
 *
 * Tu línea del 2 junta tres piezas, y cada peldaño aísla una:
 * !menuRef.current?.contains(event.target)
 *
 * DEFINICIÓN
 * EventTarget es todo lo que puede recibir eventos: los nodos de la página, pero
 * también window, que no es un nodo. De más ancho a más estrecho:
 * EventTarget → Node → Element → HTMLElement.
 *
 * 🧠 ANALOGÍA — un guardia en la puerta del menú: pregunta «¿esta persona está
 * dentro de mi recinto?», y solo acepta a gente de la página.
 *
 * 🗣️ LAS PIEZAS
 * menuRef.current → el que pregunta: el <div> del menú, dueño de contains
 * contains(…)     → «¿esto está dentro de mí?»; solo acepta un Node
 * event.target    → lo que se pregunta: dónde cayó el clic
 *
 * 2a quién pregunta · 2b qué cabe en un EventTarget · 2c lo que acepta contains ·
 * 2d de dónde sale el tipo de event.target · 2e el 2 otra vez, en otro componente.
 * Al terminar, vuelve a tu ¿Por qué? del 2: ya tienes las piezas.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 2a) estaDentro — la mitad derecha de tu línea del 2, sin React ni eventos.
 * Dentro de una caja de la página hay un botón, y fuera, un párrafo. Devuelve
 * true si cosa está dentro de caja, con contains.
 * ¿Por qué? En el starter, ¿quién hacía la pregunta y por quién preguntaba?
 * Estaba mal por orden de los argumentos: caja es el que pregunta y cosa es lo que se pregunta. En el starter, estaba al revés.
 */
export function estaDentro(caja: Node, cosa: Node): boolean {
  return caja.contains(cosa);
}
// estaDentro(caja, boton);

/* 2b) esDeLaPagina — window recibe eventos igual que un botón, pero no es parte
 * de la página. Devuelve true solo si objetivo es un nodo de la página (un Node:
 * un elemento o un texto). window, o un EventTarget suelto, no.
 * ¿Por qué? window y un <button> aceptan los dos addEventListener. ¿Qué tiene el
 * botón que window no tiene?
 * Lo que el botón tiene es que es un nodo de la página, mientras que window no lo es.
 * Por eso podemos usar instanceof Node para comprobar si el objetivo del evento es un nodo de la página.
 */
export function esDeLaPagina(objetivo: EventTarget): boolean {
  return objetivo instanceof Node;
}
// esDeLaPagina(window);

/* 2c) clicDentro — junta el 2a y el 2b: el objetivo de un clic llega como
 * EventTarget | null, y la caja tiene que decir si está dentro. Si objetivo no
 * es un nodo de la página, la respuesta es false.
 * ¿Por qué? Con el starter, ¿qué pasaba al llamar a clicDentro con window?
 * Pasaba que window no es un nodo de la página, por lo que la función reventaba: contains no acepta algo que no sea un Node, y lanzaba un TypeError en vez de devolver false.
 * Por eso necesitamos comprobar si objetivo es un nodo de la página antes de llamar a contains.
 */
export function clicDentro(caja: Node, objetivo: EventTarget | null): boolean {
  // Si objetivo es un nodo de la página, osea:
  // Un elemento HTML, SVG, texto, o comentario, entonces podemos usar contains para comprobar si está dentro de la caja.
  if (objetivo instanceof Node) {
    // retornamos un booleano que indica si el objetivo está dentro de la caja o no.
    return caja.contains(objetivo);
  }
  // Solo false
  return false;
}
// clicDentro(caja, window);

/* 2d) dondeCayo — el mismo manejador de mousedown puede recibir un clic en un
 * botón o un evento lanzado sobre window. Devuelve el nodeName de event.target
 * («BUTTON», «P»…) si es un nodo de la página, y «fuera de la página» si no.
 * ¿Por qué? En los dos casos el tipo de event es MouseEvent. ¿Puede TypeScript
 * saber, solo con eso, sobre qué cae el clic?
 * No, TypeScript no puede saber solo con el tipo MouseEvent sobre qué cae el clic, porque event.target puede ser cualquier EventTarget, que incluye nodos de la página y otros objetos como window. Por eso necesitamos usar instanceof para comprobar si event.target es un Node antes de acceder a su propiedad nodeName.
 */
export function dondeCayo(event: MouseEvent): string {
  // Qué se está consultando aquí?
  // Teniendo en cuenta que estamos hablando de un click, se está consultando si el objetivo del evento (event.target) es un nodo de la página (Node). Si lo es, devolvemos su nodeName (el nombre del elemento HTML, como BUTTON o P). Si no lo es, devolvemos "fuera de la página".
  return event.target instanceof Node ? event.target.nodeName : "fuera de la página";
}
// document.addEventListener("mousedown", (event) => console.log(dondeCayo(event)));

/* 2e) FiltrosQueSeCierranFuera — el panel de filtros de tu portfolio, con el
 * mismo cierre que el menú del 2. En el starter, marcar un filtro de dentro
 * también lo cierra: tiene que cerrarse solo con un clic fuera del panel.
 * ¿Por qué? En el starter, ¿con qué comparaba !== el clic en la casilla «React»?
 * Porque en el starter, el clic en la casilla «React» comparaba event.target con panelRef.current usando !==. Sin embargo, event.target es el input de la casilla, mientras que panelRef.current es el div del panel de filtros. Como son elementos distintos, la condición !== se cumple y el panel se cierra, aunque el clic haya ocurrido dentro de él. Por eso necesitamos usar contains para comprobar si event.target está dentro del panel.
 */
export function FiltrosQueSeCierranFuera() {
  // Seteamos el estado inicial del panel de filtros como cerrado: false
  const [abierto, setAbierto] = useState(false);
  // Hacemos referencia al div del panel de filtros para poder comprobar si el clic fue dentro o fuera de él
  const panelRef = useRef<HTMLDivElement>(null);

  // Una vez montado el componente, ejecutamos el efecto:
  useEffect(() => {
    const alPulsar = (event: MouseEvent) => {
      // Aquí está el problema:
      // Si el menú está abierto y el clic no fue directamente sobre el div del panel,
      // cerramos el panel.
      // Pero no funciona como debería, porque al hacer clic en la casilla «React»,
      // event.target es el input, no el div del panel.
      // Como ambos elementos son distintos, la condición !== se cumple y el panel se cierra,
      // aunque el clic haya ocurrido dentro de él.
      // if (abierto && event.target !== panelRef.current) {
      // setAbierto(false);
      // }

      // Solución:
      // Si el menú está abierto,
      // y event.target es un Node válido del DOM,
      // y el panel NO contiene al elemento que recibió el clic,
      // entonces cerramos el panel.
      if (abierto && event.target instanceof Node && !panelRef.current?.contains(event.target)) {
        setAbierto(false);
      }
    };

    document.addEventListener("mousedown", alPulsar);
    return () => document.removeEventListener("mousedown", alPulsar);
  }, [abierto]);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Filtros
      </button>

      {abierto && (
        <div ref={panelRef} role="group" aria-label="Filtros del portfolio">
          <label>
            <input type="checkbox" /> React
          </label>
          <label>
            <input type="checkbox" /> TypeScript
          </label>
        </div>
      )}

      <p>Resto del portfolio</p>
    </div>
  );
}
// <FiltrosQueSeCierranFuera />

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
 * PieConComoLlegar no se toca.
 * ¿Por qué el padre no puede devolver el foco al botón correcto?
 * Porque el padre no sabe cuál de los dos botones abrió el modal, ya que ambos botones llaman a la misma función para abrir el modal. Por eso, el modal debe encargarse de guardar y devolver el foco al botón correcto que lo abrió.
 */

export function ContactoConDosEntradas() {
  // Inicializamos el estado para que el modal comience cerrado.
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Ver mapa
      </button>

      {/* Renderizamos el componente PieConComoLlegar y le pasamos la función que abre el mapa. */}
      <PieConComoLlegar
        onOpenMap={() => {
          setAbierto(true);
        }}
      />

      {/* Si abierto es true, renderizamos el modal*/}
      {abierto && (
        <MapaQueRecuerdaQuienLoAbrio
          onClose={() => {
            setAbierto(false);
          }}
        />
      )}
    </div>
  );
}

// Recibimos la función onOpenMap del padre.
// Al pulsar «Cómo llegar», ejecutamos esa función para abrir el mapa.
function PieConComoLlegar({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <button type="button" onClick={onOpenMap}>
      Cómo llegar
    </button>
  );
}

export function MapaQueRecuerdaQuienLoAbrio({ onClose }: { onClose: () => void }) {
  // Creamos una referencia al botón «Cerrar mapa» para poder enfocarlo.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Guardamos el elemento que tenía el foco antes de abrir el modal.
  const focoAnteriorRef = useRef<HTMLElement | null>(null);

  // Después del montaje inicial, movemos el foco al botón «Cerrar mapa».
  useEffect(() => {
    // Guardamos el elemento que tenía el foco antes de abrir el modal.
    const elementoActivo = document.activeElement;

    // Comprobamos que sea un elemento HTML antes de guardarlo.
    if (elementoActivo instanceof HTMLElement) {
      focoAnteriorRef.current = elementoActivo;
    }

    // Movemos el foco al botón «Cerrar mapa».
    cerrarRef.current?.focus();

    // Al desmontar el modal, devolvemos el foco al elemento anterior.
    return () => {
      focoAnteriorRef.current?.focus();
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación" className="flex flex-col">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
    </div>
  );
}

/* 4) MapaConMarcapaginas — el foco se guarda y se devuelve, pero al cerrar el
 * modal se pierde. Tiene que volver al botón que lo abrió.
 * ¿Por qué? En el starter, ¿a quién había guardado anterior?
 * El orden estaba incorrecto porque:
 * 1. Se guardaba el elemento activo (anterior) después de mover el foco al botón «Cerrar mapa», lo que significa que anterior siempre apuntaba al botón «Cerrar mapa» en lugar del botón que abrió el modal.
 * 2. Al desmontar el modal, se intentaba devolver el foco a anterior, que ahora era el botón «Cerrar mapa», en lugar del botón que abrió el modal.
 * Por eso, al cerrar el modal, el foco no volvía al botón correcto y se perdía.
 */

export function MapaConMarcapaginas({ onClose }: { onClose: () => void }) {
  // Creamos una referencia al botón «Cerrar mapa» para poder enfocarlo.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Una vez montado el componente, ejecutamos el efecto.
  useEffect(() => {
    // Paso 1: guardamos el elemento que tiene el foco antes de abrir el modal.
    // Este elemento debería ser el botón que el usuario pulsó para abrir el mapa.
    const anterior = document.activeElement;

    // Paso 2: movemos el foco al botón «Cerrar mapa», osea la X del modal.
    cerrarRef.current?.focus();

    // Paso 3: cuando el modal se desmonte, ejecutamos la función de limpieza.
    return () => {
      // Paso 4: intentamos devolver el foco al elemento que guardamos en «anterior».
      devolverFoco(anterior);
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
    </div>
  );
}

/* 5) MapaSobreElMenu — se abre desde un menú del móvil que ya bloquea el scroll,
 * y al cerrar el mapa el fondo vuelve a moverse con el menú abierto. Al morir,
 * el overflow del body tiene que quedar como lo encontró.
 * ¿Por qué overflow = "" no sirve cuando el menú ya lo había bloqueado?
 * Porque si el menú ya había bloqueado el scroll estableciendo overflow = "hidden", al cerrar el mapa y establecer overflow = "", se estaría eliminando la propiedad overflow del body, lo que permitiría que el fondo se moviera nuevamente. En cambio, al guardar el valor original de overflow antes de abrir el mapa y restaurarlo al cerrar, se asegura que el estado del scroll vuelva a ser exactamente como estaba antes de abrir el mapa, manteniendo el bloqueo del scroll si el menú aún está abierto.
 */
export function MapaSobreElMenu({ onClose }: { onClose: () => void }) {
  // Creamos una referencia al botón «Cerrar mapa» para poder enfocarlo.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 1. Guardamos el elemento que tenía el foco antes de abrir el modal.
    const anterior = document.activeElement;

    // 2. Guardamos el valor exacto actual (sea "" o "hidden" por el menú)
    const overflowAnterior = document.body.style.overflow;

    // 3. Bloqueamos para el mapa
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    return () => {
      // 4. Restauramos el valor original exacto que encontramos
      document.body.style.overflow = overflowAnterior;
      devolverFoco(anterior);
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — al nacer, guarda lo que cambiarás; después, cámbialo.
 * Al morir, restaura el foco y el overflow original.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) MapModalDeProjex — completa el efecto: al nacer, foco en la ✕ y scroll
 * bloqueado; al morir, el scroll como estaba. Se cierra con ✕, Escape o clic
 * en el fondo; con las dos primeras, el foco vuelve a quien lo abrió (con el
 * fondo no: el clic se lo lleva después). El manejador de Escape ya funciona.
 * ¿Por qué la limpieza evita repetir la devolución del foco en cada cierre?
 * Porque la limpieza del efecto se ejecuta automáticamente cuando el componente se desmonta, independientemente de cómo se cierre el modal (ya sea con la ✕, Escape o clic en el fondo). Esto significa que no es necesario repetir la devolución del foco en cada manejador de cierre, ya que la limpieza se encargará de restaurar el foco al elemento que lo tenía antes de abrir el modal. Además, esto asegura que el foco se devuelva correctamente incluso si el modal se cierra de una manera inesperada o desde un evento externo.
 */
export function MapModalDeProjex({ onClose }: { onClose: () => void }) {
  // Creamos una referencia al botón «Cerrar mapa» para poder enfocarlo.
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Una vez montado el componente, ejecutamos el efecto.
  useEffect(() => {
    // 1. Guardamos el elemento que tenía el foco antes de abrir el modal.
    const anterior = document.activeElement;

    // 2. Guardamos el valor exacto actual (sea "" o "hidden" por el menú)
    const overflowAnterior = document.body.style.overflow;

    // 3. Bloqueamos para el mapa y enfocamos la equis
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    // Escape cierra el modal.
    const handleKeyDown = (event: KeyboardEvent) => {
      // Si el usuario pulsa Escape, llamamos a la función onClose para cerrar el modal.
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Al morir (desmontar), restauramos el overflow y el foco original
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflowAnterior;

      // Solo devolvemos el foco si "anterior" sigue existiendo en el DOM
      if (anterior instanceof HTMLElement && document.body.contains(anterior)) {
        devolverFoco(anterior);
      }
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mapa de ubicación"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Cerrar mapa">
          &times;
        </button>
      </div>
    </div>
  );
}
