import "./assets/styles/App.css";
import {
  ListaQueCrece,
  ListaQueMengua,
  MiniGestor,
  GestorDeTareas,
} from "./exercises/10-eventos-formularios/exercise-10";

import {
  PerfilQueEscribe,
  PerfilDosCampos,
  PerfilConBio,
} from "./exercises/10-eventos-formularios/exercise-11";

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
        <h2>Drill 6 · GestorDeTareas ✅</h2>
        <p>
          El capstone. Escribe una tarea, dale a "Añadir" y mira la lista de
          abajo.
        </p>
        <GestorDeTareas />
      </section>

      <hr />

      <section>
        <h2>Drill 7 · PerfilQueEscribe ✅</h2>
        <p>
          Escribe tu nombre, y mira el perfil que aparece en la derecha.
          Deberías ver tu nombre.
        </p>
        <PerfilQueEscribe />
      </section>

      <section>
        <h2>Drill 8 · PerfilDosCampos ✅</h2>
        <p>
          Escribe tu nombre y tu apellido, y mira el perfil que aparece en la
          derecha. Deberías ver tu nombre y tu apellido.
        </p>
        <PerfilDosCampos />
      </section>

      <section>
        <h2>Drill 9 · PerfilConBio ⏳</h2>
        <p>
          Los dos campos de arriba más un &lt;textarea&gt; para la bio, y sigue
          habiendo un solo manejador. Escribe en Alias: responde. Escribe en
          Bio: no pasa nada, y la consola no dice ni una palabra.
        </p>
        <PerfilConBio />
      </section>
    </>
  );
}
export default App;
