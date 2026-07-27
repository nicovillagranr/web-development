import "./FeatureCard.css"

function FeatureCard({ icon, title, text }) {
    return (
        <article className="feature__card">
            <img src={icon} alt={title || "Icono"} className="feature__icon" />
            <h2 className="feature__card-title" >{title}</h2>
            <p className="feature__card-text">{text}</p>
        </article>
    )
}
export default FeatureCard