export const ProductInfo = ({ nombre, id, precio }) => {
    return (
        <div className="border-b border-gray-200 pb-6">
            <h1 className="font-heading text-title lg:text-4xl font-semibold text-gray-900 mb-2">
                {nombre}
            </h1>
            <p className="font-body text-small text-gray-500 mb-4">
                SKU: {id}
            </p>
            <p className="font-heading text-2xl lg:text-3xl font-semibold text-rose-500">
                ${precio}
            </p>
        </div>
    )
}
