import { useEffect, useRef } from "react";

/* =============================================================================
 * EJERCICIO 08 — el efecto como préstamo: lo que cambias, lo devuelves · bloque 12
 *
 * 📌 RECORDATORIO — document.activeElement es Element | null, y Element no tiene
 * focus(). Para llamarlo, instanceof HTMLElement estrecha el tipo dentro del if.
 *
 * 🎯 OBJETIVOS
 * · Anotar lo que el efecto va a cambiar, antes de cambiarlo.
 * · Devolverlo en la limpieza tal como estaba, no como crees que estaba.
 * · Hacerlo con el título, el scroll y el foco a la vez.
 *
 * 🟢 CONTEXTO — el refuerzo del drill 6 del 06. Allí lo hiciste con el foco y el
 * overflow de tu MapModal; aquí, con otras piezas de Projex y, al final, con su
 * menú del móvil sin la librería focus-trap-react.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · el préstamo → drills 1–4
 * ARMARLO TÚ → drill 5
 *
 * ▸ 5 drills en orden. Prohibidos any, as y el ! de «confía en mí» (x!).
 * pnpm test:run src/exercises/12-custom-hooks/exercise-08.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test con el fallo dentro:
 * ejecuta ambos comandos. Contesta cada ¿Por qué? en la línea libre de debajo.
 * Pistas: exercise-08.pistas.md. Drills 1–5: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — el préstamo: anotar, cambiar, devolver
 *
 * DEFINICIÓN
 * Un efecto que cambia algo de fuera de React (el título de la pestaña, el overflow
 * del body, el foco) lo toma prestado. La limpieza lo devuelve tal como estaba, y
 * para saber cómo estaba, el efecto lo anota antes de cambiarlo.
 *
 * SINTAXIS — mientras se envía el formulario, el cursor de espera:
 * useEffect(() => {
 *   const anterior = document.body.style.cursor; // 1. anotar
 *   document.body.style.cursor = "wait";         // 2. cambiar
 *   return () => {
 *     document.body.style.cursor = anterior;     // 3. devolver
 *   };
 * }, []);
 *
 * 🧠 ANALOGÍA — te prestan un auto: antes de mover el asiento, miras dónde estaba.
 * Al devolverlo lo dejas ahí, no en «la posición normal».
 *
 * 🗣️ LAS PIEZAS
 * el cuerpo del efecto → corre al nacer: anota y cambia.
 * la limpieza          → corre al morir: devuelve lo anotado.
 * lo anotado           → una const del cuerpo; la limpieza la recuerda.
 *
 * ⚠️ TRAMPA — devolver un valor fijo ("" o el título de siempre) en vez del
 * anotado: funciona hasta que otro componente había cambiado lo mismo antes.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) MapaConTitulo — mientras el mapa está abierto, la pestaña del navegador dice
 * «Mapa · Projex». Al cerrarlo, tiene que volver a decir lo que decía antes.
 * ¿Por qué? ¿Por qué la vuelta del título va en la limpieza, y no en el onClick de
 * la ✕?
 *  Porque el onClick no sabe qué título había antes de abrir el mapa, y la limpieza sí.
 *  Y además el onClick solo corre si se pulsa la ✕, mientras que la limpieza corre
 *  siempre que el mapa muere, se cierre como se cierre: la ✕, cambiar de pestaña del
 *  banco, o que el padre lo quite por su cuenta.
 */
