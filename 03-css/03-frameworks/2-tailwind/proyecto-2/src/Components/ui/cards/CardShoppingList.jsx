// Import de Ícono de React Icons
import { FiShoppingCart } from "react-icons/fi";

// Import de Componente Card
import Card from "./Card.jsx";

// Cards para la sección de compras recomendadas
function CardShoppingList({ onClick, className = "", ...props }) {

    return (
        <Card as="button"
            className={`bg-linear-to-br from-cyan-400 to-sky-600 text-white flex flex-col items-center justify-center px-2 ${className}`}
            onClick={onClick} {...props}>
            <FiShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium tracking-wide">Lista de Compras Recomendada</span>
        </Card>
    );
}
export default CardShoppingList;