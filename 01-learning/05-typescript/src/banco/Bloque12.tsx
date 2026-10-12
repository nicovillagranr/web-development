import { useState } from "react";
import { EnfocarCerrar, BloqueoScroll, TituloMapa } from "../exercises/12-custom-hooks/exercise-01";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 12 — `12-custom-hooks`, camino a cerrar Projex. Cada archivo nuevo de la
 * carpeta se AÑADE aquí debajo.
 *
 * Del `exercise-01`, los drills 1, 4 y 6. El 2, el 3 y el 5 son predicciones: no
 * pintan nada. El 1 y el 4 van dentro de una demo con un botón que abre el mapa, como
 * en Projex, porque lo que entrenan pasa justo al abrirlo. */

/* Drill 1: el diálogo solo existe mientras está abierto, como el MapModal de Projex.
 * El anillo naranja sigue al foco (`:focus`, no `:focus-visible`, para que se vea
 * también cuando abres con el ratón): tiene que saltar de "Abrir mapa" a la ✕. */
function DemoEnfocar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4 [&_button:focus]:outline-2 [&_button:focus]:outline-offset-4 [&_button:focus]:outline-[#ff9f0a]">
      <button type="button" onClick={() => setAbierto(!abierto)}>
        {abierto ? "Quitar mapa" : "Abrir mapa"}
      </button>
      {abierto && <EnfocarCerrar />}
    </div>
  );
}

/* Drill 4: el padre abre y cierra; `BloqueoScroll` solo recibe `abierto`. */
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
        <p className="mt-6 max-w-xl text-[15px] leading-[1.5] text-[#6e6e73]">
          El <span className="font-mono">exercise-01</span> está sin resolver.
        </p>
      </header>

      <Seccion
        archivo="exercise-01"
        titulo="Un efecto corre después de pintar, y el array decide cuándo se repite."
      />

      <Tarjeta
        n={1}
        nombre="EnfocarCerrar"
        mirar="Pulsa Abrir mapa: el anillo naranja tiene que saltar a la ✕, que es donde cae el foco. Con el starter se queda en Abrir mapa, porque la ✕ no recibe el foco."
        campos="botón Abrir mapa · al abrir: un diálogo con la ✕ y un <p>"
      >
        <DemoEnfocar />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="BloqueoScroll"
        mirar="Pulsa Abrir mapa e intenta hacer scroll: la página no se tiene que mover. Pulsa Cerrar mapa y el scroll vuelve. Con el starter la página se sigue moviendo con el mapa abierto."
        campos="botón Abrir/Cerrar mapa · un <p> con el estado"
      >
        <DemoBloqueo />
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="TituloMapa"
        mirar="Mira el título de esta pestaña del navegador: tiene que decir Mapa · zoom 1 y subir cada vez que pulsas Acercar. Favorito cambia la tarjeta, no la pestaña. Con el starter la pestaña no cambia."
        campos="un <p> con el zoom · botones Acercar y Favorito"
      >
        <TituloMapa />
      </Tarjeta>
    </>
  );
}