export function MapaConTitulo({ onClose }: { onClose: () => void }) {
  // Una vez montado el componente, el efecto corre al nacer y anota el título de la pestaña.
  useEffect(() => {
    // Guardamos el título oficial de la pestaña antes de cambiarlo.
    const anterior = document.title;
    // Cambiamos el título de la pestaña mientras el mapa está abierto.
    document.title = "Mapa · Projex";
    // La limpieza devuelve el título de la pestaña a lo que era antes de abrir el mapa.
    // La limpieza corre al morir el componente, es decir, cuando se cierra el mapa.
    return () => {
      document.title = anterior;
    };
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button type="button" onClick={onClose} aria-label="Cerrar mapa">
        &times;
      </button>
    </div>
  );
}

/* 2) VisorDeFoto — en las noticias de Projex, una foto se amplía a pantalla
 * completa y bloquea el scroll. Se puede abrir desde el menú del móvil, que ya
 * tenía el scroll bloqueado: al cerrar la foto, el menú sigue abierto y el fondo
 * no puede volver a moverse.
 * ¿Por qué? Con el menú abierto, ¿qué valor tenía el overflow justo antes de que
 * se abriera la foto?
 * El valor era "hidden", porque el menú del móvil ya había bloqueado el scroll.
 * Al cerrar la foto, el efecto devuelve el overflow a lo que era antes de abrir la foto, que era "hidden", por lo que el fondo sigue sin poder moverse.
 */
export function VisorDeFoto({ onClose }: { onClose: () => void }) {
  // Una vez montado el componente:
  // Usuario da click en la foto → se abre el visor → corre el efecto al nacer.
  useEffect(() => {
    // Guardamos un valor específico.
    // Este es el valor del overflow justo antes de abrir la foto, que puede ser "" o "hidden" según si el menú del móvil estaba abierto o no.
    const anterior = document.body.style.overflow;
    // Cambiamos el overflow del body para bloquear el scroll mientras la foto está abierta.
    document.body.style.overflow = "hidden";
    // La limpieza devuelve el overflow del body a lo que era antes de abrir la foto.
    return () => {
      document.body.style.overflow = anterior;
    };
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  return (
    <div role="dialog" aria-label="Foto ampliada">
      <button type="button" onClick={onClose}>
        Cerrar foto
      </button>
    </div>
  );
}

/* 3) EnvioConfirmado — al enviar el formulario de contacto, un aviso dice «Mensaje
 * enviado» y la pestaña cambia a «Enviado · Projex». El título se anota y se
 * devuelve, pero al cerrar el aviso la pestaña no vuelve a lo de antes.
 * ¿Por qué? Lee tu efecto de arriba abajo: en la línea donde anotas el título,
 * ¿qué tiene que haber pasado ya, y qué todavía no?
 * El orden estaba invertido: primero se cambiaba el título y luego se anotaba, por lo que al cerrar el aviso, el título se devolvía a "Enviado · Projex" en lugar de al título original. La anotación del título debe hacerse antes de cambiarlo para que la limpieza pueda devolverlo correctamente.
 */
export function EnvioConfirmado({ onClose }: { onClose: () => void }) {
  // Una vez montado el componente:
  // El usuario envía el formulario → se abre el aviso → corre el efecto al nacer.
  useEffect(() => {
    // Guardamos el título de la pestaña antes de cambiarlo.
    const anterior = document.title;
    // Cambiamos el título de la pestaña mientras el aviso está abierto.
    document.title = "Enviado · Projex";
    // La limpieza devuelve el título de la pestaña a lo que era antes de abrir el aviso.
    return () => {
      document.title = anterior;
    };
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  return (
    <div role="status">
      <p>Mensaje enviado</p>
      <button type="button" onClick={onClose}>
        Cerrar aviso
      </button>
    </div>
  );
}

/* 4) BuscadorDeProjex — el buscador se abre encima de la página y deja el cursor
 * en su campo. Al cerrarlo, el foco vuelve al botón que lo abrió. En el navegador
 * ya funciona, pero el typecheck no lo deja pasar.
 * ¿Por qué? En el navegador, el foco volvía siempre al botón. ¿Por qué TypeScript
 * no se fiaba?
 * Porque document.activeElement es Element | null, y Element no tiene focus(). TypeScript no puede garantizar que el elemento que tenía el foco antes de abrir el buscador sea un HTMLElement, por lo que no permite llamar a focus() directamente. Se necesita estrechar el tipo con instanceof para asegurarse de que es un HTMLElement antes de llamar a focus().
 */
export function BuscadorDeProjex({ onClose }: { onClose: () => void }) {
  // Hacemos referencia a un campo de búsqueda HTML | null, y lo inicializamos a null. El typecheck no se queja porque el ref puede ser nulo al principio.
  const campoRef = useRef<HTMLInputElement>(null);

  // Una vez montado el componente:
  // Usuario abre el buscador → corre el efecto al nacer.
  useEffect(() => {
    // Guardamos el elemento que tenía el foco antes de abrir el buscador.
    const anterior = document.activeElement;
    // Si el elemento anterior es 100% un HTMLElement.
    // Para qué sirve instanceof: estrecha el tipo de Element | null a HTMLElement, que sí tiene focus().
    if (anterior instanceof HTMLElement) {
      // Ponemos el foco en el campo de búsqueda del buscador.
      campoRef.current?.focus();
      // La limpieza devuelve el foco al elemento que lo tenía antes de abrir el buscador.
      return () => {
        anterior.focus();
      };
    }
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  return (
    <div role="search">
      <input ref={campoRef} type="search" aria-label="Buscar en Projex" />
      <button type="button" onClick={onClose}>
        Cerrar buscador
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — el menú del móvil de Projex, sin la librería
 *
 * Tu MobileNav usa FocusTrap, de focus-trap-react, para el foco y para Escape, y
 * no bloquea el scroll: con el menú abierto, la página de detrás se mueve.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 5) MenuDelMovil — solo existe mientras está abierto, como el panel de tu
 * MobileNav. Al nacer: scroll bloqueado y el foco en «Servicios», el primer
 * enlace. Al morir: el overflow como estaba y el foco de vuelta en quien lo abrió.
 * Se cierra con un enlace o con Escape; el manejador de Escape ya funciona.
 * ¿Por qué? El menú no tiene ningún ref a la hamburguesa. ¿Cómo sabe adónde
 * devolver el foco?
 * Lo sabe porque document.activeElement apunta al elemento que tenía el foco antes de abrir el menú, que es la hamburguesa. Al cerrar el menú, la limpieza del efecto devuelve el foco a ese elemento.
 */
export function MenuDelMovil({ onClose }: { onClose: () => void }) {
  // Hacemos referencia al primer enlace HTML | null, y lo inicializamos a null. El typecheck no se queja porque el ref puede ser nulo al principio.
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  // Efecto del foco al enlace
  useEffect(() => {
    // Guardamos el elemento que tenía el foco antes de abrir el menú.
    const anterior = document.activeElement;
    // Si el elemento anterior es 100% un HTMLElement.
    // Para qué sirve instanceof: estrecha el tipo de Element | null a HTMLElement, que sí tiene focus().
    if (anterior instanceof HTMLElement) {
      // Ponemos el foco en el primer enlace del menú.
      primerEnlaceRef.current?.focus();
      // La limpieza devuelve el foco al elemento que lo tenía antes de abrir el menú.
      return () => {
        anterior.focus();
      };
    }
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  // Efecto del scroll bloqueado
  useEffect(() => {
    // Guardamos un valor específico.
    // Este es el valor del overflow justo antes de abrir el menú, que puede ser "" o "hidden" según si otro componente ya había bloqueado el scroll.
    const anterior = document.body.style.overflow;
    // Cambiamos el overflow del body para bloquear el scroll mientras el menú está abierto.
    document.body.style.overflow = "hidden";
    // La limpieza devuelve el overflow del body a lo que era antes de abrir el menú.
    return () => {
      document.body.style.overflow = anterior;
    };
    // Array de dependencias vacío: el efecto corre solo al nacer y al morir, no al actualizar.
  }, []);

  // Efecto del listener de Escape
  useEffect(() => {
    // El usuario pulsa Escape3
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Si el usuario pulsa Escape, se cierra el menú.
        onClose();
      }
    };
    // El efecto añade un listener al document para escuchar la tecla Escape.
    document.addEventListener("keydown", alPulsarTecla);
    // La limpieza quita el listener al document para que no siga escuchando la tecla Escape.
    return () => document.removeEventListener("keydown", alPulsarTecla);
    // Array de dependencias con onClose: el efecto corre al nacer y al morir, y se asegura de usar la versión correcta de onClose.
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
        <a href="#contacto" onClick={onClose}>
          Contacto
        </a>
      </li>
    </ul>
  );
}
