// ================= IMPORTS =================
import Card from "./Card.jsx";


// ================= FUNCION =================
// CardTime: helper/componente interno; parametros: { time, onClick, className = "", ...props }
function CardTime({ time, onClick, className = "", ...props }) {
    // Render/retorno del bloque actual
    return (
        <Card as="button" className={`bg-[#2C2D3A] ${className}`} onClick={onClick} {...props}>
            <span className="text-2xl font-medium tracking-tight text-white">{time}</span>
        </Card>
    );
}
export default CardTime;
