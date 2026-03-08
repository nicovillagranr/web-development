// ================= CONTEXTO MODULO =================
// Wrapper base de tarjetas.
// Permite render flexible via prop 'as' y aplica estilo comun de interaccion.

// ================= FUNCION =================
// Card: helper/componente interno; parametros: { children, className = "", as = "button", ...props }
function Card({ children, className = "", as = "button", ...props }) {
    const Component = as; // permite usar <div>, <button>, etc.
    // Render/retorno del bloque actual
    return (
        <Component className={`flex justify-center items-center rounded-lg shadow-md active:scale-96 transition-transform duration-100 ${className}`} {...props}>
            {children}
        </Component>
    );
}
export default Card;
