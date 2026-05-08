// Hook central de Weather:
// - consulta APIs de clima y calidad del aire
// - normaliza la data para componentes UI
// - expone estados de loading/error + refresh manual
// ================= IMPORTS =================
// useState: guarda estados locales (raw, loading, error, refresh)
// useEffect: orquesta efectos (reloj interno + fetch/polling)
// useMemo: transforma respuesta API a modelo listo para UI
// useCallback: expone refresh estable para evitar renders innecesarios
import { useCallback, useEffect, useMemo, useState } from "react";

// ================= HELPERS INTERNOS =================

// resolveIsDayValue: normaliza el dato dia/noche de la API.
// La API puede traer 1/0, true/false o valor indefinido.
// Si viene indefinido, inferimos con hora local del timestamp.
function resolveIsDayValue(rawIsDay, timeValue) {
    if (rawIsDay === 1 || rawIsDay === true) return true;
    if (rawIsDay === 0 || rawIsDay === false) return false;

    const hour = new Date(timeValue).getHours();
    return hour >= 7 && hour < 20;
}

// buildForecast: toma el bloque "daily" y devuelve un arreglo simple
// consumible por UI (date, min, max, code), filtrando dias pasados.
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

// buildHourly24: arma las proximas 24 horas desde "hourly".
// Incluye temp, codigo, viento e indicador dia/noche para iconos.
function buildHourly24(data, nowDate = new Date()) {
    const now = new Date(nowDate);
    now.setMinutes(0, 0, 0);

    return data.hourly.time
        .map((time, i) => ({
            time,
            temp: Math.round(data.hourly.temperature_2m[i]),
            code: data.hourly.weathercode[i],
            isDay: resolveIsDayValue(data.hourly.is_day?.[i], time),
            wind: Math.round(data.hourly.windspeed_10m[i]),
            dateObj: new Date(time),
        }))
        .filter((h) => h.dateObj >= now)
        .slice(0, 24)
        .map(({ time, temp, code, isDay, wind }) => ({ time, temp, code, isDay, wind }));
}

// resolveHourlyIndex: busca el indice horario mas cercano al "current_weather.time".
// Si no existe match exacto, intenta con la hora actual y como ultimo recurso usa 0.
function resolveHourlyIndex(times, currentTime) {
    if (!times.length) {
        return -1;
    }

    let index = currentTime ? times.indexOf(currentTime) : -1;

    if (index < 0) {
        const now = new Date();
        now.setMinutes(0, 0, 0);
        index = times.findIndex((t) => new Date(t) >= now);
        if (index < 0) index = 0;
    }

    return index;
}

// buildCurrentMetrics: deriva metricas "actuales" desde series horarias.
// Combina datos meteorologicos + calidad de aire y calcula UV acumulado del dia.
function buildCurrentMetrics(data, airData) {
    const times = data.hourly?.time || [];
    if (!times.length) {
        return {
            uvIndex: null,
            humidity: null,
            feelsLike: null,
            pressure: null,
            aqi: null,
            uvDayScore: null,
        };
    }

    const index = resolveHourlyIndex(times, data.current_weather?.time);
    if (index < 0) {
        return {
            uvIndex: null,
            humidity: null,
            feelsLike: null,
            pressure: null,
            aqi: null,
            uvDayScore: null,
        };
    }

    const uvRaw = data.hourly?.uv_index?.[index];
    const humidityRaw = data.hourly?.relative_humidity_2m?.[index];
    const feelsLikeRaw = data.hourly?.apparent_temperature?.[index];
    const pressureRaw = data.hourly?.surface_pressure?.[index];

    const aqiTimes = airData?.hourly?.time || [];
    const aqiSeries = airData?.hourly?.us_aqi || [];
    const aqiIndex = resolveHourlyIndex(aqiTimes, data.current_weather?.time);
    const aqiRaw = aqiIndex >= 0 ? aqiSeries[aqiIndex] : null;

    const currentDate = new Date(times[index]).toISOString().slice(0, 10);
    const uvDayScore = times.reduce((acc, timeValue, i) => {
        if (timeValue.slice(0, 10) !== currentDate) return acc;
        if (i > index) return acc;
        const uvValue = data.hourly?.uv_index?.[i];
        return typeof uvValue === "number" ? acc + uvValue : acc;
    }, 0);

    return {
        uvIndex: typeof uvRaw === "number" ? Number(uvRaw.toFixed(1)) : null,
        humidity: typeof humidityRaw === "number" ? Math.round(humidityRaw) : null,
        feelsLike: typeof feelsLikeRaw === "number" ? Math.round(feelsLikeRaw) : null,
        pressure: typeof pressureRaw === "number" ? Math.round(pressureRaw) : null,
        aqi: typeof aqiRaw === "number" ? Math.round(aqiRaw) : null,
        uvDayScore: Number(uvDayScore.toFixed(1)),
    };
}

