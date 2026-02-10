// Card componetizada para reutilizarla en diferentes partes de la App | Además recibe props para personalizar estilos y comportamientos
function Card({ children, className = "", ...props }) {
    return (
        <div className={`bg-white rounded-lg flex justify-center items-center shadow-md ${className}`}
            {...props}>
            {children}
        </div>
    );
}
export default Card;