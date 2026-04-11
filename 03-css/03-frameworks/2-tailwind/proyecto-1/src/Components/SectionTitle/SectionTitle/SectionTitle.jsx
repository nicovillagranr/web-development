import "./SectionTitle.css"

function SectionTitle({ title, className = "" }) {
    return (
        <>
            <h2 className={`section-title ${className}`}>{title}</h2>

            <div className="section-title__decoration" aria-hidden="true">
                <span className="section-title__line"></span>
                <span className="section-title__dot"></span>
                <span className="section-title__line"></span>
            </div>
        </>
    )
}

export default SectionTitle
