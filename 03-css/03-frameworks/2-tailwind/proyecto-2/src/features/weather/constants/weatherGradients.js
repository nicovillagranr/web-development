// Paleta de gradientes para clima.
// Objetivo visual:
// - Dia: tonos mas puros, con menos brillo para no fatigar la vista.
// - Noche: tonos frios/profundos para uso en baja luz.
// - Todas las variantes mantienen paradas 0/10/40/100 para consistencia.
export const DEFAULT_WEATHER_GRADIENT =
    "bg-[linear-gradient(135deg,_#3F546D_0%,_#2D425A_10%,_#21364C_40%,_#15283C_100%)]";

export const weatherGradients = {
    clear: {
        day: "bg-[linear-gradient(135deg,_#D4A61E_0%,_#CBB33E_10%,_#4A97D9_40%,_#226CB3_100%)]",
        night: "bg-[linear-gradient(135deg,_#0A1632_0%,_#102449_10%,_#173760_40%,_#1D4A74_100%)]",
    },

    cloudy: {
        light: {
            day: "bg-[linear-gradient(135deg,_#6F8195_0%,_#607488_10%,_#53677B_40%,_#45596D_100%)]",
            night: "bg-[linear-gradient(135deg,_#253447_0%,_#1F2D3F_10%,_#1A2635_40%,_#141E2B_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(135deg,_#62778C_0%,_#556A7E_10%,_#4A5F73_40%,_#3F5366_100%)]",
            night: "bg-[linear-gradient(135deg,_#1F2D3F_0%,_#192638_10%,_#152030_40%,_#101926_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(135deg,_#566B7F_0%,_#4A5E72_10%,_#3F5366_40%,_#344758_100%)]",
            night: "bg-[linear-gradient(135deg,_#182536_0%,_#142030_10%,_#101929_40%,_#0C131F_100%)]",
        },
    },

    rain: {
        light: {
            day: "bg-[linear-gradient(135deg,_#3F6D94_0%,_#345E84_10%,_#2A4E73_40%,_#213F61_100%)]",
            night: "bg-[linear-gradient(135deg,_#112A46_0%,_#0E233C_10%,_#0A1C31_40%,_#071526_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(135deg,_#355E84_0%,_#2B5173_10%,_#23455F_40%,_#1B384D_100%)]",
            night: "bg-[linear-gradient(135deg,_#0D233B_0%,_#0A1D31_10%,_#081727_40%,_#06111D_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(135deg,_#2C4F73_0%,_#244464_10%,_#1D3A56_40%,_#162D45_100%)]",
            night: "bg-[linear-gradient(135deg,_#091A2D_0%,_#071525_10%,_#05101D_40%,_#030B15_100%)]",
        },
    },

    snow: {
        light: {
            day: "bg-[linear-gradient(135deg,_#6D8FB3_0%,_#5E82A7_10%,_#4F7498_40%,_#416789_100%)]",
            night: "bg-[linear-gradient(135deg,_#2C4563_0%,_#243A54_10%,_#1D3045_40%,_#162638_100%)]",
        },
        medium: {
            day: "bg-[linear-gradient(135deg,_#5F84A9_0%,_#51779B_10%,_#456A8C_40%,_#395D7E_100%)]",
            night: "bg-[linear-gradient(135deg,_#253C57_0%,_#1F334B_10%,_#192A3F_40%,_#132134_100%)]",
        },
        heavy: {
            day: "bg-[linear-gradient(135deg,_#53789E_0%,_#476D90_10%,_#3B6182_40%,_#315574_100%)]",
            night: "bg-[linear-gradient(135deg,_#1F344C_0%,_#1A2C40_10%,_#152436_40%,_#101C2B_100%)]",
        },
    },

    storm: {
        day: "bg-[linear-gradient(135deg,_#445E80_0%,_#395171_10%,_#2F455F_40%,_#25374C_100%)]",
        night: "bg-[linear-gradient(135deg,_#142339_0%,_#101C2D_10%,_#0C1623_40%,_#080F18_100%)]",
    },

    mist: {
        day: "bg-[linear-gradient(135deg,_#75899D_0%,_#687D90_10%,_#5B7082_40%,_#4E6374_100%)]",
        night: "bg-[linear-gradient(135deg,_#253446_0%,_#1F2C3B_10%,_#192532_40%,_#131D27_100%)]",
    },
};
