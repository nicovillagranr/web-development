import "./assets/styles/App.css";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Bloque11 } from "./banco/Bloque11";
import { Bloque12 } from "./banco/Bloque12";

/* BANCO DE PRUEBAS — para ver vivos los componentes de los bloques del cuaderno.
 *   `pnpm dev`, abre la URL que te diga y elige el bloque en las pestañas de arriba.
 *
 * Cómo está montado:
 *   · `src/banco/piezas.tsx`    → Tarjeta, Seccion y el chip de estado, compartidos
 *   · `src/banco/BloqueNN.tsx`  → las tarjetas de un bloque (la carpeta entera)
 *   · este archivo              → solo las pestañas: cuál está activa y cuál se monta
 *
 * Solo se MONTA la pestaña activa. Al cambiar, el bloque que dejas se desmonta: su
 * estado vuelve al inicio y sus efectos dejan de correr. Y si un starter rompe al
 * pintarse, solo se cae su pestaña, no la página entera.
 *
 * Para añadir un bloque: crear `src/banco/BloqueNN.tsx`, importarlo aquí, y sumar una
 * línea a `BLOQUES` y otra a `ORDEN`. */

type IdBloque = "11" | "12";

const BLOQUES: Record<IdBloque, { titulo: string; Banco: () => ReactNode }> = {
  "11": { titulo: "useState y useReducer", Banco: Bloque11 },
  "12": { titulo: "Custom hooks", Banco: Bloque12 },
};

// En qué orden salen las pestañas. Va en un array aparte porque `Object.keys(BLOQUES)`
// devuelve `string[]`, no `IdBloque[]`, y para usarlo haría falta un `as`.
const ORDEN: IdBloque[] = ["11", "12"];

function App() {
  const [activo, setActivo] = useState<IdBloque>("12");

  // Con mayúscula a propósito: en JSX, `<banco />` en minúscula sería una etiqueta HTML.
  const { Banco } = BLOQUES[activo];

  // El patrón de pestañas pide moverse con las flechas: Tab entra en la pestaña
  // activa, y ← → saltan a la anterior o a la siguiente (y dan la vuelta).
  function moverConFlechas(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

    const paso = e.key === "ArrowRight" ? 1 : -1;
    const siguiente = ORDEN[(ORDEN.indexOf(activo) + paso + ORDEN.length) % ORDEN.length];
    if (!siguiente) return; // con `noUncheckedIndexedAccess`, ORDEN[i] puede ser undefined

    setActivo(siguiente);
    document.getElementById(`tab-${siguiente}`)?.focus();
  }

  return (
    <main
      className="min-h-screen bg-black px-6 py-24 text-[#f5f5f7]"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-[13px] tracking-wide text-[#6e6e73] uppercase">
          Banco de pruebas
        </p>

        <div
          role="tablist"
          aria-label="Bloques del cuaderno"
          onKeyDown={moverConFlechas}
          className="mb-14 inline-flex gap-1 rounded-full bg-[#1d1d1f] p-1"
        >
          {ORDEN.map((id) => {
            const seleccionada = id === activo;

            return (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={seleccionada}
                aria-controls={seleccionada ? `panel-${id}` : undefined}
                tabIndex={seleccionada ? 0 : -1}
                onClick={() => setActivo(id)}
                className={`rounded-full border-0 px-4 py-1.5 text-[14px] font-normal transition-colors ${
                  seleccionada
                    ? "bg-[#f5f5f7] text-black hover:bg-[#f5f5f7]"
                    : "bg-transparent text-[#86868b] hover:bg-white/[0.06] hover:text-[#f5f5f7]"
                }`}
              >
                <span className="font-mono">{id}</span> · {BLOQUES[id].titulo}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${activo}`} aria-labelledby={`tab-${activo}`}>
          <Banco />
        </div>
      </div>
    </main>
  );
}
export default App;
