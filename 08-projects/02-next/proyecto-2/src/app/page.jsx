import HeroSection from "@/src/components/HeroSection"
import CategoryCard from "@/src/components/CategoryCard"
import ProductCard from "@/src/components/ProductCard"
import { getCategories, getFeaturedProducts } from "@/src/data/products"

export const metadata = {
  title: "Falabella.com | Todo lo que necesitas en un solo lugar",
  description: "Encuentra tecnología, moda, hogar y más en Falabella.com",
}

export default function HomePage() {
  const categories = getCategories()
  const featured = getFeaturedProducts()

  return (
    <>
      <HeroSection />

      {/* Categorías */}
      <section className="mt-12">
        <h2 className="font-(family-name:--font-outfit) text-2xl font-bold mb-6">
          Categorías
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="mt-12">
        <h2 className="font-(family-name:--font-outfit) text-2xl font-bold mb-6">
          Productos destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
