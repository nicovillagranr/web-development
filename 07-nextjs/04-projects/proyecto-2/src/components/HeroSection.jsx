import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="-mx-5 -mt-5 bg-accent px-5 py-12 sm:-mx-10 sm:-mt-10 sm:px-10 sm:py-20 text-white">
      <div className="max-w-2xl">
        <h1 className="font-(family-name:--font-outfit) text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Todo lo que necesitas en un solo lugar
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/80">
          Encuentra tecnología, moda, hogar y mucho más con los mejores precios
          y despacho a todo Chile.
        </p>
        <Link
          href="/tienda"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-bold text-accent transition-transform hover:-translate-y-0.5"
        >
          Ir a la tienda
        </Link>
      </div>
    </section>
  )
}
