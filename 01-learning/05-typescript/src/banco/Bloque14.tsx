import { useState, type ReactNode } from "react";
import {
  TemaContext,
  Fondo,
  AppConUsuario,
  AppDeAdmin,
  AppConTema,
  Pagina,
} from "../exercises/14-context-refs/exercise-01";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 14 — `14-context-refs`. Cada archivo nuevo de la carpeta se AÑADE aquí, en el
 * orden de su número. */

/* Para los drills 1 y 4 del 01: Fondo pinta su color sin tocar el del texto, así que
 * el marco le da un gris que se lee sobre el blanco y sobre el oscuro. */
function MarcoDeFondo({ children }: { children: ReactNode }) {
  return (
    <div className="w-72 text-[#86868b] [&_[data-tema]]:rounded-xl [&_[data-tema]]:px-4 [&_[data-tema]]:py-3">
      {children}
    </div>
  );
}

/* Para el drill 5 del 01: dos botones eligen el idioma que recibe Pagina. */
function PaginaConIdioma() {
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  return (
    <div>
      <div>
        <button type="button" onClick={() => setIdioma("es")}>
          Español
        </button>
        <button type="button" onClick={() => setIdioma("en")}>
          Inglés
        </button>
      </div>
      <p className="mt-3 font-mono text-[13px] text-[#86868b]">Idioma de Pagina: {idioma}</p>
      <div className="mt-2 text-[#2997ff]">
        <Pagina idioma={idioma} />
      </div>
    </div>
  );
}

export function Bloque14() {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-[56px] leading-[1.05] font-semibold tracking-[-0.03em] text-[#f5f5f7]">
          Lo que llega
          <br />
          sin pasar de mano en mano.
        </h1>
        <p className="mt-6 max-w-xl text-[21px] leading-[1.4] text-[#86868b]">
          El bloque 14: el contexto y los refs. Cada archivo sale de una pieza de tu Store Pulse, tu Sport
          Mindset o tu Smart-Cooler.
        </p>
      </header>

      <Seccion archivo="exercise-01" titulo="El contexto: crear, proveer y leer." />

      <Tarjeta
        n={1}
        nombre="TemaContext"
        mirar="Arriba, Fondo sin Provider: «Tema claro», en blanco. Abajo, dentro de un Provider oscuro: «Tema oscuro». Con el starter ya se ve así: su fallo solo lo ve pnpm typecheck."
        campos='Fondo sin Provider · Fondo dentro de <TemaContext value="oscuro">'
      >
        <MarcoDeFondo>
          <Fondo />
        </MarcoDeFondo>
        <MarcoDeFondo>
          <TemaContext value="oscuro">
            <Fondo />
          </TemaContext>
        </MarcoDeFondo>
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="AppConUsuario"
        mirar="«Hola, Nico» y «Cuenta de Nico». Con el starter, la cabecera dice «Hola, Invitado»."
        campos='AppConUsuario con nombre="Nico" · el saludo de la cabecera y el menú de la cuenta'
      >
        <AppConUsuario nombre="Nico" />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="AppDeAdmin"
        mirar="«Nico · admin». Con el starter, «Nico ·», sin rol."
        campos="la insignia de AppDeAdmin"
      >
        <AppDeAdmin />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="AppConTema"
        mirar="Pulsa el botón: el fondo pasa a oscuro y el botón ofrece volver a claro. Con el starter, el botón cambia de texto y el fondo se queda claro."
        campos="el botón del tema · Fondo"
      >
        <MarcoDeFondo>
          <AppConTema />
        </MarcoDeFondo>
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="Pagina"
        mirar="Pulsa Inglés: el enlace dice «Home». Español: «Inicio». Con el starter, «Inicio» siempre."
        campos="botones Español e Inglés · el idioma que recibe Pagina · el enlace del menú"
      >
        <PaginaConIdioma />
      </Tarjeta>
    </>
  );
}
