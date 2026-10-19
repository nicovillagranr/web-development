import { useEffect, useState } from "react";
import { ContactoConMapa, TarjetaProyecto } from "../exercises/12-custom-hooks/exercise-00";
import { EnfocarCerrar, BloqueoScroll, TituloMapa } from "../exercises/12-custom-hooks/exercise-01";
import {
  ModalSinScroll,
  CerrarConEscape,
  AvisarClics,
  PreferenciaMovimiento,
  AvisoDemo,
  AvisoConLikes,
  AvisoConLimpieza,
  AvisoProyectoDemo,
} from "../exercises/12-custom-hooks/exercise-02";
import {
  EnfocarConRef,
  CampoCiudad,
  PanelEnfocable,
  MapaSoloIda,
  LimpiarBusqueda,
  MapaConRetorno,
} from "../exercises/12-custom-hooks/exercise-03";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 12 — `12-custom-hooks`, camino a cerrar Projex. Cada archivo nuevo de la
 * carpeta se AÑADE aquí, en el orden de su número (el 00 va antes que el 01).
 *
 * De cada archivo, solo los drills que pintan algo: las predicciones no se montan.
 * Lo que pasa al abrir o al cerrar el mapa va dentro de una demo con su botón, como
 * en Projex, porque montar y desmontar es justo lo que se entrena. */

/* El anillo naranja sigue al foco (`:focus`, no `:focus-visible`, para que se vea
 * también cuando abres con el ratón). Lo usan todas las demos donde el foco salta. */
const ANILLO =
  "flex flex-col items-start gap-4 [&_button:focus]:outline-2 [&_button:focus]:outline-offset-4 [&_button:focus]:outline-[#ff9f0a] [&_[role=region]]:rounded-xl [&_[role=region]]:bg-white/4 [&_[role=region]]:px-4 [&_[role=region]]:py-3 [&_[role=region]:focus]:outline-2 [&_[role=region]:focus]:outline-offset-4 [&_[role=region]:focus]:outline-[#ff9f0a]";

/* 00 · drill 8: el padre le cambia el título a la MISMA tarjeta, sin desmontarla,
 * como el `rerender` del test. */
const PROYECTOS = ["Projex", "Smart Cooler", "Store Pulse"];

function DemoDestacado() {
  const [indice, setIndice] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setIndice((indice + 1) % PROYECTOS.length)}>
        Siguiente proyecto
      </button>
      <TarjetaProyecto titulo={PROYECTOS[indice] ?? "Projex"} />
    </>
  );
}

/* 01 · drill 1: el diálogo solo existe mientras está abierto, como el MapModal de
 * Projex. El anillo tiene que saltar de "Abrir mapa" a la ✕. */
function DemoEnfocar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Quitar mapa" : "Abrir mapa"}
      </button>
      {abierto && <EnfocarCerrar />}
    </div>
  );
}

/* 01 · drill 4: el padre abre y cierra; `BloqueoScroll` solo recibe `abierto`. */
function DemoBloqueo() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>
      <BloqueoScroll abierto={abierto} />
    </>
  );
}

/* 02 · drill 1: abrir es montar el modal, y cerrar, desmontarlo. */
function DemoModalSinScroll() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar mapa" : "Abrir mapa"}
      </button>
      {abierto && <ModalSinScroll />}
    </>
  );
}

/* 02 · drill 2: cuenta las llamadas a `onClose`. El contador sube con la forma de
 * función del setter, para que dos llamadas seguidas cuenten dos y no una. */
function DemoEscape() {
  const [abierto, setAbierto] = useState(false);
  const [llamadas, setLlamadas] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setAbierto(true)}>
        Abrir mapa
      </button>
      {abierto && (
        <CerrarConEscape
          onClose={() => {
            setAbierto(false);
            setLlamadas((n) => n + 1);
          }}
        />
      )}
      <p>
        onClose se ha llamado {llamadas} {llamadas === 1 ? "vez" : "veces"}
      </p>
    </>
  );
}

/* 02 · drill 9: cuenta los clics de TODA la página mientras `AvisarClics` está
 * montado. El botón también es parte de la página, así que su propio clic cuenta. */
