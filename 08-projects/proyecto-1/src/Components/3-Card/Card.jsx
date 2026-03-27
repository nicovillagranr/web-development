
import "./Card.css"
function Card({ icon, title, text, style }) {
    return (
        <div className="box-2__card" style={style}>
            <span className="card__icon"><img src={icon} alt="" aria-hidden="true" className="card__icon-svg" /></span>
            <h2 className="card__title">{title}</h2>
            <p className="card__text">{text}</p>
        </div>
    )
}
export default Card