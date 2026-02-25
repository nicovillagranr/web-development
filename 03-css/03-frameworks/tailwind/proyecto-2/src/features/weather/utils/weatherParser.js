
// ================= FUNCION EXPORTADA =================
// parseWeather: utilidad exportada; parametros: code, isDay = true
export function parseWeather(code, isDay = true) {
    code = Number(code); // Aseguramos que el código sea un número

    if (code === 0) return { category: "clear", isDay };
    if (code === 1) return { category: "clear", isDay };

    if (code === 2) return { category: "cloudy", intensity: "medium", isDay };
    if (code === 3) return { category: "cloudy", intensity: "heavy", isDay };

    if ([45, 48].includes(code))
        return { category: "cloudy", intensity: "heavy", isDay };

    if ([51, 61].includes(code))
        return { category: "rain", intensity: "light", isDay };

    if ([53, 63].includes(code))
        return { category: "rain", intensity: "medium", isDay };

    if ([55, 65, 66, 67].includes(code))
        return { category: "rain", intensity: "heavy", isDay };

    if ([71, 73].includes(code))
        return { category: "snow", intensity: "light", isDay };

    if (code === 75)
        return { category: "snow", intensity: "medium", isDay };

    if (code === 77)
        return { category: "snow", intensity: "heavy", isDay };

    if (code >= 95)
        return { category: "storm", isDay };

    return { category: "cloudy", intensity: "medium", isDay };
}