// ================= HOOK EXPORTADO =================
// useWeather: encapsula toda la logica de clima (fetch, polling, parseo y estados).
// Retorna un modelo de dominio que la UI consume directo.
export function useWeather({
    lat,
    lon,
    city,
    country,
    refreshMinutes = 15,
}) {
    // raw: snapshot crudo de la API + metadata de ubicacion + timestamp
    const [raw, setRaw] = useState(null);
    // nowTick: reloj local para refrescar bloques horarios cada minuto sin refetch continuo
    const [nowTick, setNowTick] = useState(Date.now());
    // estado de carga para skeletons/spinners
    const [isLoading, setIsLoading] = useState(false);
    // estado de error legible para la UI
    const [error, setError] = useState(null);
    // trigger manual que fuerza nuevo fetch cuando el usuario reintenta
    const [refreshTick, setRefreshTick] = useState(0);

    // Reloj interno: actualiza nowTick cada 60s para que el bloque "proximas horas"
    // se recalcule en tiempo real aunque no se vuelva a llamar a la API.
    useEffect(() => {
        const id = setInterval(() => setNowTick(Date.now()), 60_000);
        return () => clearInterval(id);
    }, []);

    // Fetch principal:
    // - valida coordenadas
    // - solicita clima (forecast) y calidad de aire (aqi)
    // - guarda raw unificado
    // - ejecuta polling por refreshMinutes
    useEffect(() => {
        if (!lat || !lon) {
            setRaw(null);
            setError("Configuracion de ubicacion incompleta");
            return;
        }

        let isCancelled = false;

        async function fetchWeather() {
            const controller = new AbortController();
            try {
                setIsLoading(true);
                setError(null);

                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode,is_day,windspeed_10m,relative_humidity_2m,apparent_temperature,uv_index,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error(`Weather API error: ${res.status}`);
                }

                const data = await res.json();

                // La calidad de aire es complementaria: si falla, no bloquea el clima principal.
                let airData = null;
                try {
                    const airRes = await fetch(
                        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi&timezone=auto`,
                        { signal: controller.signal }
                    );
                    if (airRes.ok) {
                        airData = await airRes.json();
                    }
                } catch {
                    airData = null;
                }

                // Guard rail: validamos que la respuesta tenga los bloques minimos requeridos.
                if (!data.current_weather || !data.daily || !data.hourly) {
                    throw new Error("Respuesta meteorologica incompleta");
                }

                if (isCancelled) return;
                setRaw({
                    data,
                    airData,
                    meta: { city, country },
                    fetchedAt: Date.now(),
                });
            } catch (e) {
                if (isCancelled || e.name === "AbortError") return;
                setRaw(null);
                setError("No fue posible obtener el clima");
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
                controller.abort();
            }
        }

        fetchWeather();
        const ms = Math.max(1, refreshMinutes) * 60_000;
        const id = setInterval(fetchWeather, ms);

        return () => {
            isCancelled = true;
            clearInterval(id);
        };
    }, [lat, lon, city, country, refreshMinutes, refreshTick]);

    // Mapeo de dominio para UI:
    // raw API -> weather listo para render, con forecast, hourly y metricas ya normalizadas.
    const weather = useMemo(() => {
        if (!raw) return null;

        const { data, airData, meta, fetchedAt } = raw;
        const forecast = buildForecast(data);
        const hourly = buildHourly24(data, new Date(nowTick));
        const metrics = buildCurrentMetrics(data, airData);

        return {
            temperature: Math.round(data.current_weather.temperature),
            code: Number(data.current_weather.weathercode),
            isDay: resolveIsDayValue(
                data.current_weather.is_day,
                data.current_weather.time,
            ),
            city: meta.city,
            country: meta.country,
            max: Math.round(data.daily.temperature_2m_max[0]),
            min: Math.round(data.daily.temperature_2m_min[0]),
            metrics,
            forecast,
            hourly,
            lastUpdated: fetchedAt,
        };
    }, [raw, nowTick]);

    // API publica del hook para refresco manual (boton reintentar, pull-to-refresh, etc).
    const refresh = useCallback(() => {
        setRefreshTick((prev) => prev + 1);
    }, []);

    // Contrato final del hook consumido por componentes.
    return {
        weather,
        isLoading,
        error,
        refresh,
        hasData: !!weather,
        lastUpdated: weather?.lastUpdated ?? null,
    };
}

