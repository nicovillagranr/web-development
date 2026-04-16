export default function TiendaLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
