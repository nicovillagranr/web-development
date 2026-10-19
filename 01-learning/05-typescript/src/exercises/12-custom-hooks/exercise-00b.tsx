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
//          return(
//            <label>
//              {etiqueta}
//              <input value={texto} onChange={(e) => setTexto(e.target.value)} />
//            </label>
//          );
//        }

//        function Contacto() {
//          const [empresa, setEmpresa] = useState(false);
//          return (
//            <section>
//              <button onClick={() => setEmpresa(true)}>Soy empresa</button>

//               Aquí está la parte importante
//              {empresa
//                  ? <Campo etiqueta="Empresa" />
//                  : <Campo etiqueta="Nombre" />}
//            Por más que cambie `empresa` de false a true, en ambos casos estás renderizando el mismo tipo de componente: <Campo />
//            </section>
//          );
//        }

// ¿Qué pasa?
// Nicolás en el input persiste, porque React considera que es el mismo componente <Campo /> y mantiene su estado interno.
// Porque React no destruye y vuelve a crear todos los componentes en cada render. React intenta reutilizar los componentes que ya existen.
// Aunque cambie empresa de false a true, en ambos casos estás renderizando el mismo tipo de componente: <Campo />

export type Queda = "se conserva" | "se borra";
export const respuesta1: Queda = "se conserva";

// 2) Predice: el mismo `Contacto`, con el ternario partido en dos `&&`. Mismos
//    pasos: ¿qué pasa con "Nicolás"?
//           {empresa && <Campo etiqueta="Empresa" />} Si el estado de empresa se monta con true, se renderiza el componente <Campo /> con la "Empresa"
//           {!empresa && <Campo etiqueta="Nombre" />} Si el estado de empresa se monta con false, se renderiza el componente <Campo /> con la "Nombre"
export const respuesta2: Queda = "se borra";
// ¿Por qué, si es el mismo `Campo` que en el 1?
// Porque React considera que son dos componentes distintos, aunque sean del mismo tipo. Al cambiar el estado de empresa, React desmonta el componente <Campo /> con la "Nombre" y monta un nuevo componente <Campo /> con la "Empresa", perdiendo así el estado interno del primer componente y borrando el texto "Nicolás".

// 3) Predice: `Campo` ahora está definido DENTRO de `Formulario`, y el texto vive
//    en el padre. El usuario hace clic en el campo y teclea "Hola". ¿Qué queda escrito?
//        function Formulario() {
//          const [texto, setTexto] = useState("");
//          function Campo() {
//            return <input value={texto} onChange={(e) => setTexto(e.target.value)} />;
//          }
//          return <Campo />;
//        }
export const respuesta3: string = "H";
// Respuesta: "H".
// ¿Por qué?
// Porque el componente Campo se define dentro de Formulario, lo que significa que cada vez que Formulario se renderiza, se crea una nueva instancia de Campo. Cuando el usuario hace clic en el campo y teclea "Hola", el estado texto se actualiza y provoca un re-render de Formulario, lo que a su vez crea una nueva instancia de Campo. Sin embargo, el valor del input sigue siendo "H" porque el estado texto se mantiene entre renders y no se pierde al crear una nueva instancia de Campo.

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
export const respuesta4: number = 0;
// ¿Por qué, si `MeGusta` sigue en el mismo sitio?
// Porque al cambiar la key, React desmonta el componente viejo y monta uno nuevo, reiniciando su estado interno.

