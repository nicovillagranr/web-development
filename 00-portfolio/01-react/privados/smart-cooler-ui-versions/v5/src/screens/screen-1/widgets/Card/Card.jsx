// ================= CONTEXTO MODULO =================
// Wrapper base de tarjetas.
// Permite render flexible via prop 'as' y aplica estilo comun de interaccion.
// ================= IMPORTS =================
import s from "./Card.module.css";

// ================= FUNCION =================
// Card: helper/componente interno; parametros: { children, className = "", as = "button", ...props }
function Card({ children, className = "", as = "button", ...props }) {
    const Component = as; // permite usar <div>, <button>, etc.
    // Render/retorno del bloque actual
    return (
        <Component className={`${s.card} ${className}`} {...props}>
            {children}
        </Component>
    );
}
export default Card;
