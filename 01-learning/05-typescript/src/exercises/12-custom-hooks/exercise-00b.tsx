import { useEffect, useState } from "react";

/* =============================================================================
 * EJERCICIO 00b — la identidad: cuándo React dice "es el mismo"   ·  bloque 12
 * =============================================================================
 *
 * 📌 RECORDATORIO — las dos `key` de tu Projex:
 *     // App.tsx: cada ruta es una página NUEVA, y Framer Motion anima la salida de la vieja
 *     <Routes location={location} key={location.pathname}>
 *
 *     // Portfolio.tsx: una tarjeta por proyecto, cada una con su aviso
 *     {portfolioItems.map((item) => <PortfolioItem key={item.id} {...item} />)}
 *
 * 🎯 AL TERMINAR SABRÁS
 *   · predecir si React conserva un componente o monta otro, por su tipo y su sitio
 *   · usar `key` para que React monte un componente nuevo a propósito
 *   · explicar por qué la key de una lista es el id y no el índice
 *   · ordenar el render, las limpiezas y los efectos cuando cambia una key
 *
 * 🟢 ¿POR QUÉ ESTE ARCHIVO?
 * En el 00 viste qué pasa al montar, actualizar y desmontar. Falta cómo decide React
 * cuál de las tres toca: si el componente de este render es "el mismo" que el del
 * anterior, se actualiza; si no, el viejo se desmonta y se monta otro. Esa decisión
 * es la que hay detrás del botón "Volver a montar" del banco.
 *
 * 🗺️ MAPA DEL ARCHIVO
 *   TEORÍA 1 · tipo y sitio                →  drills 1 a 3
 *   TEORÍA 2 · la key                      →  drills 4 a 6
 *   TEORÍA 3 · el ciclo completo           →  drills 7 a 9
 *
 * ▸ EJERCICIO — 9 drills, en orden. ❌ Prohibido `any` y `as`.
 *     pnpm test:run src/exercises/12-custom-hooks/exercise-00b.test.tsx
 *     pnpm typecheck
 *
 *   Todos los starters están rotos a propósito y los 9 compilan: la señal está en
 *   el test. Las predicciones (1-5, 7 y 8) se leen sin ejecutar, y las 2, 3, 4, 5 y
 *   8 llevan un `// ¿Por qué?` que reviso yo. ¿Atascado? Las pistas están en
 *   `exercise-00b.pistas.md`, de una en una.
 * 👁️ Los drills 6 y 9 están montados en el banco (pestaña 12).
 * ===========================================================================*/

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 1 — tipo y sitio
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   En cada render, React compara lo que devuelves con lo del render anterior,
 *   sitio por sitio. Si en el mismo sitio hay el mismo TIPO de componente, es el
 *   mismo: se actualiza y conserva su estado. Si el tipo cambia, desmonta el viejo
 *   y monta otro. No mira las props, ni en qué línea del JSX lo escribiste.
 *
 * SINTAXIS — los sitios son los hijos, contados en orden. Un `{… && …}` que da
 *   false sigue ocupando su sitio, vacío:
 *     <section>
 *       <button />             // sitio 1
 *       {a && <Campo />}       // sitio 2, aunque `a` sea false
 *       {!a && <Campo />}      // sitio 3
 *     </section>
 *
 * 🧠 ANALOGÍA — el hotel: recepción no te reconoce por la cara, sino por la
 *    habitación. Si en la 204 sigue alojado un huésped, para ellos eres el mismo y
 *    tu maleta sigue ahí, aunque te hayas cambiado de ropa (las props).
 *
 * 🗣️ LAS PIEZAS
 *     "¿es el mismo?" → la identidad  ·  comparar un render con el anterior → reconciliar
 *
 * ⚠️ TRAMPA — creer que las dos ramas de un ternario son dos componentes. Si las
 *    dos pintan el mismo tipo en el mismo sitio, para React son uno solo.
 * ───────────────────────────────────────────────────────────────────────────── */

// 1) Predice: el usuario escribe "Nicolás" en el campo y pulsa "Soy empresa".
//    ¿Qué pasa con "Nicolás"?
//        function Campo({ etiqueta }: { etiqueta: string }) {
//          const [texto, setTexto] = useState("");
//          return <label>{etiqueta} <input value={texto} onChange={(e) => setTexto(e.target.value)} /></label>;
//        }
//        function Contacto() {
//          const [empresa, setEmpresa] = useState(false);
//          return (
//            <section>
//              <button onClick={() => setEmpresa(true)}>Soy empresa</button>
//              {empresa ? <Campo etiqueta="Empresa" /> : <Campo etiqueta="Nombre" />}
//            </section>
//          );
//        }
export type Queda = "se conserva" | "se borra";
export const respuesta1: Queda = "se borra";

