// Hacemos el fetch del la ubicación usando la API de geocoding de Open-Meteo
async function getLocation(location) {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=es&format=json`)
    const data = await res.json()
    const result = data.results[0]
    return {
        name: result.name || "",
        lat: result.latitude,
        lon: result.longitude,
        country: result.country || ""
    }
}

export async function getWeather(location) {
    const { lat, lon, name } = await getLocation(location);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`)
    const data = await res.json();
    return {
        name,
        current: data.current,
        daily: data.daily,
    }
}
