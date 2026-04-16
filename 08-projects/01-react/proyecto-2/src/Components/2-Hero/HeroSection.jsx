// Importamos useState para manejar el estado de la notificación
import { useState } from "react"

import "./HeroSection.css"

function HeroSection() {

    const [showNotice, setShowNotice] = useState(false)

    return (
        <section className="hero">
            <div className="hero__content">
                <h1 className="hero__title">Your favorite one page multi purpose template</h1>

                <p className="hero__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus voluptatem eos omnis sapiente perspiciatis alias recusandae maiores?</p>

                <button
                    type="button"
                    className="hero__button"
                    onClick={() => setShowNotice((current) => !current)}
                >Find Out More</button>

                {showNotice && (
                    <div className="hero__notice" role="status" aria-live="polite">
                        <p>
                            This is a demo project built to practice React, component
                            structure, and responsive CSS. Download is not available.
                        </p>
                    </div>
                )}
            </div>

        </section>
    )
}
export default HeroSection