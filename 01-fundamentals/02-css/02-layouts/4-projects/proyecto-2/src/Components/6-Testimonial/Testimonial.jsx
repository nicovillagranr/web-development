import "./Testimonial.css";

import img from "../../assets/images/testimony/testimonial.webp";
function Testimonial() {
    return (
        <section className="testimonial" id="testimonial">
            <div className="testimonial__img-box">
                <img src={img} alt=">Testimonial" className="testimonial__img" />
            </div>

            <div className="testimonial__text-box">
                <h4 className="testimonial__text">"Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Integer posuere erat a ante venenatis dapibus posuere velit aliquet..."</h4>
                <p className="testimonial__author">Susan Sims, Interaction Designer at XYZ</p>
            </div>
        </section>
    )
}
export default Testimonial;