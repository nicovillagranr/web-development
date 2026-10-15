import { useEffect, useState } from "react";
import { EnfocarCerrar, BloqueoScroll, TituloMapa } from "../exercises/12-custom-hooks/exercise-01";
import {
  ModalSinScroll,
  CerrarConEscape,
  AvisarClics,
  PreferenciaMovimiento,
} from "../exercises/12-custom-hooks/exercise-02";
import {
  EnfocarConRef,
  CampoCiudad,
  PanelEnfocable,
  MapaConRetorno,
} from "../exercises/12-custom-hooks/exercise-03";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 12 — `12-custom-hooks`, camino a cerrar Projex. Cada archivo nuevo de la
 * carpeta se AÑADE aquí debajo.
 *
 * De cada archivo, solo los drills que pintan algo: las predicciones no se montan.
 * Lo que pasa al abrir o al cerrar el mapa va dentro de una demo con su botón, como
 * en Projex, porque montar y desmontar es justo lo que se entrena. */

/* El anillo naranja sigue al foco (`:focus`, no `:focus-visible`, para que se vea
 * también cuando abres con el ratón). Lo usan todas las demos donde el foco salta. */
const ANILLO =
  "flex flex-col items-start gap-4 [&_button:focus]:outline-2 [&_button:focus]:outline-offset-4 [&_button:focus]:outline-[#ff9f0a] [&_[role=region]]:rounded-xl [&_[role=region]]:bg-white/4 [&_[role=region]]:px-4 [&_[role=region]]:py-3 [&_[role=region]:focus]:outline-2 [&_[role=region]:focus]:outline-offset-4 [&_[role=region]:focus]:outline-[#ff9f0a]";

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
          El <span className="font-mono">exercise-01</span> está cerrado (6/6). El{" "}
          <span className="font-mono">02</span> y el <span className="font-mono">03</span>, montados
          y sin resolver.
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

      <Seccion
        archivo="exercise-03"
        titulo="Un ref es tu agarradera a un elemento, y vale null mientras no está."
      />

      <Tarjeta
        n={1}
        nombre="EnfocarConRef"
        mirar="Pulsa Abrir mapa: el anillo naranja tiene que saltar a la ✕. Con el starter se queda en Abrir mapa."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
      >
        <DemoEnfocarRef />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="CampoCiudad"
        mirar="Pulsa Abrir buscador: el campo aparece con Santiago seleccionado entero, listo para escribir encima. Con el starter aparece sin seleccionar."
        campos="botón Abrir/Cerrar buscador · al abrir: un <input> Ciudad"
      >
        <DemoCampo />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="PanelEnfocable"
        mirar="Con el mapa cerrado, pulsa Ir al mapa: no tiene que pasar nada (con el starter, la consola muestra un TypeError). Ábrelo y pulsa Ir al mapa: el anillo salta al panel."
        campos="botones Abrir/Cerrar mapa e Ir al mapa · al abrir: un panel con un <p>"
      >
        <div className={ANILLO}>
          <PanelEnfocable />
        </div>
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="MapaConRetorno"
        mirar="Pulsa Abrir mapa: el anillo salta a la ✕. Pulsa la ✕: el mapa se cierra y el anillo vuelve a Abrir mapa. Con el starter el foco se queda donde hiciste clic."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
      >
        <div className={ANILLO}>
          <MapaConRetorno />
        </div>
      </Tarjeta>
    </>
  );
}
