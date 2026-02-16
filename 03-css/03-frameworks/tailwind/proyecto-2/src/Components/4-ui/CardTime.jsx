import Card from "./Card.jsx";

function CardTime({ time, onClick }) {
    return (
        <Card as="button" className="col-span-1 row-span-1 bg-white" onClick={onClick}>
            <span className="text-3xl font-medium tracking-tight">{time}</span>
        </Card>
    );
}
export default CardTime;