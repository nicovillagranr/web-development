import { ProductCard } from "./ProductCard"

export const ProductGrid = ({ productos, error }) => {
    if (error) {
        return <p className="pt-6 font-body text-small text-red-600">{error}</p>
    }

    return (
        <div className="pt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {productos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
            ))}
        </div>
    )
}
