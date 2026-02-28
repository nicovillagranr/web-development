// ================= IMPORTS =================
import { FiX } from "react-icons/fi";
import ForecastDayRow from "./ForecastDayRow.jsx";
import { getGlobalMinMax } from "../utils/forecastMath.js";


// ================= COMPONENTE/FUNCION =================
// FullForecastModal: punto de entrada; recibe props/parametros: { forecast, isOpen, onClose }
export default function FullForecastModal({ forecast, isOpen, onClose }) {
    if (!forecast?.length) return null;

    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    // Render/retorno del bloque actual
    return (
        // Blur overlay
        <div onClick={onClose} className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300
        ${isOpen ? "bg-black/40 backdrop-blur-sm opacity-100" : "opacity-0 pointer-events-none"}`}>

            {/* Modal */}
            <div onClick={(e) => e.stopPropagation()} className={`w-[90%] m-auto bg-slate-900 rounded-3xl p-5 transform transition-all duration-300 ease-out origin-center
                ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium">Pronóstico de 5 días</h2>
                    <button type="button" aria-label="Cerrar pronóstico" onClick={onClose} className="text-md">
                        <FiX className="w-7 h-7" />
                    </button>
                </div>

                {forecast.slice(1, 6).map((day, index) => (
                    <ForecastDayRow
                        key={day.date || index}
                        day={day}
                        globalMin={globalMin}
                        globalMax={globalMax}
                    />
                ))}
            </div>
        </div>
    );
}
