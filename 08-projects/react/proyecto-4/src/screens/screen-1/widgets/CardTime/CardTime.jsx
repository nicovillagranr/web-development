// ================= CONTEXTO MODULO =================
// Card de acceso rapido para tiempo.
// Muestra la hora actual y dispara navegacion a ajustes al hacer click.
// ================= IMPORTS =================
import Card from "../Card";
import s from "./CardTime.module.css";

// CardTime es un componente que muestra una hora dentro de una tarjeta. Recibe la hora como prop y un onClick para manejar eventos de clic. También acepta una clase adicional para personalizar su estilo.
function CardTime({ time, onClick, className = "", ...props }) {

    return (
        <Card as="button"
            className={`${s["card-time"]} ${className}`}
            onClick={onClick} {...props}>
            <span className={s["card-time__time"]}>{time}</span>
        </Card>
    )
}
export default CardTime;