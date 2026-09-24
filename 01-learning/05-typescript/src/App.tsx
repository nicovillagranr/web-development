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

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia los imports de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: el bloque `11-useState-useReducer`, sus dos archivos enteros.
 *
 * LO QUE HAY QUE MIRAR AQUÍ NO SON AVISOS, SON NÚMEROS Y LISTAS. Casi todos estos
 * starters compilan o casi, y fallan al pulsar: el número sube de uno en uno cuando
 * debía subir de dos, el aviso va un paso por detrás, la lista no se repinta.
 *
 * Nada de esto toca el archivo de estudio: se hace desde fuera con los `[&_...]:` de
 * Tailwind, que aplican una utilidad a los descendientes que casen con el selector. */

type Estado = "starter" | "casi" | "resuelto";

const CHIP: Record<Estado, { texto: string; punto: string; color: string }> = {
  starter: { texto: "Sin resolver", punto: "bg-[#ff9f0a]", color: "text-[#ff9f0a]" },
  casi: { texto: "Verde, con tipos rotos", punto: "bg-[#ff453a]", color: "text-[#ff453a]" },
  resuelto: { texto: "Resuelto", punto: "bg-[#30d158]", color: "text-[#30d158]" },
};

/* Los errores de muestra para el drill 4. Van en una constante y no escritos dentro del
 * JSX a propósito: con la firma del starter (`errores: {}`), un objeto literal pegado ahí
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
       *   [&_ul_li]  → las listas de ListaTareas, AvisoErrores y RegistroDoble
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
            useState y<br />
            de dónde saca el tipo.
          </h1>
          <p className="mt-6 max-w-xl text-[21px] leading-[1.4] text-[#86868b]">
            Diez drills en dos archivos. Aquí el fallo casi nunca es que no salga nada: es que
            sale otra cosa.
          </p>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.5] text-[#6e6e73]">
            Pulsa cada botón dos o tres veces antes de dar un drill por bueno. Varios de estos
            starters aciertan el primer click y se caen en el segundo — y dos están en verde con
            los tipos rotos.
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
          mirar="Tiene que decir OFF al arrancar y alternar a ON al pulsar. El useState ya está en booleano pero el cuerpo sigue comparando con textos, así que los dos lados de cada comparación ya no se encuentran."
          campos="un botón que muestra ON u OFF"
        >
          <Interruptor />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="SelectorColor"
          mirar="Funciona al pulsar: dice Sin elegir y luego Elegido: verde. Pero el typecheck protesta en su useState. El valor inicial es correcto y no se toca — falta decirle qué más va a poder guardar."
          campos="un <p> con lo elegido · tres botones: rojo, verde, azul"
          estado="casi"
        >
          <SelectorColor />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="AvisoErrores"
          mirar="No tiene estado ni botones: recibe los errores por props y los pinta. Los dos de muestra se ven, y aun así el typecheck señala su firma. Es el drill que te bloquea 03-projex, aislado."
          campos="una <ul> con un <li> por error"
          estado="casi"
        >
          <AvisoErrores errores={erroresDeMuestra} />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="ListaTareas"
          mirar="Pulsa Añadir varias veces. Si la lista no crece, no es que no se guarde: se está mutando el array y React recibe la misma referencia, así que no repinta. El dato cambia y la pantalla no se entera."
          campos="botón Añadir · una <ul> con un <li> por tarea"
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
          mirar="Escribe algo y pulsa Guardar: debe decir Guardado: Ana y el input quedarse vacío. El starter le pide al setter que le devuelva lo que acaba de guardar. Mira su firma antes de tocar nada."
          campos="un <input> · botón Guardar · un <p> con lo guardado"
        >
          <GuardarNombre />
        </Tarjeta>

        <Tarjeta
          n={2}
          nombre="ContadorConAviso"
          mirar="Tras el primer click el número dice 1 y el aviso debería decir Ahora vale 1. Si dice 0, va un paso por detrás: se compuso leyendo el estado justo después de llamar al setter. Compila sin una queja."
          campos="un <p> con el número · otro <p> con el aviso · botón Sumar"
        >
          <ContadorConAviso />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="ContadorDoble"
          mirar="Sumar 2 llama al setter dos veces y aun así sube de uno en uno. Las dos llamadas leen el mismo valor de este render, así que la segunda pisa a la primera en vez de continuarla."
          campos="un <p> con el número · botón Sumar 2"
        >
          <ContadorDoble />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="RegistroDoble"
          mirar="Un click tiene que dejar Click 1 y Click 2; dos clicks, cuatro entradas. Es el drill anterior sobre un array: aquí no se pierde un número, se pierde una entrada entera."
          campos="botón Registrar 2 · una <ul> con las entradas"
        >
          <RegistroDoble />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="ContadorConTope"
          mirar="Primer click 2, segundo click 3, y de ahí no se mueve. No basta con arreglar la forma de las llamadas: el tope también tiene que decidirse con el valor que llega, no con el de este render."
          campos="un <p> con el número · botón Sumar 2"
        >
          <ContadorConTope />
        </Tarjeta>
      </div>
    </main>
  );
}
export default App;
