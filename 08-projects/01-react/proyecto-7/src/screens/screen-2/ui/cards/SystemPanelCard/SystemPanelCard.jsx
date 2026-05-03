// ================= CONTEXTO MODULO =================
// Fila base ("strip") para módulos del panel del hogar.
// Estructura: barra de acento izquierda (color por estado) +
//             cabecera (icono, título, label de estado, flecha) +
//             slot de contenido variable.

// ================= IMPORTS =================
import { FiChevronRight } from "react-icons/fi";

// ================= COMPONENT =================
function SystemPanelCard({
    title,
    icon: Icon,
    accentClass = "bg-accent",
    statusLabel,
    statusClass = "text-accent/80",
    onClick,
    children,
    ...props
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-disabled={!onClick}
            className="w-full text-left rounded-xl border border-white/[0.06] bg-surface/40 shadow-lg overflow-hidden active:scale-[0.98] transition-transform duration-150"
            {...props}
        >
            <div className="flex">
                <div className={`w-[3px] self-stretch shrink-0 ${accentClass}`} />

                <div className="flex-1 px-3 py-3">

                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                            {Icon && <Icon className="w-3 h-3 text-white/35" aria-hidden="true" />}
                            <span className="text-[12px] uppercase tracking-[0.16em] text-white/40 font-medium">
                                {title}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {statusLabel && (
                                <span className={`text-[12px] font-medium ${statusClass}`}>
                                    {statusLabel}
                                </span>
                            )}
                            <FiChevronRight className="w-3 h-3 text-white/20" aria-hidden="true" />
                        </div>
                    </div>

                    {children}

                </div>
            </div>
        </button>
    );
}
export default SystemPanelCard;