function DemoClics() {
  const [contando, setContando] = useState(false);
  const [clics, setClics] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setContando(!contando)}>
        {contando ? "Dejar de contar" : "Empezar a contar"}
      </button>
      {contando && <AvisarClics alHacerClic={() => setClics((n) => n + 1)} />}
      <p>Clics contados: {clics}</p>
    </>
  );
}

/* 02 · drills 13 y 15: el aviso se va solo, así que la demo lo vuelve a montar para
 * que puedas repetirlo. Cambiar la `key` es desmontarlo y montarlo de nuevo. */
function DemoAvisoDemo() {
  const [vez, setVez] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Volver a montar
      </button>
      <AvisoDemo key={vez} />
    </>
  );
}

function DemoLikes() {
  const [vez, setVez] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Volver a montar
      </button>
      <AvisoConLikes key={vez} />
    </>
  );
}

/* 02 · drill 18: "Ir a otra sección" desmonta el aviso antes de los 3 segundos. */
function DemoIrseAntes() {
  const [enLaSeccion, setEnLaSeccion] = useState(true);

  return (
    <>
      <button type="button" onClick={() => setEnLaSeccion(!enLaSeccion)}>
        {enLaSeccion ? "Ir a otra sección" : "Volver"}
      </button>
      {enLaSeccion && <AvisoConLimpieza />}
    </>
  );
}

/* 02 · drill 21: el botón del padre lo repinta, como el `rerender` del test. */
function DemoProyectoDemo() {
  const [repintados, setRepintados] = useState(0);

  return (
    <>
      <button type="button" onClick={() => setRepintados(repintados + 1)}>
        Repintar el padre ({repintados})
      </button>
      <AvisoProyectoDemo />
    </>
  );
}

/* 03 · drill 1: lo mismo que la demo del 01, con la versión del ref. */
function DemoEnfocarRef() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Quitar mapa" : "Abrir mapa"}
      </button>
      {abierto && <EnfocarConRef />}
    </div>
  );
}

/* 03 · drill 2: el campo se monta al abrir el buscador, que es cuando tiene que
 * aparecer con el texto seleccionado. */
function DemoCampo() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Cerrar buscador" : "Abrir buscador"}
      </button>
      {abierto && <CampoCiudad />}
    </>
  );
}

/* 🧪 PRUEBA TEMPORAL (12 oct) — tu `useEffect` tal cual, con un `zoom` propio para que
 * exista. No es ningún drill: se borra cuando termines de mirarlo. */
function PruebaZoom() {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    document.title = `Zoom ${zoom}`;
  }, [zoom]);

  return (
    <div>
      <p>Zoom {zoom}</p>
      <button type="button" onClick={() => setZoom(zoom + 1)}>
        Acercar
      </button>
    </div>
  );
}

