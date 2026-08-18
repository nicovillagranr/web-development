import type { Tier, TierId } from "../metrics/index.ts";

/**
 * El estado de cumplimiento de una métrica: "Supera", "Bajo objetivo"...
 *
 * Siempre lleva la etiqueta escrita, nunca solo el color. Un panel donde el
 * cumplimiento se distingue únicamente por verde o rojo es ilegible para quien no
 * distingue esos dos colores, y también para cualquiera que lo mire de reojo con el
 * teléfono a medio brillo en un pasillo del local.
 */
const TIER_STYLES: Record<TierId, string> = {
  supera_amplia: "bg-good text-white",
  supera: "bg-good-soft text-good ring-1 ring-good/20",
  cerca: "bg-warn-soft text-warn ring-1 ring-warn/20",
  bajo: "bg-bad-soft text-bad ring-1 ring-bad/20",
};

export function TierBadge({ tier }: { tier: Tier | null }) {
  // "Sin objetivo" no es "va mal": se pinta neutro y se dice con palabras.
  if (!tier) {
    return (
      <span className="bg-idle-soft text-idle inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium">
        Sin objetivo
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_STYLES[tier.id]}`}
    >
      {tier.label}
    </span>
  );
}
