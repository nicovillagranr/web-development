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
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_55%)]" />

            <header className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold leading-tight text-white/95">{title}</h3>
                <span className="inline-flex items-center gap-0.5 text-[11px] text-white/80 shrink-0">
                    <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                </span>
            </header>

            <div className={`relative z-10 mt-2 flex-1 min-h-0 ${contentClassName}`}>
                {children}
            </div>
        </button>
    );
}

export default SystemPanelCard;
