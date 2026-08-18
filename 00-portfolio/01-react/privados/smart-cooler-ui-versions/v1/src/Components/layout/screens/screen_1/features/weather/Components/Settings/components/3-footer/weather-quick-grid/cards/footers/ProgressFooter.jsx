// ================= IMPORTS =================
import { clampPercent } from "../../utils/metricFormatters.js";

// ================= COMPONENTE/FUNCION =================
// ProgressFooter: helper/componente interno; parametros: { percent, fillClass }
// Footer generico para barras de avance simples.
function ProgressFooter({ percent, fillClass }) {
    return (
        <div className="h-full grid grid-rows-[1fr_auto]">
            {/* Barra principal */}
            <div className="flex items-end mt-2">
                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div
                        className={`h-full rounded-full ${fillClass}`}
                        style={{ width: `${clampPercent(percent)}%` }}
                    />
                </div>
            </div>

            {/* Espaciador inferior para alinear cards entre si */}
            <div className="mt-0.5 h-2.5" />
        </div>
    );
}

export default ProgressFooter;
