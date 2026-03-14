// ================= CONTEXTO MODULO =================
// Header reutilizable para pantallas de ajustes.
// Renderiza boton back y titulo de cada modulo de configuracion.
import { FiChevronLeft } from "react-icons/fi";

// ================= FUNCION =================
function SettingsHeader({ title, onBack }) {
    return (
        <header className="h-16 flex items-center px-4">
            <button onClick={onBack} className="flex items-center gap-3 w-fit" aria-label="Volver">
                <div className="w-10 h-10 flex items-center justify-center">
                    <FiChevronLeft size={22} />
                </div>
                <h2 className="text-lg font-medium">{title}</h2>
            </button>
        </header>
    );
}
export default SettingsHeader;
