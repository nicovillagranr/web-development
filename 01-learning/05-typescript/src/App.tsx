import "./assets/styles/App.css";
import type { ReactNode } from "react";
import { FormularioContacto } from "./exercises/10-eventos-formularios/exercise-14";

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: `exercise-14`, el formulario de contacto desde la hoja en blanco. Sale 1 de
 * sus 3 drills: el 1 son types y una constante, y el 2 (`validarContacto`) es una función
 * suelta. Esos dos solo se ven en el test.
 *
 * LA IDEA DE LOS ESTILOS: aquí lo que hay que mirar es QUÉ AVISOS SALEN Y CUÁNDO. Con el
 * starter la tarjeta sale vacía, porque el componente todavía no pinta nada.
 *   · etiqueta GRIS → el `<label>` de cada campo
 *   · campo OSCURO  → lo escribes tú, sea `<input>` o `<textarea>`
 *   · aviso ROJO    → un `<p role="alert">`: solo tiene que existir si su campo falla
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
  /* los campos en el orden en que los pinta el componente */
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
       *   [&_form]                 → un <form> no hereda el flex-col de este div: sin
       *                              esto sus campos fluyen en línea y se solapan
       *   [&_label]                → la etiqueta, pegada encima de su campo
       *   [&_input] [&_textarea]   → campos editables, lo que escribes tú
       *   [&_p[role=alert]]        → el aviso de un campo que falla, en rojo
       *   [&_p[role=status]]       → el aviso de éxito, que llega con el `14b`
       *   [&_button:disabled]      → el botón apagado, que también llega con el `14b` */}
      <div
        className="flex scheme-dark flex-col items-start gap-3 bg-slate-950/40 px-5 py-5
          [&_form]:flex [&_form]:flex-col [&_form]:items-start [&_form]:gap-3
          [&_label]:-mb-2 [&_label]:text-xs [&_label]:font-medium [&_label]:text-slate-400
          [&_input]:w-72 [&_input]:rounded-md [&_input]:border [&_input]:border-slate-700
          [&_input]:bg-slate-800 [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm
          [&_input]:text-slate-100 [&_input]:shadow-none [&_input]:outline-none
          [&_input:focus]:border-sky-500 [&_input:focus]:ring-2 [&_input:focus]:ring-sky-500/30
          [&_textarea]:w-72 [&_textarea]:resize-none [&_textarea]:rounded-md
          [&_textarea]:border [&_textarea]:border-slate-700 [&_textarea]:bg-slate-800
          [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:text-slate-100
          [&_textarea]:shadow-none [&_textarea]:outline-none
          [&_textarea:focus]:border-sky-500 [&_textarea:focus]:ring-2
          [&_textarea:focus]:ring-sky-500/30
          [&_p]:w-72 [&_p]:rounded-md [&_p]:border [&_p]:border-slate-700
          [&_p]:bg-slate-800/60 [&_p]:px-3 [&_p]:py-1.5 [&_p]:font-mono [&_p]:text-xs
          [&_p]:text-slate-300
          [&_p[role=alert]]:border-rose-900/70 [&_p[role=alert]]:bg-rose-950/50
          [&_p[role=alert]]:font-sans [&_p[role=alert]]:text-rose-300
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
        <span className="h-5 w-10 rounded border border-rose-900/70 bg-rose-950/50" />
        un aviso de un campo que falla
      </span>
      <span className="text-slate-500">
        · no valida al escribir: los avisos salen al pulsar "Enviar mensaje"
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
          <span className="font-mono text-slate-300">exercise-14</span> · el formulario de
          contacto, desde la hoja en blanco — capstone, parte 1 de 2
        </p>

        <Leyenda />

        <Tarjeta
          n={3}
          nombre="FormularioContacto"
          mirar="Con el starter la tarjeta sale vacía. Cuando lo tengas: pulsa 'Enviar mensaje' con todo en blanco y salen tres avisos, uno por campo. Escribe un nombre de una letra y un correo sin dominio y vuelve a enviar: cambian los textos, pero cada campo sigue teniendo como mucho uno. Con los tres bien, el formulario se vacía y no queda ningún aviso."
          campos="Nombre · Correo · Mensaje, que es un <textarea> · botón 'Enviar mensaje'"
        >
          <FormularioContacto />
        </Tarjeta>

        <p className="mt-8 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-xs leading-relaxed text-slate-400">
          Faltan los drills 1 y 2: el 1 son types y una constante, y el 2 una función suelta, así
          que no hay nada que ver. Un experimento para cuando termines, si tu correo es{" "}
          <span className="font-mono text-slate-300">type="email"</span>: quítale el{" "}
          <span className="font-mono text-slate-300">noValidate</span> al formulario, escribe
          «nico@» en el correo y envía. El aviso que sale ya no es el tuyo, es el del navegador, y
          el tuyo no llega a aparecer.
        </p>
      </div>
    </main>
  );
}
export default App;
