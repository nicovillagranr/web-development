import { createContext, useContext } from "react";
import type { Dataset } from "./types.ts";

/**
 * Los tres estados en los que puede estar la carga de datos, como unión
 * discriminada y no como `{ loading, error, data }` con los tres a la vez.
 *
 * La diferencia no es estética: con tres campos sueltos existen combinaciones
 * imposibles («cargando Y con error Y con datos») que hay que recordar descartar en
 * cada componente. Con la unión, TypeScript no te deja leer `dataset` hasta que has
 * comprobado que `status === "ready"`, así que el estado de carga no se puede
 * olvidar — que es exactamente el que siempre se olvida.
 */
export type DatasetState =
  | { readonly status: "loading" }
  | { readonly status: "error"; readonly error: Error }
  | { readonly status: "ready"; readonly dataset: Dataset };

export const DatasetContext = createContext<DatasetState | null>(null);

export function useDatasetState(): DatasetState {
  const state = useContext(DatasetContext);

  // Si alguien monta una pantalla fuera del provider, es mejor un error inmediato y
  // explícito que un `null` que revienta tres componentes más abajo sin decir dónde.
  if (state === null) {
    throw new Error("useDatasetState debe usarse dentro de <DatasetProvider>");
  }

  return state;
}
