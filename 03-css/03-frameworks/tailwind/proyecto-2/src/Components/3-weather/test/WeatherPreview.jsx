import { useState } from "react";
import WeatherSettings from "../Components/weatherSettings";

const mockCities = [
    { city: "Barcelona", country: "ES", code: 0, temperature: 24 },
    { city: "London", country: "UK", code: 63, temperature: 12 },
    { city: "Oslo", country: "NO", code: 75, temperature: -3 },
    { city: "Miami", country: "US", code: 95, temperature: 29 },
];

export default function WeatherPreview() {
    const [selected, setSelected] = useState(mockCities[0]);

    return (
        <div className="min-h-screen bg-gray-900 p-8">

            {/* Selector tipo Xiaomi simple */}
            <select
                className="mb-6 p-2 rounded-md"
                value={selected.city}
                onChange={(e) => {
                    const city = mockCities.find(c => c.city === e.target.value);
                    setSelected(city);
                }}
            >
                {mockCities.map((c) => (
                    <option key={c.city} value={c.city}>
                        {c.city}
                    </option>
                ))}
            </select>

            <WeatherSettings
                isActive={true}
                onBack={() => { }}
                weather={selected}
            />
        </div>
    );
}