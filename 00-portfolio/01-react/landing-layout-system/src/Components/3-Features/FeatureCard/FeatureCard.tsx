import "./FeatureCard.css"

interface FeatureCardProps {
    icon: string,
    title: string,
    text: string
}


function FeatureCard({ icon, title, text }: FeatureCardProps) {
    return (
        <article className="feature__card">
            <img src={icon} alt="" aria-hidden="true" className="feature__icon" />
            <h3 className="feature__card-title">{title}</h3>
            <p className="feature__card-text">{text}</p>
        </article>
    )
}
export default FeatureCard
