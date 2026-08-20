// ================= IMPORTS =================
import ForecastDayRow from "./ForecastDayRow.jsx";
import { getGlobalMinMax } from "../../../utils/forecastMath.js";

// ================= COMPONENTE/FUNCION =================
// ForecastPreviewCard: punto de entrada; recibe props/parametros: { forecast, currentTemperature = null, onOpenFull }
export default function ForecastPreviewCard({
    forecast,
    currentTemperature = null,
    onOpenFull,
}) {
    // Guard clause: sin forecast no se renderiza tarjeta.
    if (!forecast?.length) return null;

    // Escala global para que todas las barras compartan referencia.
    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    return (
        <div className="px-4 mt-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl px-5 py-3">
                {/* Titulo de la seccion preview */}
                <p className="text-sm opacity-80 mt-2">{"Pron\u00F3stico de 5 d\u00EDas"}</p>

                {/* Render de primeros 3 dias en vista compacta */}
                {forecast.slice(0, 3).map((day, index) => (
                    <ForecastDayRow
                        key={day.date || index}
                        day={day}
                        globalMin={globalMin}
                        globalMax={globalMax}
                        isToday={index === 0}
                        currentTemperature={currentTemperature}
                    />
                ))}

                {/* CTA para abrir modal con detalle extendido */}
                <button type="button" onClick={onOpenFull} className="w-full mt-3 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide opacity-80">
                    {"Ver los pr\u00F3ximos 5 d\u00EDas"}
                </button>
            </div>
        </div>
    );
}
