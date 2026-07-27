// ================= PARSER WEATHER CODES =================
// Este archivo traduce los codigos numericos de Open-Meteo a un modelo
// simple que consume la UI:
// - category: familia climatica (clear, cloudy, rain, snow, storm)
// - intensity: nivel visual (light, medium, heavy) cuando aplica
// - isDay: bandera dia/noche para iconos y gradientes

// ================= FUNCION EXPORTADA =================
// parseWeather: utilidad exportada; parametros: code, isDay = true
export function parseWeather(code, isDay = true) {
    // Normalizamos por seguridad para evitar comparaciones invalidas.
    code = Number(code);

    // Grupo: cielo despejado.
    if (code === 0) return { category: "clear", isDay };
    if (code === 1) return { category: "clear", isDay };

    // Grupo: nubosidad.
    if (code === 2) return { category: "cloudy", intensity: "medium", isDay };
    if (code === 3) return { category: "cloudy", intensity: "heavy", isDay };
    if ([45, 48].includes(code)) {
        return { category: "cloudy", intensity: "heavy", isDay };
    }

    // Grupo: lluvia (incluye llovizna y lluvia moderada/fuerte).
    if ([51, 61].includes(code)) {
        return { category: "rain", intensity: "light", isDay };
    }
    if ([53, 63].includes(code)) {
        return { category: "rain", intensity: "medium", isDay };
    }
    if ([55, 65, 66, 67].includes(code)) {
        return { category: "rain", intensity: "heavy", isDay };
    }

    // Grupo: nieve.
    if ([71, 73].includes(code)) {
        return { category: "snow", intensity: "light", isDay };
    }
    if (code === 75) {
        return { category: "snow", intensity: "medium", isDay };
    }
    if (code === 77) {
        return { category: "snow", intensity: "heavy", isDay };
    }

    // Grupo: tormenta electrica.
    if (code >= 95) return { category: "storm", isDay };

    // Fallback defensivo para codigos desconocidos.
    return { category: "cloudy", intensity: "medium", isDay };
}
