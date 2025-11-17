import "./HomePage.css"

import Product from "../../assets/img/watch.png"

function HomePage() {
    return (
        <main className="main">
            <section className="hero">
                <div className="hero__title">
                    <h1 className="hero__title-h1">Best digital watch for your daily life</h1>
                    <p className="hero__title-p">Effects present letters inquiry no an removed or friend. Desire behind latter me though in. Supposing shameless am engrossed itatibus additions.</p>
                    <button className="title__button">Buy Now</button>
                </div>
                <div className="hero__product">
                    <img src={Product} alt="Product" className="product__img" />
                </div>
            </section>
        </main>
    )
}
export default HomePage;