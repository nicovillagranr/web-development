import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 03 — useRef: tu propia agarradera a un elemento · bloque 12
 *
 * 📌 RECORDATORIO — los refs de tu MapModal, recortados:
 * const closeButtonRef = useRef<HTMLButtonElement>(null);
 * useEffect(() => {
 *   closeButtonRef.current?.focus();
 * }, [onClose]);
 * <button ref={closeButtonRef} type="button" onClick={onClose}>×</button>
 *
 * 🎯 OBJETIVOS
 * · Crear un ref, engancharlo a un elemento y usarlo desde un efecto o un manejador.
 * · Tipar el ref con el elemento al que apunta.
 * · Decir cuándo .current vale null y protegerte de ello.
 * · Decidir si un trabajo va en el manejador de un evento o en un efecto.
 *
 * 🟢 CONTEXTO — en el 01 enfocaste la ✕ con getElementById: buscar en toda la
 * página por un id que te tienes que inventar y que no se puede repetir. Si el
 * componente se pinta dos veces, hay dos ✕ con el mismo id. Un ref es tu
 * agarradera a ese elemento.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · qué es un ref y cómo se tipa → drills 1–3
 * TEORÍA 2 · cuándo .current vale null → drills 4–5
 * ESCALERA · ¿en el manejador o en un efecto? → drills 6–13
 * ESCALERA 2 · la libreta y la foto → drills 14–17
 *
 * ▸ 17 drills en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-03.test.tsx
 * pnpm typecheck
 *
 * Los starters están rotos a propósito: compilan 16 de 17, y uno puede pasar el
 * test con un error de tipos dentro: ejecuta ambos comandos. Predicciones: 3, 5,
 * 6, 8–11 y 14–16. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-03.pistas.md. Drills 1, 2, 4, 7, 12, 13 y 17: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — qué es un ref y cómo se tipa
 *
 * DEFINICIÓN
 * useRef crea una caja que sobrevive entre renders, con una sola propiedad:
 * .current. Si se la pasas a un elemento con ref={…}, React mete en .current ese
 * elemento del DOM al pintarlo.
 *
 * SINTAXIS — con un ejemplo inventado, un buscador:
 * function Buscador() {
 *   const campoRef = useRef<HTMLInputElement>(null); // qué elemento · empieza en null
 *   useEffect(() => {
 *     campoRef.current?.focus(); // ya pintado: es el <input>
 *   }, []);
 *   return <input ref={campoRef} aria-label="Buscar" />; // aquí se engancha
 * }
 *
 * 🧠 ANALOGÍA — getElementById es preguntar en recepción por alguien con un
 * nombre. Un ref es su número directo: lo apuntas una vez, al pintarlo (ref={…}),
 * y luego lo llamas sin preguntarle a nadie (.current).
 *
 * 🗣️ LAS PIEZAS
 * useRef<HTMLInputElement>(null)                  → ref tipado.
 * ref={campoRef}                                  → enganchar.
 * HTMLButtonElement, HTMLInputElement, HTMLDivElement → el tipo de cada etiqueta.
 *
 * ⚠️ TRAMPA — useRef(null) sin decir el elemento. TypeScript deduce que la caja
 * solo puede guardar null, y entonces no te deja llamar a nada de un elemento.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) EnfocarConRef — el EnfocarCerrar del 01, ahora como en tu MapModal: con
 * un ref, sin id. El ref y el efecto ya están escritos, pero el foco sigue sin
 * caer en la ✕.
 * Sin id ni getElementById: aquí se entrena el ref.
 */
export function EnfocarConRef() {
  // Crea una referencia preparada para guardar un botón HTML.
  // Empieza en null porque React todavía no ha conectado el botón.
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // cerrarRef.current: obtiene el botón real, o null si no existe.
    // ?.focus(): si el botón existe, le da el foco; si no, no hace nada.
    cerrarRef.current?.focus();

    // Array de dependencias vacío: el efecto se ejecuta después del montaje.
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button ref={cerrarRef} type="button" aria-label="Cerrar mapa">
        ×
      </button>
      <p>Aquí iría el mapa.</p>
    </div>
  );
}

