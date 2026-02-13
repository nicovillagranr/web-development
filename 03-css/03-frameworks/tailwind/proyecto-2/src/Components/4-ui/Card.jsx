/**
 * Componente Card reutilizable.
 *
 * - Encapsula estilos comunes
 * - Acepta children
 * - Permite extender estilos y eventos vía props
 */
function Card({ children, className = "", ...props }) {
    return (
        <button
            type="button"
            className={`bg-white rounded-lg flex justify-center items-center shadow-md active:scale-98
            transition-transform duration-100 ${className}`}
            {...props}>
            {children}
        </button >
    );
}
export default Card;