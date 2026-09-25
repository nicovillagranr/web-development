import "./assets/styles/App.css";
import type { ReactNode } from "react";
import {
  Contador,
  Interruptor,
  SelectorColor,
  AvisoErrores,
  ListaTareas,
} from "./exercises/11-useState-useReducer/exercise-01";
import {
  GuardarNombre,
  ContadorConAviso,
  ContadorDoble,
  RegistroDoble,
  ContadorConTope,
} from "./exercises/11-useState-useReducer/exercise-02";
import {
  ContadorConReducer,
  ContadorConPaso,
  PanelConHistorial,
} from "./exercises/11-useState-useReducer/exercise-03";

/* BANCO DE PRUEBAS — para ver vivos los componentes del bloque que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. al cambiar de BLOQUE, se cambian los imports y las tarjetas
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * LA UNIDAD ES LA CARPETA, NO EL ARCHIVO: aquí está el bloque
 * `11-useState-useReducer` entero, incluidos los archivos ya cerrados. Así se ve
 * cómo quedaron y se puede volver a cualquiera sin remontar nada.
 *
 * El `exercise-01b` no aparece porque sus seis drills son funciones puras, no
 * componentes: esos solo se ven en el test.
 *
 * Nada de esto toca el archivo de estudio: se hace desde fuera con los `[&_...]:` de
 * Tailwind, que aplican una utilidad a los descendientes que casen con el selector. */

type Estado = "starter" | "casi" | "resuelto";

const CHIP: Record<Estado, { texto: string; punto: string; color: string }> = {
  starter: { texto: "Sin resolver", punto: "bg-[#ff9f0a]", color: "text-[#ff9f0a]" },
  casi: { texto: "Verde, con tipos rotos", punto: "bg-[#ff453a]", color: "text-[#ff453a]" },
  resuelto: { texto: "Resuelto", punto: "bg-[#30d158]", color: "text-[#30d158]" },
};

/* Los errores de muestra para el drill 4 del exercise-01. Van en una constante y no
 * escritos dentro del JSX a propósito: con una firma `{}`, un objeto literal pegado ahí
 * daría TS2353 por exceso de propiedades, y ese error sería MÍO, no del drill. */
const erroresDeMuestra = {
  nombre: "El nombre es obligatorio",
  email: "El correo no es válido",
};

type TarjetaProps = {
  n: number;
  nombre: string;
  /* qué tiene que pasar cuando el drill está bien */
  mirar: string;
  /* qué se ve en la tarjeta, de arriba abajo */
  campos: string;
  estado?: Estado;
  children: ReactNode;
};

