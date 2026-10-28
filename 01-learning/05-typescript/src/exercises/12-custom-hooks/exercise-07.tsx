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

// Definimos el tipo de consulta que vamos a hacer.
// Esta irá dirigida a saber en base a un booleano si el usuario ha activado en la configuración de su sistema operativo la opción de reducir el movimiento o las animaciones de la interfaz.
const CONSULTA = "(prefers-reduced-motion: reduce)";

/* 1) prefiereMenosMovimiento — tu PreferenciaMovimiento del 02, sacado a una
 * función para que lo use el Hero. Funciona y el test pasa, pero el lint no lo
 * deja pasar.
 * ¿Por qué? En el navegador funcionaba igual. ¿Qué miraba el lint para quejarse?
 * React es quisquilloso con el nombre que le damos a los Custom Hooks. En este caso el problema estaba en el nombre: prefiereMenosMovimiento. El lint esperaba que el nombre del hook empezara con use, así que lo cambiamos a usePrefiereMenosMovimiento y el error desapareció.
 */
export function usePrefiereMenosMovimiento() {
  // Inicializamos el estado de forma perezosa (lazy) evaluando la media query en el navegador.
  // window.matchMedia devuelve un objeto; su .matches es el booleano (true/false) según la preferencia del sistema del usuario.
  const [prefiere, setPrefiere] = useState(() => window.matchMedia(CONSULTA).matches);

  // Sincronizamos el estado con los cambios del sistema una vez montado el componente.
  useEffect(() => {
    // Creamos la referencia a la media query para escuchar sus cambios activos.
    const consulta = window.matchMedia(CONSULTA);
    // Función manejadora que actualiza el estado cuando el usuario cambia su configuración.
    const actualizar = () => setPrefiere(consulta.matches);
    // Escuchamos activamente el evento "change" del sistema operativo.
    consulta.addEventListener("change", actualizar);
    // Función de limpieza (cleanup): remueve el listener al desmontar el componente para evitar fugas de memoria.
    return () => consulta.removeEventListener("change", actualizar);
    // Array de dependencias vacío: garantiza que el efecto solo se ejecute al montar y desmontar el componente.
  }, []);
  return prefiere;
}

export function HeroDeProjex() {
  // Consumimos el hook personalizado para rastrear en tiempo real la preferencia de movimiento.
  const estatico = usePrefiereMenosMovimiento();
  // Renderizado condicional: si prefiere accesibilidad visual muestra la imagen, si no, reproduce el vídeo.
  return <p>{estatico ? "Hero: imagen fija" : "Hero: vídeo"}</p>;
}

/* 2) FondoDelContacto — tu sección de contacto tiene un fondo animado que también
 * se apaga con «reducir movimiento». Alguien copió la lógica en vez de usar el
 * hook del drill 1, y copió una versión vieja: al desmontarse, se queda
 * escuchando. Borra la copia y usa el hook.
 * ¿Por qué? El Hero y el fondo llaman ahora al mismo hook. ¿Comparten el mismo
 * prefiere, o cada uno tiene el suyo?
 * Al usar la misma lógica para saber las preferencias de animación del usuario, ambos componentes (Hero y FondoDelContacto) usan su propio hook. Cada uno tiene su propio estado interno, pero ambos se basan en la misma fuente de verdad: la preferencia del usuario. Por lo tanto, si el usuario cambia su configuración, ambos componentes reaccionarán de manera consistente y mostrarán la interfaz adecuada según la preferencia actual.
 */
export function FondoDelContacto() {
  const prefiere = usePrefiereMenosMovimiento();
  return <p>{prefiere ? "Fondo: quieto" : "Fondo: animado"}</p>;
}

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
 * Ese ahorrarDatos no servía en navegadores que no tienen navigator.connection, como Safari y Firefox. El ? en la declaración de connection indica que puede ser undefined, lo que nos obliga a usar el operador de encadenamiento opcional (?.) al acceder a saveData. Esto protege contra errores de tipo TypeError al intentar acceder a una propiedad de undefined.
 */
// Describe la forma del objeto navigator.connection.
// "extends EventTarget" le da addEventListener/removeEventListener,
// que el drill 4 necesita para escuchar el evento "change".
interface ConexionRed extends EventTarget {
  // true si el usuario activó "Ahorrar datos".
  // readonly: se lee, no se asigna (lo controla el navegador).
  readonly saveData: boolean;
}

// Como este archivo tiene "export", es un módulo y sus tipos quedan
// encerrados aquí. "declare global" permite modificar un tipo global.
declare global {
  // Navigator ya existe en TypeScript. Al declararlo de nuevo con el
  // mismo nombre, no se reemplaza: se le suma lo que escribas aquí
  // (declaration merging).
  interface Navigator {
    // readonly: no se puede reasignar navigator.connection.
    // ?: puede no existir (Safari y Firefox no la tienen), así que
    //    su tipo real es ConexionRed | undefined.
    readonly connection?: ConexionRed;
  }
}

export function ahorraDatos(): boolean {
  // ?. -> si connection es undefined, corta ahí y devuelve undefined
  //       en vez de lanzar un TypeError.
  // ?? false -> si el resultado es undefined, usa false, porque la
  //             función promete devolver siempre un boolean.
  return navigator.connection?.saveData ?? false;
}

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
 * ¿Por qué?
 * Con useState(false), ¿qué veía el Hero en su primer render, aunque el
 * usuario hubiera pedido menos movimiento?
 * Lo que se veía era el vídeo, porque el estado inicial era false. Al calcular el valor inicial dentro de useState, el Hero renderiza correctamente desde el primer render según la preferencia del usuario.
 * Ese cálculo ocurre en el primer render, antes de que se ejecute el efecto, así que no hay parpadeo ni renderizado incorrecto.
 */
// Definimos la forma del objeto que devuelve el hook, para que TypeScript sepa qué propiedades tiene y de qué tipo son.
interface Preferencias {
  prefiereReducirMovimiento: boolean;
  prefiereAhorrarDatos: boolean;
}

export function useMediaPreferences(): Preferencias {
  // Calculamos las preferencias desde el primer render.
  const [preferencias, setPreferencias] = useState<Preferencias>(() => ({
    // El resultado de prefiereReducirMovimiento se obtiene evaluando la media query en el navegador, el resultado es booleano
    prefiereReducirMovimiento: window.matchMedia(CONSULTA).matches,
    // El resultado de prefiereAhorrarDatos se obtiene llamando a la función ahorraDatos, que devuelve un booleano según la configuración del navegador
    prefiereAhorrarDatos: ahorraDatos(),
  }));

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA);

    // Actualizamos ambas preferencias cuando cambia cualquiera de las fuentes.
    const actualizarPreferencias = () => {
      setPreferencias({
        prefiereReducirMovimiento: consulta.matches,
        prefiereAhorrarDatos: ahorraDatos(),
      });
    };

    consulta.addEventListener("change", actualizarPreferencias);
    navigator.connection?.addEventListener("change", actualizarPreferencias);

    // Eliminamos los listeners al desmontar el componente.
    return () => {
      consulta.removeEventListener("change", actualizarPreferencias);
      navigator.connection?.removeEventListener("change", actualizarPreferencias);
    };
  }, []);

  return preferencias;
}
