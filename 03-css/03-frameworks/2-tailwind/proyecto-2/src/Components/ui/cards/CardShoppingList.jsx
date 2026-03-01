// Import de Ícono de React Icons
import { FiShoppingCart } from "react-icons/fi";

// Import de Componente Card
import Card from "./Card.jsx";

// Cards para la sección de compras recomendadas
function CardShoppingList({ onClick, className = "", ...props }) {
    // Render/retorno del bloque actual
    return (
        <Card
            as="button"
            className={`bg-linear-to-br from-cyan-400 to-sky-600 text-white flex flex-col items-center justify-center ${className}`}
            onClick={onClick}
            {...props}
        >
            <FiShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-sm font-medium tracking-wide">Compras</span>
        </Card>
    );
}

export default CardShoppingList;
