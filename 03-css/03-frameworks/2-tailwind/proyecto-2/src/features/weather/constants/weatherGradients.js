// Gradientes por tipo de clima y momento del dia.
// Cada categoria puede tener una variante de "day" y "night",
// y en categorias con intensidad se resuelve por nivel + dia/noche.
export const weatherGradients = {
    clear: {
        day: "bg-gradient-to-br from-[#6FA8FF] via-[#4C8DFF] to-[#2F6BFF]",
        night: "bg-gradient-to-br from-[#1A2952] via-[#121D3D] to-[#0A1129]",
    },

    cloudy: {
        light: {
            day: "bg-gradient-to-br from-[#8FA3B8] via-[#6F859E] to-[#4E647D]",
            night: "bg-gradient-to-br from-[#4B5E78] via-[#34465F] to-[#22334A]",
        },
        medium: {
            day: "bg-gradient-to-br from-[#6F859E] via-[#4E647D] to-[#384D63]",
            night: "bg-gradient-to-br from-[#3A4E68] via-[#2A3C55] to-[#1A2A3F]",
        },
        heavy: {
            day: "bg-gradient-to-br from-[#4E647D] via-[#384D63] to-[#243748]",
            night: "bg-gradient-to-br from-[#2B3E57] via-[#1F2F46] to-[#121F34]",
        },
    },

    rain: {
        light: {
            day: "bg-gradient-to-br from-[#3E5C7A] via-[#2E4A66] to-[#1E344D]",
            night: "bg-gradient-to-br from-[#1D3552] via-[#162A42] to-[#101F34]",
        },
        medium: {
            day: "bg-gradient-to-br from-[#2E4A66] via-[#1E344D] to-[#142635]",
            night: "bg-gradient-to-br from-[#172E4A] via-[#12253C] to-[#0D1B2F]",
        },
        heavy: {
            day: "bg-gradient-to-br from-[#1E344D] via-[#142635] to-[#0B1723]",
            night: "bg-gradient-to-br from-[#122740] via-[#0D1D33] to-[#081426]",
        },
    },

    snow: {
        light: {
            day: "bg-gradient-to-br from-[#BFD6F6] via-[#9EBFEA] to-[#7FA7DB]",
            night: "bg-gradient-to-br from-[#6D89B5] via-[#4D6E99] to-[#324E78]",
        },
        medium: {
            day: "bg-gradient-to-br from-[#9EBFEA] via-[#7FA7DB] to-[#5E8CCB]",
            night: "bg-gradient-to-br from-[#597AA7] via-[#3D5E8A] to-[#28446E]",
        },
        heavy: {
            day: "bg-gradient-to-br from-[#7FA7DB] via-[#5E8CCB] to-[#3D6FB7]",
            night: "bg-gradient-to-br from-[#486B99] via-[#31517D] to-[#1E3860]",
        },
    },

    storm: {
        day: "bg-gradient-to-br from-[#4B3F72] via-[#362A5C] to-[#1F183D]",
        night: "bg-gradient-to-br from-[#231A43] via-[#181231] to-[#0E0A20]",
    },

    mist: {
        day: "bg-gradient-to-br from-[#A8B4C3] via-[#8D9AA8] to-[#6F7C8A]",
        night: "bg-gradient-to-br from-[#5D6B82] via-[#445269] to-[#2D3A50]",
    },
};
