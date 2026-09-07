import "./assets/styles/App.css";
import type { ReactNode } from "react";
import { AliasConError, PerfilValidado } from "./exercises/10-eventos-formularios/exercise-12";

/* BANCO DE PRUEBAS — para ver vivos los componentes del archivo que estés estudiando.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y las tarjetas de abajo al cambiar de archivo
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: `exercise-12`, los dos drills que devuelven JSX (9 y 10). Los ocho
 * primeros son funciones sueltas y no tienen nada que pintar: esos se comprueban
 * con `pnpm test:run` y `pnpm typecheck`.
 *
 * LA IDEA DE LOS ESTILOS: cada drill pinta dos clases de cosa, y aquí se visten
 * distinto a propósito para que no se confundan.
 *   · campo BLANCO  → lo escribes tú; es lo que el navegador tiene en pantalla
 *   · caja NEGRA    → lo que el componente ha guardado en su estado
 * Cuando el drill está bien, escribes en un campo blanco y la caja negra de al lado
 * lo va copiando letra a letra. Cuando está mal, la caja negra se queda quieta —o
 * se mueve la que no era. Ese desajuste ES el ejercicio.
 *
 * Nada de esto toca el archivo de estudio: se hace desde fuera con los `[&_...]:` de
 * Tailwind, que aplican una utilidad a los descendientes que casen con el selector. */

type TarjetaProps = {
  n: number;
  nombre: string;
  /* qué tiene que pasar cuando el drill está bien */
  mirar: string;
  /* los campos en el orden en que los pinta el componente; los `aria-label` del
   * ejercicio no se ven en pantalla, y sin esto no sabes cuál es cuál */
  campos: string;
  resuelto?: boolean;
  children: ReactNode;
};

function Tarjeta({ n, nombre, mirar, campos, resuelto = false, children }: TarjetaProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
          {n}
        </span>
        <h2 className="font-mono text-sm font-semibold text-slate-800">{nombre}</h2>
        <span
          className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            resuelto ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {resuelto ? "✅ resuelto" : "⏳ starter puesto"}
        </span>
      </header>

      <p className="border-b border-slate-100 px-5 py-3 text-sm text-slate-600">
        <span className="font-medium text-slate-700">Qué mirar: </span>
        {mirar}
      </p>

      <p className="border-b border-slate-100 px-5 py-2 font-mono text-xs text-slate-400">
        campos, de arriba abajo: {campos}
      </p>

      {/* El componente vivo. Las dos reglas que importan:
       *   [&_input] / [&_textarea] → campos blancos, lo que escribes tú
       *   [&_p]                    → cajas negras, lo que el estado guarda
       * y un margen extra sobre el primer <p> para separar los dos grupos. */}
      <div
        className="flex flex-col items-start gap-2 bg-slate-100/60 px-5 py-5
          [&_input]:w-64 [&_input]:rounded-md [&_input]:border [&_input]:border-slate-300
          [&_input]:bg-white [&_input]:px-3 [&_input]:py-2 [&_input]:text-sm
          [&_input]:shadow-sm [&_input]:outline-none
          [&_input:focus]:border-sky-500 [&_input:focus]:ring-2 [&_input:focus]:ring-sky-200
          [&_textarea]:h-16 [&_textarea]:w-64 [&_textarea]:rounded-md
          [&_textarea]:border [&_textarea]:border-slate-300 [&_textarea]:bg-white
          [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm
          [&_textarea]:shadow-sm [&_textarea]:outline-none
          [&_textarea:focus]:border-sky-500 [&_textarea:focus]:ring-2 [&_textarea:focus]:ring-sky-200
          [&_p]:min-h-7 [&_p]:w-64 [&_p]:rounded-md [&_p]:bg-slate-900 [&_p]:px-3
          [&_p]:py-1.5 [&_p]:font-mono [&_p]:text-xs [&_p]:text-emerald-300
          [&_p:first-of-type]:mt-3"
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
    <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
      <span className="flex items-center gap-2">
        <span className="h-5 w-10 rounded border border-slate-300 bg-white shadow-sm" />
        lo escribes tú
      </span>
      <span className="flex items-center gap-2">
        <span className="h-5 w-10 rounded bg-slate-900" />
        lo que el componente guardó en el estado
      </span>
      <span className="text-slate-400">
        · si escribes arriba y abajo no se mueve, el drill está mal
      </span>
    </div>
  );
}

function App() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-balance text-slate-800">
        Aprendiendo TypeScript + React + Arquitectura de Software
      </h1>
      <p className="mb-6 border-b border-slate-200 pb-6 text-sm text-slate-500">
        <span className="font-mono text-slate-700">exercise-12</span> · el objeto de errores —
        drills 9 y 10
      </p>

      <Leyenda />

      <Tarjeta
        n={9}
        nombre="AliasConError"
        mirar="Escribe algo en Alias y luego bórralo entero: al quedarse vacío tiene que aparecer el aviso, y al volver a escribir tiene que irse. Ojo, esto YA funciona en pantalla y el drill sigue estando mal — su única señal está en pnpm typecheck."
        campos="Alias"
      >
        <AliasConError />
      </Tarjeta>

      <Tarjeta
        n={10}
        nombre="PerfilValidado"
        mirar="Antes de pulsar Guardar no puede haber ningún aviso en la página, ni siquiera vacío (inspecciona el HTML: hay tres párrafos ahí). Pulsa Guardar con el alias en blanco y tiene que salir uno solo."
        campos="Alias · Ciudad · Bio · botón Guardar"
      >
        <PerfilValidado />
      </Tarjeta>

      <p className="mt-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
        Los drills 1 a 8 son funciones sueltas, sin JSX, así que aquí no se pueden ver. Su señal
        está en <code className="font-mono text-slate-700">pnpm test:run</code> y en{" "}
        <code className="font-mono text-slate-700">pnpm typecheck</code> — y 2 de los 10 pasan el
        test con el fallo dentro, así que hay que correr los dos.
      </p>
    </main>
  );
}
export default App;