export function Bloque12() {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-[56px] leading-[1.05] font-semibold tracking-[-0.03em] text-[#f5f5f7]">
          Lo que pasa
          <br />
          después de pintar.
        </h1>
        <p className="mt-6 max-w-xl text-[21px] leading-[1.4] text-[#86868b]">
          El bloque 12, camino a cerrar Projex: los efectos, su limpieza, los refs y tu propio
          custom hook. Cada archivo sale de una pieza de tu{" "}
          <span className="font-mono">MapModal</span>.
        </p>
        <p className="mt-6 max-w-xl text-[15px] leading-normal text-[#6e6e73]">
          El <span className="font-mono">exercise-00</span>, el ciclo de vida, va debajo de todo
          lo demás. El <span className="font-mono">01</span> está cerrado (6/6); el{" "}
          <span className="font-mono">02</span> y el <span className="font-mono">03</span>, en pausa
          hasta cerrar el <span className="font-mono">00</span>.
        </p>
      </header>

      <Tarjeta
        n="🧪"
        nombre="PruebaZoom (temporal)"
        mirar="Tu useEffect con [zoom]. Mira el título de esta pestaña del navegador: al cargar dice Zoom 1, y sube con cada Acercar."
        campos="un <p> con el zoom · botón Acercar"
        estado="demo"
      >
        <PruebaZoom />
      </Tarjeta>

      <Seccion
        archivo="exercise-00"
        titulo="Montar, actualizar, desmontar: las tres etapas de un componente."
      />

      <Tarjeta
        n={6}
        nombre="ContactoConMapa"
        mirar="Abre el mapa, pulsa Zoom un par de veces, ciérralo y vuelve a abrirlo: el zoom tiene que seguir donde lo dejaste. Con el starter vuelve a Zoom 1, porque el mapa que aparece es uno nuevo."
        campos="botón Abrir/Cerrar mapa · al abrir: un diálogo con el botón Zoom n"
        estado="resuelto"
      >
        <ContactoConMapa />
      </Tarjeta>

      <Tarjeta
        n={8}
        nombre="TarjetaProyecto"
        mirar="Pulsa Siguiente proyecto: el título tiene que cambiar cada vez. Con el starter se queda en Proyecto: Projex, porque la tarjeta no se desmonta y su estado guarda el primero."
        campos="botón Siguiente proyecto (de la demo) · un <h3> Proyecto: …"
        estado="resuelto"
      >
        <DemoDestacado />
      </Tarjeta>

      <Seccion
        archivo="exercise-01"
        titulo="Un efecto corre después de pintar, y el array decide cuándo se repite."
      />

      <Tarjeta
        n={1}
        nombre="EnfocarCerrar"
        mirar="Pulsa Abrir mapa: el anillo naranja tiene que saltar a la ✕, que es donde cae el foco. Con el starter se queda en Abrir mapa, porque la ✕ no recibe el foco."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
        estado="resuelto"
      >
        <DemoEnfocar />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="BloqueoScroll"
        mirar="Pulsa Abrir mapa e intenta hacer scroll: la página no se tiene que mover. Pulsa Cerrar mapa y el scroll vuelve."
        campos="botón Abrir/Cerrar mapa · un <p> con el estado"
        estado="resuelto"
      >
        <DemoBloqueo />
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="TituloMapa"
        mirar="Mira el título de esta pestaña del navegador: dice Mapa · zoom 1, sube cada vez que pulsas Acercar, y Favorito le añade una ★."
        campos="un <p> con el zoom · botones Acercar y Favorito"
        estado="resuelto"
      >
        <TituloMapa />
      </Tarjeta>

      <Seccion
        archivo="exercise-02"
        titulo="Lo que un efecto deja puesto fuera de React, su limpieza lo quita."
      />

      <Tarjeta
        n={1}
        nombre="ModalSinScroll"
        mirar="Pulsa Abrir mapa: la página deja de moverse. Pulsa Cerrar mapa: el scroll tiene que volver. Con el starter se queda bloqueado aunque el mapa ya no esté."
        campos="botón Abrir/Cerrar mapa · al abrir: un diálogo con un <p>"
        estado="resuelto"
      >
        <DemoModalSinScroll />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="CerrarConEscape"
        mirar="Pulsa Abrir mapa y luego Escape: el mapa se cierra y el contador sube 1. Con el mapa cerrado, Escape ya no tiene que hacer nada. Con el starter seguía subiendo con el mapa cerrado."
        campos="botón Abrir mapa · al abrir: un diálogo con un <p> · un <p> con el contador"
        estado="resuelto"
      >
        <DemoEscape />
      </Tarjeta>

      <Tarjeta
        n={9}
        nombre="AvisarClics"
        mirar="Pulsa Empezar a contar y haz clic en cualquier parte de la página: el contador sube de 1 en 1. Pulsa Dejar de contar: los clics ya no suman. Con el starter cada clic suma más que el anterior y sigue sumando después de parar."
        campos="botón Empezar/Dejar de contar · al empezar: un <p> · un <p> con el contador"
        estado="resuelto"
      >
        <DemoClics />
      </Tarjeta>

      <Tarjeta
        n={11}
        nombre="PreferenciaMovimiento"
        mirar="Cámbiala sin recargar: DevTools → ⋮ → More tools → Rendering → Emulate CSS media feature prefers-reduced-motion. El texto cambia ya con el starter. Lo que falla no se ve aquí: al desmontarse se queda escuchando, y eso lo mira el test."
        campos="un <p> con la preferencia"
        estado="resuelto"
      >
        <PreferenciaMovimiento />
      </Tarjeta>

      <Tarjeta
        n={13}
        nombre="AvisoDemo"
        mirar="El aviso aparece y se va a los 3 segundos; Volver a montar lo repite. Con el starter en pantalla se ve igual: lo que falla es que deja otro temporizador programado, y eso lo cuenta el test."
        campos="botón Volver a montar (de la demo) · un <p role=status> con el aviso"
        estado="resuelto"
      >
        <DemoAvisoDemo />
      </Tarjeta>

      <Tarjeta
        n={15}
        nombre="AvisoConLikes"
        mirar="Pulsa Me gusta varias veces antes de que pasen 3 segundos. Con el starter, el aviso no se va mientras sigas pulsando; resuelto, se va a los 3 segundos del montaje."
        campos="botón Volver a montar (de la demo) · un <p role=status> con el aviso · botón Me gusta n like(s)"
        estado="resuelto"
      >
        <DemoLikes />
      </Tarjeta>

      <Tarjeta
        n={18}
        nombre="AvisoConLimpieza"
        mirar="Pulsa Ir a otra sección antes de 3 segundos. Lo que falla no se ve aquí: con el starter el temporizador sigue pendiente aunque el aviso ya no esté, y eso lo cuenta el test."
        campos="botón Ir a otra sección/Volver (de la demo) · un <p role=status> con el aviso · un <p> Aviso cerrado"
        estado="resuelto"
      >
        <DemoIrseAntes />
      </Tarjeta>

      <Tarjeta
        n={21}
        nombre="AvisoProyectoDemo"
        mirar="Pulsa Ver detalle: el aviso tiene que irse a los 3 segundos aunque pulses Repintar el padre entre medias. Con el starter no se va nunca."
        campos="botón Repintar el padre (de la demo) · botón Ver detalle · al pulsar: un <p role=status> con el aviso"
        estado="resuelto"
      >
        <DemoProyectoDemo />
      </Tarjeta>

      <Seccion
        archivo="exercise-03"
        titulo="Un ref es tu agarradera a un elemento, y vale null mientras no está."
      />

      <Tarjeta
        n={1}
        nombre="EnfocarConRef"
        mirar="Pulsa Abrir mapa: el anillo naranja tiene que saltar a la ✕. Con el starter se queda en Abrir mapa."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
        estado="resuelto"
      >
        <DemoEnfocarRef />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="CampoCiudad"
        mirar="Pulsa Abrir buscador: el campo aparece con Santiago seleccionado entero, listo para escribir encima. Con el starter aparece sin seleccionar."
        campos="botón Abrir/Cerrar buscador · al abrir: un <input> Ciudad"
        estado="resuelto"
      >
        <DemoCampo />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="PanelEnfocable"
        mirar="Con el mapa cerrado, pulsa Ir al mapa: no tiene que pasar nada (con el starter, la consola muestra un TypeError). Ábrelo y pulsa Ir al mapa: el anillo salta al panel."
        campos="botones Abrir/Cerrar mapa e Ir al mapa · al abrir: un panel con un <p>"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <PanelEnfocable />
        </div>
      </Tarjeta>

      <Tarjeta
        n={7}
        nombre="MapaSoloIda"
        mirar="Pulsa Abrir mapa: el anillo tiene que saltar a la ✕; con el starter se queda en Abrir mapa. Después pulsa la ✕: el anillo desaparece porque el foco vuelve al <body>, que es tu predicción del 8."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
      >
        <div className={ANILLO}>
          <MapaSoloIda />
        </div>
      </Tarjeta>

      <Tarjeta
        n={12}
        nombre="LimpiarBusqueda"
        mirar="Escribe una ciudad y pulsa Limpiar: el campo se vacía y el cursor queda dentro. Con el starter, además, el buscador roba el foco al montarse: entra en la pestaña 12 con las flechas del teclado y mira dónde acaba el foco."
        campos="un <input> Ciudad · botón Limpiar"
      >
        <LimpiarBusqueda />
      </Tarjeta>

      <Tarjeta
        n={13}
        nombre="MapaConRetorno"
        mirar="Pulsa Abrir mapa: el anillo salta a la ✕. Pulsa la ✕: el mapa se cierra y el anillo vuelve a Abrir mapa. Y al entrar en la pestaña 12, el foco no tiene que saltar solo a este Abrir mapa."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
      >
        <div className={ANILLO}>
          <MapaConRetorno />
        </div>
      </Tarjeta>
    </>
  );
}
