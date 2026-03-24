"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCategories } from "@/data/products"

const categories = getCategories()

const links = [
  { href: "/tienda", label: "Todos" },
  ...categories.map((cat) => ({
    href: `/tienda/${cat.slug}`,
    label: cat.nombre,
  })),
]

export default function SidebarNav({ horizontal = false }) {
  const pathname = usePathname()

  return (
    <nav className={horizontal
      ? "flex gap-2 whitespace-nowrap pb-2"
      : "flex flex-col gap-1"
    }>
      {links.map(({ href, label }) => {
        const isActive =
          pathname === href || (href !== "/tienda" && pathname.startsWith(href))

        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-accent text-white"
                : "text-text-muted hover:bg-gray-100 hover:text-text"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
