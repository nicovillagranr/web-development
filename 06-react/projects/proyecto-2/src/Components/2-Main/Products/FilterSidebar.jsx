const CATEGORIAS = ["Hombres", "Mujeres", "Niños"]
const TIPOS = ["Abrigos", "Ropa interior", "Calzado"]

const FilterGroup = ({ title, options }) => (
    <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="font-heading text-small font-semibold uppercase tracking-wide text-gray-700 mb-3">
            {title}
        </h3>
        {options.map((opt) => (
            <label
                key={opt}
                className="flex items-center gap-3 cursor-pointer text-small text-gray-600 hover:text-rose-500 transition-colors duration-200 py-1"
            >
                <input type="checkbox" className="w-4 h-4 accent-rose-500 cursor-pointer" />
                <span className="font-body select-none">{opt}</span>
            </label>
        ))}
    </div>
)

export const FilterSidebar = () => {
    return (
        <aside className="p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h2 className="font-heading text-subtitle font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Filtros
            </h2>
            <div className="flex flex-col gap-4">
                <FilterGroup title="Categorías" options={CATEGORIAS} />
                <FilterGroup title="Tipo de Producto" options={TIPOS} />
            </div>
        </aside>
    )
}
