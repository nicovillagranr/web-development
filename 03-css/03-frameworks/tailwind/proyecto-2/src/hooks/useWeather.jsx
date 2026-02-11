import { useEffect, useState } from "react";

// Coordenadas de Santiago de Chile
const LAT = -33.45;
const LON = -70.66;

/**
 * Hook que obtiene el clima actual.
 *
 * - Llama a la API de Open-Meteo
 * - Normaliza los datos
 * - Maneja errores básicos
 */
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
