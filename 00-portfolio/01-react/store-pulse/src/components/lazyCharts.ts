import { lazy } from "react";

/**
 * Los gráficos, cargados aparte del resto de la app.
 *
 * Recharts pesa unos 108 kB comprimidos — más que todo lo demás junto. Metido en el
 * bundle principal, el teléfono tiene que descargarlo y ejecutarlo **antes de pintar
 * la primera tarjeta**, aunque los gráficos estén más abajo y puede que ni se
 * lleguen a mirar.
 *
 * Con `lazy` viajan en su propio archivo, que el navegador pide cuando la pantalla
 * ya está en pie. La app abre igual de rápido con gráficos que sin ellos, y en una
 * PWA que se consulta con datos móviles en un pasillo eso se nota.
 *
 * El precio: quien llame a estos componentes tiene que envolverlos en un `<Suspense>`
 * con un esqueleto de la altura final, o el contenido pegará un salto al llegar.
 */
export const EvolutionSection = lazy(() =>
  import("./EvolutionSection.tsx").then((module) => ({ default: module.EvolutionSection })),
);

export const QualityComposition = lazy(() =>
  import("./QualityComposition.tsx").then((module) => ({ default: module.QualityComposition })),
);
