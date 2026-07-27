// ================= CONTEXTO MODULO =================
// Fila base ("strip") para módulos del panel del hogar.
// Estructura: barra de acento izquierda (color por estado) +
//             cabecera (icono, título, label de estado, flecha) +
//             slot de contenido variable.

// ================= IMPORTS =================
import { FiChevronRight } from "react-icons/fi";

// ================= COMPONENT =================
// Props:
//   title        — nombre del módulo (uppercase)
//   icon         — componente de react-icons
//   accentClass  — clase Tailwind para la barra izquierda (ej: "bg-accent", "bg-amber-400")
//   statusLabel  — texto de estado mostrado en la derecha del header
//   statusClass  — clase de color para el statusLabel
//   onClick      — handler del botón
//   animDelay    — delay en ms para la animación de entrada escalonada
//   children     — contenido específico de cada módulo
function SystemPanelCard({
    title,
    icon: Icon,
    accentClass = "bg-accent",
    statusLabel,
    statusClass = "text-accent/80",
    onClick,
    animDelay = 0,
    children,
    ...props
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-disabled={!onClick}
            style={{ animationDelay: `${animDelay}ms` }}
            className="wizard-enter w-full text-left rounded-xl border border-white/6 bg-surface/40 overflow-hidden active:scale-[0.98] transition-transform duration-150"
            {...props}
        >
            <div className="flex">
                {/* Barra de acento: color indica estado del módulo */}
                <div className={`w-[3px] self-stretch shrink-0 ${accentClass}`} />

                {/* Área de contenido */}
                <div className="flex-1 px-3 py-3">

                    {/* Cabecera del strip: icono + título + status + flecha */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                            {Icon && <Icon className="w-3 h-3 text-white/35" aria-hidden="true" />}
                            <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-medium">
                                {title}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {statusLabel && (
                                <span className={`text-[10px] font-medium ${statusClass}`}>
                                    {statusLabel}
                                </span>
                            )}
                            <FiChevronRight className="w-3 h-3 text-white/20" aria-hidden="true" />
                        </div>
                    </div>

                    {/* Contenido dinámico inyectado por cada card */}
                    {children}

                </div>
            </div>
        </button>
    );
}
export default SystemPanelCard;
