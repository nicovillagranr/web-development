
import "./Card.css"
function Card({ icon, title, text }) {
    return (
        <div className="box-2__card">
            <span className="card__icon">{icon}</span>
            <h2 className="card__title">{title}</h2>
            <p className="card__text">{text}</p>
        </div>
    )
}
export default Card