import ProductCard from "@/src/components/ProductCard"
import { getProducts } from "@/src/data/products"

export const metadata = {
  title: "Falabella.com | Tienda - Todos los productos",
  description: "Explora todos los productos disponibles en Falabella.com",
}

export default function TiendaPage() {
  const products = getProducts()

  return (
    <>
      <h1 className="font-(family-name:--font-outfit) text-3xl font-bold mb-6">
        Todos los productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
