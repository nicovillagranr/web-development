import { FiChevronLeft } from "react-icons/fi";

function WeatherSettings({
    isActive,
    onBack,
    weather,
    setWeather,
}) {

    // const cities = [
    //     { city: "Arica", country: "Chile", lat: -18.48, lon: -70.32 },
    //     { city: "Iquique", country: "Chile", lat: -20.22, lon: -70.15 },
    //     { city: "Calama", country: "Chile", lat: -22.46, lon: -68.93 },
    //     { city: "Antofagasta", country: "Chile", lat: -23.65, lon: -70.40 },
    //     { city: "Copiapó", country: "Chile", lat: -27.37, lon: -70.33 },
    //     { city: "La Serena", country: "Chile", lat: -29.90, lon: -71.25 },
    //     { city: "Coquimbo", country: "Chile", lat: -29.95, lon: -71.34 },
    //     { city: "Valparaíso", country: "Chile", lat: -33.05, lon: -71.62 },
    //     { city: "Viña del Mar", country: "Chile", lat: -33.02, lon: -71.55 },
    //     { city: "Santiago", country: "Chile", lat: -33.45, lon: -70.66 },
    //     { city: "Rancagua", country: "Chile", lat: -34.17, lon: -70.74 },
    //     { city: "Talca", country: "Chile", lat: -35.43, lon: -71.66 },
    //     { city: "Curicó", country: "Chile", lat: -34.98, lon: -71.24 },
    //     { city: "Concepción", country: "Chile", lat: -36.82, lon: -73.04 },
    //     { city: "Chillán", country: "Chile", lat: -36.61, lon: -72.10 },
    //     { city: "Temuco", country: "Chile", lat: -38.74, lon: -72.59 },
    //     { city: "Valdivia", country: "Chile", lat: -39.82, lon: -73.24 },
    //     { city: "Puerto Montt", country: "Chile", lat: -41.47, lon: -72.93 },
    //     { city: "Coyhaique", country: "Chile", lat: -45.57, lon: -72.07 },
    //     { city: "Punta Arenas", country: "Chile", lat: -53.16, lon: -70.91 }
    // ];
    const cities = [
        { city: "Reykjavik", country: "Islandia", lat: 64.14, lon: -21.94 },      // muy nublado / nieve
        { city: "Oslo", country: "Noruega", lat: 59.91, lon: 10.75 },             // nieve / nublado
        { city: "Helsinki", country: "Finlandia", lat: 60.17, lon: 24.94 },       // nieve
        { city: "Moscú", country: "Rusia", lat: 55.75, lon: 37.62 },              // nieve / nublado
        { city: "Saint Petersburg", country: "Rusia", lat: 59.93, lon: 30.33 },   // nieve / lluvia ligera
        { city: "Zurich", country: "Suiza", lat: 47.37, lon: 8.54 },              // lluvia / nublado
        { city: "Munich", country: "Alemania", lat: 48.14, lon: 11.58 },          // lluvia / nublado
        { city: "Edinburgh", country: "Reino Unido", lat: 55.95, lon: -3.19 },    // lluvia / nublado
        { city: "Vancouver", country: "Canadá", lat: 49.28, lon: -123.12 },       // lluvia
        { city: "Seattle", country: "Estados Unidos", lat: 47.61, lon: -122.33 }, // lluvia
        { city: "Sapporo", country: "Japón", lat: 43.06, lon: 141.35 },           // nieve
        { city: "Buenos Aires", country: "Argentina", lat: -34.60, lon: -58.38 }, // lluvia ocasional
        { city: "London", country: "Reino Unido", lat: 51.51, lon: -0.13 },       // nublado / lluvia
        { city: "Chicago", country: "Estados Unidos", lat: 41.88, lon: -87.63 },  // nieve / lluvia
    ];


    const handleCityChange = (selectedCity) => {
        setWeather(selectedCity);
    };

    const isActiveCity = (cityName) => weather?.city === cityName;

    return (
        <section
            className={`absolute inset-0 z-20 py-4 bg-white flex flex-col transition-transform duration-300 ease-out ${isActive ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            {/* Header */}
            <header className="h-14 flex items-center px-4">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Volver"
                    className="
                        w-8 h-8 flex items-center justify-center
                        rounded-full
                        transition-colors duration-150
                        active:bg-gray-200
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-black/20
                    "
                >
                    <FiChevronLeft size={20} />
                </button>

                <h2 className="ml-2 text-lg font-medium">Clima</h2>
            </header>

            {/* Content */}
            <div className="flex-1 p-4 space-y-2">

                {/* Ciudad actual */}
                <div className="h-14 rounded-lg bg-gray-100 flex items-center justify-between px-4 pointer-events-none">
                    <span>Ciudad actual</span>
                    <span className="text-sm font-medium truncate max-w-30 text-right">
                        {weather?.city}
                    </span>
                </div>

                {/* Lista dinámica de ciudades */}
                {cities.map((cityData) => {
                    const active = isActiveCity(cityData.city);

                    return (
                        <button
                            key={cityData.city}
                            type="button"
                            disabled={active}
                            onClick={() => handleCityChange(cityData)}
                            className={`
                                h-14 w-full
                                rounded-lg
                                flex items-center justify-between
                                px-4 text-left
                                transition-colors duration-150
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-black/20
                                ${active
                                    ? "bg-gray-300 font-medium cursor-default"
                                    : "bg-gray-100 active:bg-gray-200"
                                }
                            `}
                        >
                            <span>
                                {cityData.city}, {cityData.country}
                            </span>
                        </button>
                    );
                })}

            </div>
        </section>
    );
}

export default WeatherSettings;
