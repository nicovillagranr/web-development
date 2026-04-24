import { API_URL } from "./config.js"

export const ProductCard = ({ producto }) => {
    return (
        <div className="flex flex-col gap-2">
            <img
                src={`${API_URL}${producto.image}`}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded-md hover:scale-105 transition-transform duration-500"
            />
            <h3 className="font-heading text-small font-semibold text-gray-900">{producto.nombre}</h3>
            <p className="font-body text-small font-semibold text-rose-500">{producto.precio}</p>
        </div>
    )
}
