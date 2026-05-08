// ================= IMPORTS =================
import { FiX } from "react-icons/fi";
import ForecastDayRow from "../ForecastDayRow";
import { getGlobalMinMax } from "../../../../utils/forecastMath.js";

const OVERLAY_BASE = "absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300";
const PANEL_BASE = "w-[90%] m-auto bg-slate-900 rounded-3xl p-5 transform transition-all duration-300 ease-out origin-center";

// ================= COMPONENTE/FUNCION =================
export default function FullForecastModal({ forecast, isOpen, onClose }) {
    if (!forecast?.length) return null;

    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    return (
        <div
            onClick={onClose}
            className={`${OVERLAY_BASE} ${isOpen ? "bg-black/40 backdrop-blur-sm opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`${PANEL_BASE} ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
            >
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium">Pronóstico de 5 días</h2>
                    <button type="button" aria-label="Cerrar pronóstico" onClick={onClose} className="text-base">
                        <FiX className="w-7 h-7" />
                    </button>
                </div>

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
