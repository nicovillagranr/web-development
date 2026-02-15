/**
 * CardTime
 *
 * Tarjeta de hora, interactiva.
 */
function CardTime({ time, onClick }) {
    return (
        <button
            className="col-span-1 row-span-1 flex items-center justify-center cursor-pointer bg-white rounded-lg shadow-md active:scale-98 transition-transform duration-100"
            onClick={onClick}
        >
            <span className="text-3xl font-medium tracking-tight">{time}</span>
        </button>
    );
}

export default CardTime;
