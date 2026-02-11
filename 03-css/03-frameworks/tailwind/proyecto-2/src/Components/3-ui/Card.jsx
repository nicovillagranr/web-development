/**
 * Componente Card reutilizable.
 *
 * - Encapsula estilos comunes
 * - Acepta children
 * - Permite extender estilos y eventos vía props
 */
function Card({ children, className = "", ...props }) {
    return (
        <div
            className={`bg-white rounded-lg flex justify-center items-center shadow-md ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
export default Card;