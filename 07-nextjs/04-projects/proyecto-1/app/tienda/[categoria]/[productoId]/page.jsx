import Link from "next/link"
import { getProducts, getProductById } from "@/data/products"

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(precio)

export async function generateStaticParams() {
  const products = getProducts()
  return products.map((p) => ({
    categoria: p.categoria,
    productoId: p.id,
  }))
}

export async function generateMetadata({ params }) {
  const { productoId } = await params
  const product = getProductById(productoId)

  return {
    title: `Falabella.com | ${product?.nombre ?? "Producto"}`,
    description: product?.descripcion ?? "",
  }
}

export default async function ProductoPage({ params }) {
  const { categoria, productoId } = await params
  const product = getProductById(productoId)

  if (!product) {
    return <p className="text-text-muted">Producto no encontrado.</p>
  }

  const categoriaLabel = categoria.charAt(0).toUpperCase() + categoria.slice(1)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/tienda" className="hover:text-accent">Tienda</Link>
        <span>/</span>
        <Link href={`/tienda/${categoria}`} className="hover:text-accent">
          {categoriaLabel}
        </Link>
        <span>/</span>
        <span className="text-text">{product.nombre}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="font-(family-name:--font-outfit) text-3xl font-bold leading-tight">
            {product.nombre}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-accent">
              {formatPrice(product.precio)}
            </span>
            {product.precioAnterior && (
              <span className="text-lg text-text-muted line-through">
                {formatPrice(product.precioAnterior)}
              </span>
            )}
          </div>

          <p className="mt-6 text-text-muted leading-relaxed">
            {product.descripcion}
          </p>

          <button className="mt-8 w-full rounded-lg bg-accent py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
            Agregar al carrito
          </button>

          <Link
            href={`/tienda/${categoria}`}
            className="mt-4 inline-block text-sm text-accent hover:underline"
          >
            ← Volver a {categoriaLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
