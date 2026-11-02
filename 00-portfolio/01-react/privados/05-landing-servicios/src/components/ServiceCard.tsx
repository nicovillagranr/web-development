import type { Service } from "../data/services";
import { formatClp } from "../lib/format";
import { serviceMessage } from "../lib/whatsapp";
import { CheckIcon } from "./ui/icons";
import { tones } from "./ui/tones";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = { service: Service };

export function ServiceCard({ service }: Props) {
  const tone = tones[service.tone];

  return (
    // h-full + mt-auto en el pie: en la grilla de escritorio, las tarjetas con menos
    // texto no dejan el botón flotando a otra altura que las vecinas.
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-canvas">
      <div className={`flex flex-col gap-2.5 p-6 md:p-7 ${tone.solid}`}>
        <tone.Icon className="size-9 md:size-10" />
        <h3 className="font-display text-[24px] leading-tight font-bold md:text-[26px]">
          {service.title}
        </h3>
        <p className={tone.solidMuted}>{service.tagline}</p>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6 md:p-7">
        <ul className="flex flex-col gap-3 text-[16px] leading-[1.5] text-body">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-2.5">
              <CheckIcon className={`mt-[3px] size-4 shrink-0 ${tone.check}`} />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3.5">
          <p className="text-[15px] text-muted">
            {service.priceFrom === undefined ? (
              <strong className="text-[22px] text-ink">A cotizar</strong>
            ) : (
              <>
                Desde{" "}
                <strong className="text-[24px] text-ink">{formatClp(service.priceFrom)}</strong>
              </>
            )}
          </p>
          {/* Abre WhatsApp con un mensaje que nombra el servicio, en vez de bajar a
              #contacto como el mockup: es un paso menos para quien ya eligió. */}
          <WhatsAppButton
            message={serviceMessage(service.name)}
            variant="plain"
            className={`w-full ${tone.button}`}
          >
            {service.cta}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
