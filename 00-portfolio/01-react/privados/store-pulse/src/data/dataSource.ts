import type { Dataset } from "./types.ts";
import { DatasetSchema } from "./schemas.ts";
import { generateDataset } from "../mocks/generate.ts";

/**
 * La única costura por la que entran datos a la app.
 *
 * Ningún componente hace `fetch`, ni importa los mocks, ni sabe de dónde salen los
 * números: piden datos aquí. Es una interfaz con dos implementaciones (hoy una), y
 * es lo que hace que la Fase 7 —cambiar mocks por la API real— sea sustituir este
 * archivo en vez de tocar cada pantalla.
 *
 * Es la misma idea que ya usas en el portfolio con el snapshot de respaldo: quien
 * consume los datos no debería enterarse de qué fuente los sirvió.
 */
export interface DataSource {
  load(): Promise<Dataset>;
}

/**
 * Un retardo pequeño y deliberado.
 *
 * Sin él, los mocks resuelven en el mismo tick y los estados de carga nunca se ven,
 * así que se construyen a ciegas y se descubren rotos el día que hay una API de
 * verdad detrás. Mejor que la demo tarde 300 ms y los esqueletos estén probados.
 */
const MOCK_LATENCY_MS = 300;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const mockDataSource: DataSource = {
  async load(): Promise<Dataset> {
    await delay(MOCK_LATENCY_MS);

    // Se valida el mock con el mismo schema que validará la respuesta de la API.
    // Parece innecesario —lo acabamos de generar nosotros— pero es lo que garantiza
    // que el generador y el contrato no se separen sin que nadie se entere.
    return DatasetSchema.parse(generateDataset()) as Dataset;
  },
};

export function getDataSource(): DataSource {
  return mockDataSource;
}
