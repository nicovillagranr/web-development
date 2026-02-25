export const DEFAULT_RADIO_STATION_ID = "rock";

// URLs de ejemplo para demo.
// Si alguna estacion falla por region o disponibilidad, reemplaza las URLs por otras activas.
export const RADIO_STATIONS = [
    {
        id: "rock",
        label: "Rock",
        description: "Canal en vivo de rock alternativo.",
        streams: [
            "https://stream.zeno.fm/rf3f9n8k8vzuv",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        ],
    },
    {
        id: "lofi",
        label: "Lofi",
        description: "Canal chill para concentracion y cocina.",
        streams: [
            "https://stream.zeno.fm/f3h7z4hnytzuv",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        ],
    },
    {
        id: "afro",
        label: "Afro",
        description: "Ritmos afro/global para ambiente de hogar.",
        streams: [
            "https://stream.zeno.fm/4wqre23fytzuv",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        ],
    },
];
