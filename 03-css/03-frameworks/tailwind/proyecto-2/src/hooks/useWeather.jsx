// Con este hook obtenemos el clima actual Santiago de Chile
import { useEffect, useState } from "react";

const LAT = -33.45;
const LON = -70.66;

export function useWeather() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        )
            .then(res => res.json())
            .then(data => {
                setWeather({
                    temperature: Math.round(data.current_weather.temperature),
                    code: data.current_weather.weathercode,
                });
            })
            .catch(() => {
                setWeather(null);
            });
    }, []);
    return weather;
}