/* 2) CampoCiudad — al abrirse el buscador, el texto del campo tiene que quedar
 * seleccionado entero, listo para escribir encima. El <input> tiene un método
 * para eso: select(). Llámalo con el ref, en el momento adecuado.
 */
export function CampoCiudad() {
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // select(): selecciona todo el texto que hay dentro del input.
    // UX: al montarse el componente, "Santiago" queda seleccionado entero.
    // Así, si el usuario empieza a escribir "La Serena", reemplaza el texto
    // seleccionado sin tener que borrarlo manualmente.
    // ?. : evita llamar a select() si el ref todavía es null.
    // []: el efecto se ejecuta al montarse el componente.
    campoRef.current?.select();
  }, []);

  return (
    <>
      {/*
        ref: conecta el input con campoRef para acceder al elemento real
        del navegador y utilizar sus métodos, como select().

        aria-label: permite que el lector de pantalla identifique el campo
        con el nombre "Ciudad".

        defaultValue: establece el valor inicial del campo. No es un valor
        controlado por React: el usuario puede modificarlo sin necesidad
        de value ni onChange.
      */}
      <input ref={campoRef} aria-label="Ciudad" defaultValue="Santiago" />
    </>
  );
}

/* 3) Predice: ¿qué imprime este console.log en el primer render?
 *   function Lupa() {
 *     const botonRef = useRef<HTMLButtonElement>(null);
 *     console.log(botonRef.current);
 *     return <button ref={botonRef}>Acercar</button>;
 *   }
 * ¿Por qué?
 * En la creación de la constante botonRef, se inicializa con null, y el console.log se ejecuta antes de que el botón se haya renderizado y asignado a botonRef.current. Por lo tanto, en el primer render, botonRef.current sigue siendo null.
 * Es una cuestión de orden, no de tiempo: primero corre el render, que solo describe el botón en el return; después React mete el botón en la página y lo engancha al ref. El console.log se ejecuta durante el render, antes de que eso pase, así que imprime null.
 */
export type Contenido = "null" | "el <button>";
export const respuesta3: Contenido = "null";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuándo .current vale null
 *
 * DEFINICIÓN
 * .current es null mientras el elemento no está en la página: antes del primer
 * pintado, mientras un && no lo pinta, y otra vez cuando desaparece, porque React
 * lo vacía al quitarlo. Por eso su tipo es HTMLDivElement | null, y TypeScript no
 * te deja usarlo sin comprobar antes.
 *
 * SINTAXIS — dos formas de comprobarlo:
 * if (!panelRef.current) return; // guardia: si no hay elemento, no sigas
 * panelRef.current.focus(); // aquí TS ya sabe que no es null
 *
 * panelRef.current?.focus(); // en una línea: si es null, no hace nada
 *
 * 🧠 ANALOGÍA — el número directo de antes: si esa persona ya dejó el hotel, el
 * número no da con nadie. Antes de hablar, comprueba que alguien contesta.
 *
 * 🗣️ LAS PIEZAS
 * if (!x) return; → guardia (early return).
 * ?.              → encadenamiento opcional.
 *
 * ⚠️ TRAMPA — escribir .current.focus() sin comprobar. Funciona mientras el
 * elemento está, y lanza un error el día que no está.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) PanelEnfocable — el panel del mapa solo existe mientras está abierto. "Ir al
 * mapa" lleva el foco al panel si está abierto, y si no, no hace nada. Hoy no
 * compila, y pulsarlo con el panel cerrado lanza un error.
 * 💡 Un <div> no recibe el foco solo: por eso lleva tabIndex={-1}, como el
 * panel de tu MapModal.
 */
export function PanelEnfocable() {
  const [abierto, setAbierto] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {/* Cuando el usuario dé click en el botón: el booleano de abierto pasará a su contrario, osea: true -> false, false -> true */}
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {/* Ternario de evaluación: abierto es true? Se le ofrece al usuario cerrar el mapa, sino Abrir el mapa */}
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>

      <button
        type="button"
        onClick={() => {
          // Si el panel está abierto, lleva el foco a él; si no, no hace nada.
          panelRef.current?.focus();
        }}
      >
        Ir al mapa
      </button>

      {abierto && (
        <div ref={panelRef} tabIndex={-1} role="region" aria-label="Mapa de ubicación">
          <p>Aquí iría el mapa.</p>
        </div>
      )}
    </div>
  );
}

