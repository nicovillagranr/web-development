import { useEffect, useRef, useState } from "react";

/* =============================================================================
 * EJERCICIO 03 — `useRef`: tu propia agarradera a un elemento   ·  bloque 12
 * =============================================================================
 *
 * 📌 RECORDATORIO — los refs de tu `MapModal`, recortados:
 *     const closeButtonRef = useRef<HTMLButtonElement>(null);
 *     useEffect(() => {
 *       closeButtonRef.current?.focus();
 *     }, [onClose]);
 *     <button ref={closeButtonRef} type="button" onClick={onClose}>×</button>
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · crear un ref, engancharlo a un elemento y usarlo desde un efecto o un manejador
 *   · tipar el ref con el elemento al que apunta
 *   · decir cuándo `.current` vale `null` y protegerte de ello
 *   · decidir si un trabajo va en el manejador de un evento o en un efecto
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el 01 enfocaste la ✕ con `getElementById`: buscar en TODA la página por un id
 * que te tienes que inventar y que no se puede repetir. Si el componente se pinta dos
 * veces, hay dos ✕ con el mismo id. Un ref es tu agarradera a ESE elemento.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · qué es un ref y cómo se tipa      →  drills 1 a 3
 *   TEORÍA 2 · cuándo `.current` vale `null`      →  drills 4 y 5
 *   ESCALERA · ¿en el manejador o en un efecto?   →  drills 6 a 13
 *
 * ▸ EJERCICIO — 13 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-03.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. Compilan 12 de 13: el que no, lo
 *   verás en el typecheck. Y 1 de los 13 puede pasar el test con un error de tipos
 *   dentro: corre siempre los dos comandos. Las predicciones son la 3, 5, 6 y de la
 *   8 a la 11; todas menos la 8 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-03.pistas.md`, de una en una.
 *
 * 👁️ Los componentes de los drills 1, 2, 4, 7, 12 y 13 están montados en el banco (pestaña 12).
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — qué es un ref y cómo se tipa
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `useRef` crea una caja que sobrevive entre renders, con una sola propiedad:
 *   `.current`. Si se la pasas a un elemento con `ref={…}`, React mete en
 *   `.current` ese elemento del DOM al pintarlo.
 *
 * SINTAXIS — con un ejemplo inventado, un buscador:
 *     function Buscador() {
 *       const campoRef = useRef<HTMLInputElement>(null);   // qué elemento · empieza en null
 *       useEffect(() => {
 *         campoRef.current?.focus();                        // ya pintado: es el <input>
 *       }, []);
 *       return <input ref={campoRef} aria-label="Buscar" />; // aquí se engancha
 *     }
 *
 * 🧠 ANALOGÍA — `getElementById` es preguntar en recepción por alguien con un
 *    nombre. Un ref es su número directo: lo apuntas una vez, al pintarlo
 *    (`ref={…}`), y luego lo llamas sin preguntarle a nadie (`.current`).
 *
 * 🗣️ LAS PIEZAS
 *     `useRef<HTMLInputElement>(null)` → ref tipado  ·  `ref={campoRef}` → enganchar
 *     `HTMLButtonElement`, `HTMLInputElement`, `HTMLDivElement` → el tipo de cada etiqueta
 *
 * ⚠️ TRAMPA — `useRef(null)` sin decir el elemento. TypeScript deduce que la caja
 *    solo puede guardar `null`, y entonces no te deja llamar a nada de un elemento.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `EnfocarConRef` — el `EnfocarCerrar` del 01, ahora como en tu `MapModal`: con
//    un ref, sin `id`. El ref y el efecto ya están escritos, pero el foco sigue sin
//    caer en la ✕.
//    Sin `id` ni `getElementById`: aquí se entrena el ref.
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

// 2) `CampoCiudad` — al abrirse el buscador, el texto del campo tiene que quedar
//    seleccionado entero, listo para escribir encima. El `<input>` tiene un método
//    para eso: `select()`. Llámalo con el ref, en el momento adecuado.
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

// 3) Predice: ¿qué imprime este `console.log` en el PRIMER render?
//        function Lupa() {
//          const botonRef = useRef<HTMLButtonElement>(null);
//          console.log(botonRef.current);
//          return <button ref={botonRef}>Acercar</button>;
//        }
export type Contenido = "null" | "el <button>";
export const respuesta3: Contenido = "null";
// ¿Por qué?
// En la creación de la constante botonRef, se inicializa con null, y el console.log se ejecuta antes de que el botón se haya renderizado y asignado a botonRef.current. Por lo tanto, en el primer render, botonRef.current sigue siendo null.
// Es una cuestión de orden, no de tiempo: primero corre el render, que solo describe el botón en el return; después React mete el botón en la página y lo engancha al ref. El console.log se ejecuta durante el render, antes de que eso pase, así que imprime null.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — cuándo `.current` vale `null`
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `.current` es `null` mientras el elemento no está en la página: antes del
 *   primer pintado, mientras un `&&` no lo pinta, y otra vez cuando desaparece,
 *   porque React lo vacía al quitarlo. Por eso su tipo es `HTMLDivElement | null`,
 *   y TypeScript no te deja usarlo sin comprobar antes.
 *
 * SINTAXIS — dos formas de comprobarlo:
 *     if (!panelRef.current) return;   // guardia: si no hay elemento, no sigas
 *     panelRef.current.focus();        // aquí TS ya sabe que no es null
 *
 *     panelRef.current?.focus();       // en una línea: si es null, no hace nada
 *
 * 🧠 ANALOGÍA — el número directo de antes: si esa persona ya dejó el hotel, el
 *    número no da con nadie. Antes de hablar, comprueba que alguien contesta.
 *
 * 🗣️ LAS PIEZAS
 *     `if (!x) return;` → guardia (early return)  ·  `?.` → encadenamiento opcional
 *
 * ⚠️ TRAMPA — escribir `.current.focus()` sin comprobar. Funciona mientras el
 *    elemento está, y lanza un error el día que no está.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `PanelEnfocable` — el panel del mapa solo existe mientras está abierto. "Ir al
//    mapa" lleva el foco al panel si está abierto, y si no, no hace nada. Hoy no
//    compila, y pulsarlo con el panel cerrado lanza un error.
//    💡 Un `<div>` no recibe el foco solo: por eso lleva `tabIndex={-1}`, como el
//       panel de tu `MapModal`.
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

// 5) Predice: en `PanelEnfocable`, abres el mapa y lo vuelves a cerrar. Justo
//    después pulsas "Ir al mapa". ¿Qué vale `panelRef.current` dentro del manejador?
export type ContenidoPanel = "null" | "el <div> del panel";
export const respuesta5: ContenidoPanel = "null";
// ¿Por qué? Lo que hace que el div exista es un abierto en true, y al cerrarlo, el div desaparece y React vacía el ref. Por eso, cuando pulsas "Ir al mapa" después de cerrar el panel, panelRef.current es null, ya que el div del panel ya no está en el DOM.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — ¿en el manejador o en un efecto? (drills 6 a 13)
 * ─────────────────────────────────────────────────────────────────────────────
 * LA IDEA QUE SOSTIENE TODA LA ESCALERA
 *   Pregúntate quién provoca el cambio. Si lo provoca el usuario (un clic, una
 *   tecla), va en el manejador de ese evento. Si lo provoca que algo aparezca o
 *   cambie en pantalla, va en un efecto.
 *
 *   Y el setter no pinta en el acto: pide un render nuevo. Lo que aparece con ese
 *   render todavía no existe en la línea siguiente del manejador.
 *
 *     tu drill 4 → "Ir al mapa" enfoca el panel, que YA está  →  manejador
 *     tu drill 2 → el buscador aparece y hay que seleccionar   →  efecto
 *
 * 🧠 ANALOGÍA — el buzón: `setAbierto(true)` echa una carta al buzón. React la lee
 *    después y pinta la ✕; mientras tanto, en tu manejador, la ✕ no ha llegado.
 *
 * 🗣️ LAS PIEZAS
 *     `onClick={() => …}` → manejador (event handler)  ·  `useEffect` → efecto
 *     un `useRef` que guarda un valor y no un elemento → ref que no es del DOM
 *
 * ⚠️ TRAMPA — mandar al efecto un trabajo que solo debe pasar tras un clic. El
 *    efecto corre cada vez que cambia su array, y también al montarse.
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) Predice: en el manejador de "Abrir mapa", con el mapa cerrado:
//        onClick={() => {
//          setAbierto(true);
//          console.log(cerrarRef.current);   // cerrarRef va en la ✕ del mapa
//        }}
//    ¿Qué imprime el `console.log`?
export type ContenidoCerrar = "null" | "el botón ✕";
export const respuesta6: ContenidoCerrar = "el botón ✕";
// ¿Por qué?
//

// 7) `MapaSoloIda` — la mitad de ida del 13: al abrir el mapa, el foco tiene que
//    caer en la ✕. Hoy el manejador lo intenta justo después de `setAbierto(true)`,
//    y el foco se queda en "Abrir mapa".
export function MapaSoloIda() {
  const [abierto, setAbierto] = useState(false);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setAbierto(true);
          cerrarRef.current?.focus();
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

// 8) Predice: en `MapaSoloIda`, el foco está en la ✕ y la pulsas. La ✕ desaparece
//    con el mapa, y nadie mueve el foco. ¿Dónde queda?
export type DondeQueda = "en Abrir mapa" | "en ninguna parte: vuelve al <body>";
export const respuesta8: DondeQueda = "en Abrir mapa";

// 9) Predice: un efecto que vigila `abierto` y apunta cada vez que corre:
//        useEffect(() => {
//          registrar(`efecto con ${abierto}`);
//        }, [abierto]);
//    El mapa se monta cerrado, el usuario lo abre y después lo cierra. Escribe los
//    registros en orden, contados como en producción.
export const respuesta9: string[] = [];
// ¿Por qué? Desde dentro del efecto, ¿en qué se diferencian el primero y el último?
//

// 10) Predice: una forma de esquivar el montaje, con un ref que guarda un booleano:
//        const primeraVezRef = useRef(true);
//        useEffect(() => {
//          if (primeraVezRef.current) {
//            primeraVezRef.current = false;
//            return;
//          }
//          if (!abierto) abrirRef.current?.focus();
//        }, [abierto]);
//     En `pnpm dev`, con StrictMode, ¿le roba el foco a la página al montarse?
export type Robo = "sí, lo roba" | "no, lo deja donde estaba";
export const respuesta10: Robo = "no, lo deja donde estaba";
// ¿Por qué?
//

// 11) Clasifica: ¿dónde va cada trabajo, en el manejador del clic o en un efecto?
//        a · enfocar la ✕, que acaba de aparecer al abrir el mapa
//        b · devolver el foco a "Abrir mapa" al pulsar la ✕
//        c · seleccionar "Santiago" cuando aparece el buscador (tu drill 2)
//        d · llevar el foco al panel al pulsar "Ir al mapa" (tu drill 4)
export type Sitio = "manejador" | "efecto";
export const respuesta11: Record<"a" | "b" | "c" | "d", Sitio> = {
  a: "manejador",
  b: "efecto",
  c: "manejador",
  d: "efecto",
};
// ¿Por qué la d puede ir en el manejador y la a no?
//

// 12) `LimpiarBusqueda` — "Limpiar" vacía el campo y deja el foco en él, listo para
//     escribir otra ciudad. Hoy lo hace un efecto, y al montarse el buscador le roba
//     el foco a la página. Tiene que pasar solo al pulsar "Limpiar".
export function LimpiarBusqueda() {
  const [texto, setTexto] = useState("");
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (texto === "") {
      campoRef.current?.focus();
    }
  }, [texto]);

  return (
    <div>
      <input
        ref={campoRef}
        aria-label="Ciudad"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
      />
      <button type="button" onClick={() => setTexto("")}>
        Limpiar
      </button>
    </div>
  );
}

// 13) `MapaConRetorno` — el viaje completo del foco en tu `MapModal`: al abrir el
//    mapa, el foco cae en la ✕; al cerrarlo con la ✕, vuelve a "Abrir mapa", para
//    que quien usa teclado siga donde estaba. Un ref para cada botón.
//    Sin `autoFocus` ni `getElementById`: aquí se entrena el ref.
export function MapaConRetorno() {
  // El el mapa inicialmente está cerrado, así que abierto empieza en false.
  const [abierto, setAbierto] = useState(false);
  const abrirRef = useRef<HTMLButtonElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  const montajeInicialRef = useRef(true);
  // Indica si todavía estamos en la primera ejecución del efecto.

  useEffect(() => {
    if (montajeInicialRef.current) {
      montajeInicialRef.current = false;
      return; // Omite el enfoque durante la primera ejecución del efecto.
    }

    if (abierto) {
      cerrarRef.current?.focus();
    } else {
      abrirRef.current?.focus();
    }
  }, [abierto]);

  return (
    <div>
      <button ref={abrirRef} type="button" onClick={() => setAbierto(true)}>
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
// <EnfocarConRef />  ·  <CampoCiudad />  ·  <PanelEnfocable />  ·  <MapaSoloIda />  ·  <LimpiarBusqueda />  ·  <MapaConRetorno />
