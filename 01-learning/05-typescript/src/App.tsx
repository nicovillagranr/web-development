import "./assets/styles/App.css";
import type { ReactNode } from "react";
import {
  Login,
  AltaProducto,
  AltaConTerminos,
} from "./exercises/10-eventos-formularios/exercise-12b";

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: `exercise-12b`, sus tres formularios. Cada drill de ese archivo son dos
 * piezas —la función que decide y el componente que pinta—; aquí solo se ve la segunda.
 * La función se comprueba con `pnpm test:run`.
 *
 * LA IDEA DE LOS ESTILOS: en este archivo cada drill pinta dos clases de cosa, y
 * aquí se visten distinto a propósito para que no se confundan.
 *   · campo OSCURO → lo escribes tú; es lo que el navegador tiene en pantalla
 *   · caja ROJA    → un `<p role="alert">`: un aviso de error que el componente
 *                    ha decidido pintar
 * Ojo con lo segundo, porque es el ejercicio entero: cuando un campo está bien, ahí
 * no debe haber NADA. Una caja roja vacía no es "un aviso apagado", es un aviso que
 * existe sin mensaje — y eso es justo lo que el test cuenta y lo que un lector de
 * pantalla anuncia. El hueco vacío ES la señal de que está bien.
 *
 * (En otros archivos el `<p>` se usa para volcar el estado y va en negro. Aquí no:
 * todos los `<p>` de este archivo son avisos.)
 *
 * Nada de esto toca el archivo de estudio: se hace desde fuera con los `[&_...]:` de
 * Tailwind, que aplican una utilidad a los descendientes que casen con el selector. */

type Estado = "starter" | "casi" | "resuelto";

const CHIP: Record<Estado, { texto: string; clase: string }> = {
  starter: { texto: "⏳ starter puesto", clase: "bg-amber-500/15 text-amber-300" },
  casi: { texto: "🔸 casi — falta un detalle", clase: "bg-orange-500/15 text-orange-300" },
  resuelto: { texto: "✅ resuelto", clase: "bg-emerald-500/15 text-emerald-300" },
};

type TarjetaProps = {
  n: number;
  nombre: string;
  /* qué tiene que pasar cuando el drill está bien */
  mirar: string;
  /* los campos en el orden en que los pinta el componente; los `aria-label` del
   * ejercicio no se ven en pantalla, y sin esto no sabes cuál es cuál */
  campos: string;
  estado?: Estado;
  children: ReactNode;
};

