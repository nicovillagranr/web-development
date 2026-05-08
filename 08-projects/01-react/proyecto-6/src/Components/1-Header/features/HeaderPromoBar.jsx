import { FiTruck, FiMapPin } from "react-icons/fi"

export const HeaderPromoBar = () => {
    return (
        <div className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-900 px-4 sm:px-6 lg:px-10 py-1.5">
            <div className="flex items-center justify-between text-[11px] tracking-wide text-stone-600 dark:text-stone-300">
                <span className="flex items-center gap-1.5">
                    <FiTruck className="text-camel shrink-0" size={13} />
                    Por compras sobre $500.000 envío gratis
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                    <FiMapPin className="text-camel shrink-0" size={12} />
                    Buscar tiendas&nbsp;<span className="text-stone-400 dark:text-stone-600">|</span>&nbsp;Santiago, Chile
                </span>
            </div>
        </div>
    )
}
