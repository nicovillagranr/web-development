import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { ContactoConMapa, TarjetaProyecto } from "../exercises/12-custom-hooks/exercise-00";
import { PortfolioConQuitar, ProyectoDestacado } from "../exercises/12-custom-hooks/exercise-00b";
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
  MapaQueNaceAbierto,
} from "../exercises/12-custom-hooks/exercise-03";
import {
  EmpezarContacto,
  EscribirMensaje,
  CorregirCorreo,
  MeGusta,
  FormularioQueNaceEnfocado,
  NotaRapida,
  FiltrosConVuelta,
  MenuQueRobaAlNacer,
  MenuConBandera,
  ContactoQueNaceAbierto,
  ConfirmarEnvio,
  AvisoDescartable,
  BuscadorQueNaceAbierto,
} from "../exercises/12-custom-hooks/exercise-04";
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

/* 03 · drill 17: dos mapas lado a lado, uno con `abiertoAlInicio` en true y otro en
 * false, para ver el contraste. No existen hasta que pulsas "Montar los dos", y entonces
 * nacen a la vez: si nacieran al cargar la pestaña, el abierto le robaría el foco a la
 * página. Pulsarlo otra vez cambia la `key`: los desmonta y los monta de nuevo. */
function DemoNaceAbierto() {
  const [vez, setVez] = useState(0);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Montar los dos
      </button>
      {vez > 0 && (
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col items-start gap-3">
            <p>abiertoAlInicio = true</p>
            <MapaQueNaceAbierto key={vez} abiertoAlInicio />
          </div>
          <div className="flex flex-col items-start gap-3">
            <p>abiertoAlInicio = false</p>
            <MapaQueNaceAbierto key={vez} abiertoAlInicio={false} />
          </div>
        </div>
      )}
    </div>
  );
}

/* 04 · drill 4: el padre se repinta sin tocar el `MeGusta`. Ese render nuevo del hijo
 * vuelve a leer la caja, y por eso el número salta de golpe con el starter. */
function DemoMeGusta() {
  const [repintados, setRepintados] = useState(0);

  return (
    <>
      <MeGusta />
      <button type="button" onClick={() => setRepintados(repintados + 1)}>
        Repintar el padre ({repintados})
      </button>
    </>
  );
}

/* 04 · drills 5 y 12: no existen hasta que pulsas el botón, y pulsarlo otra vez cambia la
 * `key`: los desmonta y los monta de nuevo. Así el montaje se puede repetir, y el del 12
 * no te roba el foco al entrar en la pestaña. */
function DemoFormulario() {
  const [vez, setVez] = useState(0);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Montar el formulario
      </button>
      {vez > 0 && <FormularioQueNaceEnfocado key={vez} />}
    </div>
  );
}

function DemoAviso() {
  const [vez, setVez] = useState(0);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Montar el aviso
      </button>
      {vez > 0 && <AvisoDescartable key={vez} />}
    </div>
  );
}

/* 04 · escalera (8 y 11): lo mismo que `DemoFormulario`, para cualquier componente. El
 * `Fragment` con `key` hace de envoltorio: al cambiarle la `key`, React desmonta lo que
 * lleva dentro y lo monta de nuevo. */
function MontarAlPulsar({ texto, children }: { texto: string; children: ReactNode }) {
  const [vez, setVez] = useState(0);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setVez(vez + 1)}>
        {texto}
      </button>
      {vez > 0 && <Fragment key={vez}>{children}</Fragment>}
    </div>
  );
}

/* 04 · drills 9 y 10: el mismo componente, montado de dos maneras.
 *   · "en pnpm dev" lo monta aquí dentro, con el StrictMode de toda la página: al
 *     nacer, el efecto da dos pasadas.
 *   · "como en producción" lo monta en una raíz de React aparte, sin StrictMode: una
 *     sola pasada, como en el sitio publicado.
 * La raíz aparte se crea en el manejador del clic y no en un efecto, para que el
 * StrictMode de la página no la duplique. */
