import "./assets/styles/App.css";
import type { ReactNode } from "react";
import {
  ContadorQueSigueVivo,
  EnvioConBotonApagado,
  LimpiarDesdeDosSitios,
} from "./exercises/10-eventos-formularios/exercise-13b";

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: `exercise-13b`, el mismo envío mirado despacio. Solo salen 3 de sus 5
 * drills: los dos primeros (`bloqueaElBoton` y `puedeLimpiar`) son funciones sueltas sin
 * JSX, y los tres de aquí las llaman. Mientras esas dos estén mal, lo que veas abajo va a
 * estar mal aunque el componente esté bien escrito.
 *
 * LA IDEA DE LOS ESTILOS: aquí lo que hay que mirar es el TIEMPO, no el texto. El envío
 * finge tardar 200 ms, así que lo interesante pasa entre que sueltas el clic y vuelve la
 * respuesta — es un parpadeo, hay que estar mirando.
 *   · campo OSCURO  → lo escribes tú
 *   · caja GRIS     → un `<p>` normal, aquí usado para volcar un recuento a pantalla
 *   · botón APAGADO → un `<button disabled>`: el navegador no le pasa el clic a nadie
 * Los `<p>` grises son un chivato para que veas los recuentos, no parte del formulario.
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
  n: number | string;
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
       *   [&_input]                → campos editables, lo que escribes tú
       *   [&_p]                    → chivato gris: el estado volcado a pantalla
       *   [&_p[role=status]]       → el aviso de éxito, que solo existe si el envío
       *                              terminó bien; gana al gris por ir después
       *   [&_button:disabled]      → el botón apagado durante el envío. Es el drill 4
       *                              entero: si no se apaga, no se nota nada */}
      <div
        className="flex scheme-dark flex-col items-start gap-3 bg-slate-950/40 px-5 py-5
          [&_form]:flex [&_form]:flex-col [&_form]:items-start [&_form]:gap-3
          [&_div]:flex [&_div]:flex-col [&_div]:items-start [&_div]:gap-3
          [&_input]:w-64 [&_input]:rounded-md [&_input]:border [&_input]:border-slate-700
          [&_input]:bg-slate-800 [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm
          [&_input]:text-slate-100 [&_input]:shadow-none [&_input]:outline-none
          [&_input::placeholder]:text-slate-500
          [&_input:focus]:border-sky-500 [&_input:focus]:ring-2 [&_input:focus]:ring-sky-500/30
          [&_p]:w-64 [&_p]:rounded-md [&_p]:border [&_p]:border-slate-700
          [&_p]:bg-slate-800/60 [&_p]:px-3 [&_p]:py-1.5 [&_p]:font-mono [&_p]:text-xs
          [&_p]:text-slate-300
          [&_p[role=status]]:border-emerald-900/70 [&_p[role=status]]:bg-emerald-950/50
          [&_p[role=status]]:font-sans [&_p[role=status]]:font-medium
          [&_p[role=status]]:text-emerald-300
          [&_button]:mt-1 [&_button]:cursor-pointer [&_button]:rounded-md
          [&_button]:border-transparent [&_button]:bg-sky-600 [&_button]:px-4
          [&_button]:py-2 [&_button]:text-sm [&_button]:font-medium [&_button]:text-white
          [&_button:hover]:bg-sky-500
          [&_button:disabled]:cursor-not-allowed [&_button:disabled]:bg-slate-700
          [&_button:disabled]:text-slate-400 [&_button:disabled]:hover:bg-slate-700"
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
        <span className="h-5 w-10 rounded border border-slate-700 bg-slate-800/60" />
        un recuento, volcado a pantalla
      </span>
      <span className="flex items-center gap-2">
        <span className="h-5 w-10 rounded border border-transparent bg-slate-700" />
        un botón apagado
      </span>
      <span className="text-slate-500">
        · el envío finge tardar 200 ms — lo que hay que mirar dura ese parpadeo
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
          <span className="font-mono text-slate-300">exercise-13b</span> · el mismo envío, mirado
          despacio — los tres drills que pintan algo
        </p>

        <Leyenda />

        <Tarjeta
          n={3}
          nombre="ContadorQueSigueVivo"
          mirar="Escribe algo y pulsa Enviar. Durante el parpadeo, 'Enviados' tiene que seguir en 0: si ya marca 1, está cantando un envío que todavía no ha vuelto. Y mientras esperas, dale al +1 varias veces — ese recuento sí sube, porque la página no se ha congelado."
          campos="campo Comentario · botón de enviar · recuento de envíos · botón +1 · recuento de clics"
        >
          <ContadorQueSigueVivo />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="EnvioConBotonApagado"
          mirar="El botón tiene que apagarse durante el parpadeo del envío y volver a encenderse al terminar. Con el starter pasa justo lo contrario: sigue pulsable mientras esperas y se queda apagado cuando vuelve, así que no puedes mandar un segundo comentario."
          campos="campo Comentario · botón que se apaga mientras dura el envío"
        >
          <EnvioConBotonApagado />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="LimpiarDesdeDosSitios"
          mirar="Hay dos maneras de vaciar el campo: el botón 'Limpiar' y la tecla Escape dentro del campo. Con el formulario quieto las dos tienen que funcionar. Ahora pulsa enviar y prueba las dos durante el parpadeo: el texto tiene que quedarse donde está por los dos caminos."
          campos="campo Comentario, que también escucha la tecla Escape · botón de enviar · botón 'Limpiar'"
        >
          <LimpiarDesdeDosSitios />
        </Tarjeta>

        <p className="mt-8 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-400">
          Los drills 1 y 2 no están aquí porque no hay nada que ver:{" "}
          <code className="font-mono text-slate-300">bloqueaElBoton</code> y{" "}
          <code className="font-mono text-slate-300">puedeLimpiar</code> son funciones sueltas, sin
          JSX. Empieza por ellas igualmente — los tres componentes de arriba les preguntan, así que
          mientras estén mal ninguno se va a comportar como debe.
        </p>
      </div>
    </main>
  );
}
export default App;
