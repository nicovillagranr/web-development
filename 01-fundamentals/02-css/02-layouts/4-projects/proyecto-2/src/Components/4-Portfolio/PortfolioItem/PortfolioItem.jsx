import "../PortfolioItem/PortfolioItem.css"

function PortfolioItem({ img, name, text }) {
    return (
        <div className="portfolio__item">
            <img src={img} alt="Portfolio Item" className="portfolio__item-img" />
            <div className="portfolio__item-hover">
                <h3 className="portfolio__item-name">{name}</h3>
                <p className="portfolio__item-text">{text}</p>
            </div>
        </div>
    )
}
export default PortfolioItem