function Tarjeta({ n, nombre, mirar, campos, estado = "starter", children }: TarjetaProps) {
  const chip = CHIP[estado];

  return (
    <section className="mb-4 overflow-hidden rounded-[20px] bg-[#1d1d1f]">
      <div className="px-7 pt-7 pb-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-[13px] font-medium text-[#6e6e73] tabular-nums">
            {String(n).padStart(2, "0")}
          </span>
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[#f5f5f7]">
            {nombre}
          </h3>
          <span className={`ml-auto flex items-center gap-1.5 text-[12px] ${chip.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${chip.punto}`} />
            {chip.texto}
          </span>
        </div>

        <p className="max-w-xl text-[15px] leading-[1.5] text-[#86868b]">{mirar}</p>

        <p className="mt-3 font-mono text-[12px] text-[#6e6e73]">{campos}</p>
      </div>

      {/* El componente vivo. Las reglas que importan en este bloque:
       *   [&_p]      → los textos que pinta el drill: el número, el aviso, el estado
       *   [&_button] → todo se dispara pulsando; varios drills tienen más de uno
       *   [&_ul_li]  → las listas de ListaTareas, RegistroDoble y PanelConHistorial
       *   [&_input]  → solo lo usa GuardarNombre */}
      <div
        className="flex scheme-dark flex-col items-start gap-4 border-t border-white/[0.06]
          bg-black/40 px-7 py-7
          [&_p]:text-[17px] [&_p]:font-medium [&_p]:tracking-[-0.01em] [&_p]:text-[#f5f5f7]
          [&_input]:w-72 [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10
          [&_input]:bg-white/[0.04] [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-[15px]
          [&_input]:text-[#f5f5f7] [&_input]:outline-none
          [&_input::placeholder]:text-[#6e6e73]
          [&_input:focus]:border-[#0071e3]
          [&_button]:mr-2 [&_button]:cursor-pointer [&_button]:rounded-full
          [&_button]:bg-[#0071e3] [&_button]:px-5 [&_button]:py-2 [&_button]:text-[15px]
          [&_button]:font-normal [&_button]:text-white [&_button]:transition-colors
          [&_button:hover]:bg-[#0077ed]
          [&_ul]:w-72 [&_ul]:list-none [&_ul]:space-y-px [&_ul]:rounded-xl
          [&_ul]:bg-white/[0.04] [&_ul]:p-1.5
          [&_li]:rounded-lg [&_li]:px-3 [&_li]:py-2 [&_li]:text-[14px] [&_li]:text-[#f5f5f7]
          [&_li]:odd:bg-white/[0.03]"
      >
        {children}
      </div>
    </section>
  );
}

function Seccion({ archivo, titulo }: { archivo: string; titulo: string }) {
  return (
    <div className="mt-20 mb-8 first:mt-0">
      <p className="mb-2 font-mono text-[13px] text-[#0071e3]">{archivo}</p>
      <h2 className="max-w-2xl text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
        {titulo}
      </h2>
    </div>
  );
}

function App() {
  return (
    <main
      className="min-h-screen bg-black px-6 py-24 text-[#f5f5f7]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-4">
          <p className="mb-4 font-mono text-[13px] tracking-wide text-[#6e6e73] uppercase">
            Banco de pruebas
          </p>
          <h1 className="text-[56px] leading-[1.05] font-semibold tracking-[-0.03em] text-[#f5f5f7]">
            Estado local,
            <br />
            de principio a fin.
          </h1>
          <p className="mt-6 max-w-xl text-[21px] leading-[1.4] text-[#86868b]">
            El bloque 11 entero: el valor inicial y su tipo, lo que el setter no te da, y el
            reducer para cuando los cambios tienen reglas.
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.5] text-[#6e6e73]">
            Los dos primeros archivos están cerrados y siguen aquí a propósito, para ver cómo
            quedaron. Los del <span className="font-mono">exercise-03</span> están sin
            resolver: pulsa cada botón dos o tres veces antes de dar uno por bueno.
          </p>
        </header>

        <Seccion
          archivo="exercise-01"
          titulo="El valor inicial decide qué se puede guardar después."
        />

        <Tarjeta
          n={1}
          nombre="Contador"
          mirar="Sube de uno en uno y el número se mantiene número. Si en vez de 1, 2, 3 vieras crecer un texto pegado, el + habría dejado de sumar para concatenar."
          campos="un <p> con el número · botón Sumar"
          estado="resuelto"
        >
          <Contador />
        </Tarjeta>

        <Tarjeta
          n={2}
          nombre="Interruptor"
          mirar="Dice OFF al arrancar y alterna a ON al pulsar. El useState estaba en booleano y el cuerpo seguía comparando con textos: el arreglo fue terminar el cambio, no deshacerlo."
          campos="un botón que muestra ON u OFF"
          estado="resuelto"
        >
          <Interruptor />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="SelectorColor"
          mirar="Dice Sin elegir y luego Elegido: verde. El valor inicial era correcto; lo que faltaba era decirle a useState qué más iba a poder guardar además de null."
          campos="un <p> con lo elegido · tres botones: rojo, verde, azul"
          estado="resuelto"
        >
          <SelectorColor />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="AvisoErrores"
          mirar="No tiene estado ni botones: recibe los errores por props y los pinta. Los dos de muestra se ven. El arreglo estaba en la firma, no en un useState."
          campos="una <ul> con un <li> por error"
          estado="resuelto"
        >
          <AvisoErrores errores={erroresDeMuestra} />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="ListaTareas"
          mirar="Pulsa Añadir varias veces y la lista crece. Tenía dos defectos a la vez: el never[] del useState vacío y la mutación del array, que dejaba a React con la misma referencia."
          campos="botón Añadir · una <ul> con un <li> por tarea"
          estado="resuelto"
        >
          <ListaTareas />
        </Tarjeta>

        <Seccion
          archivo="exercise-02"
          titulo="El setter guarda. No devuelve, y no está disponible en la misma vuelta."
        />

        <Tarjeta
          n={1}
          nombre="GuardarNombre"
          mirar="Escribe algo y pulsa Guardar: dice Guardado: Ana y el input se vacía. El starter le pedía al setter que le devolviera lo guardado; la salida era no necesitar recuperarlo."
          campos="un <input> · botón Guardar · un <p> con lo guardado"
          estado="resuelto"
        >
          <GuardarNombre />
        </Tarjeta>

        <Tarjeta
          n={2}
          nombre="ContadorConAviso"
          mirar="Tras el primer click el aviso dice Ahora vale 1, y sigue cuadrando en el segundo. El starter acertaba el primero por accidente y al segundo duplicaba el texto."
          campos="un <p> con el número · otro <p> con el aviso · botón Sumar"
          estado="resuelto"
        >
          <ContadorConAviso />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="ContadorDoble"
          mirar="Sube de dos en dos con DOS llamadas al setter, no con una de +2. Cada llamada continúa a la anterior en vez de pisarla: 0 a 1, y 1 a 2."
          campos="un <p> con el número · botón Sumar 2"
          estado="resuelto"
        >
          <ContadorDoble />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="RegistroDoble"
          mirar="Un click deja Click 1 y Click 2; dos clicks, cuatro entradas. Es el drill anterior sobre un array: aquí lo que se perdía era una entrada entera."
          campos="botón Registrar 2 · una <ul> con las entradas"
          estado="resuelto"
        >
          <RegistroDoble />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="ContadorConTope"
          mirar="Primer click 2, segundo 3, y de ahí no se mueve. El tope se decide dentro de la función actualizadora, con el valor que llega y no con el de este render."
          campos="un <p> con el número · botón Sumar 2"
          estado="resuelto"
        >
          <ContadorConTope />
        </Tarjeta>

        <Seccion
          archivo="exercise-03"
          titulo="El reducer que ya sabes escribir, con un cable a React."
        />

        <Tarjeta
          n={1}
          nombre="ContadorConReducer"
          mirar="Sumar debe subir de uno en uno y Reiniciar volver a 0. El reducer ya está escrito y es correcto: si no pasa nada al pulsar, lo que no llega bien es la acción."
          campos="un <p> con el número · botones Sumar y Reiniciar"
        >
          <ContadorConReducer />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="ContadorConPaso"
          mirar="El botón debe subir de cinco en cinco. Usa el reducer del drill 2, así que hasta que ese esté escrito aquí no se moverá nada. La acción sumar necesita algo más que su tipo."
          campos="un <p> con el número · botón Sumar 5"
        >
          <ContadorConPaso />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="PanelConHistorial"
          mirar="Sumar 2 sube el contador y deja una línea en el historial; Reiniciar lo pone a 0 sin borrar la lista. Si el contador cambia pero la lista no crece, el reducer está mutando el estado que recibe."
          campos="un <p> con el contador · botones Sumar 2 y Reiniciar · una <ul> con el historial"
        >
          <PanelConHistorial />
        </Tarjeta>
      </div>
    </main>
  );
}
export default App;
