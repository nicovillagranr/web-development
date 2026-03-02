// Importamos el molde Card
import Card from "./Card.jsx";

// CardTime es un componente que muestra una hora dentro de una tarjeta. Recibe la hora como prop y un onClick para manejar eventos de clic. También acepta una clase adicional para personalizar su estilo.
function CardTime({ time, onClick, className = "", ...props }) {

    return (
        <Card as="button" className={`bg-[#2C2D3A] ${className}`} onClick={onClick} {...props}>
            <span className="text-2xl font-medium tracking-tight text-white">{time}</span>
        </Card>
    )
}
export default CardTime;