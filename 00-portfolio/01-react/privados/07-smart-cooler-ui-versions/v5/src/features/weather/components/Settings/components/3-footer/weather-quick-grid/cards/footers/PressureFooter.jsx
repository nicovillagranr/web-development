// ================= IMPORTS =================
import { clampPercent } from "../../utils/metricFormatters.js";
import s from "./PressureFooter.module.css";

// ================= COMPONENTE/FUNCION =================
// PressureFooter: helper/componente interno; parametros: { percent }
// Footer especializado para presion:
// - linea vertical central = referencia media del rango
// - punto movil = valor actual normalizado
// - etiquetas 980 / 1040 = limites de escala
function PressureFooter({ percent }) {
    return (
        <div className={s["pressure-footer"]}>
            {/* Barra + referencias visuales */}
            <div className={s["pressure-footer__bar-wrapper"]}>
                <div className={s["pressure-footer__bar"]}>
                    {/* Marca central fija */}
                    <span className={s["pressure-footer__center-mark"]} />

                    {/* Punto movil de valor actual */}
                    <span
                        className={s["pressure-footer__dot"]}
                        style={{ left: `calc(${clampPercent(percent)}% - 5px)` }}
                    />
                </div>
            </div>

            {/* Etiquetas de rango */}
            <div className={s["pressure-footer__labels"]}>
                <span>980</span>
                <span>1040</span>
            </div>
        </div>
    );
}

export default PressureFooter;
