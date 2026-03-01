import { clampPercent } from "../../utils/metricFormatters.js";

function PressureFooter({ percent }) {
    return (
        <div className="h-full grid grid-rows-[1fr_auto]">
            <div className="flex items-end mt-2">
                <div className="relative h-1.5 w-full rounded-full bg-white/20">
                    <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-white/40" />
                    <span
                        className="absolute top-1/2 h-2.5 w-2.5 rounded-full bg-cyan-200 border border-cyan-50 -translate-y-1/2"
                        style={{ left: `calc(${clampPercent(percent)}% - 5px)` }}
                    />
                </div>
            </div>
            <div className="mt-0.5 flex items-center justify-between text-[9px] leading-none opacity-70">
                <span>980</span>
                <span>1040</span>
            </div>
        </div>
    );
}

export default PressureFooter;
