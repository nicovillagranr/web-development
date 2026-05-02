export const ProductActions = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-heading font-semibold py-3 px-4 rounded-md transition-colors duration-300 uppercase tracking-wide">
                Agregar al Carrito
            </button>
            <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-heading font-semibold py-3 px-4 rounded-md transition-colors duration-300 uppercase tracking-wide">
                Agregar a Favoritos
            </button>
        </div>
    )
}
