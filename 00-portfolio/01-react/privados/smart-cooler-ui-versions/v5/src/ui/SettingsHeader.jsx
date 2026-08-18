// ================= CONTEXTO MODULO =================
// Header reutilizable para pantallas de ajustes.
// Renderiza boton back y titulo de cada modulo de configuracion.
import { FiChevronLeft } from "react-icons/fi";
import s from "./SettingsHeader.module.css";

// ================= FUNCION =================
function SettingsHeader({ title, onBack }) {
    return (
        <header className={s["settings-header"]}>
            <button onClick={onBack} className={s["settings-header__button"]} aria-label="Volver">
                <div className={s["settings-header__icon"]}>
                    <FiChevronLeft size={22} />
                </div>
                <h2 className={s["settings-header__title"]}>{title}</h2>
            </button>
        </header>
    );
}
export default SettingsHeader;