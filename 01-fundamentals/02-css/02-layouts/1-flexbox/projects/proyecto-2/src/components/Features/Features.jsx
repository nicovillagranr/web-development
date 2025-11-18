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
                    <i className="fa-solid fa-cog card__icon"></i>
                    <h3 className="card__title">Choosing a Service</h3>
                    <p className="card__description">Choosing an accountant that matches your needs</p>
                </div>

                <div className="card">
                    <i className="fa-solid fa-user card__icon"></i>
                    <h3 className="card__title">Our Clients Say</h3>
                    <p className="card__description">Read the reviews from some of our satisfied clients.</p>
                </div>

                <div className="card">
                    <i className="fa-solid fa-message card__icon"></i>
                    <h3 className="card__title">Initial Consulation</h3>
                    <p className="card__description">Undestanding your accountacy requirements.</p>
                </div>

                <div className="card">
                    <i className="fa-solid fa-phone card__icon"></i>
                    <h3 className="card__title">Request a Callback</h3>
                    <p className="card__description">Lets talk at a more convenient time for you</p>
                </div>
            </div>
        </section>
    )
}
export default Features