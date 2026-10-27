import { useState } from "react";

/* =============================================================================
 * EJERCICIO 00 — el ciclo de vida: montar, actualizar, desmontar · bloque 12
 *
 * 📌 RECORDATORIO — el return de tu Contact, recortado:
 * <section>
 *   <ContactForm /> // ← siempre está
 *   <ContactInfo onOpenMap={handleOpenMap} />
 *   {isMapOpen && <MapModal onClose={handleCloseMap} />} // ← aparece y desaparece
 * </section>
 *
 * 🎯 OBJETIVOS
 * · Decir qué provoca un render, y por qué renderizar no siempre cambia la página.
 * · Distinguir montar de renderizar, y qué le pasa al estado al desmontarse.
 * · Explicar por qué un componente que se actualiza conserva su estado.
 *
 * 🟢 CONTEXTO — todo el bloque 12 pregunta cuándo: cuándo corre un efecto, cuándo
 * su limpieza, cuándo se llena un ref. La respuesta siempre cae en una de tres
 * etapas: montar, actualizar o desmontar. Aquí van casi sin efectos, para verlas.
 *
 * 🗺️ MAPA
 * TEORÍA 1 · renderizar → drills 1–3
 * TEORÍA 2 · montar y desmontar → drills 4–6
 * TEORÍA 3 · actualizar sin desmontar → drills 7–9
 *
 * ▸ 9 drills en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/12-custom-hooks/exercise-00.test.tsx
 * pnpm typecheck
 *
 * Los starters están rotos a propósito y los 9 compilan: la señal está en el test.
 * Las predicciones (1–5, 7 y 9) se leen sin ejecutar. Contesta cada ¿Por qué? en
 * la línea libre de debajo. Pistas: exercise-00.pistas.md. Drills 6 y 8: banco,
 * pestaña 12.
 * ============================================================================= */

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — renderizar
 *
 * DEFINICIÓN
 * Renderizar es que React llame a tu componente para preguntarle qué pintar: la
 * función corre de arriba abajo y devuelve JSX, una descripción. Lo provocan tres
 * cosas: que se monte, que un setter reciba un valor nuevo y que se renderice su
 * padre. Después, React solo toca en la página lo que cambió en la descripción.
 *
 * SINTAXIS — cada render es una llamada nueva a la función, desde cero:
 * function Contador() {
 *   const [clics, setClics] = useState(0); // el estado: React lo guarda entre llamadas
 *   const doble = clics * 2; // una variable: nace de nuevo en cada llamada
 *   return <button onClick={() => setClics(clics + 1)}>{doble}</button>;
 * }
 *
 * 🧠 ANALOGÍA — el plano de una casa: renderizar es dibujar el plano otra vez. El
 * obrero solo rehace lo que cambió; si el plano sale igual, no mueve un ladrillo.
 *
 * 🗣️ LAS PIEZAS
 * llamar al componente → renderizar (render).
 * tocar la página      → confirmar (commit).
 *
 * ⚠️ TRAMPA — creer que una variable normal guarda algo entre renders. Cambiarla no
 * pide un render, y en el siguiente vuelve a nacer con su valor inicial.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Predice: Contador se monta y el usuario pulsa el botón dos veces. ¿Cuántas
 * veces se registra "pinta"? Cuéntalo como en producción.
 *   function Contador({ registrar }: { registrar: (texto: string) => void }) {
 *     const [clics, setClics] = useState(0);
 *     registrar("pinta");
 *     return <button onClick={() => setClics(clics + 1)}>Clics: {clics}</button>;
 *   }
 * ¿Por qué?
 * Primer pinta: montaje inicial.
 * Segundo pinta: primer clic, setClics cambia el estado y provoca un render.
 * Tercer pinta: segundo clic, setClics cambia el estado y provoca otro render.
 * Total: 3 veces.
 */
export const respuesta1: number = 3;

/* 2) Predice: tu botón "Me gusta" del drill 15 del 02, con una variable en vez de
 * estado. Se monta y el usuario lo pulsa dos veces. ¿Qué número muestra?
 *   function MeGusta() {
 *     let likes = 0;
 *     return (
 *       <button onClick={() => { likes = likes + 1; }}>
 *         Me gusta {likes} {likes === 1 ? "like" : "likes"}
 *       </button>
 *     );
 *   }
 * ¿Por qué?
 * La lógica de incrementar likes funciona, pero como likes es una variable local, su valor se reinicia a 0 en cada render. Al hacer clic, se incrementa likes, pero no hay un render que actualice la UI, por lo que siempre se muestra 0.
 * Para que el nuevo render de verdad actualice en pantalla el valor, se necesia usar useState en vez de una variable normal.
 */
