// Paleta de gradientes para clima.
// Objetivo visual:
// - Dia: tonos mas puros, con menos brillo para no fatigar la vista.
// - Noche: tonos levantados para contrastar con fondo #1F2933 sin perder el mood oscuro.
// - Todas las variantes mantienen paradas 0/10/40/100 para consistencia.
export const DEFAULT_WEATHER_GRADIENT =
    "bg-[linear-gradient(135deg,_#3F546D_0%,_#2D425A_10%,_#253C54_40%,_#1E3040_100%)]";

export const weatherGradients = {
    // Categoria: cielo despejado (sin intensidad).
    clear: {
        day: "bg-[linear-gradient(150deg,_#D4A61E_10%,_#CBB33E_20%,_#4A97D9_40%,_#226CB3_100%)]",
        night: "bg-[linear-gradient(150deg,_#1E3252_10%,_#1A2E55_20%,_#1D3E6A_40%,_#264E7A_100%)]",
    },

    // Categoria: nubes (light/medium/heavy).
    cloudy: {
        light: {
            day: "bg-[linear-gradient(150deg,_#6F8195_0%,_#607488_10%,_#53677B_40%,_#45596D_100%)]",
            night: "bg-[linear-gradient(150deg,_#2E3D50_0%,_#283549_10%,_#233042_40%,_#1D2A3B_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(150deg,_#62778C_0%,_#556A7E_10%,_#4A5F73_40%,_#3F5366_100%)]",
            night: "bg-[linear-gradient(150deg,_#283547_0%,_#223041_10%,_#1D2B38_40%,_#192533_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(150deg,_#566B7F_0%,_#4A5E72_10%,_#3F5366_40%,_#344758_100%)]",
            night: "bg-[linear-gradient(150deg,_#242F3F_0%,_#1F2B38_10%,_#1B2631_40%,_#162230_100%)]",
        },
    },

    // Categoria: lluvia (light/medium/heavy).
    rain: {
        light: {
            day: "bg-[linear-gradient(150deg,_#3F6D94_0%,_#345E84_10%,_#2A4E73_40%,_#213F61_100%)]",
            night: "bg-[linear-gradient(150deg,_#1C3552_0%,_#18304A_10%,_#152842_40%,_#122037_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(150deg,_#355E84_0%,_#2B5173_10%,_#23455F_40%,_#1B384D_100%)]",
            night: "bg-[linear-gradient(150deg,_#182E47_0%,_#152940_10%,_#112337_40%,_#0E1E2E_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(150deg,_#2C4F73_0%,_#244464_10%,_#1D3A56_40%,_#162D45_100%)]",
            night: "bg-[linear-gradient(150deg,_#152537_0%,_#122030_10%,_#0F1B28_40%,_#0C1621_100%)]",
        },
    },

    // Categoria: nieve (light/medium/heavy).
    snow: {
        light: {
            day: "bg-[linear-gradient(150deg,_#6D8FB3_0%,_#5E82A7_10%,_#4F7498_40%,_#416789_100%)]",
            night: "bg-[linear-gradient(150deg,_#324D6E_0%,_#293F5A_10%,_#23364D_40%,_#1C2D42_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(150deg,_#5F84A9_0%,_#51779B_10%,_#456A8C_40%,_#395D7E_100%)]",
            night: "bg-[linear-gradient(150deg,_#2B4462_0%,_#25394F_10%,_#1F3044_40%,_#1A2A3A_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(150deg,_#53789E_0%,_#476D90_10%,_#3B6182_40%,_#315574_100%)]",
            night: "bg-[linear-gradient(150deg,_#263B55_0%,_#213146_10%,_#1C2C3E_40%,_#172537_100%)]",
        },
    },

    // Categoria: tormenta (sin intensidad).
    storm: {
        day: "bg-[linear-gradient(150deg,_#445E80_0%,_#395171_10%,_#2F455F_40%,_#25374C_100%)]",
        night: "bg-[linear-gradient(150deg,_#1E2E42_0%,_#1A2838_10%,_#162330_40%,_#121E2A_100%)]",
    },

    // Categoria: neblina/mist (sin intensidad).
    mist: {
        day: "bg-[linear-gradient(150deg,_#75899D_0%,_#687D90_10%,_#5B7082_40%,_#4E6374_100%)]",
        night: "bg-[linear-gradient(150deg,_#2B3C50_0%,_#253545_10%,_#1F2E3C_40%,_#1A2836_100%)]",
    },
};
