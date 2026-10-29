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
 *
 */
export function MapaConTitulo({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.title = "Mapa · Projex";
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
 *
 */
export function VisorDeFoto({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
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
 *
 */
export function EnvioConfirmado({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.title = "Enviado · Projex";
    const anterior = document.title;
    return () => {
      document.title = anterior;
    };
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
 *
 */
export function BuscadorDeProjex({ onClose }: { onClose: () => void }) {
  const campoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const anterior = document.activeElement;
    campoRef.current?.focus();
    return () => {
      anterior?.focus();
    };
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
 *
 */
export function MenuDelMovil({ onClose }: { onClose: () => void }) {
  const primerEnlaceRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const alPulsarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", alPulsarTecla);
    return () => document.removeEventListener("keydown", alPulsarTecla);
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
