const API_URL = import.meta.env.VITE_API_URL

export const ProductCard = ({ producto, handleImageClick, agregarProducto }) => (
    <div className="group flex flex-col gap-3">
        <div className="overflow-hidden bg-stone-100 cursor-pointer">
            <img src={`${API_URL}${producto.image}`} alt={producto.nombre} onClick={() => handleImageClick(producto.id)} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90" />
        </div>
        <h3 className="font-body uppercase text-[11px] tracking-[0.18em] text-ink mt-1">{producto.nombre}</h3>
        <p className="font-body text-price text-ink -mt-2">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(producto.precio)}</p>
        <button onClick={() => agregarProducto(producto)} className="font-body text-small uppercase tracking-[0.22em] text-ink border border-ink py-2 hover:bg-ink hover:text-paper sm:hidden sm:group-hover:block transition-colors duration-200">
            Agregar al carrito
        </button>
    </div>
)
