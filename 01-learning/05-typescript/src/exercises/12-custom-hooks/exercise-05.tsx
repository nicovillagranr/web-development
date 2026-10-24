import { useEffect, useRef } from "react";

/* =============================================================================
 * EJERCICIO 05 — el focus trap: el Tab no sale del modal   ·  bloque 12
 * =============================================================================
 *
 * 📌 RECORDATORIO — un listener del teclado en `document` (el drill 2 del 02):
 *     useEffect(() => {
 *       const alPulsar = (event: KeyboardEvent) => {   // el del navegador: sin <T>
 *         if (event.key === "Escape") cerrar();
 *       };
 *       document.addEventListener("keydown", alPulsar);
 *       return () => document.removeEventListener("keydown", alPulsar);
 *     }, [cerrar]);
 *   `event.preventDefault()` cancela lo que el navegador iba a hacer (el 08 del 10).
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · sacar los elementos enfocables de un panel con `querySelectorAll<HTMLElement>`
 *   · usar el primero y el último de esa lista sin que TypeScript se queje
 *   · hacer que Tab y Shift+Tab den la vuelta dentro de un panel sin atascarse
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Tu `MapModal` atrapa el Tab: si el foco se le escapa, quien navega con teclado
 * acaba detrás del fondo oscuro, en una página que no ve. Es la parte con más
 * lógica del modal, y la que le deja a Projex tres errores de tipos.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · la lista de enfocables     →  drills 1 a 3
 *   TEORÍA 2 · dar la vuelta              →  drills 4 a 6
 *   ARMARLO TÚ                            →  drill 7
 *
 * ▸ EJERCICIO — 7 drills, en orden. ❌ Prohibido `any`, `as` y el `!` de "confía en mí".
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-05.test.tsx
 *     pnpm typecheck  ·  pnpm lint
 *   Todos los starters están rotos a propósito. Compilan 4 de 7, y 2 pasan el test
 *   con un error de tipos dentro: corre los dos comandos.
 *   Debajo de cada drill, un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas, en `exercise-05.pistas.md`. 👁️ Los 7, en el banco (pestaña 12).
 * ===========================================================================*/

// Lo que cuenta como enfocable: el mismo selector que usa tu `MapModal`.
const ENFOCABLES =
  'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — la lista de enfocables
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   `querySelectorAll(selector)` busca dentro de un elemento todos los que cumplen
 *   un selector CSS, y te los da en una lista, un `NodeList`, en el orden en que
 *   están en la página. Es el mismo orden que sigue Tab.
 *
 * SINTAXIS
 *     const lista = panel.querySelectorAll<HTMLElement>(ENFOCABLES);
 *     lista.length               // cuántos hay: puede ser 0
 *     lista[0]                   // el primero
 *     lista[lista.length - 1]    // el último
 *
 * 🧠 ANALOGÍA — la lista de pasajeros de un vuelo: puedes pedir "el primero de la
 *    lista", pero hay vuelos que salen vacíos. TypeScript te obliga a contar con
 *    ellos: por eso `lista[0]` es `HTMLElement | undefined`.
 *
 * 🗣️ LAS PIEZAS
 *     `<HTMLElement>`  →  el tipo de lo que hay en la lista. Sin él, cada pieza es
 *                         un `Element`, que puede ser hasta un dibujo SVG, y un
 *                         `Element` no tiene `focus()`
 *     `NodeList`       →  la lista: tiene `length` e índices, como un array
 *
 * ⚠️ TRAMPA — el `!` detrás de `lista[0]`. Calla a TypeScript como un `as`, pero
 *    no comprueba nada: si la lista está vacía, rompe igual en el navegador.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `IrAlPanel` — en tu sección de contacto, "Ir al panel" lleva el foco al primer
