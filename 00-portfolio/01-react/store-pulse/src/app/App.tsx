import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DatasetProvider } from "../data/DatasetProvider.tsx";
import { AppLayout } from "./AppLayout.tsx";
import { StorePage } from "../features/store/StorePage.tsx";
import { TeamPage } from "../features/team/TeamPage.tsx";
import { WorkerPage } from "../features/worker/WorkerPage.tsx";

/**
 * Rutas de verdad (y no un `useState` con el nombre de la pantalla) por tres motivos
 * concretos en una app instalable:
 *
 *   - el botón "atrás" del teléfono funciona solo;
 *   - se puede compartir el enlace directo al detalle de una persona;
 *   - al reabrir la PWA se vuelve donde estabas.
 *
 * `basename` sale de `import.meta.env.BASE_URL` para que la app siga funcionando si
 * algún día se publica colgando de un subdirectorio en vez de en la raíz.
 */
export function App() {
  return (
    <DatasetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<StorePage />} />
            <Route path="equipo" element={<TeamPage />} />
            <Route path="equipo/:workerId" element={<WorkerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DatasetProvider>
  );
}
