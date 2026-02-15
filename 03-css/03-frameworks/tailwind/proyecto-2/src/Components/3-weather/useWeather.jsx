import { useEffect, useState } from "react";

export function useWeather({ lat, lon, city, country }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!lat || !lon) return;

        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        )
            .then(res => res.json())
            .then(data => {
                if (!data.current_weather) return;

                setWeather({
                    temperature: Math.round(data.current_weather.temperature),
                    code: data.current_weather.weathercode,
                    city,
                    country,
                });
            })
            .catch(() => {
                setWeather(null);
            });
    }, [lat, lon, city, country]);

    return weather;
}
