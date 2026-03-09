import "../PortfolioItem/PortfolioItem.css"

function PortfolioItem({ img, name, text }) {
    return (
        <figure className="portfolio__item">
            <img src={img} alt={name} className="portfolio__item-img" loading="lazy" decoding="async" />
            <figcaption className="portfolio__item-hover">
                <h3 className="portfolio__item-name">{name}</h3>
                <p className="portfolio__item-text">{text}</p>
            </figcaption>
        </figure>
    )
}
export default PortfolioItem
