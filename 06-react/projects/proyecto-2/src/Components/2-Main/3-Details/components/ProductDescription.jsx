export const ProductDescription = ({ descripcion }) => {
    return (
        <div>
            <h3 className="font-heading text-small font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Descripción
            </h3>
            <p className="font-body text-small text-gray-600 leading-relaxed">
                {descripcion || "Producto de alta calidad con acabados premium."}
            </p>
        </div>
    )
}