export const respuesta2: number = 0;

/* 3) Predice: Contacto se monta y el usuario pulsa "Abrir mapa". ¿Cuántas veces
 * se registra "pinta Info"?
 *   function Info({ registrar }: { registrar: (texto: string) => void }) {
 *     registrar("pinta Info");
 *     return <p>Santiago, Chile</p>;
 *   }
 *   function Contacto({ registrar }: { registrar: (texto: string) => void }) {
 *     const [abierto, setAbierto] = useState(false);
 *     return (
 *       <section>
 *         <Info registrar={registrar} />
 *         <button onClick={() => setAbierto(true)}>Abrir mapa</button>
 *         {abierto && <p>Mapa</p>}
 *       </section>
 *     );
 *   }
 * ¿Cambia algo de lo que ves dentro de Info? ¿Por qué?
 * No cambia nada dentro de Info porque su contenido es estático y no depende de ningún estado o prop que cambie. Sin embargo, se registra "pinta Info" dos veces porque Contacto se renderiza dos veces: una al montarse inicialmente y otra cuando el usuario pulsa "Abrir mapa", lo que provoca un re-render de Contacto y, por ende, un segundo render de Info aunque su contenido no cambie.
 */
export const respuesta3: number = 2;

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — montar y desmontar
 *
 * DEFINICIÓN
 * Montar es la primera vez que un componente aparece en la página: React lo crea,
 * su estado nace con el valor inicial y hace su primer render. Desmontar es
 * quitarlo: React lo borra, y su estado se va con él. Si vuelve a aparecer, es un
 * componente nuevo, con el estado desde cero.
 *
 * SINTAXIS — en tu Contact, el && del recordatorio decide si el modal existe:
 * isMapOpen pasa a true  → MapModal se monta
 * isMapOpen pasa a false → MapModal se desmonta
 *
 * El valor inicial de useState solo se usa al montar. Si le pasas una función,
 * React la llama una única vez, al nacer: useState(() => calcularInicial()).
 *
 * 🧠 ANALOGÍA — el hotel del 02: montar es el check-in, desmontar el check-out. Si
 * vuelves al día siguiente, te dan una habitación limpia: lo que dejaste no está.
 *
 * 🗣️ LAS PIEZAS
 * aparecer    → montarse (mount).
 * desaparecer → desmontarse (unmount).
 *
 * ⚠️ TRAMPA — creer que cerrar es pausar. Al desmontarse, el estado de ese
 * componente se pierde con él, aunque vuelva a aparecer un segundo después.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Predice: este Mapa vive dentro de un {abierto && <Mapa />}. Abres el mapa,
 * pulsas el botón dos veces, lo cierras y lo vuelves a abrir. ¿Qué número
 * muestra el botón?
 *   function Mapa() {
 *     const [zoom, setZoom] = useState(1);
 *     return <button onClick={() => setZoom(zoom + 1)}>Zoom {zoom}</button>;
 *   }
 * ¿Por qué?
 * En la misma definición de montar y desmontar de arriba lo dice. Se elimina el componente del DOM al cerrarlo, y al volver a abrirlo se monta de nuevo, por lo que el estado zoom se reinicia a su valor inicial de 1.
 */
export const respuesta4: number = 1;

/* 5) Predice: el mismo Mapa, registrando cuándo nace y cuándo pinta.
 *
 *  - Abres el mapa -> se registra "nace" y "pinta".
 *  - Pulsas el botón una vez -> se registra "pinta".
 *  - Lo cierras -> no se registra nada.
 *  - Lo vuelves a abrir -> se registra "nace" y "pinta".
 *
 *   function Mapa({ registrar }: { registrar: (texto: string) => void }) {
 *     const [zoom, setZoom] = useState(() => { registrar("nace"); return 1; });
 *     registrar("pinta");
 *     return <button onClick={() => setZoom(zoom + 1)}>Zoom {zoom}</button>;
 *   }
 * ¿Por qué no se registra nada al cerrarlo?
 * Al cerrarse el mapa, el componente se desmonta y se elimina del DOM, por lo que no se registran más eventos.
 */
export const respuesta5: string[] = ["nace", "pinta", "pinta", "nace", "pinta"];

/* 6) ContactoConMapa — el usuario acerca el mapa hasta encontrar la oficina, lo
 * cierra para escribir el mensaje y, al volver a abrirlo, el zoom está otra vez
 * en 1. Haz que el zoom sobreviva a cerrar y abrir el mapa.
 * Al cerrarse, el mapa tiene que seguir desapareciendo de la página, como el
 * MapModal de tu Contact.
 */

