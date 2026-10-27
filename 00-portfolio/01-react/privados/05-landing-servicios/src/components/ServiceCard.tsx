import type { ComponentType } from "react";
import type { Service } from "../data/services";
import { formatClp } from "../lib/format";
import { serviceMessage } from "../lib/whatsapp";
import { BoxIcon, CheckIcon, CodeIcon, CpuIcon } from "./ui/icons";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = { service: Service };

// Record con la unión como clave: si mañana services.ts añade un icono nuevo y aquí
// nadie lo dibuja, el typecheck falla en esta línea en vez de pintar una tarjeta vacía.
const serviceIcons: Record<Service["icon"], ComponentType<{ className?: string }>> = {
  pc: CpuIcon,
  web: CodeIcon,
  cad: BoxIcon,
};

export function ServiceCard({ service }: Props) {
  const Icon = serviceIcons[service.icon];

  return (
    // h-full + mt-auto en el pie: en la grilla de escritorio, las tarjetas con menos
    // texto no dejan el botón flotando a otra altura que las vecinas.
    <article className="flex h-full flex-col rounded-[20px] bg-canvas p-6 md:p-7">
      <span className="mb-5 flex size-11 items-center justify-center rounded-[12px] bg-surface text-accent">
        <Icon className="size-6" />
      </span>
      <h3 className="text-[21px] font-semibold tracking-[-0.02em]">{service.name}</h3>
      <p className="mt-2 text-[15px] leading-[1.5] text-muted">{service.summary}</p>

      <ul className="mt-5 flex flex-col gap-2.5 text-[15px]">
        {service.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="text-[15px] text-muted">
          {service.priceFrom === undefined ? (
            "A cotizar"
          ) : (
            <>
              Desde <span className="font-semibold text-ink">{formatClp(service.priceFrom)}</span>
            </>
          )}
        </p>
        {/* El nombre del servicio va oculto en el texto del enlace: si no, un lector de
            pantalla lee una lista de "Cotizar por WhatsApp" idénticos sin saber cuál es cuál. */}
        <WhatsAppButton
          message={serviceMessage(service.name)}
          variant="secondary"
          className="mt-3 w-full"
        >
          Cotizar <span className="sr-only">{service.name}</span> por WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  );
}
