// ================= IMPORTS =================
import { clampPercent } from "../../utils/metricFormatters.js";
import s from "./ProgressFooter.module.css";

// ================= COMPONENTE/FUNCION =================
// ProgressFooter: helper/componente interno; parametros: { percent, fillClass }
// Footer generico para barras de avance simples.
function ProgressFooter({ percent, fillClass }) {
    return (
        <div className={s["progress-footer"]}>
            {/* Barra principal */}
            <div className={s["progress-footer__bar-wrapper"]}>
                <div className={s["progress-footer__track"]}>
                    <div
                        className={`${s["progress-footer__fill"]} ${fillClass}`}
                        style={{ width: `${clampPercent(percent)}%` }}
                    />
                </div>
            </div>

            {/* Espaciador inferior para alinear cards entre si */}
            <div className={s["progress-footer__spacer"]} />
        </div>
    );
}

export default ProgressFooter;
