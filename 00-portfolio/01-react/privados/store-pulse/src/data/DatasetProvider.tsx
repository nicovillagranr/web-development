import { useEffect, useState, type ReactNode } from "react";
import { DatasetContext, type DatasetState } from "./datasetContext.ts";
import { getDataSource } from "./dataSource.ts";

/**
 * Carga el dataset una sola vez y lo comparte con toda la app.
 *
 * Una vez, y no una por pantalla: los datos de una semana son los mismos para el
 * dashboard, el equipo y el detalle de una persona, así que pedirlos tres veces solo
 * añadiría tres estados de carga y tres formas de desincronizarse.
 */
export function DatasetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DatasetState>({ status: "loading" });

  useEffect(() => {
    // Si el componente se desmonta antes de que resuelva la promesa, actualizar el
    // estado sería escribir sobre algo que ya no existe. Este flag lo evita.
    let active = true;

    getDataSource()
      .load()
      .then((dataset) => {
        if (active) setState({ status: "ready", dataset });
      })
      .catch((cause: unknown) => {
        if (!active) return;
        const error = cause instanceof Error ? cause : new Error(String(cause));
        setState({ status: "error", error });
      });

    return () => {
      active = false;
    };
  }, []);

  return <DatasetContext value={state}>{children}</DatasetContext>;
}
