// ================= FUNCION EXPORTADA =================
// formatWeekdayShortESCL: utilidad exportada; parametros: dateStr ("YYYY-MM-DD")
// Convierte una fecha a dia abreviado en formato es-CL (ej: Lun, Mar, Mie).
export function formatWeekdayShortESCL(dateStr) {
    // Sin hora, "YYYY-MM-DD" se lee en UTC: en Chile caeria el dia anterior a las 21:00.
    // Con "T00:00" se lee en hora local.
    const dayName = new Date(`${dateStr}T00:00`).toLocaleDateString("es-CL", {
        weekday: "short",
    });

    // Normalizamos capitalizacion para mantener consistencia visual.
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
}
