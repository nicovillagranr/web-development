
// ================= FUNCION EXPORTADA =================
// formatWeekdayShortESCL: utilidad exportada; parametros: dateStr
export function formatWeekdayShortESCL(dateStr) {
    const dayName = new Date(dateStr).toLocaleDateString("es-CL", {
        weekday: "short",
    });

    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}
