import SidebarNav from "@/src/components/SidebarNav"

export default function TiendaLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Mobile: horizontal scroll de categorías */}
      <aside className="md:hidden overflow-x-auto -mx-5 px-5">
        <SidebarNav horizontal />
      </aside>

      {/* Desktop: sidebar vertical */}
      <aside className="hidden md:block w-56 shrink-0">
        <h2 className="font-(family-name:--font-outfit) text-xl font-bold mb-4">
          Categorías
        </h2>
        <SidebarNav />
      </aside>

      <section className="flex-1 min-w-0">{children}</section>
    </div>
  )
}
