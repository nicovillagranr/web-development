// ================= IMPORTS =================
import ForecastDayRow from "../ForecastDayRow";
import { getGlobalMinMax } from "../../../../utils/forecastMath.js";

// ================= COMPONENTE/FUNCION =================
export default function ForecastPreviewCard({
    forecast,
    currentTemperature = null,
    onOpenFull,
}) {
    if (!forecast?.length) return null;

    const { globalMin, globalMax } = getGlobalMinMax(forecast);

    return (
        <div className="px-4 mt-8">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl px-5 py-3">
                <p className="text-sm opacity-80 mt-2">{"Pronóstico de 5 días"}</p>

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

                <button
                    type="button"
                    onClick={onOpenFull}
                    className="w-full mt-3 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-sm font-medium tracking-wide opacity-80"
                >
                    {"Ver los próximos 5 días"}
                </button>
            </div>
        </div>
    );
}
