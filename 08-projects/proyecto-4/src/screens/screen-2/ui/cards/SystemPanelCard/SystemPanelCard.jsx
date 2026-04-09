// ================= CONTEXTO MODULO =================
// Fila base ("strip") para módulos del panel del hogar.
// Estructura: barra de acento izquierda (color por estado) +
//             cabecera (icono, título, label de estado, flecha) +
//             slot de contenido variable.

// ================= IMPORTS =================
import { FiChevronRight } from "react-icons/fi";
import s from "./SystemPanelCard.module.css";

// ================= COMPONENT =================
// Props:
//   title        — nombre del módulo (uppercase)
//   icon         — componente de react-icons
//   accentClass  — clase Tailwind para la barra izquierda (ej: "bg-accent", "bg-amber-400")
//   statusLabel  — texto de estado mostrado en la derecha del header
//   statusClass  — clase de color para el statusLabel
//   onClick      — handler del botón
//   children     — contenido específico de cada módulo
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
            className={s["system-card"]}
            {...props}
        >
            <div className={s["system-card__row"]}>
                {/* Barra de acento: color indica estado del módulo */}
                <div className={`${s["system-card__accent"]} ${accentClass}`} />

                {/* Área de contenido */}
                <div className={s["system-card__content"]}>

                    {/* Cabecera del strip: icono + título + status + flecha */}
                    <div className={s["system-card__header"]}>
                        <div className={s["system-card__title-group"]}>
                            {Icon && <Icon className={s["system-card__icon"]} aria-hidden="true" />}
                            <span className={s["system-card__title"]}>
                                {title}
                            </span>
                        </div>
                        <div className={s["system-card__status-group"]}>
                            {statusLabel && (
                                <span className={`${s["system-card__status"]} ${statusClass}`}>
                                    {statusLabel}
                                </span>
                            )}
                            <FiChevronRight className={s["system-card__chevron"]} aria-hidden="true" />
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
