// ================= IMPORTS =================
import ForecastDayRow from "../ForecastDayRow";
import { getGlobalMinMax } from "../../../../utils/forecastMath.js";
import s from "./ForecastPreviewCard.module.css";

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
        <div className={s["forecast-preview"]}>
            <div className={s["forecast-preview__card"]}>
                {/* Titulo de la seccion preview */}
                <p className={s["forecast-preview__title"]}>{"Pron\u00F3stico de 5 d\u00EDas"}</p>

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
                <button type="button" onClick={onOpenFull} className={s["forecast-preview__cta"]}>
                    {"Ver los pr\u00F3ximos 5 d\u00EDas"}
                </button>
            </div>
        </div>
    );
}