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
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el 01 enfocaste la ✕ con `getElementById`: buscar en TODA la página por un id
 * que te tienes que inventar y que no se puede repetir. Si el componente se pinta dos
 * veces, hay dos ✕ con el mismo id. Un ref es tu agarradera a ESE elemento.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · qué es un ref y cómo se tipa      →  drills 1 a 3
 *   TEORÍA 2 · cuándo `.current` vale `null`      →  drills 4 a 6
 *
 * ▸ EJERCICIO — 6 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-03.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito. Compilan 5 de 6: el que no, lo
 *   verás en el typecheck. Y 1 de los 6 puede pasar el test con un error de tipos
 *   dentro: corre siempre los dos comandos. Los drills 3 y 5 son predicciones con
 *   un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-03.pistas.md`, de una en una.
 *
 * 👁️ Los componentes de los drills 1, 2, 4 y 6 están montados en el banco (pestaña 12).
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
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cerrarRef.current?.focus();
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button type="button" aria-label="Cerrar mapa">
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
  const campoRef = useRef(null);

  return <input ref={campoRef} aria-label="Ciudad" defaultValue="Santiago" />;
}

// 3) Predice: ¿qué imprime este `console.log` en el PRIMER render?
//        function Lupa() {
//          const botonRef = useRef<HTMLButtonElement>(null);
//          console.log(botonRef.current);
//          return <button ref={botonRef}>Acercar</button>;
//        }
export type Contenido = "null" | "el <button>";
export const respuesta3: Contenido = "el <button>";
// ¿Por qué?

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
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>
      <button type="button" onClick={() => panelRef.current.focus()}>
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
export const respuesta5: ContenidoPanel = "el <div> del panel";
// ¿Por qué?

// 6) `MapaConRetorno` — el viaje completo del foco en tu `MapModal`: al abrir el
//    mapa, el foco cae en la ✕; al cerrarlo con la ✕, vuelve a "Abrir mapa", para
//    que quien usa teclado siga donde estaba. Un ref para cada botón.
//    Sin `autoFocus` ni `getElementById`: aquí se entrena el ref.
export function MapaConRetorno() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setAbierto(true)}>
        Abrir mapa
      </button>
      {abierto && (
        <div role="dialog" aria-label="Mapa de ubicación">
          <button type="button" aria-label="Cerrar mapa" onClick={() => setAbierto(false)}>
            ×
          </button>
          <p>Aquí iría el mapa.</p>
        </div>
      )}
    </div>
  );
}
// <EnfocarConRef />  ·  <CampoCiudad />  ·  <PanelEnfocable />  ·  <MapaConRetorno />