//    elemento del panel del mapa, sea cual sea. En el navegador ya funciona, pero el
//    typecheck no lo deja pasar.
export function IrAlPanel() {
  // Hacemos referencia a un div que contiene el panel del mapa. Mientras no haya un div, `panelRef.current` es `null`. Por eso el tipo es `HTMLDivElement | null`.
  const panelRef = useRef<HTMLDivElement>(null);

  // Si el div todavía no existe, no hacemos nada.
  function irAlPanel() {
    if (!panelRef.current) {
      return;
    }

    // La variable lista paso a paso:
    // 1. panelRef.current apunta al div del panel.
    //    Después del if, TypeScript sabe que no es null.
    // 2. querySelectorAll busca todos los elementos que cumplen
    //    el selector ENFOCABLES y devuelve un NodeList<HTMLElement>.
    // 3. lista[0] obtiene el primer elemento de la lista.
    //    Con ?.focus(), le damos el foco si ese elemento existe.

    // En este componente, el primer elemento a enfocar sería el <a>, después el button
    const lista = panelRef.current.querySelectorAll<HTMLElement>(ENFOCABLES);

    lista[0]?.focus();
  }

  return (
    <div>
      <button type="button" onClick={irAlPanel}>
        Ir al panel
      </button>

      <div ref={panelRef} role="region" aria-label="Panel del mapa">
        <a href="#mapa">Ver en Google Maps</a>
        <button type="button">Copiar dirección</button>
      </div>
    </div>
  );
}
// <IrAlPanel />
// ¿Por qué? El navegador sí enfocaba el enlace. ¿Por qué TypeScript no te dejaba
// llamar a `focus()`?
// Porque sin <HTMLElement>, `querySelectorAll` devuelve un `NodeList<Element>`, y un `Element` no tiene `focus()`.
// Con <HTMLElement>, `querySelectorAll` devuelve un `NodeList<HTMLElement>`, y un `HTMLElement` sí tiene `focus()`.

// 2) `PrimerResultado` — el buscador de ciudades enseña sus resultados como botones,
//    y "Ir al primero" lleva el foco al primero. Sin resultados, el botón no tiene
//    que hacer nada; hoy, sin resultados, la consola muestra un error.
export function PrimerResultado({ ciudades }: { ciudades: string[] }) {
  // Hacemos referencia a un div que contiene los resultados.
  // Mientras no haya un div, `resultadosRef.current` será null, por eso el tipo es `HTMLDivElement | null`
  const resultadosRef = useRef<HTMLDivElement>(null);

  // Si el div todavía no existe, no hacemos nada.
  function irAlPrimero() {
    if (!resultadosRef.current) {
      return;
    }
    // Si hay resultados, `lista` es un NodeList<HTMLElement> con todos los botones de resultados.
    const lista = resultadosRef.current.querySelectorAll<HTMLElement>(ENFOCABLES);
    // Al primer elemento de la lista[0] le damos el foco si existe. SI no existe, no hacemos nada.
    lista[0]?.focus();
  }

  return (
    <div>
      <button type="button" onClick={irAlPrimero}>
        Ir al primero
      </button>
      <div ref={resultadosRef} role="group" aria-label="Resultados">
        {ciudades.map((ciudad) => (
          <button key={ciudad} type="button">
            {ciudad}
          </button>
        ))}
      </div>
    </div>
  );
}
// <PrimerResultado ciudades={["Santiago", "Valparaíso"]} />
// ¿Por qué? Sin resultados, ¿qué había en `lista[0]`?
// Faltaba preguntar si esa posición existía antes de llamar a `focus()`. Con `?.focus()`, si no existe, no hace nada.