// 2) Predice: el mismo `Contacto`, con el ternario partido en dos `&&`. Mismos
//    pasos: ¿qué pasa con "Nicolás"?
//              {empresa && <Campo etiqueta="Empresa" />}
//              {!empresa && <Campo etiqueta="Nombre" />}
export const respuesta2: Queda = "se conserva";
// ¿Por qué, si es el mismo `Campo` que en el 1?
//

// 3) Predice: `Campo` ahora está definido DENTRO de `Formulario`, y el texto vive
//    en el padre. El usuario hace clic en el campo y teclea "Hola". ¿Qué queda escrito?
//        function Formulario() {
//          const [texto, setTexto] = useState("");
//          function Campo() {
//            return <input value={texto} onChange={(e) => setTexto(e.target.value)} />;
//          }
//          return <Campo />;
//        }
export const respuesta3: string = "Hola";
// ¿Por qué?
//

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 2 — la key
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   La `key` es la tercera pieza de la identidad: mismo tipo, mismo sitio y misma
 *   key es el mismo componente. Si cambias la key, React desmonta el viejo y monta
 *   otro, aunque todo lo demás sea igual. En una lista, la key dice quién es quién
 *   entre los hermanos, en vez del orden.
 *
 * SINTAXIS — va en el padre, donde se usa el componente, y no le llega como prop:
 *     <Formulario key={proyecto.id} />              // otro proyecto → otro formulario
 *     {lista.map((p) => <Tarjeta key={p.id} />)}    // cada tarjeta sigue a SU proyecto
 *
 * 🧠 ANALOGÍA — la key es el nombre de la reserva. Si cambia el nombre, recepción
 *    hace el check-out del viejo y el check-in del nuevo, aunque sea la misma
 *    habitación. Y si identifica a los huéspedes por el número de habitación (el
 *    índice), falla en cuanto se cambian de habitación: la maleta se queda en el
 *    cuarto, no con su dueño.
 *
 * 🗣️ LAS PIEZAS
 *     `key={…}` → la key  ·  montar otro a propósito → resetear con una key
 *
 * ⚠️ TRAMPA — usar el índice del `.map` como key en una lista que cambia. Si quitas
 *    el primero, el segundo pasa a ser el 0 y hereda el estado del que se fue.
 * ───────────────────────────────────────────────────────────────────────────── */

// 4) Predice: el "Volver a montar" del banco (drill 15 del 02), recortado. El
//    usuario pulsa "Me gusta" dos veces y después "Volver a montar". ¿Qué número
//    muestra "Me gusta"?
//        // MeGusta: un botón "Me gusta {likes}" con su propio useState(0)
//        const [vez, setVez] = useState(0);
//        <button onClick={() => setVez(vez + 1)}>Volver a montar</button>
//        <MeGusta key={vez} />
export const respuesta4: number = 2;
// ¿Por qué, si `MeGusta` sigue en el mismo sitio?
//

// Tu `PortfolioItem`, recortado. Lo usan los drills 5, 6 y 9, y no se toca.
function PortfolioItem({ titulo }: { titulo: string }) {
  const [showDemoMessage, setShowDemoMessage] = useState(false);

  useEffect(() => {
    if (!showDemoMessage) return;
    const id = setTimeout(() => setShowDemoMessage(false), 3000);
    return () => clearTimeout(id);
  }, [showDemoMessage]);

  return (
    <article>
      <h3>{titulo}</h3>
      <button
        type="button"
        aria-label={`Ver detalle: ${titulo}`}
        onClick={() => setShowDemoMessage(true)}
      >
        Ver detalle
      </button>
      {showDemoMessage && <p role="status">AVISO: Proyecto Demo</p>}
    </article>
  );
}

// 5) Predice: el `PortfolioConQuitar` del drill 6, tal como viene, con el índice
//    como key. El usuario pulsa "Ver detalle" en Projex y, antes de los 3 segundos,
//    "Quitar el primero". ¿En qué tarjeta se ve el aviso?
export type DondeAviso = "Smart Cooler" | "Store Pulse" | "en ninguna";
export const respuesta5: DondeAviso = "en ninguna";
// ¿Por qué?
//

// 6) `PortfolioConQuitar` — al quitar un proyecto, su aviso salta a la tarjeta que
//    ocupa su lugar, que el usuario ni ha tocado. Haz que cada aviso se quede con su
//    proyecto y se vaya con él.
type Proyecto = { id: number; titulo: string };

