// ================= IMPORTS =================
import { clampPercent } from "../../utils/metricFormatters.js";

// ================= COMPONENTE/FUNCION =================
// PressureFooter: helper/componente interno; parametros: { percent }
// Footer especializado para presion:
// - linea vertical central = referencia media del rango
// - punto movil = valor actual normalizado
// - etiquetas 980 / 1040 = limites de escala
function PressureFooter({ percent }) {
    return (
        <div className="h-full grid grid-rows-[1fr_auto]">
            {/* Barra + referencias visuales */}
            <div className="flex items-end mt-2">
                <div className="relative h-1.5 w-full rounded-full bg-white/20">
                    {/* Marca central fija */}
                    <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/40" />

                    {/* Punto movil de valor actual */}
                    <span
                        className="absolute top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-200 border border-cyan-50 -translate-y-1/2"
                        style={{ left: `calc(${clampPercent(percent)}% - 5px)` }}
                    />
                </div>
            </div>

            {/* Etiquetas de rango */}
            <div className="mt-0.5 flex items-center justify-between text-[9px] leading-none opacity-70">
                <span>980</span>
                <span>1040</span>
            </div>
        </div>
    );
}

export default PressureFooter;
