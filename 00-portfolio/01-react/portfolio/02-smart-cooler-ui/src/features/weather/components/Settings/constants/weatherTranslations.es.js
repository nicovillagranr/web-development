// Diccionario de traduccion para categorias de clima mostradas en UI.
// Nota: las claves deben coincidir con los valores emitidos por parseWeather.
export const weatherTranslationsES = {
    clear: "Despejado",
    rain: "Lluvia",
    cloudy: "Nublado",
    snow: "Nieve",
    // parseWeather emite "storm", no "thunderstorm": con la clave larga esta
    // entrada no se encontraba nunca y la UI acababa mostrando "storm" en crudo.
    storm: "Tormenta",
    fog: "Niebla",
    mist: "Neblina",
    drizzle: "Llovizna",
};
