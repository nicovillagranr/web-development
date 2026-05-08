// ================= CONTEXTO MODULO =================
// Card de acceso a lista inteligente.
// Muestra CTA visual para abrir recomendaciones de compras.
// Import de Ícono de React Icons
import { FiShoppingCart } from "react-icons/fi";

// Import de Componente Card
import Card from "./Card.jsx";

// Cards para la sección de compras recomendadas
function CardShoppingList({ onClick, className = "", ...props }) {

    return (
        <Card as="button"
            className={`bg-[linear-gradient(145deg,_#051A2A_0%,_#071E30_100%)] border border-cyan-400/[0.18] text-white flex flex-col items-center justify-center px-2 gap-1.5 ${className}`}
            onClick={onClick} {...props}>
            <div className="w-8 h-8 rounded-full bg-cyan-400/10 flex items-center justify-center border border-cyan-400/20">
                <FiShoppingCart className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-[11px] font-medium tracking-wide text-white/70 text-center leading-tight">Lista de<br/>Compras</span>
        </Card>
    );
}
export default CardShoppingList;