// Importamos íconos climáticos desde react-icons
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiFog,
    WiSnow,
    WiThunderstorm,
} from "react-icons/wi";

/**
 * WeatherIcon
 *
 * Componente responsable de:
 * - traducir un "weather code" numérico
 * - a un ícono visual entendible por el usuario
 *
 * Este componente:
 * - NO hace fetch
 * - NO decide temperatura
 * - NO tiene estado
 *
 * Solo interpreta.
 */
export function WeatherIcon({ code, size = 20, className = "" }) {

    /**
     * Código 0:
     * Cielo despejado
     */
    if (code === 0) {
        return <WiDaySunny size={size} className={className} />;
    }

    /**
     * Códigos 1–3:
     * Parcialmente nublado / nublado
     */
    if ([1, 2, 3].includes(code)) {
        return <WiCloudy size={size} className={className} />;
    }

    /**
     * Códigos 45–48:
     * Niebla / bruma
     */
    if ([45, 48].includes(code)) {
        return <WiFog size={size} className={className} />;
    }

    /**
     * Códigos 51–67:
     * Lluvia ligera a intensa
     */
    if (code >= 51 && code <= 67) {
        return <WiRain size={size} className={className} />;
    }

    /**
     * Códigos 71–77:
     * Nieve
     */
    if (code >= 71 && code <= 77) {
        return <WiSnow size={size} className={className} />;
    }

    /**
     * Códigos 95+:
     * Tormentas eléctricas
     */
    if (code >= 95) {
        return <WiThunderstorm size={size} className={className} />;
    }

    /**
     * Fallback:
     * Si el código no está contemplado,
     * mostramos un ícono neutro.
     */
    return <WiCloudy size={size} className={className} />;
}
