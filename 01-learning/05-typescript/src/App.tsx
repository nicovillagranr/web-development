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
import { ListaCompra, PanelNotas } from "./exercises/11-useState-useReducer/exercise-03b";
import {
  Altavoz,
  AltavozConPreset,
  AltavozCompleto,
} from "./exercises/11-useState-useReducer/exercise-03c";

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
 * componentes: esos solo se ven en el test. Del `exercise-03b` pasa lo mismo con los
 * drills 1 al 8; solo el 9 y el 10 pintan algo. Y del `exercise-03c`, solo el 7, el 8 y el 9.
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
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[#f5f5f7]">{nombre}</h3>
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
       *   [&_ul_li]  → las listas de ListaTareas, RegistroDoble, PanelConHistorial,
       *                ListaCompra y PanelNotas
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
            El bloque 11 entero: el valor inicial y su tipo, lo que el setter no te da, y el reducer
            para cuando los cambios tienen reglas.
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.5] text-[#6e6e73]">
            Los seis archivos del bloque están cerrados y siguen aquí a propósito, para ver cómo
            quedaron: pulsa cada botón dos o tres veces.
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
          mirar="Sumar sube de uno en uno y Reiniciar vuelve a 0. El reducer venía escrito y era correcto: lo que no llegaba bien era la acción, que es un objeto con su tipo y no el texto suelto."
          campos="un <p> con el número · botones Sumar y Reiniciar"
          estado="resuelto"
        >
          <ContadorConReducer />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="ContadorConPaso"
          mirar="Sube de cinco en cinco con el reducer del drill 2. La acción sumar lleva la cantidad consigo, y esa cantidad solo existe dentro de su case."
          campos="un <p> con el número · botón Sumar 5"
          estado="resuelto"
        >
          <ContadorConPaso />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="PanelConHistorial"
          mirar="Sumar 2 sube el contador y deja una línea en el historial; Reiniciar lo pone a 0 sin borrar la lista. El reducer ya no toca lo que recibe: hoja nueva y también taquilla nueva para el historial."
          campos="un <p> con el contador · botones Sumar 2 y Reiniciar · una <ul> con el historial"
          estado="resuelto"
        >
          <PanelConHistorial />
        </Tarjeta>

        <Seccion
          archivo="exercise-03b"
          titulo="No toques lo que te llega: la hoja y la taquilla."
        />

        <Tarjeta
          n={9}
          estado="resuelto"
          nombre="ListaCompra"
          mirar="Cada click en Añadir leche suma una leche a la lista y se ve al momento. Si pulsas y no aparece nada, el array sí está creciendo: lo que pasa es que React recibe la misma llave y no repinta."
          campos="una <ul> que empieza con pan · botón Añadir leche"
        >
          <ListaCompra />
        </Tarjeta>

        <Tarjeta
          n={10}
          estado="resuelto"
          nombre="PanelNotas"
          mirar="Un click en Anotar debe dejar UNA nota. Aquí la pantalla sí repinta, pero cada nota sale doble: es el StrictMode de main.tsx llamando dos veces al reducer y delatando lo que toca."
          campos="botón Anotar · una <ul> con las notas"
        >
          <PanelNotas />
        </Tarjeta>

        <Seccion
          archivo="exercise-03c"
          titulo="La cadena de useReducer: el papel, el cajero y quién lo entrega."
        />

        <Tarjeta
          n={7}
          nombre="Altavoz"
          estado="resuelto"
          mirar="Subir y Bajar mueven el número de uno en uno, empezando en 5. Si en pantalla sale la palabra subir en vez de un número, el reducer recibió la etiqueta y no el papel."
          campos="un <p> con el volumen · botones Subir y Bajar"
        >
          <Altavoz />
        </Tarjeta>

        <Tarjeta
          n={8}
          nombre="AltavozConPreset"
          estado="resuelto"
          mirar="Empieza en 3 y el botón lo deja en 7. Si pulsas y no pasa nada, la cuenta se hizo, pero nadie guardó el resultado."
          campos="un <p> con el volumen · botón Al 7"
        >
          <AltavozConPreset />
        </Tarjeta>

        <Tarjeta
          n={9}
          nombre="AltavozCompleto"
          estado="resuelto"
          mirar="Silencio lo deja en 0 venga de donde venga, y después Bajar no baja más. Ni Subir ni Bajar pasan de 10 ni de 0. Con el starter, Silencio tumbaba la página entera: el reducer devolvía el papel y React no sabe pintar un objeto."
          campos="un <p> con el volumen · botones Subir, Bajar y Silencio"
        >
          <AltavozCompleto />
        </Tarjeta>
      </div>
    </main>
  );
}
export default App;
