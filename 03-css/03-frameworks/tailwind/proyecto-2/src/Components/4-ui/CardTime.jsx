import Card from "./Card.jsx";

function CardTime({ time, onClick }) {
    return (
        <Card as="button" className="col-span-1 row-span-1 bg-[#2C2D3A]" onClick={onClick}>
            <span className="text-3xl font-medium tracking-tight text-white">{time}</span>
        </Card>
    );
}
export default CardTime;