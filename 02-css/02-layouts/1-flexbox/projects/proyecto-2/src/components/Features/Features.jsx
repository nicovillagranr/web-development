import "./Features.css"

function Features() {
    return (
        <section className="features">
            <div className="features__title">
                <h2 className="features__title-h2">Our Features</h2>
                <p className="features__title-p">Unleash your creatively with a visual collaboration platorm that enables effective ideation.</p>
            </div>

            <div className="features__cards">
                <div className="card">
                    <i className="fa-solid fa-home"></i>
                    <h3 className="card__title">Easy to use</h3>
                </div>

                <div className="card">
                    <i className="fa-solid fa-home"></i>
                    <h3 className="card__title">Easy to use</h3>
                </div>

                <div className="card">
                    <i className="fa-solid fa-home"></i>
                    <h3 className="card__title">Easy to use</h3>
                </div>

                <div className="card">
                    <i className="fa-solid fa-home"></i>
                    <h3 className="card__title">Easy to use</h3>
                </div>
            </div>
        </section>
    )
}
export default Features