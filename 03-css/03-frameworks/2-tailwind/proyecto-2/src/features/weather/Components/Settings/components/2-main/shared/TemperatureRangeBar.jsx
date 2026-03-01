
// ================= COMPONENTE/FUNCION =================
// TemperatureRangeBar: punto de entrada; recibe props/parametros: { style }
export default function TemperatureRangeBar({ style }) {
    // Render/retorno del bloque actual
    return (
        <div className="relative h-2 w-20 rounded-full bg-white/20 overflow-hidden">
            <div
                className="absolute h-full bg-linear-to-r from-yellow-300 via-orange-400 to-red-400 rounded-full"
                style={style}
            />
        </div>
    );
}
