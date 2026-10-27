import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 01 — useEffect: cuándo corre y cuándo se repite · bloque 12
 *
 * 📌 RECORDATORIO — el efecto de tu MapModal, recortado a lo que mira este archivo:
 * useEffect(() => {
 *   document.body.style.overflow = "hidden"; // toca algo de fuera de React
 *   closeButtonRef.current?.focus(); // y algo que ya está pintado
 * }, [onClose]); // ← cuándo se repite
 * El return de limpieza es el 02, y los refs, el 03. Aquí, solo el cuándo.
 *
 * 🎯 OBJETIVOS
 * · Decir en qué momento corre un efecto respecto al pintado.
 * · Escribir un useEffect que toque algo que React no controla.
 * · Elegir entre sin array, [] y [valor] según cuándo deba repetirse.
 *
 * 🟢 CONTEXTO — es la primera pieza de tu MapModal y la base de cualquier custom
 * hook. useState le da memoria al componente; useEffect le deja tocar lo que vive
 * fuera de él: el título de la pestaña, el scroll del body, el foco.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · cuándo corre un efecto → drills 1–3
 * TEORÍA 2 · el array de dependencias → drills 4–6
 *
 * ▸ 6 drills en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-01.test.tsx
 * pnpm typecheck
 *
 * Los starters están rotos a propósito y los 6 compilan: la señal está en el test
 * (la del 4 también la da el linter). Las predicciones (2, 3 y 5) se responden
 * leyendo el código, sin ejecutarlo. Contesta cada ¿Por qué? en la línea libre de
 * debajo. Pistas: exercise-01.pistas.md. Drills 1, 4 y 6: banco, pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — cuándo corre un efecto
 *
 * DEFINICIÓN
 * Un efecto es código que React ejecuta después de pintar el componente en la
 * página. Sirve para sincronizarlo con algo que React no controla: el título de la
 * pestaña, el body, el foco. Sin segundo argumento, se repite después de cada
 * render.
 *
 * SINTAXIS — con un ejemplo inventado, el título de un chat:
 * function Chat({ sinLeer }: { sinLeer: number }) {
 *   useEffect(() => { // con llaves: no devuelve nada
 *     document.title = `(${sinLeer}) Mensajes`; // corre con la página ya pintada
 *   }); // sin array: tras cada render
 *   return <p>Tienes {sinLeer} sin leer</p>;
 * }
 *
 * 🧠 ANALOGÍA — colgar un cuadro: primero se pinta la pared (el render) y, solo
 * cuando está seca, se cuelga el cuadro (el efecto). Colgarlo mientras pintas es
 * colgarlo de una pared que todavía no existe.
 *
 * 🗣️ LAS PIEZAS
 * el cuerpo del componente → decide qué pintar.
 * useEffect                → actúa después.
 *
 * ⚠️ TRAMPA — tocar la página desde el cuerpo del componente. En el primer render,
 * lo que vas a devolver todavía no está en la página: si buscas ahí un botón tuyo,
 * no lo encuentras.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) EnfocarCerrar — al abrirse el mapa, el foco tiene que caer en la ✕, como en
 * tu MapModal: así quien usa teclado lo cierra sin tener que ir a buscarla.
 * Hoy el foco no cae en ningún sitio.
 * Sin autoFocus: lo que se entrena es en qué momento corre esa línea.
 * 💡 En tu MapModal esto va con un ref. Aquí va con getElementById para no
 * mezclarlo con el 03.
 */
export function EnfocarCerrar() {
  // Con useEffect controlamos los efectos post-render en React.
  useEffect(() => {
    // Buscamos el botón por su id
    const boton = document.getElementById("cerrar-mapa");
    // Y le pedimos que se enfoque. Esto corre después de pintar el componente.
    boton?.focus();
  }, []);

  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button id="cerrar-mapa" type="button" aria-label="Cerrar mapa">
        ×
      </button>
      <p>Aquí iría el mapa.</p>
    </div>
  );
}

/* 2) Predice: este componente se monta una vez. ¿En qué orden quedan los dos
 * registros?
 *   function Registro({ registrar }: { registrar: (paso: string) => void }) {
 *     useEffect(() => { registrar("efecto"); });
 *     registrar("pinta");
 *     return <p>Hola</p>;
 *   }
 * ¿Por qué?
 * Porque registrar("pinta") se ejecuta directamente en el cuerpo
 * del componente durante el render.
 *
 * En cambio, registrar("efecto") está dentro de useEffect, por lo
 * que React lo ejecuta después del pintado.
 *
 * Por eso el orden es: "pinta, efecto".
 */
export type Orden = "efecto, pinta" | "pinta, efecto";
export const respuesta2: Orden = "pinta, efecto";

/* 3) Predice: Lupa tiene un efecto sin array. Se monta, y el usuario pulsa dos
 * veces "Acercar". ¿Cuántas veces ha corrido el efecto en total?
 *   function Lupa() {
 *     const [zoom, setZoom] = useState(1);
 *     useEffect(() => { document.title = `Mapa · zoom ${zoom}`; });
 *     return <button onClick={() => setZoom(zoom + 1)}>Acercar</button>;
 *   }
 * 💡 Cuéntalo como en producción. En pnpm dev, el modo estricto de React
 * repite el montaje una vez a propósito; el porqué es del 02.
 * La App inicia = 1er render
 * El usuario pulsa "Acercar" = 2do render
 * El usuario pulsa "Acercar" = 3er render
 *  este efecto no tiene array, y sin array corre después de cada render. Por eso 3 renders dan 3 efectos.
 */