/* 5) Predice: en PanelEnfocable, abres el mapa y lo vuelves a cerrar. Justo
 * después pulsas "Ir al mapa". ¿Qué vale panelRef.current dentro del manejador?
 * ¿Por qué? Lo que hace que el div exista es un abierto en true, y al cerrarlo, el div desaparece y React vacía el ref. Por eso, cuando pulsas "Ir al mapa" después de cerrar el panel, panelRef.current es null, ya que el div del panel ya no está en el DOM.
 */
export type ContenidoPanel = "null" | "el <div> del panel";
export const respuesta5: ContenidoPanel = "null";

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — ¿en el manejador o en un efecto? (drills 6 a 13)
 *
 * LA IDEA QUE SOSTIENE TODA LA ESCALERA
 * Pregúntate quién provoca el cambio. Si lo provoca el usuario (un clic, una
 * tecla), va en el manejador de ese evento. Si lo provoca que algo aparezca o
 * cambie en pantalla, va en un efecto.
 *
 * Y el setter no pinta en el acto: pide un render nuevo. Lo que aparece con ese
 * render todavía no existe en la línea siguiente del manejador.
 *
 * tu drill 4 → «Ir al mapa» enfoca el panel, que ya está → manejador
 * tu drill 2 → el buscador aparece y hay que seleccionar  → efecto
 *
 * 🧠 ANALOGÍA — el buzón: setAbierto(true) echa una carta al buzón. React la lee
 * después y pinta la ✕; mientras tanto, en tu manejador, la ✕ no ha llegado.
 *
 * 🗣️ LAS PIEZAS
 * onClick={() => …}                                 → manejador (event handler).
 * useEffect                                         → efecto.
 * un useRef que guarda un valor y no un elemento → ref que no es del DOM.
 *
 * ⚠️ TRAMPA — mandar al efecto un trabajo que solo debe pasar tras un clic. El
 * efecto corre cada vez que cambia su array, y también al montarse.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Predice: en el manejador de "Abrir mapa", con el mapa cerrado:
 *   onClick={() => {
 *     setAbierto(true);
 *     console.log(cerrarRef.current);   // cerrarRef va en la ✕ del mapa
 *   }}
 * ¿Qué imprime el console.log?
 * ¿Por qué?
 * Al ejecutar el manejador, primero se llama a setAbierto(true), lo que solicita un renderizado del componente. Sin embargo, este renderizado no ocurre de inmediato; React programa la actualización y continúa ejecutando el código en el manejador. Por lo tanto, cuando se llega al console.log, el mapa aún no se ha pintado y cerrarRef.current sigue siendo null, ya que el botón ✕ todavía no existe en el DOM.
 */
export type ContenidoCerrar = "null" | "el botón ✕";
export const respuesta6: ContenidoCerrar = "null";

/* 7) MapaSoloIda — la mitad de ida del 13: al abrir el mapa, el foco tiene que
 * caer en la ✕. Hoy el manejador lo intenta justo después de setAbierto(true),
 * y el foco se queda en "Abrir mapa".
 */
export function MapaSoloIda() {
  // Seteamos el estado inicial del mapa como cerrado (false)
  const [abierto, setAbierto] = useState(false);
  // Creamos un ref para el botón de cerrar, que es el que queremos enfocar al abrir el mapa
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (abierto) {
      // Si el mapa está abierto, enfocamos el botón de cerrar
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Abrir mapa
      </button>

      {abierto && (
        <div role="dialog" aria-label="Mapa de ubicación">
          <button
            ref={cerrarRef}
            type="button"
            aria-label="Cerrar mapa"
            onClick={() => setAbierto(false)}
          >
            ×
          </button>
          <p>Aquí iría el mapa.</p>
        </div>
      )}
    </div>
  );
}

/* 8) Predice: en MapaSoloIda, el foco está en la ✕ y la pulsas. La ✕ desaparece
 * con el mapa, y nadie mueve el foco. ¿Dónde queda?
 */
export type DondeQueda = "en Abrir mapa" | "en ninguna parte: vuelve al <body>";
export const respuesta8: DondeQueda = "en ninguna parte: vuelve al <body>";

