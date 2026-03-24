import ProductCard from "@/components/ProductCard"
import { getCategories, getProductsByCategory } from "@/data/products"

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({ categoria: cat.slug }))
}

export async function generateMetadata({ params }) {
  const { categoria } = await params
  const label = categoria.charAt(0).toUpperCase() + categoria.slice(1)

  return {
    title: `Falabella.com | Tienda - ${label}`,
    description: `Productos de la categoría ${label} en Falabella.com`,
  }
}

export default async function CategoriaPage({ params }) {
  const { categoria } = await params
  const products = getProductsByCategory(categoria)
  const label = categoria.charAt(0).toUpperCase() + categoria.slice(1)

  return (
    <>
      <h1 className="font-(family-name:--font-outfit) text-3xl font-bold mb-6">
        {label}
      </h1>

      {products.length === 0 ? (
        <p className="text-text-muted">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  )
}