function Tarjeta({ n, nombre, mirar, campos, estado = "starter", children }: TarjetaProps) {
  const chip = CHIP[estado];

  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm shadow-black/20">
      <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-800/40 px-5 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-100">
          {n}
        </span>
        <h2 className="font-mono text-sm font-semibold text-slate-100">{nombre}</h2>
        <span
          className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${chip.clase}`}
        >
          {chip.texto}
        </span>
      </header>

      <p className="border-b border-slate-800 px-5 py-3 text-sm text-slate-400">
        <span className="font-medium text-slate-300">Qué mirar: </span>
        {mirar}
      </p>

      <p className="border-b border-slate-800 px-5 py-2 font-mono text-xs text-slate-500">
        campos, de arriba abajo: {campos}
      </p>

      {/* El componente vivo. Las reglas que importan:
       *   [&_form]                 → estos drills meten todo dentro de un <form>, y un
       *                              <form> no hereda el flex-col de este div: sin
       *                              esto sus inputs fluyen en línea y se solapan
       *   [&_input] / [&_textarea] → campos editables, lo que escribes tú
       *   [&_input[type=checkbox]] → excepción: una casilla con w-64 sería una barra
       *   [&_p]                    → cajas rojas; aquí todo <p> es un role="alert"
       *   [&_button]               → el de enviar, que los ejercicios dejan sin vestir
       * El margen negativo de los <p> los pega a SU campo, para que se vea de quién
       * es cada aviso y no parezcan una lista suelta al final. */}
      <div
        className="flex scheme-dark flex-col items-start gap-3 bg-slate-950/40 px-5 py-5
          [&_form]:flex [&_form]:flex-col [&_form]:items-start [&_form]:gap-3
          [&_input]:w-64 [&_input]:rounded-md [&_input]:border [&_input]:border-slate-700
          [&_input]:bg-slate-800 [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm
          [&_input]:text-slate-100 [&_input]:shadow-none [&_input]:outline-none
          [&_input::placeholder]:text-slate-500
          [&_input:focus]:border-sky-500 [&_input:focus]:ring-2 [&_input:focus]:ring-sky-500/30
          [&_textarea]:h-16 [&_textarea]:w-64 [&_textarea]:rounded-md
          [&_textarea]:border [&_textarea]:border-slate-700 [&_textarea]:bg-slate-800
          [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm
          [&_textarea]:text-slate-100 [&_textarea]:shadow-none [&_textarea]:outline-none
          [&_textarea::placeholder]:text-slate-500
          [&_textarea:focus]:border-sky-500 [&_textarea:focus]:ring-2 [&_textarea:focus]:ring-sky-500/30
          [&_input[type=checkbox]]:h-4 [&_input[type=checkbox]]:w-4
          [&_input[type=checkbox]]:bg-transparent [&_input[type=checkbox]]:accent-sky-500
          [&_p]:-mt-2 [&_p]:min-h-8 [&_p]:w-64 [&_p]:rounded-md [&_p]:border
          [&_p]:border-red-900/70 [&_p]:bg-red-950/50 [&_p]:px-3 [&_p]:py-1.5
          [&_p]:text-xs [&_p]:font-medium [&_p]:text-red-300
          [&_button]:mt-1 [&_button]:cursor-pointer [&_button]:rounded-md
          [&_button]:border-transparent [&_button]:bg-sky-600 [&_button]:px-4
          [&_button]:py-2 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white
          [&_button:hover]:bg-sky-500"
      >
        {children}
      </div>
    </section>
  );
}

/* La leyenda va una sola vez arriba, no dentro de cada tarjeta: es la misma para todas
 * y repetirla en cada una solo añade ruido. */
function Leyenda() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs text-slate-400">
      <span className="flex items-center gap-2">
        <span className="h-5 w-10 rounded border border-slate-700 bg-slate-800" />
        lo escribes tú
      </span>
      <span className="flex items-center gap-2">
        <span className="h-5 w-10 rounded border border-red-900/70 bg-red-950/50" />
        un aviso de error que el componente decidió pintar
      </span>
      <span className="text-slate-500">
        · si el campo está bien, ahí no debe haber nada — ni una caja roja vacía
      </span>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-300">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-balance text-slate-100">
          Aprendiendo TypeScript + React + Arquitectura de Software
        </h1>
        <p className="mb-6 border-b border-slate-800 pb-6 text-sm text-slate-400">
          <span className="font-mono text-slate-300">exercise-12b</span> · los mismos formularios,
          sin esqueleto — drills 1, 2 y 3
        </p>

        <Leyenda />

        <Tarjeta
          n={1}
          nombre="Login"
          estado="casi"
          mirar="Escribe un email y fíjate en que no pasa nada hasta pulsar Entrar. Pruébalo con la clave en 7 caracteres y luego en 8. Y escribe 'nico' sin arroba: el aviso que sale es distinto del de campo vacío, porque son dos fallos distintos."
          campos="Email · Clave · botón Entrar"
        >
          <Login />
        </Tarjeta>

        <Tarjeta
          n={2}
          nombre="AltaProducto"
          estado="casi"
          mirar="El campo Precio es type='number' y aun así te entrega lo tecleado como texto. Sus flechitas están apagadas para todo el cuaderno desde App.css, así que lo numérico ya no se ve: se comprueba tecleando. Pulsa Crear con el precio en blanco: tiene que salir el mismo aviso que si escribieras un 0."
          campos="Nombre · Precio (numérico) · botón Crear"
        >
          <AltaProducto />
        </Tarjeta>

        <Tarjeta
          n={3}
          nombre="AltaConTerminos"
          estado="casi"
          mirar="La casilla tiene que poder marcarse y desmarcarse al hacer clic — si al montarla se queda clavada, es que la estás atando con el atributo de los campos de texto. Pulsa Registrarme sin marcarla y sale su aviso."
          campos="Nombre · casilla Acepto los términos · botón Registrarme"
        >
          <AltaConTerminos />
        </Tarjeta>

        <p className="mt-8 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-400">
          De cada drill aquí solo se ve la mitad. La otra —
          <code className="font-mono text-slate-300">validarCredenciales</code>,{" "}
          <code className="font-mono text-slate-300">validarProducto</code> y{" "}
          <code className="font-mono text-slate-300">validarAlta</code>— son funciones sin JSX y no
          tienen nada que pintar: su señal está en{" "}
          <code className="font-mono text-slate-300">pnpm test:run</code>. Empieza por ellas, que se
          prueban sin montar nada.
        </p>
      </div>
    </main>
  );
}
export default App;