// 3) `UltimoResultado` — lo mismo con "Ir al último". Este ya no rompe sin
//    resultados, porque mira antes cuántos hay. Pero el typecheck sigue sin dejarlo
//    pasar.
export function UltimoResultado({ ciudades }: { ciudades: string[] }) {
  // Hacemos referencia a un div que contiene los resultados.
  // Mientras no haya un div, `resultadosRef.current` será null, por eso el tipo es `HTMLDivElement | null`
  const resultadosRef = useRef<HTMLDivElement>(null);

  function irAlUltimo() {
    if (!resultadosRef.current) {
      return;
    }
    const lista = resultadosRef.current.querySelectorAll<HTMLElement>(ENFOCABLES);
    if (lista.length === 0) {
      return;
    }
    // Qué hace lista.length - 1?
    // lista.length es el número de elementos en la lista. Como los índices empiezan en 0, el último elemento está en la posición lista.length - 1.
    const ultimo = lista[lista.length - 1];
    ultimo?.focus();
  }

  return (
    <div>
      <button type="button" onClick={irAlUltimo}>
        Ir al último
      </button>

      <div ref={resultadosRef} role="group" aria-label="Resultados">
        {ciudades.map((ciudad) => (
          <button key={ciudad} type="button">
            {ciudad}
          </button>
        ))}
      </div>
    </div>
  );
}
// <UltimoResultado ciudades={["Santiago", "Valparaíso"]} />
// ¿Por qué? Si la línea de `lista.length === 0` ya impedía llegar con la lista vacía,
// ¿por qué TypeScript seguía avisando?
// Porque TypeScript no relaciona la línea del `length` con las posiciones de la lista: para él, `lista[lista.length - 1]` siempre puede ser `undefined`, aunque arriba ya hayamos comprobado que la lista no está vacía.
// En el navegador, `ultimo` nunca llega a `focus()` siendo `undefined`: con la lista vacía, el `return` corta antes. El `?.` no protege al navegador, protege a TypeScript.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — dar la vuelta
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Tab lleva el foco al siguiente enfocable de la página, y Shift+Tab al anterior.
 *   Lo mueve el navegador DESPUÉS de tu `keydown`, salvo que lo canceles con
 *   `event.preventDefault()`. Un focus trap solo actúa en los dos bordes del panel:
 *   cancela el Tab y lleva él el foco al otro extremo. En medio no toca nada.
 *
 * SINTAXIS
 *     event.key === "Tab"          // la tecla
 *     event.shiftKey               // true si Shift está pulsada a la vez
 *     document.activeElement       // quién tiene el foco ahora mismo (o null)
 *     panel.contains(elemento)     // ¿está ese elemento dentro del panel?
 *
 * 🧠 ANALOGÍA — una pista de atletismo: el navegador corre en línea recta y, al
 *    llegar al final, se sale. La trampa no corre por él: solo pone una curva en
 *    cada extremo.
 *
 * ⚠️ TRAMPA — creer que Shift+Tab es otra tecla. Es el mismo `keydown`, con
 *    `key === "Tab"`: si solo miras la tecla, tu código hace lo mismo en los dos
 *    sentidos. Lo que cambia es `event.shiftKey`.
 *
 *   En los drills 4 a 6, la primera línea del manejador deja en paz los Tab que
 *   pasan fuera del panel: el banco es una página que sigues usando.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) `MapaConVuelta` — el panel del mapa tiene tres paradas, y la última es la ✕.
