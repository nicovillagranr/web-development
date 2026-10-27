import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 07 — tu custom hook: useMediaPreferences · bloque 12
 *
 * 📌 RECORDATORIO — tu PreferenciaMovimiento (drill 11 del 02), recortado:
 * const [reducidas, setReducidas] = useState(
 *   () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
 * );
 * useEffect(() => {
 *   const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
 *   const actualizarPreferencia = () => setReducidas(consulta.matches);
 *   consulta.addEventListener("change", actualizarPreferencia);
 *   return () => consulta.removeEventListener("change", actualizarPreferencia);
 * }, []);
 *
 * 🎯 OBJETIVOS
 * · Sacar la lógica de un componente a un custom hook.
 * · Declarar una API del navegador que TypeScript no conoce, sin as.
 * · Dejar tu useMediaPreferences sin errores de tipos ni de lint.
 *
 * 🟢 CONTEXTO — tu Hero le pregunta a useMediaPreferences si pone el vídeo. Ese
 * hook le deja a Projex tres errores de tipos, porque TypeScript no conoce
 * navigator.connection. Es lo último antes del 🏁.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · un custom hook → drills 1–2
 * TEORÍA 2 · declarar lo que falta → drill 3
 * ARMARLO TÚ → drill 4
 *
 * ▸ 4 drills en orden. Prohibidos any, as y el ! de «confía en mí» (x!).
 * pnpm test:run src/exercises/12-custom-hooks/exercise-07.test.tsx
 * pnpm typecheck · pnpm lint
 *
 * Los starters están rotos a propósito, y uno pasa el test y solo lo marca el
 * lint: ejecuta los tres comandos. Contesta cada ¿Por qué? en la línea libre de
 * debajo. Pistas: exercise-07.pistas.md. Drills 1–4: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — un custom hook
 *
 * DEFINICIÓN
 * Un custom hook es una función tuya cuyo nombre empieza por use y que llama a
 * otros hooks. Saca lógica de un componente para usarla en varios. Comparte la
 * lógica, no el estado: cada componente que lo llama tiene su propio useState y
 * su propio efecto.
 *
 * SINTAXIS
 * function useAlgo(): boolean { // use + lo que devuelve
 *   const [valor, setValor] = useState(false);
 *   useEffect(() => { … }, []);
 *   return valor; // lo que recibe el componente
 * }
 * const valor = useAlgo(); // en el componente, arriba del todo
 *
 * 🧠 ANALOGÍA — una receta: dos cocineros la siguen y cada uno saca su plato. La
 * receta es la misma; los platos, no.
 *
 * 🗣️ LAS PIEZAS
 * el prefijo use  → la marca con la que React y el lint reconocen un hook.
 * lo que devuelve → su contrato: aquí un boolean; en otros, una tupla o un objeto.
 *
 * ⚠️ TRAMPA — creer que el nombre es decoración: es lo único con lo que el lint
 * sabe que una función es un hook.
 * ───────────────────────────────────────────────────────────────────────────── */

const CONSULTA = "(prefers-reduced-motion: reduce)";

/* 1) prefiereMenosMovimiento — tu PreferenciaMovimiento del 02, sacado a una
 * función para que lo use el Hero. Funciona y el test pasa, pero el lint no lo
 * deja pasar.
 * ¿Por qué? En el navegador funcionaba igual. ¿Qué miraba el lint para quejarse?
 *
 */
export function prefiereMenosMovimiento() {
  const [prefiere, setPrefiere] = useState(() => window.matchMedia(CONSULTA).matches);

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA);
    const actualizar = () => setPrefiere(consulta.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  return prefiere;
}

export function HeroDeProjex() {
  const estatico = prefiereMenosMovimiento();
  return <p>{estatico ? "Hero: imagen fija" : "Hero: vídeo"}</p>;
}
// <HeroDeProjex />

/* 2) FondoDelContacto — tu sección de contacto tiene un fondo animado que también
 * se apaga con «reducir movimiento». Alguien copió la lógica en vez de usar el
 * hook del drill 1, y copió una versión vieja: al desmontarse, se queda
 * escuchando. Borra la copia y usa el hook.
 * ¿Por qué? El Hero y el fondo llaman ahora al mismo hook. ¿Comparten el mismo
 * prefiere, o cada uno tiene el suyo?
 *
 */