/* 9) Predice: un efecto que vigila abierto y apunta cada vez que corre:
 *   useEffect(() => {
 *     registrar(`efecto con ${abierto}`);
 *   }, [abierto]);
 * El mapa se monta cerrado, el usuario lo abre y después lo cierra. Escribe los
 * registros en orden, contados como en producción.
 * ¿Por qué? No hay forma de saber si el efecto está en false por el montaje o por el cierre que le haga el usuario.
 * Desde dentro del efecto, ¿en qué se diferencian el primero y el último?
 * Si hablamos desde dentro del efecto, podemos pensar en un useState que inicia en false. Cuando el componente se monta, el efecto se ejecuta y registra "efecto con false". Luego, cuando el usuario abre el mapa, setAbierto(true) se llama, lo que provoca un re-render y el efecto se ejecuta nuevamente, registrando "efecto con true". Finalmente, cuando el usuario cierra el mapa, setAbierto(false) se llama, lo que provoca otro re-render y el efecto se ejecuta una vez más, registrando "efecto con false". Por lo tanto, los registros reflejan los cambios en el estado de abierto a lo largo del tiempo.
 */
export const respuesta9: string[] = ["efecto con false", "efecto con true", "efecto con false"];

/* 10) Predice: una forma de esquivar el montaje, con un ref que guarda un booleano:
 *   const primeraVezRef = useRef(true);
 *   useEffect(() => {
 *     if (primeraVezRef.current) {
 *       primeraVezRef.current = false;
 *       return;
 *     }
 *     if (!abierto){
 *     abrirRef.current?.focus();
 *     }
 *   }, [abierto]);
 * En pnpm dev, con StrictMode, ¿le roba el foco a la página al montarse?
 * ¿Por qué?
 * En StrictMode, React renderiza los componentes dos veces en desarrollo para ayudar a identificar efectos secundarios y problemas de estado. Esto significa que el efecto se ejecuta dos veces durante el montaje inicial. En la primera ejecución, primeraVezRef.current es true, por lo que se establece en false y se retorna, evitando que se ejecute el código que enfoca el botón. Sin embargo, en la segunda ejecución del efecto (que ocurre inmediatamente después), primeraVezRef.current ya es false, por lo que el código que enfoca el botón se ejecuta, robando el foco a la página al montarse.
 */
export type Robo = "sí, lo roba" | "no, lo deja donde estaba";
export const respuesta10: Robo = "sí, lo roba";

/* 11) Clasifica: ¿dónde va cada trabajo, en el manejador del clic o en un efecto?
 *   a · enfocar la ✕, que acaba de aparecer al abrir el mapa
 *   b · devolver el foco a "Abrir mapa" al pulsar la ✕
 *   c · seleccionar "Santiago" cuando aparece el buscador (tu drill 2)
 *   d · llevar el foco al panel al pulsar "Ir al mapa" (tu drill 4)
 * ¿Por qué la d puede ir en el manejador y la a no?
 * La d puede ir en el manejador porque el usuario está interactuando directamente con la interfaz al pulsar "Ir al mapa", lo que significa que el cambio de foco debe ocurrir inmediatamente en respuesta a esa acción. En cambio, la a no puede ir en el manejador porque el botón de cerrar (✕) aún no existe en el DOM en el momento en que se ejecuta el manejador; por lo tanto, debemos esperar a que React renderice el componente y luego usar un efecto para enfocar la ✕ una vez que esté presente en la página.
 */
export type Sitio = "manejador" | "efecto";
export const respuesta11: Record<"a" | "b" | "c" | "d", Sitio> = {
  a: "efecto",
  b: "manejador",
  c: "efecto",
  d: "manejador",
};

/* 12) LimpiarBusqueda — "Limpiar" vacía el campo y deja el foco en él, listo para
 * escribir otra ciudad. Hoy lo hace un efecto, y al montarse el buscador le roba
 * el foco a la página. Tiene que pasar solo al pulsar "Limpiar".
 */
