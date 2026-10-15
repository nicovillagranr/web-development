import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 02 — la limpieza de un efecto   ·  bloque 12
 * =============================================================================
 *
 * 📌 RECORDATORIO — el final del efecto de tu `MapModal`, recortado:
 *     useEffect(() => {
 *       document.body.style.overflow = "hidden";
 *       document.addEventListener("keydown", handleKeyDown);
 *       return () => {                                          // ← la limpieza
 *         document.removeEventListener("keydown", handleKeyDown);
 *         document.body.style.overflow = previousOverflow;
 *       };
 *     }, [onClose]);
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · escribir la limpieza de un efecto y decir cuándo la llama React
 *   · quitar un listener con la misma función con la que lo pusiste
 *   · explicar por qué en `pnpm dev` cada efecto se monta dos veces
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * Haz la prueba en el banco: abre el mapa del drill 4 del 01 y cambia a la pestaña
 * 11. El componente ya no está, pero el fondo sigue bloqueado. Todo lo que un efecto
 * deja puesto fuera de React, alguien tiene que quitarlo: ese alguien es la limpieza.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · qué es la limpieza y cuándo corre              →  drills 1 a 3
 *   TEORÍA 2 · la limpieza antes de repetir, y el doble montaje →  drills 4 y 5
 *   ESCALERA · quitar con la misma función, paso a paso       →  drills 6 a 11
 *
 * ▸ EJERCICIO — 11 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-02.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito, y los 11 compilan: toda la señal
 *   está en el test. Las predicciones (3, 4, 5 y 6) se responden leyendo el
 *   código, sin ejecutarlo. Los drills 3 y 5 llevan un `// ¿Por qué?` que reviso yo.
 *   ¿Atascado? Las pistas están en `exercise-02.pistas.md`, de una en una.
 *
 * 👁️ Los drills 1, 2, 9 y 11 están montados en el banco (pestaña 12).
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — qué es la limpieza y cuándo corre
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   La limpieza es la función que DEVUELVE un efecto. React la guarda y la llama
 *   cuando el componente desaparece de la página (se desmonta), para deshacer lo
 *   que el efecto dejó puesto fuera de React.
 *
 * SINTAXIS — con un ejemplo inventado, algo que escucha el tamaño de la ventana:
 *     useEffect(() => {
 *       const medir = () => console.log(window.innerWidth);
 *       window.addEventListener("resize", medir);        // el efecto pone algo
 *       return () => {                                   // la limpieza, con llaves
 *         window.removeEventListener("resize", medir);   // quita ESO MISMO
 *       };
 *     }, []);
 *
 *   `removeEventListener` busca la función exacta que le pasas: tiene que ser la
 *   misma que recibió `addEventListener`, no otra escrita igual.
 *
 * 🧠 ANALOGÍA — una habitación de hotel: al entrar enciendes la luz y abres la
 *    ventana; al irte, el hotel no apaga nada por ti. La limpieza es el repaso
 *    antes de devolver la llave.
 *
 * 🗣️ LAS PIEZAS
 *     la función del `return` → función de limpieza (cleanup)  ·  desmontarse →
 *     que el componente deje de pintarse
 *
 * ⚠️ TRAMPA — no escribir la limpieza. Mientras el componente está en pantalla
 *    todo funciona; el fallo sale DESPUÉS de cerrarlo, y por eso cuesta verlo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) `ModalSinScroll` — tu `MapModal` recortado a su primera línea: mientras está