//    Con el foco en la ✕, Tab tiene que volver a "Ver en Google Maps", sin salir del
//    panel. Hoy el `focus()` sí corre, y aun así el foco acaba en otro sitio.
//    👀 En el banco, haz clic en la ✕ y pulsa Tab.
export function MapaConVuelta() {
  // Hacemos referencia a un div que contiene el panel del mapa.
  // Mientras no haya un div, `panelRef.current` será null, por eso el tipo es `HTMLDivElement | null`.
  const panelRef = useRef<HTMLDivElement>(null);

  // Una vez montado el componente, añadimos un listener al documento para escuchar los eventos de teclado.
  useEffect(() => {
    // alPulsar será una función que se ejecuta cada vez que se pulsa una tecla en el documento.
    const alPulsar = (event: KeyboardEvent) => {
      // Obtenemos el div del panel a través de la referencia.
      const panel = panelRef.current;

      // Si la tecla pulsada no es Tab, o si el foco no está dentro del panel, no hacemos nada y salimos de la función.
      if (event.key !== "Tab" || !panel?.contains(document.activeElement)) {
        return;
      }
      // Definimos la lista de elementos enfocables dentro del panel con <HTMLElement> para que TypeScript sepa que son elementos HTML y tengan el método focus().
      const lista = panel.querySelectorAll<HTMLElement>(ENFOCABLES);
      // Obtenemos el primer elemento de la lista
      const primero = lista[0];
      // Obtenemos el último elemento de la lista
      const ultimo = lista[lista.length - 1];

      // Si no hay elementos enfocables, no hacemos nada y salimos de la función.
      if (!primero || !ultimo) {
        return;
      }

      // Si el elemento activo (el que tiene el foco) es el último de la lista, cancelamos el comportamiento por defecto del navegador y movemos el foco al primer elemento.
      if (document.activeElement === ultimo) {
        // Cancelamos el comportamiento por defecto del navegador, que sería mover el foco un paso más desde donde esté: como abajo lo llevamos al enlace, acabaría en "Copiar dirección".
        event.preventDefault();
        // Movemos el foco al primer elemento de la lista.
        primero.focus();
      }
    };

    // Añadimos el listener al documento para escuchar los eventos de teclado.
    document.addEventListener("keydown", alPulsar);
    // Cuando el componente se desmonte, eliminamos el listener para evitar fugas de memoria y comportamientos inesperados.
    return () => document.removeEventListener("keydown", alPulsar);

    // Array de dependencias vacío: el efecto solo se ejecuta una vez al montar y desmontar el componente.
  }, []);

  return (
    <div ref={panelRef} role="dialog" aria-label="Mapa con vuelta">
      <a href="#mapa">Ver en Google Maps</a>
      <button type="button">Copiar dirección</button>
      <button type="button" aria-label="Cerrar mapa">
        ✕
      </button>
    </div>
  );
}
// <MapaConVuelta />
// ¿Por qué? Tu `focus()` ya llevaba el foco al enlace. ¿Por qué acababa en otro sitio?
// Porque el comportamiento por defecto del navegador es mover el foco al siguiente elemento enfocable desde donde esté, y eso ocurría después de tu `focus()`: el foco ya estaba en el enlace, así que lo llevaba a "Copiar dirección". Con `event.preventDefault()`, cancelas ese comportamiento y el foco se queda donde tú lo pusiste.

// 5) `MapaEnLosDosSentidos` — el mismo panel, que ya da la vuelta con Tab. Ahora,
//    también hacia atrás: en "Ver en Google Maps", Shift+Tab va a la ✕. Y en la ✕,
//    Shift+Tab retrocede normal, a "Copiar dirección". Hoy las dos cosas fallan.
export function MapaEnLosDosSentidos() {
  // Hacemos referencia a un div que contiene el panel del mapa.
  // Mientras no haya un div, `panelRef.current` será null, por eso el tipo es `HTMLDivElement | null`.
  const panelRef = useRef<HTMLDivElement>(null);

  // Una vez montado el componente, añadimos un listener al documento para escuchar los eventos de teclado.
  useEffect(() => {
    const alPulsar = (event: KeyboardEvent) => {
      const panel = panelRef.current;
      if (event.key !== "Tab" || !panel?.contains(document.activeElement)) {
        return;
      }
      // Definimos la lista de elementos enfocables dentro del panel con <HTMLElement> para que TypeScript sepa que son elementos HTML y tengan el método focus().
      const lista = panel.querySelectorAll<HTMLElement>(ENFOCABLES);
      // Obtenemos el primer elemento de la lista
      const primero = lista[0];
      // Obtenemos el último elemento de la lista
      const ultimo = lista[lista.length - 1];
      // Si no hay elementos enfocables, no hacemos nada y salimos de la función.
      if (!primero || !ultimo) {
        return;
      }
      // Si Shift NO está pulsado Y el elemento activo es el último de la lista
      // cancelamos el comportamiento predeterminado del navegador y movemos el foco al primero.
      if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
      // Si Shift ESTÁ pulsado y el elemento activo es el primero de la lista
      // cancelamos el comportamiento por defecto del navegador y movemos el foco al último elemento.
      else if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      }
    };

    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, []);

  return (
    <div ref={panelRef} role="dialog" aria-label="Mapa en los dos sentidos">
      <a href="#mapa">Ver en Google Maps</a>
      <button type="button">Copiar dirección</button>
      <button type="button" aria-label="Cerrar mapa">
        ✕
      </button>
    </div>
  );
}
// <MapaEnLosDosSentidos />
// ¿Por qué? Antes, ¿por qué Shift+Tab en la ✕ te mandaba al enlace?
// Porque antes, el manejador solo miraba si el elemento activo era el último de la lista. Con Shift+Tab, el último de la lista es la ✕, así que el foco volvía al primero, que es el enlace. Ahora, con la condición de `event.shiftKey`, solo se mueve al último si estás en el primero y pulsas Shift+Tab. En la ✕, Shift+Tab retrocede normal, a "Copiar dirección".

