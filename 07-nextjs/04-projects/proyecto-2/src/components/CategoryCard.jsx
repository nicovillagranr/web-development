import Link from "next/link"

export default function CategoryCard({ category }) {
  const { slug, nombre, descripcion, imagen } = category

  return (
    <Link
      href={`/tienda/${slug}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-text">{nombre}</h3>
        <p className="text-sm text-text-muted mt-1">{descripcion}</p>
      </div>
    </Link>
  )
}
