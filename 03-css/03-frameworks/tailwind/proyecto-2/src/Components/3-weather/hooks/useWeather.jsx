import { useEffect, useState } from "react";

export function useWeather({ lat, lon, city, country }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        )
            .then(res => res.json())
            .then(data => {
                if (!data.current_weather || !data.daily) return;

                // 🔹 1. Normalizamos la fecha de hoy
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // 🔹 2. Construimos el forecast filtrando desde hoy en adelante
                const filteredForecast = data.daily.time
                    .map((date, i) => {
                        const forecastDate = new Date(date);
                        forecastDate.setHours(0, 0, 0, 0);

                        return {
                            date,
                            min: Math.round(data.daily.temperature_2m_min[i]),
                            max: Math.round(data.daily.temperature_2m_max[i]),
                            code: data.daily.weathercode[i],
                            forecastDate,
                        };
                    })
                    .filter(day => day.forecastDate >= today)
                    .map(({ date, min, max, code }) => ({
                        date,
                        min,
                        max,
                        code,
                    }));

                // 🔹 3. Seteamos estado limpio
                setWeather({
                    temperature: Math.round(data.current_weather.temperature),
                    code: Number(data.current_weather.weathercode),
                    city,
                    country,

                    max: Math.round(data.daily.temperature_2m_max[0]),
                    min: Math.round(data.daily.temperature_2m_min[0]),

                    forecast: filteredForecast
                });
            })
            .catch(() => {
                setWeather(null);
            });

    }, [lat, lon, city, country]);

    return weather;
}