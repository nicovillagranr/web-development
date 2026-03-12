// ================= CONTEXTO MODULO =================
// Molde base para tarjetas del panel de manejo de casa.
// Mantiene header fijo (titulo + flecha) y expone contenido dinamico.

// ================= IMPORTS =================
import { FiChevronRight } from "react-icons/fi";

// ================= COMPONENT =================
function SystemPanelCard({
    title,
    onClick,
    className = "",
    contentClassName = "",
    children,
    ...props
}) {
    const isInteractive = typeof onClick === "function";

    return (
        <button
            type="button"
            onClick={onClick}
            aria-disabled={!isInteractive}
            className={`relative h-35 rounded-2xl border border-white/[0.10] bg-linear-to-b from-white/[0.10] via-white/[0.06] to-white/[0.03] p-3 text-left transition-transform duration-200 flex flex-col overflow-hidden ${isInteractive ? "active:scale-[0.96]" : "cursor-default"} ${className}`}
            {...props}
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_55%)]" />

            <header className="flex items-center justify-between gap-2">
                <h3 className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-medium">{title}</h3>
                {isInteractive && (
                    <FiChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" aria-hidden="true" />
                )}
            </header>

            <div className={`relative z-10 mt-2 flex-1 min-h-0 ${contentClassName}`}>
                {children}
            </div>
        </button>
    );
}

export default SystemPanelCard;
