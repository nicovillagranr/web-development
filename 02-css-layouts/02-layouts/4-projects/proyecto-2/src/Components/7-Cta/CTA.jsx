import "./CTA.css"

function CTA() {
    return (
        <section className="cta__section" id="download">
            <div className="cta__container">
                <h2 className="cta__title">Are you ready to start? Download now for Free!</h2>
                <p className="cta__subtitle">Fusce dapibus, tellus ac cursus commodo.</p>
                <a href="/download" className="cta__button" role="button">Get Started</a>
            </div>
        </section>
    )
}
export default CTA