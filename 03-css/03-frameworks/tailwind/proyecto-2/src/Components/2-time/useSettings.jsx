import { useEffect, useState } from "react";

const DEFAULT_SETTINGS = {
    autoTime: true,
    is24hFormat: false,
    manualDate: new Date().toISOString(),

    weather: {
        lat: -33.45,
        lon: -70.66,
        city: "Santiago",
        country: "Chile",
    }
};

export function useSettings() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem("settings");
        if (!saved) return DEFAULT_SETTINGS;

        try {
            const parsed = JSON.parse(saved);
            return { ...DEFAULT_SETTINGS, ...parsed };
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return {
        autoTime: settings.autoTime,
        is24hFormat: settings.is24hFormat,
        manualDate: new Date(settings.manualDate),

        weather: settings.weather,

        setAutoTime: (value) =>
            setSettings(s => ({ ...s, autoTime: value })),

        setIs24hFormat: (value) =>
            setSettings(s => ({ ...s, is24hFormat: value })),

        setManualDate: (date) =>
            setSettings(s => ({
                ...s,
                manualDate: date.toISOString(),
            })),

        setWeather: (weatherConfig) =>
            setSettings(s => ({
                ...s,
                weather: {
                    ...s.weather,
                    ...weatherConfig,
                }
            })),
    };
}
