export const CatalogHeader = ({ orden, handleOrdenChange }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-gray-200">

            <div className="flex flex-col gap-1">
                <span className="font-body text-small text-gray-500 uppercase tracking-wide">
                    Catálogo
                </span>
                <h2 className="font-heading text-subtitle sm:text-title font-semibold text-gray-900">
                    Todas las colecciones
                </h2>
            </div>

            <label className="flex items-center gap-2 font-body text-small text-gray-600 shrink-0">
                <span className="uppercase tracking-wide text-gray-500">Ordenar por</span>

                <select
                    value={orden}
                    onChange={handleOrdenChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-small text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:border-rose-500 cursor-pointer transition-colors duration-200">
                    <option value="relevance">Relevancia</option>
                    <option value="price-low-high">Precio: Menor a mayor</option>
                    <option value="price-high-low">Precio: Mayor a menor</option>
                    <option value="newest">Novedades</option>
                </select>

            </label>
        </div>
    )
}
