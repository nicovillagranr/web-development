import "./assets/styles/App.css";
import { ListaTareas } from './exercises/10-eventos-formularios/exercise-10'

/* BANCO DE PRUEBAS — para ver un componente vivo en el navegador.
 *   1. `pnpm dev` y abre la URL que te diga
 *   2. cambia el import de arriba y la etiqueta de abajo por el que quieras mirar
 * Solo entran aquí los componentes exportados (`export function ...`). */

function App() {
  return (
    <>
      <h1>Aprendiendo Typescript + React + Arquitectura de Software</h1>
      <ListaTareas
        tareas={[
          { id: 't-1', texto: 'Regar las plantas', prioridad: 'media', hecha: false },
          { id: 't-2', texto: 'Comprar pan', prioridad: 'alta', hecha: true },
          { id: 't-3', texto: 'Llamar al banco', prioridad: 'baja', hecha: false },
        ]}
        alMarcar={(id, hecha) => console.log('alMarcar →', id, hecha)}
        alBorrar={(id) => console.log('alBorrar →', id)}
      />
    </>
  );
}
export default App;
