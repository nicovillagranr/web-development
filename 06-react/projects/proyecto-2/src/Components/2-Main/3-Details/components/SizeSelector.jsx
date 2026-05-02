const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

export const SizeSelector = ({ selectedSize, onSelect }) => {
    return (
        <div>
            <h3 className="font-heading text-small font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Seleccionar Talla
            </h3>
            <div className="grid grid-cols-4 gap-3">
                {SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => onSelect(size)}
                        className={`py-3 px-2 rounded-md font-heading font-semibold text-small uppercase tracking-wide transition-all duration-300 border-2 ${selectedSize === size
                            ? "border-rose-500 bg-rose-50 text-rose-600"
                            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    )
}
