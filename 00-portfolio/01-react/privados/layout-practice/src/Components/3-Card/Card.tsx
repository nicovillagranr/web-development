import type { CSSProperties } from "react"

import "./Card.css"
import type { CardData } from "../../data/cardsData"

// `CSSProperties` es un catálogo cerrado: solo conoce las propiedades CSS
// estándar. `--delay` es una custom property que nos inventamos nosotros, así que
// hay que añadirla al catálogo extendiéndolo. Va entre comillas porque una clave
// con guion no es un identificador válido de JS.
interface CardStyle extends CSSProperties {
    "--delay"?: string
}

interface CardProps extends Omit<CardData, "id"> {
    style?: CardStyle
}

function Card({ icon, title, text, style }: CardProps) {
    return (
        <div className="box-2__card" style={style}>
            <span className="card__icon"><img src={icon} alt="" aria-hidden="true" className="card__icon-svg" /></span>
            <h2 className="card__title">{title}</h2>
            <p className="card__text">{text}</p>
        </div>
    )
}
export default Card
