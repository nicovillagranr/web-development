import "./FeatureCard.css"

// TODO(tipos): declara el tipo de estas 3 props y aplícalo al parámetro.
// Para saber qué tipo tiene cada una, mira quién las llama: FeaturesSection.tsx.
// `icon` llega de un `import ... from "*.svg"` — pasa el ratón por encima de ese
// import y TS te dice qué tipo le da Vite. No lo adivines: compruébalo.
function FeatureCard({ icon, title, text }) {
    return (
        <article className="feature__card">
            <img src={icon} alt={title || "Icono"} className="feature__icon" />
            <h3 className="feature__card-title">{title}</h3>
            <p className="feature__card-text">{text}</p>
        </article>
    )
}
export default FeatureCard
