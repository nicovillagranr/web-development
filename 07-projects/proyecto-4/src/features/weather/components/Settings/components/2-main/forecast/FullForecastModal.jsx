// Imports de Icons
import { FiX } from "react-icons/fi";

// Import de componentes
import ForecastDayRow from "./ForecastDayRow.jsx";

// Import de utilidades
import { getGlobalMinMax } from "../../../utils/forecastMath.js";

// ================= COMPONENTE/FUNCION =================
// FullForecastModal: punto de entrada; recibe props/parametros: { forecast, isOpen, onClose }
export default function FullForecastModal({ forecast, isOpen, onClose }) {
    // Guard clause: sin datos no mostramos modal.
    if (!forecast?.length) return null;

    // Escala global compartida para todas las filas del modal.
    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    return (
        // Overlay: cierra modal al hacer click fuera del panel.
        <div onClick={onClose} className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "bg-black/40 backdrop-blur-sm opacity-100" : "opacity-0 pointer-events-none"}`}>


            {/* Panel modal: detiene propagacion para no cerrar al click interno */}
            <div onClick={(event) => event.stopPropagation()} className={`w-[90%] m-auto bg-slate-900 rounded-3xl p-5 transform transition-all duration-300 ease-out origin-center ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>

                {/* Header modal con boton de cierre */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium">Pronóstico de 5 días</h2>
                    <button type="button" aria-label="Cerrar pronóstico" onClick={onClose} className="text-base">
                        <FiX className="w-7 h-7" />
                    </button>
                </div>

                {/* Lista extendida: desde manana hasta quinto dia */}
                {forecast.slice(1, 6).map((day) => (
                    <ForecastDayRow
                        key={day.date}
                        day={day}
                        globalMin={globalMin}
                        globalMax={globalMax}
                    />
                ))}
            </div>

        </div>
    );
}