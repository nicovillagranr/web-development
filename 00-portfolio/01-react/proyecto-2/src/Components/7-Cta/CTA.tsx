// Import de useState para controlar el estado de la notificación
import { useState } from "react"

// Import de estilos
import "./CTA.css"

function CTA() {
    const [showNotice, setShowNotice] = useState(false)

    return (
        <section className="cta__section" id="download">
            <div className="cta__container">
                <h2 className="cta__title">Want to explore this layout demo?</h2>
                <p className="cta__subtitle">
                    Demo project for frontend practice. No real download available.
                </p>

                <button
                    type="button"
                    className="cta__button"
                    onClick={() => setShowNotice((current) => !current)}
                >
                    View Demo Notice
                </button>

                {showNotice && (
                    <div className="cta__notice" role="status" aria-live="polite">
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
export default CTA