//    abierto, el fondo no se mueve. Hoy, al cerrarlo, el fondo se queda bloqueado.
//    Al desmontarse, el `overflow` del `body` tiene que volver a `""`.
export function ModalSinScroll() {
  useEffect(() => {
    // 1. EFECTO: bloquear el scroll del fondo
    document.body.style.overflow = "hidden";

    // 2. LIMPIEZA: devolver el fondo a su estado anterior
    return () => {
      document.body.style.overflow = "";
    };
    // Array de dependencias vacío: el efecto solo corre al montar y al desmontar.
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <p>Mapa abierto: el fondo no se mueve.</p>
    </div>
  );
}

// 2) `CerrarConEscape` — Escape cierra el mapa, como en tu `MapModal`. El listener
//    ya está escrito y funciona; lo que falla es lo de después: con el mapa ya
//    cerrado, cada Escape vuelve a llamar a `onClose`. Al desmontarse, el
//    listener tiene que irse.
//    💡 Aquí `KeyboardEvent` es el del navegador, no el de React: eso es el 04.
export function CerrarConEscape({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // 1. EFECTO: escuchar Escape
    const alPulsar = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", alPulsar);

    return () => {
      document.removeEventListener("keydown", alPulsar);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <p>Pulsa Escape para cerrar.</p>
    </div>
  );
}

// 3) Predice: esta versión sí escribe la limpieza. Se monta, se desmonta, y después
//    el usuario pulsa Escape. ¿Se llama a `onClose`?
//        useEffect(() => {
//          document.addEventListener("keydown", (event) => {
//            if (event.key === "Escape"){
//              onClose();
//            }
//          });
//          return () => {
//            document.removeEventListener("keydown", (event) => {
//              if (event.key === "Escape"){
//                onClose();
//              }
//            });
//          };
//        }, [onClose]);

export type Llamada = "sí, se llama" | "no, ya no se llama";
export const respuesta3: Llamada = "sí, se llama";
// ¿Por qué?
// Porque `addEventListener` y `removeEventListener` reciben funciones distintas,
// aunque tengan el mismo código. Como `removeEventListener` necesita la misma
// referencia de función que se registró, no logra eliminar el listener original.
// Por eso, al presionar Escape después del desmontaje, todavía se ejecuta `onClose()`.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la limpieza antes de repetir, y el doble montaje
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando un efecto se repite porque cambió algo de su array, React llama
 *   primero a la limpieza del efecto ANTERIOR y después corre el nuevo. Cada
 *   limpieza ve los valores del render en el que nació su efecto.
 *
 *     montaje            →  efecto
 *     cambia el array    →  limpieza del anterior  ·  efecto nuevo
 *     desmontaje         →  limpieza
 *
 *   En desarrollo, `StrictMode` hace además un ensayo: nada más montar cada
 *   componente, lo desmonta y lo vuelve a montar. Si tu limpieza deshace bien lo
 *   que hace el efecto, el ensayo no se nota; si falta, se nota. En producción
 *   el ensayo no existe.
 *
 * 🧠 ANALOGÍA — el simulacro de incendio: antes de abrir, el edificio desaloja y
 *    vuelve a entrar. Si la salida funciona, nadie se entera; si no, lo descubres
 *    en el simulacro y no el día del incendio.
 *
 * 🗣️ LAS PIEZAS
 *     `<StrictMode>` en `main.tsx` → el modo estricto, solo en desarrollo
 *
 * ⚠️ TRAMPA — creer que la limpieza solo corre al cerrar. Con un array que
 *    cambia, corre en cada repetición; si no está, cada repetición deja un
 *    listener más encima del anterior.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) Predice: `Sala` registra cuándo se conecta y cuándo se desconecta. Se monta
//    con "norte", el padre la cambia a "sur", y después se desmonta. Escribe los
//    registros en orden, contados como en producción.
//        function Sala({ nombre, registrar }: { nombre: string; registrar: (texto: string) => void }) {
//          useEffect(() => {
//            registrar(`conecta ${nombre}`);
//            return () => {
//              registrar(`desconecta ${nombre}`);
//            };
//          }, [nombre]);
//          return <p>Sala {nombre}</p>;
//        }
export const respuesta4: string[] = [
  "conecta norte",
  "desconecta norte",
  "conecta sur",
  "desconecta sur",
];

// 5) Predice: el `CerrarConEscape` del starter, SIN limpieza, en `pnpm dev`. Abres
//    el mapa una vez y pulsas Escape una vez. ¿Cuántas veces se llama a `onClose`?
export const respuesta5: number = 2;
// ¿Por qué?
// Cuando estamos en un entorno de desarrollo con 'StrictMode', pasa lo siguiente:
// Se monta el componente -> desmonta -> Vuelve a montar
// Cuando compilamos y subimos a producción, esto no pasa. Por eso, al pulsar Escape, se llama dos veces a `onClose`.

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ESCALERA — quitar con la misma función, paso a paso (drills 6 a 11)
 * ─────────────────────────────────────────────────────────────────────────────
 * LA IDEA QUE SOSTIENE TODA LA ESCALERA
 *   Una función es un valor, como un objeto. Cada vez que se evalúa una flecha
 *   nace una función NUEVA, aunque su código sea idéntico. Para usar la MISMA
 *   función en dos sitios, guárdala en una constante y usa su nombre.
 *
 *     const a = () => "hola";
 *     const b = () => "hola";
 *     a === b      // false: son dos funciones, aunque se escriban igual
 *     a === a      // true: es la misma
 *
 * 🧠 ANALOGÍA — el guardarropa: al dejar el abrigo te dan un ticket. Para
 *    recuperarlo no basta con describir un abrigo igual: te piden ESE ticket.
 *    La constante es el ticket. Una flecha nueva es un abrigo idéntico, pero no
 *    es el tuyo.
 *
 * 🗣️ LAS PIEZAS
 *     "la misma función" → la misma referencia  ·  `===` entre funciones →
 *     compara si son la misma, no si hacen lo mismo
 * ───────────────────────────────────────────────────────────────────────────── */

// 6) Predice: ¿qué da la última línea?
//        const avisar = () => "hola";
//        const copia = avisar;
//        copia === avisar
export const respuesta6: boolean = true;
// ¿Por qué?
// Porque `copia` es una referencia a la misma función que `avisar`. No se crea una nueva función, sino que ambas variables apuntan al mismo objeto en memoria. Por eso, la comparación con `===` devuelve `true`.

// Un tablón de avisos de mentira. Funciona como `addEventListener` y
// `removeEventListener`, y además sabe contar cuántos avisos tiene colgados.
// No hay que tocarlo.
export type Tablon = {
  colgar: (aviso: () => void) => void;
  quitar: (aviso: () => void) => void;
  cuantos: () => number;
};

export function crearTablon(): Tablon {
  const avisos = new Set<() => void>();
  return {
    colgar: (aviso) => {
      avisos.add(aviso);
    },
    quitar: (aviso) => {
      avisos.delete(aviso);
    },
    cuantos: () => avisos.size,
  };
}

// 7) `colgarYQuitar` — cuelga un aviso en el tablón y después quítalo: al
//    terminar, el tablón tiene que quedar vacío. Hoy se queda con 1 colgado.
export function colgarYQuitar(tablon: Tablon) {
  const colgarAviso = () => {};
  tablon.colgar(colgarAviso);
  tablon.quitar(colgarAviso);
}
// Ahí si funcionaría: colgarYQuitar(crearTablon())

// 8) `colgarYQuitarClic` — lo mismo con el `document` de verdad, todavía sin
//    React: cuelga un listener de "click" que llame a `alHacerClic` y quítalo
//    justo después. Al terminar, un clic en la página no llama a nadie.
export function colgarYQuitarClic(alHacerClic: () => void) {
  const listener = () => alHacerClic();
  document.addEventListener("click", listener);
  document.removeEventListener("click", listener);
}
// colgarYQuitarClic(() => console.log("clic"))

// 9) `AvisarClics` — y ahora dentro de un efecto, como en el drill 2: mientras
//    está montado, cada clic en la página llama a `alHacerClic`; al desmontarse,
//    deja de hacerlo. Hoy la limpieza no suelta nada.
export function AvisarClics({ alHacerClic }: { alHacerClic: () => void }) {
  useEffect(() => {
    // Guardamos la función para reutlizar la misma referencia al guardar y al quitar el listener.
    const listener = () => alHacerClic();
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [alHacerClic]);

  return <p>Contando los clics de la página…</p>;
}

// 10) `pideMenosMovimiento` — la consulta del drill 11, por dentro.
//     `window.matchMedia("(prefers-reduced-motion: reduce)")` devuelve un objeto
//     con `.matches`: `true` si el sistema pide reducir animaciones AHORA.
//     Devuelve ese valor.
export function pideMenosMovimiento(): boolean {
  // window.matchMedia: Devuelve un objeto MediaQueryList
  // (prefers-reduced-motion: reduce) es una consulta de medios que indica si el usuario ha configurado su sistema para reducir el movimiento.
  // .matches: Devuelve un valor booleano que indica si la consulta de medios coincide con la preferencia actual del usuario.
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
// pideMenosMovimiento()

// 11) `PreferenciaMovimiento` — la mitad de tu `useMediaPreferences`: si el sistema
//    pide reducir animaciones, el Hero usa la imagen estática. Pinta "Animaciones:
//    reducidas" o "Animaciones: normales" y cambia en cuanto el usuario cambia la
//    preferencia, sin recargar. Eso ya funciona; lo que falla es que, al
//    desmontarse, deja la consulta escuchando. No toques el `useState`.
//    💡 `.matches` dice si la consulta se cumple AHORA, y la consulta emite "change"
//       cuando cambia. El valor inicial va en el `useState` porque el linter no
//       deja llamar al setter nada más empezar un efecto.
export function PreferenciaMovimiento() {
  // Estado inicial: reducidas parte con lo que diga `.matches` al montar (en mi PC, false según mi configuración).
  const [reducidas, setReducidas] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    // consulta es un objeto MediaQueryList que representa la consulta de medios "(prefers-reduced-motion: reduce)".
    // `addEventListener` se utiliza para escuchar el evento "change" en la consulta de medios.
    // Cuando la preferencia del usuario cambia, se ejecuta la función que actualiza el estado `reducidas` con lo que diga `consulta.matches`: true si la activa, false si la desactiva.
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Creamos una sola función y guardamos la preferencia
    const actualizarPreferencia = () => {
      setReducidas(consulta.matches);
    };
    consulta.addEventListener("change", actualizarPreferencia);

    // Cuándo ocurre el return?
    // El return ocurre cuando el componente se desmonta o cuando el efecto se vuelve a ejecutar debido a un cambio en las dependencias (en este caso, no hay dependencias, así que solo ocurrirá al desmontarse). En ese momento, la función de limpieza se ejecuta para eliminar el listener y evitar fugas de memoria o comportamientos inesperados.
    return () => {
      consulta.removeEventListener("change", actualizarPreferencia);
    };
    // Por qué el array de dependencias está vacío?
    // No necesitamos registrar un listener nuevo cada vez que cambia reducidas. El listener que ya registramos puede consultar consulta.matches cada vez que se produce el evento.
  }, []);

  return <p>Animaciones: {reducidas ? "reducidas" : "normales"}</p>;
}
// <ModalSinScroll />  ·  <CerrarConEscape onClose={() => {}} />  ·  <AvisarClics alHacerClic={() => {}} />  ·  <PreferenciaMovimiento />
