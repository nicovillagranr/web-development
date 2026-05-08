// ================= CONTEXTO MODULO =================
// Card de acceso rapido para tiempo.
// Muestra la hora actual y dispara navegacion a ajustes al hacer click.
// Importamos el molde Card
import Card from "./Card.jsx";

// CardTime es un componente que muestra una hora dentro de una tarjeta. Recibe la hora como prop y un onClick para manejar eventos de clic. Tambi�n acepta una clase adicional para personalizar su estilo.
function CardTime({ time, onClick, className = "", ...props }) {

    return (
        <Card as="button"
            className={`bg-[linear-gradient(145deg,_#0D111E_0%,_#141828_60%,_#0A0F1A_100%)] border border-white/[0.06] ${className}`}
            onClick={onClick} {...props}>
            <span className="text-3xl font-light tracking-tighter text-white tabular-nums">{time}</span>
        </Card>
    )
}
export default CardTime;