// 6) `MapaSinAtascos` — alguien ordenó este manejador para no repetir líneas. En los
//    bordes, el foco sigue dando la vuelta; pero en medio del panel, Tab ya no avanza.
//    Tiene que avanzar, y los bordes seguir como están.
export function MapaSinAtascos() {
  // Hacemos referencia a un div que contiene el panel del mapa.
  // Mientras no haya un div, `panelRef.current` será null, por eso el tipo es `HTMLDivElement | null`.
  const panelRef = useRef<HTMLDivElement>(null);

  // Una vez montado el componente, añadimos un listener al documento para escuchar los eventos de teclado.
  useEffect(() => {
    // alPulsar será una función que se ejecuta cada vez que se pulsa una tecla en el documento.
    const alPulsar = (event: KeyboardEvent) => {
      // panel es el div del panel del mapa, obtenido a través de la referencia.
      const panel = panelRef.current;

      // Si la tecla pulsada no es Tab, o si el foco no está dentro del panel, no hacemos nada y salimos de la función.
      if (event.key !== "Tab" || !panel?.contains(document.activeElement)) {
        return;
      }
      // Definimos la lista de elementos enfocables dentro del panel con <HTMLElement> para que TypeScript sepa que son elementos HTML y tengan el método focus().
      const lista = panel.querySelectorAll<HTMLElement>(ENFOCABLES);
      // Obtenemos el primer elemento de la lista
      const primero = lista[0];
      // Obtenemos el último elemento de la lista
      const ultimo = lista[lista.length - 1];
      // Si no hay elementos enfocables, no hacemos nada y salimos de la función.
      if (!primero || !ultimo) {
        return;
      }

      if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      } else if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      }
    };

    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, []);

  return (
    <div ref={panelRef} role="dialog" aria-label="Mapa sin atascos">
      <a href="#mapa">Ver en Google Maps</a>
      <button type="button">Copiar dirección</button>
      <button type="button" aria-label="Cerrar mapa">
        ✕
      </button>
    </div>
  );
}
// <MapaSinAtascos />
// ¿Por qué? En medio del panel, ningún borde movía el foco. ¿Por qué el navegador
// tampoco?
// Porque en el drill 5 el event.preventDefault() estaba dentro de los if de los bordes. Si no se cumplía ninguno, el navegador avanzaba solo, y en el starter de este drill no lo hacía: el preventDefault() estaba fuera de los if, así que cancelaba el comportamiento por defecto aunque no se moviera el foco.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — la trampa entera
 * ─────────────────────────────────────────────────────────────────────────────
 *   la lista            →  `querySelectorAll<HTMLElement>`, y el primero y el
 *                          último comprobados antes de usarlos
 *   los bordes          →  Tab en el último y Shift+Tab en el primero: cancelas y
 *                          mueves tú
 *   en medio            →  no tocas nada: el navegador avanza solo
 * ───────────────────────────────────────────────────────────────────────────── */