function DosMontajes({ children }: { children: ReactNode }) {
  const [vez, setVez] = useState(0);
  const cajaRef = useRef<HTMLDivElement>(null);
  const raizRef = useRef<Root | null>(null);

  function desmontarProduccion() {
    raizRef.current?.unmount();
    raizRef.current = null;
  }

  function montarEnDev() {
    desmontarProduccion();
    setVez(vez + 1);
  }

  function montarComoEnProduccion() {
    setVez(0);
    desmontarProduccion();
    if (!cajaRef.current) return;
    raizRef.current = createRoot(cajaRef.current);
    raizRef.current.render(children);
  }

  return (
    <div className={ANILLO}>
      <div>
        <button type="button" onClick={montarEnDev}>
          Montar en pnpm dev
        </button>
        <button type="button" onClick={montarComoEnProduccion}>
          Montar como en producción
        </button>
      </div>
      {vez > 0 && <Fragment key={vez}>{children}</Fragment>}
      <div ref={cajaRef} />
    </div>
  );
}

/* 04 · drill 13: lo mismo que la demo del 17, con el buscador. Aquí el starter sí se
 * ve roto en `pnpm dev`: el abierto nace sin el cursor en el campo, y el cerrado le
 * roba el foco a la página. */
function DemoBuscadorNaceAbierto() {
  const [vez, setVez] = useState(0);

  return (
    <div className={ANILLO}>
      <button type="button" onClick={() => setVez(vez + 1)}>
        Montar los dos
      </button>
      {vez > 0 && (
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col items-start gap-3">
            <p>abiertoAlInicio = true</p>
            <BuscadorQueNaceAbierto key={vez} abiertoAlInicio />
          </div>
          <div className="flex flex-col items-start gap-3">
            <p>abiertoAlInicio = false</p>
            <BuscadorQueNaceAbierto key={vez} abiertoAlInicio={false} />
          </div>
        </div>
      )}
    </div>
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
          El <span className="font-mono">00</span> y el <span className="font-mono">00b</span>, el
          ciclo de vida y la identidad, son la base de todo lo demás. Cerrados el{" "}
          <span className="font-mono">00</span> (9/9), el <span className="font-mono">01</span>{" "}
          (6/6) y el <span className="font-mono">02</span> (21/21); el{" "}
          <span className="font-mono">03</span>, en pausa hasta cerrar el{" "}
          <span className="font-mono">00b</span>.
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
        archivo="exercise-00b"
        titulo="Mismo tipo, mismo sitio y misma key: para React, es el mismo componente."
      />

      <Tarjeta
        n={6}
        nombre="PortfolioConQuitar"
        mirar="Pulsa Ver detalle en Projex y, antes de 3 segundos, Quitar el primero: el aviso tiene que irse con Projex. Con el starter salta a Smart Cooler, que nadie ha tocado, porque la key es el índice."
        campos="botón Quitar el primero · una tarjeta por proyecto con su <h3>, Ver detalle y el aviso"
        estado="resuelto"
      >
        <PortfolioConQuitar />
      </Tarjeta>

      <Tarjeta
        n={9}
        nombre="ProyectoDestacado"
        mirar="Pulsa Ver detalle y, antes de 3 segundos, Siguiente proyecto: el proyecto nuevo tiene que llegar sin aviso. Con el starter el aviso de Projex aparece en Smart Cooler, porque la tarjeta es la misma y solo cambia su título."
        campos="botón Siguiente proyecto · una tarjeta con su <h3>, Ver detalle y el aviso"
        estado="resuelto"
      >
        <ProyectoDestacado />
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
        mirar="Pulsa Abrir mapa: el anillo tiene que saltar a la ✕; con el starter se queda en Abrir mapa. Después pulsa la ✕ y mira dónde queda el anillo: es tu predicción del 8."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
        estado="resuelto"
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
        estado="resuelto"
      >
        <LimpiarBusqueda />
      </Tarjeta>

      <Tarjeta
        n={13}
        nombre="MapaConRetorno"
        mirar="Pulsa Abrir mapa: el anillo salta a la ✕. Pulsa la ✕: el mapa se cierra y el anillo vuelve a Abrir mapa. Y al entrar en la pestaña 12, el foco no tiene que saltar solo a este Abrir mapa."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <MapaConRetorno />
        </div>
      </Tarjeta>

      <Tarjeta
        n={17}
        nombre="MapaQueNaceAbierto"
        mirar="Pulsa Montar los dos: nacen a la vez, uno abierto (true) y otro cerrado (false). El anillo tiene que caer en la ✕ del abierto, y el cerrado no te lo quita. Pulsa esa ✕ y el foco vuelve a su Abrir mapa. Ojo: el banco corre en pnpm dev, con StrictMode, y ahí el starter también lo consigue, de casualidad. El fallo de producción solo lo ve el test."
        campos="botón Montar los dos (de la demo) · cada mapa: botón Abrir mapa · un diálogo con la ✕ y un <p>"
        estado="resuelto"
      >
        <DemoNaceAbierto />
      </Tarjeta>

      <Seccion
        archivo="exercise-04"
        titulo="Un ref es una caja: lo que importa es qué hay dentro, y cuándo."
      />

      <Tarjeta
        n={1}
        nombre="EmpezarContacto"
        mirar="Pulsa Empezar: el cursor tiene que saltar al campo Nombre. Con el starter no pasa nada, y la consola (F12) muestra un TypeError."
        campos="botón Empezar · un <input> Nombre"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <EmpezarContacto />
        </div>
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="EscribirMensaje"
        mirar="Pulsa Escribir mensaje: el cursor salta al campo Mensaje. Aquí funciona ya con el starter: el fallo no se ve en el navegador, solo en pnpm typecheck."
        campos="botón Escribir mensaje · un <textarea> Mensaje"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <EscribirMensaje />
        </div>
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="CorregirCorreo"
        mirar="Pulsa Corregir el correo: el cursor tiene que caer en el campo Correo, el de abajo. Con el starter cae en Nombre."
        campos="un <p> · los <input> Nombre y Correo · botón Corregir el correo"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <CorregirCorreo />
        </div>
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="MeGusta"
        mirar="Pulsa Me gusta varias veces: el número tiene que subir con cada clic. Con el starter se queda quieto, y cuando pulsas Repintar el padre salta de golpe a todos los clics que llevabas. Ya resuelto, Repintar el padre solo sube su propio contador: el número ya estaba al día y no tiene nada que añadir."
        campos="botón n me gusta · botón Repintar el padre (de la demo)"
        estado="resuelto"
      >
        <DemoMeGusta />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="FormularioQueNaceEnfocado"
        mirar="Pulsa Montar el formulario: tiene que nacer con el cursor en Nombre. Luego haz clic en Correo y escribe: el cursor se queda en Correo. Con el starter nace sin cursor, y al escribir la primera letra en Correo, el cursor salta a Nombre."
        campos="botón Montar el formulario (de la demo) · los <input> Nombre y Correo"
        estado="resuelto"
      >
        <DemoFormulario />
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="NotaRapida"
        mirar="Pulsa Añadir nota: el panel aparece y el cursor tiene que caer en el campo Nota. Con el starter el anillo se queda en Añadir nota."
        campos="botón Añadir nota · al abrir: un panel con el <textarea> Nota y el botón Guardar nota"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <NotaRapida />
        </div>
      </Tarjeta>

      <Tarjeta
        n={7}
        nombre="FiltrosConVuelta"
        mirar="Pulsa Filtrar proyectos y luego Aplicar: el panel se cierra y el anillo tiene que volver a Filtrar proyectos. Con el starter el anillo desaparece: el foco se pierde con el botón Aplicar."
        campos="botón Filtrar proyectos · al abrir: un panel con un <p> y el botón Aplicar"
        estado="resuelto"
      >
        <div className={ANILLO}>
          <FiltrosConVuelta />
        </div>
      </Tarjeta>

      <Tarjeta
        n={8}
        nombre="MenuQueRobaAlNacer"
        mirar="Pulsa Montar el menú: el anillo tiene que quedarse en Montar el menú. Abre el menú y ciérralo: el anillo vuelve a Abrir menú. Con el starter, al montarse, el anillo salta solo a Abrir menú. Con la traza descomentada, mira la consola (F12) al montarlo."
        campos="botón Montar el menú (de la demo) · botón Abrir menú · al abrir: un <nav> con un <p> y el botón Cerrar menú"
        estado="resuelto"
      >
        <MontarAlPulsar texto="Montar el menú">
          <MenuQueRobaAlNacer />
        </MontarAlPulsar>
      </Tarjeta>

      <Tarjeta
        n={9}
        nombre="MenuConBandera"
        mirar="Pulsa Montar como en producción: el anillo se queda en el botón. Pulsa Montar en pnpm dev: con el starter, el anillo salta solo a Abrir menú. Resuelto, ninguno de los dos te quita el foco, y al cerrar el menú el anillo vuelve a Abrir menú. Con la traza descomentada, compara en la consola (F12) las pasadas de cada montaje."
        campos="botones Montar en pnpm dev y Montar como en producción (de la demo) · el menú del 8"
        estado="resuelto"
      >
        <DosMontajes>
          <MenuConBandera />
        </DosMontajes>
      </Tarjeta>

      <Tarjeta
        n={10}
        nombre="ContactoQueNaceAbierto"
        mirar="Los dos montajes nacen abiertos. Pulsa Montar en pnpm dev: el cursor cae en Nombre. Pulsa Montar como en producción: con el starter, el cursor no llega. Resuelto, llega en los dos."
        campos="botones Montar en pnpm dev y Montar como en producción (de la demo) · botón Escribirnos · un <input> Nombre"
        estado="resuelto"
      >
        <DosMontajes>
          <ContactoQueNaceAbierto abiertoAlInicio />
        </DosMontajes>
      </Tarjeta>

      <Tarjeta
        n={11}
        nombre="ConfirmarEnvio"
        mirar="Pulsa Montar la confirmación: el anillo tiene que quedarse en el botón. Pulsa Enviar: el anillo cae en Confirmar. Pulsa Volver a editar: vuelve a Enviar. Con el starter, al montarse, el anillo salta solo a Enviar, y al pulsar Enviar no llega a Confirmar."
        campos="botón Montar la confirmación (de la demo) · botón Enviar · al pulsarlo: un <p>, el botón Confirmar y el botón Volver a editar"
        estado="resuelto"
      >
        <MontarAlPulsar texto="Montar la confirmación">
          <ConfirmarEnvio />
        </MontarAlPulsar>
      </Tarjeta>

      <Tarjeta
        n={12}
        nombre="AvisoDescartable"
        mirar="Pulsa Montar el aviso: el anillo tiene que quedarse en Montar el aviso. Pulsa Ver aviso y luego Descartar: el anillo vuelve a Ver aviso. Con el starter, al montarse, el anillo salta solo a Ver aviso."
        campos="botón Montar el aviso (de la demo) · botón Ver aviso · al abrir: un <p role=status> y el botón Descartar"
        estado="resuelto"
      >
        <DemoAviso />
      </Tarjeta>

      <Tarjeta
        n={13}
        nombre="BuscadorQueNaceAbierto"
        mirar="Pulsa Montar los dos: el abierto (true) tiene que nacer con el cursor en Ciudad, y el cerrado (false) no te quita el foco. Pulsa Cerrar buscador y el anillo vuelve a su Abrir buscador. Con el starter se ve roto aquí mismo: el abierto nace sin cursor y el anillo salta al Abrir buscador del cerrado."
        campos="botón Montar los dos (de la demo) · cada buscador: botón Abrir buscador · al abrir: un <input> Ciudad y un botón Cerrar buscador"
        estado="resuelto"
      >
        <DemoBuscadorNaceAbierto />
      </Tarjeta>
    </>
  );
}
