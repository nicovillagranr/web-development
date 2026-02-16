import Card from "./Card.jsx";

function CardRecipe({ onClick }) {
    return (
        <Card as="button" className="col-span-1 row-span-2 bg-white flex flex-col text-center" onClick={onClick}>
            <span className="text-3xl font-light tracking-tight"></span>
        </Card>
    );
}
export default CardRecipe;