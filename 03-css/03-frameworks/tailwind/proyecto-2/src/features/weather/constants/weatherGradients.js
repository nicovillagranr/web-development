// Estos son los gradientes de fondo para cada tipo de clima y su intensidad. Puedes personalizarlos según tus preferencias de diseño.

export const weatherGradients = {
    clear:
        "bg-gradient-to-br from-[#6FA8FF] via-[#4C8DFF] to-[#2F6BFF]",

    cloudy: {
        light:
            "bg-gradient-to-br from-[#8FA3B8] via-[#6F859E] to-[#4E647D]",
        medium:
            "bg-gradient-to-br from-[#6F859E] via-[#4E647D] to-[#384D63]",
        heavy:
            "bg-gradient-to-br from-[#4E647D] via-[#384D63] to-[#243748]",
    },

    rain: {
        light:
            "bg-gradient-to-br from-[#3E5C7A] via-[#2E4A66] to-[#1E344D]",
        medium:
            "bg-gradient-to-br from-[#2E4A66] via-[#1E344D] to-[#142635]",
        heavy:
            "bg-gradient-to-br from-[#1E344D] via-[#142635] to-[#0B1723]",
    },

    snow: {
        light:
            "bg-gradient-to-br from-[#BFD6F6] via-[#9EBFEA] to-[#7FA7DB]",
        medium:
            "bg-gradient-to-br from-[#9EBFEA] via-[#7FA7DB] to-[#5E8CCB]",
        heavy:
            "bg-gradient-to-br from-[#7FA7DB] via-[#5E8CCB] to-[#3D6FB7]",
    },

    storm:
        "bg-gradient-to-br from-[#4B3F72] via-[#362A5C] to-[#1F183D]",

    mist:
        "bg-gradient-to-br from-[#A8B4C3] via-[#8D9AA8] to-[#6F7C8A]",
};