const PROYECTOS: Proyecto[] = [
  { id: 1, titulo: "Projex" },
  { id: 2, titulo: "Smart Cooler" },
  { id: 3, titulo: "Store Pulse" },
];

export function PortfolioConQuitar() {
  const [proyectos, setProyectos] = useState(PROYECTOS);

  return (
    <section>
      <button type="button" onClick={() => setProyectos(proyectos.slice(1))}>
        Quitar el primero
      </button>
      {proyectos.map((proyecto, i) => (
        <PortfolioItem key={i} titulo={proyecto.titulo} />
      ))}
    </section>
  );
}
// <PortfolioConQuitar />

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA 3 — el ciclo completo
 * ─────────────────────────────────────────────────────────────────────────────
 * DEFINICIÓN
 *   Cuando React decide que es OTRO componente (cambió el tipo, el sitio o la key),
 *   el viejo hace su desmontaje y el nuevo su montaje, efectos incluidos. El orden
 *   es fijo: primero pinta el nuevo, después corren las limpiezas del viejo y al
 *   final los efectos del nuevo.
 *
 * SINTAXIS — cambiar la key frente a cambiar la lista del efecto:
 *     <Sala key={nombre} nombre={nombre} />   →  una Sala NUEVA: estado desde cero
 *     useEffect(…, [nombre])                  →  la MISMA Sala: su estado se queda
 *   En los dos casos, la limpieza vieja corre antes que el efecto nuevo.
 *
 * 🧠 ANALOGÍA — una mudanza bien hecha: el inquilino nuevo ya está en la puerta con
 *    sus cajas (pinta), el viejo entrega las llaves (limpieza) y solo entonces entra
 *    el nuevo (efecto). Nadie entra con el viejo todavía dentro.
 *
 * 🗣️ LAS PIEZAS
 *     el viejo se va → desmontaje (unmount)  ·  el nuevo llega → montaje (mount)
 *
 * ⚠️ TRAMPA — creer que el viejo se pinta una última vez antes de irse. React ya no
 *    lo llama: de él solo corren las limpiezas.
 * ───────────────────────────────────────────────────────────────────────────── */

// 7) Predice: la `Sala` del drill 4 del 02, con key y registrando cuándo pinta. Se
//    monta con "norte" y el usuario pulsa "Ir al sur". Escribe los registros en
//    orden, contados como en producción.
//        function Sala({ nombre, registrar }: { nombre: string; registrar: (texto: string) => void }) {
//          registrar(`pinta ${nombre}`);
//          useEffect(() => {
//            registrar(`conecta ${nombre}`);
//            return () => registrar(`desconecta ${nombre}`);
//          }, [nombre]);
//          return <p>Sala {nombre}</p>;
//        }
//        // en el padre:
//        <Sala key={nombre} nombre={nombre} registrar={registrar} />
export const respuesta7: string[] = [];

// 8) Predice: la misma `Sala`, ahora SIN key y con un contador. El usuario pulsa
//    "Enviar" dos veces en la sala norte y después "Ir al sur". ¿Qué número
//    muestra el contador en la sala sur?
//        function Sala({ nombre, registrar }: { nombre: string; registrar: (texto: string) => void }) {
//          const [mensajes, setMensajes] = useState(0);
//          useEffect(() => {
//            registrar(`conecta ${nombre}`);
//            return () => registrar(`desconecta ${nombre}`);
//          }, [nombre]);
//          return <button onClick={() => setMensajes(mensajes + 1)}>Enviar ({mensajes})</button>;
//        }
//        // en el padre, ahora sin key:
//        <Sala nombre={nombre} registrar={registrar} />
export const respuesta8: number = 0;
// ¿Por qué? Al cambiar de sala el efecto se repite: ¿no es eso volver a montar?
//

// 9) `ProyectoDestacado` — enseña un proyecto cada vez. Si el usuario pulsa "Ver
//    detalle" y pasa al siguiente antes de los 3 segundos, el aviso aparece en el
//    proyecto nuevo, que nadie ha pedido ver. Cada proyecto tiene que llegar con su
//    tarjeta limpia, y el temporizador del anterior no puede quedarse pendiente.
export function ProyectoDestacado() {
  const [indice, setIndice] = useState(0);
  const proyecto = PROYECTOS[indice];
  if (!proyecto) return null;

  return (
    <section>
      <button type="button" onClick={() => setIndice((indice + 1) % PROYECTOS.length)}>
        Siguiente proyecto
      </button>
      <PortfolioItem titulo={proyecto.titulo} />
    </section>
  );
}
// <ProyectoDestacado />
