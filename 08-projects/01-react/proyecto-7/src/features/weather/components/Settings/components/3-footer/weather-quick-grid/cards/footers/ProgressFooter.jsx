// ================= IMPORTS =================
import { clampPercent } from "../../utils/metricFormatters.js";

// ================= COMPONENTE/FUNCION =================
function ProgressFooter({ percent, fillClass }) {
    return (
        <div className="h-full grid grid-rows-[1fr_auto]">
            <div className="flex items-end mt-2">
                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div
                        className={`h-full rounded-full ${fillClass}`}
                        style={{ width: `${clampPercent(percent)}%` }}
                    />
                </div>
            </div>

            <div className="mt-0.5 h-2.5" />
        </div>
    );
}

export default ProgressFooter;
