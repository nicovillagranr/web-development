import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
            {/* La puerta de entrada es el equipo, no el local: al abrir la app antes
                de un turno lo primero que se quiere ver es cómo va la gente.

                Es un rebote y no un `<TeamPage />` colgado del índice a propósito.
                Si el equipo viviera en `/`, su pestaña tendría que ser `end: true`
                para no quedarse encendida en todas las pantallas — y entonces el
                detalle de una persona (`/equipo/:workerId`) dejaría de marcar
                ninguna pestaña. Manteniendo el equipo en `/equipo` con `end: false`,
                el detalle sigue marcando la suya.

                `replace` en vez de un empujón normal al historial: sin él, "atrás"
                desde el equipo vuelve a `/`, que rebota otra vez al equipo, y no se
                puede salir de la app. */}
            <Route index element={<Navigate to="equipo" replace />} />
            <Route path="local" element={<StorePage />} />
            <Route path="equipo" element={<TeamPage />} />
            <Route path="equipo/:workerId" element={<WorkerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DatasetProvider>
  );
}
