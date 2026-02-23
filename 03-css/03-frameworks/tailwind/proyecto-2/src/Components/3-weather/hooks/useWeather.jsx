import { useEffect, useMemo, useState } from "react";

function buildForecast(data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return data.daily.time
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
        .filter((day) => day.forecastDate >= today)
        .map(({ date, min, max, code }) => ({ date, min, max, code }));
}

function buildHourly24(data, nowDate = new Date()) {
    const now = new Date(nowDate);
    now.setMinutes(0, 0, 0); // redondear a hora

    return data.hourly.time
        .map((time, i) => ({
            time,
            temp: Math.round(data.hourly.temperature_2m[i]),
            code: data.hourly.weathercode[i],
            wind: Math.round(data.hourly.windspeed_10m[i]),
            dateObj: new Date(time),
        }))
        .filter((h) => h.dateObj >= now)
        .slice(0, 24)
        .map(({ time, temp, code, wind }) => ({ time, temp, code, wind }));
}

export function useWeather({
    lat,
    lon,
    city,
    country,
    refreshMinutes = 15, // API
}) {
    const [raw, setRaw] = useState(null); // guardamos data completa
    const [nowTick, setNowTick] = useState(Date.now()); // fuerza recálculo cada minuto

    // 1) Tick local cada minuto (NO API)
    useEffect(() => {
        const id = setInterval(() => setNowTick(Date.now()), 60_000);
        return () => clearInterval(id);
    }, []);

    // 2) Fetch API inicial + cada X minutos
    useEffect(() => {
        if (!lat || !lon) return;

        const controller = new AbortController();

        async function fetchWeather() {
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
                    { signal: controller.signal }
                );
                const data = await res.json();

                if (!data.current_weather || !data.daily || !data.hourly) {
                    setRaw(null);
                    return;
                }

                setRaw({
                    data,
                    meta: { city, country },
                    fetchedAt: Date.now(),
                });
            } catch (e) {
                if (e.name === "AbortError") return;
                setRaw(null);
            }
        }

        fetchWeather();

        const ms = Math.max(1, refreshMinutes) * 60_000;
        const id = setInterval(fetchWeather, ms);

        return () => {
            clearInterval(id);
            controller.abort();
        };
    }, [lat, lon, city, country, refreshMinutes]);

    // 3) Derivar “weather” final (recalcula hourly cada minuto)
    const weather = useMemo(() => {
        if (!raw) return null;

        const { data, meta, fetchedAt } = raw;

        const forecast = buildForecast(data);
        const hourly = buildHourly24(data, new Date(nowTick));

        return {
            temperature: Math.round(data.current_weather.temperature),
            code: Number(data.current_weather.weathercode),
            city: meta.city,
            country: meta.country,
            max: Math.round(data.daily.temperature_2m_max[0]),
            min: Math.round(data.daily.temperature_2m_min[0]),
            forecast,
            hourly,
            lastUpdated: fetchedAt,
        };
    }, [raw, nowTick]);

    return weather;
}