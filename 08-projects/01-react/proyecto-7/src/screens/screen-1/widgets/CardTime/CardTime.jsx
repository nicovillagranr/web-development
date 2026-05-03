// ================= CONTEXTO MODULO =================
// Card de acceso rapido para tiempo.
// Muestra la hora actual y dispara navegacion a ajustes al hacer click.
// ================= IMPORTS =================
import Card from "../Card";

function CardTime({ time, onClick, className = "", ...props }) {
    return (
        <Card
            as="button"
            className={`bg-[#111626] border border-white/[0.06] ${className}`}
            onClick={onClick}
            {...props}
        >
            <span className="text-3xl font-light tracking-tighter text-white tabular-nums">{time}</span>
        </Card>
    );
}
export default CardTime;