// Tu `PortfolioItem`, recortado. Lo usan los drills 5, 6 y 9, y no se toca.
function PortfolioItem({ titulo }: { titulo: string }) {
  // Seteamos el mostrar el mensaje en false para que no se muestre al inicio
  const [showDemoMessage, setShowDemoMessage] = useState(false);
  // Al montarse el componente, osea el primer render ->
  // Si showDemoMessage sigue en false, no hacemos nada.
  // Si showDemoMessage cambia a true, seteamos un timeout de 3 segundos para que vuelva a false.
  // Luego de esos 3 segundos, showDemoMessage vuelve a false y ejecutamos la limpieza del timeout
  useEffect(() => {
    if (!showDemoMessage) {
      return; // Si showDemoMessage es false, no hacemos nada
    }
    // Si showDemoMessage pasa a true, seteamos un timeout de 3 segundos para que vuelva a false
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
      {/* Cuando showDemoMessage se setea en true, se renderiza el <p> con el aviso */}
      {showDemoMessage && <p role="status">AVISO: Proyecto Demo</p>}
    </article>
  );
}

// 5) Predice: el `PortfolioConQuitar` del drill 6, tal como viene, con el índice
//    como key. El usuario pulsa "Ver detalle" en Projex y, antes de los 3 segundos,
//    "Quitar el primero". ¿En qué tarjeta se ve el aviso?
export type DondeAviso = "Smart Cooler" | "Store Pulse" | "en ninguna";
export const respuesta5: DondeAviso = "Smart Cooler";
// ¿Por qué?
// La key que estamos utilizando es una key genérica basada en el índice del array, por lo que al quitar el primer elemento, el segundo elemento pasa a ocupar la posición del primero y hereda el estado del componente anterior, incluyendo el aviso que estaba mostrando. Por eso, el aviso se ve en la tarjeta de "Smart Cooler".
// Para arreglar esto, el PortfolioItem debería tener key={proyecto.id}, en vez de key={i}, para que cada tarjeta tenga su propia identidad y no herede el estado del componente anterior al quitar un proyecto.

// 6) `PortfolioConQuitar` — al quitar un proyecto, su aviso salta a la tarjeta que
//    ocupa su lugar, que el usuario ni ha tocado. Haz que cada aviso se quede con su
//    proyecto y se vaya con él.
type Proyecto = {
  id: number;
  titulo: string;
};

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
      {proyectos.map((proyecto) => (
        // Para que cada aviso se quede con su proyecto y se vaya con él, usamos `proyecto.id` como key en vez de `i`.
        <PortfolioItem key={proyecto.id} titulo={proyecto.titulo} />
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

// 7) Predice: la `Sala` del drill 4 del 02, con key y registrando cuándo pinta.
//      - Se monta con "norte" y el usuario pulsa "Ir al sur"
//     Escribe los registros en orden, tal como los verías en la consola.

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

export const respuesta7: string[] = [
  "pinta norte",
  "conecta norte",
  "pinta sur",
  "desconecta norte",
  "conecta sur",
  // Si más adelante se desmonta Sala con nombre "sur":
  // "desconecta sur",
];

// 8) Predice: la misma `Sala`, ahora SIN key y con un contador.
//  - El usuario pulsa "Enviar" dos veces en la sala norte y después "Ir al sur".
//  ¿Qué número muestra el contador en la sala sur?

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

export const respuesta8: number = 2;
// ¿Por qué, si el efecto se repite, no vuelve a montar la Sala?
// Porque cambiar nombre modifica una dependencia del useEffect,
// pero no cambia la identidad del componente.
// Como Sala conserva el mismo tipo, sitio y key (no tiene una key explícita),
// React mantiene su estado interno: mensajes sigue valiendo 2.
// El efecto ejecuta la limpieza de "norte" y después conecta "sur",
// pero eso no reinicia el contador.

// 9) `ProyectoDestacado` — enseña un proyecto cada vez. Si el usuario pulsa "Ver
//    detalle" y pasa al siguiente antes de los 3 segundos, el aviso aparece en el
//    proyecto nuevo, que nadie ha pedido ver. Cada proyecto tiene que llegar con su
//    tarjeta limpia, y el temporizador del anterior no puede quedarse pendiente.
export function ProyectoDestacado() {
  // Seteamos el índice del proyecto que se va a mostrar, empezando por 0
  const [indice, setIndice] = useState(0);
  // Obtenemos el proyecto actual según el índice
  const proyecto = PROYECTOS[indice];
  // Si no hay proyecto, no renderizamos nada
  if (!proyecto) {
    return null;
  }

  return (
    <section>
      <button type="button" onClick={() => setIndice((indice + 1) % PROYECTOS.length)}>
        Siguiente proyecto
      </button>
      <PortfolioItem key={proyecto.id} titulo={proyecto.titulo} />
    </section>
  );
}
// <ProyectoDestacado />
