// ================= IMPORTS =================
import { FiX } from "react-icons/fi";
import ForecastDayRow from "../ForecastDayRow";
import { getGlobalMinMax } from "../../../../utils/forecastMath.js";
import s from "./FullForecastModal.module.css";

// ================= COMPONENTE/FUNCION =================
// FullForecastModal: punto de entrada; recibe props/parametros: { forecast, isOpen, onClose }
export default function FullForecastModal({ forecast, isOpen, onClose }) {
    // Guard clause: sin datos no mostramos modal.
    if (!forecast?.length) return null;

    // Escala global compartida para todas las filas del modal.
    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    return (
        // Overlay: cierra modal al hacer click fuera del panel.
        <div onClick={onClose} className={`${s["forecast-modal__overlay"]} ${isOpen ? s["forecast-modal__overlay--open"] : s["forecast-modal__overlay--closed"]}`}>

            {/* Panel modal: detiene propagacion para no cerrar al click interno */}
            <div onClick={(event) => event.stopPropagation()} className={`${s["forecast-modal__panel"]} ${isOpen ? s["forecast-modal__panel--open"] : s["forecast-modal__panel--closed"]}`}>

                {/* Header modal con boton de cierre */}
                <div className={s["forecast-modal__header"]}>
                    <h2 className={s["forecast-modal__title"]}>Pronóstico de 5 días</h2>
                    <button type="button" aria-label="Cerrar pronóstico" onClick={onClose} className={s["forecast-modal__close-btn"]}>
                        <FiX className={s["forecast-modal__close-icon"]} />
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