export function parseWeather(code) {
    // 🌤 Clear
    if (code === 0) {
        return { category: "clear" };
    }

    // ☁ Cloudy
    if (code === 1) {
        return { category: "cloudy", intensity: "light" };
    }

    if (code === 2) {
        return { category: "cloudy", intensity: "medium" };
    }

    if (code === 3) {
        return { category: "cloudy", intensity: "heavy" };
    }

    // 🌫 Fog
    if ([45, 48].includes(code)) {
        return { category: "mist" };
    }

    // 🌧 Rain
    if ([51, 61].includes(code)) {
        return { category: "rain", intensity: "light" };
    }

    if ([53, 63].includes(code)) {
        return { category: "rain", intensity: "medium" };
    }

    if ([55, 65, 66, 67].includes(code)) {
        return { category: "rain", intensity: "heavy" };
    }

    // ❄ Snow
    if ([71, 73].includes(code)) {
        return { category: "snow", intensity: "light" };
    }

    if (code === 75) {
        return { category: "snow", intensity: "medium" };
    }

    if (code === 77) {
        return { category: "snow", intensity: "heavy" };
    }

    // ⛈ Storm
    if (code >= 95) {
        return { category: "storm" };
    }

    return { category: "cloudy", intensity: "medium" };
}