export function FondoDelContacto() {
  const [prefiere, setPrefiere] = useState(() => window.matchMedia(CONSULTA).matches);

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA);
    consulta.addEventListener("change", () => setPrefiere(consulta.matches));
  }, []);

  return <p>{prefiere ? "Fondo: quieto" : "Fondo: animado"}</p>;
}
// <FondoDelContacto />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — contarle a TypeScript lo que falta
 *
 * DEFINICIÓN
 * TypeScript conoce el navegador por lib.dom.d.ts, y ahí solo están las APIs que
 * traen todos. Las que traen solo algunos se las cuentas tú: una interface con el
 * mismo nombre que una que ya existe no la sustituye, se fusiona con ella y le
 * suma campos.
 *
 * SINTAXIS — en un archivo con import, la declaración va dentro de declare global:
 * declare global {
 *   interface Navigator {
 *     deviceMemory?: number; // GB de memoria: solo en Chrome y Edge
 *   }
 * }
 * navigator.deviceMemory; // number | undefined, y ya compila
 *
 * 🧠 ANALOGÍA — el plano del edificio no trae la terraza que se añadió después: la
 * dibujas tú. El ? avisa de que hay edificios donde no se construyó.
 *
 * 🗣️ LAS PIEZAS
 * declare         → «esto ya existe; yo solo describo su forma».
 * global          → el ámbito de todo el proyecto, no solo de este archivo.
 * la fusión       → mismo nombre de interface: se suman los campos.
 * un campo objeto → su forma la declaras con otra interface, al lado.
 *
 * ⚠️ TRAMPA — declarar el campo sin el ?: TypeScript creerá que está siempre, y en
 * el navegador que no lo tenga, leer algo de dentro rompe. Es el !, pero escrito
 * en la declaración.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 3) ahorraDatos — dice si el usuario tiene activado «Ahorrar datos», leyendo
 * navigator.connection.saveData. Esa API solo existe en Chrome, Edge y algún otro:
 * en Safari y Firefox no hay navigator.connection, y ahí tiene que devolver false
 * sin romper. La declaración va suelta en el archivo, fuera de cualquier función,
 * justo encima de esta. connection también tiene que poder escuchar change, que
 * lo usa el drill 4.
 * ¿Por qué? El ? de tu declaración, ¿qué te obligó a cambiar en ahorraDatos, y de
 * qué te protege?
 *
 */
export function ahorraDatos(): boolean {
  return Boolean(navigator.connection.saveData);
}
// ahorraDatos();

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ ARMARLO TÚ — tu hook, sin errores y bien desde el primer render
 *
 * navigator.connection → la declaración del drill 3 vale para todo el proyecto:
 *                        aquí no hace falta repetirla.
 * el valor inicial     → se calcula en el useState, como en tu drill 11 del 02,
 *                        no en el efecto.
 * escuchar cambios     → el efecto solo registra y limpia los listeners.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) useMediaPreferences — tu hook de Projex, solo con el formato del cuaderno.
 * Además de los errores de tipos, tiene un fallo que el typecheck no ve: el primer
 * render sale siempre false, así que tu Hero pinta el vídeo un instante aunque el
 * usuario haya pedido menos movimiento o ahorrar datos. Tiene que salir bien desde
 * el primer render. Los prefijos moz y webkit ya no los usa ningún navegador:
 * decláralos o bórralos, tú eliges.
 * ¿Por qué? Con useState(false), ¿qué veía el Hero en su primer render, aunque el
 * usuario hubiera pedido menos movimiento?
 *
 */
export function useMediaPreferences() {
  const [usarHeroEstatico, setUsarHeroEstatico] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Connection API: detecta si el usuario tiene "Ahorrar datos" activado en el SO.
    // Fallbacks para diferentes navegadores (cada uno usa un prefijo diferente):
    // - navigator.connection (Chrome, Edge, Opera)
    // - navigator.mozConnection (Firefox con prefijo moz)
    // - navigator.webkitConnection (Safari con prefijo webkit)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updatePreferences = () => {
      // Si tiene reduce-motion O saveData activo, usar imagen estática.
      setUsarHeroEstatico(mediaQuery.matches || Boolean(connection?.saveData));
    };

    updatePreferences();

    // Listener para cambios en tiempo real (ej: el usuario activa reduce-motion mientras navega).
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updatePreferences);
    } else {
      mediaQuery.addListener(updatePreferences);
    }

    connection?.addEventListener?.("change", updatePreferences);

    // Cleanup: remover listeners para evitar memory leaks.
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updatePreferences);
      } else {
        mediaQuery.removeListener(updatePreferences);
      }
      connection?.removeEventListener?.("change", updatePreferences);
    };
  }, []);

  return usarHeroEstatico;
}
// useMediaPreferences();
