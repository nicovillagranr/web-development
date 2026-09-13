import "./assets/styles/App.css";
import type { ReactNode } from "react";
import {
  BotonQueSeApaga,
  DosBotonesUnEnvio,
  DosBotonesMismaAccion,
  FormularioConEnter,
  SalidaSiempreEncendida,
} from "./exercises/10-eventos-formularios/exercise-13d";

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: `exercise-13d`, dónde se pone el freno. Salen 5 de sus 6 drills — el 3
 * (`puedeEnviar`) es una función suelta, no un componente, y solo se ve en el test.
 *
 * LA IDEA DE LOS ESTILOS: aquí lo que hay que mirar es SI LA ACCIÓN OCURRE O NO. Cada
 * pedido finge tardar 1 s, y todo lo interesante pasa en ese segundo: pulsa Enviar y, sin
 * esperar, intenta mandar otro por el sitio que tenga ese drill — el segundo botón, la
 * tecla Enter dentro del campo, el botón de cancelar.
 *   · campo OSCURO  → lo escribes tú
 *   · botón APAGADO → un `<button disabled>`: el navegador no le pasa el clic a nadie
 * El contador "Arrancados" del drill 5 es el chivato: si sube durante el envío, es que se
 * coló un segundo pedido. Y que un botón esté encendido no significa que su acción tenga
 * que ocurrir: el "Cancelar pedido" del drill 6 está encendido a propósito.
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
        · el guardado finge tardar 1 s — ese rato es justo donde hay que probar las salidas
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
          <span className="font-mono text-slate-300">exercise-13d</span> · dónde se pone el freno —
          el mismo freno, seis sitios donde ponerlo
        </p>

        <Leyenda />

        <Tarjeta
          n={1}
          nombre="BotonQueSeApaga"
          mirar="Pulsa Enviar y, durante ese segundo, vuelve a pulsarlo. Con el starter puedes machacarlo todas las veces que quieras: el rótulo se queda en 'Enviando...' y cada clic manda otro pedido. Cuando esté bien, el botón se apaga solo mientras dura y se vuelve a encender al terminar."
          campos="rótulo del estado · botón 'Enviar'"
        >
          <BotonQueSeApaga />
        </Tarjeta>

        <Tarjeta
          n={2}
          nombre="DosBotonesUnEnvio"
          mirar="Los dos botones mandan el mismo pedido. Pulsa el de arriba y mira los dos durante ese segundo: el de arriba se apaga y el de abajo no. Da igual cuál pulses primero — el agujero está siempre en el mismo sitio."
          campos="rótulo del estado · botón 'Enviar' · botón 'Enviar ahora'"
        >
          <DosBotonesUnEnvio />
        </Tarjeta>

        <Tarjeta
          n={4}
          nombre="DosBotonesMismaAccion"
          mirar="Aquí ninguno de los dos se apaga: eso viene después. Pulsa 'Enviar' y espera — acaba en 'Enviado'. Ahora recarga y pulsa 'Enviar ahora': se queda en 'Enviando...' para siempre. Los dos botones llevan su propia copia de la acción, y una de las dos se dejó un paso."
          campos="rótulo del estado · botón 'Enviar' · botón 'Enviar ahora'"
        >
          <DosBotonesMismaAccion />
        </Tarjeta>

        <Tarjeta
          n={5}
          nombre="FormularioConEnter"
          mirar="Escribe algo y pulsa Enter con el cursor dentro del campo: manda el pedido sin tocar el botón. Ahora hazlo dos veces seguidas sin esperar y mira el contador 'Arrancados'. El botón está apagado durante el envío y aun así el contador sube: la tecla no pasa por él."
          campos="contador 'Arrancados' · rótulo del estado · campo Nota, que también manda con Enter · botón 'Enviar'"
        >
          <FormularioConEnter />
        </Tarjeta>

        <Tarjeta
          n={6}
          nombre="SalidaSiempreEncendida"
          mirar="'Cancelar pedido' no se apaga nunca, y así tiene que quedarse. Con el pedido quieto, cancelar funciona. Pulsa Enviar y cancela durante ese segundo: con el starter el pedido se da por cancelado cuando ya iba de camino."
          campos="rótulo del estado · botón 'Enviar' · botón 'Cancelar pedido', siempre encendido"
        >
          <SalidaSiempreEncendida />
        </Tarjeta>

        <p className="mt-8 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-400">
          Falta el drill 3, <span className="font-mono text-slate-300">puedeEnviar</span>: es una
          función suelta y no hay nada que ver. Del 1 al 6 se sube el mismo escalón cada vez — el
          freno empieza pegado al botón y acaba dentro de la acción, porque a partir del 5 aparecen
          puertas que no tienen interruptor.
        </p>
      </div>
    </main>
  );
}
export default App;
