// ================= CONTEXTO MODULO =================
// Wrapper base de tarjetas.
// Permite render flexible via prop 'as' y aplica estilo comun de interaccion.

// ================= FUNCION =================
function Card({ children, className = "", as = "button", ...props }) {
    const Component = as;
    return (
        <Component
            className={`flex justify-center items-center rounded-xl shadow-lg active:scale-[0.96] transition-all duration-150 ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}
export default Card;