export const respuesta3: number = 3;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — el array de dependencias
 *
 * DEFINICIÓN
 * El segundo argumento de useEffect es la lista de valores que vigila. Tras cada
 * render, React compara cada valor con el del render anterior y solo repite el
 * efecto si alguno cambió. Con la lista vacía no vigila nada: corre una sola vez,
 * al montarse.
 *
 * SINTAXIS — el chat de antes, vigilando sinLeer:
 * useEffect(() => {
 *   document.title = `(${sinLeer}) Mensajes`;
 * }, [sinLeer]);
 *
 * sin array → tras cada render
 * []        → una vez, al montarse
 * [sinLeer] → al montarse, y cada vez que sinLeer cambie
 *
 * 🧠 ANALOGÍA — un vigilante con una lista: solo repite la ronda si cambió algo de
 * lo que tiene apuntado. Sin lista, la hace siempre; con la lista vacía, solo la
 * primera noche.
 *
 * 🗣️ LAS PIEZAS
 * [sinLeer]                   → array de dependencias.
 * react-hooks/exhaustive-deps → la regla del linter que avisa si usas un valor y
 *                               no está en la lista.
 *
 * ⚠️ TRAMPA — usar un valor dentro del efecto y dejarlo fuera del array. El efecto
 * no se repite cuando ese valor cambia: lo de fuera se queda como lo dejó el
 * primer render.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) BloqueoScroll — mientras el mapa está abierto, la página de fondo no se
 * tiene que poder mover: es la primera línea del efecto de tu MapModal. Hoy,
 * si el mapa se abre después de montarse el componente, el fondo se sigue
 * moviendo. Y al cerrarlo, el scroll tiene que volver.
 */
export function BloqueoScroll({ abierto }: { abierto: boolean }) {
  useEffect(() => {
    // Ubicamos el scroll del body según el estado de abierto. Si está abierto, bloqueamos el scroll; si está cerrado, lo desbloqueamos.
    // abierto = true → document.body.style.overflow = "hidden" → bloquea el scroll
    // abierto = false → document.body.style.overflow = "" → desbloquea el scroll
    document.body.style.overflow = abierto ? "hidden" : "";
  }, [abierto]);

  return (
    <>
      <p>{abierto ? "Mapa abierto: el fondo no se mueve" : "Mapa cerrado"}</p>
    </>
  );
}

/* 5) Predice: MapaConLupa vigila [abierto]. Se monta con el mapa abierto, y el
 * usuario pulsa tres veces "Acercar". abierto no cambia en ningún momento.
 * ¿Cuántas veces ha corrido el efecto en total?
 *   function MapaConLupa({ abierto }: { abierto: boolean }) {
 *     const [zoom, setZoom] = useState(1);
 *     useEffect(() => {
 *       document.body.style.overflow = abierto ? "hidden" : "";
 *     }, [abierto]);
 *     return <button onClick={() => setZoom(zoom + 1)}>Acercar ({zoom})</button>;
 *   }
 * ¿Por qué?
 * Sólo corrió el efecto en el primer render, pero como la lógica de abierto no se ha modificado en ningún momento, el efecto no se repitió. Por eso, la respuesta es 1.
 */
export const respuesta5: number = 1;

/* 6) TituloMapa — la pestaña del navegador tiene que decir "Mapa · zoom 1",
 * seguir al zoom cada vez que pulsas "Acercar" y mostrar una ★ cuando está
 * marcado "Favorito".
 * (Enunciado ajustado el 12 oct a tu versión: el original pedía que Favorito
 * no repitiera el efecto.)
 */
export function TituloMapa() {
  const [zoom, setZoom] = useState(1);
  const [favorito, setFavorito] = useState(false);

  // ARRAY DE DEPENDENCIAS:
  //
  // Le indica a React cuándo debe volver a ejecutar el efecto.
  //
  // Sin array:
  // Se ejecuta después de cada render.
  //
  // Con []:
  // Se ejecuta al montarse el componente, salvo repeticiones
  // adicionales de desarrollo por StrictMode.
  //
  // Con [zoom]:
  // Se ejecuta al montarse y cuando cambia zoom.
  //
  // Con [zoom, favorito]:
  // Se ejecuta al montarse y cuando cambia zoom o favorito.
  //
  // IMPORTANTE:
  // React vuelve a renderizar el componente cuando cambia un estado.
  // El efecto solo vuelve a ejecutarse si corresponde según sus
  // dependencias. El efecto no actualiza necesariamente la interfaz;
  // en este caso, modifica el título de la pestaña del navegador.

  // Por eso: Cada vez que el valor de zoom o favorito cambia, el efecto se ejecuta y actualiza la App con la nueva información. Si solo quieres que se ejecute cuando cambia zoom, puedes poner solo [zoom] en el array de dependencias.
  useEffect(() => {
    document.title = `Mapa · zoom ${zoom} ${favorito ? "★" : ""}`;
  }, [zoom, favorito]);

  return (
    <div>
      <p>
        Zoom {zoom}
        {favorito ? " · ★ favorito" : ""}
      </p>
      {/* Al dar click seteamos con el useState el valor de zoom uno a uno */}
      <button
        onClick={() => {
          setZoom(zoom + 1);
          setFavorito(false);
        }}
      >
        Acercar
      </button>
      {/* Como favorito está seteado en false, cuando el usuario lo añade a favorito, este cambia a true y se renderiza en el <p> de la línea 186 */}
      <button onClick={() => setFavorito(!favorito)}>Favorito</button>
    </div>
  );
}
