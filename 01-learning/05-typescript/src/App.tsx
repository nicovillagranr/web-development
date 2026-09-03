import "./assets/styles/App.css";
import {
  ListaQueCrece,
  ListaQueMengua,
  MiniGestor,
  GestorDeTareas,
} from "./exercises/10-eventos-formularios/exercise-10";

/* BANCO DE PRUEBAS — para ver un componente vivo en el navegador.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y la etiqueta de abajo por el que quieras mirar
 * Solo entran aquí los componentes exportados (`export function ...`).
 *
 * Ahora mismo: la escalera F al completo + el drill 6.
 * Los que siguen con el starter puesto NO responden al pulsar. Eso es lo que hay
 * que mirar: no da error, no sale nada en la consola, simplemente no pasa nada. */

function App() {
  return (
    <>
      <h1 className="mb-8 border-b border-slate-200 pb-4 text-3xl font-bold tracking-tight text-balance text-slate-800">
        Aprendiendo Typescript + React + Arquitectura de Software
      </h1>

      <section>
        <h2>F4 · ListaQueCrece ✅</h2>
        <p>Cada click añade uno y se ve. Ya resuelto.</p>
        <ListaQueCrece />
      </section>

      <hr />

      <section>
        <h2>F5 · ListaQueMengua ✅</h2>
        <p>Pulsa "Quitar" en cualquiera: desaparece solo ese. Ya resuelto.</p>
        <ListaQueMengua />
      </section>

      <hr />

      <section>
        <h2>F6 · MiniGestor ✅</h2>
        <p>
          Las tres operaciones juntas: añadir, marcar y borrar. Las tres tienen
          el starter puesto.
        </p>
        <MiniGestor />
      </section>

      <hr />

      <section>
        <h2>Drill 6 · GestorDeTareas 🔴</h2>
        <p>
          El capstone. Escribe una tarea, dale a "Añadir" y mira la lista de
          abajo.
        </p>
        <GestorDeTareas />
      </section>
    </>
  );
}
export default App;
