"use client"

import Link from "next/link"

const formatPrice = (precio) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(precio)

export default function ProductCard({ product }) {
  const { id, nombre, categoria, precio, precioAnterior, imagen } = product

  return (
    <Link
      href={`/tienda/${categoria}/${id}`}
      className="group block rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={imagen}
          alt={nombre}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-text leading-tight">{nombre}</h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-accent">{formatPrice(precio)}</span>
          {precioAnterior && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(precioAnterior)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
