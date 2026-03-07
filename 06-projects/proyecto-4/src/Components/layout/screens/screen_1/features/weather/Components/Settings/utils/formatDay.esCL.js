// ================= FUNCION EXPORTADA =================
// formatWeekdayShortESCL: utilidad exportada; parametros: dateStr
// Convierte una fecha a dia abreviado en formato es-CL (ej: Lun, Mar, Mie).
export function formatWeekdayShortESCL(dateStr) {
    const dayName = new Date(dateStr).toLocaleDateString("es-CL", {
        weekday: "short",
    });

    // Normalizamos capitalizacion para mantener consistencia visual.
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}
