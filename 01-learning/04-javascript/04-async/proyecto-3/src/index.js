import { getWeather } from "./api/forecast.js";
import { weatherCodes } from "./constants/weatherCodes.js";
import {
    weatherDetailsElem,
    locationTxt,
    weatherConditionIcon,
    weatherConditionName,
    temperatureTxt,
    humidityTxt,
    windSpeedTxt,
    dailyForecastElem
} from "./dom/elements.js";

async function loadWeather() {
    try {
        const weather = await getWeather("Santiago");

        // Actualizar ubicación
        locationTxt.textContent = weather.name;

        // Actualizar datos actuales
        const current = weather.current;
        const isDay = current.is_day === 1;
        const weatherCode = weatherCodes[current.weather_code];

        weatherConditionName.textContent = weatherCode.name;
        temperatureTxt.textContent = Math.round(current.temperature_2m) + "°C";
        humidityTxt.textContent = current.relative_humidity_2m + "%";
        windSpeedTxt.textContent = Math.round(current.wind_speed_10m) + " km/h";

        // Actualizar ícono
        const icon = isDay ? weatherCode.icons.day : weatherCode.icons.night;
        weatherConditionIcon.src = `assets/${icon}`;

        // Actualizar pronóstico diario
        const daily = weather.daily;
        dailyForecastElem.innerHTML = "";

        for (let i = 0; i < daily.time.length; i++) {
            const day = daily.time[i];
            const maxTemp = daily.temperature_2m_max[i];
            const minTemp = daily.temperature_2m_min[i];
            const code = weatherCodes[daily.weather_code[i]];

            const dayCard = document.createElement("div");
            dayCard.className = "day-card";
            dayCard.innerHTML = `
                <p>${new Date(day).toLocaleDateString("es-ES", { weekday: "short" })}</p>
                <img src="assets/${code.icons.day}" alt="${code.name}" width="80" height="80">
                <p>${code.name}</p>
                <p>${Math.round(maxTemp)}°C / ${Math.round(minTemp)}°C</p>
            `;
            dailyForecastElem.appendChild(dayCard);
        }
    } catch (error) {
        console.error("Error al cargar el clima:", error);
        weatherDetailsElem.textContent = "Error al cargar el clima. Intenta más tarde.";
    }
}

// Cargar el clima al iniciar
loadWeather();
