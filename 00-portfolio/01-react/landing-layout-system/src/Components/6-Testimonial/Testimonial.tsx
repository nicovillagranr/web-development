import "./Testimonial.css";

import img from "../../assets/images/testimony/testimonial.webp";
function Testimonial() {
    return (
        <section className="testimonial" id="testimonial" aria-labelledby="testimonial-title">
            <h2 className="sr-only" id="testimonial-title">Testimonials</h2>
            <div className="testimonial__img-box">
                <img src={img} alt="Portrait of Susan Sims" className="testimonial__img" loading="lazy" decoding="async" />
            </div>

            <div className="testimonial__text-box">
                <blockquote className="testimonial__text">"Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Integer posuere erat a ante venenatis dapibus posuere velit aliquet..."</blockquote>
                <cite className="testimonial__author">Susan Sims, Interaction Designer at XYZ</cite>
            </div>
        </section>
    )
}
export default Testimonial;