export function LimpiarBusqueda() {
  // Seteamos el estado inicial del campo de texto como vacío
  const [texto, setTexto] = useState("");
  // Creamos un ref para el campo de texto, que es el que queremos enfocar al limpiar la búsqueda
  const campoRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={campoRef}
        aria-label="Ciudad"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="Escribe una ciudad"
      />
      <button
        type="button"
        onClick={() => {
          // Al pulsar "Limpiar", vaciamos el campo de texto
          setTexto("");
          // Después de limpiar el campo, enfocamos el input para que el usuario pueda escribir otra ciudad sin tener que hacer clic en él.
          campoRef.current?.focus();
        }}
      >
        Limpiar
      </button>
    </div>
  );
}

/* 13) MapaConRetorno — el viaje completo del foco en tu MapModal: al abrir el
 * mapa, el foco cae en la ✕; al cerrarlo con la ✕, vuelve a "Abrir mapa", para
 * que quien usa teclado siga donde estaba. Un ref para cada botón.
 * Sin autoFocus ni getElementById: aquí se entrena el ref.
 */
export function MapaConRetorno() {
  // El mapa empieza cerrado.
  const [abierto, setAbierto] = useState(false);

  // Referencias a los dos botones.
  const abrirRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  // Al abrir, esperamos a que React monte el botón ✕.
  useEffect(() => {
    if (abierto) {
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  // Al cerrar, devolvemos el foco al botón que ya existe.
  function handleCerrar() {
    setAbierto(false);
    abrirRef.current?.focus();
  }

  return (
    <div>
      <button
        ref={abrirRef}
        type="button"
        onClick={() => {
          setAbierto(true);
        }}
      >
        Abrir mapa
      </button>

      {abierto && (
        <div role="dialog" aria-label="Mapa de ubicación">
          <button ref={cerrarRef} type="button" aria-label="Cerrar mapa" onClick={handleCerrar}>
            ×
          </button>

          <p>Aquí iría el mapa.</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA 2 — la libreta y la foto (drills 14 a 17)
 *
 * LA IDEA
 * Que un efecto corra no quiere decir que haga algo: eso lo deciden los if de
 * dentro. Y un if puede mirar dos cosas muy distintas:
 * · la foto: el estado o las props de este render (abierto). Si el efecto corre
 *   dos veces con la misma foto, hace lo mismo las dos veces.
 * · la libreta: un ref que el propio efecto escribe (primeraVezRef). Cada pasada
 *   le deja algo distinto a la siguiente, así que el resultado depende de cuántas
 *   veces corra: dos en pnpm dev, una en producción.
 *
 * Una guardia existe para frenar un trabajo concreto. Antes de poner una,
 * pregúntate cuál.
 *
 * 🧠 ANALOGÍA — el vigilante del 01. Con la foto decide por lo que ve: si la puerta
 * está cerrada, no hace nada, dé las rondas que dé. Con la libreta («la primera
 * ronda no cuenta») decide por cuántas rondas lleva, y el ensayo de StrictMode le
 * hace dar una de más.
 *
 * 🗣️ LAS PIEZAS
 * if (abierto) … → guardia que lee el estado.
 * primeraVezRef  → bandera: un ref que no es del DOM y que escribe el efecto.
 *
 * ⚠️ TRAMPA — creer que la bandera «se salta el montaje». Se salta la primera
 * pasada del efecto, traiga lo que traiga, y cuántas pasadas hay al montarse
 * depende de si estás en pnpm dev o en producción.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 14) Predice: tu MapaConRetorno del 13, tal como lo dejaste. Su efecto, resumido:
 *   useEffect(() => {
 *     if (abierto) cerrarRef.current?.focus();
 *   }, [abierto]);
 * Se monta cerrado, en pnpm dev con StrictMode. ¿Cuántas veces corre el
 * efecto al montarse, y en cuántas de ellas mueve el foco?
 */
export type Cuenta = { corre: number; enfoca: number };
export const respuesta14: Cuenta = { corre: 2, enfoca: 0 };

/* 15) Predice: tu versión vieja del 13, la de la bandera, en el mismo montaje:
 *
 *   Definimos el valor inicial de la bandera como true
 *   const primeraVezRef = useRef(true);
 *   useEffect(() => {
 *     Si primeraVezRef sigue siendo true, la cambiamos a false y salimos del efecto
 *     if (primeraVezRef.current) {
 *       primeraVezRef.current = false;
 *       return;
 *     }
 *     if (abierto){
 *       cerrarRef.current?.focus();
 *     }
 *     else{
 *      abrirRef.current?.focus();
 *     }
 *   }, [abierto]);
 * Apunta lo que lee cada pasada justo al empezar, en orden: la libreta
 * (primeraVezRef.current) y la foto (abierto).
 *
 * Primera pasada:
 * primeraVezRef.current = true, abierto = false
 * Segunda pasada:
 * primeraVezRef.current = false, abierto = false
 * ¿Por qué?
 * Al estar en StrictMode, el efecto se ejecuta dos veces al montarse. En la primera pasada, primeraVezRef.current es true y abierto es false, por lo que la guardia detiene la ejecución del efecto antes de que se intente enfocar cualquier elemento. En la segunda pasada, primeraVezRef.current ya es false, así que la guardia ya no la detiene; y como abierto sigue siendo false, entra al else y enfoca "Abrir mapa", robándole el foco a la página. Por lo tanto, la libreta cambia de true a false entre las dos pasadas, mientras que la foto permanece en false en ambas pasadas.
 * Entre la 1ª pasada y la 2ª, ¿quién cambió la libreta? ¿Y la foto?
 * Entre la primera y segunda, quien cambió la libreta fue el propio efecto, no el usuario ni React. La foto (abierto) no cambió entre las dos pasadas, ya que el estado del componente no se modificó durante el montaje inicial.
 */
export type Lecturas = { libreta: boolean[]; foto: boolean[] };
export const respuesta15: Lecturas = { libreta: [true, false], foto: [false, false] };

/* 16) Predice: dos versiones del 13, montadas cerradas en pnpm dev:
 *   A · la bandera del 15 y, debajo, solo el if (abierto) de la ida
 *   B · solo el if (abierto) de la ida, sin bandera (tu 13)
 * ¿Cuál le roba el foco a la página al montarse?
 * ¿Por qué?
 * A: La bandera frena la primera pasada del efecto con return.
 * B: Si abierto es false, el if no se ejecuta.
 * En ninguna versión se enfoca "Abrir mapa" al montarse.
 */
export type CualRoba = "A" | "B" | "las dos" | "ninguna";
export const respuesta16: CualRoba = "ninguna";

/* 17) MapaQueNaceAbierto — tu MapModal de verdad no espera a ningún clic: se
 * monta ya abierto, y en ese momento el foco tiene que caer en la ✕. Este mapa
 * empieza como diga abiertoAlInicio. Hoy, si nace abierto, la ✕ se queda sin
 * foco en producción (en pnpm dev, de casualidad, sí lo recibe). Tiene que
 * funcionar naciendo abierto y naciendo cerrado, en los dos modos, y sin robar
 * el foco cuando nace cerrado.
 * Sin autoFocus: en producción valdría, pero aquí se entrena el efecto.
 * 💡 abiertoAlInicio solo cuenta al nacer, por eso puede ir a useState: es
 * el valor inicial, no una copia que haya que mantener al día (drill 8 del 00).
 */
export function MapaQueNaceAbierto({ abiertoAlInicio }: { abiertoAlInicio: boolean }) {
  // El mapa nace abierto o cerrado según la prop.
  const [abierto, setAbierto] = useState(abiertoAlInicio);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Si el mapa está abierto, ponemos el foco en la ✕.
    // Si está cerrado, no hacemos nada.
    if (abierto) {
      cerrarRef.current?.focus();
    }
  }, [abierto]);

  function cerrar() {
    setAbierto(false);
    // Al cerrar el mapa, devolvemos el foco al botón para abrirlo.
    abrirRef.current?.focus();
  }

  return (
    <div>
      <button ref={abrirRef} type="button" onClick={() => setAbierto(true)}>
        Abrir mapa
      </button>

      {abierto && (
        <div role="dialog" aria-label="Mapa de ubicación">
          <button ref={cerrarRef} type="button" aria-label="Cerrar mapa" onClick={cerrar}>
            ×
          </button>

          <p>Aquí iría el mapa.</p>
        </div>
      )}
    </div>
  );
}

// <EnfocarConRef />  ·  <CampoCiudad />  ·  <PanelEnfocable />  ·  <MapaSoloIda />  ·  <LimpiarBusqueda />  ·  <MapaConRetorno />  ·  <MapaQueNaceAbierto abiertoAlInicio />