// 7) `MapaDeProjex` — tu `MapModal`, recortado (el iframe va cambiado por un enlace).
//    El Escape ya funciona; la trampa del Tab no existe. Escríbela: Tab en el último
//    vuelve al primero, Shift+Tab en el primero va al último, en medio no se atasca,
//    y si el foco anda fuera del modal, Tab o Shift+Tab lo meten en el primero.
//    En verde y sin errores de tipos, es lo que le falta al `Contact.tsx` de Projex.

export function MapaDeProjex({ onClose }: { onClose: () => void }) {
  // Creamos una referencia al div que contiene todo el modal.
  // Mientras el div no exista, modalRef.current será null.
  const modalRef = useRef<HTMLDivElement>(null);

  // Al montar el componente, registramos un listener para escuchar
  // las teclas pulsadas en el documento.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape cierra el modal y termina el manejador.
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Obtenemos el div del modal a través de la referencia.
      const modal = modalRef.current;

      // Si no es Tab o el modal todavía no existe, no hacemos nada.
      if (event.key !== "Tab" || !modal) {
        return;
      }

      // Buscamos todos los elementos enfocables dentro del modal.
      // <HTMLElement> permite que TypeScript reconozca el método focus().
      const lista = modal.querySelectorAll<HTMLElement>(ENFOCABLES);

      // Obtenemos el primer elemento de la lista.
      const primero = lista[0];

      // Obtenemos el último elemento de la lista.
      // Los índices empiezan en 0, por eso restamos 1 a lista.length.
      const ultimo = lista[lista.length - 1];

      // Si no hay primer o último elemento, no podemos mover el foco.
      // También evitamos que TypeScript trate esos valores como undefined.
      if (!primero || !ultimo) {
        return;
      }

      // Comprobamos si el elemento que tiene el foco está fuera del modal.
      if (!modal.contains(document.activeElement)) {
        // Cancelamos la navegación normal del navegador.
        event.preventDefault();

        // Metemos el foco en el primer elemento enfocable del modal.
        primero.focus();

        // Terminamos para no ejecutar también la lógica de los bordes.
        return;
      }

      // Si pulsamos Tab sin Shift y el foco está en el último elemento,
      // cancelamos el avance normal y volvemos al primero.
      if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }

      // Si pulsamos Shift+Tab y el foco está en el primero,
      // cancelamos el retroceso normal y saltamos al último.
      else if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      }

      // Si el foco está en medio del modal, no hacemos nada:
      // el navegador avanza o retrocede normalmente.
    };

    // Registramos el manejador para escuchar las pulsaciones de teclado.
    document.addEventListener("keydown", handleKeyDown);

    // Al desmontar el componente, retiramos el listener para evitar
    // que siga actuando cuando el modal ya no exista.
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    // Este div es el contenedor del modal al que apunta modalRef.
    <div ref={modalRef} role="dialog" aria-modal="true" aria-label="Mapa de ubicación">
      {/* Botón que cierra el modal. Es el primer elemento enfocable del modal. */}
      <button type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>

      {/* Elemento enfocable intermedio. */}
      <a href="#mapa">Abrir en Google Maps</a>

      {/* Último elemento enfocable del modal. */}
      <button type="button">Copiar dirección</button>
    </div>
  );
}

// <MapaDeProjex onClose={() => {}} />
// ¿Por qué? En los drills 4 a 6, si el foco estaba fuera del panel, la trampa no hacía
// nada. ¿Por qué aquí lo mete dentro?
// Porque antes, el manejador solo miraba si el elemento activo estaba dentro del panel. Aquí, si no está dentro, cancelamos el comportamiento por defecto y lo llevamos al primer elemento del modal.
// El panel del banco está entre otras tarjetas: si el foco sale, se sigue viendo y la página se sigue usando. El modal de Projex tapa la página con el fondo oscuro: si el foco anda fuera, desaparece detrás y quien navega con teclado no sabe dónde está.
// Por eso aquí el foco no puede andar fuera del modal, y no viene de serie: lo consigue la rama del `contains`. Sin ella, el Shift+Tab desde fuera acababa en <body>.