// Definimos este componente como uno que recibirá 2 props: zoom y setZoom, para poder actualizar el estado del zoom desde el componente padre.
function MapaConZoom({ zoom, setZoom }: { zoom: number; setZoom: (zoom: number) => void }) {
  return (
    <div role="dialog" aria-label="Mapa de ubicación">
      <button type="button" onClick={() => setZoom(zoom + 1)}>
        Zoom {zoom}
      </button>
    </div>
  );
}

export function ContactoConMapa() {
  const [abierto, setAbierto] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <section>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>

      {/* Con el uso de las props montamos el componente hijo dentro del componente padre con renderizado condicional */}
      {abierto && <MapaConZoom zoom={zoom} setZoom={setZoom} />}
    </section>
  );
}
// <ContactoConMapa />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — actualizar sin desmontar
 *
 * DEFINICIÓN
 * Actualizar es volver a renderizar un componente que sigue en la página, porque
 * cambió su estado, sus props o su padre. React reutiliza el mismo componente: su
 * estado se conserva, y lo nuevo le llega por las props. Los efectos cuya lista
 * cambió se repiten, con su limpieza delante (el 02).
 *
 * SINTAXIS — las tres etapas, juntas:
 * montar     → nace el estado · render · efectos
 * actualizar → render · limpieza y efecto, solo si cambió algo de su lista
 * desmontar  → limpiezas · el estado se va con él
 *
 * 🧠 ANALOGÍA — seguir en el hotel: te cambian las toallas, pero tu maleta sigue en
 * la habitación. Solo la pierdes si haces el check-out.
 *
 * 🗣️ LAS PIEZAS
 * renderizar otra vez sin desmontar → actualizarse (update, re-render).
 *
 * ⚠️ TRAMPA — copiar una prop en el estado. El valor inicial solo se usa al montar,
 * así que cuando la prop cambia, la copia se queda con la vieja.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 7) Predice: el Contacto del drill 3, con este formulario en el lugar de Info.
 * El usuario escribe "Hola" y pulsa "Abrir mapa". ¿Qué pasa con lo escrito?
 *   function Formulario() {
 *     const [mensaje, setMensaje] = useState("");
 *     return <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />;
 *   }
 * ¿Por qué?
 * El estado del componente Formulario se mantiene entre renders, ya que el componente sigue montado en la página. Al abrir el mapa, el componente Formulario no se desmonta, por lo que el valor del estado mensaje se conserva y lo escrito por el usuario permanece intacto.
 */
export type Escrito = "se conserva" | "se borra";
export const respuesta7: Escrito = "se conserva";

/* 8) TarjetaProyecto — un "proyecto destacado" en tu Portfolio: el padre le va
 * cambiando titulo cada pocos segundos, sin desmontarla. Hoy se queda con el
 * primero que recibió. Tiene que mostrar en un <h3> "Proyecto: " seguido del
 * título que recibe en ese momento.
 */
export function TarjetaProyecto({ titulo }: { titulo: string }) {
  return <h3>Proyecto: {titulo}</h3>;
}
// <TarjetaProyecto titulo="Projex" />

/* 9) Predice: el efecto de tu PortfolioItem:
 * Antes del if hay un "registrar"
 * Una vez montado, el usuario pulsa "Ver detalle" y pasan 3 segundos. ¿Qué registros se escriben y en qué orden?
 *
 *   const [showDemoMessage, setShowDemoMessage] = useState(false);
 *   useEffect(() => {
 *     registrar(`efecto con ${showDemoMessage}`);
 *
 *     Si showDemoMessage entra al if en false, no retorna nada
 *     Si entra en true
 *     if (showDemoMessage === false){
 *      return;
 *     }
 *     registrar("efecto con true");
 *     registrar("programa");
 *     const id = setTimeout(() => setShowDemoMessage(false), 3000);
 *     return () => {
 *       registrar("limpieza");
 *       clearTimeout(id);
 *     };
 *   }, [showDemoMessage]);
 *
 * ¿Por qué el último efecto no programa nada?
 *  Porque en el if está lo más el motor del useEffect.
 * Cuando showDemoMessage es false, el efecto no programa nada y no retorna ninguna función de limpieza. Por lo tanto, al volver a renderizar con showDemoMessage en false, no se ejecuta ningún código adicional y no se programa ningún efecto.
 */
export const respuesta9: string[] = [
  "efecto con false",
  "efecto con true",
  "programa",
  "limpieza",
  "efecto con false",
];
