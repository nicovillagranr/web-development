// ================= IMPORTS =================
import { FiMusic } from "react-icons/fi";
import Card from "./Card.jsx";

// ================= FUNCION =================
// CardMusic: helper/componente interno; parametros: { onClick, className = "", ...props }
function CardMusic({ onClick, className = "", ...props }) {
    // Render/retorno del bloque actual
    return (
        <Card
            as="button"
            className={`bg-linear-to-br from-emerald-400 to-emerald-600 text-white flex flex-col items-center justify-center ${className}`}
            onClick={onClick}
            {...props}
        >
            <FiMusic className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium tracking-wide">Musica</span>
        </Card>
    );
}

export default CardMusic;
